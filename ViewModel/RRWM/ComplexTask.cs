using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using R2.RRWM.Models;
using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using R2.RRWM.Models.Repository;
using R2.RRWM.BusinessModel;

namespace R2.RRDL.ViewModel.RRWM
{
    //这是一个具有较多属性的Task，用于把一个任务的详细信息都返回给前台，而不是前台接收后某些属性为null
    public class ComplexTask
    {       
        //直接拿到的属性
        public string RecordTime { get; set; }
        public EnumTaskType TaskType { get; set; }
        public EnumTaskCategory TaskCategory { get; set; }
        public EnumTaskStatus TaskStatus { get; set; }  
        public EnumTaskProcessStatus TaskProcessStatus { get; set; }
        public int ProjectID { get; set; }
        public string TaskTitle { get; set; }
        public string SecondLevelTitle { get; set; }
        public string TaskContent { get; set; }
        public string TaskFinishStandard { get; set; }
        public float ScheduledBonus { get; set; }
//        public string TaskerId { get; set; }
        public string ScheduledStartTime { get; set; }
        public string ScheduledFinishTime { get; set; }
        public string ConfirmedFinishTime { get; set; }
        public int Month { get; set; }
        public int Week { get; set; }
        //public string CheckerId { get; set; }
        public string Memo { get; set; }
        public string ID { get; set; }
        public int UsedHours { get; set; }//所用小时数
        public double Bonus { get; set; }//工时
        public float QualityFactor { get; set; }//任务质量系数


        #region
        //ComplexTask有但是js里面没有的
        //得到一个类似于 R2-IP2014-NoSN 这样的字符串
        public string ProjectId {
            get {
                using (ProjectRepository proRepository = new ProjectRepository()) {
                    ProjectService ps = new ProjectService();
                    Project p = ps.FindByProjID(this.ProjectID);
                    return p.ProjectID;
                }
            }
        }

        //ComplexTask和js里都有的属性，但是名称不完全一致的，需要前台改名字，改为与后台一致的
        //这里的TaskerNameId实际上就是TaskerId，前台要改名字
        public string TaskerId { get; set; }
        //这里的CheckerNameId实际上就是CheckerId，前台要改名字
        public string CheckerId { get; set; }
        #endregion
        //需要处理的属性
        public string TaskerName {
            get
            {
                using (UserRepository userRepository = new UserRepository())
                {
                    UserService us = new UserService();
                    User user = us.FindById(this.TaskerId);
                    return user.RealName;
                }
            }
            set {
                this.TaskerName = value;
            }
        }
        public string CheckerName { 
            get {
                using (UserRepository userRepository = new UserRepository()) {
                    UserService us = new UserService();
                    User user = us.FindById(this.CheckerId);
                    return user.RealName;
                }
            }
            set {
                this.CheckerName = value;            
            }
        }

        public string proName { get; set; }
        public string ProNO { get; set; }
        

        public ComplexTask(Task task)
        {
            this.RecordTime = task.RecordTime.ToShortDateString();
            this.TaskType = task.TaskType;
            this.TaskCategory = task.TaskCategory;
            this.ProjectID = task.ProjectID;
            this.TaskTitle = task.TaskTitle;
            this.SecondLevelTitle = task.SecondLevelTitle;
            this.TaskContent = task.TaskContent;
            this.TaskFinishStandard = task.TaskFinishStandard;
            this.ScheduledBonus = task.ScheduledBonus;
            this.Bonus = task.Bonus;
            this.UsedHours = task.UsedHours;
            this.TaskerId = task.TaskerID;
            this.ScheduledStartTime = task.ScheduledStartTime.ToString();
            this.ScheduledFinishTime = task.ScheduledFinishTime.ToString();
            this.ConfirmedFinishTime = (task.ConfirmedFinishTime == null)? "" :task.ConfirmedFinishTime.ToString();
            this.Month = task.Month;
            this.Week = task.Week;
            this.ID = task.ID;
            this.UsedHours = task.UsedHours;
           // this.CheckerName = task.CheckerName;
            //this.TaskerName = task.TaskerName;
            this.CheckerId = task.CheckerID;
            this.Memo = task.Memo;
            this.QualityFactor = task.QualityFactor;
            //下面处理不能直接得到的属性
            this.proName = task.Project.ProjectName;
            this.ProNO = task.Project.ProjectID;
            this.TaskStatus = task.TaskStatus;
            this.TaskProcessStatus = task.TaskProcessStatus;

        }

    }
}