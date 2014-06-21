using R2.Helper.Linq;
using R2.RRDL.BusinessModel.BusinessStrategy;
using R2.RRDL.BusinessModel.IBusinessStrategy;
using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using R2.RRDL.ViewModel;
using System.Transactions;

namespace R2.RRDL.BusinessModel
{
    public class UserService:BusinessModelBase<RRDLEntities>
    {



        public UserService() { 
        
        }


        public UserService(RRDLEntities db): base(db)
        {

        }

        public User FindById(string id)
        {
            UserRepository userRepository = new UserRepository(this.db);
            User user = userRepository.FindByID(id);
            userRepository.DisposeIfShould();
            return user;
        }

        public List<User> FindAll()
        {
            UserRepository userRepository = new UserRepository(this.db);
            return userRepository.FindAll().ToList();
        }

        /// <summary>
        /// 更新用户
        /// </summary>
        /// <param name="user"></param>
        public void UpdateUser(User user)
        {
            UserRepository userRepository = new UserRepository(this.db);
             userRepository.Update(user);
             userRepository.DisposeIfShould();
        }

        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="userId"></param>
        public void Drop(string userId)
        {
            UserRepository userRepository = new UserRepository(this.db);
            ContactPersonRepository contactPersonRepository = new ContactPersonRepository(this.db);
            User user = userRepository.FindByID(userId);
            if (user != null)
            {
                IUserDeleteCheck check = new UserDeleteCheck();
                bool canDelete = check.CanBeDeleted(user);
                if (canDelete)
                {
                    using (var transactionScope = new TransactionScope(
          TransactionScopeOption.RequiresNew))
                    {
                        if (contactPersonRepository.Find(userId) != null)
                        {
                            var model = contactPersonRepository.Find(userId);
                            contactPersonRepository.Drop(model);
                        }
                        userRepository.Drop(user);
                        transactionScope.Complete();
                    }

                }

            }
            userRepository.DisposeIfShould();
            contactPersonRepository.DisposeIfShould();

        }

        public User FindByRegisterName(string name)
        {
             UserRepository userRepository = new UserRepository(this.db);
             User user =userRepository.FindByRegisterName(name);
             userRepository.DisposeIfShould();
             return user;
        }

        /// <summary>
        /// 根据审核状态获取用户信息；按照真实姓名排序
        /// </summary>
        /// <param name="status">null时，表示不考虑审核状态，获取所有</param>
        /// <param name="numOnePage"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        public List<User> FindUsersByApproveStatus(EnumUserApproveStatus? status, int numOnePage,
            int pageIndex)
        {
            IQueryable<User> users;
            List<User> list;
            UserRepository userRepository = new UserRepository();

            //users = userRepository.FindAll().OrderBy(u => u.RealName);
            users = userRepository.FindAll().OrderByDescending(a => a.Createtime);
            if (status != null)
            {
                users = users.Where(u => u.ApproveStatus == status);
            }

            list=LinqEntityHelper.GetEntitySetByPage(users, numOnePage, pageIndex)
                .ToList();
            userRepository.DisposeIfShould();
            return list;
        }

        /// <summary>
        /// 获取指定状态的user对象总数，status为null时，表示不考虑状态，获取所有
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        public int GetUserCount(EnumUserApproveStatus? status)
        {
            UserRepository userRepository = new UserRepository();
            int value;
            if (status == null)
            {
                //value = userRepository.FindAll().Count(u => u.AuthorityCategory != EnumUserCategory.Superman);
                value = userRepository.FindAll().Count(u => (u.AuthorityCategory != EnumUserCategory.Superman) || (u.AuthorityCategory == EnumUserCategory.Superman && u.RealName != "雷磊"));
            }
            else
            {
                //value = userRepository.FindAll().Count(u => u.ApproveStatus == status && u.AuthorityCategory != EnumUserCategory.Superman);
                value = userRepository.FindAll().Count(u => (u.ApproveStatus == status && u.AuthorityCategory != EnumUserCategory.Superman) || (u.ApproveStatus == status && u.AuthorityCategory == EnumUserCategory.Superman && u.RealName != "雷磊"));
            }
            userRepository.DisposeIfShould();
            return value;
        }



