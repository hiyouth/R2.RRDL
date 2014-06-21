namespace R2.RRDL.Migrations
{
    using R2.RRDL.Models.RRDL;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<R2.RRDL.Models.RRDLEntities>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(R2.RRDL.Models.RRDLEntities context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.ContactPersons.Add(new ContactPerson { 
                 ID = "201311181814399965382",
                 AddTime=DateTime.Now,
                 CompanyEmail="DFG",
                 Address="DFG",
                 Email="DFG",
                 PhoneNumber="DFG",
                 QQ="DFG",
                 desc="DFG",
                 UserGroupName="R2Team",
                Name = "À×ÀÚ" });
            context.SaveChanges();
        }
    }
}
