using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.BusinessModel
{
    public class TreeSet
    {
        public static Tree CreateNewTree(TreeNode rootNode, string rootPrefix)
        {
           // TreeNodeRepository treeRepository = new TreeNodeRepository();
            TreeRootPrefixRepository prefixRepository = new TreeRootPrefixRepository();

            rootNode.ParentId = null;
            rootNode.Deepth = 1;
            //treeRepository.Add(rootNode);

            TreeRootPrefix prefix = new TreeRootPrefix(rootPrefix, rootNode,DateTime.Now);
            prefixRepository.Add(prefix);
            

            return new Tree();
        }

        public static bool IsRootPrefixExsit(string rootPrefix)
        {
            TreeRootPrefixRepository prefixRepository = new TreeRootPrefixRepository();
            TreeNode rootNode = prefixRepository.FindRootNodeByPrefix(rootPrefix);
            bool rlt = (rootNode==null)?false : true;
            return rlt;
        }
    }
}