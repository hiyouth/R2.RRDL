using R2.RRDL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2.RRDL.BusinessModel;
using Newtonsoft.Json;
using R2.RRDL.ViewModel;

namespace R2.RRDL.Controllers
{
    public class PersonalCenterSearchController : Controller
    {
        //
        // GET: /PersonalCenterSearch/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult TextSearch(string userId, string keyword, int numOnePage, int pageIndex)
        {   
            //知识分类  知识标题  知识标签
            using (RRDLEntities db = new RRDLEntities())
            {
                keyword = System.Web.HttpUtility.UrlDecode(keyword);
                AriticleService articleService = new AriticleService(db);
                List<Ariticle> list = new List<Ariticle>();
                list = articleService.PCSearchAriticles(userId, keyword, numOnePage, pageIndex, db);
                int count = articleService.PCSearchAriticlesCount(userId, keyword, db);
                List<AriticleViewModel> Viewlist = SimplifyAriticle(list);
                string result = JsonConvert.SerializeObject(Viewlist);
                result = result + "ContentAndCount" + count;
                return Content(result);
            }
        }


        public ActionResult TextAndSelectSearch(string userId, string keyword, int ariticleApproveStatus, int numOnePage, int pageIndex)
        {   
            //知识分类  知识标题  知识标签  审核状态
            using (RRDLEntities db = new RRDLEntities())
            {                
                AriticleService articleService = new AriticleService(db);
                List<Ariticle> list = new List<Ariticle>();
                list = articleService.PCSelectSearchAriticles(userId, keyword, ariticleApproveStatus, numOnePage, pageIndex, db);
                List<AriticleViewModel> Viewlist = SimplifyAriticle(list);
                int count = articleService.PCSelectSearchAriticlesCount(userId, keyword, ariticleApproveStatus, db);
                string result = JsonConvert.SerializeObject(Viewlist);
                result = result + "ContentAndCount" + count;
                return Content(result);             
             
            }
        }

        ///////////////////
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
                avm.Createtime = Convert.ToString(list[i].Createtime);
                avm.author = list[i].User.NickName;
                avm.ApproveStatus = list[i].Approve.ApproveStatus;
                result.Add(avm);
            }
            return result;
        }
    
    }
}
