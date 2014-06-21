using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using R2.RRDL.Models.RRDL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.BusinessModel.RRDL
{
    public class ContactPersonService : BusinessModelBase<RRDLEntities>
    {
        #region 字段
        ContactPersonRepository contactPersonRepository = null; 
        #endregion
        #region 构造函数
        public ContactPersonService(RRDLEntities db):base(db)
        {
            contactPersonRepository = new ContactPersonRepository(this.db);
        }
        public ContactPersonService()
        {
            contactPersonRepository = new ContactPersonRepository(this.db);
        } 
        #endregion
        #region 方法
        /// <summary>
        /// 通过主键查找实体
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ContactPerson FindById(string id)
        {
            var contactPerson = contactPersonRepository.Find(id);
            Dispose();
            return contactPerson;

        }
        /// <summary>
        /// 返回全部
        /// </summary>
        /// <returns></returns>
        public List<ContactPerson> FindAll()
        {
            var contactPersonList = contactPersonRepository.FindAll().ToList();
            Dispose();
            return contactPersonList;
        }
        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        public void Add(ContactPerson model)
        {
            contactPersonRepository.Add(model);
            Dispose();
        }

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="ContactPerson"></param>
        public void Update(ContactPerson contactPerson)
        {
            contactPersonRepository.Update(contactPerson);
            Dispose();
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="Id"></param>
        public void Drop(string id)
        {
            ContactPerson model = new ContactPerson { ID=id};
            contactPersonRepository.Drop(model);
            Dispose();

        }
        /// <summary>
        /// 批量添加
        /// </summary>
        /// <param name="entitys"></param>
        public void AddRange(List<ContactPerson> entitys)
        {
            contactPersonRepository.AddRange(entitys);
            Dispose();
        }
        /// <summary>
        /// 关闭数据库连接
        /// </summary>
        private void Dispose()
        {
            contactPersonRepository.DisposeIfShould();
        }
        #endregion
    }
}