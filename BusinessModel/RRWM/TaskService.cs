using R2.Helper.Linq;
using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using R2.RRWM.Models;
using R2.RRWM.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace R2.RRWM.BusinessModel
{
    public class TaskService : ModelServiceBase<RRWMEntities,Task,TaskRepository>
    {
        public TaskService(RRWMEntities db)
            : base(db)
        {

        }

        public TaskService()
        {
        }

        public Task FindById(string id)
        {
           return  this.Repository.FindByID(id);
        }

        /// <summary>
        /// 新增任务
        /// </summary>
        /// <param name="task"></param>
        public void New(Task task)
        {
            try
            {
                string taskID = this.GetTaskID(task.Year, task.Month, DateTime.Now.Day);
                task.ID = taskID;
                task.RecordTime = DateTime.Now;
                this.Repository.Add(task);
                var snRepository = new TaskSNRepository(this.db);
                snRepository.Refresh(task.Year, task.Month);
                Repository.DisposeIfShould();
                snRepository.DisposeIfShould();
            }
            catch (Exception ex) {
                throw ;
            }
        }

        /// <summary>
        /// 任务ID号定义为：R2T-年月日-任务序列号
        /// </summary>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <returns></returns>
        public String GetTaskID(int year,int month,int day)
        {
            TaskSNService snService = new TaskSNService(this.db);
            int snNo=snService.GetTaskSN(year, month);
            return "R2T-" + year.ToString() + "-" + month.ToString("00") + day.ToString() + "-" + snNo.ToString();
        }

        /// <summary>
        /// 获取所有待确认任务列表
        /// </summary>
        /// <returns></returns>
        public List<Task> FindNotConfirmed()
        {
                List<Task> tasks=this.Repository.FindNotConfirmed().ToList();
                Repository.DisposeIfShould();
                return tasks;
        }

        /// <summary>
        ///       从指定的Task集合中，返回任务承担者列表以及每个任务承担者的任务数量
        /// </summary>
        /// <param name="status">任务的处理状态，传null表示不考虑状态，获取所有</param>
        /// <param name="keyselector">匿名函数，如传入 t=>t.ChekerID，表示获取审核人的任务数量</param>
        /// <returns>字典类型，String人员名称，int是该人员待确认的任务数量</returns>
        public Dictionary<User,int> FindUserIDsAndTaskCountWithTaskProcessStatus<V>(
            EnumTaskProcessStatus? status,Func<Task,V> keyselector)
        {
            //TODO:后续需要回头学习匿名函数的高级用法，实际上就是一种延迟加载，比如参数Task到
            //最后才进行实例化加载
            var eps = this.Repository.FindByTaskProcessStatusConditon(status);
            IQueryable<Task> tasks = this.Repository.ExecuteConditions(eps);
           // List<Task> t1 = tasks.ToList();
            //return this.FindUserIDsAndTaskCountFromList<V>(tasks,keyselector);ZHAOs 2014004029
            return null;
        }

        /// <summary>
        /// 从指定的Task集合中，返回任务承担者列表以及每个任务承担者的任务数量
        /// </summary>
        /// <param name="tasks"></param>
        /// <param name="keySelector">>匿名函数，如传入 t=>t.ChekerID，表示获取审核人的任务数量</param>
        /// <returns></returns>
        public Dictionary<User, int> FindUserIDsAndTaskCountFromList<V>(
            IQueryable<Task> tasks,Func<Task,V> keySelector)
        {
            Dictionary<User, int> dicts = new Dictionary<User, int>();
            var q = from t in tasks
                    group t by keySelector(t) into g
                    select new
                    {
                        g.Key,
                        TaskNumber = g.Count()
                    };

            foreach (var item in q)
            {
                UserService userService = new UserService();
                User tempUser = userService.FindById(item.Key.ToString());
                dicts.Add(tempUser, item.TaskNumber);
            }
            return dicts;
        }

        /// <summary>
        ///  获取某用户的所有任务
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<Task> FindByUserID(string id)
        {
            var repository = new TaskRepository(this.db);
            List<Task> tasks = repository.FindByUserID(id).ToList();
            repository.DisposeIfShould();
            return tasks;
        }

        /// <summary>
        /// 获取某用户待确认的所有任务
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<Task> FindNotConfirmedByUserID(string id)
        {
            IQueryable<Task> tasks = this.Repository.FindByUserID(id);
            List<Task> taskList = tasks.Where(t => t.TaskProcessStatus == EnumTaskProcessStatus.None).ToList();
            Repository.DisposeIfShould();
            return taskList;
        }

        /// <summary>
        /// 根据分组获取该分组所有任务
        /// </summary>
        /// <param name="userGroupId"></param>
        /// <returns></returns>
        public List<Task> FindByUserGroup(int userGroupId)
        {
            //TODO:不是完美实现，效率很低，后面需要重构
            UserService userService = new UserService();
            IEnumerable<string> userIds = userService.FindUserIDsByGroupId(userGroupId);
            Expression<Func<Task,bool>> condtion = t=>userIds.Contains(t.TaskerID);
            List<Task> tasks = this.Repository.FindAll().Where(condtion).ToList();
            this.Repository.DisposeIfShould();
            return tasks;
        }

        /// <summary>
        /// 根据多个用户ids、项目id,任务进行状态获取任务
        /// </summary>
        /// <param name="ugid"></param>
        /// <param name="pid"></param>
        /// <returns></returns>
        public List<Task> FindByUserGroupAndProjectIdAndTaskPStatus(List<string> userids, int pid,
            EnumTaskProcessStatus? tstatus)
        {
            //UserService userService = new UserService();
            //IEnumerable<string> userIds = userService.FindUserIDsByGroupId(ugid);
           // Expression<Func<Task, bool>> condtion = t => userIds.Contains(t.TaskerID)&&t.ProjectID==pid;
            var eps = DynamicLinqExpressions.True<Task>();
            var epsp = this.Repository.FindByProjectIDCondition(pid);
            var epsus = this.Repository.FindByUserIDsConditon(userids);
            var epsts = this.Repository.FindByTaskProcessStatusConditon(tstatus);
            eps = eps.And(epsp).And(epsus).And(epsts);
            List<Task> tasks = this.Repository.ExecuteConditions1(eps).ToList();
            this.Repository.DisposeIfShould();
            return tasks;
        }

              /// <summary>
             ///    根据会员分组获取该分组属于某一种状态的所有任务    
              /// </summary>
              /// <param name="userGroupId">用户分组ID</param>
              /// <param name="status">任务处理状态</param>
              /// <returns></returns>
        public List<Task> FindByStatusAndUserGroup(int userGroupId,
            EnumTaskProcessStatus status)
        {
            //TODO:不是完美实现，效率很低，后面需要重构
            List<Task> tasksByOneUserGroup = this.FindByUserGroup(userGroupId);
            Expression<Func<Task, bool>> condition = t => t.TaskProcessStatus == status;
            List<Task> tasks = tasksByOneUserGroup.Where<Task>
                (t => t.TaskProcessStatus == status)
                .ToList();
            this.Repository.DisposeIfShould();
            return tasks;
        }


        /// <summary>
        /// 根据项目ID号返回所有相关任务
        /// </summary>
        /// <param name="projectID"></param>
        /// <returns></returns>
        public IQueryable<Task> FindByProjectID(int projectID)
        {
            var eps = this.Repository.FindByProjectIDCondition(projectID);
            IQueryable<Task> tasks = this.Repository.ExecuteConditions1(eps);
            this.Repository.DisposeIfShould();
            return tasks;
        }

        /// <summary>
        /// 根据项目、任务承担者和任务处理状态筛选任务
        /// </summary>
        /// <param name="pid">可传入0,0表示忽略此条件</param>
        /// <param name="uid">可传入null，null表示忽略此条件</param>
        /// <param name="status">任务处理状态</param>
        /// <returns></returns>
        public List<Task> FindByProjectIDUserIDTaskProcessStatus(
            int pid,string uid,EnumTaskProcessStatus? status)
        {
            var eps=DynamicLinqExpressions.True<Task>();
            var epsP = this.Repository.FindByProjectIDCondition(pid);
            var epsU = this.Repository.FindByUserIDCondition(uid);
            var epsTPS = this.Repository.FindByTaskProcessStatusConditon(status);
            IQueryable<Task> tasks=
                this.Repository.ExecuteConditions1(eps.And(eps).And(epsU).And(epsTPS).And(epsP));
            this.Repository.DisposeIfShould();
            return tasks.ToList();
        }

        /// <summary>
        /// 根据项目、任务承担者和任务处理状态筛选任务  ZHAOs 2014年5月6日15:15:51
        /// </summary>
        /// <param name="pid">可传入0,0表示忽略此条件</param>
        /// <param name="uid">可传入null，null表示忽略此条件</param>
        /// <param name="status">任务处理状态</param>
        /// <returns></returns>
        public List<Task> FindByProjectIDCheckerIDTaskProcessStatus(
            int pid, string cid, EnumTaskProcessStatus? status)
        {
            var eps = DynamicLinqExpressions.True<Task>();
            var epsP = this.Repository.FindByProjectIDCondition(pid);
            var epsU = this.Repository.FindBycheckerIDCondition(cid);
            var epsTPS = this.Repository.FindByTaskProcessStatusConditon(status);
            IQueryable<Task> tasks =
                this.Repository.ExecuteConditions1(eps.And(eps).And(epsU).And(epsTPS).And(epsP));
            this.Repository.DisposeIfShould();
            return tasks.ToList();
        }

        /// <summary>
        /// 获取所有任务，不论状态 ZHAOs 2014年5月21日9:06:01
        /// </summary>
        /// <returns></returns>
        public List<Task> GetAllTasks() {
            List<Task> tasks = this.Repository.GetAllTasks().ToList();
            return tasks;
        }


        /// <summary>
        /// 根据groupId获取任务，返回类型为IQueryable<Task>
        /// 改写自此文件 L152，只是返回类型不同  ZHAOs 2014年5月21日11:07:06
        /// </summary>
        /// <param name="userGroupId"></param>
        /// <returns></returns>
        public IQueryable<Task> FindByUserGroup_LINQ(int userGroupId)
        {
            //TODO:不是完美实现，效率很低，后面需要重构
            UserService userService = new UserService();
            IEnumerable<string> userIds = userService.FindUserIDsByGroupId(userGroupId);
            Expression<Func<Task, bool>> condtion = t => userIds.Contains(t.TaskerID);
            IQueryable<Task> tasks = this.Repository.FindAll().Where(condtion).OrderBy(t => t.ID);
            return tasks;
        }


        /// <summary>
        /// 根据userId获取任务，返回类型为IQueryable<Task>
        /// 改写自此文件 L126，只是返回类型不同  ZHAOs 2014年5月21日11:07:06
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IQueryable<Task> FindByUserID_LINQ(string id)
        {
            var repository = new TaskRepository(this.db);
            IQueryable<Task> tasks = repository.FindByUserID(id);
            return tasks;
        }
    }
}