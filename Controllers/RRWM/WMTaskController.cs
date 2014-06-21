using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2.RRWM.Models;
using R2.RRDL.Models;
using R2.RRWM.BusinessModel;
using Newtonsoft.Json;
using R2.RRDL.BusinessModel;
using R2.RRDL.ViewModel.RRWM;
using R2.Helper.Linq;

namespace R2.RRDL.Controllers.RRWM
{
    public class WMTaskController : Controller
    {

        #region
        //任意状态任务

        /// <summary>
        /// 根据一个taskID得到一个task
        /// </summary>
        /// <param name="taskId"></param>
        /// <returns></returns>
        public ActionResult GetTaskByTaskId(string taskId)
        {
            RRWMEntities er = new RRWMEntities();
            TaskService ts = new TaskService(er);
            Task task = ts.FindById(taskId);
            List<Task> list = new List<Task>();
            list.Add(task);
            List<ComplexTask> comList = ConvertToComplexTaskList(list);
            return Json(comList);
        }

        /// <summary>
        /// 传入项目ID  分组ID 得到此条件下的全部任务  列表
        /// </summary>
        /// <param name="projId"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public ActionResult GetTaskByProjIdAndGroupId(int projId, int groupId)
        {
            RRWMEntities er = new RRWMEntities();
            //获取这个groupID下的全部的用户ID
            List<string> idString = new List<string>();
            UserService us = new UserService();
            List<User> userList = us.FindUsersByGroupId(groupId);
            foreach (var u in userList)
            {
                idString.Add(u.Id);
            }
            //过滤结果      
            TaskService ts = new TaskService(er);
            List<Task> list = ts.FindByProjectID(projId).ToList();
            List<Task> resultList = new List<Task>();
            foreach (var l in list)
            {
                if (idString.Contains(l.TaskerID) && l.TaskProcessStatus == EnumTaskProcessStatus.None)
                {
                    resultList.Add(l);
                }
            }
            List<ComplexTask> comList = ConvertToComplexTaskList(resultList);
            return Json(comList);
        }
        /// <summary>
        /// 传入成员ID得到此成员全部状态任务列表
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public ActionResult GetTasksByUserId(string userId)
        {
            RRWMEntities er = new RRWMEntities();
            TaskService ts = new TaskService(er);
            List<Task> list = ts.FindByUserID(userId);
            List<ComplexTask> comList = ConvertToComplexTaskList(list);
            return Json(comList);
        }
        /// <summary>
        /// 传入项目ID得到此项目全部状态任务列表
        /// </summary>
        /// <param name="projId"></param>
        /// <returns></returns>
        public ActionResult GetTasksByProjId(int projId)
        {
            RRWMEntities er = new RRWMEntities();
            TaskService ts = new TaskService(er);
            List<Task> list = ts.FindByProjectID(projId).ToList();
            List<ComplexTask> comList = ConvertToComplexTaskList(list);
            return Json(comList);
        }
        /// <summary>
        /// 传入分组ID得到此分组全部状态任务列表
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public ActionResult GetTasksByGroupId(int groupId)
        {
            RRWMEntities er = new RRWMEntities();
            TaskService ts = new TaskService(er);
            List<Task> list = ts.FindByUserGroup(groupId);
            List<ComplexTask> comList = ConvertToComplexTaskList(list);
            return Json(comList);
        }
        #endregion

        #region
        ///待确认任务查询
        /// <summary>
        ///获取待确认全部任务列表 
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllTasksNotConfirmed()
        {
            RRWMEntities er = new RRWMEntities();
            TaskService ts = new TaskService(er);
            List<Task> list = new List<Task>();
            list = ts.FindNotConfirmed();
            List<ComplexTask> comList = ConvertToComplexTaskList(list);
            return Json(comList);
        }
        /// <summary>
        /// 获取某用户待确认的所有任务
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public ActionResult FindNotConfirmedByUserID(string userId)
        {
            RRWMEntities er = new RRWMEntities();
            TaskService ts = new TaskService(er);
            List<Task> list = ts.FindNotConfirmedByUserID(userId);
            List<ComplexTask> comList = ConvertToComplexTaskList(list);
            return Json(comList);
        }
        /// <summary>
        /// 传入项目ID（一个或全部） 、 用户ID（一个或全部）得到待确认任务列表    
        /// </summary>
        /// <param name="proijId">可传入0,0表示忽略此条件</param>
        /// <param name="userId">可传入null，null表示忽略此条件</param>
        /// <param name="status">任务处理状态</param>
        /// <returns></returns>
        public ActionResult GetTasksInProgressByProjAndUser(int proijId, string userId)
        {
            RRWMEntities er = new RRWMEntities();
            TaskService ts = new TaskService(er);
            EnumTaskProcessStatus status = EnumTaskProcessStatus.None;
            List<Task> list = ts.FindByProjectIDUserIDTaskProcessStatus(proijId, userId, status);
            List<ComplexTask> comList = ConvertToComplexTaskList(list);
            return Json(comList);
        }
        /// <summary>
        /// 传入分组ID得到此分组 待确认 任务列表
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public ActionResult GetUnConfirmedTaskByGroupId(int groupId)
        {
            RRWMEntities er = new RRWMEntities();
            TaskService ts = new TaskService(er);
            List<Task> list = ts.FindByStatusAndUserGroup(groupId, EnumTaskProcessStatus.None);
            List<ComplexTask> comList = ConvertToComplexTaskList(list);
            return Json(comList);
        }
        #endregion


