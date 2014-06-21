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

namespace R2.RRDL.Controllers.RRWM
{
    public class WMProjectController : Controller
    {


        /*
         * 关于项目的若干查询
         */

        /// <summary>
        /// 获取所有项目
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllProject() {
            ProjectService ps = new ProjectService();
            List<Project> list = ps.FindAll();
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            for (int i = 0; i < list.Count; i++) {
                dictionary.Add(list[i].ProjectName,(list[i].ID).ToString()+","+list[i].ProjectID);
            }
            return Json(dictionary);
        }


        /// <summary>
        /// 获取有待确认任务的项目列表
        /// </summary>
        /// <returns></returns>
        public List<Project> GetProjContainsTasksUnConfirmed()
        {
            ProjectService ps = new ProjectService();
            List<Project> list = ps.FindByTaskProcessStatus(EnumTaskProcessStatus.None);
            return list;
        }

        /// <summary>
        ///获取有待审核任务的项目列表
        /// </summary>
        /// <returns></returns>
        public List<Project> GetProjContainsTasksUnchecked()
        {
            ProjectService ps = new ProjectService();
            List<Project> list = ps.FindByTaskProcessStatus(EnumTaskProcessStatus.Confirmed);
            return list;
        }


        /// <summary>
        ///获取有至少一条任何状态任务的项目列表
        /// </summary>
        /// <returns></returns>
        public List<Project> GetAllProj()
        {
            ProjectService ps = new ProjectService();
            List<Project> list = ps.FindContainsAnyTask();
            return list;
        }

    }
}
