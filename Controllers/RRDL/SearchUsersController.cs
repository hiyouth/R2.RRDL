using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using R2.RRDL.ViewModel;

namespace R2.RRDL.Controllers
{
    public class SearchUsersController : Controller
    {
        //
        // GET: /SearchUsers/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SearchAllUser(string key)
        {
            string newkey = System.Web.HttpUtility.UrlDecode(key).ToLower().Trim();
            R2.RRDL.BusinessModel.UserService us = new UserService();
            List<User> lists = new List<User>();
            lists = us.FindAll();
            
            List<UserViewModel> list = new List<UserViewModel>();
            for (int i = 0; i < lists.Count; i++)
            {
                UserViewModel uvm = new UserViewModel();
                uvm.Id = lists[i].Id;
                uvm.ApproveStatus = lists[i].ApproveStatus;
                uvm.RealName = lists[i].RealName;
                uvm.RegisterName = lists[i].RegisterName;
                uvm.ReplyContent = lists[i].ReplyContent;
                uvm.NickName = lists[i].NickName;
                uvm.Gender = lists[i].Gender;
                uvm.AuthorityCategory = lists[i].AuthorityCategory;
                uvm.PersonalDescription = lists[i].PersonalDescription;

                if ((R2.RRDL.Models.EnumAriticleApproveStatus)uvm.ApproveStatus == R2.RRDL.Models.EnumAriticleApproveStatus.UnApproved && uvm.RealName.ToLower().Contains(newkey))
                {
                    list.Add(uvm);
                }
            }

            string result = JsonConvert.SerializeObject(list);
            result = result + "ContentAndCount" + list.Count.ToString();
            return Content(result);
        }

        public ActionResult SearchPorformUser(string key)
        {
            int groupId = 0;
            string newkey = System.Web.HttpUtility.UrlDecode(key).ToLower().Trim();
            R2.RRDL.BusinessModel.UserService us = new UserService();
            UserGroupService ugs = new UserGroupService();

            List<User> lists = new List<User>();
            List<UserGroup> listsgroup = new List<UserGroup>();
            listsgroup = ugs.FindAll();
            lists = us.FindAll();

            List<UserViewModel> listuvm = new List<UserViewModel>();
            for (int i = 0; i < listsgroup.Count; i++)
            {
                UserGroup ug = new UserGroup();
                ug = listsgroup[i];
                if (ug.Title.ToLower().Contains(newkey))
                {
                    groupId = ug.Id;
                    for (int j = 0; j < lists.Count; j++)
                    {
                        UserViewModel uvm = new UserViewModel();
                        uvm.Id = lists[j].Id;
                        uvm.ApproveStatus = lists[j].ApproveStatus;
                        uvm.RealName = lists[j].RealName;
                        uvm.RegisterName = lists[j].RegisterName;
                        uvm.ReplyContent = lists[j].ReplyContent;
                        uvm.NickName = lists[j].NickName;
                        uvm.Gender = lists[j].Gender;
                        uvm.AuthorityCategory = lists[j].AuthorityCategory;
                        uvm.PersonalDescription = lists[j].PersonalDescription;

                        if ((R2.RRDL.Models.EnumAriticleApproveStatus)uvm.ApproveStatus == R2.RRDL.Models.EnumAriticleApproveStatus.Approved && lists[j].ContentGroupId == groupId)
                        {
                            if (!isExtence(listuvm, uvm))
                            {
                                listuvm.Add(uvm);
                            }
                        }
                    }
                }
            }
            if (listuvm.Count <= 0)
            {
                for (int j = 0; j < lists.Count; j++)
                {
                    UserViewModel uvm1 = new UserViewModel();
                    uvm1.Id = lists[j].Id;
                    uvm1.ApproveStatus = lists[j].ApproveStatus;
                    uvm1.RealName = lists[j].RealName;
                    uvm1.RegisterName = lists[j].RegisterName;
                    uvm1.ReplyContent = lists[j].ReplyContent;
                    uvm1.NickName = lists[j].NickName;
                    uvm1.Gender = lists[j].Gender;
                    uvm1.AuthorityCategory = lists[j].AuthorityCategory;
                    uvm1.PersonalDescription = lists[j].PersonalDescription;

                    if ((R2.RRDL.Models.EnumAriticleApproveStatus)uvm1.ApproveStatus == R2.RRDL.Models.EnumAriticleApproveStatus.Approved && uvm1.RealName.Contains(newkey))
                    {
                        if (!isExtence(listuvm, uvm1))
                        {
                            listuvm.Add(uvm1);
                        }
                    }
                }
            }
            if (newkey.ToLower().Contains("管理员") || newkey.ToLower().Contains("管理") || newkey.ToLower().Contains("管") || newkey.ToLower().Contains("理"))
            {
                for (int k = 0; k < lists.Count; k++)
                {
                    UserViewModel uvm2 = new UserViewModel();
                    uvm2.Id = lists[k].Id;
                    uvm2.ApproveStatus = lists[k].ApproveStatus;
                    uvm2.RealName = lists[k].RealName;
                    uvm2.RegisterName = lists[k].RegisterName;
                    uvm2.ReplyContent = lists[k].ReplyContent;
                    uvm2.NickName = lists[k].NickName;
                    uvm2.Gender = lists[k].Gender;
                    uvm2.AuthorityCategory = lists[k].AuthorityCategory;
                    uvm2.PersonalDescription = lists[k].PersonalDescription;

                    if ((R2.RRDL.Models.EnumAriticleApproveStatus)uvm2.ApproveStatus == R2.RRDL.Models.EnumAriticleApproveStatus.Approved && uvm2.AuthorityCategory == R2.RRDL.Models.EnumUserCategory.Administrator)
                    {
                        if (!isExtence(listuvm, uvm2))
                        {
                            listuvm.Add(uvm2);
                        }
                    }
                }
            }

            string result = JsonConvert.SerializeObject(listuvm);
            result = result + "ContentAndCount" + listuvm.Count.ToString();
            return Content(result);
        }

        public bool isExtence(List<UserViewModel> listuvm,UserViewModel uvm) 
        {
            for (int i = 0; i < listuvm.Count; i++) 
            {
                if (listuvm[i].Id == uvm.Id)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