        #region
          //待审核任务
       
        /// <summary>
        /// 传入项目ID（一个或全部） 、 任务承担者ID（一个或全部）得到待审核任务列表 
        /// </summary>
        /// <param name="proijId">可传入0,0表示忽略此条件</param>
        /// <param name="userId">可传入null，null表示忽略此条件</param>
        /// <param name="status">任务处理状态</param>
        /// <returns></returns>
        public ActionResult GetTasksUncheckedByByProjAndUser(int proijId, string userId)
        {
            RRWMEntities er = new RRWMEntities();
            TaskService ts = new TaskService(er);        
            EnumTaskProcessStatus status = EnumTaskProcessStatus.Confirmed;
            List<Task> list = ts.FindByProjectIDUserIDTaskProcessStatus(proijId, userId, status);
            List<ComplexTask> comList = ConvertToComplexTaskList(list);
            return Json(comList);
        }


        /// <summary>
        /// 传入项目ID（一个或全部） 、 任务审核者ID（一个或全部）得到待审核任务列表 
        /// </summary>
        /// <param name="proijId">可传入0,0表示忽略此条件</param>
        /// <param name="checkerId">可传入null，null表示忽略此条件</param>
        /// <param name="status">任务处理状态</param>
        /// <returns></returns>
        public ActionResult GetTasksUncheckedByProjAndChecker(int proijId, string checkerId)
        {
            RRWMEntities er = new RRWMEntities();
            TaskService ts = new TaskService(er);
            EnumTaskProcessStatus status = EnumTaskProcessStatus.Confirmed;
            List<Task> list = ts.FindByProjectIDCheckerIDTaskProcessStatus(proijId, checkerId, status);
            List<ComplexTask> comList = ConvertToComplexTaskList(list);
            for (int i = 0; i < comList.Count; i++)
            {
                comList[i].TaskStatus = list[i].TaskStatus;
                if (list[i].ConfirmedFinishTime == null)
                {
                    comList[i].ConfirmedFinishTime = null;
                }
                else
                {
                    comList[i].ConfirmedFinishTime = list[i].ConfirmedFinishTime.ToString();
                }

            }
            return Json(comList);
        }

          /// <summary>
          /// 传入项目ID  分组ID 得到此条件下的全部待审核任务 列表
          /// </summary>
          /// <param name="projId"></param>
          /// <param name="groupId"></param>
          /// <returns></returns>
        public ActionResult GetUncheckedTaskByProjIdAnduserIdsAndStatus(int projId, int groupId)
        {
            EnumTaskProcessStatus status = EnumTaskProcessStatus.Confirmed;
            UserService us = new UserService();
            List<string> userIdList =  us.FindUserIDsByGroupId(groupId).ToList();

            RRWMEntities er = new RRWMEntities();
            TaskService ts = new TaskService(er);
            List<Task> list = ts.FindByUserGroupAndProjectIdAndTaskPStatus(userIdList, projId, status);
            List<ComplexTask> comList = ConvertToComplexTaskList(list);
            for (int i = 0; i < comList.Count; i++) {
                comList[i].TaskStatus = list[i].TaskStatus;
                if (list[i].ConfirmedFinishTime == null)
                {
                    comList[i].ConfirmedFinishTime = null;
                }
                else {
                    comList[i].ConfirmedFinishTime = list[i].ConfirmedFinishTime.ToString();
                }
                
            }
                return Json(comList);
        }
         /// <summary>
        ///  传入分组ID得到此分组 待审核 任务列表
         /// </summary>
         /// <param name="groupId"></param>
         /// <returns></returns>
        public ActionResult GetUncheckedTaskByGroupId(int groupId) {
            RRWMEntities er = new RRWMEntities();
            TaskService ts = new TaskService(er);
            List<Task> list = ts.FindByStatusAndUserGroup(groupId, EnumTaskProcessStatus.Confirmed);
            List<ComplexTask> comList = ConvertToComplexTaskList(list);
            return Json(comList);
        
        }
        #endregion


