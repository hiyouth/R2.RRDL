using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models
{
    /// <summary>
    /// 保存用户分组的内容可见性对象,表示某分组用户对某文章不可见
    /// </summary>
    public class AriticleVisibility
    {
        [Key]
        public int Id { get; set; }

        //[Required]
        public int UserGroupId { get; set; }

        [ForeignKey("UserGroupId")]
        public virtual UserGroup UserGroup { get; set; }

        //[Required]
        public string AriticleId { get; set; }

        [ForeignKey("AriticleId")]
        public virtual Ariticle Ariticle { get; set; }
    }
}