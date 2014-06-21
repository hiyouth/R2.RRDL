using R2.RRDL.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace R2.RRDL.Models.Repository
{
    public class UserGroupRepository:RepositoryBase<RRDLEntities,UserGroup>
    {
        public UserGroupRepository():base()
        {

        }
        public UserGroupRepository(RRDLEntities db):base(db)
        {

        }

        public bool IsUserGroupContainsUser(UserGroup userGroup)
        {
            if (userGroup == null)
                return false;
            else
            {
                return userGroup.Users == null ? false : true;
            }
        }

        public UserGroup FindByGroupTitle(string title)
        {
            UserGroup group = (from g in Db.UserGroups
                               where g.Title == title
                               select g).FirstOrDefault();
            return group;
        }

        public UserGroup FindById(int id)
        {
            UserGroup group = (from g in Db.UserGroups
                               where g.Id == id
                               select g).FirstOrDefault();
            return group;
        }
    }
}