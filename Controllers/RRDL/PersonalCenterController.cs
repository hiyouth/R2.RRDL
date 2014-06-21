using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2TeamDeveloperLibrary.Models;
using Newtonsoft.Json;
using R2.RRDL.Models;
using R2.RRDL.BusinessModel;
using R2.RRDL.Controllers;
using R2.RRDL.ViewModel;
using R2.RRDL.Models.Repository;
using System.Linq.Expressions;
namespace R2TeamDeveloperLibrary.Controllers
{
    public class PersonalCenterController : Controller
    {
        //
        // GET: /PersonalCenter/
        public static List<KnowledgeItem> auditlist = new List<KnowledgeItem>();
        public static Boolean auditflag = true;
        public ActionResult PersonalCenter()
        {
            return View();
        }


        //参数 用户名 每页条数  页码
        public ActionResult ShowOwnKnowledgeItem(string userId, int numOnePage, int pageIndex)
        {
            using (RRDLEntities db = new RRDLEntities())
            {              
                AriticleService articleService = new AriticleService();
                List<Ariticle> list = new List<Ariticle>();
                list = articleService.FindAriticlesByUser(userId, numOnePage, pageIndex, db);
                int n = list.Count;
                AriticleService articleService1 = new AriticleService();
                int totalCount = articleService1.GetAriticleCount(userId);
                List<AriticleViewModel> ariticleList = new List<AriticleViewModel>();
                for (int i = 0; i < n; i++)
                {
                    AriticleViewModel temp = new AriticleViewModel(list[i]);
                    temp.ApproveStatus = list[i].Approve.ApproveStatus;
                    temp.Id = list[i].Id;
                    string time1 = list[i].Createtime.ToLongDateString();
                    string time2 = list[i].Createtime.ToLongTimeString();
                    temp.Createtime = time1 + "  " + time2;
                    temp.Title = list[i].Title;
                    if (list[i].UGC.Length > 300)
                    {
                        temp.UGC = list[i].UGC.Substring(0, 300);
                    }
                    else
                    {
                        temp.UGC = list[i].UGC;
                    }
                    // temp.Tags = list[i].Tags;
                    temp.Title = list[i].Title;
                    temp.User = null;
                    ariticleList.Add(temp);
                }
                string length = (ariticleList.Count).ToString();
                string result = JsonConvert.SerializeObject(ariticleList);
                result = result + "ContentAndCount" + totalCount;
                return Content(result);
            }
        }


        public string DeleteAriticle(string currentPage, string index, string countPerPage, string ariticleId)
        {
            //int c = Int32.Parse(currentPage);
            //int i = Int32.Parse(index);
            //int cp = Int32.Parse(countPerPage);
            //int num = (c - 1) * cp + i;
            //auditlist.RemoveAt(num);
            //根据知识Id删除知识
            AriticleService ariticleservice = new AriticleService();
            ariticleservice.DropAriticle(ariticleId);
            return "success";
        }

