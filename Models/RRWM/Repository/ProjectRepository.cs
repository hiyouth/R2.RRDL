using R2.RRDL.Models.Repository;
using System;
using System.Linq;
using System.Linq.Expressions;
using R2.Helper.Linq;

namespace R2.RRWM.Models.Repository
{
    public class ProjectRepository:RepositoryBase<RRWMEntities,Project>
    {
        public ProjectRepository(RRWMEntities db):base(db)
        {

        }

        public ProjectRepository()
        {

        }

        /// <summary>
        /// 获取指定状态的项目名称
        /// </summary>
        /// <returns></returns>
        public IQueryable<Project> FindByTaskProcessStatus(EnumTaskProcessStatus status)
        {
            return from p in this.Db.Projects
                   where p.Tasks.Any(m => m.TaskProcessStatus == status)
                   select p;
        }

        /// <summary>
        /// 提供一个表达式树，该表达式树用于筛选出含有任务的所有项目的项目列表
        /// </summary>
        /// <returns></returns>
        public Expression<Func<Project, Boolean>> FindContainsAnyTaskCondition()
        {
            var eps = DynamicLinqExpressions.True<Project>();
            eps = eps.And(p => p.Tasks != null);
            return eps;
        }

        public Project FindByID(int id)
        {
            return Db.Projects.Where(p => p.ID == id).FirstOrDefault();
        }

        public IQueryable<Project> FindByProjectID(String pid)
        {
            return Db.Projects.Where(p => p.ProjectID == pid);
        }
    }
}