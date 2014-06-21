using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2.RRDL.Models;
using R2.RRDL.BusinessModel;
using R2.RRDL.ViewModel;
using Newtonsoft.Json;
namespace R2.RRDL.Controllers
{
    public class DevelopTechController : Controller
    {
        //
        // GET: /DevelopTech/

        public ActionResult DevelopTech()
        {
            return View();
        }

    }
}
