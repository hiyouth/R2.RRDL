using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace R2.RRDL.Controllers
{
    public class HomePageLeftController : Controller
    {
        //
        // GET: /HomePageLeft/

        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string GetContent(string typeName) {
            string typename = typeName;
            int a = 0;
            return "";
        }

    }
}
