using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace R2.RRDL.Controllers
{
    public class HeadSearchController : Controller
    {
        //
        // GET: /HeadSearch/

        public ActionResult HeadSearchWithVisibility(string key,int userType)
        {
            return View();
        }

    }
}
