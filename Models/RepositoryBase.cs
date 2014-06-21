using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace R2.RRDL.Models.Repository
{
    public class RepositoryBase<T,U>:IDisposable
                                                    where T:DbContext,new()
                                                     where U:class                             
    {
        private T db = null;

        public T Db
        {
            get { return db; }
            set 
            { 
                db = value;
                this.userDb = true;
            }
        }

        private bool userDb = false;

        public RepositoryBase(T db)
        {
            //如果是自己传入的DbContext，通常是用来支持一系列操作，或者需要在同一个
            //dbcontext中完成的操作
            //这个时候需要用户自己手动调用db.saveChanges方法以支持事物，且需要自己手动
            //Dispose掉Dbcontext
            if (db == null)
                this.db = new T();
            else
            {
                this.db = db;
                this.userDb = true;
            }
        }

        public RepositoryBase()
        {
            this.db = new T();
        }

        /// <summary>
        /// 提供查询所有实体的基础方法
        /// </summary>
        /// <returns></returns>
        public virtual IQueryable<U> FindAll()
        {
            return db.Set<U>().AsQueryable<U>();
        }

        public void Add(U entity)
        {
            try
            {
                DbSet sets = this.db.Set<U>();
                //  sets.Attach(entity);
                //    db.Entry<T>(entity).State = EntityState.Added;
                sets.Add(entity);
                if (!userDb)
                {
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void AddRange(List<U> entitys)
        {
            try
            {
                DbSet sets = this.db.Set<U>();
                foreach (var item in entitys)
                {
                    sets.Add(item);
                }
                if (!userDb)
                {
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Update(U entity)
        {
            try
            {
                DbSet sets = db.Set<U>();

                sets.Attach(entity);

                db.Entry<U>(entity).State = EntityState.Modified;

                //db.SaveChanges();
                // sets.ObjectStateManager.ChangeObjectState(entity, System.Data.EntityState.Modified);
                if (!userDb)
                {
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 提供实体的删除
        /// </summary>
        /// <param name="entity"></param>
        public void Drop(U entity)
        {
            try
            {
                DbSet sets = db.Set<U>();

                sets.Attach(entity);

                db.Entry<U>(entity).State = EntityState.Deleted;

                if (!userDb)
                {
                    db.SaveChanges();
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 根据条件，返回符合条件的集合
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public IQueryable<U> ExecuteConditions(Expression<Func<U, bool>> condition)
        {
            return this.FindAll().Where(condition).AsQueryable<U>();
        }

        public IQueryable<U> ExecuteConditions1(Expression<Func<U, bool>> condition)
        {
            return this.FindAll().Where(condition.Compile()).AsQueryable<U>();
        }

         void IDisposable.Dispose()
        {
            this.db.Dispose();
            this.db = null;
        }

         public  void Dispose()
         {
             this.db.Dispose();
             this.db = null;
         }

         public void DisposeIfShould()
         {
             if (!userDb)
             {
                 this.db.Dispose();
                 this.db = null;
             }
         }
         //find方法为黄圣所加
         /// <summary>
         /// 根据主键查找实体
         /// </summary>
         /// <param name="id"></param>
         /// <returns></returns>
         public U Find(object id)
         {
             return this.db.Set<U>().Find(id);
         }

         //innerjoin为黄圣所加
         /// <summary>
         /// 不传入数据库上下文的时候用于innerjoin
         /// </summary>
         /// <param name="tableName"></param>
         /// <returns></returns>
         public IQueryable<U> InnerJoin(string tableName)
         {
             return db.Set<U>().Include(tableName);

         }
    }
}