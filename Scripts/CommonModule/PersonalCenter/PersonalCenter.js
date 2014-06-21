/****************************************************************
*   个人中心
*   created by ZHAOs  2013-10-11 
****************************************************************/
$(document).ready(init);
function init() {    
    isLogin();
    functionSwitch();
    create_knowledge_item();
    setNewPassword();
    $("#baseInformation").trigger("click");
}
var pageControl;
//这个函数的作用是分别点击“知识管理”和“用户管理”之后界面出现切换变化
function functionSwitch() {
    $("#baseInformation").click(function () {
        $("#baseinf").show();
        $("#upper").css("display", "none");
        $(this).css("color", "#017586");
        $("#userManagement").css("color", "#333");
        $("#knowledgeManagement").css("color", "#333");
        $("#PwdModify").hide();
        var userInfo = window.localStorage.globalUserInfoStr;
        var userid = userInfo.split('#')[0];
        $.post(baseUrl + "PersonalCenter/GetUserById?userId=" + userid, {}, function (cbdata) {
            var user = eval("(" + cbdata + ")");
            $(".baseinf_content").eq(0).html(user.RegisterName);
            $(".baseinf_content").eq(1).html(user.RealName);
            $(".baseinf_content").eq(2).html(user.NickName);
            $(".baseinf_content").eq(3).html(user.Category);
            $(".baseinf_content").eq(4).html(user.UserGroup);
            $(".baseinf_content").eq(5).html(user.CreateTime);
            $(".baseinf_content").eq(6).html(user.allArticleCount+"篇");
            $(".baseinf_content").eq(7).html(user.approvedArticleCount+"篇");
        });
    });
    $("#knowledgeManagement").click(function () {        
        $("#upper").css("display", "block");
        $("#baseinf").hide();
        $(this).css("color", "#017586");
        $("#userManagement").css("color", "#333"); 
        $("#baseInformation").css("color", "#333");
        $("#PwdModify").hide();
        addSelect();
        activePersonalCenterSearch();
        activePersonalCenterSelect();        
    });
    $("#userManagement").click(function () {
        $("#upper").css("display", "none");
        $("#baseinf").hide();
        $("#knowledgeManagement").css("color", "#333");
        $("#baseInformation").css("color", "#333");
        $(this).css("color", "#017586");
        $("#PwdModify").show();
        $(".Reg_Input").val("");
        reduction("oldpwd");
        reduction("pwd");
        reduction("repwd");
    });
}
//用户输入新旧密码，点击提交的判断事件
function setNewPassword() {
    $("#PwdModify_Submit").unbind("click");
    $("#oldpwd").blur(function () {
        $(".oldpwd").remove();
        var password = $("#oldpwd").val();
        var username = window.localStorage.globalUserInfoStr.split('#')[1];
        if (password != "") {
            $.post(baseUrl + "PersonalCenter/IsPasswordRight", { "username": username, "password": password }, function (data) {
                if (data == "failed") {
                    $(".oldpwdInf").hide();
                    $("#oldpwd").after("<span class='Reg_Error oldpwd'>密码错误</span>");
                }
                else {
                    $(".oldpwdInf").hide();
                    $("#oldpwd").after("<div class='Reg_Right oldpwd'></div>");
                }
            });
        } else {
            $(".oldpwdInf").show();
        }
    });
    $("#PwdModify_Submit").click(function () {
        if ($(".Reg_Error").html() == null) {
            var personalManage_pwd = $("#pwd").val();
            var personalManage_oldpwd = $("#oldpwd").val();
            var personalManage_repwd = $("#repwd").val();
            var password = $("#repwd").val();            
            if (personalManage_oldpwd == "" || personalManage_pwd == "" || personalManage_repwd == "") {
                var alertWindow = new R2.Business.AlertWindow("密码不能为空！", {
                    ensureId: "modifyPasswordError",
                })
                $("#modifyPasswordError").live("click", function () {
                    $(".manage_Alert").remove();
                });
                return;
            }
            var currentUserInfo = window.localStorage.globalUserInfoStr;
            var globalUserId = currentUserInfo.split('#')[0];
            $.post(baseUrl + "PersonalCenter/UpdateUser", { "userId": globalUserId, "password": password }, function (data) {
                if (data == "success") {
                    var alertWindow = new R2.Business.AlertWindow("密码修改成功！", {
                        ensureId: "modifyPasswordYes",
                    });
                    $("#modifyPasswordYes").live("click", function () {
                        $(".manage_Alert").remove();
                        $("#baseInformation").trigger("click");
                    });
                }
            });
        }
    });

    fouceIn("oldpwd");
    var passwordCheck = new R2.Business.PwdCheck("pwd", { "num": 6, "information1": "密码至少为6位", "information2": "两次密码不一致" });
    fouceIn("pwd");
    var repasswordCheck = new R2.Business.RePwdCheck("repwd", { "num": 6, "information1": "密码至少为6位", "information2": "两次密码不一致" });
    fouceIn("repwd");


    $("#PwdModify_Reset").click(function () {
        reduction("pwd");
        reduction("repwd");
        reduction("oldpwd");
    });

}
function fouceIn(inf) {
    $("#" + inf).click(function () {
        $("." + inf).remove();
        $("." + inf + "Inf").show();
    });
}

