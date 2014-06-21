using R2.RRDL.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models.Repository
{
    public class TreeRootPrefixRepository:RepositoryBase<RRDLEntities,TreeRootPrefix>
    {
        public TreeRootPrefixRepository():base()
        {

        }
        public TreeRootPrefixRepository(RRDLEntities db):base(db)
        {

        }

        public bool Add(TreeRootPrefix prefix)
        {
            LinqHelper<RRDLEntities> helper = new LinqHelper<RRDLEntities>();
            return helper.SaveObjectEntity<TreeRootPrefix>(prefix);
        }

        public TreeNode FindRootNodeByPrefix(string prefix)
        {
            TreeNode root = (from r in Db.TreeRootPrefixes
                             where r.Prefix == prefix
                             select r.RootNode).FirstOrDefault();
            return root;
        }
    }
}