        /// <summary>
        /// 用于把一个task类型转换成具有较多属性的task类型  ,此文件内多处使用
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        public List<ComplexTask> ConvertToComplexTaskList(List<Task> list)
        {
            List<ComplexTask> comList = new List<ComplexTask>();
            for (int i = 0; i < list.Count; i++)
            {
                ComplexTask ctask = new ComplexTask(list[i]);
                comList.Add(ctask);
            }
            return comList;
        }
        



        #region

        /// <summary>
        /// 新增一条任务 
        /// </summary>
        /// <param name="taskStr"></param>
        public string AddTask(string taskStr)
        {
            Task task = new Task();
            TempTask ttask = (TempTask)JsonConvert.DeserializeObject(taskStr, typeof(TempTask));
            //下面是两行很有水准的枚举类型强制转换
            task.TaskType = (EnumTaskType)Enum.Parse(typeof(EnumTaskType), ttask.TaskType.ToString());
            task.TaskCategory = (EnumTaskCategory)Enum.Parse(typeof(EnumTaskCategory), ttask.TaskCategory);
            task.Week = ttask.Week;
            task.Month = Int32.Parse(ttask.Month);
            task.QualityFactor = 0;
            task.ScheduledStartTime = ttask.ScheduledStartTime;
            task.ScheduledFinishTime = ttask.ScheduledFinishTime;
            task.ScheduledBonus = ttask.ScheduledBonus;
            task.TaskFinishStandard = ttask.TaskFinishStandard;
            task.TaskContent = ttask.TaskContent;
            task.TaskTitle = ttask.TaskTitle;
            task.CheckerName = ttask.CheckerName;
            task.SecondLevelTitle = ttask.SecondLevelTitle;
            task.ProjectID = ttask.ProjectID;
            task.TaskerID = ttask.TaskerNameId;
            task.CheckerID = ttask.CheckerNameId;
            task.Memo = ttask.Memo;
            TaskService ts = new TaskService();
            ts.New(task);
            return "success";
        }

          /// <summary>
          /// 确认一条任务的方法
          /// </summary>
          /// <param name="task"></param>
          /// <returns></returns>
        public string ConfirmTask(string task) {
            Task tsk = new Task();
            TempTask ttask = (TempTask)JsonConvert.DeserializeObject(task, typeof(TempTask));
            //下面根据传入的TaskId查到此条Task ，然后更改传进来的属性，最后更新Task
            TaskService ts = new TaskService();
            Task t = ts.FindById(ttask.ID);
            if (t != null)
            {
                t.ID = ttask.ID;
                t.ConfirmedFinishTime = ttask.ConfirmedFinishTime;
                t.UsedHours = ttask.UsedHours;
                t.Memo = ttask.Memo;
                t.TaskProcessStatus = EnumTaskProcessStatus.Confirmed;
                t.TaskStatus = (EnumTaskStatus)Enum.Parse(typeof(EnumTaskStatus),ttask.taskStatus);
            }
            ts.Repository.Update(t);
            return "success";
        }




        /// <summary>
        /// 审核一条任务
        /// 正常的更新一条任务，任务按时完成，工时等照常
        /// </summary>
        /// <param name="task"></param>
        public string ModifyTaskNomal(string task)
        {
            Task tsk = new Task();
            TempTask ttask = (TempTask)JsonConvert.DeserializeObject(task, typeof(TempTask));
            //下面根据传入的TaskId查到此条Task ，然后更改传进来的属性，最后更新Task
            TaskService ts = new TaskService();
            Task t = ts.FindById(ttask.ID);
            if (t != null) {
                t.ConfirmedFinishTime = ttask.ConfirmedFinishTime;
                t.UsedHours = ttask.UsedHours;
                t.Memo = ttask.Memo;
                t.Bonus = ttask.Bonus;
                t.QualityFactor = ttask.QualityFactor;
                t.TaskProcessStatus = EnumTaskProcessStatus.Checked;
            }
            ts.Repository.Update(t);
            return "success";
        }

