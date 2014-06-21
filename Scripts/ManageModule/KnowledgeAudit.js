$(function () {
    KnowledgeAuditInti();
    $(".M_knowledge").click(initKnowledgeAuditSearch);
});
var pageControl;
function ManageKnowledge() {
    $("#Manage_right").empty();
    var top = '<div id="KnowledgeAudit_Top">' +
        '<input type="text" value="知识标题、知识标签、上传者昵称" onfocus="if(value==defaultValue) {value=' + "''" + '}"' +
        'onblur="if(!value) value=defaultValue"  id="KnowledgeAudit_SearchInput"/>' +
        '<div id="KnowledgeAudit_Search"></div>' +
        '<table class="KnowledgeAudit_PageControl">' +
            '<tr>' +
                '<td class="cell" id="first">第一页</td>' +
                '<td class="cell" id="previous">上一页</td>' +
                '<td id="pageInf" class="cell"></td>' +
                '<td class="cell" id="next">下一页</td>' +
                '<td class="cell" id="last">最后一页</td>' +
            '</tr>' +
        '</table>' +
    '</div>' +
    '<div id="KnowledgeShowPlate"></div>';
    $("#Manage_right").append(top);
    var userGroupId = getCookie("userinf").split("#")[4];
    pageControl = new R2.Control.PageControl(baseUrl + "ManageModule/KnowledgeAudit?userGroupId=" + userGroupId, {
        "countPerPage": 5,
        "firstPageID": "first",
        "previousPageID": "previous",
        "pageInfID": "pageInf",
        "nextPageID": "next",
        "lastPageID": "last",
        "callback": PageControlOnSuccess3
    });
    countPerPage = 2;
    function PageControlOnSuccess3(data) {
        $("#KnowledgeShowPlate").empty();
        for (var i = 0; i < data.length; i++) {
            var titleLen = data[i].Title.length;
            if (titleLen > 20) {
                var littletitle = data[i].Title.slice(0, 20) + "...";
            } else {
                var littletitle = data[i].Title;
            }
            var tagsLen = getTags(data[i].Tags).length;;
            if (tagsLen > 20) {
                var littletags = getTags(data[i].Tags).slice(0, 20) + "...";
            } else {
                var littletags = getTags(data[i].Tags);
            }
            var content = '<div class="Knowledge_show">' +
                            '<div id="Knowledge_show_Top">' +
                                '<font class="Knowledge_show_Font KnowledgeAuditTitle" style=" margin-left:0px; color:#017586; font-size:17px; cursor:pointer;" title="' + data[i].Title + '">' + littletitle + '</font><input type="hidden" value=' + data[i].Id + ' class="AriticleId">' +
                            '</div>' +
                            '<div id="Knowledge_show_Top">' +
                                '<font class="Knowledge_show_Font KnowledgeAuditClassification">标签：<font style="color:#555;" title="' + getTags(data[i].Tags) + '">' + littletags + '</font></font>' +
                                '<font class="Knowledge_show_Font">作者：<font>' + data[i].author + '</font></font>' +
                            '</div>' +
                            '<div class="AriticleModify" title="修改知识"></div>'+
                            '<div class="AuditPass" title="审核通过"></div>' +
                            '<div class="AuditUnqualified" title="审核不通过"></div>' +
                            '<div id="Knowledge_show_Center" class="Knowledge_show_Font KnowledgeAuditDetails" style=" margin-left:0px;">' + data[i].UGC + '</div>' +
                          '</div>';
            $("#KnowledgeShowPlate").append(content);
        }
        SyntaxHighlighter.highlight();
    }
    $(".Search_DetectResultDiv").css({ "position": "absolute", "z-index": "2000", "margin-top": "35px", "border": "1px solid #ccc" });
}

function getTags(list) {
    var tag = "";
    for (var i = 0 ; i < list.length; i++) {
        tag = tag + list[i] + "，";
    }
    return tag.substring(0, tag.length - 1);
}

