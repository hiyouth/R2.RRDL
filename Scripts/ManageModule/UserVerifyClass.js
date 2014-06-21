/*******************************************************************************
*Class: R2.Business.UserVerify
*created by ZHAOs 2013年10月16日19:34:39
*这是超级管理员的管理中心里的用户管理部分，包括新用户审核
******************************************************************************/
var pageControl;
R2.Business.UserVerify = OpenLayers.Class({
    initialize: function (sth1, option) {
        OpenLayers.Util.extend(this, option);
    },
createRightUpper: function () {        
    $("#Manage_right").empty();
    var rightStr = "<div id='user_verify_right'>" +
                        "<div id='upper'>" +
                            '<input type="text" value="新会员昵称、真实姓名" onfocus="if(value==defaultValue) {value=' + "''" + '}"' +
                                'onblur="if(!value) value=defaultValue" id="upperSearch"/>' +
                            '<div id="UserSearch"></div>' +
                            "<table class='pages'>" +
                                "<tr>" +
                                    "<td class='cell' id='firstPage'>第一页</td>" +
                                    "<td class='cell' id='prePage'>上一页</td>" +
                                    "<td id='pageInfo' class='cell'></td>" +
                                    "<td class='cell' id='nextPage'>下一页</td>" +
                                    "<td class='cell' id='lastPage'>最后一页</td>" +
                                "</tr>" +
                            "</table>" +
                        "</div>" +
                        "<div id='lower' >" +                                       
                        "</div>" +
                        "</div>";
    $("#Manage_right").append(rightStr);
    //initupperSearch();
    $(".Search_DetectResultDiv").css({ "position": "absolute", "z-index": "2000", "margin-top": "35px", "border": "1px solid #ccc" });
    //UserSearch();
    newUserSearchInit();
},
createRightLower: function () {                   
        pageControl = new R2.Control.PageControl(baseUrl + "UserVerify/GetUsersToBeVerified", {
            "countPerPage": 20,
            "firstPageID": "firstPage",
            "previousPageID": "prePage",
            "pageInfID": "pageInfo",
            "nextPageID": "nextPage",
            "lastPageID": "lastPage",
            "callback": PageControlOnSuccess
        });
},
//给三种情况下的左右方向按钮注册事件
middleSwitch: function () {             
    $(".UVAlertWindow_left_green").live("click", function () {
        if (window.localStorage.uv_middle_switch_flag == 0) {
            window.localStorage.uv_middle_switch_flag = 0;
        }
        if (window.localStorage.uv_middle_switch_flag == 1) {
            $(".unselectOne").removeClass("unselectOne").addClass("selectOne");
            $(".selectTwo").removeClass("selectTwo").addClass("unselectTwo");
            $(".title").eq(3).removeClass("select");
            $(".title").eq(0).addClass("select");            
            $(".UVshow").animate({ left: '0px' }, 500);
            $(".UVAlertWindow_left_green").removeClass("UVAlertWindow_left_green").addClass("UVAlertWindow_left_gray");
            window.localStorage.uv_middle_switch_flag = 0;
        }
        if (window.localStorage.uv_middle_switch_flag == 2) {
            $(".unselectTwo").removeClass("unselectTwo").addClass("selectTwo");
            $(".selectThree").removeClass("selectThree").addClass("unselectThree");
            $(".title").eq(6).removeClass("select");
            $(".title").eq(3).addClass("select");
            $(".UVshow").animate({ left: '-770px' }, 500);
            $(".UVAlertWindow_left_gray").removeClass("UVAlertWindow_left_gray").addClass("UVAlertWindow_left_green");
            $(".UVAlertWindow_right_gray").removeClass("UVAlertWindow_right_gray").addClass("UVAlertWindow_right_green");
            window.localStorage.uv_middle_switch_flag = 1;            
        }       
    });
    $(".UVAlertWindow_right_green").live("click", function () {
        if (window.localStorage.uv_middle_switch_flag == 0) {
            $(".selectOne").removeClass("selectOne").addClass("unselectOne");
            $(".unselectTwo").removeClass("unselectTwo").addClass("selectTwo");
            $(".title").eq(0).removeClass("select");
            $(".title").eq(3).addClass("select");
            $(".UVAlertWindow_left_gray").removeClass("UVAlertWindow_left_gray").addClass("UVAlertWindow_left_green");
            $(".UVshow").animate({ left: '-770px' }, 500);
            $(".UVAlertWindow_left_gray").addClass("UVAlertWindow_left_green");
            window.localStorage.uv_middle_switch_flag = 1;            
        }
        else if (window.localStorage.uv_middle_switch_flag == 1) {
            $(".selectTwo").removeClass("selectTwo").addClass("unselectTwo");
            $(".unselectThree").removeClass("unselectThree").addClass("selectThree");
            $(".title").eq(3).removeClass("select");
            $(".title").eq(6).addClass("select");
            $(".UVshow").animate({ left: '-1540px' }, 500);

            $(".UVAlertWindow_right_green").removeClass("UVAlertWindow_right_green").addClass("UVAlertWindow_right_gray");
            window.localStorage.uv_middle_switch_flag = 2;           
        }
        else if (window.localStorage.uv_middle_switch_flag == 2) {
            window.localStorage.uv_middle_switch_flag = 2;
        }        
    });
},
boardEventRegister: function () {        
    $("#lower .userInfo").live("mouseenter", function () {
        $(this).find(".img_name").css("background-color", "#026673");                        
        $(this).find(".userImg").css("background-position", "0 -30px");
        $(this).find(".userName").css("color","White");
    });        
    $("#lower .userInfo").live("mouseleave", function () {
        var elem = $(this).find(".img_name");
        var index = $(".userInfo").index($(this));            
        $(this).find(".img_name").css("background-color", "#E4E4E4");                
        $(this).find(".userName").css("color", "#026673");                
        $(this).find(".userImg").css({ "background-position": "0 0" });
    });
},
createMiddle: function () {
    $("#lower .userInfo").live("click", function () {
        window.localStorage.uv_currentUserId = $(this).find(".userId").text();
        window.localStorage.uv_middle_switch_flag = 0;
        window.uv_currentUserCategory = "";
        $.post(baseUrl + "UserVerify/GetAUserInfo", { "userId": window.localStorage.uv_currentUserId }, function (data) {
            var userObj = eval("(" + data + ")");
            var genderStr = "";
            if (userObj.Gender == "M") {
                genderStr="男";
            }
            else if (userObj.Gender == "F") {
                genderStr = "女";
            }
            var alertDiv =
           '<div class="UVAlertWindow">' +
               '<div class="UVAlertWindow_content">' +
                   '<div class="UVAlertWindow_main">' +
                   '<div class="UVAlertWindow_left_gray"></div>' +
                   '<div class="UVAlertWindow_center">' +
                       '<div class="UVAlertWindow_top">' +
                           '<font class="title select" style=" margin-left:50px;"><div class="title selectOne"></div>&nbsp;&nbsp;基本信息&nbsp;&nbsp</font><div class="title line"></div>' +
                           '<font class="title"><div class="title unselectTwo"></div>&nbsp;&nbsp;选择分组&nbsp;&nbsp</font><div class="title line"></div> ' +
                           '<font class="title"><div class="title unselectThree"></div>&nbsp;&nbsp;审核结果&nbsp;&nbsp</font>' +
                       '</div>' +
                       '<div class="UVshow">' +
                       '<div class="UVAlertWindow_information">' +
                           '<div class="information_line1">' +
                               '<div class="userInformation_span"><font class="userInformation_title">用&nbsp;户&nbsp;名：</font><font class="userInformation_value">' + userObj.RegisterName + '</font></div><div class="userInformation_span"><font class="userInformation_title">真实姓名：</font><font class="userInformation_value">' + userObj.RealName + '</font></div>' +
                               '<div class="userInformation_span"><font class="userInformation_title">昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</font><font class="userInformation_value">' + userObj.NickName + '</font></div><div class="userInformation_span">' + '<font class="userInformation_title">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</font><font class="userInformation_value">' + genderStr + '</font></div>' +
                          '</div>' +
                           '<div class="information_line3">' +
                               '<font class="userInformation_title" style="float:left; height:20px; line-height:20px;">个人说明：</font><div class="userInformation_value" style="clear:both;position:relative;left:80px;top:-22px; max-width:550px; font-size:16px;color:#017586;line-height:24px;">' + userObj.PersonalDescription + '</div>' +
                           '</div>' +
                       '</div>' +

                       '<div class="UVAlertWindow_information2" style=" width:700px; margin-left:180px; float:left;">' +
                      '<div style=" margin-top:-30px;overflow:hidden;" id="UserGroupList">' +
                          '</div>' +
                     '</div>' +
                  '<div class="UVAlertWindow_information" style=" width:700px; height:200px; margin-top:35px; margin-left:120px; float:left;">' +
                               '<div id="uv_submit" class="uv_button">通&nbsp;&nbsp;&nbsp;过</div>' +
                               '<div id="uv_cancel" class="uv_button">不通过</div>' +
                  '</div>' +
                  '</div>' +
                   '</div>' +
                   '<div class="UVAlertWindow_right_green"></div>' +
                   '</div>' +
                   '<div class="UVAlertWindow_close">×</div>' +
               '</div>' +
           '</div>';
            $("body").append(alertDiv);

            $(".UVAlertWindow_close").live("click", function () {
                $(".UVAlertWindow").remove();
                //$(".M_newuser").trigger("click");
            });
            //////////////////////////////////////
            if ($("#UserGroupList").find(".uv_group").length == 0) {
                $.post(baseUrl + "UserVerify/GetGroups", null, function (data) {
                    var objList = eval("(" + data + ")");
                    for (var i = 0 ; i < objList.length; i++) {
                        if ((objList[i].Id != 1) && (objList[i].Id != 2)) {//不显示游客和超级管理员
                            var content = "<div class='uv_group'>" + objList[i].Title + "</div>" + "<div class='uv_group_id' >" + objList[i].Id + "</div>";
                            $("#UserGroupList").append(content);
                        }
                        if ($(".uv_group").length > 8) {
                            $(".uv_group").hide();
                            var listcurrentPage = 0;
                            var listPage = Math.ceil($(".uv_group").length / 8);
                            for (var j = listcurrentPage * 8; j < (listcurrentPage + 1) * 8; j++) {
                                $(".uv_group").eq(j).show();
                            }
                            $("#UserGroupList").append("<div class='page_Group2'><div class='page_Group_prev'>上一页</div><div class='page_Group_next'>下一页</div></div>");
                            $(".page_Group_prev").css("color", "#999");
                            $(".page_Group_next").click(function () {
                                if (listcurrentPage < listPage - 1) {
                                    listcurrentPage++;
                                    var curentlist = "";
                                    $(".uv_group").hide();
                                    for (var j = listcurrentPage * 8; j < (listcurrentPage + 1) * 8; j++) {
                                        $(".uv_group").eq(j).show();
                                    }
                                    if (listcurrentPage == listPage - 1) {
                                        $(".page_Group_next").css("color", "#999");
                                    }
                                    if (listcurrentPage != 0) {
                                        $(".page_Group_prev").css("color", "#333");
                                    }
                                }
                            });
                            $(".page_Group_prev").click(function () {
                                if (listcurrentPage > 0) {
                                    listcurrentPage--;
                                    var curentlist = "";
                                    $(".uv_group").hide();
                                    for (var j = listcurrentPage * 8; j < (listcurrentPage + 1) * 8; j++) {
                                        $(".uv_group").eq(j).show();
                                    }
                                    if (listcurrentPage == 0) {
                                        $(".page_Group_prev").css("color", "#999");
                                    }
                                    if (listcurrentPage != listPage - 1) {
                                        $(".page_Group_next").css("color", "#333");
                                    }
                                }
                            });
                        }
                    }
                });
            }
            //////////////////////////////////////////////
            $(".uv_group").live("click", function () {
                $(this).css({ "background-color": "#006F7E", "color": "white" });
                $(this).siblings().css({ "background-color": "#E4E4E4", "color": "#006F7E" });
                window.uv_currentUserCategory = $(this).next(".uv_group_id").text();
            });

            $("#uv_submit").live("click", function () {
                if (window.uv_currentUserCategory == "") {
                    $(".UVAlertWindow,.AlertWindow").css("display", "none");
                    var alertwin = new R2.Business.AlertWindow("尚未选择分组", {
                        ensureId: "uv_notype_yse",
                    });
                    $("#uv_notype_yse").live("click", function () {
                        $(".UVAlertWindow").css("display", "block");
                        $(".AlertWindow").remove();
                    });
                }
               // alert("userId = " + window.localStorage.uv_currentUserId);
                $.post(baseUrl + "UserVerify/PassTheUser", { "userId": window.localStorage.uv_currentUserId, "userGroupId": window.uv_currentUserCategory }, function (data) {
                    if (data == "success") {
                        $(".UVAlertWindow").remove();
                        window.uv_currentUserCategory = "";
                        var a = new R2.Business.AlertWindow("新会员审核通过！");                        
                        $(".M_newuser").trigger("click");
                    }
                });
            });
            $("#uv_cancel").live("click", function () {
                $(".UVAlertWindow").remove();
                var alertwin = new R2.Business.AlertWindow("此用户未通过审核将被删除，是否确定？", {
                    HasCancel: true,
                    ensureId: "uv_deleteuser_yse",
                    cancelId: "uv_canceldelete",
                });
                $("#uv_deleteuser_yse").live("click", function () {
                    $.post(baseUrl + "UserVerify/DetelteTheUser", { "userId": window.localStorage.uv_currentUserId }, function (data) {
                        if (data == "success") {
                            $(".UVAlertWindow").remove();
                            window.uv_currentUserCategory = "";
                        }
                        $(".M_newuser").trigger("click");
                    });
                });
                $("#uv_canceldelete").live("click", function () {
                    $(".AlertWindow").remove();
                    window.uv_currentUserCategory = "";
                    $(".M_newuser").trigger("click");
                });
            });
        });
    });
},
CLASS_NAME: "R2.Business.UserVerify"
});
////////////////////////////////////////////////////////////////////////////////////
//以下开始检索功能
function newUserSearchInit() {
    //UserSearch执行按钮   upperSearch文本框
    $("#UserSearch").click(newUserSearchBtnClick);
    $("#upperSearch").focus(function () {
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) {
                newUserSearchBtnClick();
            }
        };
    }).blur(function () {
        document.onkeydown = function (event) {
        };
    });
}

