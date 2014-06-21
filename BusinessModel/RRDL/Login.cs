using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.BusinessModel
{
    public class Login : BusinessModelBase<RRDLEntities>
    {
        public Login()
        {
            
        }

        /// <summary>
        /// 用户资料（密码）是否正确
        /// </summary>
        /// <param name="registerName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public User UserProfileMatchs(string registerName,string password)
        {
            UserRepository userRepos = new UserRepository(this.db);
            User user=userRepos.FindByRegisterName(registerName);
            userRepos.DisposeIfShould();
            if (user == null)
                return null;
            else
            {
                if (password == user.Password)
                    return user;
                else
                    return null;
            }
        }
    }
}