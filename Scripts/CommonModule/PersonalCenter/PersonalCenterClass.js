///*
//*描述：个人中心里用到的一些功能模块
//*如  翻页功能部分、加载知识部分、检测密码部分
//*create by ZHAOs  2013年10月14日19:57:18
//*/
///*******************************************************************************
//*Class: R2.Business.CheckPassword
//*判断各种中心里更改密码时输入的是否符合要求
//******************************************************************************/
//R2.Business.CheckPassword = OpenLayers.Class({ 
//    initialize: function (sth1, option) {
//        OpenLayers.Util.extend(this, option);
//    },
//    //判断是否满足密码格式 （6~12位，字母数字特殊符号不含空格）
//    isAPassword: function (password) {
//        var pswd = password;
//        if (!((pswd.length >= 6) && (pswd.length <= 12))) {
//            return false; //长度不对  返回FALSE
//        }
//        if (pswd.indexOf(" ") != -1) {
//            return false; //有空格，返回FALSE
//        }
//        return true;
//    },
//    //判断两个新密码是否一致
//    ifNewPasswordSame: function (newPassword1, newPassword2) {
//        if (newPassword1 == newPassword2) {
//            return true;
//        }
//        else {
//            return false;
//        }
//    },
//    CLASS_NAME: "R2.Business.CheckPassword"
//});






///*
//    关于每一条知识的控制的类的定义
//    具体比如  点击标题会怎样  点击系统通知图标会怎样  点击修改按钮会怎样  点击删除按钮会怎样
//*/
//R2.Business.knowledgeControl = OpenLayers.Class({
//    title: "",
//    author: "",
//    checker: "",
//    createDate: "",
//    checkDate: "",
//    lastModifyDate: "",
//    details: "",
//    initialize: function (sth1, option) {
//        OpenLayers.Util.extend(this, option);
//    },
//    getKnowledgeId: function (obj) {
//        //alert(obj[0]);
//    },
//    title_click: function (id) {
//        $.post(baseUrl + "PersonalCenter/GetKnowledgeDetails", { "key": id }, function (data) {
//            var obj = eval("(" + data + ")");
//            var board = "<div id='personalCenterConver'></div>" +
//                        "<div id='personalCenterPreview'>" +
//                            "<font style=' font-size:23px; position:relative;top:20px;left:120px; color:#017586;'>知识预览</font>" +
//                            "<div style=' margin-top:30px;'>" +
//                            "<div id='personalCenterPreview_Title' class='ckeditorPreview_Show'>标题：</div>" +
//                            "<div id='personalCenterPreview_Classification' class='ckeditorPreview_Show'>分类：</div>" +
//                            "<div id='personalCenterPreview_Open' class='ckeditorPreview_Show'>不可见：</div>" +
//                            "<div id='personalCenterPreview_Tag' class='ckeditorPreview_Show'>标签：</div>" +
//                            "<div style=' width:70%; height:1px; margin-left:150px; background-color:#B5B5B5; margin-top:20px;'></div>" +
//                            "<div id='personalCenterPreview_Content' class='ckeditorPreview_Show'></div>" +
//                            "<div id='personalCenterPreview_Close' title='关闭'>X</div>" +
//                            "</div>" +
//                        "</div>";
//            $("#Home").append(board);
//            $("#personalCenterPreview").fadeIn(300);
//            $("#personalCenterConver").fadeIn(300);
//            $("#personalCenterPreview_Title")[0].innerHTML += obj.title;
//            $("#personalCenterPreview_Classification")[0].innerHTML += obj.title;
//            $("#personalCenterPreview_Open")[0].innerHTML += obj.open;
//            $("#personalCenterPreview_Tag")[0].innerHTML += obj.tag;
//            $("#personalCenterPreview_Content")[0].innerHTML += obj.details;
//            // $("#personalCenterConver").css("position", "fixed");
//            $("#personalCenterPreview_Close").click(function () {
//                $("#personalCenterConver,#personalCenterPreview").remove();
//            });
//        });
//    },
//    message_click: function (id) {
//        var pageInf = $("#pageInfo").html();
//        var tag = pageInf.indexOf("/");
//        var currentPage = pageInf.substring(0, tag);
//        id = id - (currentPage - 1) * 5;
//        alert(id);
//        if ($(".id:eq(" + id + ")").parent().css("height") == "20px") {
//            $.post(baseUrl + "PersonalCenter/SystemMessage", { "key": id }, function (data) {
//                $(".id:eq(" + id + ")").parent().animate({ "height": "60px" }, "normal", function () {
//                    $(".id:eq(" + id + ")").parent().css("height", "60px");
//                    $(".id:eq(" + id + ")").after("<span style='display:none;'><br>" + data + "<br/></span>");
//                    $(".id:eq(" + id + ")").parent().children("span").css({ "color": "#006434", "font-size": "12px" });
//                    $(".id:eq(" + id + ")").parent().children("span").fadeIn();
//                });
//            });
//        } else {
//            $(".id:eq(" + id + ")").parent().animate({ "height": "20px" }, "slow", function () {
//                $(".id:eq(" + id + ")").parent().children("span").fadeOut().remove();
//                $(".id:eq(" + id + ")").parent().css("height", "20px");
//            });
//        }
//    },
//    modify_click: function (id) {
//        var modifyStr =
//             "<div id='modifyCenter'>" +
//            "<div id='modifyLeft'>" +
//                "<div class='Left_Plate'>&nbsp;&nbsp;&nbsp;标&nbsp;&nbsp;题：<input id='modifyLeft_Tilte_Input'/>" +
//                "</div>" +
//                "<div class='Left_Plate'>&nbsp;&nbsp;&nbsp;分&nbsp;&nbsp;类：<div id='modifyLeft_Classification_Select'></div>" +
//                "</div>"
//        "<div class='Left_Plate'>" +
//                    "<input id='modifyLeft_Classification_Select_Leaf'/>" +
//                "</div>" +
//                "<div class='Left_Plate'>不&nbsp;可&nbsp;见：<div id='modifyLeft_Open_Text'></div>"
//        "</div>" +
//                "<div id='modifyLeft_Open_Select'>" +
//                "</div>" +
//                "<div class='Left_Plate' style=' margin-top:50px;'>&nbsp;&nbsp;&nbsp;标&nbsp;&nbsp;签：<input id='modifyLeft_Tag_Input'/><div id='modifyTag_Add'></div>" +
//                "</div>" +
//                "<div class='Left_Plate' style=' margin-top:10px;'>" +
//                    "<div id='modifyLeft_Tag_Show'></div>" +
//                "</div>" +
//                "<div class='Left_Plate' style=' margin-top:100px;'>" +
//                    "<div id='modifypreview' class='Left_Btn'></div>" +
//                    "<div id='modifyupload' class='Left_Btn'></div>" +
//                "</div>" +
//            "</div>" +
//            "<div id='modifyRight'>" +
//               "<textarea rows='30' cols='50' name='editor01' id='modifyckeditor'>dsjfasdklfjaskldfjaskdl</textarea>" +
//            "</div>" +
//        "</div>";
//        $("#Home").append(modifyStr);
//        for (var i = 0; i < myData.length; i++) {
//            $("#modifyLeft_Classification_Select").append("<div class='modifytitle modifytitle" + i + "'>" + myData[i].value + "</>");
//        }
//        $(".modifytitle").click(function () {
//            alert("**");
//            $("#modifyLeft_Classification_SelectTree").remove();
//            var index = $(".modifytitle").index($(this));
//            $("#modifyLeft_Classification_Select_Leaf").after("<div id='modifyLeft_Classification_SelectTree'></div>");
//            intTreeTech();
//        });

