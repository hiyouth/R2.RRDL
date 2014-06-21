using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Common;
using System.Data;
using System.Data.Entity;
using R2.RRDL.Models.Mapping;

namespace R2.RRDL.Models.Repository
{
    public class UserRepository:RepositoryBase<RRDLEntities,User>
    {
        public UserRepository(RRDLEntities db):base(db)
        {

        }

        public UserRepository():base()
        {

        }

        /// <summary>
        /// 通过注册名称获取用户对象
        /// </summary>
        /// <param name="regName"></param>
        /// <returns></returns>
        public User FindByRegisterName(string regName)
        {
            User user = (from u in Db.Users
                         where u.RegisterName == regName
                         select u).FirstOrDefault();
            Db.Database.Connection.Close();
            return user;
        }

        public User FindByID(string id)
        {
            return this.FindAll().SingleOrDefault(u => u.Id == id);
        }

        /// <summary>
        /// 通过昵称获取用户对象
        /// </summary>
        /// <param name="nickname"></param>
        /// <returns></returns>
        public User FindByNickName(string nickname)
        {
            User user = (from u in Db.Users
                         where u.NickName == nickname
                         select u).FirstOrDefault();
            Db.Database.Connection.Close();
            return user;
        }

        /// <summary>
        /// 一个User是否有发表的文章
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public bool IsUserHasAriticles(string userId)
        {
            int count= Db.Ariticles.Count(a => a.UserId == userId);
            if (count > 0)
                return true;
            else
                return false;
        }
    }
}