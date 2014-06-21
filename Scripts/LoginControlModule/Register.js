/*
*描述：完成新用户注册，定义一个register类，调用Reg_Check方法检测输入的信息是否符合规则，调用Reg_Click方法完成注册和重置的相关操作。
*create by nn 2013-10-11 20:40:51
*/
/**
*Class: R2.Business.Register
*注册业务对象类
*/
R2.Business.Register = OpenLayers.Class({
    //-----------------Property-------------------//


    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function () {
        this.Reg_Check();
        this.Reg_Click();
    },

    //自定义函数
    Reg_Check: function () {
        //用户名的格式检测
        var unameCheck = new R2.Business.NameCheck("username", { "zhengze": /^[0-9a-zA-Z\d\_]{6,12}$/, "zhengze2":/^[\_]*$/, "information1": "用户名已存在，请重新填写", "information2": "用户名不符合规则，请重新填写" });
        fouceIn("username");
        //真实姓名的格式检测
        var rnameCheck = new R2.Business.RealNameCheck("realname", { "zhengze": /^[\u4e00-\u9fa5]{2,8}$/, "information": "真实姓名不符合规则，请重新填写" });
        fouceIn("realname");
        //昵称的格式检测
        var nnameCheck = new R2.Business.NameCheck("nickname", { "zhengze": /^[\u4e00-\u9fa5\a-zA-Z\0-9]{2,8}$/, "information1": "昵称已存在，请重新填写", "information2": "昵称不符合规则，请重新填写" });
        fouceIn("nickname");
        //密码的格式检测
        var passwordCheck = new R2.Business.PwdCheck("pwd", { "num": 6, "information1": "密码至少为6位", "information2": "两次密码不一致" });
        fouceIn("pwd");
        //确认密码的格式检测
        var repasswordCheck = new R2.Business.RePwdCheck("repwd", { "num": 6, "information1": "密码至少为6位", "information2": "两次密码不一致" });
        fouceIn("repwd");
        //个人说明的格式检测
        $("#explain").blur(function () {
            $(".explain").remove();
        });
        fouceIn("explain");
    },

    Reg_Click: function () {
        //重置按钮的操作
        $("#Reg_Reset").click(function () {
            reduction("username");
            reduction("realname");
            reduction("nickname");
            reduction("pwd");
            reduction("repwd");
            reduction("explain");
        });
        //注册按钮的操作
        $("#Reg_Submit").click(function () {
            clickCheck("username", "用户名不能为空");
            clickCheck("realname", "真实姓名不能为空");
            clickCheck("nickname", "昵称不能为空");
            clickCheck("pwd", "密码不能为空");
            clickCheck("repwd", "确认密码不能为空");
            clickCheck("explain", "个人说明不能为空");
            var l = $(".Reg_Error").length;
            if (l > 0) {
            } else {
                var regname = $("#username")[0].value;
                var realname = $("#realname")[0].value;
                var nickname = $("#nickname")[0].value;
                var password = $("#pwd")[0].value;
                var explain = $("#explain")[0].value;
                var gender = $("input[name='gender']:checked").val();
                var regInfo = regname + "#" + realname + "#" + nickname + "#" + password + "#" + explain + "#" + gender;
                $.post(baseUrl + "Register/RegisterAction", { "regInfo": regInfo }, function (data) {
                    //没有返回值，模态窗口提示用户等待管理员审核    
                    if (data == "success") {
                        var alertDiv = '<div class="manage_Alert">' +
                                            '<div class="Alert_content">' +
                                                    '<div class="Alert_center">' +
                                                        '<div class="Alert_center_cont">' + "注册成功，等待管理员审核" + '</div>' +
                                                        '<div class="Alert_btn">' +
                                                            '<div class="Alert_close" id="registerModalYes">确定</div>' +
                                                            //'<div class="Alert_submit" id="userVerifyNo">取消</div>' +
                                                        '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>';
                        $("body").append(alertDiv);
                        $("#registerModalYes").live("click", function () {
                            $(".manage_Alert").remove();
                            window.location.href = baseUrl + "Home/index";
                        });
                    } 
                });
            }
        });
    },
    CLASS_NAME: "R2.Business.Register"
});
/**
*Class: R2.Business.NameCheck
*检测用户名和昵称业务对象类
*/
R2.Business.NameCheck = OpenLayers.Class({
    //-----------------Property-------------------//
    value: "",
    zhengze: null,
    zhengze2: null,
    information1: "",
    information2: "",

    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function (value, option) {
        this.value = value;
        OpenLayers.Util.extend(this, option);
        this.check();
    },

    //自定义函数
    check: function () {
        var obj = this;
        $("#" + obj.value).blur(function () {
            $("." + obj.value).remove();
            var val = $("#" + obj.value).val();
            if (val != "") {
                $("." + obj.value + "Inf").hide();
            } else {
                switch (obj.value) {
                    case "username":
                        reduction("username");
                        break;
                    case "nickname":
                        reduction("nickname");
                        break;
                }
            }
            //if (val == obj.data) {
            //$("#" + obj.value).after("<span class='Reg_Error " + obj.value + "'>" + obj.information1 + "</span>");
            var url;
            switch (obj.value) {
                case "username":
                    url = baseUrl + "Register/UserNameIsExist";
                    break;
                case "nickname":
                    url = baseUrl + "Register/NickNameIsExist";
                    break;
            }
            $.post(url, { "name": val }, function (flag) {
                if (flag == "true") {
                    $("#" + obj.value).after("<span class='Reg_Error " + obj.value + "'>" + obj.information1 + "</span>");
                } else {
                    switch(obj.value){
                        case "username":
                            var regUname = obj.zhengze;
                            var regUname2 = obj.zhengze2;
                            if (regUname2.test(val) && val != "") {
                                $("#" + obj.value).after("<span class='Reg_Error " + obj.value + "'>用户名不能全为下划线</span>");
                            } else if (!regUname.test(val) && val != "") {
                                $("#" + obj.value).after("<span class='Reg_Error " + obj.value + "'>" + obj.information2 + "</span>");
                            } else if (val != "") {
                                $("#" + obj.value).after("<div class='Reg_Right " + obj.value + "'></div>");
                            }
                            break;
                        case "nickname":
                            var regUname = obj.zhengze;
                            if (val.indexOf(" ") != -1) {
                                $("#" + obj.value).after("<span class='Reg_Error " + obj.value + "'>昵称中不能含有空格</span>");
                            }else if (!regUname.test(val) && val != "") {
                                $("#" + obj.value).after("<span class='Reg_Error " + obj.value + "'>" + obj.information2 + "</span>");
                            } else if (val != "") {
                                $("#" + obj.value).after("<div class='Reg_Right " + obj.value + "'></div>");
                            }
                            break;
                    }
                }
            });
            //if (val == obj.data) {
            //    $("#" + obj.value).after("<span class='Reg_Error " + obj.value + "'>" + obj.information1 + "</span>");
            //} else {
            //    var regUname = obj.zhengze;
            //    if (!regUname.test(val) && val != "") {
            //        $("#" + obj.value).after("<span class='Reg_Error " + obj.value + "'>" + obj.information2 + "</span>");
            //    } else if (val != "") {
            //        $("#" + obj.value).after("<div class='Reg_Right " + obj.value + "'></div>");
            //    }
            //}
        });
    },

    CLASS_NAME: "R2.Business.NameCheck"
});
/**
*Class: R2.Business.RealNameCheck
*检测真实姓名业务对象类
*/
R2.Business.RealNameCheck = OpenLayers.Class({
    //-----------------Property-------------------//
    value: "",
    zhengze: null,
    information: "",
    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function (value, option) {
        this.value = value;
        OpenLayers.Util.extend(this, option);
        this.check();
    },

    //自定义函数
    check: function () {
        var v = this.value;
        var z = this.zhengze;
        var i = this.information;
        $("#" + v).blur(function () {
            $("." + v).remove();
            var val = $("#" + v).val();
            if (val != "") {
                $("." + v + "Inf").hide();
            } else {
                reduction("realname");
            }
            var regUname = z;
            if (!regUname.test(val) && val != "") {
                $("#" + v).after("<span class='Reg_Error " + v + "'>" + i + "</span>");
            } else if (val != "") {
                $("#" + v).after("<div class='Reg_Right " + v + "'></div>");
            }
        });
    },

    CLASS_NAME: "R2.Business.RealNameCheck"
});
/**
*Class: R2.Business.PwdCheck
*检测密码业务对象类
*/
R2.Business.PwdCheck = OpenLayers.Class({
    //-----------------Property-------------------//
    value: "",
    num: 0,
    information1: "",
    information2: "",
    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function (value, option) {
        this.value = value;
        OpenLayers.Util.extend(this, option);
        this.check();
    },

    //自定义函数
    check: function () {
        var v = this.value;
        var n = this.num;
        var i1 = this.information1;
        var i2 = this.information2;
        $("#" + v).blur(function () {
            $("." + v).remove();
            var val = $("#" + v).val();
            var reval = $("#repwd").val();
            if (val != "") {
                $("." + v + "Inf").hide();
            } else {
                reduction("pwd");
            }
            if (val.indexOf(" ")!=-1) {
                $("#" + v).after("<span class='Reg_Error " + v + "'>密码中不能含有空格</span>");
            } else if (val.length < n && val != "") {
                $("#" + v).after("<span class='Reg_Error " + v + "'>" + i1 + "</span>");
            } else if (val != reval && val != "" && reval != "") {
                $("#" + v).after("<span class='Reg_Error " + v + "'>" + i2 + "</span>");
            }else if (val != "") {
                $("#" + v).after("<div class='Reg_Right " + v + "'></div>");
            }
            if (val == reval && val != "" && reval != "") {
                $(".repwd").remove();
                $("#repwd").after("<div class='Reg_Right repwd'></div>");
            }
        });
    },

    CLASS_NAME: "R2.Business.PwdCheck"
});
/**
*Class: R2.Business.RePwdCheck
*检测确认密码业务对象类
*/
R2.Business.RePwdCheck = OpenLayers.Class({
    //-----------------Property-------------------//
    value: "",
    num: 0,
    information1: "",
    information2: "",
    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function (value, option) {
        this.value = value;
        OpenLayers.Util.extend(this, option);
        this.check();
    },

    //自定义函数
    check: function () {
        var v = this.value;
        var n = this.num;
        var i1 = this.information1;
        var i2 = this.information2;
        $("#" + v).blur(function () {
            $("." + v).remove();
            var val = $("#" + v).val();
            if (val != "") {
                $("." + v + "Inf").hide();
            } else {
                reduction("repwd");
            }
            var pwd = $("#pwd").val();
            if (val.indexOf(" ") != -1) {
                $("#" + v).after("<span class='Reg_Error " + v + "'>密码中不能含有空格</span>");
            } else if (val.length < n && val != "") {
                $("#" + v).after("<span class='Reg_Error " + v + "'>" + i1 + "</span>");
            } else if (val != pwd && val != "" && pwd!="") {
                $("#" + v).after("<span class='Reg_Error " + v + "'>" + i2 + "</span>");
            } else if (val != "" && val.length >= n) {
                $("#" + v).after("<div class='Reg_Right " + v + "'></div>");
            }
            if (val == pwd && val != "" && pwd != "") {
                $(".pwd").remove();
                $("#pwd").after("<div class='Reg_Right pwd'></div>");
            }
        });
    },

    CLASS_NAME: "R2.Business.RePwdCheck"
});
$(function () {
    var myRegister = new R2.Business.Register();
});
//输入框获得焦点时，清掉提示信息，显示输入规范
function fouceIn(inf) {
    $("#" + inf).click(function () {
        $("." + inf).remove();
        $("." + inf + "Inf").show();
    });
}
//重置还原输入框默认值
function reduction(value) {
    $("#" + value).val("");
    $("." + value).remove();
    $("." + value + "Inf").show();
}
//点击注册按钮检测输入信息是否为空
function clickCheck(value, information) {
    var val = $("#" + value).val();
    if (val == "") {
        $("." + value).remove();
        $("." + value + "Inf").hide();
        $("#" + value).after("<span class='Reg_Error " + value + "'>" + information + "</span>");
    }
}