        //以下都是ZHAOs 2013年12月6日16:11:42
        //此函数是上面FindUsersByApproveStatus变化而来，NickName、RealName
        public List<User> FindNewUsersByKeyword(string keyword, int numOnePage,int pageIndex)
        {
            IQueryable<User> users;
            List<User> list;
            UserRepository userRepository = new UserRepository();
            users = userRepository.ExecuteConditions(a => a.NickName.Contains(keyword) || a.RealName.Contains(keyword) && a.ApproveStatus == EnumUserApproveStatus.UnApproved).OrderByDescending(a => a.Createtime);
            list=LinqEntityHelper.GetEntitySetByPage(users, numOnePage, pageIndex)
                .ToList();
            userRepository.DisposeIfShould();
            return list;
        }
        public int FindNewUsersByKeywordCount(string keyword)
        {
            IQueryable<User> users;
            List<User> list;
            UserRepository userRepository = new UserRepository();
            users = userRepository.ExecuteConditions(a => a.NickName.Contains(keyword) || a.RealName.Contains(keyword) && a.ApproveStatus == EnumUserApproveStatus.UnApproved).OrderByDescending(a => a.Createtime);
            list = LinqEntityHelper.GetEntitySetByPage(users, 1000, 1).ToList();
            userRepository.DisposeIfShould();
            return list.Count;
        }



        ////会员的NickName、RealName、用户组名
        public List<User> FindMembersByKeyword(string keyword, int numOnePage, int pageIndex)
        {
            IQueryable<User> users;
            List<User> list;
            UserRepository userRepository = new UserRepository();
            users = userRepository.ExecuteConditions(a => (a.NickName.Contains(keyword) 
                                                        || a.RealName.Contains(keyword)
                                                        || a.ContentGroup.Title.Contains(keyword))
                                                        && a.ApproveStatus == EnumUserApproveStatus.Approved)
                .OrderByDescending(a => a.Createtime);
            list = LinqEntityHelper.GetEntitySetByPage(users, numOnePage, pageIndex)
                .ToList();
            userRepository.DisposeIfShould();
            return list;
        }
        public int FindMembersByKeywordCount(string keyword)
        {
            IQueryable<User> users;
            List<User> list;
            UserRepository userRepository = new UserRepository();
            users = userRepository.ExecuteConditions(a => (a.NickName.Contains(keyword)
                                                        || a.RealName.Contains(keyword)
                                                        || a.ContentGroup.Title.Contains(keyword))
                                                        && a.ApproveStatus == EnumUserApproveStatus.Approved)
                .OrderByDescending(a => a.Createtime);
            list = LinqEntityHelper.GetEntitySetByPage(users, 1000, 1).ToList();
            userRepository.DisposeIfShould();
            return list.Count;
        }


        //得到所有用户，List形式返还，每个元素内容为真实姓名和用户Id
        public List<User> GetMemerList()
        {
            IQueryable<User> users;
            List<User> list;
            UserRepository userRepository = new UserRepository();
            users = userRepository.ExecuteConditions(a => a.ApproveStatus == EnumUserApproveStatus.Approved).OrderByDescending(a => a.Createtime);
            list = LinqEntityHelper.GetEntitySetByPage(users, 10000, 1).ToList();//有可能会超过10000个用户吗
            userRepository.DisposeIfShould();
            return list;
        }

        /// <summary>
        /// 根据分组ID获取该组所有用户
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public List<User> FindUsersByGroupId(int groupId)
        {
            IQueryable<User> users;
            List<User> list;
            UserRepository userRepository = new UserRepository();
            users = userRepository.ExecuteConditions(a => (a.ContentGroupId == groupId)).OrderByDescending(a => a.Createtime);
            list = LinqEntityHelper.GetEntitySetByPage(users, 1000, 1).ToList();
            userRepository.DisposeIfShould();
            return list;
        }

        public IEnumerable<String> FindUserIDsByGroupId(int groupId)
        {
            List<User> users = this.FindUsersByGroupId(groupId);
            IEnumerable<string> userIds = users.Select(u => u.Id);
            return userIds;
        }

        //以下GetTeamList为黄圣所加
        /// <summary>
        /// 用于查找团队的成员，其中管理员组与游客组不属于团队（水利组、地灾组），则不查找
        /// </summary>
        /// <returns></returns>
        public List<User> GetTeamList()
        {
            IQueryable<User> users;
            List<User> list;
            UserRepository userRepository = new UserRepository();
            users = userRepository.InnerJoin("ContentGroup").Where(
                a => (a.ApproveStatus == EnumUserApproveStatus.Approved && a.ContentGroupId != 1) &&
                (a.ApproveStatus == EnumUserApproveStatus.Approved && a.ContentGroupId != 2)).OrderByDescending(a => a.Createtime);
            list = users.ToList();
            userRepository.DisposeIfShould();
            return list;
        }

    }
}