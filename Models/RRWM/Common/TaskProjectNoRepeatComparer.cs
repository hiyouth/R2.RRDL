using R2.RRWM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models.RRWM.Common
{
    /// <summary>
    /// 如果两个任务中的项目相同，则认为是属于相同项目的任务
    /// </summary>
    public class TaskProjectNoRepeatComparer:IEqualityComparer<Task>
    {

        bool IEqualityComparer<Task>.Equals(Task x, Task y)
        {
            //Check whether the compared objects reference the same data.
            if (Object.ReferenceEquals(x, y)) 
                return true;
            //Check whether any of the compared objects is null.
            if (Object.ReferenceEquals(x, null) || Object.ReferenceEquals(y, null))
                return false;
            return x.Project.ProjectName == y.Project.ProjectName;
        }

        // If Equals() returns true for a pair of objects 
        // then GetHashCode() must return the same value for these objects.

        public int GetHashCode(Task task)
        {
            //Check whether the object is null
            if (Object.ReferenceEquals(task, null)) return 0;

            //Get hash code for the Name field if it is not null.
            int hashTaskName = task.Project == null ? 0 : task.Project.GetHashCode();

            //Get hash code for the Code field.
            int hashProductCode = task.Project.GetHashCode();

            //Calculate the hash code for the product.
            return 0;
        }

    }
}