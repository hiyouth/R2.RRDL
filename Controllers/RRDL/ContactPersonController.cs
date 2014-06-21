using Newtonsoft.Json;
using R2.RRDL.BusinessModel;
using R2.RRDL.BusinessModel.RRDL;
using R2.RRDL.Models;
using R2.RRDL.Models.RRDL;
using R2.RRDL.ViewModel;
using R2.RRDL.ViewModel.RRDL.ContactPerson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace R2.RRDL.Controllers.RRDL
{
    public class ContactPersonController : Controller
    {

        #region 字段
        ContactPersonService contactPersonService = new ContactPersonService(); 
        #endregion
        /// <summary>
        /// 获取所用的联系人
        /// </summary>
        /// <returns></returns>
        public string GetAllContact()
        {
            var contactPersons = contactPersonService.FindAll();
            List<CreateContactPersonViewModel> list = new List<CreateContactPersonViewModel>();
            contactPersons.ForEach(m =>
            {
                CreateContactPersonViewModel model = new CreateContactPersonViewModel();
                model.CopyModel(m);
                list.Add(model);
            });
            
            return JsonConvert.SerializeObject(list);
        }

        /// <summary>
        /// 获取详细信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult Details(int id)
        {
            return View();
        }

        /// <summary>
        ///添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public string Add(CreateContactPersonViewModel model)
        {
            ContactPerson cp = new ContactPerson();
            if (ModelState.IsValid)
            {
                cp.CopyModel(model);
                this.contactPersonService.Add(cp);
                return JsonConvert.SerializeObject(model); 
            }
            else
            {
                return "false";
            }
        }
        /// <summary>
        /// 编辑
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public string Edit(ChangeContactPersonViewModel model)
        {
            if (ModelState.IsValid)
            {
                ContactPerson cp = this.contactPersonService.FindById(model.ID);
                cp.CopyModel(model);
                ContactPersonService cps = new ContactPersonService();
                cps.Update(cp);
                return "success";
            }
            else
            {
                return "failed";
            }
        }

        /// <summary>
        /// 根据id删除
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string  Delete(string id)
        {
            contactPersonService.Drop(id);
            return "success";
        }


    }
}