         /// <summary>
         ///    不正常情况下，审核一条任务
         ///    用于 当此任务 是 “延期” 或者“增加时间”的情况下
         /// </summary>
         /// <param name="task"></param>
        public string MidifyTaskUnnormal(string task) {
            Task tsk = new Task();
            TempTask ttask = (TempTask)JsonConvert.DeserializeObject(task, typeof(TempTask));
            //下面根据传入的TaskId查到此条Task ，然后更改传进来的属性，最后更新Task
            TaskService ts = new TaskService();
            Task t = ts.FindById(ttask.ID);
            if (t != null)
            {
                t.ConfirmedFinishTime = ttask.ConfirmedFinishTime;
                t.UsedHours = ttask.UsedHours;
                t.Memo = ttask.Memo;
                t.Bonus = ttask.Bonus;
                t.QualityFactor = ttask.QualityFactor;
                t.ScheduledFinishTime = ttask.ScheduledFinishTime;
                t.TaskProcessStatus = EnumTaskProcessStatus.Checked;
            }
            ts.Repository.Update(t);
            return "success";
        }

        /// <summary>
        /// 更新一个具有全属性的Task
        /// 这是此项目中属性最多最具体的Task类型
        /// </summary>
        /// <param name="taskStr"></param>
        /// <returns></returns>
        public string UpdateAFullAttrTask(string taskStr)
        {
            AllAttrTask ttask = (AllAttrTask)JsonConvert.DeserializeObject(taskStr, typeof(AllAttrTask));
            Task tsk = new Task();
            TaskService ts = new TaskService();
            Task t = ts.FindById(ttask.ID);
            //以下开始遍历赋值t的各种属性
            t.Bonus = ttask.Bonus;
            t.CheckerID = ttask.CheckerNameId;
            t.ConfirmedFinishTime = ttask.ConfirmedFinishTime;
            t.Memo = ttask.Memo;
            t.Month =ttask.Month;
            t.ProjectID = ttask.ProjectID;
            t.QualityFactor = ttask.QualityFactor;
            t.ScheduledBonus = ttask.ScheduledBonus;
            t.ScheduledFinishTime = ttask.ScheduledFinishTime;
            t.ScheduledStartTime = ttask.ScheduledStartTime;
            t.SecondLevelTitle = ttask.SecondLevelTitle;
            t.TaskContent = ttask.TaskContent;
            t.TaskerID = ttask.TaskerNameId;
            t.TaskFinishStandard = ttask.TaskFinishStandard;
            t.TaskStatus =  ttask.TaskStatus;
            t.TaskTitle = ttask.TaskTitle;
            t.TaskType = ttask.TaskType;
            t.UsedHours = ttask.UsedHours;
            t.Week = ttask.Week;
            //属性遍历完毕
            ts.Repository.Update(t);
            return "success";
        }














        /// <summary>
        /// 删除一条任务
        /// </summary>
        /// <param name="taskId"></param>
        /// <returns></returns>
        public string DeleteTask(string taskId)
        {
            TaskService ts = new TaskService();
            Task t = ts.FindById(taskId);
            ts.Repository.Drop(t);
            return "success";
        }

        #endregion






        #region
        /*
        第三期需求
        */
        
        /// <summary>
        /// 前台传入：项目,后台返回：所有项目名称和项目ID 
        /// </summary>
        /// <returns></returns>
        /// 
        public JsonResult GetAllProjects()
        {
            RRWMEntities er = new RRWMEntities();
            ProjectService ps = new ProjectService(er);
            er.Configuration.ProxyCreationEnabled = false;
            List<Project> list = ps.FindAll();
            return Json(list);
        }


        /// <summary>
        /// 后台返回：所有小组名称和小组ID  
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllGroups()
        {
            RRDLEntities rr = new RRDLEntities();
            UserGroupService ugs = new UserGroupService(rr);
            rr.Configuration.ProxyCreationEnabled = false;
            List<UserGroup> list = ugs.FindAll();
            List<UserGroup> newList = new List<UserGroup>();//去除了游客和超级管理员之后的UserGroup
            foreach (var l in list) {
                if (l.Id != 1 && l.Id != 2) {
                    newList.Add(l);
                }
            }
            return Json(newList);
        }

        /// <summary>
        /// 后台返回：所有成员名称和成员ID
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllMembers()
        {
            RRDLEntities rr = new RRDLEntities();
            UserService us = new UserService(rr);
            rr.Configuration.ProxyCreationEnabled = false;
            List<User> list  = us.FindAll();
            return Json(list);
        }





        /// <summary>
        /// 项目ID（proId）proId=0时为全部 ,后台返回：符合要求的任务记录总数 
        /// </summary>
        /// <param name="projId"></param>
        /// <returns></returns>
        public int GetTaskCountByProjId(int projId)
        {
            RRWMEntities re = new RRWMEntities();
            TaskService ts = new TaskService(re);
            int num = ts.FindByProjectID(projId).ToList().Count();
            return num;
        }