//进入页面时加载知识条目信息
function create_knowledge_item() {
    //这个字符串可以放置一个知识条目
    var itemStr = "<div class='konwledgeItem'>" +
                        "<div class='title_message'>" +
                            "<div class='title' style='height:23px;' ></div>" +
                            "<div class='message' ></div>" +
                            "<div class='id' style='display:none;'></div>" +
                        "</div>" +
                    "<div class='type_state_date'>" +
                        "<div class='type'></div>" +
                        "<div class='state'>当前状态：<span></span></div>" +
                        "<div class='date'></div>" +
                        "<div class='img'>" +
                            "<div class='delete' title='删除知识'></div>" +
                            "<div class='modify' title='修改知识'></div>" +
                        "</div>" +
                    "</div>" +
                    "<div class='details'></div>" +
                "</div>";
    window.localStorage.itemStr = itemStr;
    var userInfo = window.localStorage.globalUserInfoStr;
    var userid = userInfo.split('#')[0];
    pageControl = new R2.Control.PageControl(baseUrl + "PersonalCenter/ShowOwnKnowledgeItem?userId=" + userid, {
        "countPerPage": 5,
        "firstPageID": "firstPage",
        "previousPageID": "prePage",
        "pageInfID": "pageInfo",
        "nextPageID": "nextPage",
        "lastPageID": "lastPage",
        "callback": PageControlOnSuccess5
    });
    
}
function PageControlOnSuccess5(data) {
    $(".konwledgeItem").remove();
    for (var i = 0; i < data.length; i++) {
        $(".pages").after(window.localStorage.itemStr);
    }
    for (var i = 0; i < data.length; i++) {
        var kowledge = $(".konwledgeItem").eq(i);
        kowledge.find(".id").css("display", "none").text(data[i].Id);
        var TitleLen = data[i].Title.length;
        if (TitleLen > 30) {
            var littleTitle = data[i].Title.slice(0, 30) + "…";
        } else {
            var littleTitle = data[i].Title;
        }
        $(".title").eq(i).attr("title", data[i].Title);
        kowledge.find(".title").text(littleTitle);
        if (data[i].ApproveStatus == 0x02) {
            kowledge.find(".state span").text("未审核").css("color", "red");
        }
        if (data[i].ApproveStatus == 0x04) {
            //var srcurl =@Url.Content('~/Content / img / message_icon.png');"url(" + baseUrl + "Content/img/img_GIS.png) no-repeat 400px center"
            kowledge.find(".message").html("<div class='message_img'></div>").css({ "width": "20px", "height": "20px", "overflow": "hidden" });
            $(".message_img").css({ "width": "20px", "height": "20px", "background": "url(" + baseUrl + "Content/img/message_icon.png) no-repeat center center" });
            kowledge.find(".state span").text("审核未通过").css("color", "red");
        }
        if (data[i].ApproveStatus == 0x01) {
            kowledge.find(".state span").text("已通过审核").css("color", "#017586");
            kowledge.find(".type_state_date .img .delete").remove();
        }
        kowledge.find(".date").append(" 于 " + data[i].Createtime + " 上传");
        kowledge.find(".details").append(data[i].UGC);
        SyntaxHighlighter.highlight();
    }

    //$(".delete").click(function () {
    //    var ariticleId = $(this).parent().parent().siblings().find(".id").text();//得到此条知识的id 
    //    var index = $(".delete").index($(this)); 
    //    var alert = new R2.Business.AlertWindow("确定要删除吗？", {
    //        HasCancel: true,
    //        ensureId: "deleteAriticleYes",
    //        cancelId: "deleteAriticleCancel"
    //    });

    //    $("#deleteAriticleCancel").click(function () {
    //        $(".manage_Alert").remove();
    //    });
    //    $("#deleteAriticleYes").click(function () {
    //        //var pageInf = $("#pageInfo").html();
    //        //var tag = pageInf.indexOf("/");
    //        //var currentPage = pageInf.substring(0, tag);
    //        //id = id - (currentPage - 1) * countPerPage;
    //        $(".manage_Alert").remove();
    //        $(".delete").eq(index).parent().parent().fadeOut(500, function () {                    
    //            $.post(baseUrl + "PersonalCenter/DeleteAriticle", { "currentPage": 1, "index": 1, "countPerPage": 20, "ariticleId": ariticleId }, function (cbdata) {
    //                pageControl.Refresh();
    //            });
    //        });
    //    });
    //});


    $(".modify").click(function () {
        var ariticleId = $(this).parent().parent().siblings().find(".id").text();//得到此条知识的id   
        window.location.href = baseUrl + "PersonalCenter/ToKnowledgeModify?ariticleId=" + ariticleId;
    });


    $(".message").toggle(function () {
        var ariticleId = $(this).siblings(".id").text();//此条知识的id 
        var ths = $(this);
        $(this).siblings(".id").text(ariticleId);
        $.post(baseUrl + "PersonalCenter/GetSystemMessage", { "ariticleId": ariticleId }, function (data) {
            ths.siblings(".id").after("<span>" + data + "</span>");
            ths.siblings("span").css({ "width": "100%", "float": "left", "line-height": "20px", "padding-top": "5px", "color": "#666", "font-size": "12px", "text-indent": "2em" });
            ths.siblings("span").fadeIn();
            ths.parent().animate({ "height": "+=20px" }, "normal");
        });
    }, function () {
        $(this).siblings("span").remove();
        $(this).parent().animate({ "height": "-=20px" }, "normal");
    });


    $(".title").click(function () {
        var ariticleId = $(this).parent().find(".id").text();
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
}

//All the below is Created By ZHAOs ,2013年12月3日11:22:20
function addSelect() {
    if ($("#upper select").length == 0) {
        var s = ' <select class="chzn-select" id="personalCenterSelect" data-placeholder="请选择状态" style="width:160px;"tabindex="1">' +
                 '<option value=""></option> ' +
                 '<option value="全部">全部</option> ' +
                 '<option value="审核已通过">审核已通过</option> ' +
                 '<option value="未审核">未审核</option> ' +
                 '<option value="审核未通过">审核未通过</option> ' +                 
               '</select>';
        $("#search").after(s);
        $(".chzn-select").chosen();
        $(".chzn-select").next(".chosen-container").css("top", "0");
    }
}

function activePersonalCenterSearch() {
    $("#search").click(function () {
        personalCenterSearchBtnClick();
    });
   //注册Enter事件
    $("#personal_search").focus(function () {
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) {
                personalCenterSearchBtnClick();
            }
        }
    }).blur(function () {
        document.onkeydown = function (event) {
        }
    });
}
function personalCenterSearchBtnClick() {
    var keyword = $("#personal_search").val();
    if (keyword == "" || keyword == "知识标题、知识标签") {
        return;
    }
    $(".konwledgeItem").remove();
    var keyword = $("#personal_search").val();
    var userId = window.localStorage.globalUserInfoStr.split('#')[0];//"201311181636072831843#aswindguy#三季稻#3#2"	String
    pageControl = new R2.Control.PageControl(baseUrl + "PersonalCenterSearch/TextSearch?userId=" + userId + "&keyword=" + escape(keyword), {
        "countPerPage": 5,
        "firstPageID": "firstPage",
        "previousPageID": "prePage",
        "pageInfID": "pageInfo",
        "nextPageID": "nextPage",
        "lastPageID": "lastPage",
        "callback": PageControlOnSuccess5
    });
    $("#personalCenterSelect_chosen,select").remove();
    addSelect();
}

