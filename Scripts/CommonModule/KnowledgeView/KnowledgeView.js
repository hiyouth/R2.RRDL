/*
description : 知识浏览模块通用js
author : zzq
*/
$(function () {
    LeftSlide();
    AddRight();
    $("#HomeLeft_content").after('<div class="HomeLeft_white"></div>');
    $("#HomeRight").children().hide();
})

//左侧板子滑动事件
function LeftSlide() {
    $("#HomeLeft_slide").toggle(function () {
        $("#HomeLeft").animate({ "width": "400px" });
        $("#HomeLeft_slide").animate({ "left": "400px" });
        $(".HomeLeft_white").animate({ "left": "395px" });
        $(this).css("background-position", "-10px 0;");
    }, function () {
        $("#HomeLeft").animate({ "width": "280px" });
        $("#HomeLeft_slide").animate({ "left": "280px" });
        $(".HomeLeft_white").animate({ "left": "275px" });
        $(this).css("background-position", "0 0;");
    })
}

//左侧目录树
function intTree(TreeName) {
    var layerTree = new Rrteam.Control.Rrtree({
        id: "Treelayer",
        parentDivId: "layersTree",
        theme: "arrow",
        showRightClickMenu: false,
        showCheckBox: false,
        showNodeTypeImg: false,
        titleLenght: 22,
        requestUrl: baseUrl + "TreeView/GetTreeByRootId?TreeName=" + escape(TreeName),
        //requestUrl: baseUrl + "DevelopTech/test?treeNodeId=1",
        //      xmlUrl: baseUrl + url,   //"Xml/treeLayerTech.xml",     
        showFirstChildrenNodes: true,
        model: "veiw",
        imagesUrl: baseUrl + "Scripts/QuoteJsLib/images/",
        nodeClickCallBack: nodeClick,
        //nodeStateChangeCallBack: arrowClick
        //checkBoxClickCallBack: checkBoxClick
    });
}
function AddRight() {
    var right = '<div id="Article_title"></div>' +
            '<div id="Article_description">' +
                '<div id="Article_classify"></div>' +
                '<div class="Article_line"></div>' +
                '<div id="Article_time"></div>' +
            '</div>' +
            '<div id="Article_content"></div>';
    $("#HomeRight").append(right);
}
function nodeClick(data) {
    if (data.isLeaf) {
        var SelectKnowledge = data.returnTitle;
        var treeNodeId = data.nodeId;
        //var lonstr = SelectKnowledge.replace(/>/g," | ");
        //$("#Article_classify").text("分类："+lonstr);
        if (getCookie("userinf") != null) {
            var userId = getCookie("userinf").split("#")[0];
            $.post(baseUrl + "TreeView/GetAriticleByTreeNodeId", { "treeNodeId": treeNodeId, "userId": userId }, function (cbdata) {
                if (cbdata != "NotLeaf") {
                    $("#HomeRight").children().show();
                    $("#HomeRight").css("background", "none");
                    var ariticle;
                    var isShow;
                    var data = cbdata.split("ThisAriticleIsShowForThisUser");
                    if (data.length == 3) {
                        var newdate = data[0] + data[1];
                        ariticle = eval("(" + newdate + ")");
                        isShow = data[2];
                    } else {
                        ariticle = eval("(" + data[0] + ")");
                        isShow = data[1];
                    }
                    if (isShow == "false") {
                        var alert = new R2.Business.AlertWindow("您没有浏览权限！");
                        if ($("#Article_title").text() == "") {
                            $("#HomeRight").children().hide();
                            var titletext = $("head title").html();
                            switch (titletext) {
                                case "DevelopTech":
                                    $("#HomeRight").css({ "background": "url(" + baseUrl + "Content/img/newHomePageLeft.png) no-repeat 30px bottom", "width": "1014px", "height": "577px" });
                                    break;
                                case "GIS":
                                    $("#HomeRight").css("background", "url(" + baseUrl + "Content/img/img_GIS.png) no-repeat 30px bottom");
                                    break;
                                case "Service":
                                    $("#HomeRight").css("background", "url(" + baseUrl + "Content/img/img_Service.png) no-repeat 30px bottom");
                                    break;
                                case "Doc":
                                    $("#HomeRight").css("background", "url(" + baseUrl + "Content/img/img_Doc.png) no-repeat 30px bottom");
                                    break;
                                case "Resource":
                                    $("#HomeRight").css("background", "url(" + baseUrl + "Content/img/img_Resource.png) no-repeat 30px bottom");
                                    break;
                            }
                        }
                    } else {
                        $("#Article_title").html(ariticle.Title);
                        var details = getCkeditorValueToPreview(ariticle.UGC);
                        var temp = '<div class="ResultDiv">' + '<input type="hidden" value=' + ariticle.Id + ' class="AriticleId">' +
                                  '<div class="ResultDiv_comment_btn"></div>' +
                                  '<div class="ResultDiv_praise" id=' + "PraiseID" + ariticle.Id + ' title="赞">' + ariticle.PraiseCount + '</div>' +
                                  '<div class="ResultDiv_comment_content" id=' + ariticle.Id + '></div>' +
                                  '<div class="replycurrent_title">评论本条知识：<span class="replycurrent" title="评论本条知识"></span></div>' +
                                  '</div>' +
                                  '</div>';
                        $("#Article_content").html(details);
                        $(".ResultDiv").empty();
                        $("#HomeRight").append(temp);
                        loadComments(ariticle.Id);
                        var inf = "由&nbsp;&nbsp;" + ariticle.author + "&nbsp;&nbsp;在&nbsp;&nbsp;" + ariticle.Createtime + "&nbsp;&nbsp;上传";
                        $("#Article_time").html(inf);
                        var tag = "";
                        for (var i = 0 ; i < ariticle.Tags.length; i++) {
                            tag = tag + ariticle.Tags[i] + " | ";
                        }
                        tag = tag.substring(0, tag.length - 2);
                        $("#Article_classify").html("标签：" + tag);
                        SyntaxHighlighter.highlight();
                        $("html, body").animate({ scrollTop: 0 }, 0);
                    }
                }
            });
        } else {
            //alert("游客没有浏览权限");
            $.post(baseUrl + "TreeView/getAriticleByTreeNodeId", { "treeNodeId": treeNodeId, "userId": "vistor" }, function (cbdata) {
                if (cbdata != "NotLeaf") {
                    $("#HomeRight").children().show();
                    $("#HomeRight").css("background", "none");
                    var ariticle;
                    var isShow;
                    var data = cbdata.split("ThisAriticleIsShowForThisUser");
                    if (data.length == 3) {
                        var newdate = data[0] + data[1];
                        ariticle = eval("(" + newdate + ")");
                        isShow = data[2];
                    } else {
                        ariticle = eval("(" + data[0] + ")");
                        isShow = data[1];
                    }
                    if (isShow == "false") {
                        var alert = new R2.Business.AlertWindow("您没有浏览权限！");
                        if ($("#Article_title").text() == "") {
                            $("#HomeRight").children().hide();
                            var titletext = $("head title").html();
                            switch (titletext) {
                                case "DevelopTech":
                                    $("#HomeRight").css({ "background": "url(" + baseUrl + "Content/img/newHomePageLeft.png) no-repeat 30px bottom", "width": "1014px", "height": "577px" });
                                    break;
                                case "GIS":
                                    $("#HomeRight").css("background", "url(" + baseUrl + "Content/img/img_GIS.png) no-repeat 30px bottom");
                                    break;
                                case "Service":
                                    $("#HomeRight").css("background", "url(" + baseUrl + "Content/img/img_Service.png) no-repeat 30px bottom");
                                    break;
                                case "Doc":
                                    $("#HomeRight").css("background", "url(" + baseUrl + "Content/img/img_Doc.png) no-repeat 30px bottom");
                                    break;
                                case "Resource":
                                    $("#HomeRight").css("background", "url(" + baseUrl + "Content/img/img_Resource.png) no-repeat 30px bottom");
                                    break;
                            }
                        }
                    } else {
                        $("#Article_title").html(ariticle.Title);
                        var details = getCkeditorValueToPreview(ariticle.UGC);
                        var temp = '<div class="ResultDiv">' + '<input type="hidden" value=' + ariticle.Id + ' class="AriticleId">'+
                                   '<div class="ResultDiv_comment_btn"></div>' +
                                   '<div class="ResultDiv_praise" id=' + "PraiseID" + ariticle.Id + ' title="赞">' + ariticle.PraiseCount + '</div>' +
                                   '<div class="ResultDiv_comment_content" id=' + ariticle.Id + '></div>' +
                                   '<div class="replycurrent_title">评论本条知识：<span class="replycurrent" title="评论本条知识"></span></div>' +
                                   '</div>'+
                                   '</div>';
                        $("#Article_content").html(details);
                        $(".ResultDiv").empty();
                        $("#HomeRight").append(temp);
                        loadComments(ariticle.Id);
                        var inf = "由&nbsp;&nbsp;" + ariticle.author + "&nbsp;&nbsp;在&nbsp;&nbsp;" + ariticle.Createtime + "&nbsp;&nbsp;上传";
                        $("#Article_time").html(inf);
                        var tag = "";
                        for (var i = 0 ; i < ariticle.Tags.length; i++) {
                            tag = tag + ariticle.Tags[i] + " | ";
                        }
                        tag = tag.substring(0, tag.length - 2);
                        $("#Article_classify").html(tag);
                        SyntaxHighlighter.highlight();
                        $("html, body").animate({ scrollTop: 0 }, 0);
                    }
                }
            });
        }
    }
}

