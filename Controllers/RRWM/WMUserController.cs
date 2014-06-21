using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using R2.RRWM.Models;
using R2.RRDL.Models;
using R2.RRWM.BusinessModel;
using Newtonsoft.Json;
using R2.RRDL.BusinessModel;

namespace R2.RRDL.Controllers.RRWM
{
    public class WMUserController : Controller
    {

        /// <summary>
        ///传入用户所属组，返回这个组内所有成员(实际上，RRDL的UserService里有) 
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public JsonResult GetAllMembersByGroupId(int groupId)
        {
            UserService us = new UserService();
            List<User> list = us.FindUsersByGroupId(groupId);
            List<string> userNameList = new List<string>();
            for (int i = 0; i < list.Count; i++)
            {
                userNameList.Add(list[i].RealName + "," + list[i].Id);
            }
            return Json(userNameList);
        }

        /// <summary>
        ///获取有 待确认 任务的全部成员列表     
        /// </summary>
        /// <returns></returns>
        public List<User> GetUsersContainsTasksUnconfirmed()
        {
            TaskService ts = new TaskService();
            EnumTaskProcessStatus status = EnumTaskProcessStatus.None;
            Dictionary<User, int> dictionary = ts.FindUserIDsAndTaskCountWithTaskProcessStatus(status, t => t != null);//找出所有有待确认任务的Dictionary
            List<User> list = new List<User>();
            foreach (var i in dictionary.Keys)
            {
                list.Add(i);
            }
            return list;//遍历全部键值对，取出全部成员内容，组成列表，返回
        }

        /// <summary>
        ///获取有 待审核 任务的全部成员列表    
        /// </summary>
        /// <returns></returns>
        public List<User> GetUsersContainsTasksUnchecked()
        {
            TaskService ts = new TaskService();
            EnumTaskProcessStatus status = EnumTaskProcessStatus.Confirmed;
            Dictionary<User, int> dictionary = ts.FindUserIDsAndTaskCountWithTaskProcessStatus(status, t => t != null);
            List<User> list = new List<User>();
            foreach (var i in dictionary.Keys)
            {
                list.Add(i);
            }
            return list;
        }

        /// <summary>
        ///获取有 任意状态 任务的全部成员列表    
        /// </summary>
        /// <returns></returns>
        public List<User> GetUsersContainsTasks()
        {
            TaskService ts = new TaskService();
            Dictionary<User, int> dictionary = ts.FindUserIDsAndTaskCountWithTaskProcessStatus(null, t => t != null);
            List<User> list = new List<User>();
            foreach (var i in dictionary.Keys)
            {
                list.Add(i);
            }
            return list;
        }

        /// <summary>
        ///获取所有有待审核任务的审核人及其各自待审核数量的列表 
        /// </summary>
        /// <returns></returns>
        public Dictionary<User, int> GetCheckerWithCount()
        {
            TaskService ts = new TaskService();
            Dictionary<User, int> dictionary = ts.FindUserIDsAndTaskCountWithTaskProcessStatus(EnumTaskProcessStatus.Confirmed, t => t.CheckerID);
            return dictionary;
        }


        /// <summary>
        ///获取所有有待确认任务的人员ID号,及每个人员的任务数量 
        /// </summary>
        /// <param name="status"></param>
        ///<returns>字典类型，String人员名称，int是该人员待确认的任务数量</returns>
        public Dictionary<User, int> FindUserIDsAndTaskCount_WithTaskUnconfirmed()
        {
            TaskService ts = new TaskService();
            Dictionary<User, int> result = ts.FindUserIDsAndTaskCountWithTaskProcessStatus(EnumTaskProcessStatus.None, t => t != null);
            //ZHAOs 2014年4月22日20:01:57 查出所有有待确认任务的人员ID号 及各自数量，不知道对不对，问Leilei
            return result;
        }

        /// <summary>
        ///获取所有有待审核任务的人员ID号,及每个人员的任务数量 
        /// </summary>
        /// <param name="status"></param>
        ///<returns>字典类型，String人员名称，int是该人员待确认的任务数量</returns>
        public Dictionary<User, int> FindUserIDsAndTaskCount_WithTaskUnchecked()
        {
            TaskService ts = new TaskService();
            Dictionary<User, int> result = ts.FindUserIDsAndTaskCountWithTaskProcessStatus(EnumTaskProcessStatus.Confirmed, t => t != null);
            return result;
        }



    }
}