function activePersonalCenterSelect() {
    $("#personalCenterSelect").live("change", function () {
        $(".konwledgeItem").remove();
        var keyword = $("#personal_search").val();
        if (keyword == "知识标题、知识标签") {
            keyword = "";
        }
        var userId = window.localStorage.globalUserInfoStr.split('#')[0];//"201311181636072831843#aswindguy#三季稻#3#2"	
        state = $("#personalCenterSelect").val();
        var ariticleApproveStatus = 0;
        if (state == "全部") {
            ariticleApproveStatus = 0;
        }
        if (state == "审核已通过") {
            ariticleApproveStatus = 1;
        }
        if (state == "未审核") {
            ariticleApproveStatus = 2;
        }
        if (state == "审核未通过") {
            ariticleApproveStatus = 4;
        }
        inputTextAndSelectSearch(userId, keyword, ariticleApproveStatus);//文本框和selec框的结合搜索
    });
}

function inputTextAndSelectSearch(userId, keyword, ariticleApproveStatus) {
    pageControl = new R2.Control.PageControl(baseUrl + "PersonalCenterSearch/TextAndSelectSearch?userId=" + userId + "&keyword=" + escape(keyword) + "&ariticleApproveStatus=" + ariticleApproveStatus, {
        "countPerPage": 5,
        "firstPageID": "firstPage",
        "previousPageID": "prePage",
        "pageInfID": "pageInfo",
        "nextPageID": "nextPage",
        "lastPageID": "lastPage",
        "callback": PageControlOnSuccess5
    });
}