using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using R2.RRDL.Models;
namespace R2.RRDL.ViewModel
{
    public class AriticleViewModel
    {
        public EnumAriticleApproveStatus ApproveStatus { get; set; }
        public int Approve_Id { get; set; }
        public string Id { get; set; }
        public string Createtime;
        public string Title { get; set; }       
        public string UGC { get; set; }
        public User User { get; set; }
        public string author { get; set; }
        public List<string> Tags { get; set; }
        public int PraiseCount { get; set; }

        public AriticleViewModel(Ariticle ariticle)
        {
            this.Tags = new List<string>();
            this.Fill(ariticle);
        }

        private void Fill(Ariticle ariticle)
        {
            this.Title = ariticle.Title;
            this.UGC = ariticle.UGC;
            this.Tags = new List<string>();
            foreach (var item in ariticle.Tags)
            {
                this.Tags.Add(item.Title);
            }
        }
    }
}