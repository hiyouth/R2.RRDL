using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2.RRDL.Models;
using R2.RRDL.Models.Repository;

namespace R2.RRDL.Controllers
{
    public class PraiseController : Controller
    {
        //
        // GET: /Praise/

        public ActionResult Index()
        {
            return View();
        }

        public int IncreasePraiseCount(string ariticleId)
        {
            PraiseRepository pr = new PraiseRepository();
            return pr.IncreasePraiseCountByAriticleID(ariticleId);
        }

        public int GetPraiseCount(string ariticleId)
        {
            PraiseRepository pr = new PraiseRepository();
            Praise p = pr.FindByAriticleID(ariticleId);
            return p.PraiseCount;
        }
    }
}
