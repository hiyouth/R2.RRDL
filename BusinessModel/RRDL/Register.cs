using R2.Helper.Time;
using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.BusinessModel
{
    /// <summary>
    /// 注册
    /// </summary>
    public class Register
    {
        public Register()
        {
        }

        /// <summary>
        /// 注册名是否已存在
        /// </summary>
        /// <param name="registerName"></param>
        /// <returns></returns>
        public static bool HasExistRegisterName(string registerName)
        {
            using (UserRepository repos = new UserRepository())
            {
                User user = repos.FindByRegisterName(registerName);
                if (user != null && user.RegisterName == registerName)
                    return true;
                else
                    return false;
            }
        }

        /// <summary>
        /// 昵称是否已存在
        /// </summary>
        /// <param name="nickName"></param>
        /// <returns></returns>
        public static bool HasExistNickName(string nickName)
        {
            using (UserRepository repos = new UserRepository())
            {
                User user = repos.FindByNickName(nickName);
                if (user != null && user.NickName == nickName)
                    return true;
                else
                    return false;
            }
        }

        /// <summary>
        /// 创建一个新用户，此用户待审核
        /// </summary>
        /// <param name="user"></param>
        /// <returns>是否成功创建</returns>
        public void NewUser(User user)
        {
            if (user == null)
            {
                throw new Exception("User对象不允许为空值");
            }
            if (String.IsNullOrEmpty(user.NickName) ||
                String.IsNullOrEmpty(user.RegisterName)||
                String.IsNullOrEmpty(user.RealName)||
                String.IsNullOrEmpty(user.Password))
            {
                throw new Exception(@"User对象中，NickName,RegisterName,RealName,
                 Password属性不允许为Null或者空字符串");
            }
            bool hasExistRegisterName = Register.HasExistRegisterName(user.RegisterName);
            bool hasExistNickName = Register.HasExistNickName(user.NickName);
            if (hasExistRegisterName)
            {
                throw new Exception("注册名已存在");
            }
            if (hasExistNickName)
            {
                throw new Exception("昵称已存在");
            }
            user.Id = DateTimeHelper.ConvertToIDString(DateTime.Now);
            user.Createtime = DateTime.Now;

            //此用户待审核，并未通过审核
            user.ApproveStatus = EnumUserApproveStatus.UnApproved;
            using (UserRepository userRepository = new UserRepository())
            {
                 userRepository.Add(user);
            }
        }

        /// <summary>
        /// 审核通过一个用户
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="replyContent"></param>
        public void ApproveUser(string userId,string replyContent)
        {
            using (UserRepository userRepository = new UserRepository())
            {
                User user=userRepository.FindByID(userId);
                if (user == null)
                    throw new Exception("用户不存在");
                user.ApproveStatus = EnumUserApproveStatus.Approved;
                user.ReplyContent = replyContent;
                userRepository.Update(user);
            }
        }

        /// <summary>
        /// 拒绝一个用户的会员申请
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="replyContent"></param>
        public void DenyUser(string userId, string replyContent)
        {
            using (UserRepository userRepository = new UserRepository())
            {
                User user = userRepository.FindByID(userId);
                if (user == null)
                    throw new Exception("用户不存在");
                user.ApproveStatus = EnumUserApproveStatus.UnApproved;
                user.ReplyContent = replyContent;
                userRepository.Update(user);
            }
        }

        /// <summary>
        /// 为一个用户分配分组
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="groupId"></param>
        public void SetUserGroup(string userId, int groupId)
        {
            using (UserGroupRepository groupRepository = new UserGroupRepository())
            {
                UserGroup group = groupRepository.ExecuteConditions(g => g.Id == groupId).
                    FirstOrDefault();
                if (group == null)
                    throw new Exception("指定分组不存在");
            }
            using (UserRepository userRepository = new UserRepository())
            {
                User user = userRepository.FindByID(userId);
                if (user == null)
                    throw new Exception("用户不存在");
                if (user.ApproveStatus == EnumUserApproveStatus.Approved)
                {
                    user.ContentGroupId = groupId;
                    userRepository.Update(user);
                }
                else
                {
                    throw new Exception("当前用户还未通过审核，无法为其分配分组");
                }
            }
        }
    }
}