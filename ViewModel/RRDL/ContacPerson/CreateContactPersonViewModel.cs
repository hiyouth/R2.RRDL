using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace R2.RRDL.ViewModel.RRDL.ContactPerson
{
    public class CreateContactPersonViewModel : ContactPersonViewModelBase
    {
        public CreateContactPersonViewModel()
        {
            this.AddTime = DateTime.Now;
        }
        [Display(Name = "添加时间")]
        public DateTime? AddTime { get; set; }
    }
}