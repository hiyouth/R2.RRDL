using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace R2.RRDL.Controllers
{
    public class UpImgController : Controller
    {       
        public ActionResult UpImg()
        {
            string savePath = "c:\\test\\";
            if (!Directory.Exists(savePath))
                Directory.CreateDirectory(savePath);         
            //大连的存储方式
            HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                HttpPostedFile postedFile = files[i];
                string fileName = System.IO.Path.GetFileName(postedFile.FileName);
                string time = DateTime.Now.Year.ToString() + DateTime.Now.Month + DateTime.Now.Day + DateTime.Now.Hour +
                              DateTime.Now.Minute + DateTime.Now.Millisecond;
                fileName = time + fileName;              
                postedFile.SaveAs(savePath + "\\" + fileName);
            }            
            return View();
        }

        public string UpImg2() { 


            return "";        
        }
    }
}
