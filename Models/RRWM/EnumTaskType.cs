using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace R2.RRWM.Models
{
    /// <summary>
    /// 任务类型
    /// </summary>
    public enum EnumTaskType
    {
        /// <summary>
        /// 机动任务
        /// </summary>
        Flexible = 0x01,

        /// <summary>
        /// 计划任务
        /// </summary>
        Scheduled = 0x02
    }
}