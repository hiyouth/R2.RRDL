using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace R2.RRDL.Models
{
    /// <summary>
    /// 用户分组
    /// </summary>
    public class UserGroup
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string Title{ get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime CreateTime { get; set; }

        public  virtual List<User> Users { get; set; }
    }
}