using R2.Helper.Linq;
using R2.RRDL.BusinessModel.BusinessStrategy;
using R2.RRDL.BusinessModel.IBusinessStrategy;
using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.BusinessModel
{
    public class UserGroupService:BusinessModelBase<RRDLEntities>
    {
        public UserGroupService(RRDLEntities db):base(db)
        {

        }
        public UserGroupService()
        {

        }

        public UserGroup FindById(int groupId)
        {
            UserGroupRepository groupRepository = new UserGroupRepository(this.db);
            UserGroup group = groupRepository.FindById(groupId);
            return group;
        }

        public List<UserGroup> FindAll()
        {
            UserGroupRepository groupRepository = new UserGroupRepository(this.db);
            List<UserGroup> list=groupRepository.FindAll().ToList<UserGroup>();
            groupRepository.DisposeIfShould();
            return list;
        }

        public void Drop(int groupId)
        {
            UserGroupRepository repository = new UserGroupRepository(this.db);
            UserGroup userGroup = repository.FindById(groupId);
            if (userGroup != null)
            {
                IUserGroupDeleteCheck check = new UserGroupDeleteCheck();
                bool canDelete = check.CanBeDeleted(userGroup);
                if (canDelete)
                    repository.Drop(userGroup);
            }
            repository.DisposeIfShould();
        }

        public void Add(UserGroup group)
        {
            UserGroupRepository groupRepository = new UserGroupRepository(this.db);
             group.CreateTime = DateTime.Now;
             groupRepository.Add(group);
             groupRepository.DisposeIfShould();
        }

        public void Update(UserGroup group)
        {
            //if (group.Id == null || group.Id < 1)
            if ( group.Id < 1)
                throw new Exception("不存在这样的UserGroup");
            UserGroupRepository groupRepository = new UserGroupRepository(this.db);
            groupRepository.Update(group);
            groupRepository.DisposeIfShould();
        }
    }
}