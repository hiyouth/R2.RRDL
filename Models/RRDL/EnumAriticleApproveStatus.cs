using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models
{
    [Flags]
    public enum EnumAriticleApproveStatus
    {
        /// <summary>
        /// 审核通过
        /// </summary>
        Approved=0x01,

        /// <summary>
        /// 还未审核
        /// </summary>
        UnApproved=0x02,

        /// <summary>
        /// 审核失败，未通过审核
        /// </summary>
        FailedApprove=0x04
    }
}