using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models.Repository
{
    public class PraiseLinkUserRepository : RepositoryBase<RRDLEntities, PraiseLinkUser>
    {
        public PraiseLinkUserRepository(RRDLEntities db):base(db)
        {

        }

        public PraiseLinkUserRepository(): base()
        {

        }
        public IQueryable<PraiseLinkUser> FindByUserID(string userId)
        {
            //return from pu in db.PraiseLinkUsers
            //       where pu.UserId == userId
            //       select pu;
            return null;
        }

        public bool IsPraised(string userId, string ariticleId)
        {
            List<PraiseLinkUser> praiseLinkUsers = FindByUserID(userId).ToList();
            var temp = false;
            for (int i = 0; i < praiseLinkUsers.Count; i++) 
            {
                if (praiseLinkUsers[i].AriticleId == ariticleId) {
                    temp= true;
                }
            }
            return temp;
        }
    }
}