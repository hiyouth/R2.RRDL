using R2.RRDL.Models.Mapping;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Linq.Expressions;
using R2.Helper.Linq;

namespace R2.RRWM.Models.Repository
{
    public class TaskRepository:RepositoryBase<RRWMEntities,Task>
    {
        public TaskRepository(RRWMEntities db):base(db)
        {

        }

        public TaskRepository()
        {

        }

        public Task FindByID(string id)
        {
            var q = Db.Tasks.Where(t => t.ID == id);
            return q.FirstOrDefault();
        }

        /// <summary>
        /// 获取所有待确认的任务
        /// </summary>
        /// <returns></returns>
        public IQueryable<Task> FindNotConfirmed()
        {
            IQueryable<Task> tasks= Db.Tasks.Where(t=>t.TaskProcessStatus==EnumTaskProcessStatus.None);
            return tasks;
        }

        /// <summary>
        /// 获取所有任务，不论状态  ZHAOs 2014年5月21日9:01:36
        /// </summary>
        /// <returns></returns>
        public IQueryable<Task> GetAllTasks() {
            IQueryable<Task> tasks = Db.Tasks.Where(t => t.ID != null).OrderBy(t => t.ID);//Id不为空的任务都找出来
            /*
               return from a in db.AssiseInfoes
                       where codes.Contains(a.code)
                       orderby a.id
                       select a;
             */
            return tasks;
        }


        public IQueryable<Task> FindByUserID(string id)
        {
            return Db.Tasks.Where(t => t.TaskerID == id).OrderBy(t => t.ID);
        }

        /// <summary>
        /// 根据projectId进行查询  ZHAOs 2014年5月21日10:16:02
        /// </summary>
        /// <param name="projId"></param>
        /// <returns></returns>
        public IQueryable<Task> FindByProjectID(int projId) {
            return Db.Tasks.Where(t => t.ProjectID == projId);
        }   
        /// <summary>
        /// 提供根据项目编号筛选任务的表达式树
        /// </summary>
        /// <param name="projectID">0表示忽略此条件，表达式永远为True</param>
        /// <returns></returns>
        public Expression<Func<Task, Boolean>> FindByProjectIDCondition(int projectID)
        {
            var eps = DynamicLinqExpressions.True<Task>();
            if (projectID!=0)
            {
                eps = eps.And(t=>t.ProjectID==projectID);
            }
            return eps;
        }

        /// <summary>
        /// 提供根据任务承担者的编号筛选任务的表达式树
        /// </summary>
        /// <param name="userID">如果传入”null“，则表示此表达式树永远为真</param>
        /// <returns></returns>
        public Expression<Func<Task, Boolean>> FindByUserIDCondition(string userID)
        {
            var eps = DynamicLinqExpressions.True<Task>();
            if (!String.IsNullOrEmpty(userID))
            {
                eps = eps.And(t => t.TaskerID == userID);
            }
            return eps;
        }

       
       /// <summary>
        ///  提供根据任务审核者的编号筛选任务的表达式树  ZHAOs  2014年5月6日15:24:23
       /// </summary>
       /// <param name="checkerId"></param>
       /// <returns></returns>
        public Expression<Func<Task, Boolean>> FindBycheckerIDCondition(string checkerId)
        {
            var eps = DynamicLinqExpressions.True<Task>();
            if (!String.IsNullOrEmpty(checkerId))
            {
                eps = eps.And(t => t.CheckerID == checkerId);
            }
            return eps;
        }


        /// <summary>
        /// 提供根据任务进行状态筛选任务的表达式树
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        public Expression<Func<Task, Boolean>> FindByTaskProcessStatusConditon(EnumTaskProcessStatus? status)
        {
               var eps = DynamicLinqExpressions.True<Task>();
               if (status != null)
               {
                   //this.Db.Configuration.ProxyCreationEnabled = true;
                   eps = eps.And(t => t.TaskProcessStatus == status);
               }
            return eps;
        }

        /// <summary>
        /// 提供根据多个用户ID筛选任务的表达式树
        /// </summary>
        /// <param name="userIds"></param>
        /// <returns></returns>
        public Expression<Func<Task, Boolean>> FindByUserIDsConditon(IEnumerable<String> userIds)
        {
            var eps = DynamicLinqExpressions.True<Task>();
            if (userIds != null)
            {
                //this.Db.Configuration.ProxyCreationEnabled = true;
                eps = eps.And(t => userIds.Contains(t.TaskerID));
            }
            return eps;
        }
    }
}