function loadComments(ariticleId) {
    return false;//ZHAOs 2014年4月16日16:26:56  只是为了不执行下面的内容
    $.post(baseUrl + "Comment/ReadCommentsByAriticleId", {"ariticleId": ariticleId,"id": 0, "level": 1 }, function (data) {
        var objList = eval("(" + data + ")");
        for (i = 0; i < objList.length; i++) {
            var temp = "";
            var timeCreateTime = objList[i].CommentTime.substring(5, 16);
            var times = timeCreateTime.split("T");
            timeCreateTime = times[0] + " " + times[1];
            if (objList[i].FirstNickName == null) {
                temp = '<div id="' + objList[i].Id + '"><span class="name_hightshow">' + objList[i].NickName + '</span>：' + objList[i].Content + '<span class="replycomment" title="回复" ><input class="replycomment_btn_class" type="hidden" value=' + objList[i].Id + '#' + objList[i].UserId + '><input class="replycomment_btn_AriticleId" type="hidden" value=' + objList[i].AriticleId + '></span><span class="createTime">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + timeCreateTime + '</span></div>';
            } else {
                temp = '<div id="' + objList[i].Id + '"><span class="name_hightshow">' + objList[i].NickName + '</span>回复<span class="name_hightshow">' + objList[i].FirstNickName + '</span>：' + objList[i].Content + '<span class="replycomment" title="回复" ><input class="replycomment_btn_class" type="hidden" value=' + objList[i].Id + '#' + objList[i].UserId + '><input class="replycomment_btn_AriticleId" type="hidden" value=' + objList[i].AriticleId + '></span><span class="createTime">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + timeCreateTime + '</span></div>';
            }
            $("#" + objList[i].AriticleId).append(temp);
        }
    });
}

