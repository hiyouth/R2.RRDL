using R2.RRDL.Models;
using R2.RRDL.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using R2.Helper.Time;
using R2.Helper.Linq;
using System.Collections;
using System.Linq.Expressions;

namespace R2.RRDL.BusinessModel
{
    /// <summary>
    /// 提供文章管理服务
    /// </summary>
    public class AriticleService:BusinessModelBase<RRDLEntities>
    {
        public AriticleService(RRDLEntities db):base(db)
        {

        }
        public AriticleService()
        {

        }
        public Ariticle FindById(string ariticleId)
        {
            AriticleRepository ariticleRepository = new AriticleRepository(this.db);
            Ariticle ariticle=ariticleRepository.FindById(ariticleId);
            ariticleRepository.DisposeIfShould();
            return ariticle;
        }

        /// <summary>
        /// 新增一篇文章，此文章在初次提交时处于未审核状态
        /// </summary>
        /// <param name="ariticle">新增的文章对象</param>
        /// <param name="treeNode">文章所属目录结点</param>
        /// <returns></returns>
        public void NewAriticle(Ariticle ariticle,List<int> visiblityGroupIdList,string userID,
            TreeNode treeNode)
        {
            if (this.ValidateNewAriticle(ariticle, userID, treeNode))
            {
                ariticle.Id = DateTimeHelper.ConvertToIDString(DateTime.Now);
                ariticle.UserId = userID;
                ariticle.Createtime = DateTime.Now;
                ariticle.Approve = new AriticleApprove();
                treeNode.Ariticle = ariticle;

                //一些列操作需要 使用同一个db 以寻求事务的支持
                RRDLEntities tempDb;

                //是否是用户传入的dbcontext，如果是，这说明用户需要自己控制dbcontext
                // 如果userdb为true则由用户来操作dbcontext的dispose和savechangge
                bool userDb = false;
                if (this.db == null)
                {
                    tempDb = new RRDLEntities();
                }
                else
                {
                    tempDb = this.db;
                    userDb = true;
                }
                Tree tree = new Tree(db);
                tree.AddTreeNode(treeNode);
                this.SetAriticleVisiblity(ariticle.Id, visiblityGroupIdList, db);
                if (!userDb)
                {
                    tempDb.SaveChanges();
                    tempDb.Dispose();
                }
            }
        }

        /// <summary>
        /// 获取指定状态的Ariticle对象总数
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        public int GetAriticleCount(EnumAriticleApproveStatus status)
        {
            using (AriticleRepository ariticleRepository = new AriticleRepository())
            {
                return ariticleRepository.FindAll().Count(a => a.Approve.ApproveStatus == status);
            }
        }

        /// <summary>
        /// 获取一个用户所有状态的文章
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public int GetAriticleCount(string userId)
        {
            Expression<Func<Ariticle, bool>> condtion = a => a.UserId == userId;
            return this.GetAriticleCount(condtion);
        }

        public int GetApprovedAriticleCount(string userId)
        {
            Expression<Func<Ariticle, bool>> condtion = a => a.UserId == userId && a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved;
            return this.GetAriticleCount(condtion);
        }
        /// <summary>
        /// 计算满足条件的Ariticle总数
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        public int GetAriticleCount(Expression<Func<Ariticle, bool>> condition)
        {
            using (AriticleRepository ariticleRepository = new AriticleRepository())
            {
               return ariticleRepository.FindAll().Count(condition);
            }
        }

        public void DropAriticle(string ariticleId)
        {
            using (AriticleRepository articleRepository = new AriticleRepository())
            {
                
            }
        }

        private void SetAriticleVisiblity(string ariticleId,
            List<int> invisiblityGroupId,RRDLEntities db=null)
        {
            List<AriticleVisibility> ariticleVisList = new List<AriticleVisibility>();
            AriticleVisibilityRepository visibilityRepository = new AriticleVisibilityRepository(db);
            foreach (var item in invisiblityGroupId)
            {
                AriticleVisibility ariticleInvis = new AriticleVisibility();
                ariticleInvis.AriticleId = ariticleId;
                ariticleInvis.UserGroupId = item;
                ariticleVisList.Add(ariticleInvis);
            }
            visibilityRepository.AddRange(ariticleVisList);
            if(db==null)
                visibilityRepository.DisposeIfShould();
        }

