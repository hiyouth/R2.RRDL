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
    public class KnowledgeManageSearchController : Controller
    {   
        //知识标题、知识标签、上传者的NickName
        //检索范围为审核未通过 或者  已通过
        public ActionResult Search(int numOnePage, int pageIndex, string keyword)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                keyword = System.Web.HttpUtility.UrlDecode(keyword);
                AriticleService ariticleService = new AriticleService(db);
                List<Ariticle> finalList = new List<Ariticle>();
                List<Ariticle> list = new List<Ariticle>();  
                list = ariticleService.KnowledgeManageSearchAriticles(keyword, numOnePage, pageIndex); //Tags  Title  NickName 
                int count = ariticleService.KnowledgeManageSearchAriticlesCount(keyword);
                List<AriticleViewModel> Viewlist = SimplifyAriticle(list);
                string result = JsonConvert.SerializeObject(Viewlist);
                result = result + "ContentAndCount" + count;
                return Content(result);
            }
        }
        /// 以下是select框选择时的方法
        public ActionResult SelectSearch(int numOnePage, int pageIndex, string keyword, int ariticleApproveStatus)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                keyword = System.Web.HttpUtility.UrlDecode(keyword);
                AriticleService ariticleService = new AriticleService(db);
                List<Ariticle> list = new List<Ariticle>();
                list = ariticleService.KnowledgeManageSelectSearchAriticles(keyword, ariticleApproveStatus, numOnePage, pageIndex, db);
                int count = ariticleService.KnowledgeManageSelectSearchAriticlesCount(keyword, ariticleApproveStatus,  db);
                List<AriticleViewModel> Viewlist = SimplifyAriticle(list);
                string result = JsonConvert.SerializeObject(Viewlist);
                result = result + "ContentAndCount" + count;
                return Content(result);
            }
        }





        public List<AriticleViewModel> SimplifyAriticle(List<Ariticle> list)
        {
            List<AriticleViewModel> result = new List<AriticleViewModel>();
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
    }
}
