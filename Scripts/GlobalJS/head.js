
//R2.Business.UserLimits = OpenLayers.Class({
//    parentId: "",        //父元素ID
//    userName: "",     //用户名
//    id: "",                  //自身ID
//    //构造函数
//    initialize: function (parentId, userName, option) {
//        this.parentId = parentId;
//        this.userName = userName;
//        OpenLayers.Util.extend(this, option);
//        this.userIdentity();
//    },
//    //判断用户信息
//    userIdentity: function () {
//        for (var i = 0; i < user.length; i++) {
//            if (user[i].username == this.userName) {
//                var userIdentity = user[i].identity;
//            }
//        }
//        this.userChange(userIdentity);
//    },
//    //变换用户信息
//    userChange: function (userIdentity) {
//        var userLimits = "";
//        if (userIdentity == "user") {
//            userLimits =
//        "<div id='user'>" +
//            "<div id='user_name'>欢迎您，" + this.userName + "</div><div class='user_line'></div>" +
//            "<div id='user_upload'>知识上传</div><div class='user_line'></div>" +
//            "<div id='user_center'>个人中心</div>" +
//            "<div id='user_exit'>退出</div>" +
//        "</div>";
//        } else {
//            userLimits =
//        "<div id='user'>" +
//            "<div id='user_name'>欢迎您，" + this.userName + "</div><div class='user_line'></div>" +
//            "<div id='user_manage'>管理中心</div><div class='user_line'></div>" +
//            "<div id='user_upload'>知识上传</div><div class='user_line'></div>" +
//            "<div id='user_center'>个人中心</div>" +
//            "<div id='user_exit'>退出</div>" +
//        "</div>";
//        }
//        $("#Head_user").html(userLimits);
//    },

//    CLASS_NAME: "R2.Business.UserLimits"
//})

$(function () {
    GetBodyHeight();
    //给input框添加focus边框
    $("#HomeRight input").css({ "border": "1px solid #ccc", "background": "#fff", "outline": "none" });
    $("#HomeRight input").focus(function () {
        $(this).css({ "border": "1px solid #6db1ba" });
    });
    $("#HomeRight input").blur(function () {
        $(this).css({ "border": "1px solid #CECECE" });
    });
    $("#Center input").css({ "border": "1px solid #ccc", "background": "#fff", "outline": "none" });
    $("#Center input").focus(function () {
        $(this).css({ "border": "1px solid #6db1ba" });
    });
    $("#Center input").blur(function () {
        $(this).css({ "border": "1px solid #ccc" });
    });

    $(".Head_Title").click(function () {
        var index = $(".Head_Title").index($(this));
        switch (index) {
            case 0:
                ManageKnowledgeLeaveAlert("Home/Index");
                break;
            case 1:
                ManageKnowledgeLeaveAlert("DevelopTech/DevelopTech");
                break;
            case 2:
                
               ManageKnowledgeLeaveAlert("WorkManagerHome/WorkManager");
               
                //ManageKnowledgeLeaveAlert("ManageModule/Manage");
                break;
            case 3:
                ManageKnowledgeLeaveAlert("Design/Design");
                break;
            case 4:
                ManageKnowledgeLeaveAlert("TeamWork/TeamWork");
                break;
            case 5:
                ManageKnowledgeLeaveAlert("Resource/Resource");
                break;
            case 6:
                ManageKnowledgeLeaveAlert("About/About");
                break;
        }
    });


    //ZHAOs

    $("#Head_logo").click(function () {
        $.post(baseUrl + "ExportWMExcel/ExportCurrentWeekWMInfo", null, function (data) {

            //alert("Excel Data = " + data);
        });
    });
    //ZHAOs End


    //获取当前页面的分类，改变当前分类的颜色 
    var title = $("head title").html();
    switch (title) {
        case "Index":
            $("#Head_nav a").eq(0).css("color", "#017586");
            break;
        case "DevelopTech":
            $("#Head_nav a").eq(1).css("color", "#017586");
            $("#HomeRight").css({ "background": "url(" + baseUrl + "Content/img/newHomePageLeft.png) no-repeat 30px bottom", "width": "1014px", "height": "577px" });
            break;
        case "GIS":
            $("#Head_nav a").eq(2).css("color", "#017586");
            $("#HomeRight").css("background", "url(" + baseUrl + "Content/img/img_GIS.png) no-repeat 30px bottom");
            break;
        case "Service":
            $("#Head_nav a").eq(3).css("color", "#017586");
            $("#HomeRight").css("background", "url(" + baseUrl + "Content/img/img_Service.png) no-repeat 30px bottom");
            break;
        case "TeamWork":
            $("#Head_nav a").eq(4).css("color", "#017586");
            $("#HomeRight").css("background", "url(" + baseUrl + "Content/img/img_Doc.png) no-repeat 30px bottom");
            break;
        case "Resource":
            $("#Head_nav a").eq(5).css("color", "#017586");
            $("#HomeRight").css("background", "url(" + baseUrl + "Content/img/img_Resource.png) no-repeat 30px bottom");
            break;
        case "About":
            $("#Head_nav a").eq(6).css("color", "#017586");
            break;
    }
    //创造模态
    var Login = "<div id='Login'><div id='Login_div'></div></div>";
    //在页面右上角点击登录按钮弹出登录模态窗口 
    $("#Head_login").click(function () {
        $("body").append(Login);
        var LoginEvent = new R2.Business.Login("Login_div", {});
    });
    $("#user_upload").live("click", function () {
        ManageKnowledgeLeaveAlert("Ariticle/UploadAriticle");
    });
    $("#user_center").live("click", function () {
        ManageKnowledgeLeaveAlert("PersonalCenter/PersonalCenter");
    });
    $("#user_manage").live("click", function () {
        ManageKnowledgeLeaveAlert("ManageModule/Manage");
    });

    $("#user_exit").live("click", function () {
        var uaf = $("#UploadAriticleFlag").text();
        var maf = $("#ModifyAriticleFlag").text();
        if (uaf == "UploadAriticleFlag" || maf == "ModifyAriticleFlag") {
            var uploadariticlealert = new R2.Business.AlertWindow("离开将丢失您所填写的信息，是否继续？", { "HasCancel": true, "LoadUrl": "Home/Index" });
            delCookie("userinf");
        } else {
            delCookie("userinf");
            window.localStorage.globalUserInfoStr = "";
            window.location.href = baseUrl + "Home/Index";
        }
    });

    //$(".ariticleRankList").live("click",function () {
    //    window.open(baseUrl + "AriticleRankList/AriticleRankList");
    //});
    isLogin();
    initHeadSearch();
});

