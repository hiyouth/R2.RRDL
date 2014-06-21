using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string AriticleId { get; set; }
        public int Pid { get; set; }
        public Ariticle Ariticle { get; set; }
        public User User { get; set; }
        [MaxLength(32)]
        public String UserId { get; set; }
        public string NickName { get; set; }
        public int Isleaf { get; set; } //1 不是叶子节点   0是叶子节点
        public string Content { get; set; }
        public DateTime CommentTime { get; set; }
        public int Level { get;set;}
        public string FirstNickName { get; set; }

    }
}