        public ActionResult ToKnowledgeModify(string ariticleId)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                AriticleService ars = new AriticleService(db);
                Ariticle ariticle = ars.FindById(ariticleId);
                AriticleViewModel avm = new AriticleViewModel(ariticle);
                List<AriticleVisibility> visibilityList = ars.GetAriticleVisibility(ariticle.Id);
                avm.Id = ariticle.Id;
                string result = JsonConvert.SerializeObject(avm);
                ViewBag.Ariticle = result;
                UserGroupService ugs = new UserGroupService();
                List<UserGroup> list = ugs.FindAll();
                List<UserGroupViewModel> ugvlist = new List<UserGroupViewModel>();
                UserGroupViewModel ugv;
                for (int i = 0; i < list.Count; i++)
                {
                    ugv = new UserGroupViewModel(list[i]);
                    ugvlist.Add(ugv);
                }
                string resultlist = JsonConvert.SerializeObject(ugvlist);
                ViewBag.OpenString = resultlist;
                Tree tree = new Tree();
                TreeNode treeNode = tree.SearchByAriticle(ariticle.Id);
                List<TreeNode> treelist = tree.GetTreeNodePath(treeNode);
                string treeresult = "";
                for (int i = treelist.Count - 1; i >= 0; i--)
                {
                    treeresult = treeresult + treelist[i].Title + "TreePathSplit";
                }
                ViewBag.TreeId = treeNode.ParentId;
                ViewBag.TreePath = treeresult;
                VisibilityViewModel vvm = new VisibilityViewModel();
                List<VisibilityViewModel> vvlist = new List<VisibilityViewModel>();
                int count = ugs.FindAll().Count;
                if (count == visibilityList.Count)
                {
                    ViewBag.visibilityList = "all";
                }
                else
                {
                    for (int i = 0; i < visibilityList.Count; i++)
                    {
                        vvm = new VisibilityViewModel();
                        vvm.Id = visibilityList[i].Id;
                        vvm.UserGroupId = visibilityList[i].UserGroupId;
                        vvlist.Add(vvm);
                    }
                    string vlist = JsonConvert.SerializeObject(vvlist);
                    ViewBag.visibilityList = vlist;
                }
                string author = ariticle.User.NickName;
                string createTime = ariticle.Createtime.ToString();
                ViewBag.author = author;
                ViewBag.createTime = createTime;
                return View();
            }
        }


        //根据传进来的id查到此条知识的详细信息，并返回JSON
        public string GetKnowledgeDetails(string ariticleId)
        {
            //using (RRDLEntities db = new RRDLEntities())
            //{
            //    AriticleService ariticleservice = new AriticleService();
            //    Ariticle ariticle = ariticleservice.FindById(ariticleId);
            //    AriticleViewModel art = new AriticleViewModel(ariticle);
            //    string result = JsonConvert.SerializeObject(art);
            //    return result;
            //}
            using (RRDLEntities db = new RRDLEntities())
            {
                AriticleService ars = new AriticleService(db);
                Ariticle ariticle = ars.FindById(ariticleId);
                AriticleViewModel avm = new AriticleViewModel(ariticle);
                //avm.Title = ariticle.Title;
                //avm.UGC = ariticle.UGC;
                string result = JsonConvert.SerializeObject(avm);
                return result;
            }
        }

        public string GetSystemMessage(string ariticleId) {
            using (RRDLEntities db = new RRDLEntities())
            {
                AriticleService ars = new AriticleService(db);
                Ariticle ariticle = ars.FindById(ariticleId);
                string replay = ariticle.Approve.ReplyContent;                
                return replay;
            }
        }


        public string GetUserById(string userId)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                UserService us = new UserService();
                User user = us.FindById(userId);
                UserViewModel uvm = new UserViewModel();
                uvm.NickName = user.NickName;
                uvm.RealName = user.RealName;
                uvm.RegisterName = user.RegisterName;
                uvm.Category = getAuthorityCategory(user.AuthorityCategory);
                int ugid = (int)user.ContentGroupId;
                UserGroupService ugs = new UserGroupService();
                UserGroup ug = ugs.FindById(ugid);
                uvm.UserGroup = ug.Title;
                uvm.CreateTime = user.Createtime.ToString();
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
                uvm.approvedArticleCount = approvedcount;
                uvm.allArticleCount = allcount;
                string result = JsonConvert.SerializeObject(uvm);
                return result;
            }
        }

        public string getAuthorityCategory(EnumUserCategory category) { 
            string result = "";
            switch(category){
                case EnumUserCategory.Visitor:
                    result = "游客";
                    break;
                case EnumUserCategory.Membership:
                    result = "会员";
                    break;
                case EnumUserCategory.Administrator:
                    result = "管理员";
                    break;
                case EnumUserCategory.Superman:
                    result = "超级管理员";
                    break;
            }
            return result;
        }

        //js传入用户名和用户输入的旧密码，如果输入密码正确返回成功，否则返回错误
        public string IsPasswordRight(string username, string password)
        {
            Login login = new Login();
            User user = login.UserProfileMatchs(username, password);
            if (user == null)
                return "failed";
            else
                return "success";
        }
        //传入用户名和密码，更新用户密码
        public string UpdateUser(string userId, string password)
        {
            string id = userId;
            UserService uservice = new UserService();
            User user = uservice.FindById(id);
            user.Password = password;
            uservice.UpdateUser(user);
            return "success";
        }

        public string KnowledgeModify(string ariticleJson)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                AriticleJson ariticlejson = (AriticleJson)JsonConvert.DeserializeObject(ariticleJson, typeof(AriticleJson));

                AriticleService ars = new AriticleService(db);
                Ariticle ariticle = ars.FindById(ariticlejson.Id);

                //添加标题
                ariticle.Title = ariticlejson.title;
                //添加内容
                //ariticle.UGC = System.Web.HttpUtility.UrlDecode(ariticlejson.UGC);
                ariticlejson.UGC = System.Web.HttpUtility.UrlDecode(ariticlejson.UGC);
                ariticlejson.UGC = ariticlejson.UGC.Replace("CodeReplacePlus", "+");
                ariticle.UGC = ariticlejson.UGC;
                //添加标签
                string[] tlist = ariticlejson.tag.Split(new char[] { ',' });
                List<AriticleTag> tagList = new List<AriticleTag>();
                for (int i = 0; i < tlist.Length; i++)
                {
                    AriticleTag ariticletag = new AriticleTag();
                    ariticletag.Title = tlist[i];
                    ariticletag.AriticleId = ariticlejson.Id;
                    // ariticletag.Article = ariticle;
                    tagList.Add(ariticletag);
                }
                AriticleTagRepository tagRepository = new AriticleTagRepository(db);
                tagRepository.UpdateAllRelatedAriticleId(ariticle.Id, tagList);
                //创建一个新节点
                TreeNode treeNode = new TreeNode(Int32.Parse(ariticlejson.treeNodeParentId), ariticlejson.title);
                treeNode.Ariticle = ariticle;
                Tree tree = new Tree(db);
                tree.AddTreeNode(treeNode);
                //删除旧节点
                TreeNode oldtreeNode = tree.SearchByAriticle(ariticle.Id);
                tree.Drop(oldtreeNode);
                //创建不可见分组信息数组
                string[] inlist = ariticlejson.invisibility.Split(new char[] { '；' });
                List<int> invisiblityGroup = new List<int>();
                for (int i = 0; i < inlist.Length - 1; i++)
                {
                    invisiblityGroup.Add(Int32.Parse(inlist[i]));
                }
                //判断是否为管理员或超级管理员修改，审核状态保持已通过审核
                UserService us = new UserService();
                User user = us.FindById(ariticlejson.UserId);
                if (user.AuthorityCategory != EnumUserCategory.Administrator && user.AuthorityCategory != EnumUserCategory.Superman)
                {
                    ariticle.Approve.ApproveStatus = EnumAriticleApproveStatus.UnApproved;
                }
                else {
                    ariticle.Approve.ApproveStatus = EnumAriticleApproveStatus.Approved;
                }
                ars.UpdateAriticle(ariticle, invisiblityGroup);
                db.SaveChanges();
                return "success";
            }
        }


    }
}

