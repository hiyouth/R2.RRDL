using R2.Helper.Time;
using R2.RRDL.BusinessModel;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models.Mapping
{
    //public class MyRRDLSchema<T>:CreateDatabaseIfNotExists<T> 
    public class MyRRDLSchema<T>:CreateDatabaseIfNotExists<T>
        where T:DbContext
    {
        protected override void Seed(T context)
        {
            InitializeModelObejct();
            //在UserGroups表增加Title列唯一性约束
            context.Database.ExecuteSqlCommand(
                "CREATE UNIQUE INDEX IX_UserGroup_Title ON UserGroups (Title)");

            context.Database.ExecuteSqlCommand(
              "CREATE UNIQUE INDEX IX_Ariticle_Title ON Ariticles(Title)");
            context.Configuration.ProxyCreationEnabled = false;
        }

        /// <summary>
        /// 初始化数据库数据对象
        /// </summary>
        private void InitializeModelObejct()
        {
            TreeNode rootNode1 = new TreeNode(null, "开发技术");
            TreeSet.CreateNewTree(rootNode1, "开发技术");

            TreeNode rootNode2 = new TreeNode(null, "GIS业务");
            TreeSet.CreateNewTree(rootNode2, "GIS业务");

            TreeNode rootNode3= new TreeNode(null, "常用服务");
            TreeSet.CreateNewTree(rootNode3, "常用服务");

            TreeNode rootNode4 = new TreeNode(null, "精华文摘");
            TreeSet.CreateNewTree(rootNode4, "精华文摘");

            TreeNode rootNode5 = new TreeNode(null, "资源信息");
            TreeSet.CreateNewTree(rootNode5, "资源信息");

            TreeNode treeNode = new TreeNode(1,"Html");
            TreeNode treeNode2 = new TreeNode(1, "Css");
            TreeNode treeNode3 = new TreeNode(1, "Javascript");
            TreeNode treeNode4 = new TreeNode(1, "OpenLayers");
            TreeNode treeNode5 = new TreeNode(1, ".Net");

            Tree tree = new Tree();
            tree.AddTreeNode(treeNode);
            tree.AddTreeNode(treeNode2);
            tree.AddTreeNode(treeNode3);
            tree.AddTreeNode(treeNode4);
            tree.AddTreeNode(treeNode5);

            InitialzeUserGroup();
            InitialzeUser();
        }

        public void InitialzeUser() {
            User user = new User();
            user.RegisterName = "nicely";
            user.NickName = "青骨逆";
            user.Password = "123123";
            user.PersonalDescription = "WebGIS-R2Team";
            user.RealName = "雷磊";
            user.AuthorityCategory = EnumUserCategory.Superman;
            user.ApproveStatus = EnumUserApproveStatus.Approved;
            user.Gender = "M";

            user.ContentGroupId = 2;
        
            Register register = new Register();
            user.Id = DateTimeHelper.ConvertToIDString(DateTime.Now);
            user.Createtime = DateTime.Now;
            UserRepository userRepository = new UserRepository();
            userRepository.Add(user);

            User user1 = new User();
            user1.RegisterName = "JJM";
            user1.NickName = "JiangjianM";
            user1.Password = "123123";
            user1.PersonalDescription = "WebGIS-R2Team";
            user1.RealName = "蒋建明";
            user1.AuthorityCategory = EnumUserCategory.Membership;
            user1.ApproveStatus = EnumUserApproveStatus.Approved;
            user1.Gender = "M";

            user1.ContentGroupId = 3;

            Register register1 = new Register();
            user1.Id = DateTimeHelper.ConvertToIDString(DateTime.Now);
            user1.Createtime = DateTime.Now;
            UserRepository userRepository1 = new UserRepository();
            userRepository1.Add(user1);

            User user2 = new User();
            user2.RegisterName = "CSW";
            user2.NickName = "CSW";
            user2.Password = "123123";
            user2.PersonalDescription = "WebGIS-R2Team";
            user2.RealName = "曹四文";
            user2.AuthorityCategory = EnumUserCategory.Membership;
            user2.ApproveStatus = EnumUserApproveStatus.Approved;
            user2.Gender = "M";

            user2.ContentGroupId = 3;

            Register register2= new Register();
            user2.Id = DateTimeHelper.ConvertToIDString(DateTime.Now);
            user2.Createtime = DateTime.Now;
            UserRepository userRepository2 = new UserRepository();
            userRepository2.Add(user2);

            User user3 = new User();
            user3.RegisterName = "ZSS";
            user3.NickName = "ZSS";
            user3.Password = "123123";
            user3.PersonalDescription = "WebGIS-R2Team";
            user3.RealName = "赵森森";
            user3.AuthorityCategory = EnumUserCategory.Membership;
            user3.ApproveStatus = EnumUserApproveStatus.Approved;
            user3.Gender = "M";

            user3.ContentGroupId = 3;

            Register register3 = new Register();
            user3.Id = DateTimeHelper.ConvertToIDString(DateTime.Now);
            user3.Createtime = DateTime.Now;
            UserRepository userRepository3 = new UserRepository();
            userRepository3.Add(user3);
        }

        public void InitialzeUserGroup() {
            //游客分组，其ID编号一定为”1“
            UserGroup visitors = new UserGroup();
            visitors.Title = "游客";
            visitors.Description = "游客为初始默认分组";

            UserGroup supermanGroup = new UserGroup();
            supermanGroup.Title = "超级管理员";
            supermanGroup.Description = "超级管理员分组";

            UserGroup usergroup = new UserGroup();
            usergroup.Title = "R2Team";
            usergroup.Description = "互联网R2Team";
            //UserGroup usergroup2 = new UserGroup();
            //usergroup2.Title = "地灾组";
            //usergroup2.Description = "互联网地灾组";
            //UserGroup usergroup3 = new UserGroup();
            //usergroup3.Title = "水利组";
            //usergroup3.Description = "互联网水利组";
            UserGroupService ugs = new UserGroupService();
            ugs.Add(visitors);
            ugs.Add(supermanGroup);
            ugs.Add(usergroup);
            //ugs.Add(usergroup2);
            //ugs.Add(usergroup3);
        }
    }
}