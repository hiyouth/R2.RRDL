using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using R2.RRWM.Models;
using R2.RRWM.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRWM.BusinessModel
{
    public class TaskSNService : BusinessModelBase<RRWMEntities>
    {
        public TaskSNService(RRWMEntities db)
            : base(db)
        {

        }

        /// <summary>
        /// 插入一条任务后，当月任务序列号需要+1
        /// </summary>
        /// <param name="year"></param>
        /// <param name="month"></param>
        public void Update(int year,int month)
        {
            TaskSNRepository repository = new TaskSNRepository(this.db);
            TaskSN sn = repository.GetSNByYearMonth(year, month);
            sn.SerialNumber += 1;
            repository.Update(sn);
            repository.DisposeIfShould();
        }

        /// <summary>
        /// 根据年月获取Task序列号
        /// </summary>
        /// <param name="yearNumber"></param>
        /// <param name="monthNumber"></param>
        /// <returns></returns>
        public int GetTaskSN(int yearNumber,int monthNumber)
        {
            TaskSNRepository repository = new TaskSNRepository(this.db);
               TaskSN sn= repository.GetSNByYearMonth(yearNumber, monthNumber);
               repository.DisposeIfShould();
               return sn.SerialNumber;
               
        }
    }
}