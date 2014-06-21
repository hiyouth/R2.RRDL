using R2.RRWM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.ViewModel.RRWM
{

    ///下面是一个临时类型，只为了中转最终得到一个Task类型然后AddTask
    ///ZHAOs  2014年4月24日15:57:31
    public class TempTask
    {
        public string ID { get; set; }
        public int UsedHours { get; set; }
        public string taskStatus { get; set; }  //这两个属性为什么要设置为string，因为前台方便
        public string TaskProcessStatus { get; set; }     //这两个属性为什么要设置为string，因为前台方便
        public float Bonus { get; set; }
        public float QualityFactor { get; set; }
        //public DateTime RecordTime { get; set; }
        public int TaskType { get; set; }
        public string TaskCategory { get; set; }
        //public string proName {get;set;}
        public int ProjectID { get; set; }
        public string TaskTitle { get; set; }
        public string SecondLevelTitle { get; set; }
        public string TaskContent { get; set; }
        public string TaskFinishStandard { get; set; }
        public float ScheduledBonus { get; set; }
        public string TaskerName { get; set; }
        public string TaskerNameId { get; set; }
        public DateTime ScheduledStartTime { get; set; }
        public DateTime ScheduledFinishTime { get; set; }
        public DateTime ConfirmedFinishTime { get; set; }
        public string Month { get; set; }
        public int Week { get; set; }
        public string CheckerName { get; set; }
        public string CheckerNameId { get; set; }
        public string Memo { get; set; }         
    }
}