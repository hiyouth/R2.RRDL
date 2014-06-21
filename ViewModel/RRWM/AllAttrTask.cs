using R2.RRWM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.ViewModel.RRWM
{
    public class AllAttrTask
    {
        public string ID { get;set; }
        public EnumTaskType TaskType { get; set; }
        public int ProjectID { get;set; }
        public string TaskTitle { get;set; }
        public string SecondLevelTitle { get;set; }
        public string TaskContent { get;set; }
        public string TaskFinishStandard { get;set; }
        public float ScheduledBonus { get;set; }
        public string TaskerNameId { get;set; }
        public DateTime ScheduledStartTime { get;set; }
        public DateTime ScheduledFinishTime { get; set; }
        public DateTime? ConfirmedFinishTime { get; set; }
        public EnumTaskStatus TaskStatus { get; set; }
        public int UsedHours { get; set; }
        public float Bonus { get;set; }
        public float QualityFactor { get;set; }
        public int Month { get;set; }
        public int Week { get;set; }
        public string CheckerNameId { get;set; }
        public string Memo { get;set; }
    }
}