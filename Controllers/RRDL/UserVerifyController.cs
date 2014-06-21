using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2TeamDeveloperLibrary.Models;
using Newtonsoft.Json;
using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using R2.RRDL.ViewModel;
namespace R2TeamDeveloperLibrary.Controllers
{
    public class UserVerifyController : Controller
    {
        //
        // GET: /UserVerify/
        public static List<UserToBeVerified> userlist = new List<UserToBeVerified>();
        public static Boolean auditflag = true;
        public static string searchKey = "";
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult GetUsersToBeVerified(int numOnePage, int pageIndex)
        {
            EnumUserApproveStatus approveStatus = EnumUserApproveStatus.UnApproved;
            UserService userService = new UserService();
            List<User> list = new List<User>();
            list = userService.FindUsersByApproveStatus(approveStatus, numOnePage, pageIndex);
            UserViewModel uvm;
            List<UserViewModel> uvmlist = new List<UserViewModel>();
            for (int i = 0; i < list.Count; i++ )
            {
                uvm = new UserViewModel();
                uvm.Id = list[i].Id;
                uvm.NickName = list[i].NickName;
                uvm.PersonalDescription = list[i].PersonalDescription;
                uvm.RegisterName = list[i].RegisterName;
                uvm.RealName = list[i].RealName;
                uvm.Gender = list[i].Gender;
                uvmlist.Add(uvm);
            }
            string result = JsonConvert.SerializeObject(uvmlist);//到这里获取当前所有待审核的用户并序列化

            //以下获取所有待审核用户的总数
            UserService userService2 = new UserService();
            int n = userService2.GetUserCount(EnumUserApproveStatus.UnApproved);
            string numberS = n.ToString();

            result = result + "ContentAndCount" + numberS;
            return Content(result);
        }


        //动态获取当前数据库中的 组 列表
        public ActionResult GetGroups()
        {
            UserGroupService usergroup = new UserGroupService();
            List<UserGroup> usergrouplist = new List<UserGroup>();
            usergrouplist = usergroup.FindAll();
            List<UserGroupViewModel> ugvlist = new List<UserGroupViewModel>();
            UserGroupViewModel ugv;
            for (int i = 0; i < usergrouplist.Count; i++)
            {
                ugv = new UserGroupViewModel(usergrouplist[i]);
                ugvlist.Add(ugv);
            }
            //string resultlist = JsonConvert.SerializeObject(ugvlist);
            string result = JsonConvert.SerializeObject(ugvlist);
            return Content(result);
        }



        public string DetelteTheUser(string userId)
        {
            //用户Id已经拿到，删除暂不处理  ZHAOs 2013年10月30日16:58:12
            UserService userService = new UserService();
            userService.Drop(userId);
            return "success";
        }


        public string GetAUserInfo(string userId) {
            UserService userservice = new UserService();
            User user = userservice.FindById(userId);
            UserViewModel uvm = new UserViewModel();
            uvm.RegisterName = user.RegisterName;
            uvm.RealName = user.RealName;
            uvm.NickName = user.NickName;
            uvm.Gender = user.Gender;
            uvm.PersonalDescription = user.PersonalDescription;
            string result = JsonConvert.SerializeObject(uvm);
            return result;
        }

        public string PassTheUser(string userId, int userGroupId)
        {            
            UserService userservice = new UserService();
            User user = userservice.FindById(userId);
            user.ApproveStatus = EnumUserApproveStatus.Approved;
            user.AuthorityCategory = EnumUserCategory.Membership;
            user.ContentGroupId = userGroupId;
            userservice.UpdateUser(user);
            return "success";
        }

        public ActionResult Search(string start, string end, string key)
        {
            int s = Int32.Parse(start);
            int e = Int32.Parse(end);
            searchKey = key;
            List<UserToBeVerified> searchUserlist = new List<UserToBeVerified>();
            for (int i = 0; i < userlist.Count; i++)
            {
                if (userlist[i].account == searchKey)
                {
                    searchUserlist.Add(userlist[i]);
                }
            }
            if (e > searchUserlist.Count)
            {
                e = searchUserlist.Count;
            }
            List<UserToBeVerified> resultList = new List<UserToBeVerified>();
            for (int i = s; i < e; i++)
            {
                resultList.Add(searchUserlist[i]);
            }
            string result = JsonConvert.SerializeObject(resultList);
            result = result + "#" + searchUserlist.Count;
            return Content(result);
        }
        //黄圣2014/04/22
        public string GetAllUser()
        {
            var userService = new UserService();
            List<User> list = userService.GetTeamList();
            var leileimodel = userService.FindByRegisterName("nicely");
            leileimodel.ContentGroup = new UserGroup { Title = "R2Team" };                                           
            list.Add(leileimodel);
            var uvmlist = list.Select(t => new UserViewModel
            {
                Id = t.Id, ApproveStatus = t.ApproveStatus, AuthorityCategory = t.AuthorityCategory, NickName = t.NickName, PersonalDescription = t.PersonalDescription, RegisterName = t.RegisterName, RealName = t.RealName, Gender = t.Gender, UserGroup = t.ContentGroup.Title
            }).ToList();

            var result = JsonConvert.SerializeObject(uvmlist);
            return result;

        }


    }
}
