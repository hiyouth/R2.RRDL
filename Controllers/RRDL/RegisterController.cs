using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
namespace R2.RRDL.Controllers
{
    public class RegisterController : Controller
    {
        //
        // GET: /Register/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ToRegister() {
            return View();
        }

        public string UserNameIsExist(string name) 
        {
            string flag;
            if (Register.HasExistRegisterName(name))
            {
                flag = "true";
            }
            else {
                flag = "false";
            }
            return flag;
        }
        public string NickNameIsExist(string name)
        {
            string flag;
            if (Register.HasExistNickName(name))
            {
                flag = "true";
            }
            else
            {
                flag = "false";
            }
            return flag;
        }

        public string RegisterAction(string reginfo)
        {
            string regname = reginfo.Split('#')[0];
            string realnamer = reginfo.Split('#')[1];
            string nickname = reginfo.Split('#')[2];
            string password = reginfo.Split('#')[3];
            string explain = reginfo.Split('#')[4];
            string gender = reginfo.Split('#')[5];
            User user = new User();
            user.RegisterName = regname;
            user.RealName = realnamer;
            user.NickName = nickname;
            user.Password = password;
            user.PersonalDescription = explain;
            user.Createtime = System.DateTime.Now;
            EnumUserCategory userCat = EnumUserCategory.Visitor;
            user.AuthorityCategory = userCat;
            user.Gender = gender;
            Register reg = new BusinessModel.Register();
            reg.NewUser(user);
            return "success";
        }

    }
}
