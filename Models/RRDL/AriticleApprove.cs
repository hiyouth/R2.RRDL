using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models
{
    /// <summary>
    /// 文章审核对象
    /// </summary>
    public class AriticleApprove
    {
        //[Key]
        //public int Id { get; set; }

        //public string AriticleId { get; set; }
        [Key,ForeignKey("Ariticle")]
        public string AriticleId { get; set; }

        private EnumAriticleApproveStatus approveStatus;

        [Required]
        public EnumAriticleApproveStatus ApproveStatus
        {
            get
            {
                return this.approveStatus;
            }
            set
            {
                this.approveStatus = value;
                this.NewestApproveTime = DateTime.Now;
            }
        }

        //[Required]
        //[ForeignKey("AriticleId")]
        public virtual Ariticle Ariticle { get; set; }

        /// <summary>
        /// 文章审核通过或者未通过的原因
        /// </summary>
        public string ReplyContent { get; set; }

        /// <summary>
        /// 最新审批时间，如果文章未审核，此时间表示文章提交时间
        /// </summary>
        public DateTime NewestApproveTime { get; set; }

        public AriticleApprove()
        {
            //文章加入数据库时处于待审核状态
            this.ApproveStatus = EnumAriticleApproveStatus.UnApproved;
        }
    }
}