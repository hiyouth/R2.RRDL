using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRWM.Models
{
    /// <summary>
    /// 任务处理状态，1. 未被确认也未被审核 2.被确认但未审核 3.被审核
    /// </summary>
    public enum EnumTaskProcessStatus
    {
        /// <summary>
        /// 未被确认也未被审核
        /// </summary>
        None=0x01,

        /// <summary>
        /// 已被确认,但未被审核
        /// </summary>
        Confirmed=0x02,

        /// <summary>
        ///已被审核
        /// </summary>
        Checked=0x04,
    }
}