using R2.Helper.Linq;
using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using R2.RRWM.Models;
using R2.RRWM.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using R2.Helper.Extentions;
using R2.RRDL.Models.RRWM;

namespace R2.RRWM.BusinessModel
{
    /// <summary>
    /// 工时统计服务
    /// </summary>
    public class BonusService : ModelServiceBase<RRWMEntities, Task, TaskRepository>
    {
        private Func<Task, int, int, int, Boolean> _CONDTION_WEEK =
            (t, year, month, week) => t.Year == year && t.Month == month && t.Week == week;

        private Func<Task, int, int, Boolean> _CONDTION_MONTH =
            (t, year, month) => t.Year == year && t.Month == month;

        private Func<Task, int, List<int>, Boolean> _CONDTION_SEASON =
            (t, year, seasons) => t.Year == year && seasons.Any(m => m == t.Month);

        private Func<Task, int,Boolean> _CONDTION_YEAR =
            (t, year) => t.Year == year;

        public BonusService(RRWMEntities db)
            : base(db)
        {

        }

        /// <summary>
        /// 根据一个用户编号查询该用户的周工时总数
        /// </summary>
        /// <param name="uid"></param>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <param name="week"></param>
        /// <returns></returns>
        public float FindWeekBounusByUser(string uid,int year,int month,int week)
        {
            var q = from t in this.db.Tasks
                    where t.Year == year && t.Month == month && t.Week == week && t.TaskerID == uid
                    group t by t.TaskerID into g
                    select new
                    {
                        UserId=g.Key,
                        SumBounus = g.Sum(t=>t.Bonus)
                    };
            float rlt = q.FirstOrDefault().SumBounus;
            this.Repository.DisposeIfShould();
            return rlt;
        }

        /// <summary>
        /// 查询一组用户的周工时总数或者计划工时总数
        /// </summary>
        /// <param name="users">用户列表</param>
        /// <param name="year">年</param>
        /// <param name="month">月</param>
        /// <param name="week">周</param>
        /// <returns></returns>
        public List<UserBonus> FindWeekBounusByUsers(IEnumerable<User> users,
            int year, int month, int week)
        {
            Func<Task, Boolean> condtion = t => this._CONDTION_WEEK(t,year,month,week)&&
                           users.Any(u => u.Id == t.TaskerID);
            List<UserBonus> userBonus = this.FindBounusByCondition(condtion);
            this.Repository.DisposeIfShould();
            return userBonus;
        }

        /// <summary>
        /// 获取月工时总数或者月计划工时总数
        /// </summary>
        /// <param name="users">一组用户</param>
        /// <param name="year">年</param>
        /// <param name="month">月</param>
        /// <param name="selector">t=>t.Bonus或者t=>t.ScheduleBounus</param>
        /// <returns></returns>
        public List<UserBonus> FindMonthBounusByUsers(IEnumerable<User> users,
            int year, int month)
        {
            Func<Task, Boolean> condtion = t => this._CONDTION_MONTH(t,year,month) &&
                           users.Any(u => u.Id == t.TaskerID);

            List<UserBonus> userBonus = this.FindBounusByCondition(condtion);
            this.Repository.DisposeIfShould();
            return userBonus;
        }

        public Dictionary<String, float> FindMonthAverageBounusByUsers(IEnumerable<User> users,
            int year, int month)
        {
            Func<Task, Boolean> condtion = t => 
                this._CONDTION_MONTH(t, year, month) &&
                           users.Any(u => u.Id == t.TaskerID);
            Dictionary<String, float> rlt = this.FindAverageWeekBounusByCondtion(condtion);
            this.Repository.DisposeIfShould();
            return rlt;
        }

        /// <summary>
        /// 获取季度工时总数或者季度计划工时总数
        /// </summary>
        /// <param name="users">一组用户</param>
        /// <param name="year">年</param>
        /// <param name="season">季度</param>
        /// <param name="selector">t=>t.Bonus或者t=>t.ScheduleBounus</param>
        /// <returns></returns>
        public List<UserBonus> FindSeasonBounusByUsers(IEnumerable<User> users,
             int year, int season)
        {
            List<int> months = this.SeasonToMonths(season);
            Func<Task, Boolean> condtion = t =>
                this._CONDTION_SEASON(t, year, months)&&
                users.Any(u => u.Id == t.TaskerID);
            List<UserBonus> userBonus = this.FindBounusByCondition(condtion);
            this.Repository.DisposeIfShould();
            return userBonus;
        }

