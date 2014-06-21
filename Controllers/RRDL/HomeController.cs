using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using R2.RRDL.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2.RRDL.Test;
using Newtonsoft.Json;

namespace R2.RRDL.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            //TestSample.TestTree();
            //TestSample.TestOtherTree();
            //TestSample.TestAddUserGroup();
            //TestSample.TestAddUser();
            //TestSample.TestAddAriticle();
            //TestSample.TestAddAriticleApprove();
            //TestSample.TestAriticleInvisibility();
            //TestSample.TestAriticleInvisibility();
            //Register.HasExistRegisterName("Nick");
            //TestSample.TestNotConfirmed();
            //AriticleService service = new AriticleService();
        //    List<Ariticle> list=service.FindAriticles(null, null, 1, 1);
            //UserService userService = new UserService();
           // JsonIgnoreAttribute
            //User user = userService.FindByRegisterName("zhaosen");

            //string a = JsonConvert.SerializeObject(user);
           //JsonConvert.SerializeObject(
            return View();
        }

        public ActionResult HeadSearchResult()
        {
            return View();
        }
     
        private string UserProfileMatchs(string username, string password)
        {
            throw new NotImplementedException();
        }
    }
}
