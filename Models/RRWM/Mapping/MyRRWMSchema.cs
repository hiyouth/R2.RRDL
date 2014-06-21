using R2.Helper.Time;
using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using R2.RRWM.BusinessModel;
using R2.RRWM.Models.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace R2.RRWM.Models.Mapping
{
    public class MyRRWMSchema<T>:CreateDatabaseIfNotExists<T>
        where T : DbContext
    {
        protected override void Seed(T context)
        {
            InitializeModelObejct();
        }

         private void InitializeModelObejct()
         {
             InitializeTaskSNRecord();
             InitializeProjectInfomation();
             InitializeTasksForTest();
         }

        /// <summary>
        /// 初始化任务序号实体集
        /// </summary>
         private void InitializeTaskSNRecord()
         {
             List<TaskSN> sns = new List<TaskSN>();
             for (int i = 2014; i <= 2034; i++)
             {
                 for (int j = 1; j <= 12; j++)
                 {
                     TaskSN sn = new TaskSN()
                     {
                         Year=i,
                         Month=j
                     };
                     sns.Add(sn);
                 }
             }

             TaskSNRepository repository = new TaskSNRepository();
             repository.AddRange(sns);
         }

        /// <summary>
        /// 初始化项目信息
        /// </summary>
         private void InitializeProjectInfomation()
         {
             List<Project> pjs = new List<Project>();
             Project p1 = new Project()
             {
                  ProjectName="济南市地质灾害气象预警预报系统",
                  ProjectID="R2-IP2014-NoSN",
             };

             Project p2 = new Project()
             {
                 ProjectName = "龙岩市地质灾害气象预警系统",
                 ProjectID = "R2-IP2014-NoSN"
             };

             Project p3 = new Project()
             {
                 ProjectID = "R2-IP2014-0011",
                 ProjectName = "ZD-GIS工具集超市行业系统地质灾害项目"
             };

             Project p4 = new Project()
             {
                 ProjectID = "R2-IP2014-0010",
                 ProjectName = "R2-RRWM工作管理评价系统"
             };

             Project p5 = new Project()
             {
                 ProjectName = "江西省地质灾害和矿山复绿数据库建设项目",
                 ProjectID = "R2-IP2014-NoSN"
             };

             Project p6 = new Project()
             {
                 ProjectID = "R2-IP2014-0012",
                 ProjectName = "R2-地质大学出版社地质行业电子平台(Windows 8)"
             };

             Project p7 = new Project()
             {
                 ProjectID = "R2-IP2014-0013",
                 ProjectName = "R2-地质灾害产品化行业SDK（2期）"
             };

             pjs.Add(p1);
             pjs.Add(p2);
             pjs.Add(p3);
             pjs.Add(p4);
             pjs.Add(p5);
             pjs.Add(p6);
             pjs.Add(p7);
             ProjectRepository repository = new ProjectRepository();
             repository.AddRange(pjs);
         }

         public static void InitializeTasksForTest()
         {
             //TestTest t = new TestTest();
             //t.Year = "99999";
             //t.SerialNumber = 66;
             //TestRepository r = new TestRepository();
             //r.Add(t);
             //Project p = new Project();
             //using (var repository = new ProjectRepository())
             //{
             //    p = repository.FindByID(1);
             //}
             UserService serviece = new UserService();
             List<User> userList = serviece.FindAll();


             Task task1 = new Task()
             {
                 CheckerID = userList[0].Id,
                 CheckerName = userList[0].RealName,
                 ProjectID = 1,
                 ScheduledBonus = 3,
                 ScheduledFinishTime = new DateTime(2014, 4, 23, 18, 0, 0),
                 ScheduledStartTime = new DateTime(2014, 4, 21, 8, 0, 0),
                 TaskContent = "测试任务",
                 SecondLevelTitle = "测试二级分类",
                 TaskerID = userList[3].Id,
                 TaskFinishStandard = "测试任务标准",
                 TaskTitle = "需求文档完成",
                 Week = 1,
                 TaskProcessStatus=EnumTaskProcessStatus.Checked
             };

             Task task2 = new Task()
             {
                 CheckerID = userList[0].Id,
                 CheckerName = userList[0].RealName,
                 ProjectID = 3,
                 ScheduledBonus = 3,
                 ScheduledFinishTime = new DateTime(2014, 4, 23, 18, 0, 0),
                 ScheduledStartTime = new DateTime(2014, 4, 21, 8, 0, 0),
                 TaskContent = "测试任务",
                 SecondLevelTitle = "测试二级分类",
                 TaskerID = userList[2].Id,
                 TaskFinishStandard = "测试任务标准",
                 TaskTitle = "需求文档完成",
                 Week = 2,
                 TaskProcessStatus = EnumTaskProcessStatus.Checked
             };
             Task task3 = new Task()
             {
                 CheckerID = userList[2].Id,
                 CheckerName = userList[2].RealName,
                 ProjectID = 1,
                 ScheduledBonus = 3,
                 ScheduledFinishTime = new DateTime(2014, 4, 23, 18, 0, 0),
                 ScheduledStartTime = new DateTime(2014, 4, 21, 8, 0, 0),
                 TaskContent = "测试任务",
                 SecondLevelTitle = "测试二级分类",
                 TaskerID = userList[2].Id,
                 TaskFinishStandard = "测试任务标准",
                 TaskTitle = "需求文档完成",
                 Week = 1,
                 TaskProcessStatus = EnumTaskProcessStatus.Checked
             };
             Task task4 = new Task()
             {
                 CheckerID = userList[3].Id,
                 CheckerName = userList[3].RealName,
                 ProjectID = 3,
                 ScheduledBonus = 3,
                 ScheduledFinishTime = new DateTime(2014, 4, 23, 18, 0, 0),
                 ScheduledStartTime = new DateTime(2014, 4, 21, 8, 0, 0),
                 TaskContent = "测试任务",
                 TaskerID = userList[1].Id,
                 SecondLevelTitle = "测试二级分类",
                 TaskFinishStandard = "测试任务标准",
                 TaskTitle = "需求文档完成",
                 Week = 3,
                 TaskProcessStatus = EnumTaskProcessStatus.Checked
             };
             using (var db = new RRWMEntities())
             {
                 TaskService service = new TaskService(db);
                 service.New(task1);
                 db.SaveChanges();
                 service.New(task2);
                 db.SaveChanges();
                 service.New(task3);
                 db.SaveChanges();
                 service.New(task4);
                 db.SaveChanges();
             }
         }
    }
}