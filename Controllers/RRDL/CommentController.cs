using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using R2.RRDL.Models;
using R2.RRDL.Models.Repository;

namespace R2.RRDL.Controllers
{
    public class CommentController : Controller
    {
        //
        // GET: /Comment/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddComment(string content, string userId, string ariticleId, string comment_temp)
        {
           
            CommentRepository cr = new CommentRepository();
            UserRepository ur = new UserRepository();
            string result = "";
            if (comment_temp != "null")
            {
                string[] array = comment_temp.Split('#');
                int id = Int32.Parse(array[0]);
                string firstUserId = array[1];
                Comment c = cr.FindByID(id);
                User u = ur.FindByID(userId);
                User firstUser = ur.FindByID(firstUserId);
                c.Isleaf = 1;
                cr.Update(c);
                Comment comment = new Comment();
                comment.UserId = userId;
                comment.AriticleId = ariticleId;
                comment.Content = content;
                comment.NickName = u.NickName;
                comment.FirstNickName = firstUser.NickName;
                comment.Pid = id;
                comment.Isleaf = 0;
                comment.CommentTime = DateTime.Now;
                cr.Add(comment);
                result = "";
                result = JsonConvert.SerializeObject(comment);
            }
            else {
                User u = ur.FindByID(userId);
                Comment comment = new Comment();
                comment.UserId = userId;
                comment.Content = content;
                comment.CommentTime = DateTime.Now;
                comment.AriticleId = ariticleId;
                comment.Pid = 0;
                comment.Isleaf = 0;
                comment.Level = 1;
                comment.NickName = u.NickName;
                comment.FirstNickName = null;
                cr.Add(comment);
                result = "";
                result = JsonConvert.SerializeObject(comment);
                ;
            }
            return Content(result);
        }

        public ActionResult ReadAllComments(int id, int level) {
            List<Comment> comments = new List<Comment>();
            //return ReadComments(comments, id, level);
            string result = JsonConvert.SerializeObject(ReadComments(comments, id, level));
            return Content(result);
        }

        public ActionResult ReadCommentsByAriticleId(string ariticleId, int id, int level)
        {
            List<Comment> comments = new List<Comment>();
            List<Comment> newComments = new List<Comment>();
            ReadComments(comments,id, level);
            for (int i = 0; i < comments.Count; i++) {
                if (ariticleId == comments[i].AriticleId) {
                    newComments.Add(comments[i]);
                }
            }
            string result = JsonConvert.SerializeObject(newComments);
            return Content(result);
        }

        public List<Comment> ReadComments(List<Comment> comments, int id, int level)
        {
            //List<Comment> comments = new List<Comment>();
            List<Comment> newComments = GetCommentChidren(id);
            for (int i = 0; i < newComments.Count; i++) {
                Comment comment = new Comment();
                comment = toComment(newComments[i]);
                comments.Add(comment);
                if (comment.Isleaf == 1) {
                    ReadComments(comments,comment.Id, level + 1);
                }
            }
            return comments;
            //string result = JsonConvert.SerializeObject(comments);
            //return Content(result);
        }

        public List<Comment> GetCommentChidren(int id) {
            CommentRepository cr = new CommentRepository();
            return cr.GetCommentChidren(id).ToList();
        }

        public Comment toComment(Comment c) {
            Comment comment = new Comment();
            comment.Id = c.Id;
            comment.AriticleId = c.AriticleId;
            comment.CommentTime = c.CommentTime;
            comment.Content = c.Content;
            comment.Isleaf =c.Isleaf;
            comment.UserId = c.UserId;
            comment.Pid = c.Pid;
            comment.Level = c.Level;
            comment.NickName = c.NickName;
            comment.FirstNickName = c.FirstNickName;
            return comment;
        }
 

    }
}
