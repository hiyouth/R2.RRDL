using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRWM.Models
{
    /// <summary>
    /// 任务状态
    /// </summary>
    public enum EnumTaskStatus
    {
        /// <summary>
        /// 正在进行
        /// </summary>
        InProgress=0x01,
        /// <summary>
        /// 延期
        /// </summary>
        Delay=0x02,
        /// <summary>
        /// 作废取消
        /// </summary>
        Cancel=0x04,
        /// <summary>
        /// 已完成
        /// </summary>
        Finish=0x16,
        /// <summary>
        /// 增加时间
        /// </summary>
        MoreTime=0x32,
    }
}