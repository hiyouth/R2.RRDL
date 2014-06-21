$(function () {
    loadSearchResult();
})
function loadSearchResult() {
    var keyword = localStorage.getItem("key");
    var leve = -1;
    var userId = 0;    
    var userInfoStr = window.localStorage.globalUserInfoStr;
    if (userInfoStr == undefined || userInfoStr == "" || userInfoStr == null) {
        //游客权限
        leve = -1;
        userId = null;//null
    }
    else if (userInfoStr.split('#')[3] == 3 || userInfoStr.split('#')[3] == 2) {
        //超管权限
        leve = -2;
        userId = userInfoStr.split("#")[0];
    }
    else {
        //当前用户组
       //普通用户权限
        leve = 1;
        userId = userInfoStr.split("#")[0];//1
    }
    var Searchcont =
     '<div id="SearchResult">' +
        '<div class="isHasResult">查询到以下结果</div>' +
        '<div class="SearchResult_page">' +
            '<div id="firstxx" style="cursor:pointer">第一页</div>' +
            '<div id="previousxx" style="cursor:pointer">上一页</div>' +
            '<div id="pageInfxx"></div>' +
            '<div id="nextxx" style="cursor:pointer">下一页</div>' +
            '<div id="lastxx" style="cursor:pointer">最后一页</div>' +
        '</div>' +
     '</div>';
    $("#HomeContent").append(Searchcont);

    var pageControl = new R2.Control.PageControl(baseUrl + "Search/GetArcticle?keyword=" + escape(keyword) + "&leve=" + leve + "&userId=" + userId, {
        "countPerPage": 6,
        "firstPageID": "firstxx",
        "previousPageID": "previousxx",
        "pageInfID": "pageInfxx",
        "nextPageID": "nextxx",
        "lastPageID": "lastxx",
        "callback": PageControlOnSuccess

    });

    function PageControlOnSuccess(data) {
        $(".ResultDiv").remove();
        if (data.length <= 0) {
            var content = '<div class="ResultDiv">' +
                              '<div style="font-size:20px;">没有搜到符合关键字的知识，如果需要请重新输入关键字！</div>' +
                          '</div>'
            $(".SearchResult_page").after(content);
        }
        for (var i = 0; i < data.length; i++) {
            var titleLen = data[i].Title.length;
            if (titleLen > 20) {
                var littletitle = data[i].Title.slice(0, 20) + "...";
            } else {
                var littletitle = data[i].Title;
            }
            var tagsLen = getTags(data[i].Tags).length;
            if (tagsLen > 20) {
                var littletags = getTags(data[i].Tags).slice(0, 20) + "...";
            } else {
                var littletags = getTags(data[i].Tags);
            }
            var temp = getCkeditorValueToPreview(data[i].UGC);
            if (temp.length > 300)
            {
                var content = temp.slice(0, 300);
            }
            else
            {
                var content = temp;
            }
            var content = '<div class="ResultDiv">' +
                                '<div class="ResultDiv_top">' +
                                    '<div class="ResultDiv_title" title=' + data[i].Title + '>' + littletitle + '<input type="hidden" value=' + data[i].Id + ' class="AriticleId"></div>' +
                                '</div>' +
                                '<div class="ResultDiv_author">上传者：<div class="Result_Author">' + data[i].author + '</div></div>' +
                                '<div class="ResultDiv_Createtime">上传时间：<div class="Result_Createtime">' + data[i].Createtime + '</div></div>' +
                                '<div class="ResultDiv_type" title=' + getTags(data[i].Tags) + '>分类：<div class="Result_Type">' + littletags + '</div></div>' +
                                '<div class="ResultDiv_content">' + content + '</div>' +
                                '<div class="ResultDiv_comment_btn"></div>' +
                                '<div class="ResultDiv_praise" id=' + "PraiseID" + data[i].Id + ' title="赞">' + data[i].PraiseCount + '</div>' +
                                '<div class="ResultDiv_comment_content" id=' + data[i].Id + '>' +
            '</div>' +
            '<div class="replycurrent_title">评论本条知识：<span class="replycurrent" title="评论本条知识"></span></div>' +
            '</div>';
            $(".SearchResult_page").after(content);
            SyntaxHighlighter.highlight();
        }
        loadComments();
    }
}

$(".ResultDiv_title").live("click", function () {
    var index = $(".ResultDiv_title").index($(this));
    var ariticleId = $(".AriticleId").eq(index).val();
    $.post(baseUrl + "ManageModule/GetAriticleById", { "ariticleId": ariticleId }, function (cbdata) {
        var data = cbdata.split("AriticleAndTreeNode");
        var ariticle = eval("(" + data[0] + ")");
        var tree = data[1].split("#");
        var treePath = "";
        for (var i = 0 ; i < tree.length - 2; i++) {
            treePath = treePath + tree[i] + ">";
        }
        treePath = treePath.substring(0, treePath.length - 1);
        var tag = "";
        for (var i = 0 ; i < ariticle.Tags.length; i++) {
            tag = tag + ariticle.Tags[i] + "，";
        }
        tag = tag.substring(0, tag.length - 1);
        var details = getCkeditorValueToPreview(ariticle.UGC);
        if (data[2] == "all") {
            var Preview = new R2.Business.PreView(ariticle.Title, ariticle.author, ariticle.Createtime, treePath, "全部", tag, details);
            SyntaxHighlighter.highlight();
        } else {
            var visibility = eval("(" + data[2] + ")");
            var visibilityText = "";
            for (var i = 0 ; i < visibility.length; i++) {
                visibilityText = visibilityText + visibility[i].userGroupTitle + "，";
            }
            visibilityText = visibilityText.substring(0, visibilityText.length - 1);
            visibilityText = "超级管理员，" + visibilityText;
            var Preview = new R2.Business.PreView(ariticle.Title, ariticle.author, ariticle.Createtime, treePath, visibilityText, tag, details);
            SyntaxHighlighter.highlight();
        }
    });
});
$("#KnowledgeManagePreview_Close").live("click", function () {
    $("#conver").remove();
});
function getTags(list) {
    var tag = "";
    for (var i = 0 ; i < list.length; i++) {
        tag = tag + list[i] + "，";
    }
    return tag.substring(0, tag.length - 1);
}

