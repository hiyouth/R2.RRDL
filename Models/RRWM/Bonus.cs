using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models
{
    public class Bonus
    {
        /// <summary>
        /// 表示周号或者是月号
        /// </summary>
        public int PerEach { get; set; }
        public float SumBonus { get; set; }
        public float SumScheduleBounus { get; set; }
    }
}