        public Dictionary<String, float> FindSeasonAverageWeekBounusByUsers(IEnumerable<User> users,
          int year, int season)
        {
            List<int> months = this.SeasonToMonths(season);
            Func<Task, Boolean> condtion = t =>
                this._CONDTION_SEASON(t, year, months) &&
                users.Any(u => u.Id == t.TaskerID);
            Dictionary<String,float> rlt = this.FindAverageWeekBounusByCondtion(condtion);
            this.Repository.DisposeIfShould();
            return rlt;
        }

        /// <summary>
        /// 获取年工时总数或者年计划工时总数
        /// </summary>
        /// <param name="users">一组用户</param>
        /// <param name="year">年</param>
        /// <param name="selector">t=>t.Bonus或者t=>t.ScheduleBounus</param>
        /// <returns></returns>
        public List<UserBonus> FindYearBounusByUsers(IEnumerable<User> users,
              int year)
        {
            Func<Task, Boolean> condtion = t=>
                   this._CONDTION_YEAR(t,year)&&
                           users.Any(u => u.Id == t.TaskerID);
            List<UserBonus> userBonus =  this.FindBounusByCondition(condtion);
            this.Repository.DisposeIfShould();
            return userBonus;
        }

        public Dictionary<String, float> FindYearAverageWeekBounusByUsers(IEnumerable<User> users,
            int year)
        {
            Func<Task, Boolean> condtion = t =>
                   this._CONDTION_YEAR(t, year) &&
                           users.Any(u => u.Id == t.TaskerID);
            Dictionary<String, float> rlt = this.FindAverageWeekBounusByCondtion(condtion);
            this.Repository.DisposeIfShould();
            return rlt;
        }

        /// <summary>
        /// 根据用户查询月每周工时
        /// </summary>
        /// <param name="users"></param>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <param name="selector"></param>
        /// <returns></returns>
        public List<UserBonus> FindMonthEachWeekBounusByUsers(IEnumerable<User> users,
            int year, int month)
        {
            Func<Task, Boolean> condtion = t =>
                                                                 this._CONDTION_MONTH(t, year,month) &&
                                                                 users.Any(u => u.Id == t.TaskerID);
            List<UserBonus> result = this.FindPerEachBounusByCondition(condtion,t=>t.Week);
            return result;
        }

        /// <summary>
        /// 根据用户查询季度每月工时
        /// </summary>
        /// <param name="users"></param>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <param name="selector"></param>
        /// <returns></returns>
        public List<UserBonus> FindSeasonEachWeekBounusByUsers(IEnumerable<User> users,
            int year, int season)
        {
              List<int> months = this.SeasonToMonths(season);
            Func<Task, Boolean> condtion = t =>
                                                                 this._CONDTION_SEASON(t, year,months) &&
                                                                 users.Any(u => u.Id == t.TaskerID);
            List<UserBonus> result = this.FindPerEachBounusByCondition(condtion, t => t.Month);
            return result;
        }

         //<summary>
         //根据用户查询年每季度工时
         //</summary>
         //<param name="users"></param>
         //<param name="year"></param>
         //<returns></returns>
        public List<UserBonus> FindYearEachSeasonBonusByUsers(IEnumerable<User> users,
            int year)
        {
            Func<Task, Boolean> condtion = t =>
                                                              this._CONDTION_YEAR(t, year) &&
                                                              users.Any(u => u.Id == t.TaskerID);
            List<UserBonus> result = this.FindPerEachBounusByCondition(condtion,
                t => MonthToSeason(t.Month));
            return result;
        }

      //  public List 

        protected int MonthToSeason(int month)
        {
            int rlt = 0;
            switch (month)
            {
                case 1:
                case 2:
                case 3:
                    rlt = 1;
                    break;
                case 4:
                case 5:
                case 6:
                    rlt = 2;
                    break;
                case 7:
                case 8:
                case 9:
                    rlt = 3;
                    break;
                case 10:
                case 11:
                case 12:
                    rlt = 4;
                    break;
                default:
                    throw new Exception("不存在这样的月份");
            }
            return rlt;
        }

        protected List<int> SeasonToMonths(int season)
        {
            List<int> rlt = new List<int>();
            switch (season)
            {
                case  1:
                    rlt.AddRange(new int[] { 1, 2, 3 });
                    break;
                case 2:
                    rlt.AddRange(new int[] { 4, 5, 6 });
                    break;
                case 3:
                    rlt.AddRange(new int[] { 7, 8,9 });
                    break;
                case 4:
                    rlt.AddRange(new int[] { 10, 11, 12 });
                    break;
                default:
                    throw new Exception("没有这样的季度");
            }
            return rlt;
        }

