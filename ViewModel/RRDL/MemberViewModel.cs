using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using R2.RRDL.Models;
namespace R2.RRDL.ViewModel
{
    public class MemberViewModel
    {
        public string RealName;
        public string RegisterName;
        public string NickName;
        public EnumUserCategory AuthorityCategory;
        public UserGroup ContentGroup;
        public string Id;
        public string Gender;
        public string PersonalDescription;
        public int? ContentGroupId { get; set; }
        public int approvedArticleCount;
        public int allArticleCount;

        public MemberViewModel(User user) {
            this.Id = user.Id;
            this.RegisterName = user.RegisterName;
            this.RealName = user.RealName;
            this.NickName = user.NickName;
            this.ContentGroupId = user.ContentGroupId;
            this.AuthorityCategory = user.AuthorityCategory;
            this.Gender = user.Gender;
            this.PersonalDescription = user.PersonalDescription;
        }
    }
}