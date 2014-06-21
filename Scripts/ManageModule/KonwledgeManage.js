//Comment By ZHAOs 2013年12月6日10:46:32
//前90行是原有内容，90-170是检索内容，之后部分是公用内容，是调整后放置的位置
$(function () {
    KnowledgeManageInit();
    KnowledgeManageSearchInit();
});

function KnowledgeManageInit() {
    var pageControl;
    //记录每页数据数，用作修改时计算数据下标
    $(".M_storage").click(function () {
        $("#Manage_right").empty();
        var top = '<div id="KnowledgeManage_Top">' +
            '<input type="text" value="知识标题、知识标签、上传者昵称" onfocus="if(value==defaultValue) {value=' + "''" + '}"' +
            'onblur="if(!value) value=defaultValue" id="KnowledgeManage_SearchInput"/>' +
            '<div id="KnowledgeManage_Search"></div>' +
            '<select id="KnowledgeManage_Select" class="Kselect" data-placeholder="请选择状态">' +
            '<option value=""></option>' +
            '<option value="AuditAll">全部</option>' +
            '<option value="AuditPass">审核已通过</option>' +
            '<option value="AuditUnqualified">审核未通过</option>' +
            '</select>'+
            '<table class="KnowledgeManage_PageControl">' +
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
        $(".Kselect").chosen({ disable_search: true });
        var userGroupId = getCookie("userinf").split("#")[4];
        pageControl = new R2.Control.PageControl(baseUrl + "ManageModule/KnowledgeManage?userGroupId=" + userGroupId, {
            "countPerPage": 5,
            "firstPageID": "first",
            "previousPageID": "previous",
            "pageInfID": "pageInf",
            "nextPageID": "next",
            "lastPageID": "last",
            "callback": PageControlOnSuccess4
        });
        $(".Search_DetectResultDiv").css({ "position": "absolute", "z-index": "2000", "border": "1px solid #ccc" });

        function PageControlOnSuccess4(data) {
            $("#KnowledgeShowPlate").empty();
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
                var content = '<div class="Knowledge_show">' +
                                '<div id="Knowledge_show_Top">' +
                                    '<font class="Knowledge_show_Font KnowledgeManageTitle" style=" margin-left:0px; color:#017586;  font-size:17px; cursor:pointer;" title="' + data[i].Title + '">' + littletitle + '</font><input type="hidden" value=' + data[i].Id + ' class="AriticleId">' +
                                '</div>' +
                                '<div id="Knowledge_show_Top">' +
                                    '<font class="Knowledge_show_Font KnowledgeManageClassification">标签：<font style="color:#555;" title="' + getTags(data[i].Tags) + '">' + littletags + '</font></font>' +
                                    '<font class="Knowledge_show_Font">作者：<font style="color:#666;">' + data[i].author + '</font></font>' +
                                    '<font class="Knowledge_show_Font">审核状态：<font style="color:' + getAriticleStateColor(data[i].ApproveStatus) + ';">' + getAriticleState(data[i].ApproveStatus) + '</font></font>' +
                                '</div>' +
                                '<div class="ModifyKnowledge" title="修改知识"></div>' +
                                '<div class="DeleteKnowledge" title="删除知识"></div>' +
                                '<div id="Knowledge_show_Center" class="Knowledge_show_Font KnowledgeManageDetails" style=" margin-left:0px;">' + data[i].UGC + '</div>' +

                               '</div>';
                $("#KnowledgeShowPlate").append(content);
            }
            SyntaxHighlighter.highlight();
        }

    });

    $(".KnowledgeManageTitle").live("click", function () {
        var index = $(".KnowledgeManageTitle").index($(this));
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

    $(".ModifyKnowledge").live("click", function () {
        var index = $(".ModifyKnowledge").index($(this));
        var ariticleId = $(".AriticleId").eq(index).val();
        window.location.href = baseUrl + "ManageModule/ToKnowledgeModify?ariticleId=" + ariticleId;
    });

   
}

/////////////////////////检索部分 
// By ZHAOs  2013年12月5日19:51:51
function KnowledgeManageSearchInit() {
    $("#KnowledgeManage_Search").live("click", KnowledgeManageSearchBtnClick);
    $("#KnowledgeManage_SearchInput").live("focus", function () {
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) {
                KnowledgeManageSearchBtnClick();
            }
        };
    }).live("blur", function () {
        document.onkeydown = function (event) {
        };
    });
    activeKnowledgeManageSelect();
}
//知识标题、知识标签、上传者的NickName
function KnowledgeManageSearchBtnClick() {
    var keyword = $("#KnowledgeManage_SearchInput").val();
    if (keyword == "" || keyword == "知识标题、知识标签、上传者昵称") {
        return;
    }
    pageControl = new R2.Control.PageControl(baseUrl + "KnowledgeManageSearch/Search?keyword=" + escape(keyword), {
        "countPerPage": 5,
        "firstPageID": "first",
        "previousPageID": "previous",
        "pageInfID": "pageInf",
        "nextPageID": "next",
        "lastPageID": "last",
        "callback": PageControlOnSuccess4 //此函数是几处公用的函数，放在最下方
    });
    $("#KnowledgeManage_Select_chosen,select").remove();
    addSelect();
}

