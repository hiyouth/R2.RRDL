namespace R2.RRDL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 32),
                        RealName = c.String(nullable: false, maxLength: 32),
                        RegisterName = c.String(nullable: false, maxLength: 64),
                        NickName = c.String(nullable: false, maxLength: 128),
                        Password = c.String(nullable: false),
                        PersonalDescription = c.String(),
                        AuthorityCategory = c.Int(nullable: false),
                        ContentGroupId = c.Int(),
                        ApproveStatus = c.Int(nullable: false),
                        ReplyContent = c.String(),
                        Createtime = c.DateTime(nullable: false),
                        Gender = c.String(nullable: false, maxLength: 32),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserGroups", t => t.ContentGroupId)
                .Index(t => t.ContentGroupId);
            
            CreateTable(
                "dbo.UserGroups",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 128),
                        Description = c.String(),
                        CreateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Ariticles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Title = c.String(nullable: false, maxLength: 512),
                        UserId = c.String(nullable: false, maxLength: 32),
                        Createtime = c.DateTime(nullable: false),
                        UGC = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AriticleTags",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        AriticleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Ariticles", t => t.AriticleId, cascadeDelete: true)
                .Index(t => t.AriticleId);
            
            CreateTable(
                "dbo.AriticleApproves",
                c => new
                    {
                        AriticleId = c.String(nullable: false, maxLength: 128),
                        ApproveStatus = c.Int(nullable: false),
                        ReplyContent = c.String(),
                        NewestApproveTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.AriticleId)
                .ForeignKey("dbo.Ariticles", t => t.AriticleId)
                .Index(t => t.AriticleId);
            
            CreateTable(
                "dbo.TreeNodes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Deepth = c.Int(nullable: false),
                        ParentId = c.Int(),
                        IsLeaf = c.Boolean(nullable: false),
                        Ariticle_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Ariticles", t => t.Ariticle_Id)
                .Index(t => t.Ariticle_Id);
            
            CreateTable(
                "dbo.TreeRootPrefixes",
                c => new
                    {
                        Prefix = c.String(nullable: false, maxLength: 128),
                        CreateTime = c.DateTime(nullable: false),
                        RootNode_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Prefix)
                .ForeignKey("dbo.TreeNodes", t => t.RootNode_Id, cascadeDelete: true)
                .Index(t => t.RootNode_Id);
            
            CreateTable(
                "dbo.AriticleVisibilities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserGroupId = c.Int(nullable: false),
                        AriticleId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserGroups", t => t.UserGroupId, cascadeDelete: true)
                .ForeignKey("dbo.Ariticles", t => t.AriticleId)
                .Index(t => t.UserGroupId)
                .Index(t => t.AriticleId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.AriticleVisibilities", new[] { "AriticleId" });
            DropIndex("dbo.AriticleVisibilities", new[] { "UserGroupId" });
            DropIndex("dbo.TreeRootPrefixes", new[] { "RootNode_Id" });
            DropIndex("dbo.TreeNodes", new[] { "Ariticle_Id" });
            DropIndex("dbo.AriticleApproves", new[] { "AriticleId" });
            DropIndex("dbo.AriticleTags", new[] { "AriticleId" });
            DropIndex("dbo.Ariticles", new[] { "UserId" });
            DropIndex("dbo.Users", new[] { "ContentGroupId" });
            DropForeignKey("dbo.AriticleVisibilities", "AriticleId", "dbo.Ariticles");
            DropForeignKey("dbo.AriticleVisibilities", "UserGroupId", "dbo.UserGroups");
            DropForeignKey("dbo.TreeRootPrefixes", "RootNode_Id", "dbo.TreeNodes");
            DropForeignKey("dbo.TreeNodes", "Ariticle_Id", "dbo.Ariticles");
            DropForeignKey("dbo.AriticleApproves", "AriticleId", "dbo.Ariticles");
            DropForeignKey("dbo.AriticleTags", "AriticleId", "dbo.Ariticles");
            DropForeignKey("dbo.Ariticles", "UserId", "dbo.Users");
            DropForeignKey("dbo.Users", "ContentGroupId", "dbo.UserGroups");
            DropTable("dbo.AriticleVisibilities");
            DropTable("dbo.TreeRootPrefixes");
            DropTable("dbo.TreeNodes");
            DropTable("dbo.AriticleApproves");
            DropTable("dbo.AriticleTags");
            DropTable("dbo.Ariticles");
            DropTable("dbo.UserGroups");
            DropTable("dbo.Users");
        }
    }
}
