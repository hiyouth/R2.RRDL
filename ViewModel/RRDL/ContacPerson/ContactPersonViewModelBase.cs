using R2.RRDL.Models.RRDL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace R2.RRDL.ViewModel.RRDL.ContactPerson
{
    public class ContactPersonViewModelBase : MyAutoMapper
    {
        [Required]
        public String ID { get; set; }
        [Required]
        [Display(Name = "姓名")]
        public string Name { get; set; }
        [Required]
        [Display(Name = "团队")]
        public string UserGroupName { get; set; }
        [Required]
        [Display(Name = "电话")]
        public string PhoneNumber { get; set; }
        [Required]
        [Display(Name = "邮箱")]
        public string Email { get; set; }
        [Required]
        [Display(Name = "公司邮箱")]
        public string CompanyEmail { get; set; }
        [Required]
        [Display(Name = "QQ")]
        public string QQ { get; set; }
        [Required]
        [Display(Name = "住址")]
        public string Address { get; set; }
        [Display(Name = "备注")]
        public string desc { get; set; }
    }
}