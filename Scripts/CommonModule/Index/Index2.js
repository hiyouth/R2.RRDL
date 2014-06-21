$(document).ready(function () {
    $("#Copyright").css("display","none");
    $("#tabs").tabs();
    fillTables();
    $(".tabs_header li:eq(0)").trigger("click");
    loadLeftPan();
});


$.fn.tabs = function () {
    var content = this.find("div");
    var list = this.find("ul.tabs_header").find("li");
    content.hide();
    content.eq(0).show();
    list.eq(0).addClass("active");
    list.each(function (i) {
        $(this).bind({
            click: function () {
                list.removeClass("active");
                content.hide();
                content.eq(i).css("display", "");
                $(this).addClass("active");
            },
            mousemove: function () {
                $(this).addClass("hover");
            },
            mouseout: function () {
                $(this).removeClass("hover");
            }
        });
    });
}


//根据点击的选项卡填充下方相应的table
function fillTables() {
    $(".tabs_header li").click(function () {
        var index = $(this).index();
        window.sessionStorage.rankTabs = index;
        if (index == 0) {
            $(".tabs_header li:eq(0)").find("a").css("color", "black");
            $(".tabs_header li:eq(1)").find("a").css("color", "white");
            $(".tabs_header li:eq(2)").find("a").css("color", "white");
            if ($(".tabs_content:eq(0) table tr").length == 0) {
                getMemberRankList();
            }
        }
        if (index == 1) {
            $(".tabs_header li:eq(1)").find("a").css("color", "black");
            $(".tabs_header li:eq(0)").find("a").css("color", "white");
            $(".tabs_header li:eq(2)").find("a").css("color", "white");
            if ($(".tabs_content:eq(1) table tr").length == 0) {
                getTeamRankList();
            }
        }
        if (index == 2) {
            $(".tabs_header li:eq(2)").find("a").css("color", "black");
            $(".tabs_header li:eq(1)").find("a").css("color", "white");
            $(".tabs_header li:eq(0)").find("a").css("color", "white");
            if ($(".tabs_content:eq(2) table tr").length == 0) {
                getTypeRankList();
            }
        }
    });

    $(".tabs_header li").mouseenter(function () {
        var index = $(this).index();
        var selectIndex = window.sessionStorage.rankTabs;
        if (index != selectIndex) {
            $(".tabs_header li:eq(" + index + ")").find("a").css("color", "black");
        }
    });
    $(".tabs_header li").mouseleave(function () {
        var index = $(this).index();
        var selectIndex = window.sessionStorage.rankTabs;
        if (index != selectIndex) {
            $(".tabs_header li:eq(" + index + ")").find("a").css("color", "white");
        }
    });
    

}
function getMemberRankList() {
    $.post(baseUrl + "RankList/GetMemberRank", null, function (data) {
        var objList = eval("(" + data + ")");
        for (var i = 0; i < objList.length; i++) {
            var s = '<tr>' +
                   '<td class="row0"></td>' +
                   '<td class="row1"></td>' +
                   '<td class="row2"></td>' +
               '</tr>';
            $(".tabs_content:eq(0) table").append(s);
            $(".tabs_content:eq(0) tr:eq(" + i + ")").find(".row0").append("NO." + (i + 1));
            $(".tabs_content:eq(0) tr:eq(" + i + ")").find(".row1").append(objList[i].RealName);
            $(".tabs_content:eq(0) tr:eq(" + i + ")").find(".row2").append("发表了 "+objList[i].ariticleCount+" 篇文章");
        }
        /*---------添加点击行跳到对应用户发表的文章的功能  by-xyp 2014年6月20日11:41:26----------*/
        $(".tabs_content:eq(0) table tr").click(function () {
            var index = $(".tabs_content:eq(0) table tr").index(this);
            
        });
    });  
}

function getTeamRankList() {
    $.post(baseUrl + "RankList/GeTeamRank", null, function (data) {
        var objList = eval("(" + data + ")");
        for (var i = 0; i < objList.length; i++) {
            var s = '<tr>' +
                   '<td class="row0"></td>' +
                   '<td class="row1"></td>' +
                   '<td class="row2"></td>' +
               '</tr>';
            $(".tabs_content:eq(1) table").append(s);
            $(".tabs_content:eq(1) tr:eq(" + i + ")").find(".row0").append("NO." + (i + 1));
            $(".tabs_content:eq(1) tr:eq(" + i + ")").find(".row1").append(objList[i].Title);
            $(".tabs_content:eq(1) tr:eq(" + i + ")").find(".row2").append("发表了 " + objList[i].AriticleCount + " 篇文章");
        }
    });
}

