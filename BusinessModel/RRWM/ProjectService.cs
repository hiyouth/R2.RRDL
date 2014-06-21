using R2.RRDL.BusinessModel;
using R2.RRWM.Models;
using R2.RRWM.Models.Repository;
using System.Collections.Generic;
using System.Linq;

namespace R2.RRWM.BusinessModel
{
    public class ProjectService :ModelServiceBase<RRWMEntities,Project,ProjectRepository>
    {
        public ProjectService(RRWMEntities db)
            : base(db)
        {

        }

        public ProjectService()
        {
        }
        //根据一个ProjId返回一个Project，ZHAOs 2014年5月13日8:44:55
        public Project FindByProjID(int projId) {
            var repository = new ProjectRepository(this.db);
            Project proj = repository.FindByID(projId);
            return proj;
        }

        public List<Project> FindAll()
        {
              var repository = new ProjectRepository(this.db);
               List<Project> projects= repository.FindAll().ToList();
               repository.DisposeIfShould();
               return projects;
        }

        /// <summary>
        /// 查询所有包含至少一条任务的项目集合
        /// </summary>
        /// <returns></returns>
        public List<Project> FindContainsAnyTask()
        {
            var eps = this.Repository.FindContainsAnyTaskCondition();
            IQueryable<Project> projects = this.Repository.ExecuteConditions(eps);
            this.Repository.DisposeIfShould();
            return projects.ToList();
        }

        /// <summary>
        /// 获取所有含有指定状态任务的项目的列表
        /// </summary>
        /// <returns></returns>
        public List<Project> FindByTaskProcessStatus(EnumTaskProcessStatus status)
        {
            List<Project> projects = new List<Project>();
            projects = this.Repository.FindByTaskProcessStatus(status).ToList();
            Repository.DisposeIfShould();
            return projects;
        }

    }
}