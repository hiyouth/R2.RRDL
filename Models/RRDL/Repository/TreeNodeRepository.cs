using R2.RRDL.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models.Repository
{
    public class TreeNodeRepository:RepositoryBase<RRDLEntities,TreeNode>
    {

        public TreeNodeRepository(RRDLEntities db):base(db)
        {
            
        }

        public TreeNodeRepository():base()
        {

        }

        /// <summary>
        /// 获取结点下一级的所有结点
        /// </summary>
        /// <param name="node">需要获取子集的结点</param>
        /// <returns></returns>
        public IQueryable<TreeNode> FindChildren(TreeNode node)
        {
            return this.FindAll().Where<TreeNode>(t => t.ParentId == node.Id);
        }

        /// <summary>
        /// 获取结点下一级的所有结点
        /// </summary>
        /// <param name="nodeId">>需要获取子集的结点的id编号</param>
        /// <returns></returns>
        public IQueryable<TreeNode> FindChildren(int nodeId)
        {
            return from r in Db.TreeNodes
                   where r.ParentId == nodeId
                   select r;
        }

        public TreeNode FindById(int nodeId)
        {
            TreeNode node = (from r in Db.TreeNodes
                             where r.Id == nodeId
                             select r).FirstOrDefault();
            return node;
        }

        public TreeNode FindParentNode(int nodeId)
        {
            TreeNode currentNode = this.FindById(nodeId);
            return Db.TreeNodes.Where(n => currentNode.ParentId == n.Id).First();
        }

        public TreeNode FindParentNode(TreeNode node)
        {
            return Db.TreeNodes.Where(n => node.ParentId == n.Id).First();
        }

        //public IQueryable<TreeNode> (TreeNode node)
        //{
            
        //}

        /// <summary>
        /// 获取某个节点到根节点的路径节点集合
        /// </summary>
        /// <param name="rootNodeParentId"></param>
        /// <param name="list"></param>
        public void GetTreeNodePath(List<TreeNode> list)
        {
          //  TreeNode latestTreeNode=list.Last();
            //if (latestTreeNode == null)
            //    return;
            TreeNode currentNode = list.Last();
            if (currentNode.ParentId == null)
            {
                return;
            }
            TreeNode parentNode = this.FindParentNode(currentNode);
            list.Add(parentNode);
            this.GetTreeNodePath(list);
        }
    }
}