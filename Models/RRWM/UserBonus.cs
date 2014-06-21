using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models.RRWM
{
    public class UserBonus
    {
        public String UserID { get; set; }
        public List<Bonus> BonusCollection { get; set; }
    }
}