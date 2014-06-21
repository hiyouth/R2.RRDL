using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Common;
using System.Data;
using System.Data.Entity;
using R2.RRDL.Models.Mapping;
using R2.RRDL.Models.RRDL;

namespace R2.RRDL.Models.Repository
{
    public class ContactPersonRepository : RepositoryBase<RRDLEntities, ContactPerson>
    {
        #region 构造函数
        public ContactPersonRepository(RRDLEntities db)
            : base(db)
        {

        }

        public ContactPersonRepository()
            : base()
        {

        } 
        #endregion

    }
}