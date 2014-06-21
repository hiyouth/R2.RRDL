using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using R2.RRDL.ViewModel;
using Newtonsoft.Json;
namespace R2.RRDL.Controllers
{
    public class UserGroupManageController : Controller
    {
        //
        // GET: /GroupManage/

        public ActionResult Index()
        {
            return View();
        }

        //得到所有用户分组
        public string GetUserGroups() {
            UserGroupService ugs = new UserGroupService();
            List<UserGroup> list = ugs.FindAll();
            List<UserGroupViewModel> ugvList = new List<UserGroupViewModel>();
            for (int i = 0; i < list.Count; i ++ )
            {
                UserGroupViewModel ugv = new UserGroupViewModel(list[i]);
                ugvList.Add(ugv);
            }
            string result = JsonConvert.SerializeObject(ugvList);
            return result;
        }

        public string Rename(string id,string name) {
            UserGroupService ugs = new UserGroupService();
            List<UserGroup> list = ugs.FindAll();
            UserGroup ug = new UserGroup();
            for (int i = 0; i < list.Count; i++)
            {
                if (id == list[i].Id + "")
                {
                    ug = list[i];
                }
            }
            ug.Title = name;
            ugs.Update(ug);
            return null;
        }

        public string Add(string title) {
            UserGroup ug = new UserGroup();
            ug.Title = title;
            UserGroupService ugs = new UserGroupService();
            ugs.Add(ug);
            List<UserGroup> list = ugs.FindAll();
            UserGroupViewModel ugv = new UserGroupViewModel(list[list.Count-1]);
            string result = JsonConvert.SerializeObject(ugv);
            return result;
        }

        public string UserGroupIsEmpty(string userGroupId)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                UserGroupService ugs = new UserGroupService(db);
                UserGroup ug = ugs.FindById(Int32.Parse(userGroupId));
                int count = ug.Users.Count;
                if (count == 0)
                {
                    return "true";
                }
                else {
                    return "false";
                }
            }
        }

        public string Delete(string userGroupId)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
            UserGroupService ugs = new UserGroupService(db);
            ugs.Drop(Int32.Parse(userGroupId));
            db.SaveChanges();
            return null;
            }
        }

        /// <summary>
        /// 传入组id，返回小组信息  ZHAOs 2014年5月23日12:08:56 
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public ActionResult GetGroupByGroupId(int groupId) {
            RRDLEntities re = new RRDLEntities();
            UserGroupService ugs = new UserGroupService(re);
            re.Configuration.ProxyCreationEnabled = false;
            UserGroup ug = ugs.FindById(groupId);
            return Json(ug);
        }

    }
}