        /// <summary>
        /// 某文章对某用户是否可见
        /// </summary>
        /// <param name="ariticleId"></param>
        /// <param name="userId">userId用户的编号，null表示为游客</param>
        /// <returns>true可见，false不可见</returns>
        public bool GetAriticleVisibilityByUser(string ariticleId, string userId)
        {
            int groupId;
            using (UserRepository userRepository = new UserRepository())
            {
                if (userId == null)
                {
                    //user为null，表示为游客
                    groupId = 1;
                }
                else
                {
                    User user = userRepository.FindByID(userId);
                    userRepository.Db.Entry(user).Reference("ContentGroup").Load();
                    if (user.ContentGroup == null)
                    {
                        //user 存在但ContentGroup为null，表示
                        // 用于已注册但可能还未通过审核，此时都将被视为游客
                        groupId = 1;
                    }
                    else
                    {
                        //非游客会有一个分组Id
                        groupId = user.ContentGroup.Id;
                    }
                }
            }
            using (AriticleVisibilityRepository invisReposi = new AriticleVisibilityRepository())
            {
                return invisReposi.IsAriticleVisiableByUserGroup(ariticleId, groupId);
            }
        }

        public List<AriticleVisibility> GetAriticleVisibility(string ariticleId)
        {
            AriticleVisibilityRepository visibilityRepository = new AriticleVisibilityRepository(db);
            return visibilityRepository.FindByAriticle(ariticleId).ToList();
        }

        public List<Ariticle> FindAriticlesByApproveStatus(EnumAriticleApproveStatus status,
            int numOnePage, int pageIndex, RRDLEntities db = null)
        {
            Expression<Func<Ariticle, bool>> condition = a => (a.Approve.ApproveStatus == status);
            return this.FindAriticles(condition, numOnePage, pageIndex, db);
        }


        /// <summary>
        /// <summary>
        ///  以分页形式获取某用户分组下的所有文章
        /// </summary>
        /// <param name="groupId">分组编号不应当小于或者等于0</param>
        /// <param name="pageIndex">页序号</param>
        /// <param name="numOnePage">每页条数</param>
        /// <returns></returns>
        public List<Ariticle> FindAriticlesByGroup(int groupId, int numOnePage, int pageIndex, 
            RRDLEntities db = null)
        {
                Expression<Func<Ariticle, bool>> condition = a => (a.User.ContentGroupId == groupId);
                return this.FindAriticles(condition,numOnePage, pageIndex, db);
        }

        public List<Ariticle> FindAriticles(Expression<Func<Ariticle, bool>> condition,
           int numOnePage, int pageIndex, RRDLEntities db = null)
        {
            if (numOnePage <= 0)
                throw new Exception("numOnePage参数有误");
            if (pageIndex < 0)
                throw new Exception("pageIndex参数有误");

            IQueryable<Ariticle> ariticles;
            List<Ariticle> ariticleList;
            AriticleRepository ariticleRepository = new AriticleRepository(db);
            ariticles = ariticleRepository.FindAll();
            if (condition != null)
            {
                ariticles = ariticles.Where(condition);
            }
            //ariticles = ariticles.OrderBy(a => a.Createtime);
            ariticles = ariticles.OrderByDescending(a => a.Approve.NewestApproveTime);
            ariticleList = LinqEntityHelper.GetEntitySetByPage<Ariticle>(ariticles,
                     numOnePage, pageIndex).ToList<Ariticle>();
            if (db == null)
                ariticleRepository.DisposeIfShould();
            return ariticleList;
        }


        public List<Ariticle> FindAriticlesManage(Expression<Func<Ariticle, bool>> condition,
           int numOnePage, int pageIndex, RRDLEntities db = null)
        {
            if (numOnePage <= 0)
                throw new Exception("numOnePage参数有误");
            if (pageIndex < 0)
                throw new Exception("pageIndex参数有误");

            IQueryable<Ariticle> ariticles;
            List<Ariticle> ariticleList;
            AriticleRepository ariticleRepository = new AriticleRepository(db);
            ariticles = ariticleRepository.FindAll();
            if (condition != null)
            {
                ariticles = ariticles.Where(condition);
            }
            //ariticles = ariticles.OrderBy(a => a.Createtime);
            ariticles = ariticles.OrderByDescending(a => a.Approve.NewestApproveTime);
            ariticleList = LinqEntityHelper.GetEntitySetByPage<Ariticle>(ariticles,
                     numOnePage, pageIndex).ToList<Ariticle>();
            if (db == null)
                ariticleRepository.DisposeIfShould();
            return ariticleList;
        }


