using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models.Repository
{
    public class PraiseRepository : RepositoryBase<RRDLEntities, Praise>
    {
         public PraiseRepository(RRDLEntities db):base(db)
        {

        }

         public PraiseRepository(): base()
        {

        }

         public Praise FindByID(int id)
         {
             //Praise praise = (from p in db.Praises
             //                 where p.Id == id
             //                 select p).FirstOrDefault();
             //return praise;
             return null;
         }

         public Praise FindByAriticleID(string ariticleId)
         {
             //Praise praise = (from p in db.Praises
             //                 where p.AriticleId == ariticleId
             //                 select p).FirstOrDefault();
             //return praise;
             return null;
         }

         public int IncreasePraiseCount(int id) {
             Praise praise = FindByID(id);
             praise.PraiseCount += 1;
             Update(praise);
             return praise.PraiseCount;
         }

         public int IncreasePraiseCountByAriticleID(string ariticleID)
         {
             Praise praise = FindByAriticleID(ariticleID);
             praise.PraiseCount += 1;
             Update(praise);
             return praise.PraiseCount;
         }
    }
}