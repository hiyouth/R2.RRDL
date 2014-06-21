using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using Newtonsoft.Json;
using R2.RRDL.ViewModel;
using R2.RRDL.Models.Repository;
namespace R2.RRDL.Controllers
{
    public class AriticleController : Controller
    {
        //
        // GET: /Ariticle/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult UploadAriticle()
        {
            UserGroupService ugs = new UserGroupService();
            List<UserGroup> list = ugs.FindAll();
            List<UserGroupViewModel> ugvlist = new List<UserGroupViewModel>();
            UserGroupViewModel ugv;
            for (int i = 0; i < list.Count; i++)
            {
                ugv = new UserGroupViewModel(list[i]);
                ugvlist.Add(ugv);
            }
            string result = JsonConvert.SerializeObject(ugvlist);
            ViewBag.OpenString = result;
            return View();
        }



        //当数据源为SQL时调用 
        //ModeType: "view", IsLoadLeaf: isLoadLeaf, NodeId: pId, XmlUrl: xmlUrl
        //public ActionResult GetTreeByRootId(string ModeType, string IsLoadLeaf, string NodeId)
        //{

        //    Tree tree = new Tree("开发技术");
        //    string result = "";
        //    if (NodeId != "")
        //    {
        //        int rootId = Int32.Parse(NodeId);
        //        List<TreeNode> list = tree.GetTreeNodeChild(rootId);
        //        result = JsonConvert.SerializeObject(list);
        //    }
        //    else
        //    {
        //        //"[{\"Ariticle\":null,\"Id\":6,\"Title\":\"Html\",\"Deepth\":2,\"ParentId\":1,\"IsLeaf\":true}]
        //        result = "[{\"Ariticle\":\"null\",\"Id\":\"" + tree.RootNode.Id + "\",\"Title\":\"" + tree.RootNode.Title + "\",\"Deepth\":\"" + tree.RootNode.Deepth + "\",\"ParentId\":\"null\",\"IsLeaf\":\"" + tree.RootNode.IsLeaf + "\"}]";
        //        //result = JsonConvert.SerializeObject(result);
        //    }

        //    // List<TreeNode>

        //    return Content(result);
        //}

        public string AddAriticle(string title, string userId, string visibility, string tag, string content, string treeNodeParentId)
        {
            Ariticle ariticle = new Ariticle();
            //添加标题
            ariticle.Title = title;
            //添加内容
            //ariticle.UGC = System.Web.HttpUtility.UrlDecode(content);
            content = System.Web.HttpUtility.UrlDecode(content);
            content = content.Replace("CodeReplacePlus", "+");
            ariticle.UGC = content;
            //ariticle.UGC = content;
            //添加标签
            string[] tlist = tag.Split(new char[] { ',' });
            List<AriticleTag> Tags = new List<AriticleTag>();
            AriticleTag ariticletag = new AriticleTag();
            for (int i = 0; i < tlist.Length; i++)
            {
                ariticletag = new AriticleTag();
                ariticletag.Title = tlist[i];
               // ariticletag.Article = ariticle;
                Tags.Add(ariticletag);
            }
            ariticle.Tags = Tags;
            //创建一个新节点
            TreeNode treeNode = new TreeNode(Int32.Parse(treeNodeParentId), title);
            //创建不可见分组信息数组
            string[] inlist = visibility.Split(new char[] { '；' });
            List<int> visiblityGroup = new List<int>();
            for (int i = 0; i < inlist.Length - 1; i++)
            {
                visiblityGroup.Add(Int32.Parse(inlist[i]));
            }
            AriticleService ariticleService = new AriticleService();
            ariticleService.NewAriticle(ariticle, visiblityGroup,userId,treeNode);
            return "success";
        }

        //2014年1月2日15:38:36 郭毅
        public ActionResult GetNewestAriticles(int count, string userId) 
        {
            IQueryable<Ariticle> ariticles;
            List<Ariticle> ariticleList;
            List<AriticleViewModel> newestAriticleList = new List<AriticleViewModel>();
            AriticleRepository ariticleRepository = new AriticleRepository();
            ariticles = ariticleRepository.FindAll();
            ariticles = ariticles.Where(a => a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved);
            ariticles = ariticles.OrderByDescending(a => a.Createtime);
            ariticleList = ariticles.ToList();
            if (userId == "null") {
                userId = null;
            }
            ariticleList = isVisibilityUser(ariticleList, userId);
            
            newestAriticleList = SimplifyAriticle(count,ariticleList);
            string result = JsonConvert.SerializeObject(newestAriticleList);
            return Content(result);
        }
        public List<AriticleViewModel> SimplifyAriticle(int count,List<Ariticle> list)
        {
            List<AriticleViewModel> result = new List<AriticleViewModel>();
            int listCount = result.Count;
            PraiseRepository pr = new PraiseRepository();

            int n = 0;
            if (result.Count >= count)
                n = count;
            else
                n = listCount;
            for (int i = 0; i < n; i++)
            {
                AriticleViewModel avm = new AriticleViewModel(list[i]);
                avm.Id = list[i].Id;
                avm.Title = list[i].Title;
                //if (list[i].UGC.Length > 300)
                //{
                //    avm.UGC = list[i].UGC.Substring(0, 300);
                //}
                //else
                //{
                    avm.UGC = list[i].UGC;
                //}
                avm.author = list[i].User.NickName;
                avm.ApproveStatus = list[i].Approve.ApproveStatus;
                //avm.PraiseCount = pr.FindByAriticleID((list[i].Id)).PraiseCount;
                result.Add(avm);
            }
            return result;
        }
        public List<Ariticle> isVisibilityUser(List<Ariticle> list, string userid)
        {
            AriticleService ars = new AriticleService();
            List<Ariticle> newlists = new List<Ariticle>();
            for (int i = 0; i < list.Count; i++)
            {
                if (ars.GetAriticleVisibilityByUser(list[i].Id, userid))
                {
                    newlists.Add(list[i]);
                }
            }
            return newlists;
        }
    }
}
