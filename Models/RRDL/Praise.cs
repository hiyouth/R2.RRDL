using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models
{
    public class Praise
    {
            [Key]
            public int Id { get; set; }
            public string AriticleId { get; set; }
            public Ariticle Ariticle { get; set; }
            [Required]
            public int PraiseCount { get; set; }
    }
}