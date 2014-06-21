using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace R2.RRDL.BusinessModel
{
    
    /// <summary>
    /// 业务类基类
    /// </summary>
    /// <typeparam name="T">传入dbcontext类型，如RRWMEntities</typeparam>
    /// <typeparam name="U">传入该业务类的实体类,如Task</typeparam>
    /// <typeparam name="M">传入该业务类对应的Repository，如TaskRepository</typeparam>
    public class ModelServiceBase<T,U,M>
                                        where T : DbContext,new()
                                         where  U: class,new()
                                         where M:RepositoryBase<T,U>,new()
    {
        protected T db = null;
        private M repository = null;

        /// <summary>
        /// 只读，禁止用户传入Repository，但可以获取Repository
        /// </summary>
        public M Repository
        {
            get 
            {
                return repository; 
            }
        }

        //在每个涉及到Repository层操作的方法调用后，是否应该
        //Dispose掉dbcontext
        //通常如果使用外部传入的非null的dbcontext，则不应当dispose掉dbcontext
        //这通常是基于2个原因，
        //1. 有时候需要EF框架支持事务操作，这通常需要在一个DBContext中完成
        //2. 由于LazyLoading的原因，某些外键属性需要延迟到外部由客户决定何时加载
        //    这种情况下同样不能过早释放DBContext
        private bool shouldDisposeDbContext;

        public ModelServiceBase()
        {
            this.shouldDisposeDbContext = true;
            this.repository = new M();
        }

        public ModelServiceBase(T db)
        {
            this.db = db;
            this.repository = new M();
            this.repository.Db = this.db;
            if(this.db!=null)
                this.shouldDisposeDbContext = false;
        }
    }
}