function getTypeRankList() {
    //认为知识分类指的是 树结构下的 第一级子节点
    $.post(baseUrl + "RankList/GeTypeRank", null, function (data) {
        var objList = eval("(" + data + ")");
        for (var i = 0; i < objList.length; i++) {
            var s = '<tr>' +
                   '<td class="row0"></td>' +
                   '<td class="row1"></td>' +
                   '<td class="row2"></td>' +
               '</tr>';
            $(".tabs_content:eq(2) table").append(s);
            $(".tabs_content:eq(2) tr:eq(" + i + ")").find(".row0").append("NO." + (i + 1));
            $(".tabs_content:eq(2) tr:eq(" + i + ")").find(".row1").append(objList[i].Title);
            $(".tabs_content:eq(2) tr:eq(" + i + ")").find(".row2").append("分类有 " + objList[i].AriticleCount + " 篇文章");
        }
        /*---------添加点击行跳到对应用户发表的文章的功能  by-xyp 2014年6月20日11:41:26----------*/
        $(".tabs_content:eq(2) table tr").click(function () {
            var index = $(".tabs_content:eq(2) table tr").index(this);
           
        });
    });
}

function loadLeftPan() {
    //加载左边的5类知识
    $.post(baseUrl + "RankList/GetClassifyTreeNodes", { "GetClassifyTreeNodes": null }, function (data) {
        var objList = eval("(" + data + ")");
        for(var i=0;i<objList.length;i++){
            if (objList[i].ParentId == null) {
                var temp = "";
                temp = '<div class="rankTile">' +
                                   '<div class="title_Node">' + objList[i].Title + '</div>' +
                                   '<div class="rankContent">';
                for (var j = 0; j < objList.length; j++) {
                    if (objList[i].Id == objList[j].ParentId) {
                        temp = temp + '<div class="everyContent" title=' + objList[j].Title + '>' + objList[j].Title + '</div>' + '<div class="seprate">|</div>';
                    }
                }
                temp = temp + '</div>' +
                                '</div>';
                $("#newHomepageLeft").append(temp);
            }
        }

    });

    var userInfoStr = window.localStorage.globalUserInfoStr;
    var userId = "";
    if (userInfoStr == undefined || userInfoStr == "" || userInfoStr == null) {
        //验证游客权限
        userId = null;
    } else {
        userId = userInfoStr.split("#")[0];
    }
    $.post(baseUrl + "Ariticle/GetNewestAriticles", { "count": 5, "userId": userId }, function (data) {
        var objList = eval("(" + data + ")");
        for (var i = 0; i < objList.length; i++) {
            var temp = "";
            var temp = getCkeditorValueToPreview(objList[i].UGC);
            if (temp.length > 200) {
                var content = temp.slice(0, 200) + "...";
            }
            else {
                var content = temp;
            }
            if (objList[i].Title.length > 40) {
                var littletitle = objList[i].Title.slice(0, 40) + "...";
            } else {
                var littletitle = objList[i].Title;
            }
            temp = '<div class="ariticle_Item">' +
                           '<div class="ariticle_Btn">' +
                               '<div class="praise_Btn AAA" id=' + "PraiseID" + objList[i].Id + ' title="点赞">' + objList[i].PraiseCount +"赞"+ '</div>' +
                               '<div class="comment_Btn BBB" title="评论"></div>' +
                           '</div>' +
                           '<div class="content_All">' +
                               '<div class="Item_Title" title=' + objList[i].Title + '>' + littletitle + '<input type="hidden" value=' + objList[i].Id + ' class="AriticleId"></div>' +
                               '<div class="Item_Content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + content + '</div>'
                            '</div>' +
                     '</div>';
            $("#newHomepageCenterContent").append(temp);
            SyntaxHighlighter.highlight();
           if (i % 2 == 0) {
               if ($(".AAA").eq(i).hasClass("praise_Btn")) {
                   $(".AAA").eq(i).addClass("praise_Btn_Other").removeClass("praise_Btn");
                   $(".BBB").eq(i).addClass("comment_Btn_Other").removeClass("comment_Btn");
                   $(".AAA").eq(i).addClass("PraiseColor");
               }
           } else {
               if ($(".AAA").eq(i).hasClass("praise_Btn_Other")) {
                   $(".AAA").eq(i).addClass("praise_Btn").removeClass("praise_Btn_Other");
                   $(".BBB").eq(i).addClass("comment_Btn").removeClass("comment_Btn_Other");
                   if ($(".AAA").eq(i).hasClass("PraiseColor")) {
                       $(".AAA").eq(i).removeClass("PraiseColor");
                   }
               }
           }
           $(".Item_Title").css("cursor","pointer");
           $(".AAA").css("cursor", "pointer");
           $(".BBB").css("cursor", "pointer");
        }
    });
}

$(".Item_Title").live("click", function () {
    var index = $(".Item_Title").index($(this));
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

$(".AAA").live("click", function () {
    var index = $(".AAA").index($(this));
    var ariticleId = $(".AriticleId").eq(index).val();
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
                $("#PraiseID" + ariticleId).html(count+"赞");
            });
        });
    }
});