        /// <summary>
        /// 检索已通过审核的文章
        /// </summary>
        /// <param name="keyWord"></param>
        /// <param name="numOnePage"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        public List<Ariticle> SearchAriticles(string keyWord, int numOnePage, int pageIndex)
        {
            Expression<Func<Ariticle, bool>> condition = a => a.User.NickName.Contains(keyWord) ||
                                          a.Tags.Any(t => t.Title.Contains(keyWord)) ||
                                          a.Title.Contains(keyWord);

            condition.And<Ariticle>(a=>a.Approve.ApproveStatus==EnumAriticleApproveStatus.Approved);
            return this.FindAriticles(condition,
                numOnePage, pageIndex,this.db);
        }


        public List<Ariticle> FindAriticlesByUser(string userId,  int numOnePage,int pageIndex,
            RRDLEntities db=null)
        {
            return this.FindAriticles(a=>a.UserId==userId, numOnePage, pageIndex,db);
        }

        /// <summary>
        /// 更新文章及文章可见性
        /// </summary>
        /// <param name="ariticle"></param>
        /// <param name="visibilityGroupId"></param>
        /// <param name="ifNullRepresentAllCanSeen">如果visiblityGroupId为null表示的是
        /// 将文章设为全部可见，则此参数必须手动设置为true，否则会出现异常</param>
        public void UpdateAriticle(Ariticle ariticle,List<int> visibilityGroupId,
            bool ifNullRepresentAllCanSeen=false)
        {
            if (visibilityGroupId == null && ifNullRepresentAllCanSeen == false)
            {
                throw new Exception("参数有误");
            }
            AriticleRepository ariticleRepository = new AriticleRepository(db);
            ariticleRepository.Update(ariticle);
            AriticleVisibilityRepository repoistory = new AriticleVisibilityRepository(db);
            IQueryable<AriticleVisibility> list = repoistory.FindByAriticle(ariticle.Id);
            List<AriticleVisibility> list1 = list.ToList();
            foreach (var item in list1)
            {
                db.AriticleVisibilitys.Remove(item);
            }
            this.SetAriticleVisiblity(ariticle.Id, visibilityGroupId, db);
        }

        /// <summary>
        /// 初始化新增文章的审核状态
        /// </summary>
        /// <param name="ariticle"></param>
        private void SpecifyNewAriticleApproveStatus(Ariticle ariticle)
        {
            AriticleApprove approve = new AriticleApprove();
            approve.Ariticle.Id = ariticle.Id;
            using (AriticleApproveRepository repository = new AriticleApproveRepository())
            {
                repository.Add(approve);
            }
        }

        /// <summary>
        /// 验证新增文章对象
        /// </summary>
        /// <param name="ariticle"></param>
        /// <param name="userID"></param>
        /// <param name="treeNode"></param>
        /// <returns></returns>
        private bool ValidateNewAriticle(Ariticle ariticle, string userID, TreeNode treeNode)
        {

            if (ariticle == null)
                throw new Exception("Ariticle对象不允许为Null");
            if (String.IsNullOrEmpty(userID))
                throw new Exception("userID不允许为Null");
            if (String.IsNullOrEmpty(ariticle.Title))
                throw new Exception("Ariticle对象Title属性不允许为Null");
            if (String.IsNullOrEmpty(ariticle.UGC))
                throw new Exception("Ariticle对象的UGC属性不允许为Null");

            UserRepository userRepository = new UserRepository();
            User user = userRepository.FindByID(userID);
            if (user == null)
                throw new Exception("所指定的用户不存在，userId传入有误");
            return true;
        }

