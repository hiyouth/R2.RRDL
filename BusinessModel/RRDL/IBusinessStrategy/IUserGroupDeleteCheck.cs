using R2.RRDL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.BusinessModel.IBusinessStrategy
{
    interface IUserGroupDeleteCheck
    {
        bool CanBeDeleted(UserGroup group);
    }
}