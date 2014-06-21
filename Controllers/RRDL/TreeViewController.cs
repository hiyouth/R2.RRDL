using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Text;
//using R2DL.DllFactory;
using Newtonsoft.Json;
using R2.RRDL.Models;
using R2.RRDL.BusinessModel;
using R2.RRDL.ViewModel;
using R2.RRDL.Models.Repository;
namespace R2TeamDeveloperLibrary.Controllers
{
    public class TreeViewController : Controller
    {
        //
        // GET: /TreeView/
        public string returnStr = "";
        public static int q = 0;
        public ActionResult Index()
        {
            return View();
        }

        //public ActionResult ViewingTree(string nodeId, string xmlUrl, string IsLoadLeaf)
        //{
        //    bool isLoadLeaf = Convert.ToBoolean(IsLoadLeaf);
        //    returnStr = GetXmlArray(nodeId, xmlUrl, isLoadLeaf);
        //    return Content(returnStr);
        //}
        //读取数据库
        public ActionResult ViewingTreeBySqlData(string nodeId, string xmlUrl, string IsLoadLeaf)
        {
            bool isLoadLeaf = Convert.ToBoolean(IsLoadLeaf);
            if (q == 1)
            {
                returnStr = "{\"NodeInfo\":[{\"NodePid\":\"1\",\"NodeId\":\"1_1\",\"NodeText\":\"Html\",\"NodeGdbp\":\"图层\",\"NodeIp\":\"文档组\",\"NodePort\":\"2013-10-11\",\"NodeHasChildren\":\"true\",\"NodeIsBottom\":\"fasle\",\"NodeState\":\"hide\"},{\"NodePid\":\"1\",\"NodeId\":\"1_2\",\"NodeText\":\"Css\",\"NodeGdbp\":\"图层\",\"NodeIp\":\"\",\"NodePort\":\"2013-10-11\",\"NodeHasChildren\":\"true\",\"NodeIsBottom\":\"fasle\",\"NodeState\":\"hide\"},{\"NodePid\":\"1\",\"NodeId\":\"1_3\",\"NodeText\":\"Openlayers\",\"NodeGdbp\":\"图层\",\"NodeIp\":\"\",\"NodePort\":\"2013-10-11\",\"NodeHasChildren\":\"true\",\"NodeIsBottom\":\"false\",\"NodeState\":\"hide\"},{\"NodePid\":\"1\",\"NodeId\":\"1_4\",\"NodeText\":\"javascript\",\"NodeGdbp\":\"图层\",\"NodeIp\":\"\",\"NodePort\":\"2013-10-11\",\"NodeHasChildren\":\"true\",\"NodeIsBottom\":\"fasle\",\"NodeState\":\"hide\"}]}";
            }
            else
            {
                q = 1;
                returnStr = "{\"NodeInfo\":[{\"NodePid\":\"0\",\"NodeId\":\"1\",\"NodeText\":\"开发技术\",\"NodeGdbp\":\"图层\",\"NodeIp\":\"\",\"NodePort\":\"2013-10-11\",\"NodeHasChildren\":\"true\",\"NodeIsBottom\":\"false\",\"NodeState\":\"hide\"}]}";
            }
            return Content(returnStr);
        }

