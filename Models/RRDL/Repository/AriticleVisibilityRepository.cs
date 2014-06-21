using R2.RRDL.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models.Repository
{
    public class AriticleVisibilityRepository:RepositoryBase<RRDLEntities,AriticleVisibility>
    {

        public AriticleVisibilityRepository():base()
        {

        }

        public AriticleVisibilityRepository(RRDLEntities db):base(db)
        {

        }

        public AriticleVisibility FindById(int id)
        {
            AriticleVisibility entry = (from a in Db.AriticleVisibilitys
                                          where a.Id == id
                                          select a).FirstOrDefault();
            return entry;
        }

        public IQueryable<AriticleVisibility> FindByAriticle(string ariticleId)
        {
            return from a in Db.AriticleVisibilitys
                   where a.AriticleId == ariticleId
                   select a;
        }

        public bool IsAriticleVisiableByUserGroup(string ariticleId,int userGroupId)
        {
            bool canBeSeen = false;
            IQueryable<AriticleVisibility> ariticleInvis =
                from a in Db.AriticleVisibilitys
                where a.AriticleId == ariticleId
                select a;
            if (ariticleInvis.Count() == 0)

                //如果可见性列表里不包含此文章，说明此文章对所有用户可见
                canBeSeen = true;
            else
            {
                //如果可见性列表里包含此文章，查找用户组是否被允许可见
                int count = ariticleInvis.Count(a => a.UserGroupId == userGroupId);
                if (count > 0)
                    canBeSeen = true;
            }
            return canBeSeen;
        }
    }
}