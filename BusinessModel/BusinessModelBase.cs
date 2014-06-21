using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace R2.RRDL.BusinessModel
{
    public class BusinessModelBase<T>
                                        where T : DbContext
    {
        protected T db = null;

        //在每个涉及到Repository层操作的方法调用后，是否应该
        //Dispose掉dbcontext
        //通常如果使用外部传入的非null的dbcontext，则不应当dispose掉dbcontext
        //这通常是基于2个原因，
        //1. 有时候需要EF框架支持事务操作，这通常需要在一个DBContext中完成
        //2. 由于LazyLoading的原因，某些外键属性需要延迟到外部由客户决定何时加载
        //    这种情况下同样不能过早释放DBContext
        private bool shouldDisposeDbContext;

        public BusinessModelBase()
        {
            this.shouldDisposeDbContext = true;
        }

        public BusinessModelBase(T db)
        {
            this.db = db;
            if(this.db!=null)
                this.shouldDisposeDbContext = false;
        }
    }
}