        /*
            All the below is Created by ZHAOs 2013年12月5日13:40:07
         */
        //知识审核
        public List<Ariticle> KnowledgeAuditSearchAriticles(string keyWord, int numOnePage, int pageIndex)
        {
            Expression<Func<Ariticle, bool>> condition = a => (a.User.NickName.Contains(keyWord) ||
                                          a.Tags.Any(t => t.Title.Contains(keyWord)) ||
                                          a.Title.Contains(keyWord))&&(a.Approve.ApproveStatus==EnumAriticleApproveStatus.UnApproved);
            return this.FindAriticles(condition,
                numOnePage, pageIndex, this.db);
        }
        public int KnowledgeAuditSearchAriticlesCount(string keyWord) {
            Expression<Func<Ariticle, bool>> condition = a => (a.User.NickName.Contains(keyWord) ||
                                          a.Tags.Any(t => t.Title.Contains(keyWord)) ||
                                          a.Title.Contains(keyWord)) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.UnApproved);
            return (this.FindAriticles(condition,1000, 1, this.db)).Count;
        }

        //知识管理检索
        public List<Ariticle> KnowledgeManageSearchAriticles(string keyWord, int numOnePage, int pageIndex)
        {
            Expression<Func<Ariticle, bool>> condition = a => a.User.NickName.Contains(keyWord) ||
                                          a.Tags.Any(t => t.Title.Contains(keyWord)) ||
                                          a.Title.Contains(keyWord);
            condition.And<Ariticle>(a => a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved || a.Approve.ApproveStatus == EnumAriticleApproveStatus.FailedApprove);
            return this.FindAriticles(condition,
                numOnePage, pageIndex, this.db);
        }
        public int KnowledgeManageSearchAriticlesCount(string keyWord) {
            Expression<Func<Ariticle, bool>> condition = a => a.User.NickName.Contains(keyWord) ||
                                          a.Tags.Any(t => t.Title.Contains(keyWord)) ||
                                          a.Title.Contains(keyWord);
            condition.And<Ariticle>(a => a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved || a.Approve.ApproveStatus == EnumAriticleApproveStatus.FailedApprove);
            return (this.FindAriticles(condition,1000, 1, this.db)).Count;
        }

