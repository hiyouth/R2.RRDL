using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using R2.RRDL.Models;

namespace R2.RRWM.Models
{
    /// <summary>
    /// 任务对象
    /// </summary>
    public class Task
    {

        private EnumTaskType taskType = EnumTaskType.Scheduled;
        private EnumTaskCategory taskCategory= EnumTaskCategory.Coding;
        private int usedHours = 0;
        private EnumTaskStatus taskStatus = EnumTaskStatus.InProgress;
        private int year = DateTime.Now.Year;
        private int month = DateTime.Now.Month;
        private EnumTaskProcessStatus taskProcessStatus = EnumTaskProcessStatus.None;

        /// <summary>
        /// 任务处理的状态，有初始状态，已确认未审核和已审核3种状态
        /// </summary>
        public EnumTaskProcessStatus TaskProcessStatus
        {
            get { return taskProcessStatus; }
            set { taskProcessStatus = value; }
        }

        /// <summary>
        /// 任务月份，默认值为当前月
        /// </summary>
        [Range(1, 12)]
        [Required]
        public int Month
        {
            get { return month; }
            set { month = value; }
        }

        /// <summary>
        /// 任务所属年份，默认为当前时间所在年份
        /// </summary>
        [Required]
        public int Year
        {
            get { return year; }
            set { year = value; }
        }



        /// <summary>
        /// 任务被确认的时间
        /// </summary>
        public DateTime? ConfirmedTime { get; set; }

        /// <summary>
        /// 唯一ID,采用R2T-年月日+顺序号，系统生成
        /// </summary>
        [Key]
        public string ID { get; set; }

        /// <summary>
        /// 录入时间，系统生成
        /// </summary>
        [Required]
        public DateTime RecordTime { get; set; }

        [Required]
        public int ProjectID { get; set; }

        /// <summary>
        /// 任务所属项目，必填
        /// </summary>
        [ForeignKey("ProjectID")]
        public virtual Project Project { get; set; }
        
        /// <summary>
        /// 任务类型,默认为计划
        /// </summary>
        [Required]
        public EnumTaskType TaskType
        {
            get
            {
                return this.taskType;
            }
            set
            {
                this.taskType = value;
            }
        }

        /// <summary>
        /// 任务类别，默认为编码
        /// </summary>
        [Required]
        public EnumTaskCategory TaskCategory
        {
            get
            {
                return this.taskCategory;
            }
            set
            {
                this.taskCategory = value;
            }
        }

        /// <summary>
        ///  任务名称，必填
        /// </summary>
        [MaxLength(128)]
        [Required]
        public String TaskTitle { get; set; }

        /// <summary>
        /// 任务具体内容，必填
        /// </summary>
        [Required]
        public String TaskContent { get; set; }

        /// <summary>
        /// 任务完成标准，必填
        /// </summary>
        [Required]
        public String TaskFinishStandard { get; set; }

        /// <summary>
        /// 计划工时，必填
        /// </summary>
        [Required]
        public float ScheduledBonus { get; set; }

        /// <summary>
        /// 核算工时
        /// </summary>
        [Required]
        public float Bonus { get; set; }

        /// <summary>
        /// 任务承担者，必填
        /// </summary>
        [Required]
        [MaxLength(50)]
        public String  TaskerID { get; set; }

        [NotMapped]
        public String TaskerName { get; set; }

        /// <summary>
        /// 计划开始时间，必填
        /// </summary>
        [Required]
        public DateTime ScheduledStartTime { get; set; }

        /// <summary>
        /// 计划完成时间，必填
        /// </summary>
        [Required]
        public DateTime ScheduledFinishTime { get; set; }

        /// <summary>
        /// 实际完成时间
        /// </summary>
        public DateTime? ConfirmedFinishTime { get; set; }

        /// <summary>
        /// 已用小时数
        /// </summary>
        [Required]
        public int UsedHours
        {
            get
            {
                return this.usedHours;
            }
            set
            {
                this.usedHours = value;
            }
        }

        /// <summary>
        /// 任务二级分类
        /// </summary>
        [Required]
        public String SecondLevelTitle { get; set; }

        /// <summary>
        /// 任务状态，默认为正在进行
        /// </summary>
        [Required]
        public EnumTaskStatus TaskStatus
        {
            get
            {
                return this.taskStatus;
            }
            set
            {
                this.taskStatus = value;
            }
        }

        /// <summary>
        /// 任务被确认的时间
        /// </summary>
        public DateTime? CheckedTime { get; set; }

        /// <summary>
        /// 质量系数
        /// </summary>
        [Range(0,1.5)]
        public float QualityFactor { get; set; }



        /// <summary>
        /// 任务周次，必填
        /// </summary>
        [Range(1, 5)]
        [Required]
        public int Week { get; set; }

        /// <summary>
        /// 任务审核人，必填
        /// </summary>
        [Required]
        [MaxLength(50)]
        public String  CheckerID { get; set; }

        [NotMapped]
        public String CheckerName { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Memo { get; set; }

        public virtual ICollection<TaskComment> Comments { get; set; }


    }
}