$(".ResultDiv_praise").live("click", function () {
    var index = $(".ResultDiv_praise").index($(this));
    var ariticleId = $(".AriticleId").eq(index).val();
    var userInfoStr = window.localStorage.globalUserInfoStr;
    var userId=""
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

$(".ResultDiv_comment_content").hide();
$(".ResultDiv_comment_btn").live("click", function () {
    var index = $(".ResultDiv_comment_btn").index($(this));
       if ($(".ResultDiv_comment_content").eq(index).css("display") =="none") {
        $(".ResultDiv_comment_content").eq(index).slideDown();
    } else{
        $(".ResultDiv_comment_content").eq(index).slideUp();
    }
});

$(".replycomment").live("click", function () {
    var index = $(".replycomment").index($(this));
    var ariticleId = $(".replycomment_btn_AriticleId").eq(index).val();
    var comment_temp = $(".replycomment_btn_class").eq(index).val();
    reply(null, ariticleId, comment_temp);
});
//$("#replyMessage_OK").die("click");

$("#replyMessage_OK").live("click", function () {
    return false;//ZHAOs 2014年4月16日16:26:56  只是为了不执行下面的内容
    var index_comment = $("#index_comment").val();
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
            timeCreateTime = times[0] + " " + times[1];
            if (objList.FirstNickName == null) {
                temp = '<div id="' + objList.Id + '"><span class="name_hightshow">' + objList.NickName + '</span>：' + objList.Content + '<span class="replycomment" title="回复" ><input class="replycomment_btn_class" type="hidden" value=' + objList.Id + '#' + objList.UserId + '><input class="replycomment_btn_AriticleId" type="hidden" value=' + objList.AriticleId + '></span><span class="createTime">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + timeCreateTime + '</span></div>';
                $(".ResultDiv_comment_content").eq(index_comment).append(temp);
            } else {
                temp = '<div id="' + objList.Id + '"><span class="name_hightshow">' + objList.NickName + '</span>回复<span class="name_hightshow">' + objList.FirstNickName + '</span>：' + objList.Content + '<span class="replycomment" title="回复" ><input class="replycomment_btn_class" type="hidden" value=' + objList.Id + '#' + objList.UserId + '><input class="replycomment_btn_AriticleId" type="hidden" value=' + objList.AriticleId + '></span><span class="createTime">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + timeCreateTime + '</span></div>';
                $("#" + objList.Pid).after(temp);
            }
        });
        $("#" + ariticleId).slideDown();
        $("#conver").remove();
        $("#replyMessage_Close").die("click");
        $("#message").die("click");
   }else{
       $("#message_Error").remove();
       $("#replyMessage_Title").after("<font id='message_Error'>评论内容不能为空！</font>");
    }
});
$("#message").live("click", function () {
    $("#message_Error").remove();
});
$(".replycurrent").live("click", function () {
    var index = $(".replycurrent").index($(this));
    var ariticleId = $(".AriticleId").eq(index).val();
    reply(index, ariticleId, null);
});

function reply(index, comment_ariticleId, comment_temp) {
    var userInfoStr = window.localStorage.globalUserInfoStr;
    if (userInfoStr == undefined || userInfoStr == "" || userInfoStr == null) {
        //验证游客权限
        var alert = new R2.Business.AlertWindow("您没有评论权限，请用户登录后再评论！！");
        return;
    } else {
        var message = "<div id='conver'><div id='replyMessage'><div id='replyMessage_Close' title = '关闭'>×<div></div></div>";
        $("body").append(message);
        var content = "<div style=' margin:auto; width:400px; height:200px;'>" +
            "<div id='replyMessage_Title'>请输入评论内容</div><textarea rows='6' cols='80' id='message'></textarea><div id='replyMessage_OK'>提 交</div><input id='index_comment' type='hidden' value=" +
              index + "><input id='comment_ariticleId' type='hidden' value=" + comment_ariticleId + "><input id='comment_temp' type='hidden' value=" + comment_temp + "></div>";
        $("#replyMessage").append(content);
        $("#replyMessage_Close").live("click", function () {
            $("#conver").remove();
            $("#replyMessage_Close").die("click");
            $("#message").die("click");
            $("#replyMessage_OK").die("click");
        });
    }
}

function loadComments() {
    return false;//ZHAOs 2014年4月16日16:26:56  只是为了不执行下面的内容
    $.post(baseUrl + "Comment/ReadAllComments", { "id": 0, "level": 1 }, function (data) {
        var objList = eval("("+data+")");
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
