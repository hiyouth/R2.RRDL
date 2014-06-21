using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2.RRDL.ViewModel;
using Newtonsoft.Json;

namespace R2.RRDL.Controllers
{
    public class RankListController : Controller
    {
        //
        // GET: /RankList/
        //获取所有用户的发表知识数量的排行
        public string GetMemberRank()
        {
            UserService userService = new UserService();
            AriticleService ariticleSerivice = new AriticleService();
            List<User> list = userService.GetMemerList();
            List<RankListMember> rkmList = new List<RankListMember>();
            for (int i = 0; i < list.Count; i++) {
                RankListMember t = new RankListMember();
                t.RealName = list[i].RealName;
                t.ariticleCount = ariticleSerivice.GetAriticleCount(list[i].Id);
                rkmList.Add(t);
            }
            //对结果排序
            var queryResults =
                    from n in rkmList
                    orderby n.ariticleCount descending
                    select n;
            List<RankListMember> rkmList2 = new List<RankListMember>();
            foreach (var n in queryResults) {
                rkmList2.Add(n);
            }
            string result = JsonConvert.SerializeObject(rkmList2);
            return result;
        }


        public string GeTeamRank()
        {  
            UserGroupService usergSerivice = new UserGroupService();
            UserService userService = new UserService();
            List<UserGroup> usergList = usergSerivice.FindAll();
            List<RankListTeam> rankListTeam = new List<RankListTeam>();
            List<User> userList = new List<User>();
            for (int i = 2; i < usergList.Count; i++) {
                userList = userService.FindUsersByGroupId(usergList[i].Id);
                int count = 0;
                for (int j = 0; j < userList.Count; j++) { 
                    //获取每个用户的发表的知识数量，并求和                    
                    AriticleService ariticleService = new AriticleService();
                    int n = ariticleService.GetAriticleCount(userList[j].Id);
                    count += n;                    
                }
                RankListTeam rlt = new RankListTeam();
                rlt.Title = usergList[i].Title;
                rlt.AriticleCount = count;
                rankListTeam.Add(rlt);
            }
            //对结果排序
            var queryResults =
                    from n in rankListTeam
                    orderby n.AriticleCount descending
                    select n;
            List<RankListTeam> rktList = new List<RankListTeam>();
            foreach (var n in queryResults)
            {
                rktList.Add(n);
            }
            string result = JsonConvert.SerializeObject(rktList);
            return result;
        }

        //认识知识分类是树结构下第一级子节点
        public string GeTypeRank() {
            Tree tree = new Tree();
            List<TreeNode> treeNodeList = new List<TreeNode>();
            treeNodeList = tree.GetBigContentTypeList();
            List<RankListContentType> rklContentType = new List<RankListContentType>();            
            for (int i = 0; i < treeNodeList.Count; i++) {                
                Tree tree2 = new Tree();
                int n = tree2.GetContentCount(Convert.ToInt32(treeNodeList[i].Id));
                RankListContentType rklct = new RankListContentType();
                rklct.Title = treeNodeList[i].Title;
                rklct.AriticleCount = n;
                rklContentType.Add(rklct);
            }
            //对结果排序
            var queryResults =
                    from n in rklContentType
                    orderby n.AriticleCount descending
                    select n;
            List<RankListContentType> rklctList = new List<RankListContentType>();
            foreach (var n in queryResults)
            {
                rklctList.Add(n);
            }
            string result = JsonConvert.SerializeObject(rklctList);
            return result;
        }

        public ActionResult GetClassifyTreeNodes(int ? parentId) {
            Tree tree = new Tree();
            List<ClassifyTreeNodes> treeNodeList = new List<ClassifyTreeNodes>();
            treeNodeList = ReadTreeNodes(treeNodeList,parentId);
            string result = JsonConvert.SerializeObject(treeNodeList);
            return Content(result);
        }
        public List<ClassifyTreeNodes> ReadTreeNodes(List<ClassifyTreeNodes> treeNodes, int? id)
        {
            Tree tree = new Tree();
            List<TreeNode> newTreeNodes = tree.GetParentsTreeNodes(id);
            List<ClassifyTreeNodes> treeNodeLists = new List<ClassifyTreeNodes>();
            for (int i = 0; i < newTreeNodes.Count; i++)
            {
                ClassifyTreeNodes treeNode = new ClassifyTreeNodes();
                treeNode.Title = newTreeNodes[i].Title;
                //treeNode.AriticleId = newTreeNodes[i].Ariticle.Id;
                
                treeNode.Id = newTreeNodes[i].Id;
                treeNode.ParentId = newTreeNodes[i].ParentId;
                treeNode.IsLeaf = newTreeNodes[i].IsLeaf;
                if (treeNode.ParentId == null) {
                    treeNodes.Add(treeNode);
                    treeNodeLists.Add(treeNode);
                }
                //if (treeNode.IsLeaf == false)
                //{
                //    ReadTreeNodes(treeNodes, treeNode.Id);
                //}
            }
            for (int j = 0; j < treeNodes.Count; j++)
            {
                 List<TreeNode> tns = new List<TreeNode>();
                 tns = tree.GetTreeNodeChild(Int32.Parse(treeNodes[j].Id.ToString()));
                 for (int k = 0; k < tns.Count; k++) {
                     TreeNode treeNode = tree.GetTreeNodeById(Int32.Parse(tns[k].Id.ToString()));
                     ClassifyTreeNodes classifyTreeNodes = new ClassifyTreeNodes();
                     classifyTreeNodes.Id = treeNode.Id;
                     classifyTreeNodes.IsLeaf = treeNode.IsLeaf;
                     classifyTreeNodes.ParentId = treeNode.ParentId;
                     classifyTreeNodes.Title = treeNode.Title;
                     treeNodeLists.Add(classifyTreeNodes);
                 }
            }
            return treeNodeLists;
        }
    }
}
