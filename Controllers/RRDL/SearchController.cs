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
using R2.RRDL.Models.Repository;
namespace R2TeamDeveloperLibrary.Controllers
{
    public class SearchController : Controller
    {
        //
        // GET: /Search/
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 检索功能入口函数
        /// </summary>
        /// <param name="_method">方法名称</param>
        /// <param name="condition">查询条件</param>
        /// <returns></returns>

        public string GetArcticle(string keyword, int numOnePage, int pageIndex,int leve,string userId)
        {

            using (RRDLEntities db = new RRDLEntities())
            {
                string newkey = System.Web.HttpUtility.UrlDecode(keyword).ToLower().Trim();
                AriticleService ars = new AriticleService(db);
                List<Ariticle> arlists = new List<Ariticle>();

                arlists = ars.SearchAriticles(newkey, numOnePage, pageIndex);
                int n = ars.SearchAllAriticlesCount(newkey);
                 switch (leve)
                 {   //游客
                     case -1:
                         arlists = isVisibilityUser(ars,arlists,null);
                         break;
                     //普通用户
                     case 1:
                         arlists = isVisibilityUser(ars, arlists, userId);
                         break;
                 }
                List<AriticleViewModel> avmlist = new List<AriticleViewModel>();
                avmlist = SimplifyAriticle(arlists);

                string result = JsonConvert.SerializeObject(avmlist);
                result = result + "ContentAndCount" + n;
                return result;
            }
            
        }

        public List<AriticleViewModel> SimplifyAriticle(List<Ariticle> list)
        {
            List<AriticleViewModel> result = new List<AriticleViewModel>();
            PraiseRepository  pr =  new PraiseRepository();
            //AriticleViewModel avm = new AriticleViewModel();
            for (int i = 0; i < list.Count; i++)
            {
                AriticleViewModel avm = new AriticleViewModel(list[i]);
                if (list[i].Approve.ApproveStatus == EnumAriticleApproveStatus.Approved)
                {
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
                    avm.Createtime = list[i].Createtime.ToString();
                    //avm.PraiseCount = pr.FindByAriticleID((list[i].Id)).PraiseCount;
                    result.Add(avm);
                }
            }
            return result;
        }

        public List<Ariticle> isVisibilityUser(AriticleService ars, List<Ariticle> list, string userid)
        {
            List<Ariticle> newlists =new List<Ariticle>();
            for (int i = 0; i < list.Count; i++) {
                if (ars.GetAriticleVisibilityByUser(list[i].Id, userid)) {
                    newlists.Add(list[i]);
                }
            }
            return newlists;
        }
    }
}
