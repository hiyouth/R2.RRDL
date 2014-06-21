using R2.RRDL.BusinessModel;
using R2.RRDL.Models;
using R2.RRDL.Models.RRWM;
using R2.RRWM.BusinessModel;
using R2.RRWM.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace R2.RRDL.Controllers.RRWM
{
    public class TaskHoursStatisticsController : Controller
    {
        //工时统计 created by jjm @2014.05.08
        // GET: /TaskHoursStatistics/

        public ActionResult Index()
        {
            return View();
        }
        UserService userService = new UserService();
        /// <summary>
        /// 工时统计 按月计算
        /// </summary>
        /// <param name="teamId"></param>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <returns></returns>
        public JsonResult GetTaskHoursDataForMonths(string teamId, string year, string month)
        {
            RRWMEntities WMEntity = new RRWMEntities();
            BonusService bs = new BonusService(WMEntity);
            IEnumerable<User> user = userService.FindUsersByGroupId(Convert.ToInt32(teamId)).AsEnumerable<User>();
            List<UserBonus> list=bs.FindMonthEachWeekBounusByUsers(user, Convert.ToInt32(year), Convert.ToInt32(month));
            //将查询到的结果进行处理，将用户的id换成真实姓名
            for (int i = 0; i < list.Count(); i++)
            {
                string id = list[i].UserID;
                foreach (User u in user)
                {
                    if (u.Id == id)
                    {
                        list[i].UserID = u.RealName;
                        break;
                    }
                }
            }
            return Json(list);
        }

        /// <summary>
        /// 工时统计 按季度计算
        /// </summary>
        /// <param name="teamId"></param>
        /// <param name="year"></param>
        /// <param name="quater"></param>
        /// <returns></returns>
        public JsonResult GetTaskHoursDataForQuaters(string teamId, string year, string quater)
        {
            RRWMEntities WMEntity = new RRWMEntities();
            BonusService bs = new BonusService(WMEntity);
            IEnumerable<User> user = userService.FindUsersByGroupId(Convert.ToInt32(teamId)).AsEnumerable<User>();
            List<UserBonus> list = bs.FindSeasonEachWeekBounusByUsers(user, Convert.ToInt32(year), Convert.ToInt32(quater));
            //将查询到的结果进行处理，将用户的id换成真实姓名
            for (int i = 0; i < list.Count(); i++)
            {
                string id = list[i].UserID;
                foreach (User u in user)
                {
                    if (u.Id == id)
                    {
                        list[i].UserID = u.RealName;
                        break;
                    }
                }
            }
            return Json(list);
        }

        /// <summary>
        /// 工时统计 按年计算 得到相应团队所有成品一年内所有 季度的工时信息
        /// </summary>
        /// <param name="teamId"></param>
        /// <param name="year"></param>
        /// <returns></returns>
        public JsonResult GetTaskHoursDataForYears(string teamId, string year)
        {
            RRWMEntities WMEntity = new RRWMEntities();
            BonusService bs = new BonusService(WMEntity);
            IEnumerable<User> user = userService.FindUsersByGroupId(Convert.ToInt32(teamId)).AsEnumerable<User>();
            List<UserBonus> list = bs.FindYearEachSeasonBonusByUsers(user, Convert.ToInt32(year));
            //将查询到的结果进行处理，将用户的id换成真实姓名
            for (int i = 0; i < list.Count(); i++)
            {
                string id = list[i].UserID;
                foreach (User u in user)
                {
                    if (u.Id == id)
                    {
                        list[i].UserID = u.RealName;
                        break;
                    }
                }
            }
            return Json(list);
        }

        /// <summary>
        /// 获得团队所有 成员 某一周的 工时
        /// </summary>
        /// <param name="teamId"></param>
        /// <param name="year"></param>
        /// <param name="month"></param>
        /// <param name="week"></param>
        /// <returns></returns>
        public JsonResult GetTaskHoursDataForWAvg(string teamId, string year, string month, string week) 
        {
            RRWMEntities WMEntity = new RRWMEntities();
            BonusService bs = new BonusService(WMEntity);
            IEnumerable<User> user = userService.FindUsersByGroupId(Convert.ToInt32(teamId)).AsEnumerable<User>();
            List<UserBonus> list = bs.FindWeekBounusByUsers(user, Convert.ToInt32(year), Convert.ToInt32(month), Convert.ToInt32(week));
            Dictionary<string, float> newData = new Dictionary<string, float>();

            //将查询到的结果进行处理，将用户的id换成真实姓名
            for (int i = 0; i < list.Count(); i++)
            {
                string id = list[i].UserID;
                foreach (User u in user)
                {
                    if (u.Id == id)
                    {
                        list[i].UserID = u.RealName;
                        break;
                    }
                }
            }
            return Json(list);

           /*
            //将查询到的结果进行处理，将用户的id换成真实姓名，并将其中的计划工时去掉
            for (int i = 0; i < list.Count(); i++)
            {
                string id = list[i].UserID;
                foreach (User u in user)
                {
                    if (u.Id == id)
                    {
                        newData.Add(u.RealName,list[i].BonusCollection[0].SumBonus);
                        break;
                    }
                }
            }
            return Json(newData);
            */
        }

    }
}
