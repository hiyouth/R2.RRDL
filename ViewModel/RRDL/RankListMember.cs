using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using R2.RRDL.ViewModel;
namespace R2.RRDL.ViewModel
{
    public class RankListMember
    {
        public string RealName;
        public string Id;
        public int ariticleCount;
    }
    
    public class RankListTeam {
        //public int Id;
        public string Title;
        public int AriticleCount;
    }

    public class RankListContentType {
        public string Title;
        public int AriticleCount;
    }
    //郭毅2013年12月26日13:57:35
    public class ClassifyTreeNodes {
        public int? Id;
        public string Title;
        public bool IsLeaf;
        public int ? ParentId;
        public string AriticleId;
    }
}