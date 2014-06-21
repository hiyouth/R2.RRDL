using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using R2.RRDL.Models;

namespace R2.RRDL.ViewModel
{
    public class UserViewModel
    {
        public string Id{get;set;}
        public EnumUserApproveStatus ApproveStatus { get; set; }
        public EnumUserCategory AuthorityCategory { get; set; }
        public int ContentGroupId { get; set; }
        public string NickName { get; set; }
        public string PersonalDescription { get; set; }
        public string RealName { get; set; }
        public string RegisterName { get; set; }
        public string ReplyContent { get; set; }
        public string CreateTime { get; set; }
        public string UserGroup { get; set; }
        public string Category { get; set; }
        public string Gender { get; set; }
        public int approvedArticleCount { get; set; }
        public int allArticleCount { get; set; }
    }
}