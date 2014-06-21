using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRWM.Models
{
    /// <summary>
    /// 项目实施
    /// </summary>
    public enum EnumTaskCategory
    {
        /// <summary>
        /// 编码
        /// </summary>
        Coding=0x01,
        /// <summary>
        /// 调研
        /// </summary>
        Research=0x02,
        /// <summary>
        /// 交流学习
        /// </summary>
        Comunication=0x04,
        /// <summary>
        /// 项目实施
        /// </summary>
        ProjectImplementation=0x16,
        /// <summary>
        /// 文档
        /// </summary>
        Document=0x32,
        /// <summary>
        /// 测试
        /// </summary>
        ProjectTesting=0x64
    }
}