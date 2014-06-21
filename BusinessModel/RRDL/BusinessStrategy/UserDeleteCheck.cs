using R2.RRDL.BusinessModel.IBusinessStrategy;
using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.BusinessModel.BusinessStrategy
{
    public class UserDeleteCheck:IUserDeleteCheck
    {
        /// <summary>
        /// 如果一个用户没有发表文章，则允许删除
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        bool IUserDeleteCheck.CanBeDeleted(User user)
        {
            bool userHasAriticles ;
            using(UserRepository repository = new UserRepository())
            {
                userHasAriticles = repository.IsUserHasAriticles(user.Id);
            }
            if(userHasAriticles)
                return false;
            else
                return true;
        }
    }
}