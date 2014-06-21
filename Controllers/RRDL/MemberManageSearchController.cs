using Newtonsoft.Json;
using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using R2.RRDL.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace R2.RRDL.Controllers
{
    public class MemberManageSearchController : Controller
    {
        //
        // GET: /MemberManageSearch/
        //会员的NickName、RealName、用户组名
        public ActionResult MemberManageSearch(int numOnePage, int pageIndex, string keyword)
        {
            keyword = System.Web.HttpUtility.UrlDecode(keyword);
            UserService userService = new UserService();
            List<User> list = new List<User>();
            list = userService.FindMembersByKeyword(keyword, numOnePage, pageIndex);
            int count = userService.FindMembersByKeywordCount(keyword);
            UserViewModel uvm;
            List<UserViewModel> uvmlist = new List<UserViewModel>();
            for (int i = 0; i < list.Count; i++)
            {
                if ((list[i].AuthorityCategory == EnumUserCategory.Superman && list[i].RealName != "雷磊") || (list[i].AuthorityCategory != EnumUserCategory.Superman))
                {
                    uvm = new UserViewModel();
                    uvm.Id = list[i].Id;
                    uvm.AuthorityCategory = list[i].AuthorityCategory;
                    uvm.NickName = list[i].NickName;
                    uvm.PersonalDescription = list[i].PersonalDescription;
                    uvm.RegisterName = list[i].RegisterName;
                    uvm.RealName = list[i].RealName;
                    uvm.Gender = list[i].Gender;
                    uvmlist.Add(uvm);
                }
            }
            string result = JsonConvert.SerializeObject(uvmlist);//到这里获取当前所有待审核的用户并序列化
            result = result + "ContentAndCount" + count;
            return Content(result);
        }
    }
}