        /// <summary>
        /// 根据指定条件获取用户每周实际工时或者计划工时（获取多周）
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="bonusSelector"></param>
        /// <returns></returns>
        public List<UserBonus> FindPerEachBounusByCondition(Func<Task, Boolean> condition
            ,Func<Task,int> timesSelector)
        {
            //TODO:提取到知识库
            Func<Task, Boolean> conditonNew = t =>
                                         condition(t) &&
                                         t.TaskProcessStatus == EnumTaskProcessStatus.Checked;
            var m = from t in this.db.Tasks.Where(conditonNew) select t;
                   var d= m.Count();
            var q = from t in this.db.Tasks.Where(conditonNew)
                    group t by new
                    {
                        t.TaskerID,
                        times=timesSelector(t)
                    }
                        into g
                        select new
                        {
                            Uid = g.Key.TaskerID,
                            SumBounus = g.Sum(t => t.Bonus),
                            SumSchedeuleBounus=g.Sum(t=>t.ScheduledBonus),
                            PereachTime=timesSelector(g.FirstOrDefault())
                        };
            var c = q.Count();
            var selectedUIds = q.Distinct(b=> b.Uid).Select(b=>b.Uid);
              List<UserBonus> result = new List<UserBonus>();
            //TODO:以下循环效率极低
            foreach (var item in selectedUIds)
            {
                UserBonus userBonus = new UserBonus();
                userBonus.UserID = item;
                userBonus.BonusCollection = new List<Bonus>();
                foreach (var perEachBonus in q)
                {
                    if (perEachBonus.Uid == item)
                    {
                        Bonus wb = new Bonus
                        {
                            PerEach = perEachBonus.PereachTime,
                            SumBonus = perEachBonus.SumBounus,
                            SumScheduleBounus=perEachBonus.SumSchedeuleBounus
                        };
                        userBonus.BonusCollection.Add(wb);
                    }
                }
                result.Add(userBonus);
            }
            this.Repository.DisposeIfShould();
            return result;
        }




       /// <summary>
       /// 查询满足条件的任务的工时总数
       /// </summary>
       /// <param name="condition"></param>
       /// <returns></returns>
        public List<UserBonus> FindBounusByCondition(Func<Task, Boolean> condition)
        {
            Func<Task,Boolean> conditonNew= t =>
                                         condition(t) &&
                                         t.TaskProcessStatus == EnumTaskProcessStatus.Checked;
            var q1 = from t in this.db.Tasks.Where(conditonNew)
                     select t;
            int c = q1.Count();
            var q = from t in this.db.Tasks.Where(conditonNew)
                    group t by t.TaskerID into g
                    select new
                    {
                        UserId = g.Key,
                        SumBounus = g.Sum(t=>t.Bonus),
                        SumScheduleBounus=g.Sum(t=>t.ScheduledBonus)
                    };
            List<UserBonus> userBonusList = new List<UserBonus>();
            foreach (var item in q)
            {
                UserBonus userBonus = new UserBonus();
                Bonus b = new Bonus()
                {
                    SumBonus=item.SumBounus,
                    SumScheduleBounus=item.SumScheduleBounus
                };
                userBonus.UserID = item.UserId;
                userBonus.BonusCollection = new List<Bonus>() { b};
                userBonusList.Add(userBonus);
            }
            this.Repository.DisposeIfShould();
            return userBonusList;
        }

        /// <summary>
        /// 查询满足条件的任务的周平均工时
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public Dictionary<String, float> FindAverageWeekBounusByCondtion(Func<Task, Boolean> condition)
        {
            Func<Task, Boolean> conditonNew = t =>
                                      condition(t) && 
                                     t.TaskProcessStatus == EnumTaskProcessStatus.Checked;

            //TODO:from t in this.db.Tasks 
                 // where condition(t) 会报错注意学习为什么
            var q = from t in this.db.Tasks.Where(conditonNew)
                    group t by t.TaskerID into g
                    select new
                    {
                        UserId = g.Key,
                        AverageWeekBounus = g.Sum(t => t.Bonus)/g.Distinct(t=>t.Week).Count()
                    };
            Dictionary<String, float> result = new Dictionary<String, float>();
            foreach (var item in q)
            {
                result.Add(item.UserId, item.AverageWeekBounus);
            }
            this.Repository.DisposeIfShould();
            return result;
        }
    }
}