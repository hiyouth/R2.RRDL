using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models
{
    public class PraiseLinkUser
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string AriticleId { get; set; }
        public DateTime CommentTime { get; set; }
    }
}