//        /*
//        $("#modifyKnowledge").css({ "position": "absolute", "width": "100%", "height": "100%", "background-color": "#888", "display": "block", "opacity": "0.5", "font-size": "30px", "color": "red" });
//        $("#modifyKnowledge").click(function () {
//        $(this).remove();
//        });
//        */

//    },
//    CLASS_NAME: "R2.Business.knowledgeControl"
//});

//function intTreeTech() {
//    var layerTree = new Rrteam.Control.Rrtree({
//        id: "Treelayer_Select",
//        parentDivId: "Left_Classification_SelectTree",
//        theme: "arrow",              //theme包含arrow[三角形]目前只有这个，line[+号]
//        showRightClickMenu: false,   //是否右键菜单
//        showCheckBox: false,            //是否显示checkbox
//        showNodeTypeImg: false,    //是否显示图片（节点类型图片）
//        titleLenght: 10,     //显示的标题文字长度,当长度大于这个值时，用...代替
//        requestUrl: baseUrl + "TreeView/ViewingTree",         //后台地址
//        xmlUrl: baseUrl + "Xml/treeLayerTech.xml",               //xml地址
//        showFirstChildrenNodes: true,               //开始就展开一级子节点
//        model: "folder",
//        imagesUrl: baseUrl + "Scripts/QuoteJsLib/images/",
//        nodeClickCallBack: nodeClickSelect,               //节点回调
//        checkBoxClickCallBack: checkBoxClickSelect
//    });
//}
//function nodeClickSelect(data) {
//    data;
//}
//function checkBoxClickSelect() {
//}