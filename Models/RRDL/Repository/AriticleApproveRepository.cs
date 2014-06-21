using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models.Repository
{
    public class AriticleApproveRepository:RepositoryBase<RRDLEntities,AriticleApprove>
    {
        public AriticleApprove FindById(string id)
        {
            return Db.AriticleApproves.SingleOrDefault(a => a.AriticleId == id);
        }

        public AriticleApprove FindByAriticleId(string ariticleId)
        {
            return Db.AriticleApproves.SingleOrDefault(a => a.Ariticle.Id == ariticleId);
        }
    }
}