using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace R2TeamDeveloperLibrary.Controllers
{
    public class PageControlController : Controller
    {
        //
        // GET: /PageControl/

        public ActionResult Index()
        {
            return View();
        }

        //这个后台函数用于返回在当前情况下 查询到信息的总条数
        public int GetTotalItems(string key) {
            /*
              
             * waitting for Leilei
              
             
             */

            return 19;
        }

        //获取当前条件下的总页数
        public string GetTotalPage() {
            return "";
        }

        //第一页  上一页  下一页   最后一页
        public string FirstPage() {
            return "";
        }

        public string PrePage() {

            return "";
        }

        public string NextPage() {

            return "";
        }

        public string LastPage() {

            return "";
        }
    }
}
