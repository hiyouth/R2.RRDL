using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using Newtonsoft.Json;
namespace R2.RRDL.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/

        public ActionResult Index()
        {
            return View();
        }

        public string Login(string userinf)
        {
            string user = userinf;
            string registerName = userinf.Split('#')[0];
            string password = userinf.Split('#')[1];
            Login login = new BusinessModel.Login();
            User info = login.UserProfileMatchs(registerName, password);
            if (info == null)//登录失败
            {
                return "failed";
            }
            else
            { //登录成功
                return "success";
            }

            //HttpCookie newCookie = new HttpCookie("USERINFO");
            //newCookie.Values["USERID"] = userinf;
            //newCookie.Expires = DateTime.Now.AddDays(365);
            //System.Web.HttpContext.Current.Response.Cookies.Add(newCookie);
            //this.Response.SetCookie(newCookie);
            //string result = "";
            //return Content(result);
        }

        public string UserProfileMatchs(string userName, string passWord)
        {
            Login login = new Login();
            User user = login.UserProfileMatchs(userName,passWord);
            if (user != null)
            {
                User user2 = new User();
                user2.Id = user.Id;
                user2.RegisterName = user.RegisterName;
                user2.NickName = user.NickName;
                user2.Password = user.Password;
                user2.Createtime = user.Createtime;
                user2.AuthorityCategory = user.AuthorityCategory;
                user2.ContentGroupId = user.ContentGroupId;
                string result = JsonConvert.SerializeObject(user2);
                //string result = "success";
                return result;
            }
            else {
                return null;
            }
        }

    }
}
