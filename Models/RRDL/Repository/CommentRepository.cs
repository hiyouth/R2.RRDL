using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace R2.RRDL.Models.Repository
{
    public class CommentRepository : RepositoryBase<RRDLEntities, Comment>
    {
        public CommentRepository(RRDLEntities db):base(db)
        {

        }

        public CommentRepository(): base()
        {

        }

        public Comment FindByID(int id)
        {
            //Comment comment = (from c in db.Comments
            //                 where c.Id == id
            //                 select c).FirstOrDefault();
            //return comment;
            return null;
        }

        //public Comment FindByPid(int pid)
        //{
          
        //}

        public IQueryable<Comment> GetCommentChidren(int id)
        {
            //return from c in db.Comments
            //       where c.Pid == id
            //       select c;
            return null;
        }
    }
}