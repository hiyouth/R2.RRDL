using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using R2.RRDL.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using R2.RRWM.Models;
using R2.RRWM.Models.Repository;
using R2.RRWM.BusinessModel;

namespace R2.RRDL.Test
{
    public class TestSample
    {
        public static void TestTree()
        {
            using (var db = new RRDLEntities())
            {
                TreeNode rootNode = new TreeNode(null, "测试Root");
                rootNode.Title = "测试Root";
                Tree tree = TreeSet.CreateNewTree(rootNode, "R2Team知识");

                TreeNode level1 = new TreeNode(rootNode.Id,"level1");
                //TreeNode treeNode=tree.GetTreeNodeById(tree.RootNode.Id);
                //  level1.ParentId = treeNode;
                tree.AddTreeNode(level1);

                TreeNode level2 = new TreeNode(level1.Id,"level2");
                tree.AddTreeNode(level2);

                TreeNode level3 = new TreeNode(level2.Id,"level3");
                tree.AddTreeNode(level3);

                TreeNode level4 = new TreeNode(level2.Id, "level3-1");
                tree.AddTreeNode(level4);
                //Tree tree = new Tree("R2Team知识");
                tree.GetTreeNodePath(level4);
            }
        }

        public static void TestOtherTree()
        {
            using (var db = new RRDLEntities())
            {
                TreeNode rootNode = new TreeNode(-1, "测试Root2");
                rootNode.Title = "测试Root";
                Tree tree = TreeSet.CreateNewTree(rootNode, "R2Team资源");

                TreeNode level1 = new TreeNode(rootNode.Id, "level1");
                //TreeNode treeNode=tree.GetTreeNodeById(tree.RootNode.Id);
                //  level1.ParentId = treeNode;
                tree.AddTreeNode(level1);

                TreeNode level2 = new TreeNode(level1.Id, "level2");
                tree.AddTreeNode(level2);

                TreeNode level3 = new TreeNode(level2.Id, "level3");
                tree.AddTreeNode(level3);

                TreeNode level4 = new TreeNode(level2.Id, "level3-1");
                tree.AddTreeNode(level4);
            }
        }

        public static void TestAddUserGroup()
        {
            UserGroup group = new UserGroup
            {
                CreateTime=DateTime.Now,
                Description="",
                Title="R2Team"
            };
            UserGroupRepository context = new UserGroupRepository();
            context.Add(group);
        }

        public static void TestAddUser()
        {
                var userRepository = new UserRepository();
                User user = new User();
                user.Id = "No.1";
                user.RealName = "mr111";
                user.AuthorityCategory = EnumUserCategory.Superman;
                user.RegisterName = "aswind";
                user.NickName = "被惊呆的小伙伴";
                user.Password = "2222";
                user.Createtime = DateTime.Now;

                UserGroupRepository repository = new UserGroupRepository();
                UserGroup group=repository.FindByGroupTitle("R2Team");
               // UserGroup group1 = new UserGroup { Id = group.Id };
              //  userRepository.db.Entry(group1).State = EntityState.Unchanged;
               // user.ContentGroup = group1;
               // user.ContentGroup = new UserGroup();
                user.ContentGroupId = group.Id;
                userRepository.Add(user);
            }

        public static void TestRRWM()
        {
            //TestTest t = new TestTest();
            //t.Year = "99999";
            //t.SerialNumber = 66;
            //TestRepository r = new TestRepository();
            //r.Add(t);
            //Project p = new Project();
            //using (var repository = new ProjectRepository())
            //{
            //    p = repository.FindByID(1);
            //}
       
        }

        public static void TestNotConfirmed()
        {
            TaskService service = new TaskService();
            Dictionary<User,int> dit=service.FindUserIDsAndTaskCountWithTaskProcessStatus(
                EnumTaskProcessStatus.None,t=>t.TaskerID);
            ProjectService service1 = new ProjectService();
            List<Project> lists=service1.FindByTaskProcessStatus(EnumTaskProcessStatus.None);

            TaskService service2 = new TaskService();
            List<Task> tasks = service2.FindByUserGroup(3);

            //TaskService service3 = new TaskService();
            //service3.Repository.Drop(
            
        }

        public static void TestAddAriticleApprove()
        {
            AriticleApprove approve = new AriticleApprove
            {
                //AriticleId="1"
            };
            RRDLEntities db = new RRDLEntities();
            db.AriticleApproves.Add(approve);
            db.SaveChanges();
        }

        public static void TestAriticleInvisibility()
        {
            AriticleVisibility invis = new AriticleVisibility();
            invis.AriticleId = "1";
            UserGroupRepository repository = new UserGroupRepository();
            UserGroup group=repository.FindByGroupTitle("R2Team");
            invis.UserGroupId = group.Id;
            RRDLEntities db = new RRDLEntities();
            db.AriticleVisibilitys.Add(invis);
            db.SaveChanges();
            AriticleVisibilityRepository rep = new AriticleVisibilityRepository();
            //AriticleInvisibility arcInvis=rep.FindByAriticle("1");
           // db.AriticleInvisibilitys
        }
    }
}


