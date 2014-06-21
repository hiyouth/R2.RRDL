using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace R2.RRDL.Models
{
    public class TreeNode:TreeNodeBasic
    {
        public virtual Ariticle Ariticle { get; set; }
        //public string 
        public TreeNode(int? parentId, string title):base(parentId,title)
        {
            //树结构的Id为自动编号，这里初始化为-1表示，给Id赋值没有意义
            //this.Id = -1;
        }

        public TreeNode()
        {
            //树结构的Id为自动编号，这里初始化为-1表示，给Id赋值没有意义
            //this.Id = -1;
        }
    }
}