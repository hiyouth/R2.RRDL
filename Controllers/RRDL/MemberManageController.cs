using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2TeamDeveloperLibrary.Models;
using Newtonsoft.Json;
using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using R2.RRDL.ViewModel;
using System.Linq.Expressions;
namespace R2TeamDeveloperLibrary.Controllers
{
    public class MemberManageController : Controller
    {
        //
        // GET: /MemberManage/
        public static List<UserToBeVerified> List = new List<UserToBeVerified>();
        public static Boolean auditflag = true;
        public static string searchKey = "";
        public ActionResult Index()
        {
            return View();
        }

        //无参数传入，返回当前所有会员的序列化字符串和当前会员总数
        public ActionResult GetMembers(int numOnePage, int pageIndex)
        {
                UserService userservice = new UserService();
                List<User> list = new List<User>();
                list = userservice.FindUsersByApproveStatus(EnumUserApproveStatus.Approved, numOnePage, pageIndex);
                //因为需要返回的用户属性信息只是一部分，所以要新建一个类型来保存User的部分属性即可
                List<MemberViewModel> memberList = new List<MemberViewModel>();
                for (int i = 0; i < list.Count; i++)
                {
                    if ((list[i].AuthorityCategory == EnumUserCategory.Superman && list[i].RealName != "雷磊") || (list[i].AuthorityCategory != EnumUserCategory.Superman) )
                    {
                        MemberViewModel member = new MemberViewModel(list[i]);
                        member.RealName = list[i].RealName;
                        member.AuthorityCategory = list[i].AuthorityCategory;
                        //member.ContentGroup = list[i].ContentGroup;
                        member.Id = list[i].Id;
                        memberList.Add(member);
                    }
                }
                string result = JsonConvert.SerializeObject(memberList);
                //以下获取所有会员的总个数
                UserService userservice1 = new UserService();
                int number = userservice1.GetUserCount(EnumUserApproveStatus.Approved);
                result = result + "ContentAndCount" + number;
                return Content(result);
        }


        //public string getMemberById(string userId) {
        //    UserService userservice = new UserService();
        //    User user = userservice.FindById(userId);
        //    MemberViewModel mvm = new MemberViewModel(user);
        //    UserGroupService ugs = new UserGroupService();
        //    List<UserGroup> list = ugs.FindAll();
        //    string memberResult = JsonConvert.SerializeObject(mvm);
        //    List<UserGroupViewModel> ugvlist = new List<UserGroupViewModel>();
        //    UserGroupViewModel ugv;
        //    for (int i = 0; i < list.Count; i++)
        //    {
        //        ugv = new UserGroupViewModel(list[i]);
        //        ugvlist.Add(ugv);
        //    }
        //    string result = JsonConvert.SerializeObject(ugvlist);
        //    return memberResult+"MemberAndGroupList"+result;
        //}


        public string getMemberById(string userId)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                UserService userservice = new UserService();
                User user = userservice.FindById(userId);
                MemberViewModel mvm = new MemberViewModel(user);
                int approvedcount = 0;
                int allcount = 0;
                AriticleService ariticleService = new AriticleService();
                Expression<Func<Ariticle, bool>> condition =
                               a => a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved
                                   && a.UserId == user.Id;
                approvedcount = ariticleService.GetAriticleCount(condition);
                condition =
                        a => a.UserId == user.Id;
                allcount = ariticleService.GetAriticleCount(condition);
                mvm.approvedArticleCount = approvedcount;
                mvm.allArticleCount = allcount;
                UserGroupService ugs = new UserGroupService();
                List<UserGroup> list = ugs.FindAll();
                string memberResult = JsonConvert.SerializeObject(mvm);
                List<UserGroupViewModel> ugvlist = new List<UserGroupViewModel>();
                UserGroupViewModel ugv;
                for (int i = 0; i < list.Count; i++)
                {
                    ugv = new UserGroupViewModel(list[i]);
                    ugvlist.Add(ugv);
                }
                string result = JsonConvert.SerializeObject(ugvlist);
                return memberResult + "MemberAndGroupList" + result;
            }
        }

		 public int GetAriticleCount(string userId)
				{
					AriticleService ariticleService = new AriticleService();
					int ariticleCount = ariticleService.GetAriticleCount(userId);
					return ariticleCount;
				}

	    public string DetelteTheMember(string userId)
				{
					UserService userService = new UserService();
					userService.Drop(userId);
					return "success";     
				}



        public ActionResult Search(string start, string end, string key)
        {
            int s = Int32.Parse(start);
            int e = Int32.Parse(end);
            searchKey = key;
            List<UserToBeVerified> searchUserlist = new List<UserToBeVerified>();
            for (int i = 0; i < List.Count; i++)
            {
                if (List[i].account == searchKey)
                {
                    searchUserlist.Add(List[i]);
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






        //传入新的用户属性，将后台用户属性更改成传入的内容
        public string ModifyMemberAttrs(string userId, string userGroupId, string userAuthorityCategory)
        {
            UserService userservice = new UserService();
            User user = userservice.FindById(userId);
            user.ApproveStatus = EnumUserApproveStatus.Approved;
            user.AuthorityCategory = (EnumUserCategory)Convert.ToInt32(userAuthorityCategory);
            user.ContentGroupId = Convert.ToInt32(userGroupId);
            userservice.UpdateUser(user);
            return "success";           
        }
    }
}
