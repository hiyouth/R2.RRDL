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
using R2.RRDL.Models.Repository;
using System.Data;
namespace R2TeamDeveloperLibrary.Controllers
{
    public class ManageModuleController : Controller
    {
        //
        // GET: /ManageModule/
        public static List<KnowledgeItem> auditlist = new List<KnowledgeItem>();
        public static List<KnowledgeItem> knowledgelist = new List<KnowledgeItem>();
        public static List<KnowledgeItem> knowledgelist2 = new List<KnowledgeItem>();
        public static Boolean auditflag = true;
        public static Boolean manageflag = true;
        //记录修改知识时的审核状态
        public static string state = "";
        public static string searchKey = "";
        public ActionResult Manage()
        {
            return View();
        }


        public ActionResult KnowledgeManage(int numOnePage, int pageIndex, string state, string userGroupId)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                AriticleService ariticleService = new AriticleService();
                List<Ariticle> list = new List<Ariticle>();
                string s = state;
                int count = 0;
                int id = 0;
                id = Int32.Parse(userGroupId);
                switch (state)
                {
                    case null:
                    case "all":
                        if (userGroupId == "2")
                        {
                            Expression<Func<Ariticle, bool>> condition =
                                a => a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved
                                    || a.Approve.ApproveStatus == EnumAriticleApproveStatus.FailedApprove;
                            list = ariticleService.FindAriticlesManage(condition, numOnePage, pageIndex, db);
                            count = ariticleService.GetAriticleCount(condition);
                            break;
                        }
                        else
                        {
                            Expression<Func<Ariticle, bool>> condition =
                                a => (a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved
                                    || a.Approve.ApproveStatus == EnumAriticleApproveStatus.FailedApprove)
                                    && a.User.ContentGroupId == id;
                            list = ariticleService.FindAriticlesManage(condition, numOnePage, pageIndex, db);
                            count = ariticleService.GetAriticleCount(condition);
                            break;
                        }

                    case "AuditPass":
                        if (userGroupId == "2")
                        {
                            //list = ariticleService.FindAriticlesByApproveStatus(EnumAriticleApproveStatus.Approved,
                            //numOnePage, pageIndex, db);
                            //count = ariticleService.GetAriticleCount(EnumAriticleApproveStatus.Approved);
                            Expression<Func<Ariticle, bool>> condition =
                                a => a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved;
                            list = ariticleService.FindAriticlesManage(condition, numOnePage, pageIndex, db);
                            count = ariticleService.GetAriticleCount(condition);
                            break;
                        }
                        else
                        {
                            Expression<Func<Ariticle, bool>> condition =
                                a => a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved
                                    && a.User.ContentGroupId == id;
                            list = ariticleService.FindAriticlesManage(condition, numOnePage, pageIndex, db);
                            count = ariticleService.GetAriticleCount(condition);
                            break;
                        }
                    case "AuditUnqualified":
                        if (userGroupId == "2")
                        {
                            //list = ariticleService.FindAriticlesByApproveStatus(
                            //    EnumAriticleApproveStatus.FailedApprove, numOnePage, pageIndex, db);
                            //count = ariticleService.GetAriticleCount(EnumAriticleApproveStatus.FailedApprove);
                            Expression<Func<Ariticle, bool>> condition =
                                a => a.Approve.ApproveStatus == EnumAriticleApproveStatus.FailedApprove;
                            list = ariticleService.FindAriticlesManage(condition, numOnePage, pageIndex, db);
                            count = ariticleService.GetAriticleCount(condition);
                            break;
                        }
                        else
                        {
                            Expression<Func<Ariticle, bool>> condition =
                                a => a.Approve.ApproveStatus == EnumAriticleApproveStatus.FailedApprove
                                    && a.User.ContentGroupId == id;
                            list = ariticleService.FindAriticlesManage(condition, numOnePage, pageIndex, db);
                            count = ariticleService.GetAriticleCount(condition);
                            break;
                        }
                }
                List<AriticleViewModel> Viewlist = SimplifyAriticle(list);
                string result = JsonConvert.SerializeObject(Viewlist);
                result = result + "ContentAndCount" + count;
                return Content(result);
            }
        }

        public ActionResult KnowledgeAudit(int numOnePage, int pageIndex, string userGroupId)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                AriticleService ariticleService = new AriticleService();
                List<Ariticle> list = new List<Ariticle>();
                int count = 0;
                if (userGroupId == "2")
                {
                    list = ariticleService.FindAriticlesByApproveStatus(
                        EnumAriticleApproveStatus.UnApproved, numOnePage, pageIndex, db);
                    count = ariticleService.GetAriticleCount(EnumAriticleApproveStatus.UnApproved);
                }
                else
                {
                    int id = Int32.Parse(userGroupId);
                    Expression<Func<Ariticle, bool>> condition =
                            a => a.User.ContentGroupId == id && a.Approve.ApproveStatus == EnumAriticleApproveStatus.UnApproved;
                    list = ariticleService.FindAriticles(condition, numOnePage, pageIndex, db);
                    count = ariticleService.GetAriticleCount(condition);
                }
                List<AriticleViewModel> Viewlist = SimplifyAriticle(list);
                string result = JsonConvert.SerializeObject(Viewlist);
                result = result + "ContentAndCount" + count;
                return Content(result);
            }
        }

        public List<AriticleViewModel> SimplifyAriticle(List<Ariticle> list)
        {
            List<AriticleViewModel> result = new List<AriticleViewModel>();
            //AriticleViewModel avm = new AriticleViewModel();
            for (int i = 0; i < list.Count; i++)
            {
                AriticleViewModel avm = new AriticleViewModel(list[i]);
                avm.Id = list[i].Id;
                avm.Title = list[i].Title;
                if (list[i].UGC.Length > 300)
                {
                    avm.UGC = list[i].UGC.Substring(0, 300);
                }
                else
                {
                    avm.UGC = list[i].UGC;
                }
                avm.author = list[i].User.NickName;
                avm.ApproveStatus = list[i].Approve.ApproveStatus;
                result.Add(avm);
            }
            return result;
        }

        public ActionResult Audit(string ariticleId, string userId)
        {
            //PraiseRepository pr = new PraiseRepository();
            //Praise p = new Praise();
            //p.AriticleId = ariticleId;
            //p.PraiseCount = 0;
            //pr.Add(p);
            AriticleApproveService aas = new AriticleApproveService();
            aas.ApproveAriticle(ariticleId, userId, EnumAriticleApproveStatus.Approved, null);
            return null;
        }

        public ActionResult FailedAudit(string ariticleId, string userId, string FailedAuditMessage)
        {
            AriticleApproveService aas = new AriticleApproveService();
            aas.ApproveAriticle(ariticleId, userId, EnumAriticleApproveStatus.FailedApprove, FailedAuditMessage);
            return null;
        }

        public ActionResult GetAriticleById(string ariticleId)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                AriticleService ars = new AriticleService(db);
                Ariticle ariticle = ars.FindById(ariticleId);
                AriticleViewModel avm = new AriticleViewModel(ariticle);
                avm.Title = ariticle.Title;
                avm.UGC = ariticle.UGC;
                avm.author = ariticle.User.NickName;
                avm.Createtime = ariticle.Createtime.ToString();
                Tree tree = new Tree();
                TreeNode treeNode = tree.SearchByAriticle(ariticle.Id);
                List<TreeNode> list = tree.GetTreeNodePath(treeNode);
                string result = "";
                for (int i = list.Count - 1; i >= 0; i--)
                {
                    result = result + list[i].Title + "#";
                }
                string arrayList = "";
                List<AriticleVisibility> visibilityList = ars.GetAriticleVisibility(ariticle.Id);
                UserGroupService ugs = new UserGroupService();
                int count = ugs.FindAll().Count;
                if (0 == visibilityList.Count)
                {
                    arrayList = JsonConvert.SerializeObject(avm) + "AriticleAndTreeNode" + result + "AriticleAndTreeNodeall";
                }
                else {
                    VisibilityViewModel vvm = new VisibilityViewModel();
                    List<VisibilityViewModel> vvlist = new List<VisibilityViewModel>();
                    for (int i = 0; i < visibilityList.Count; i++)
                    {
                        vvm = new VisibilityViewModel();
                        vvm.Id = visibilityList[i].Id;
                        vvm.UserGroupId = visibilityList[i].UserGroupId;
                        vvm.userGroupTitle = visibilityList[i].UserGroup.Title;
                        vvlist.Add(vvm);
                    }
                    string vlist = JsonConvert.SerializeObject(vvlist);
                    arrayList = JsonConvert.SerializeObject(avm) + "AriticleAndTreeNode" + result + "AriticleAndTreeNode" + vlist;
                }
                return Content(arrayList);
            }
        }

        public ActionResult DeleteKnowledge(string currentPage, string index, string countPerPage, string state)
        {
            int c = Int32.Parse(currentPage);
            int i = Int32.Parse(index);
            int cp = Int32.Parse(countPerPage);
            int num = (c - 1) * cp + i;
            string ss = state;
            if (ss == "" || ss == "all")
            {
                knowledgelist.RemoveAt(num);
            }
            else
            {
                switch (ss)
                {
                    case "AuditPass":
                        int numFlag = -1;
                        for (int j = 0; j < knowledgelist.Count; j++)
                        {
                            if (knowledgelist[j].state == "审核通过")
                            {
                                numFlag++;
                                if (numFlag == num)
                                {
                                    knowledgelist.RemoveAt(j);
                                    break;
                                }
                            }
                        }
                        break;
                    case "AuditUnqualified":
                        int numFlag2 = -1;
                        for (int j = 0; j < knowledgelist.Count; j++)
                        {
                            if (knowledgelist[j].state == "审核未通过")
                            {
                                numFlag2++;
                                if (numFlag2 == num)
                                {
                                    knowledgelist.RemoveAt(j);
                                    break;
                                }
                            }
                        }
                        break;
                }
            }
            return null;
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
                for (int i = 0; i < list.Count; i++ )
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
        public string KnowledgeModify(string title, string userId, string invisibility, string tag, string content, string ariticleId, string treeNodeParentId)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                AriticleService ars = new AriticleService(db);
                Ariticle ariticle = ars.FindById(ariticleId);
              
                //添加标题
                ariticle.Title = title;
                //添加内容
                //ariticle.UGC = System.Web.HttpUtility.UrlDecode(content);
                content = System.Web.HttpUtility.UrlDecode(content);
                content = content.Replace("CodeReplacePlus", "+");
                ariticle.UGC = content;
                //添加标签
                string[] tlist = tag.Split(new char[] { ',' });
                List<AriticleTag> tagList = new List<AriticleTag>();
                for (int i = 0; i < tlist.Length; i++)
                {
                    AriticleTag ariticletag = new AriticleTag();
                    ariticletag.Title = tlist[i];
                    ariticletag.AriticleId = ariticleId;
                    // ariticletag.Article = ariticle;
                    tagList.Add(ariticletag);
                }
                AriticleTagRepository tagRepository = new AriticleTagRepository(db);
                tagRepository.UpdateAllRelatedAriticleId(ariticle.Id, tagList);
                //创建一个新节点
                TreeNode treeNode = new TreeNode(Int32.Parse(treeNodeParentId), title);
                treeNode.Ariticle = ariticle;
                Tree tree = new Tree(db);
                tree.AddTreeNode(treeNode);
                //删除旧节点
                TreeNode oldtreeNode = tree.SearchByAriticle(ariticle.Id);
                tree.Drop(oldtreeNode);
                //创建不可见分组信息数组
                string[] inlist = invisibility.Split(new char[] { '；' });
                List<int> invisiblityGroup = new List<int>();
                for (int i = 0; i < inlist.Length - 1; i++)
                {
                    invisiblityGroup.Add(Int32.Parse(inlist[i]));
                }
                ariticle.Approve.ApproveStatus = EnumAriticleApproveStatus.Approved;
                ars.UpdateAriticle(ariticle, invisiblityGroup);
                db.SaveChanges();
                return "success";
            }
        }
    }
}

