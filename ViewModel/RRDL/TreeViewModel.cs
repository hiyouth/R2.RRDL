using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.ViewModel
{
    public class TreeViewModel
    {
        public int Deepth { get; set; }
        public int? Id { get; set; }
        public bool IsLeaf { get; set; }
        public int? ParentId { get; set; }
        public string Title { get; set; }
    }
}