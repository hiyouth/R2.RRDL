/*
description : 注册模块的js
author : zzq
*/

R2.Business.Login = OpenLayers.Class({
    parentId: "",    //父元素ID
    id: "",              //自身ID 可不传
    //构造函数
    initialize: function (parentId, option) {
        this.parentId = parentId;
        OpenLayers.Util.extend(this, option);
        this.CreateLogin();
        this.CloseLogin();
        this.JudgeLogin();
        this.RegisterLogin();
    },
    //创建登录窗口
    CreateLogin: function () {
        var LoginNode =
            "<div class='Login_close'>×</div>" +
            "<div id='Login_content'>" +
                "<div class='Login_icon'></div>" +
                "<div class='Login_eare'>" +
                    "<div class='Login_input'>" +
                        "<div class='Login_name_div'>" +
                            "<span>用户名</span>" +
                            "<input type='text' class='Login_name'/>" +
                        "</div>" +
                        //"<div class='Login_error'></div>" +
                    "</div>" +
                    "<div class='Login_input'>" +
                        "<div class='Login_password_div'>" +
                            "<span>密码</span>" +
                            "<input type='password' class='Login_password'/>" +
                        "</div>" +
                        //"<div class='Login_error'></div>" +
                    "</div>" +
                    "<div class='Log_Reg'>" +
                        "<div class='Login_error'></div>" +
                        "<div class='Login_Log'>登 录</div>" +
                    "</div>" +
                "</div>" +
                "<div class='Login_Line'></div>" +
                "<div class='Login_Register'></div>" +
            "</div>";

        $("#" + this.parentId).append(LoginNode);
        //$(" .Login_error").hide();
    },
    //注册窗口关闭事件以及登录注册功能切换事件
    CloseLogin: function () {
        $(".Login_close").click(function () {
            $("#Login").remove();
        })
        $(".Login_icon").click(function () {
            if ($(".Login_Register").css("left") == "320px") {
                $(".Login_icon").css("opacity", "1");
                $(".Login_Register").animate({ "left": "600px", "opacity": "0" }, function () {
                    $(".Login_eare").animate({ "left": "255px", "opacity": "1" }, function () {
                    });
                    $(".Login_Line").animate({ "left": "210px" });                 
                })
                
            }
            if ($(".Login_eare").css("left") == "255px") {
                $(".Login_Line").animate({ "left": "240px" });
                $(".Login_eare").animate({ "left": "600px", "opacity": "0" }, function () {
                    $(".Login_Register").animate({ "left": "320px", "opacity": "0.7" });
                })
                $(".Login_icon").css("opacity", "0.7");
            }
        });
    },
    //注册登录事件
    JudgeLogin: function () {
        //登录操作判断用户名和密码（）
        $(".Login_Log").click(function () {
            if ($(".Login_name").val() == "") {
                $(".Login_error").text("用户名不能为空").addClass("errorShow");
            } else if ($(".Login_password").val() == "") {
                $(".Login_error").text("密码不能为空").addClass("errorShow");
            }
            else {
                var userName = $(".Login_name").val();
                var passWord = $(".Login_password").val();
                $.post(baseUrl + "Login/UserProfileMatchs", { "userName": userName, "passWord": passWord },function (cbdata) {
                        if (cbdata != "") {
                            var user = eval("(" + cbdata + ")");
                            if (user.AuthorityCategory == 0) {
                                $(".Login_error").text("您的账号未通过审核，暂时不能登录").addClass("errorShow");
                            }
                            else {
                                var userinf = user.Id + "#" + user.RegisterName + "#" + user.NickName +  "#" + user.AuthorityCategory + "#" + user.ContentGroupId;
                                window.localStorage.globalUserInfoStr = userinf;
                                SetCookie("userinf", userinf);
                                var flag = $("#RegLoginFlag").text();
                                if (flag == "RegLoginFlag") {
                                    $("#Login").remove();
                                    window.location.href = baseUrl + "Home/Index";
                                } else {
                                    $("#Login").remove();
                                    isLogin();
                                }
                            }
                        }
                        else {
                            $(".Login_error").text("用户名或密码错误，请重新输入").addClass("errorShow");
                            }
                    });
            }
        })
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) {
                $(".Login_Log").trigger("click");
            }
        }
        //如果已有用户名或密码错误提示，input框获得焦点时去掉此错误提示
        $(".Login_input input").focus(function () {
            $(this).prev("span").hide();
            $(".Login_error").text("").removeClass("errorShow");
            $(this).css({ "width": "208px", "height": "22px", "border": "1px solid #1d828f" });
            //文本框获得焦点时里面的字默认选中
            $(this).select();
        })
        $(".Login_name").blur(function () {
            if ($(this).val() == "") {
                $(this).prev("span").show();
            }
            $(this).css({ "width": "220px", "height": "24px", "border": "none" });
        })
        $(".Login_password").blur(function () {
            if ($(this).val() == "") {
                $(this).prev("span").show();
            }
            $(this).css({ "width": "220px", "height": "24px", "border": "none" });
        })
    },
    //注册 点击注册按钮事件
    RegisterLogin: function () {
        $(".Login_Register").click(function () {
            $("#Login").remove();
            window.location.href = baseUrl + "Register/ToRegister";

        })
    },

    CLASS_NAME: "R2.Business.Login"
})
