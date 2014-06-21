using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using R2.RRDL.Models;
using R2.RRDL.Models.Repository;

namespace R2.RRDL.Controllers
{
    public class PraiseLinkUserController : Controller
    {
        //
        // GET: /PraiseLinkUser/

        public ActionResult Index()
        {
            return View();
        }

        public string GetPraiseLinkUsers(string userId,string ariticleId) {
            PraiseLinkUserRepository pur = new PraiseLinkUserRepository();
            var isPraise = pur.IsPraised(userId,ariticleId).ToString();
            if (isPraise == "False") {
                Add(userId, ariticleId);
            }
            return isPraise;
        }

        public void Add(string userId, string ariticleId)
        {
            PraiseLinkUser plu = new PraiseLinkUser();
            plu.AriticleId = ariticleId;
            plu.UserId = userId;
            plu.CommentTime = DateTime.Now;
            PraiseLinkUserRepository plur = new PraiseLinkUserRepository();
            plur.Add(plu);
        }
    }
}
