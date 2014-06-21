using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace R2.RRDL.BusinessModel
{
    /// <summary>
    /// 提供对于树状目录的管理能力对象
    /// </summary>
    public class Tree:BusinessModelBase<RRDLEntities>
    {
        public Tree():base()
        {
        }

        public Tree(RRDLEntities db):base(db)
        {

        }

        /// <summary>
        /// 查找包含指定Ariticle的TreeNode
        /// </summary>
        /// <param name="articleId"></param>
        /// <returns></returns>
        public TreeNode SearchByAriticle(string articleId)
        {
            TreeNodeRepository repository = new TreeNodeRepository(this.db);
            IQueryable<TreeNode> nodeQuerable=repository.ExecuteConditions(
                t => t.Ariticle != null && t.Ariticle.Id == articleId);
            return nodeQuerable.FirstOrDefault();
        }

        public TreeNode GetRootNode(string rootPrefix)
        {
            TreeNode rootNode;
            TreeRootPrefixRepository prefixRepository = new TreeRootPrefixRepository(this.db);
             rootNode = prefixRepository.FindRootNodeByPrefix(rootPrefix);
             prefixRepository.DisposeIfShould();
            if (rootNode == null)
                throw new Exception("没有根别名为" + rootPrefix + "的树");
            else
                return rootNode;
        }

        public List<TreeNode> GetTreeNodeChild(TreeNode node)
        {
            TreeNodeRepository treeRepository = new TreeNodeRepository(this.db);
             List<TreeNode> list =treeRepository.FindChildren(node).ToList();
             treeRepository.DisposeIfShould();
             return list;
        }

        public List<TreeNode> GetTreeNodeChild(int nodeId)
        {
            TreeNodeRepository treeRepository = new TreeNodeRepository(this.db);
            List<TreeNode> list = treeRepository.FindChildren(nodeId).ToList();
            treeRepository.DisposeIfShould();
            return list;
        }

        public TreeNode GetTreeNodeById(int nodeId)
        {
            TreeNodeRepository treeRepository = new TreeNodeRepository(this.db);
            TreeNode node = treeRepository.FindById(nodeId);
            treeRepository.DisposeIfShould();
            return node;
        }

        /// <summary>
        /// 添加一个树节点,TreeNode对象中的ParentNode不允许为空值
        /// </summary>
        /// <param name="subNode"></param>
        /// <returns></returns>
        public void AddTreeNode(TreeNode subNode)
        {
            if (subNode.ParentId == null)
                throw new Exception("被添加的结点，其ParentNode参数不能是空值");
               TreeNodeRepository nodeRepository = new TreeNodeRepository(this.db);
                //子节点深度+1
                TreeNode parentNode=nodeRepository.FindParentNode(subNode);
                subNode.Deepth = parentNode.Deepth + 1;

                //因为包含子节点，所以父节点的已经不可能是叶子节点
                parentNode.IsLeaf = false;
                nodeRepository.Update(parentNode);
                nodeRepository.Add(subNode);
                nodeRepository.DisposeIfShould();
            //}
        }

        /// <summary>
        /// 更新一个节点
        /// </summary>
        /// <param name="node"></param>
        public void UpdateTreeNode(TreeNode node)
        {
            if (node.Id == null || node.Id < 1)
                throw new Exception("不存在这样的TreeNode");
            TreeNodeRepository repository = new TreeNodeRepository(this.db);
            repository.Update(node);
            repository.DisposeIfShould();
        }

        /// <summary>
        /// 获取当前节点到根节点的路径,Ｌｉｓｔ中最后一位元素为根节点
        /// </summary>
        /// <param name="node"></param>
        /// <returns></returns>
        public List<TreeNode> GetTreeNodePath(TreeNode node)
        {
            List<TreeNode> list = new List<TreeNode>();
            using (TreeNodeRepository treeNodeRepository =new TreeNodeRepository())
            {
                list.Add(node);
                treeNodeRepository.GetTreeNodePath( list);
            }
            return list;
        }
        ///删除节点
        ///
        public void Drop(TreeNode treeNode)
        {
            TreeNodeRepository treeNoderepository = new TreeNodeRepository(this.db);
            if (treeNode != null)
            {
                treeNoderepository.Drop(treeNode);
            }
            treeNoderepository.DisposeIfShould();
        }

        /********** ZHAOs  2013年12月12日13:59:31*/
        public List<TreeNode> GetBigContentTypeList()
        {
            TreeNodeRepository repository = new TreeNodeRepository(this.db);
            IQueryable<TreeNode> nodeQuerable=repository.ExecuteConditions(
                t =>  t.Ariticle.Id == null && t.Deepth ==2);
            return nodeQuerable.ToList();
        }

        //获取此节点下的所有节点
        //遍历节点，如果是知识，则++，如果是目录，则递归不能
        public int GetContentCount(int Id) {     
            int count = 0;
            TreeNodeRepository repository = new TreeNodeRepository(this.db);
            IQueryable<TreeNode> nodeQuerable = repository.ExecuteConditions(t => t.ParentId == Id);
            List<TreeNode> list = nodeQuerable.ToList();
            for (int i = 0; i < list.Count; i++) {
                if (list[i].Ariticle != null)
                {
                    count++;
                }
                else {
                    int n =  this.GetContentCount(Convert.ToInt32(list[i].Id));
                    count += n;
                }
            }
              return count;
        }
        //郭毅2013年12月26日10:58:58
        public List<TreeNode> GetParentsTreeNodes(int? parentId)
        {
            TreeNodeRepository repository = new TreeNodeRepository(this.db);
            IQueryable<TreeNode> nodeQuerable = repository.ExecuteConditions(t => t.ParentId == parentId);
            List<TreeNode> list = nodeQuerable.ToList();
            return list;
        }
    }
}