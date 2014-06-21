using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2.RRDL.ViewModel;
using Newtonsoft.Json;
using R2.RRDL.Models;
using R2.RRDL.BusinessModel;
using System.Linq.Expressions;

namespace R2.RRDL.Controllers
{
    public class KnowledgeAuditSearchController : Controller
    {   
        //知识标题、知识标签、上传者昵称
        public ActionResult Search(int numOnePage, int pageIndex, string keyword)
        {  
            using (RRDLEntities db = new RRDLEntities())
            {
                keyword = System.Web.HttpUtility.UrlDecode(keyword);
                AriticleService ariticleService = new AriticleService(db);
                List<Ariticle> list = new List<Ariticle>();
                list = ariticleService.KnowledgeAuditSearchAriticles(keyword, numOnePage, pageIndex);
                int count = ariticleService.KnowledgeAuditSearchAriticlesCount(keyword);
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

    }
}
