using R2.RRDL.Models.Mapping;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using R2.Helper;

namespace R2.RRWM.Models.Repository
{
    public class TaskSNRepository:RepositoryBase<RRWMEntities,TaskSN>
    {
        public TaskSNRepository(RRWMEntities db):base(db)
        {

        }

        public TaskSNRepository()
        {

        }

        /// <summary>
        ///  获取某年某月的任务序列号
        /// </summary>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <returns></returns>
        public TaskSN GetSNByYearMonth(int year, int month)
        {
            TaskSN sn = (from s in Db.TaskSNs
                         where s.Year == year&&s.Month == month
                         select s).First();
            return sn;
        }

        /// <summary>
        /// 当插入一条记录后，需要将当月的记录条数+1
        /// </summary>
        /// <param name="year"></param>
        /// <param name="month"></param>
        public void Refresh(int year, int month)
        {
            TaskSN sn=this.GetSNByYearMonth(year, month);
            sn.SerialNumber++;
            this.Update(sn);
        }
    }
}