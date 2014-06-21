using R2.RRDL.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models.Repository
{
    public class AriticleTagRepository:RepositoryBase<RRDLEntities,AriticleTag>
    {
        public AriticleTagRepository(RRDLEntities db):base(db)
        {

        }

        public AriticleTagRepository()
        {

        }
        public bool Add(AriticleTag tag)
        {
            LinqHelper<RRDLEntities> helper = new LinqHelper<RRDLEntities>();
            return helper.SaveObjectEntity<AriticleTag>(tag);
        }

        /// <summary>
        /// 查找包含关键字的标签对象
        /// </summary>
        /// <param name="keyword"></param>
        /// <returns></returns>
        public IQueryable<AriticleTag> FindByKeyword(string keyword)
        {
            return from a in Db.AriticleTags
                   where a.Title.Contains(keyword)
                   select a;
        }

        public void UpdateAllRelatedAriticleId(string ariticle,List<AriticleTag> tags)
        {
            foreach (var t in tags)
            {
                Db.AriticleTags.Attach(t);
                Db.Entry(t).State = EntityState.Added;
            }
            var exitingTags = Db.AriticleTags.Where(a => a.AriticleId == ariticle);
            foreach (var t in exitingTags)
            {
                Db.Entry(t).State = EntityState.Deleted;
            }
        }
    }
}