//创建select框
function addSelect() {
    if ($("#KnowledgeShowPlate select").length == 0) {
        var s = '<select id="KnowledgeManage_Select" class="Kselect" data-placeholder="请选择状态">' +
            '<option value=""></option>' +
            '<option value="AuditAll">全部</option>' +
            '<option value="AuditPass">审核已通过</option>' +
            '<option value="AuditUnqualified">审核未通过</option>' +
            '</select>';
        $("#KnowledgeManage_Search").after(s);
        $(".Kselect").chosen();
    }
}

function activeKnowledgeManageSelect() {
    $("#KnowledgeManage_Select").live("change", function () {
        $(".Knowledge_show").remove();
        var keyword = $("#KnowledgeManage_SearchInput").val();
        state = $("#KnowledgeManage_Select").val();
        var ariticleApproveStatus = 0;
        if (state == "AuditAll") {
            ariticleApproveStatus = 0x00;
        }
        if (state == "AuditPass") {
            ariticleApproveStatus = 0x01;
        }
        //if (state == "待审核") {
        //    ariticleApproveStatus = 2;
        //}
        if (state == "AuditUnqualified") {
            ariticleApproveStatus = 0x04;
        }
        inputTextAndSelectSearchKM(keyword, ariticleApproveStatus);//文本框和selec框的结合搜索
    });
}
//在这个函数里 审核状态已经有所变化
function inputTextAndSelectSearchKM(keyword, ariticleApproveStatus) {
    if (keyword == "" || keyword == "知识标题、知识标签、上传者昵称") {
        keyword="";
    }
    pageControl = new R2.Control.PageControl(baseUrl + "KnowledgeManageSearch/SelectSearch?keyword=" + escape(keyword) + "&ariticleApproveStatus=" + ariticleApproveStatus, {
        "countPerPage": 5,
        "firstPageID": "first",
        "previousPageID": "previous",
        "pageInfID": "pageInf",
        "nextPageID": "next",
        "lastPageID": "last",
        "callback": PageControlOnSuccess4 //此函数是几处公用的函数，放在最下方
    });
}
////////////////////////
//一些公用的函数，放在最下方
function getTags(list) {
    var tag = "";
    for (var i = 0 ; i < list.length; i++) {
        tag = tag + list[i] + "，";
    }
    return tag.substring(0, tag.length - 1);
}

//获取文章审核状态
function getAriticleState(status) {
    var auditState;
    switch (status) {
        case 1:
            auditState = "审核已通过";
            break;
        case 4:
            auditState = "审核未通过";
            break;
    }
    return auditState;
}
//获取审核状态字体颜色
function getAriticleStateColor(status) {
    var color;
    switch (status) {
        case 1:
            color = "#017586";
            break;
        case 4:
            color = "red";
            break;
    }
    return color;
}
function PageControlOnSuccess4(data) {
    $("#KnowledgeShowPlate").empty();
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
        var content = '<div class="Knowledge_show">' +
                        '<div id="Knowledge_show_Top">' +
                            '<font class="Knowledge_show_Font KnowledgeManageTitle" style=" margin-left:0px; color:#017586;  font-size:17px; cursor:pointer;" title="' + data[i].Title + '">' + littletitle + '</font><input type="hidden" value=' + data[i].Id + ' class="AriticleId">' +
                        '</div>' +
                        '<div id="Knowledge_show_Top">' +
                            '<font class="Knowledge_show_Font KnowledgeManageClassification">标签：<font style="color:#555;" title="' + getTags(data[i].Tags) + '">' + littletags + '</font></font>' +
                            '<font class="Knowledge_show_Font">作者：<font style="color:#666;">' + data[i].author + '</font></font>' +
                            '<font class="Knowledge_show_Font">审核状态：<font style="color:' + getAriticleStateColor(data[i].ApproveStatus) + ';">' + getAriticleState(data[i].ApproveStatus) + '</font></font>' +
                        '</div>' +
                        '<div class="ModifyKnowledge" title="修改知识"></div>' +
                        '<div class="DeleteKnowledge" title="删除知识"></div>' +
                        '<div id="Knowledge_show_Center" class="Knowledge_show_Font KnowledgeManageDetails" style=" margin-left:0px;">' + data[i].UGC + '</div>' +

                       '</div>';
        $("#KnowledgeShowPlate").append(content);
    }
    SyntaxHighlighter.highlight();
}
