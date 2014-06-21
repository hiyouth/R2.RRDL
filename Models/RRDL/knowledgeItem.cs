using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2TeamDeveloperLibrary.Models
{
    //这是一个知识条目的类型
    public class KnowledgeItem
    {
        public string id;
        public string title;
        public string message;
        public string author;
        public string createDate;
        public string checkDate;
        public string checker;
        public string state;
        public string lastModifyDate;
        public string bigtype;
        public string small;
        public string details;
        public KnowledgeItem(string title,string author,string createDate,string checkDate,string checker,string state,string lastModifyDate,string bigtype,string small,string details) {
            this.title = title;
            this.author = author;
            this.createDate = createDate;
            this.checkDate = checkDate;
            this.checker = checker;
            this.state = state;
            this.lastModifyDate = lastModifyDate;
            this.bigtype = bigtype;
            this.small = small;
            this.details = details;
        }
        public KnowledgeItem(string id,string title,string message, string author, string createDate, string checkDate, string checker, string state, string lastModifyDate, string bigtype, string small, string details)
        {
            this.id = id;
            this.title = title;
            this.message = message;
            this.author = author;
            this.createDate = createDate;
            this.checkDate = checkDate;
            this.checker = checker;
            this.state = state;
            this.lastModifyDate = lastModifyDate;
            this.bigtype = bigtype;
            this.small = small;
            this.details = details;
        }
        public KnowledgeItem(){
        
        }
    }


    //待审核用户属性
    public class UserToBeVerified {
        public string account;
        public string remark;
        public string type;//管理员 超级管理员  会员
        public string team;//所属组：  地灾  水利    三维    市政....
    }
}