        public List<Ariticle> KnowledgeManageSelectSearchAriticles(string keyWord, int status, int numOnePage, int pageIndex, RRDLEntities db = null)
         {
             Expression<Func<Ariticle, bool>> condition;
             switch (status)
             {
                 case 1:
                     condition = a => (a.User.NickName.Contains(keyWord) ||
                                                              a.Tags.Any(t => t.Title.Contains(keyWord)) ||
                                                              a.Title.Contains(keyWord)) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved);
                     break;
                 case 4:
                     condition = a => (a.User.NickName.Contains(keyWord) ||
                                                              a.Tags.Any(t => t.Title.Contains(keyWord)) ||
                                                              a.Title.Contains(keyWord)) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.FailedApprove);
                     break;
                 default:
                     condition = a => (a.User.NickName.Contains(keyWord) ||
                                                              a.Tags.Any(t => t.Title.Contains(keyWord)) ||
                                                              a.Title.Contains(keyWord)) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved || a.Approve.ApproveStatus==EnumAriticleApproveStatus.FailedApprove);
                     break;
             }
             return this.FindAriticles(condition,numOnePage, pageIndex, this.db);
         }
        public int KnowledgeManageSelectSearchAriticlesCount(string keyWord, int status, RRDLEntities db = null)
        {
            Expression<Func<Ariticle, bool>> condition;
            switch (status)
            {
                case 1:
                    condition = a => (a.User.NickName.Contains(keyWord) ||
                                                             a.Tags.Any(t => t.Title.Contains(keyWord)) ||
                                                             a.Title.Contains(keyWord)) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved);
                    break;
                case 4:
                    condition = a => (a.User.NickName.Contains(keyWord) ||
                                                             a.Tags.Any(t => t.Title.Contains(keyWord)) ||
                                                             a.Title.Contains(keyWord)) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.FailedApprove);
                    break;
                default:
                    condition = a => (a.User.NickName.Contains(keyWord) ||
                                                             a.Tags.Any(t => t.Title.Contains(keyWord)) ||
                                                             a.Title.Contains(keyWord)) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved || a.Approve.ApproveStatus == EnumAriticleApproveStatus.FailedApprove);
                    break;
            }
            return (this.FindAriticles(condition, 1000, 1, this.db)).Count;
        }




        //下面是个人中心的知识检索
        public List<Ariticle> PCSearchAriticles(string userId, string keyWord, int numOnePage, int pageIndex, RRDLEntities db = null)
         {
             //知识标题  知识标签
             Expression<Func<Ariticle, bool>> condition = a => (a.Tags.Any(t => t.Title.Contains(keyWord)) 
                                                        || a.Title.Contains(keyWord))&&(a.UserId==userId);
             return this.FindAriticles(condition,
                 numOnePage, pageIndex, this.db);
         }
        public int PCSearchAriticlesCount(string userId, string keyWord, RRDLEntities db = null)
        {
            Expression<Func<Ariticle, bool>> condition = a => (a.Tags.Any(t => t.Title.Contains(keyWord))
                                                      || a.Title.Contains(keyWord)) && (a.UserId == userId);
            return (this.FindAriticles(condition,1000, 1, this.db)).Count;
        }



        public List<Ariticle> PCSelectSearchAriticles(string userId, string keyWord, int status, int numOnePage, int pageIndex, RRDLEntities db = null)
         {
             Expression<Func<Ariticle, bool>> condition;
             switch (status) { 
                 case 1:
                      condition = a => (a.Tags.Any(t => t.Title.Contains(keyWord)) || a.Title.Contains(keyWord))
                                                                && (a.UserId == userId) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved);
                     break;
                 case 2:
                      condition = a => (a.Tags.Any(t => t.Title.Contains(keyWord)) || a.Title.Contains(keyWord))
                                                                && (a.UserId == userId) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.UnApproved);
                     break;
                 case 4:
                      condition = a => (a.Tags.Any(t => t.Title.Contains(keyWord)) || a.Title.Contains(keyWord))
                                                                 && (a.UserId == userId) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.FailedApprove);
                     break;
                 default:
                      condition = a => (a.Tags.Any(t => t.Title.Contains(keyWord)) || a.Title.Contains(keyWord))
                                                                && (a.UserId == userId) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved || a.Approve.ApproveStatus == EnumAriticleApproveStatus.FailedApprove || a.Approve.ApproveStatus == EnumAriticleApproveStatus.UnApproved);
                      break;
             }
            
             return this.FindAriticles(condition,
                 numOnePage, pageIndex, this.db);
         }
        public int PCSelectSearchAriticlesCount(string userId, string keyWord, int status,  RRDLEntities db = null)
        {
            Expression<Func<Ariticle, bool>> condition;
            switch (status)
            {
                case 1:
                    condition = a => (a.Tags.Any(t => t.Title.Contains(keyWord)) || a.Title.Contains(keyWord))
                                                              && (a.UserId == userId) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved);
                    break;
                case 2:
                    condition = a => (a.Tags.Any(t => t.Title.Contains(keyWord)) || a.Title.Contains(keyWord))
                                                              && (a.UserId == userId) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.UnApproved);
                    break;
                case 4:
                    condition = a => (a.Tags.Any(t => t.Title.Contains(keyWord)) || a.Title.Contains(keyWord))
                                                               && (a.UserId == userId) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.FailedApprove);
                    break;
                default:
                    condition = a => (a.Tags.Any(t => t.Title.Contains(keyWord)) || a.Title.Contains(keyWord))
                                                              && (a.UserId == userId) && (a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved || a.Approve.ApproveStatus == EnumAriticleApproveStatus.FailedApprove || a.Approve.ApproveStatus == EnumAriticleApproveStatus.UnApproved);
                    break;
            }
            return (this.FindAriticles(condition,1000, 1, this.db)).Count;
        }






	  public int SearchAllAriticlesCount(string keyWord)
        {
            Expression<Func<Ariticle, bool>> condition = a => a.User.NickName.Contains(keyWord) ||
                                          a.Tags.Any(t => t.Title.Contains(keyWord)) ||
                                          a.Title.Contains(keyWord);

            condition.And<Ariticle>(a => a.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved);
            List<Ariticle> a1 = new List<Ariticle>();
            a1 = this.FindAriticles(condition, 1000, 1, this.db);
            int n = a1.Count;
            return n;
        }
    }
}