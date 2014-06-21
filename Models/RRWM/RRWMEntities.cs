using R2.RRDL.Models.Mapping;
using R2.RRWM.Models.Mapping;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace R2.RRWM.Models
{
    public class RRWMEntities : DbContext
    {
         static RRWMEntities()
        {
            Database.SetInitializer<RRWMEntities>(new MyRRWMSchema<RRWMEntities>());
        }

         public RRWMEntities()
        {
            //this.Configuration.ProxyCreationEnabled = false;
        }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<TaskSN> TaskSNs { get; set; }
        public DbSet<TestTest> TestTest { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<TaskComment> TaskComments { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
          //  modelBuilder.Entity<AriticleTag>().HasKey(a => a.Name);
            base.OnModelCreating(modelBuilder);
        }
    }
}