$(".ResultDiv_comment_btn").live("click", function () {
    var index = $(".ResultDiv_comment_btn").index($(this));
    if ($(".ResultDiv_comment_content").eq(index).css("display") == "none") {
        $(".ResultDiv_comment_content").eq(index).slideDown();
    } else {
        $(".ResultDiv_comment_content").eq(index).slideUp();
    }
});

$(".ResultDiv_praise").live("click", function () {
    var ariticleId = $(".AriticleId").val();
    var userInfoStr = window.localStorage.globalUserInfoStr;
    var userId = ""
    //alert(userId);
    if (userInfoStr == undefined || userInfoStr == "" || userInfoStr == null) {
        //验证游客权限
        new R2.Business.AlertWindow("您没有赞的权限，请用户登录后再赞！！");
        return;
    } else {
        userId = userInfoStr.split("#")[0]
        $.post(baseUrl + "PraiseLinkUser/GetPraiseLinkUsers", { "userId": userId, "ariticleId": ariticleId }, function (data) {
            if (data == "True") {
                new R2.Business.AlertWindow("您已经赞过了，只能赞一次！！");
                return;
            }
            $.post(baseUrl + "Praise/IncreasePraiseCount", { "ariticleId": ariticleId }, function (count) {
                $("#PraiseID" + ariticleId).html(count);
            });
        });

    }
});