function newUserSearchBtnClick() {
    var keyword = $("#upperSearch").val();
    if (keyword == "" || keyword == "新会员昵称") {
        return;
    }
    window.localStorage.newUserSearchKeyword = keyword;
    pageControl = new R2.Control.PageControl(baseUrl + "NewUserSearch/NewUserSearch?keyword=" + escape(keyword), {
        "countPerPage": 20,
        "firstPageID": "firstPage",
        "previousPageID": "prePage",
        "pageInfID": "pageInfo",
        "nextPageID": "nextPage",
        "lastPageID": "lastPage",
        "callback": PageControlOnSuccess
    });
}
/////////////共用的函数，放在最下方 ZHAOs 2013年12月6日16:02:58
function PageControlOnSuccess(data) {
    $(".userInfo").remove();
    var len = data.length;
    var divStr = "<div class='userInfo'>" +
                    "<div class='userId' style='display:none;'></div>" +
                    "<div class='img_name'>" +
                        "<div class='userAccount'>" +
                            "<div class='userImg'></div>" +
                            "<div class='userName'></div>" +
                        "</div>" +
                    "</div>" +
                    "</div>";
    for (var i = 0; i < len; i++) {
        $("#lower").append(divStr);
    }
    for (var i = 0; i < len; i++) {
        $("#lower .userInfo .userId:eq(" + i + ")").append(data[i].Id);
        if (data[i].RealName.length == 2) {
            $("#lower .userInfo .img_name .userAccount .userName:eq(" + i + ")").append((data[i].RealName)[0] + "&nbsp;&nbsp; " + (data[i].RealName)[1]);
        }
        else {
            $("#lower .userInfo .img_name .userAccount .userName:eq(" + i + ")").append(data[i].RealName);
        }
        if (data[i].Gender == "F") {
            $("#lower .userInfo .img_name .userAccount .userImg").eq(i).css("background", "url(" + baseUrl + "Content/img/female.png) no-repeat");
        }
    }
}