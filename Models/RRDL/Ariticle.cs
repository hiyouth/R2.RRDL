using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace R2.RRDL.Models
{
    /// <summary>
    /// 文章对象
    /// </summary>
    public class Ariticle
    {
        /// <summary>
        /// 自动编号，唯一ID
        /// </summary>
        [Key]
        public string Id { get; set; }

        [Required]
        [MaxLength(512)]
        public string Title { get; set; }

        [Required]
        public string UserId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [ForeignKey("UserId")]
        public virtual  User User{ get; set; }

        public virtual List<AriticleTag> Tags { get; set; }

        [Required]
        public DateTime Createtime{ get; set; }

        /// <summary>
        /// 文章所属的树节点,此属性为null时，表示文章处于游离状态，不属于任何树节点
        /// </summary>
        //[Required]
        //public virtual TreeNode TreeNode { get; set; }
        
        /// <summary>
        /// 文章在树结构中的位置
        /// </summary>
        //[Required]
        //public TreeNode TreeLocation { get; set; }

        ///// <summary>
        ///// 文章所属层次结构
        ///// </summary>
        //[NotMapped]
        //public String[] TreeStructure { get; set; }

        /// <summary>
        /// 文章审核对象
        /// </summary>

        //public int ApproveId { get; set; }
        //[Required]
        //[ForeignKey("ApproveId")]
        public virtual  AriticleApprove Approve { get; set; }

        /// <summary>
        /// 用户生成的文章内容
        /// </summary>
        [Required]
        public string UGC { get; set; }
    }
}