function reply(comment_ariticleId, comment_temp) {
    var userInfoStr = window.localStorage.globalUserInfoStr;
    if (userInfoStr == undefined || userInfoStr == "" || userInfoStr == null) {
        //验证游客权限
        var alert = new R2.Business.AlertWindow("您没有评论权限，请用户登录后再评论！！");
        return;
    } else {
        var message = "<div id='conver'><div id='replyMessage'><div id='replyMessage_Close' title = '关闭'>×<div></div></div>";
        $("body").append(message);
        var content = "<div style=' margin:auto; width:400px; height:200px;'>" +
            "<div id='replyMessage_Title'>请输入评论内容</div><textarea rows='6' cols='80' id='message'></textarea><div id='replyMessage_OK'>提 交</div><input id='comment_ariticleId' type='hidden' value=" + comment_ariticleId + "><input id='comment_temp' type='hidden' value=" + comment_temp + "></div>";
        $("#replyMessage").append(content);
        $("#replyMessage_Close").live("click", function () {
            $("#conver").remove();
            $("#replyMessage_Close").die("click");
            $("#message").die("click");
            $("#replyMessage_OK").die("click");
        });
    }
}
$("#message").live("click", function () {
    $("#message_Error").remove();
});
$(".replycurrent").live("click", function () {
    var ariticleId = $(".AriticleId").val();
    reply(ariticleId, null);
});
$("#replyMessage_OK").live("click", function () {
    return false;//ZHAOs 2014年4月16日16:26:02  只是为了不执行下面内容
   // var index_comment = $("#index_comment").val();
    var userInfoStr = window.localStorage.globalUserInfoStr;
    var userId = userInfoStr.split("#")[0];
    var ariticleId = $("#comment_ariticleId").val();
    var content = $("#message").val();
    var comment_temp = $("#comment_temp").val();
    if (!$("#message").val() == "") {
        $.post(baseUrl + "Comment/AddComment", { "content": content, "userId": userId, "ariticleId": ariticleId, "comment_temp": comment_temp }, function (data) {
            var objList = eval("(" + data + ")");
            var temp = "";
            var timeCreateTime = objList.CommentTime.substring(5, 16);
            var times = timeCreateTime.split("T");
            timeCreateTime = times[0] +" "+ times[1];
            if (objList.FirstNickName == null) {
                temp = '<div id="' + objList.Id + '"><span class="name_hightshow">' + objList.NickName + '</span>：' + objList.Content + '<span class="replycomment" title="回复" ><input class="replycomment_btn_class" type="hidden" value=' + objList.Id + '#' + objList.UserId + '><input class="replycomment_btn_AriticleId" type="hidden" value=' + objList.AriticleId + '></span><span class="createTime">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + timeCreateTime + '</span></div>';
                $(".ResultDiv_comment_content").append(temp);
            } else {
                temp = '<div id="' + objList.Id + '"><span class="name_hightshow">' + objList.NickName + '</span>回复<span class="name_hightshow">' + objList.FirstNickName + '</span>：' + objList.Content + '<span class="replycomment" title="回复" ><input class="replycomment_btn_class" type="hidden" value=' + objList.Id + '#' + objList.UserId + '><input class="replycomment_btn_AriticleId" type="hidden" value=' + objList.AriticleId + '></span><span class="createTime">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + timeCreateTime + '</span></div>';
                $("#" + objList.Pid).after(temp);
            }
        });
        $("#" + ariticleId).slideDown();
        $("#conver").remove();
        $("#replyMessage_Close").die("click");
        $("#message").die("click");
    } else {
        $("#message_Error").remove();
        $("#replyMessage_Title").after("<font id='message_Error'>评论内容不能为空！</font>");
    }
});

$(".replycomment").live("click", function () {
    var index = $(".replycomment").index($(this));
    var ariticleId = $(".replycomment_btn_AriticleId").eq(index).val();
    var comment_temp = $(".replycomment_btn_class").eq(index).val();
    reply(ariticleId, comment_temp);
});

//点击树节点 变换知识
//function Knowledge() {
//    $(".colorClass_2").live("click", function () {
//        AddRight();
//        var Kindex = ($(".colorClass_2").index(this));
//        $("#Article_title").text(knowledge[Kindex].title);
//        //$("#Article_classify").text(knowledge[Kindex].bigtype + "&rarr;" + knowledge[Kindex].small);
//        $("#Article_time").text("上传者 " + knowledge[Kindex].author + " 在 " + knowledge[Kindex].createDate + " 日上传");
//        $("#Article_content").text(knowledge[Kindex].details);
//        //$("#Home_right").css("height","auto")
////        $("#Copyright").css("bottom", 0);
////        GetBodyHeight();
//    })
//}


