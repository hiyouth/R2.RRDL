using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.BusinessModel
{
    public class AriticleApproveService
    {
        /// <summary>
        /// 验证用户是否有审核权限
        /// </summary>
        /// <param name="ariticleId"></param>
        /// <param name="userId"></param>
        public bool ValidateApproveAuthority(string ariticleId, string userId)
        {
            bool canApprove=false;
            User user;
            using (UserRepository userRepository = new UserRepository())
            {
                user = userRepository.FindByID(userId);
                if (user == null)
                    throw new Exception("审核失败，找不到userId对应的用户对象");
                if(user.AuthorityCategory==EnumUserCategory.Membership||
                    user.AuthorityCategory==EnumUserCategory.Visitor)
                    throw new Exception("审核失败，用户不具有审核权限");
            }
            Ariticle ariticle;
            using (AriticleRepository ariticleRepository = new AriticleRepository())
            {
                ariticle = ariticleRepository.FindById(ariticleId);
                ariticleRepository.Db.Entry(ariticle).Reference(a => a.User).Load();
                if (ariticle == null)
                    throw new Exception("审核失败，无法找到对应的文章");
            }

            if (user.AuthorityCategory == EnumUserCategory.Superman
                && ariticle != null)
            {
                //超级管理员具有审核所有文章的权限
                canApprove = true;
            }
            if (user.AuthorityCategory == EnumUserCategory.Administrator &&
                ariticle != null && ariticle.User.ContentGroupId == user.ContentGroupId)
            {
                //普通管理员具有审核其所在分组文章的权限
                canApprove = true;
            }
            return canApprove;
        }

        /// <summary>
        /// 审核一条文章
        /// </summary>
        /// <param name="ariticleId"></param>
        /// <param name="userId"></param>
        public void ApproveAriticle(string ariticleId, string userId,EnumAriticleApproveStatus 
            status,string reply)
        {
            bool canApprove=this.ValidateApproveAuthority(ariticleId, userId);
            if (canApprove)
            {
                using (AriticleApproveRepository approveRepository = 
                    new AriticleApproveRepository())
                {
                    AriticleApprove ariticleApprove=approveRepository.FindByAriticleId(ariticleId);
                    ariticleApprove.ApproveStatus = status;
                    ariticleApprove.ReplyContent = reply;
                    approveRepository.Update(ariticleApprove);
                }
            }
        }
    }
}