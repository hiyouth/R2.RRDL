using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models
{
    public class TreeNodeBasic
    {
        /// <summary>
        /// 树的编号
        /// </summary>
        [Key]
        public int? Id { get; set; }

        public string Title { get; set; }

        //private int? deepth;

        /// <summary>
        /// 深度
        /// </summary>
        [Required]
        public int Deepth { get; set; }

        /// <summary>
        /// 父节点编号，根节点的父节点编号为null
        /// </summary>
        public int? ParentId { get; set; }

        public bool IsLeaf { get; set; }

        public TreeNodeBasic()
        {
            this.IsLeaf = true;
        }

        public TreeNodeBasic(int? parentId,string title)
        {
            this.Title = title;
            this.ParentId = parentId;
            this.IsLeaf = true;
        }
    }
}