        //// NodeId: id, NodeInfo: nodeInfo, XmlUrl: temp.xmlUrl 
        public ActionResult OperateTreeNode(string modeType, string _modeType, string nodeId, string nodeInfo, string xmlUrl)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                Tree tree = new Tree();
                TreeNode treeNode = null;
                switch (modeType)
                {
                    case "rename":
                        string id = nodeId;
                        string name = nodeInfo;
                        treeNode = tree.GetTreeNodeById(Int32.Parse(id));
                        treeNode.Title = name;
                        tree.UpdateTreeNode(treeNode);
                        returnStr = "ok&" + treeNode.ParentId;
                        break;
                    case "delete":
                        returnStr = DeleteNode(_modeType, nodeId, xmlUrl);                        
                        break;
                    case "insert":
                        //List<NodeInfo> nodeList = this.GetListFromJson(nodeInfo);
                        //returnStr = this.InserNode(_modeType, nodeId, xmlUrl, nodeList);
                        //bool flag = true;
                        Tree tree2 = new Tree(db);
                        List<TreeNode> list = tree2.GetTreeNodeChild(Int32.Parse(nodeId));
                        //for (int i = 0; i < list.Count;i++ )
                        //{
                        //    if(list[i].Ariticle != null){
                        //        flag = false; 
                        //    }
                        //}
                        //if (flag)
                        //{
                            treeNode = new TreeNode(Int32.Parse(nodeId), "新建节点");
                            tree.AddTreeNode(treeNode);
                            returnStr = "ok";
                        //}
                        //else {
                        //    returnStr = "该节点下存在文章,不能添加文件夹！";
                        //}
                        break;
                }
                return Content(returnStr);
            }
        }


        //The Function Bllew is Added By ZHAOs ，2013年11月14日10:02:13，used to Delete A TreeNode in 目录树管理
        public string DeleteNode(string _modeType, string nodeId, string xmlUrl) {
            // _modeType = "deleteFolder"  ,modeId = "6" ,xmlUrl = ""  传入的参数大致形式如此
            Tree tree = new Tree();
            TreeNode treeNode = tree.GetTreeNodeById(Convert.ToInt32(nodeId));
            string returnStr = "";
            /*
            如果这个节点是叶子节点
                如果是空文件夹  --文件夹（ariticleID为空且isLeaf属性为True），为空文件夹 ===> 可删除
                如果是知识   --不能删除知识  （此时 ariticleID属性不为NULL  且 idLeaf属性为 True即是）
            如果这个节点不是叶子节点（即非空文件夹，里面可能有知识或者 为空不为空的 文件夹）（ariticleID为空且isLeaf属性为false）====> 不能删除
            PS:但是这里不显示知识，所以只可能有 叶子节点文件夹 和 非叶子节点文件夹。
             * 叶子节点文件夹内部一定没有知识，可以直接删除 ===>有知识的情况 以后版本考虑
             * 非叶子节点文件夹内容一定有文件夹或知识，不能删除。
             * 逻辑较简单。
             * 只是只能从叶子节点删起      
             * PS：如果一个父节点其下的所有子节点都被删除，则该父节点的IsLeaf属性变为True
             */
            if (treeNode.IsLeaf == true)
            {   
                //如果是根目录
                if (treeNode.ParentId == null)
                {
                    returnStr = "根目录不可删除！";
                }
                else {//若果其父节点下只有这一个子节点，则删除此子节点并把父节点isLeaf属性设为True
                    TreeNode parentNode = tree.GetTreeNodeById(Convert.ToInt32(treeNode.ParentId));
                    List<TreeNode> parentChildList = tree.GetTreeNodeChild(Convert.ToInt32(treeNode.ParentId));
                    if (parentChildList.Count == 1)
                    {
                        parentNode.IsLeaf = true;
                    }
                    tree.UpdateTreeNode(parentNode);//改变父节点isLeaf属性
                    tree.Drop(treeNode);//删除子节点
                    returnStr = "ok";
                }
                
            }
            else {
                returnStr = "该节点下存在子文件夹或知识，不能删除！";
            }
            return returnStr;
        }


        public ActionResult GetTreeByRootId(string nodeId, string treeName)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                Tree tree = new Tree(db);
                TreeNode rootNode = tree.GetRootNode(treeName);
                string result = "";
                if (nodeId != "")
                {
                    int rootId = Int32.Parse(nodeId);
                    List<TreeNode> list = tree.GetTreeNodeChild(rootId);
                    TreeViewModel tvm = new TreeViewModel();
                    List<TreeViewModel> tlist = new List<TreeViewModel>();
                    for (int i = 0; i < list.Count; i++)
                    {
                        if (list[i].Ariticle == null)
                        {
                                tvm = new TreeViewModel();
                                tvm.Deepth = list[i].Deepth;
                                tvm.Id = list[i].Id;
                                tvm.IsLeaf = false;
                                tvm.ParentId = list[i].ParentId;
                                tvm.Title = list[i].Title;
                                tlist.Add(tvm);
                        }
                        else
                        { 
                            if (list[i].Ariticle.Approve.ApproveStatus == EnumAriticleApproveStatus.Approved)
                            {
                                tvm = new TreeViewModel();
                                tvm.Deepth = list[i].Deepth;
                                tvm.Id = list[i].Id;
                                tvm.IsLeaf = list[i].IsLeaf;
                                tvm.ParentId = list[i].ParentId;
                                tvm.Title = list[i].Title;
                                tlist.Add(tvm);
                            }
                       }
                            
                    }
                    result = JsonConvert.SerializeObject(tlist);
                }
                else
                {
                    result = "[{\"Ariticle\":\"null\",\"Id\":\"" + rootNode.Id + "\",\"Title\":\"" + rootNode.Title + "\",\"Deepth\":\"" + rootNode.Deepth + "\",\"ParentId\":\"null\",\"IsLeaf\":\"" + rootNode.IsLeaf + "\"}]";
                }

                // List<TreeNode>

                return Content(result);
            }
        }

        ///上传知识获取树节点，过滤掉叶子节点
        ///
        public ActionResult GetTreeByRootIdForUploadKnowledge(string nodeId, string treeName)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                Tree tree = new Tree(db);
                TreeNode rootNode = tree.GetRootNode(treeName);
                string result = "";
                if (nodeId != "")
                {
                    int rootId = Int32.Parse(nodeId);
                    List<TreeNode> list = tree.GetTreeNodeChild(rootId);
                    TreeViewModel tvm = new TreeViewModel();
                    List<TreeViewModel> tlist = new List<TreeViewModel>();
                    for (int i = 0; i < list.Count; i++)
                    {
                        if (list[i].Ariticle == null)
                        {
                            tvm = new TreeViewModel();
                            tvm.Deepth = list[i].Deepth;
                            tvm.Id = list[i].Id;
                            tvm.IsLeaf = false;
                            tvm.ParentId = list[i].ParentId;
                            tvm.Title = list[i].Title;
                            tlist.Add(tvm);
                        }
                    }
                    result = JsonConvert.SerializeObject(tlist);
                }
                else
                {
                    result = "[{\"Ariticle\":\"null\",\"Id\":\"" + rootNode.Id + "\",\"Title\":\"" + rootNode.Title + "\",\"Deepth\":\"" + rootNode.Deepth + "\",\"ParentId\":\"null\",\"IsLeaf\":\"" + rootNode.IsLeaf + "\"}]";
                }

                // List<TreeNode>

                return Content(result);
            }
        }

        public ActionResult GetTreeByRootIdForTreeManage(string nodeId, string treeName)
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                Tree tree = new Tree(db);
                TreeNode rootNode = tree.GetRootNode(treeName);
                string result = "";
                if (nodeId != "")
                {
                    int rootId = Int32.Parse(nodeId);
                    List<TreeNode> list = tree.GetTreeNodeChild(rootId);
                    TreeViewModel tvm = new TreeViewModel();
                    List<TreeViewModel> tlist = new List<TreeViewModel>();
                    for (int i = 0; i < list.Count; i++)
                    {
                        if (list[i].Ariticle == null)
                        {
                            tvm = new TreeViewModel();
                            tvm.Deepth = list[i].Deepth;
                            tvm.Id = list[i].Id;
                            tvm.IsLeaf = false;
                            tvm.ParentId = list[i].ParentId;
                            tvm.Title = list[i].Title;
                            tlist.Add(tvm);
                        }
                    }
                    result = JsonConvert.SerializeObject(tlist);
                }
                else
                {
                    result = "[{\"Ariticle\":\"null\",\"Id\":\"" + rootNode.Id + "\",\"Title\":\"" + rootNode.Title + "\",\"Deepth\":\"" + rootNode.Deepth + "\",\"ParentId\":\"null\",\"IsLeaf\":\"" + rootNode.IsLeaf + "\"}]";
                }

                // List<TreeNode>

                return Content(result);
            }
        }

        //获取树的路径
        public string getTreePath(string treeNode) {
            Tree tree = new Tree();
            TreeNode tn = tree.GetTreeNodeById(Int32.Parse(treeNode));
            List<TreeNode> list = tree.GetTreeNodePath(tn);
            string result = "";
            for (int i = list.Count-1; i >= 0 ;i-- )
            {
                result = result + list[i].Title + "TreeSplit";
            }
            return result;
        }

        //判断选择节点是否正确
        public string isAdd(string treeNode) {
            using (RRDLEntities db = new RRDLEntities())
            {
                Tree tree = new Tree(db);
                List<TreeNode> list = tree.GetTreeNodeChild(Int32.Parse(treeNode));
                string flag = "";
                if (list.Count > 0)
                {
                    if (list[0].Ariticle != null)
                    {
                        flag = "true";
                    }
                }
                else {
                    flag = "true";
                }
                return flag;
            }
        }

        /// <summary>
        ///     通过TreeNodeId获取Ariticle
        /// </summary>
        /// <param name="_modeType"></param>
        /// <param name="_nodeId"></param>
        /// <param name="_xmlUrl"></param>
        /// <param name="_nodeInfo"></param>
        /// <returns></returns>
        public ActionResult GetAriticleByTreeNodeId(string treeNodeId,string userId) 
        {
            using (RRDLEntities db = new RRDLEntities())
            {
                Tree tree = new Tree(db);
                Ariticle ariticle = tree.GetTreeNodeById(Int32.Parse(treeNodeId)).Ariticle;
                PraiseRepository pr = new PraiseRepository();
                //如果是叶子节点，传递知识内容到前台
                if (ariticle != null)
                {
                    AriticleViewModel avm = new AriticleViewModel(ariticle);
                    UserService us = new UserService();
                    User author = us.FindById(ariticle.UserId);
                    avm.author = author.NickName;
                    string time1 = ariticle.Createtime.ToLongDateString();
                    string time2 = ariticle.Createtime.ToLongTimeString();
                    avm.Createtime = time1 + "  " + time2;
                    //avm.PraiseCount = pr.FindByAriticleID(ariticle.Id).PraiseCount;
                    avm.Id = ariticle.Id;
                    AriticleService ars = new AriticleService();
                    string isShow = "";
                        if(userId == "vistor"){
                            userId = null;
                        }
                        if (ars.GetAriticleVisibilityByUser(ariticle.Id, userId))
                        {
                            bool falg = ars.GetAriticleVisibilityByUser(ariticle.Id, userId);
                            isShow = "true";
                        }
                        else
                        {
                            bool falg = ars.GetAriticleVisibilityByUser(ariticle.Id, userId);
                            isShow = "false";
                        }
                    User user = us.FindById(userId);
                    if(user!=null && user.ContentGroupId == 2){
                        isShow = "true";
                    }
                    string result = JsonConvert.SerializeObject(avm);
                    result = result + "ThisAriticleIsShowForThisUser" + isShow;
                    return Content(result);
                }
                else
                {
                    return Content("NotLeaf");
                }
            }
        }

        //public ActionResult InsertNode(string _modeType, string _nodeId, string _xmlUrl,string _nodeInfo)
        //{
        //    //List<NodeInfo> nodeList = this.GetListFromJson(_nodeInfo);
        //    //returnStr = this.InserNode(_modeType, _nodeId, _xmlUrl, nodeList);
        //    //return Content(returnStr);
        //}

        //public ActionResult Rename(string nodeId, string xmlUrl,string newName)
        //{
        //    returnStr = RenameNode(nodeId, xmlUrl, newName);
        //    return Content(returnStr);
        //}

        //public ActionResult Delete(string _modeType, string nodeId, string xmlUrl)
        //{
        //    returnStr = this.DeleteNode(_modeType, nodeId, xmlUrl);
        //    return Content(returnStr);
        //}

        //#region 按照父结点 id 和 url 获取节点信息
        //private string GetXmlArray(string _pid, string _xmlUrl, bool isLoadLeaf)
        //{
        //    string strUrl = System.Web.HttpContext.Current.Server.MapPath(_xmlUrl);
        //    R2TeamXmlReader xmlreader = new R2TeamXmlReader(_xmlUrl,strUrl);
        //    xmlreader = xmlreader.EachXml(_pid, isLoadLeaf);
        //    StringBuilder sbxml = xmlreader.SbXmlInfo;
        //    int eCounts = xmlreader.ECounts;
        //    if (sbxml.Length == 0 || sbxml == null)
        //    {
        //        return "{\"NodeInfo\":[]}";
        //    }
        //    else
        //    {
        //        sbxml = sbxml.Replace("%", "", sbxml.Length - 1, 1);
        //        return CreateJsonByNodeInfo(sbxml, eCounts);
        //    }
        //}
        //#endregion

        //#region 根据得到的节点信息生成json
        //private string CreateJsonByNodeInfo(StringBuilder sbInfo, int eCounts)
        //{
        //    string returnJson = "";
        //    string[] strNodeNameArr = sbInfo.ToString().Split('%');
        //    string[,] strNodeAttributeArr = new string[strNodeNameArr.Length, eCounts + 2];
        //    for (int i = 0; i < strNodeNameArr.Length; i++)
        //    {
        //        for (int j = 0; j < eCounts + 2; j++)
        //        {
        //            strNodeAttributeArr[i, j] = strNodeNameArr[i].ToString().Split('#')[j];
        //        }
        //    }
        //    StringBuilder sbNodeInfo = new StringBuilder();
        //    sbNodeInfo.Append("{\"NodeInfo\":[");
        //    for (int k = 0; k < strNodeNameArr.Length; k++)
        //    {
        //        sbNodeInfo.Append("{");
        //        sbNodeInfo.Append("\"NodePid\":");
        //        sbNodeInfo.Append("\"" + strNodeAttributeArr[k, 0] + "\",");
        //        sbNodeInfo.Append("\"NodeId\":");
        //        sbNodeInfo.Append("\"" + strNodeAttributeArr[k, 1] + "\",");
        //        sbNodeInfo.Append("\"NodeText\":");
        //        sbNodeInfo.Append("\"" + strNodeAttributeArr[k, 2] + "\",");
        //        sbNodeInfo.Append("\"NodeGdbp\":");
        //        sbNodeInfo.Append("\"" + strNodeAttributeArr[k, 3] + "\",");
        //        sbNodeInfo.Append("\"NodeIp\":");
        //        sbNodeInfo.Append("\"" + strNodeAttributeArr[k, 4] + "\",");
        //        sbNodeInfo.Append("\"NodePort\":");
        //        sbNodeInfo.Append("\"" + strNodeAttributeArr[k, 5] + "\",");
        //        sbNodeInfo.Append("\"NodeHasChildren\":");
        //        sbNodeInfo.Append("\"" + strNodeAttributeArr[k, 6] + "\",");
        //        sbNodeInfo.Append("\"NodeIsBottom\":");
        //        sbNodeInfo.Append("\"" + strNodeAttributeArr[k, 7] + "\",");
        //        sbNodeInfo.Append("\"NodeState\":");
        //        sbNodeInfo.Append("\"show\"");
        //        sbNodeInfo.Append("},");
        //    }
        //    sbNodeInfo.Replace(",", "", sbNodeInfo.Length - 1, 1);
        //    sbNodeInfo.Append("]}");
        //    returnJson = sbNodeInfo.ToString();
        //    return returnJson;
        //}
        //#endregion

        //#region 按照父结点 id,生成 新的子节点
        //private string InserNode(string _modetype, string pId, string url, List<NodeInfo> nodeInfoList)
        //{
        //    string returnTxt;
        //    string strUrl = System.Web.HttpContext.Current.Server.MapPath(url);
        //    R2TeamXmlReader xr = new R2TeamXmlReader(url, strUrl);
        //    if (xr.InserNode(_modetype, pId, nodeInfoList))
        //        returnTxt = "ok";
        //    else
        //        returnTxt = "faild";
        //    return returnTxt;
        //}
        //#endregion

        //#region rename节点
        //private string RenameNode(string nodeId, string url, string newName)
        //{
        //    string returnTxt;
        //    string strUrl = System.Web.HttpContext.Current.Server.MapPath(url);
        //    R2TeamXmlReader xr = new R2TeamXmlReader(url, strUrl);
        //    if (xr.RenameNode(nodeId, newName))
        //        returnTxt = "ok";
        //    else
        //        returnTxt = "faild";
        //    return returnTxt;
        //}
        //#endregion

        //#region 删除节点
        //private string DeleteNode(string _modeType, string nodeId, string url)
        //{
        //    string returnTxt;
        //    string strUrl = System.Web.HttpContext.Current.Server.MapPath(url);
        //    R2TeamXmlReader xr = new R2TeamXmlReader(url, strUrl);
        //    if (xr.DeleteNode(_modeType, nodeId))
        //        returnTxt = "ok";
        //    else
        //        returnTxt = "faild";
        //    return returnTxt;
        //}
        //#endregion

        //#region c#解析Json
        //public List<NodeInfo> GetListFromJson(string nodeData)
        //{
        //    List<NodeInfo> nodeList = (List<NodeInfo>)JsonConvert.DeserializeObject(nodeData, typeof(List<NodeInfo>));
        //    //JavaScriptSerializer json = new JavaScriptSerializer();//实例化一个能够序列化数据的类
        //    //ToJson nodeList = json.Deserialize<ToJson>(nodeData);//将json数据转化为对象类型并赋值list
        //    return nodeList;
        //}
        //#endregion
    }
}
