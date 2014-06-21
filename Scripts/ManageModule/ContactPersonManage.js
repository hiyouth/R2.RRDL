/*
描述：用于管理录界面的管理
author： 黄圣  2014年04月24日
*/
/*
*/
$(function () {
    $(".M_contact").click(function () {
        $(".group_add").die("click");
        $(".group_dele").die("click");
        $(".group_rename").die("click");
        $("#Manage_right").empty();
        var nowdate = new Date().toLocaleTimeString();
        $.get(baseUrl + "ContactPerson/GetAllContact?date="+nowdate, {}, function (cbdata) {
            var list = eval("(" + cbdata + ")");
            window.UserGroupList = list;
            var ManageTree = new R2.Business.ManageKnowledge1();
        });
        $.post(baseUrl + "UserVerify/GetAllUser?date=" + nowdate, {}, function (cbdata) {
            window.list = eval("(" + cbdata + ")");
        });
    });
});
function clickCheck(value, information) {
    var val = $("#" + value).val();
    if (val == "") {
        $("." + value).remove();
        $("." + value + "Inf").hide();
        $("#" + value).after("<span class='Reg_Error " + value + "'>" + information + "</span>");
    }
}

R2.Business.ManageKnowledge1 = OpenLayers.Class({
    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function () {
        this.initRight();

        this.group_Click();
        this.initMGTree();
        this.AlertClose();
    },
    //搭建右侧功能区
    initRight: function () {
        var Right =
        '<div class="group_manage">' +
            '<div class="group_manage_title">请选择团队成员</div>' +
            '<div class="group_tree_manage select_group_manage">' +
                '<div class="group_add"></div>' +
            '</div>' +
            '<div class="group_manage_title group_manage_title2">请选择对应操作</div>' +
            '<div class="group_manage_content">' +
                '<div class="group_rename">编辑</div>' +
                '<div class="group_dele">删除</div>' +
            '</div>' +
        '</div>';
        $("#Manage_right").html(Right);
        $(".group_manage_title2, .group_manage_content").hide();
        //获得已有的内容分组，并插入div中
        var Group = "";
        for (var i = 0; i < window.UserGroupList.length; i++) {
            Group += '<div class="group_tree_type">' + window.UserGroupList[i].Name + '<div class="group_tree_type_hover_bg"></div></div><input type="hidden" value=' + window.UserGroupList[i].ID + ' class="id">';
        };
        $(".select_group_manage").append(Group);
    },
    //点击某一内容分组后，内容分类可选，点击内容分类后加载此分类的目录树
    initMGTree: function () {
        $(".select_group_manage .group_tree_type").click(function () {
            //判断内容分组是否选中，如果已经选中 那么取消选中，下方选中的内容分类和目录树也去掉
            if ($(this).hasClass("group_tree_type_hover")) {
                $(".group_tree_type").removeClass("group_tree_type_hover");
                $(".group_tree_type_hover_bg").css("display", "none");
                $(".group_manage_title2, .group_manage_content").hide();
            } else {
                $(this).addClass("group_tree_type_hover").siblings().removeClass("group_tree_type_hover");
                $(".group_tree_type_hover_bg").css("display", "none");
                $(this).children(".group_tree_type_hover_bg").css("display", "block");
                //点击某一内容分类，后面加上 新建 重命名 删除等按钮
                $(".group_manage_title2, .group_manage_content").show();
                window.userGroupId = $(".id").eq($(".select_group_manage .group_tree_type").index(this)).val();
            }
        });
    },
    //新建、重命名、删除分组 事件
    group_Click: function () {
        var that = this;
        var clickIndex = "";
        $(".group_add").live("click", function () {
            $(".group_tree_type").removeClass("group_tree_type_hover");
            $(".group_tree_type_hover_bg").css("display", "none");
            $(".group_manage_title2, .group_manage_content").hide();
            clickIndex = 0;
            that.Alertdiv(clickIndex);
        });
        $(".group_rename").live("click", function () {
            clickIndex = 1;
            that.Alertdiv(clickIndex);
        });
        $(".group_dele").live("click", function () {
            clickIndex = 2;
            that.Alertdiv(clickIndex);
        });
    },
    Getuser: function () {
        var list='';
        while(list==''){
            $.get(baseUrl + "UserVerify/GetAllUser", {}, function (cbdata) {
                list = eval("(" + cbdata + ")"); 
            });
        };
        return list;
    },
    //板子
    Alertdiv: function (clickIndex) {

        var that = this;
        var temp_center = "";
        var nowName = $(".select_group_manage .group_tree_type_hover"+" + input").val();
        var i;
        if (clickIndex == 0) {
            var userlist = '';
            for (i = 0; i <list.length; i++) {
                userlist += '<option  groupname="' + list[i].UserGroup + '" value="' + list[i].Id + '">' + list[i].RealName + '</option>';
            };
            temp_center = '<div class="contact_float_left"><div class="contact_bg">姓名：<select class="form-control" style="padding:0px;" name="Name" id="myselect"  ><option value ="">请选择名称</option>' + userlist + '</select> </div>' +
            '<div class="contact_bg">团队：<input type="text" readonly="" id="UserGroupName" name="UserGroupName" style="color:#FF6400"  class="form-control Alert_newGroup"/> </div>' +
            '<div class="contact_bg">电话：<input type="text" id="PhoneNumber" name="PhoneNumber" class="form-control Alert_newGroup"/> </div></div>' +
            '<div class="contact_float_left"><div class="contact_bg">邮箱：<input type="text" id="Emal" name="Emal" class="form-control Alert_newGroup"/> </div>' +
            '<div class="contact_bg">Q  Q：<input type="text" id="QQ" name="QQ" class="form-control Alert_newGroup"/> </div>' +
            '<div class="contact_bg">地址：<input type="text" id="Address" name="Address" class=" form-control Alert_newGroup"/> </div></div>' +
            '<div class="contact_float_left"><div class="contact_bg">公司邮箱：<input type="text" id="CompanyEmail" name="CompanyEmail" class="form-control Alert_newGroup"/> </div><div class="contact_bg">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：<textarea style="height:122px;" class="form-control Alert_newGroup" id="desc" name="desc"></textarea><lable class="contact_error2"></lable></div></div>';
        } else if (clickIndex == 1) {
            var ii = $(".group_tree_type_hover" + " + input").val();
            var model;
            for (i = 0; i < window.UserGroupList.length; i++) {
                if (ii == window.UserGroupList[i].ID) {
                    model = UserGroupList[i];
                    break;
                }
            }
            var PhoneNumber = model.PhoneNumber;
            var CompanyEmail = model.CompanyEmail;
            var ID = model.ID;
            var UserGroupName = model.UserGroupName;
            var Name = model.Name;
            var Emal = model.Email;
            var QQ = model.QQ;
            var Address = model.Address;
            var desc = model.desc; 
            temp_center = '<div class="contact_float_left"><div class="contact_bg">姓名：<font class="contactInformation_value">' + Name + '</font></div>' +
            '<div class="contact_bg">团队：<font class="contactInformation_value">' + UserGroupName + '</font> </div>' +
            '<div class="contact_bg">电话：<input type="text" id="PhoneNumber" name="PhoneNumber" class="form-control Alert_newGroup" value="' + PhoneNumber + '"/> </div></div>' +
            '<div class="contact_float_left" ><div class="contact_bg">邮件：<input type="text" id="Emal" name="Emal" class="form-control Alert_newGroup" value="' + Emal + '"/> </div>' +
            '<div class="contact_bg">Q  Q：<input type="text" id="QQ" name="QQ" class="form-control Alert_newGroup"  value="' + QQ + '"/> </div>' +
            '<div class="contact_bg">地址：<input type="text" id="Address" name="Address" class="form-control Alert_newGroup" value="' + Address + '"/> </div></div>' +
            '<div class="contact_float_left"><div class="contact_bg">公司邮箱：<input type="text" id="CompanyEmail" name="CompanyEmail" class="form-control Alert_newGroup" value="' + CompanyEmail + '"/> </div><div class="contact_bg">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：<textarea style="height:122px;" class="form-control Alert_newGroup"  id="desc" name="desc" value="">' + desc + '</textarea><lable class="contact_error2"></lable></div></div>';
        } else {
            temp_center = '';
        }
        var alertDiv =
        '<div class="manage_Alert_contact">' +
            '<div class="Alert_content_contact">' +
                '<div class="Alert_center_contact">' +
                    '<div class="Alert_center_cont_contact">' + temp_center +
                        '<div class="contact_float_left"><div class="Alert_submit1">确 定</div></div>' +
                '</div>' +
                '<div class="Alert_close">×</div>' +
            '</div>' +
        '</div>';
        $("body").append(alertDiv);
        $("#myselect").change(function () {
            $("#UserGroupName").removeAttr("readonly");
            if ($("#myselect").val() == "") {
                $("#UserGroupName").val("").attr("readonly", "readonly");
                return false;
            }
            else {
             var usergroupname = $("#myselect option:selected").attr("groupname");
             $("#UserGroupName").val(usergroupname).attr("readonly", "readonly");
             return false;
            }
        });
        if (clickIndex == 0) {
            that.group_add();
        } else if (clickIndex == 1) {
            that.group_rename();
        } else {
            that.group_dele(nowName);
        }
    },

    //新建事件
    group_add: function () {
        var obj = this;
        check_contact("PhoneNumber", /^(\+\d{2,3}\-)?\d{11}$/, "格式不对");
        check_contact("Emal", /^\w{3,}@\w+(\.\w+)+$/, "格式不对");
        check_contact("CompanyEmail", /^\w{3,}@\w+(\.\w+)+$/, "格式不对");
        check_contact("QQ", /^[-+]?\d+$/, "格式不对");
        check_contact1("Address");
        check_contact1("desc");
        fouceIn("PhoneNumber");
        fouceIn("Emal");
        fouceIn("CompanyEmail");
        fouceIn("QQ");
        fouceIn("Address");

        $("#myselect").change(function () {
            $("#myselect" + " + span").remove();
            if ($("#myselect").val() == "") {
                $("#myselect").after("<span class='contact_error1'>请选择</span>");
            }
            else if (iscontacthas()) {
                $("#myselect").after("<span class='contact_error1'>已添加</span>");
                return false;
            }
                 else {
                $("#myselect" + " + span").remove();
            }
        });
        $(".Alert_submit1").click(function () {
            $("#myselect").trigger("change");
            var ID = $("#myselect").val();
            var Name = $("#myselect option:selected").text();
            var UserGroupName = $("#UserGroupName").val();
            var PhoneNumber = $("#PhoneNumber").val();
            var Emal = $("#Emal").val();
            var CompanyEmail = $("#CompanyEmail").val();
            var QQ = $("#QQ").val();
            var Address = $("#Address").val();
            var desc = $("#desc").val();
            if (desc == "") desc = " ";
            ischeck_null("PhoneNumber");
            ischeck_null("Emal");
            ischeck_null("CompanyEmail");
            ischeck_null("QQ");
            ischeck_null("Address");
            var l = $(".contact_error").length;
            if (l >0) {
            }
            else {
                if (ID =="") {
                    return false;
                }
                if ($("#myselect" + " + span").text() == "已添加") return false;
                $.get(baseUrl + "ContactPerson/Add?date=" + new Date().toLocaleTimeString(),
                    { "Name": Name, "ID": ID, "UserGroupName": UserGroupName, "PhoneNumber": PhoneNumber, "Email": Emal, "QQ": QQ, "Address": Address, "desc": desc, "CompanyEmail": CompanyEmail }, function (cbdata) {
                        if (cbdata == "false") {
                            $("#desc" + " + lable").text("添加错误，请联系管理员");
                            return false; 
                        } else { 
                    var data = eval("(" + cbdata + ")");
                    var Group = "";
                    Group += '<div class="group_tree_type">' + data.Name + '<div class="group_tree_type_hover_bg"></div></div><input type="hidden" value=' + data.ID + ' class="id">';
                    $(".select_group_manage").append(Group);
                    window.UserGroupList.push(data);
                    $(".select_group_manage .group_tree_type").unbind("click");
                    $(".select_group_manage .group_tree_type").click(function () {
                        //判断内容分组是否选中，如果已经选中 那么取消选中，下方选中的内容分类和目录树也去掉
                        if ($(this).hasClass("group_tree_type_hover")) {
                            $(".group_tree_type").removeClass("group_tree_type_hover");
                            $(".group_manage_title2, .group_manage_content").hide();
                        } else {
                            $(this).addClass("group_tree_type_hover").siblings().removeClass("group_tree_type_hover");
                            $(".group_tree_type_hover_bg").css("display", "none");
                            $(this).children(".group_tree_type_hover_bg").css("display", "block");
                            //点击某一内容分类，后面加上 新建 重命名 删除等按钮
                            $(".group_manage_title2, .group_manage_content").show();
                            window.userGroupId = $(".id").eq($(".select_group_manage .group_tree_type").index(this)).val();
                        }
                    });
                    $(".manage_Alert_contact").remove();
                        }
                });
                
            }
        });
    },
    //重命名事件
    group_rename: function () {
        var obj = this;
        check_contact("PhoneNumber", /^(\+\d{2,3}\-)?\d{11}$/, "格式不对");
        check_contact("Emal", /^\w{3,}@\w+(\.\w+)+$/, "格式不对");
        check_contact("CompanyEmail", /^\w{3,}@\w+(\.\w+)+$/, "格式不对");
        check_contact("QQ", /^[-+]?\d+$/, "格式不对");
        fouceIn("PhoneNumber");
        fouceIn("Emal");
        fouceIn("CompanyEmail");
        fouceIn("QQ");
        fouceIn("Address");
        $(".Alert_submit1").click(function () {
            ischeck_null("PhoneNumber");
            ischeck_null("Emal");
            ischeck_null("CompanyEmail");
            ischeck_null("QQ");
            ischeck_null("Address");
            var l = $(".contact_error").length;
            if (l > 0) {
            }
            else {
                var ID = $(".group_tree_type_hover" + " + input").val();
                var Name = $(".contactInformation_value").eq(0).text();
                var UserGroupName = $(".contactInformation_value").eq(1).text();
                var PhoneNumber = $("#PhoneNumber").val();
                var Emal = $("#Emal").val();
                var CompanyEmail = $("#CompanyEmail").val();
                var QQ = $("#QQ").val();
                var Address = $("#Address").val();
                var desc = $("#desc").val();
                $.get(baseUrl + "ContactPerson/Edit?date=" + new Date().toLocaleTimeString(),
    { "Name": Name, "ID": ID, "UserGroupName": UserGroupName, "PhoneNumber": PhoneNumber, "Email": Emal, "QQ": QQ, "Address": Address, "desc": desc, "CompanyEmail": CompanyEmail }, function (cbdata) {
        if (cbdata == "flase") {
            $("#desc" + " + lable").text("添加错误，请联系管理员");
        } else { 
        $(".manage_Alert_contact").remove();
        $(".M_contact").trigger("click");
        }
    });
            }
        });
    },

    //删除事件
    group_dele: function (nowName) {
        $(".manage_Alert_contact").remove();
        var alertDiv=
        '<div class="manage_Alert">' +
           '<div class="Alert_content">' +
               '<div class="Alert_center">' +
                   '<div class="Alert_center_cont">' + '确定要删除该成员的联系信息吗？' + '</div>' +
                   '<div class="Alert_btn">' +
                       '<div class="Alert_submit">确 定</div>' +
                   '</div>' +
               '</div>' +
               '<div class="Alert_close">×</div>' +
           '</div>' +
       '</div>';
        $("body").append(alertDiv);
        $(".Alert_submit").live("click", function () {
            $.post(baseUrl + "ContactPerson/Delete?date=" + new Date().toLocaleTimeString(), { "id": nowName }, function (cbdata) {
                $(".manage_Alert").remove();
                $(".M_contact").trigger("click");

            });
        });
    },
    //弹出框关闭事件
    AlertClose: function () {
        $(".Alert_close").live("click", function () {
            $(".manage_Alert_contact").remove();
            $(".manage_Alert").remove();

        });
    },
    CLASS_NAME: "R2.Business.ManageKnowledge"
});

function check_contact(id,reg,information) {
    $("#" + id).blur(function () {
        $("#" + id + " + span").remove();
        var value=$("#" + id).val();
        if(value==""){     
        }
        else if(!reg.test(value)){
                $("#" + id).after("<span class='contact_error'>"+information+"</span>");
            }
    });
}
function fouceIn(id) {
    $("#" + id).click(function () {
        $("#" + id + " + span").remove();
    });
}

function ischeck_null(id) {
    if ($("#" + id).val() == "") {
        $("#" + id+" + span").remove();
        $("#" + id).after("<span class='contact_error'>不能为空</span>");
        }
}
function check_contact1(id) {
    $("#" + id).blur(function () {
        $("#" + id + " + span").remove();
    });
}
function iscontacthas(){
    var ishas=false;
    for (var i = 0; i < window.UserGroupList.length; i++) {
        if ($("#myselect").val() == window.UserGroupList[i].ID) {
            ishas=true;
        }
    }
    return ishas;
}