//在知识上传或修改页面跳转时提示信息
function ManageKnowledgeLeaveAlert(url) {
    var uaf = $("#UploadAriticleFlag").text();
    var maf = $("#ModifyAriticleFlag").text();
    if (uaf == "UploadAriticleFlag" || maf == "ModifyAriticleFlag") {
        var title = $("#Left_Tilte_Input").val();
        var classification = $("#Left_Classification_Select_Leaf").val();
        var open = $("#Left_Open_Text").html();
        var tag = $("#Left_Tag_Show").html();
        var content = ckd.getData();
        if (title != "" || classification != "" || open != "" || tag != "" || content != "") {
            var uploadariticlealert = new R2.Business.AlertWindow("离开将丢失您所填写的信息，是否继续？", { "HasCancel": true, "LoadUrl": url });
        } else {
            window.location.href = baseUrl + url;
        }
    } else {
        window.location.href = baseUrl + url;
    }
}


//判断内容高度,使页脚始终处于页面最下方
function GetBodyHeight() {

    var winHeight = window.outerHeight - window.innerHeight - 16;
    var screenHeight = window.screen.availHeight;
    var Height = screenHeight - winHeight - 40;
    $("#Home").css("min-height", Height);
    Manageheight = Height - 85;
    $("#Manage").css("min-height", Manageheight);

}

//判断cookie内是否有内容
function isLogin() {
    if (getCookie("userinf") != null) {
        var userarray = getCookie("userinf").split("#");
        var user = userarray[2];
        var identity = userarray[3];
        var userLimits = "";
        if (identity == 1) {
            userLimits = "<div id='user'>" +
        "<div id='user_name'>欢迎您，" + user + "</div><div class='user_line'></div>" +
        "<div id='user_upload'>知识上传</div><div class='user_line'></div>" +
        "<div id='user_center'>个人中心</div><div class='user_line'></div>" +
       // "<div class='ariticleRankList'>知识排行榜</div>" +
        "<div id='user_exit'>退出</div>" +
    "</div>";
        } else {
            userLimits = "<div id='user'>" +
        "<div id='user_name'>欢迎您，" + user + "</div><div class='user_line'></div>" +
        "<div id='user_manage'>管理中心</div><div class='user_line'></div>" +
        "<div id='user_upload'>知识上传</div><div class='user_line'></div>" +
        "<div id='user_center'>个人中心</div><div class='user_line'></div>" +
        //"<div class='ariticleRankList'>知识排行榜</div>" +
        "<div id='user_exit'>退出</div>" +
    "</div>";
        }
        $("#Head_user").html(userLimits);
    } else {
        var cookieFlag = $("#cookieFlag").html();
        if (cookieFlag =="cookieFlag") {
            var cookieMessage = new R2.Business.AlertWindow("您尚未登录，要想执行此操作，请先登陆！", { "LoadUrl": "Home/Index" });
        }
    }
}

//将用户信息放入cookie
function SetCookie(name, value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date(); //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;";
}

function getCookie(name)//取cookies函数 
{
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
}

function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/;";
}