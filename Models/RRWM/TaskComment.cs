using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using R2.RRDL.Models;

namespace R2.RRWM.Models
{
    /// <summary>
    /// 任务评论
    /// </summary>
    public class TaskComment
    {
        [Key]
        [Required]
        public int ID { get; set; }

        [Required]
        public string TaskID { get; set; }

        [ForeignKey("TaskID")]
        public virtual Task Task { get; set; }

        [Required]
        public String UserID { get; set; }
        
        [NotMapped]
        public String UserName { get; set; }

        [Required]
        public String Comment { get; set; }
    }

}