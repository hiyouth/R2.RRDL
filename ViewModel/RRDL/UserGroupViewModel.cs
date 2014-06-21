using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using R2.RRDL.Models;

namespace R2.RRDL.ViewModel
{
    public class UserGroupViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public UserGroupViewModel(UserGroup userGroup) {
            this.Id = userGroup.Id;
            this.Title = userGroup.Title;
        }
    }

}