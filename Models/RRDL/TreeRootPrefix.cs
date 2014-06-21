using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models
{
    /// <summary>
    /// 给每棵树一个自定义的标识名
    /// </summary>
    public class TreeRootPrefix
    {
        [Key]
        public string Prefix { get; set; }

        [Required]
        public TreeNode RootNode { get; set; }

        [Required]
        public DateTime CreateTime { get; set; }

        public TreeRootPrefix(string prefix,TreeNode rootNode,DateTime dateTime)
        {
            this.Prefix = prefix;
            this.RootNode = rootNode;
            this.CreateTime = dateTime;
        }
    }
}