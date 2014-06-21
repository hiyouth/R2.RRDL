using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace R2.RRDL.Models.Mapping
{
    public class AriticleTagMap : EntityTypeConfiguration<AriticleTag>
    {
        public AriticleTagMap()
        {
            this.HasKey(a => a.Id);
            this.Property(a => a.Title).IsRequired();
            this.HasRequired<Ariticle>(tag => tag.Article)
                .WithMany(a => a.Tags)
                .HasForeignKey(tag => tag.AriticleId);
            this.Property(a => a.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}