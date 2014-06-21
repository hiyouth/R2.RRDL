using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace R2.RRDL.Models
{
    public  class AriticleTag
    {
        /// <summary>
        /// 自动编号
        /// </summary>
        public Guid Id { get; set; }

        public string Title { get; set; }

        //ForeignKey
        public string AriticleId { get; set; }

        //NavigationPoperty
        public Ariticle Article { get; set; }
    }
}