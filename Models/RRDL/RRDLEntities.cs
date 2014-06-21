
using R2.RRDL.Models.Mapping;
using R2.RRDL.Models.RRDL;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models
{
    public class RRDLEntities : DbContext
    {
         static RRDLEntities()
        {
            Database.SetInitializer<RRDLEntities>(new MyRRDLSchema<RRDLEntities>());
        }

        public RRDLEntities()
        {
            //this.Configuration.ProxyCreationEnabled = false;
        }
        public DbSet<User> Users { get; set; }
        public DbSet<ContactPerson> ContactPersons { get; set; }
        public DbSet<Ariticle> Ariticles { get; set; }
        public DbSet<AriticleTag> AriticleTags { get; set; }
        public DbSet<TreeNode> TreeNodes { get; set; }
        public DbSet<TreeRootPrefix> TreeRootPrefixes { get; set; }
        public DbSet<UserGroup> UserGroups { get; set; }
        public DbSet<AriticleVisibility> AriticleVisibilitys { get; set; }
        public DbSet<AriticleApprove> AriticleApproves { get; set; }
      //  public DbSet<Praise> Praises { get; set; }
        //public DbSet<Comment> Comments { get; set; }
       // public DbSet<PraiseLinkUser> PraiseLinkUsers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new AriticleTagMap());
          //  modelBuilder.Entity<AriticleTag>().HasKey(a => a.Name);
            base.OnModelCreating(modelBuilder);
        }
    }
}