function KnowledgeAuditInti() {
    //记录每页数据数，用作修改时计算数据下标
    var countPerPage;
    $(".M_knowledge").click(function () {
        ManageKnowledge();
    });
    $(".KnowledgeAuditTitle").live("click", function () {
        var index = $(".KnowledgeAuditTitle").index($(this));
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
    $("#KnowledgeAuditPreview_Close").live("click", function () {
        $("#conver").remove();
    });
    $(".AuditPass").live("click", function () {
        var index = $(".AuditPass").index($(this));
        var AriticleId = $(".AriticleId").eq(index).val();
        $(".Knowledge_show").eq(index).fadeOut(500, function () {
            $(".Knowledge_show").eq(index).remove();
            var userId = getCookie("userinf").split("#")[0];
            $.post(baseUrl + "ManageModule/Audit", { "ariticleId": AriticleId, "userId": userId }, function (cbdata) { pageControl.Refresh(); });
        });
    });

    $(".AuditUnqualified").live("click", function () {
        var index = $(".AuditUnqualified").index($(this));
        var AriticleId = $(".AriticleId").eq(index).val();
        var message = "<div id='conver'><div id='AuditUnqualifiedMessage'><div id='AuditUnqualifiedMessage_Close' title = '关闭'>×<div></div></div>";
        $("body").append(message);
        var content = "<div style=' margin:auto; width:400px; height:200px;'><div id='AuditUnqualifiedMessage_Title'>请输入未通过审核的原因</div><textarea rows='6' cols='80' id='message'></textarea><div id='AuditUnqualifiedMessage_OK'>确 定</div></div>";
        $("#AuditUnqualifiedMessage").append(content);
        $("#AuditUnqualifiedMessage_Close").live("click", function () {
            $("#conver").remove();
            $("#AuditUnqualifiedMessage_Close").die("click");
            $("#message").die("click");
            $("#AuditUnqualifiedMessage_OK").die("click");
        });
        $("#message").live("click", function () {
            $("#message_Error").remove();
        });
        $("#AuditUnqualifiedMessage_OK").live("click", function () {
            var message = $("#message").val();
            if (message != "") {
                $("#conver").remove();
                $(".Knowledge_show").eq(index).fadeOut(500, function () {
                    $(".Knowledge_show").eq(index).remove();
                    var userId = getCookie("userinf").split("#")[0];
                    $.post(baseUrl + "ManageModule/FailedAudit", { "ariticleId": AriticleId, "userId": userId, "FailedAuditMessage": message }, function (cbdata) { pageControl.Refresh(); });
                });
                $("#AuditUnqualifiedMessage_Close").die("click");
                $("#message").die("click");
                $("#AuditUnqualifiedMessage_OK").die("click");
            } else {
                $("#message_Error").remove();
                $("#AuditUnqualifiedMessage_Title").after("<font id='message_Error'>审核意见不能为空</font>");
            }
        });
    });

    $(".AriticleModify").live("click", function () {
        var index = $(".AriticleModify").index($(this));
        var ariticleId = $(".AriticleId").eq(index).val();
        window.location.href = baseUrl + "ManageModule/ToKnowledgeModify?ariticleId=" + ariticleId;
    });
}

function initKnowledgeAuditSearch() {
    $("#KnowledgeAudit_Search").click(KnowledgeAuditSearchBtnClick);
    $("#KnowledgeAudit_SearchInput").focus(function () {
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) {
                KnowledgeAuditSearchBtnClick();
            }
        };
    }).blur(function () {
        document.onkeydown = function (event) {
        };
    });
}

function cbOnSuccess(condition) {
    if (condition == "" || condition == undefined) {
        return;
    }
    R2.DataTransport = condition;
}

function KnowledgeAuditSearchBtnClick() {
    var keyword = $("#KnowledgeAudit_SearchInput").val();
    if(keyword=="" || keyword=="知识标题、知识标签、上传者昵称"){
        return ;
    }
    pageControl = new R2.Control.PageControl(baseUrl + "KnowledgeAuditSearch/Search?keyword=" + escape(keyword), {
        "countPerPage": 5,
        "firstPageID": "first",
        "previousPageID": "previous",
        "pageInfID": "pageInf",
        "nextPageID": "next",
        "lastPageID": "last",
        "callback": PageControlOnSuccess3
    });
    function PageControlOnSuccess3(data) {
        $("#KnowledgeShowPlate").empty();
        for (var i = 0; i < data.length; i++) {
            var titleLen = data[i].Title.length;
            if (titleLen > 20) {
                var littletitle = data[i].Title.slice(0, 20) + "...";
            } else {
                var littletitle = data[i].Title;
            }
            var tagsLen = getTags(data[i].Tags).length;;
            if (tagsLen > 20) {
                var littletags = getTags(data[i].Tags).slice(0, 20) + "...";
            } else {
                var littletags = getTags(data[i].Tags);
            }
            var content = '<div class="Knowledge_show">' +
                            '<div id="Knowledge_show_Top">' +
                                '<font class="Knowledge_show_Font KnowledgeAuditTitle" style=" margin-left:0px; color:#017586; font-size:17px; cursor:pointer;" title="' + data[i].Title + '">' + littletitle + '</font><input type="hidden" value=' + data[i].Id + ' class="AriticleId">' +
                            '</div>' +
                            '<div id="Knowledge_show_Top">' +
                                '<font class="Knowledge_show_Font KnowledgeAuditClassification">标签：<font style="color:#555;" title="' + getTags(data[i].Tags) + '">' + littletags + '</font></font>' +
                                '<font class="Knowledge_show_Font">作者：<font>' + data[i].author + '</font></font>' +
                            '</div>' +
                            '<div class="AriticleModify" title="修改知识"></div>' +
                            '<div class="AuditPass" title="审核通过"></div>' +
                            '<div class="AuditUnqualified" title="审核不通过"></div>' +
                            '<div id="Knowledge_show_Center" class="Knowledge_show_Font KnowledgeAuditDetails" style=" margin-left:0px;">' + data[i].UGC + '</div>' +
                          '</div>';
            $("#KnowledgeShowPlate").append(content);
        }
    }
}