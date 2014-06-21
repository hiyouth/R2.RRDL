using R2.RRDL.Models.Mapping;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace R2.RRWM.Models.Repository
{
    public class TestRepository:RepositoryBase<RRWMEntities,TestTest>
    {
        public TestRepository(RRWMEntities db):base(db)
        {

        }

        public TestRepository()
        {

        }
    }
}