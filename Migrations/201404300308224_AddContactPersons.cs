namespace R2.RRDL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddContactPersons : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ContactPersons",
                c => new
                    {
                        ID = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false),
                        UserGroupName = c.String(nullable: false),
                        PhoneNumber = c.String(nullable: false),
                        Email = c.String(nullable: false),
                        CompanyEmail = c.String(nullable: false),
                        QQ = c.String(nullable: false),
                        Address = c.String(nullable: false),
                        desc = c.String(),
                        AddTime = c.DateTime(),
                    })
                .PrimaryKey(t => t.ID);
            
            AddColumn("dbo.Users", "IsActive", c => c.Boolean(nullable: false,defaultValue:true));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "IsActive");
            DropTable("dbo.ContactPersons");
        }
    }
}
