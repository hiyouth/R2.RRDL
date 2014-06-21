using R2.RRDL.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Objects;
using System.Data.Entity;
using System.Linq;
using System.Text;

namespace R2.RRDL.Models.Mapping
{
    public class LinqHelper<U> where U:DbContext,new()
    {
       //protected RRDLEntities db = new RRDLEntities();
     

        /// <summary>
        /// 为保存实体对象提供统一方法
        /// </summary>
        /// <param name="entitySetName"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        public bool SaveObjectEntity<T>(T entity) where T:class
        {
            try
            {
                using (U db = new U())
                {
                    DbSet sets = db.Set<T>();
                  //  sets.Attach(entity);
                //    db.Entry<T>(entity).State = EntityState.Added;
                    sets.Add(entity);
                    db.SaveChanges();
                   // db.Database.Connection.Close();
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 为更新一个实体提供统一方法
        /// </summary>
        /// <param name="comprehensive"></param>
        /// <returns></returns>
        public bool UpdateObjectEntity<T>(T entity) where T:class
        {
            try
            {
                using (U db = new U())
                {
                    DbSet sets = db.Set<T>();

                    sets.Attach(entity);

                    db.Entry<T>(entity).State = EntityState.Modified;

                    //db.SaveChanges();
                  // sets.ObjectStateManager.ChangeObjectState(entity, System.Data.EntityState.Modified);
                    db.SaveChanges();
                    return true;
                }
             
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
