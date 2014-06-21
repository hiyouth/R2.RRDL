/*
描述：管理中心里用到的一些功能模块，如  头部信息更换、页面内容切换
*create by 张振强  2013年10月16日
*/
$(function () {
    ManageInit();
    //给input框添加focus边框
    $("#Manage input").live("focus",function () {
        $(this).css({ "border": "1px solid #6db1ba" ,"outline":"none"});
    });
    $("#Manage input").live("blur",function () {
        $(this).css({ "border": "1px solid #CECECE" });
    });
    $("#Manage input").css({ "border": "1px solid #ccc", "background": "#fff" });
});

function ManageInit() {
    $("#Head_nav").remove();
    $("#Head_right").css("top", "30px");
    $("#user_manage").prev().remove().end().remove();
    $("#user_exit").before("</div><div class='back_index'>返回首页</div>");
    $("#Head_search").remove();
    $(".back_index").click(function () {
        window.location.href = baseUrl + "Home/index";
    });
   
    //左侧点击字体变色
    $(".Manage_nav div:eq(0)").css("color", "#017586");
    $(".Manage_nav div").click(function () { 
        $(".Manage_nav div").css("color","#333");
        $(this).css("color","#017586");
    });
    if (getCookie("userinf")!=null) {
        var identity = getCookie("userinf").split("#")[3];
    if (identity != 3) {
        $(".M_knowledge").siblings().remove();
        ManageKnowledge();
    } else {
        LoadUserVerifyRight(); //默认加载用户审核界面（其他如会员管理  知识管理等不是默认加载，点击后执行，所以不写在这里）
    }
    }
    
}