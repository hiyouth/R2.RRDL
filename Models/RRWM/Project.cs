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
    /// 项目相关信息
    /// </summary>
    public class Project
    {
        [Key]
        [Required]
        public int ID { get; set; }

        [Required]
        public string ProjectID { get; set; }

        [Required]
        public string ProjectName { get; set; }

        public string ProjectMemo { get; set; }

        public virtual ICollection<Task> Tasks { get; set; }
    }
}