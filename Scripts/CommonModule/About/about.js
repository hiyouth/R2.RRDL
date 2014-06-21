$(function () {
    $.get(baseUrl + "ContactPerson/GetAllContact?" + new Date().toLocaleTimeString(), {}, function (cbdata) {
        var list = eval("(" + cbdata + ")");
        window.contactuserList = list;
    });
    $(".About_item:gt(1)").hide();
    $(".Manage_nav div:eq(0)").css("color", "#017586");
    $(".Manage_nav div").click(function () {
        var index = $(".Manage_nav div").index($(this));
        switch (index) {
            case 0:
                if ($("#projInfoContentDiv").css("display") == "block") {
                    $("#projInfoContentDiv").css("display", "none");
                }
               // document.frames[0].location.href = "";
                $(".About_item:eq(1)").add(".About_item:eq(0)").show();
                $(".About_item:gt(1)").hide();
                $(".Manage_nav div:eq(" + index + ")").css("color", "#017586").siblings().css("color", "#333");
                break;
            case 1:
                //document.frames[0].location.href = baseUrl + "ProjectFiles/EntryGuide/互联网R2Team新员工入职指南.mht";
                if ($("#projInfoContentDiv").css("display") == "block") {
                    $("#projInfoContentDiv").css("display", "none");
                }
                $("#entryGuideIframe").attr("src", baseUrl+"ProjectFiles/EntryGuide/互联网R2Team新员工入职指南.mht");                
                $(".About_item:eq(2)").show();
                $(".About_item:gt(2)").add(".About_item:lt(2)").hide();
                $(".Manage_nav div:eq(" + index + ")").css("color", "#017586").siblings().css("color", "#333");
                break;
            //case 2:
            //    if ($("#projInfoContentDiv").css("display") == "block") {
            //        $("#projInfoContentDiv").css("display", "none");
            //    }
            //   // document.frames[0].location.href = "";
            //    $(".About_item:eq(3)").show();
            //    $(".About_item:gt(3)").add(".About_item:lt(3)").hide();
            //    $(".Manage_nav div:eq(" + index + ")").css("color", "#017586").siblings().css("color", "#333");
            //    break;
            case 2:
                if ($("#projInfoContentDiv").css("display") == "block") {
                    $("#projInfoContentDiv").css("display", "none");
                }
               // document.frames[0].location.href = "";
                //$(".About_item:eq(4)").add(".About_item:eq(5)").show();
                //$(".About_item:gt(5)").add(".About_item:lt(4)").hide();
                $(".About_item").hide();
                $(".About_item:eq(3)").show();
                $(".About_item:eq(4)").show();
                $(".Manage_nav div:eq(" + index + ")").css("color", "#017586").siblings().css("color", "#333");
                break;
            case 3:
                if ($("#projInfoContentDiv").css("display") == "block") {
                    $("#projInfoContentDiv").css("display", "none");
                }
                // document.frames[0].location.href = "";
                $(".About_item").eq(5).show().siblings().hide();
                $(".Manage_nav div:eq(" + index + ")").css("color", "#017586").siblings().css("color", "#333");
                var contactuserlist = new R2.Business.Managecontactuser();
            default:
                break;
        }

    });

    
});
R2.Business.Managecontactuser = OpenLayers.Class({
    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function () {
        this.initRight();
    },
    //搭建右侧功能区
    initRight: function () {
        var Right =
        '<div class="group_manage">' +

            '<div class="group_tree_manage select_group_manage">' +
            '</div>' +
        '</div>';
        $("#mycontactuser").html(Right);
        //获得已有的内容分组，并插入div中
        var Group = "";
        for (var i = 0; i < window.contactuserList.length; i++) {
            Group += '<div class="group_tree_type1"><ul style="float:left">' +
                '<li><label class="leftlabel" style="color:#398439">Phone：</label><label>' + window.contactuserList[i].PhoneNumber + '</label></li>' +
            '<li><label class="leftlabel" style="color:#398439">QQ：</label><label>' + window.contactuserList[i].QQ + '</label></li>' +
            '<li><label  class="leftlabel" style="color:#398439">PEmail：</label><label>' + window.contactuserList[i].Email + '</label></li>' +
            '<li><label class="leftlabel" style="color:#398439">CEmail：</label><label>' + window.contactuserList[i].CompanyEmail + '</label></li>' +
            '<li><label class="leftlabel" style="color:#398439">Addr：</label><label>' + window.contactuserList[i].Address + '</label></li>' +
            '<li><label class="leftlabel" style="color:#398439">Team：</label><label>' + window.contactuserList[i].UserGroupName + '</label></li>' +
            '</ul><div class="myname" style="float:right">' + window.contactuserList[i].Name + '</div></div>';
        };
        $(".select_group_manage").append(Group);
    },
    CLASS_NAME: "R2.Business.Managecontactuser"
});