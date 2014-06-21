using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using R2.RRDL.Models.Repository;

namespace R2.RRDL.Models
{
    /// <summary>
    /// 用户
    /// </summary>
    public class User
    {
        public User()
        {
            IsActive = true;
        }
    
        /// <summary>
        /// 编号
        /// </summary>
        [Key]
        [MaxLength(32)]
        public String Id { get; set; }

        [MaxLength(32)]
        [Required(AllowEmptyStrings=false)]
        public string RealName { get; set; }

        [MaxLength(64)]
        [Required(AllowEmptyStrings = false)]
        public string RegisterName { get; set; }

        [MaxLength(128)]
        [Required(AllowEmptyStrings = false)]
        public string NickName { get; set; }

        [Required]
        public string Password { get; set; }

        /// <summary>
        /// 个人描述
        /// </summary>
        public string PersonalDescription { get; set; }

        /// <summary>
        /// 权限种类
        /// </summary>
        [Required]
        public EnumUserCategory AuthorityCategory { get; set; }


        //[Required]
        public int? ContentGroupId { get; set; }

        /// <summary>
        /// 用户分组
        /// </summary>
        [ForeignKey("ContentGroupId")]
        public virtual UserGroup ContentGroup { get; set; }

        [Required]
        public EnumUserApproveStatus ApproveStatus { get; set; }

        /// <summary>
        /// 审核通过或不通过的原因
        /// </summary>
        public string ReplyContent { get; set; }

        ///// <summary>
        ///// 文章列表
        ///// </summary>
        //public virtual ICollection<Ariticle> Ariticles { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public DateTime Createtime { get; set; }

        //public IQueryable<Ariticle> Ariticles { get; set; }

        /// <summary>
        /// 性别
        /// </summary>
        [MaxLength(32)]
        [Required(AllowEmptyStrings = false)]
        public string Gender{ get; set; }
        public bool IsActive { get; set; }
    }
}