using R2.RRDL.BusinessModel.IBusinessStrategy;
using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.BusinessModel.BusinessStrategy
{
    public class UserGroupDeleteCheck:IUserGroupDeleteCheck
    {
        bool IUserGroupDeleteCheck.CanBeDeleted(UserGroup group)
        {
            using (UserGroupRepository repository = new UserGroupRepository())
            {
                return repository.IsUserGroupContainsUser(group);
            }
        }
    }
}