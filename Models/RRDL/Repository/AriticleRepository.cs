using R2.RRDL.Models.Mapping;
using System;
using System.Collections.Generic;
//using System.Data.Objects;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Data.Entity;

namespace R2.RRDL.Models.Repository
{

    public class AriticleRepository:RepositoryBase<RRDLEntities,Ariticle>
    {
        public override IQueryable<Ariticle> FindAll()
        {
            return this.Db.Ariticles.Include(a => a.User).Include(a => a.Approve);
        }

        public AriticleRepository():base()
        {

        }

        public AriticleRepository(RRDLEntities db):base(db)
        {
        }

        public Ariticle  FindById(string id)
        {
            Ariticle ariticle = (from a in Db.Ariticles
                                 where a.Id == id
                                 select a).FirstOrDefault();
            return ariticle;
        }

        public IQueryable<Ariticle> FindByApproveStatus(EnumAriticleApproveStatus
            status)
        {
            return this.Db.AriticleApproves.Where(a => a.ApproveStatus == status).Select(
                a => a.Ariticle);
        }

        /// <summary>
        /// 根据文章标题获取文章
        /// </summary>
        /// <param name="ariticleTitle"></param>
        /// <returns></returns>
        public Ariticle FindByTitle(string ariticleTitle)
        {
          //  return this.FindAll().First<Ariticle>(a => a.Title == ariticleTitle);
            return this.Db.Ariticles.SingleOrDefault(a => a.Title == ariticleTitle);
        }
    }
}