        /// <summary>
        /// 小组ID（groupId）groupId=0时为全部,,,后台返回：符合要求的任务记录总数  
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public int GetTaskCountByGroupId(int groupId) {
            int num = 0;
            TaskService ts = new TaskService();
            if (groupId != 0)
            {
                num = ts.FindByUserGroup(groupId).Count();
            }
            else {
                num = ts.GetAllTasks().Count();
            }
            return num;
        }

        /// <summary>
        /// 成员ID（memberId）memberId=0时为全部,,,,后台返回：符合要求的任务记录总数  
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        public int GetTaskCountByUserId(string UserId)
        {
            TaskService ts = new TaskService();
            int num = 0;
            if (UserId != "0")
            {
                num = ts.FindByUserID(UserId).Count();
            }
            else {

                num = ts.GetAllTasks().Count();
            }
            return num;
        }






        /// <summary>
        /// 前台传入：项目ID（proId）、每页总数（numOnePage）  、当前页（pageIndex）
        ///后台返回：当前页符合要求的任务记录 
        ///  proId=0时为全部
        /// </summary>
        /// <param name="projId"></param>
        /// <param name="numOnePage"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        public ActionResult GetTasksByProjIdWithPgInfo(int projId, int numOnePage, int pageIndex)
        {
            RRWMEntities re = new RRWMEntities();
            TaskService ts = new TaskService(re);
            List<Task> resultList = new List<Task>();
            if (projId != 0)
            {
                IQueryable<Task> Ilist = ts.FindByProjectID(projId);
                IQueryable<Task> result = LinqEntityHelper.GetEntitySetByPage<Task>(Ilist, numOnePage, pageIndex);
                resultList = result.ToList();
                List<ComplexTask> comList = ConvertToComplexTaskList(resultList);
                return Json(comList);
            }
            return ReturnAllTasks(numOnePage, pageIndex);
        }


        /// <summary>
        /// 小组ID（groupId）、每页总数（numOnePage）  、当前页（pageIndex）
        ///后台返回：当前页符合要求的任务记录  
	    ///groupId=0时为全部
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="numOnePage"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        public ActionResult GetTaskByGroupIdWithPgIno(int groupId, int numOnePage, int pageIndex) {
            RRWMEntities re = new RRWMEntities();
            TaskService ts = new TaskService(re);
             List<Task> resultList = new List<Task>();
            if (groupId != 0)
            {
                 IQueryable<Task> Ilist = ts.FindByUserGroup_LINQ(groupId);
                 IQueryable<Task> result = LinqEntityHelper.GetEntitySetByPage<Task>(Ilist, numOnePage, pageIndex);
                 resultList = result.ToList();
                 List<ComplexTask> comList = ConvertToComplexTaskList(resultList);
                 return Json(comList);
            }
            return ReturnAllTasks(numOnePage, pageIndex);
        }

        /// <summary>
        /// 成员ID（memberId）、每页总数（numOnePage）  、当前页（pageIndex）
        ///后台返回：当前页符合要求的任务记录  
	    ///memberId=0时为全部
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="numOnePage"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        public ActionResult GetTaskByUserIdWithPgIno(string userId, int numOnePage, int pageIndex) {
            RRWMEntities re = new RRWMEntities();
            TaskService ts = new TaskService(re);
            List<Task> resultList = new List<Task>();
            if (userId != "0")
            {
                IQueryable<Task> Ilist = ts.FindByUserID_LINQ(userId);
                IQueryable<Task> result = LinqEntityHelper.GetEntitySetByPage<Task>(Ilist, numOnePage, pageIndex);
                resultList = result.ToList();
                List<ComplexTask> comList = ConvertToComplexTaskList(resultList);
                return Json(comList);
            }
            return ReturnAllTasks(numOnePage, pageIndex);
        }


        //一个根据每页条数和页码数查出相应的页的任务的函数
        //被分页的任务范围为“全部任务”
        //此函数在此region里三次被使用
        public ActionResult ReturnAllTasks(int numOnePage, int pageIndex)
        {
            RRWMEntities re = new RRWMEntities();
            TaskService ts = new TaskService(re);
            List<Task> resultList = new List<Task>();
            IQueryable<Task> Ilist = ts.Repository.GetAllTasks();
            
            IQueryable<Task> result = LinqEntityHelper.GetEntitySetByPage<Task>(Ilist, numOnePage, pageIndex);
            resultList = result.ToList();
            List<ComplexTask> comList = ConvertToComplexTaskList(resultList);
            return Json(comList);
        }

        #endregion




    }
}


