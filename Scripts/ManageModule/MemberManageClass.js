/*******************************************************************************
*created by ZHAOS 2013年10月17日10:36:07
*Class: R2.Business.MemberManage
*会员管理  
******************************************************************************/
var pageControl;
R2.Business.MemberManage = OpenLayers.Class({
    initialize: function (sth1, option) {
        OpenLayers.Util.extend(this, option);
    },
    loadRightUpper: function () {
        $("#Manage_right").empty();
        var rightStr = "<div id='member_manage_right'>" +
                           "<div id='upper'>" +
                                '<input type="text" value="会员昵称、真实姓名、会员分组" onfocus="if(value==defaultValue) {value=' + "''" + '}"' +
                                    'onblur="if(!value) value=defaultValue" id="upper2Search"/>' +
                                '<div id="MemberSearch"></div>' +
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
        memberManageSearchInit();
        $(".Search_DetectResultDiv").css({ "position": "absolute", "z-index": "2000", "margin-top": "35px", "border": "1px solid #ccc" });        
    },
    loadRightLower: function () {               
            pageControl = new R2.Control.PageControl(baseUrl + "MemberManage/GetMembers", {
                "countPerPage": 20,
                "firstPageID": "firstPage",
                "previousPageID": "prePage",
                "pageInfID": "pageInfo",
                "nextPageID": "nextPage",
                "lastPageID": "lastPage",
                "callback": PageControlOnSuccess2
            });
    
        registerClick();
    },
    click_event_reg: function () {
        $('.member_board').live("click", function () {
            window.localStorage.um_currentUserId = $(this).find(".userId").text();
            $.post(baseUrl + "MemberManage/getMemberById", { "userId": window.localStorage.um_currentUserId }, function (cbdata) {
                var data = cbdata.split("MemberAndGroupList");
                var member = eval("(" + data[0] + ")");
                var genderStr = "";
                if (member.Gender == "M") {
                    genderStr = "男";
                }
                else if (member.Gender == "F") {
                    genderStr = "女";
                }
                var resultlist = eval("(" + data[1] + ")");
                var list = [];
                for (var i = 0 ; i < resultlist.length; i++) {
                    if (resultlist[i].Title != "游客" && resultlist[i].Title != "超级管理员") {
                        list.push(resultlist[i]);
                    }
                }
                var um_seleOptionDiv = '<div class="uvSele_manage_Alert">' +
                                        '<div class="uvSele_Alert_content">' +

                                        '<div class="showUvSele_Alert_content">'+

                                            '<div class="uvSele_Center" style="position:relative;">' +
                                                '<div class="uvSele_Alert_center">' +
                                                    '<div class="uvSele_halfBlock" id="uvSele_MemberAttrModify"></div>' +
                                                    '<div class="uvSele_halfBlock_manage">管理用户</div>' +
                                                    '<div id="uvSele_middleLine"></div>' +
                                                    '<div class="uvSele_halfBlock" id="uvSele_MemberDrop"></div>' +
                                                    '<div class="uvSele_halfBlock_manage uvSele_halfBlock_manage2">删除用户</div>' +
                                                '</div>' +
                                            '</div>' +


                                            '<div class="UMAlertWindow_main">' +
                                       '<div class="UMAlertWindow_left_gray"></div>' +
                                       '<div class="UMAlertWindow_center">' +

                                           '<div class="UMAlertWindow_top">' +
                                               '<font class="title select" style=" margin-left:20px;"><div class="title selectOne"></div>&nbsp;&nbsp;基本信息&nbsp;&nbsp</font><div class="title line"></div>' +
                                               '<font class="title"><div class="title unselectTwo"></div>&nbsp;&nbsp;分组变更&nbsp;&nbsp</font><div class="title line"></div> ' +
                                               '<font class="title"><div class="title unselectThree"></div>&nbsp;&nbsp;权限修改&nbsp;&nbsp</font><div class="title line"></div>' +
                                               '<font class="title"><div class="title unselectFour"></div>&nbsp;&nbsp;提交&nbsp;&nbsp</font>' +
                                           '</div>' +

                                           '<div class="UMshow">' +

                                           '<div class="UMAlertWindow_information">' +
                                               '<div class="information_line1">' +
                                                   '<div class="userInformation_span"><font class="userInformation_title">用&nbsp;户&nbsp;名：</font><font class="userInformation_value">' + member.RegisterName + '</font></div><div class="userInformation_span"><font class="userInformation_title">真实姓名：</font><font class="userInformation_value">' + member.RealName + '</font></div>' +
                                                   '<div class="userInformation_span"><font class="userInformation_title">昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</font><font class="userInformation_value">' + member.NickName + '</font></div>' +
                                                    '<div class="userInformation_span"><font class="userInformation_title">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</font><font class="userInformation_value">' + genderStr + '</font></div>' +
                                              '</div>' +
                                               '<div class="information_line2">' +
                                                   '<div class="userInformation_span"><font class="userInformation_title">分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：</font><font class="userInformation_value">' + getGroup(member.ContentGroupId, list).Title + '</font></div><div class="userInformation_span"><font class="userInformation_title">权&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;限：</font><font class="userInformation_value">' + getAuthorityCategory(member.AuthorityCategory) + '</font></div>' +
                                                   '<div class="userInformation_span"><font class="userInformation_title">上传知识：</font><font class="userInformation_value">' + member.allArticleCount + '篇</font></div><div class="userInformation_span"><font class="userInformation_title">通过审核：</font><font class="userInformation_value">' + member.approvedArticleCount + '篇</font></div>' +
                                               '</div>' +
                                               '<div class="information_line3">' +
                                                   '<font class="userInformation_title" style="float:left; height:300px;">个人说明：</font><div style="position:relative; font-size:16px;color:#026B79;">' + member.PersonalDescription + '</div>' +
                                               '</div>' +
                                           '</div>' +

                                           '<div class="UMAlertWindow_information2" style=" width:750px; margin-top:10px; margin-left:50px; float:left;">' +
                                         '<div class="information_line1" id="information_page" style="padding-top:0;">' +
                                              '<font style=" color:#7B7B7B;">当前分组：</font><font style=" font-size:16px; color:#026876;" id="currentUserGroup">' + getGroup(member.ContentGroupId, list).Title + '</font><input type="hidden" id="UserGroupId" value="' + getGroup(member.ContentGroupId, list).Id + '">' +
                                          '</div>' +
                                          '<div style=" margin-top:-10px;" id="UMUserGroupList">' +
                                              '</div>' +
                                      '</div>' +

                                      '<div class="UMAlertWindow_information3" style=" width:650px; margin-top:60px; margin-left:50px;padding-left:0px; float:left;">' +
                                          '<font style=" float:left; color:#7B7B7B; margin-top:12px;font-size:14px;">权限：</font><font style=" float:left; font-size:16px; color:#12717F; margin-top:10px; width:80px; margin-right:10px;" id="currentAuthorityCategory">' + getAuthorityCategory(member.AuthorityCategory) + '</font><input type="hidden" id="UserAuthorityCategory" value="' + member.AuthorityCategory + '">' +
                                                   '<div class="competence">会&nbsp;&nbsp;&nbsp;员</div>' +
                                                   '<div class="competence">管理员</div>' +
                                                   '<div class="competence">超级管理员</div>' +
                                      '</div>' +

                                      '<div class="UMAlertWindow_information4" style=" width:650px; margin-top:55px;padding-left:50px; margin-left:100px; float:left;">' +
                                                   '<div class="submit">确认修改</div>' +
                                                   '<div class="cancel">取&nbsp;&nbsp;&nbsp;消</div>' +
                                      '</div>' +
                                      '</div>' +
                                       '</div>' +
                                       '<div class="UMAlertWindow_right_green"></div>' +
                                       '</div>' +
                                       '</div>' +                                       
                                       '<div class="UMAlertWindow_close">×</div>' +
                                        '</div>' +
                                    '</div>';
                $("body").append(um_seleOptionDiv);

                $(".uvSele_halfBlock").hover(function(){
                    $(this).next(".uvSele_halfBlock_manage").css("color", "#017586");
                }, function () {
                    $(this).next(".uvSele_halfBlock_manage").css("color", "#999");
                }); //得到所有分组
                getAllGroup(list);
                //设置当前用户的分组信息
                groupSelect(member.ContentGroupId, list);
                //选择分组
                changeSelect(list);
                //设置当前用户的权限信息
                AuthorityCategorySelect(member.AuthorityCategory);
                //选择权限
                changeAuthorityCategorySelect();
                //提交页面注册事件
                submitClick();
            });
            
        });
        ///////////////////////////////////////////////////////////////////
            $(".uvSele_Alert_close").live("click", function () {
                $(".UMAlertWindow").remove();
                $(".uvSele_manage_Alert").remove();
                $(".M_user").trigger("click");
            });
            $("#uvSele_MemberDrop").live("click", function () {
                $.post(baseUrl + "MemberManage/GetAriticleCount", { "userId": window.localStorage.um_currentUserId }, function (data) {
                    if (data == 0) {
                        $(".uvSele_manage_Alert").css("display", "none");
                        var a = new R2.Business.AlertWindow("是否删除该用户 ？", {
                                        HasCancel:true,
                                        ensureId: "uvSele_DropMemberYes",
                                        cancelId: "uvSele_DropMemberCancel"
                        });
                        $("#uvSele_DropMemberYes").live("click", function () {
                            $.post(baseUrl + "MemberManage/DetelteTheMember", { "userId": window.localStorage.um_currentUserId }, function (data) {
                                if (data == "success") {                                    
                                    $(".UMAlertWindow").remove();
                                    $(".uvSele_manage_Alert").remove();
                                    $(".M_user").trigger("click");
                                }
                            });  
                            });
                        $("#uvSele_DropMemberCancel").live("click", function () {                            
                            $(".uvSele_manage_Alert").css("display", "block");                            
                        });   
                    }
                    else {
                        $(".uvSele_manage_Alert").css("display", "none");
                        var deleteUserFailed = new R2.Business.AlertWindow("此会员有相关知识，不能删除！");
                        $(".AlertWindow_submit1").live("click", function () {                            
                            $(".AlertWindow").remove();
                            $(".uvSele_manage_Alert").css("display", "block");
                        });
                    }
                });
         });

            $("#uvSele_MemberAttrModify").live("click", function () {
                $(".uvSele_Center").animate({ left: '-900px' }, 500);
                $(".UMAlertWindow_main").animate({left:'0px'},500);

        });    
    },
   
    CLASS_NAME: "R2.Business.UserVerify"
});


//获取分组信息
function getGroup(ContentGroupId, list) {
    for (var i = 0 ; i < list.length; i ++){
        if(list[i].Id == ContentGroupId){
            return list[i];
        }
    }
}
//获取当前用户的权限信息
function getAuthorityCategory(AuthorityCategory) {
    switch (AuthorityCategory) {
        case 0:
            return "游客";
            break;
        case 1:
            return "会员";
            break;
        case 2:
            return "管理员";
            break;
        case 3:
            return "超级管理员";
            break;
    }
}
//将全部分组信息添加到dom中
function getAllGroup(list) {
    var content = "";
    for (var i = 0 ; i < list.length; i++){
        content = '<div class="group">' + list[i].Title + '</div>';
        $("#UMUserGroupList").append(content);
    }
    //如果内容分组超过8个，则分页展示，每页显示8个
    if (list.length > 8) {
        $(".group").hide();
        var listcurrentPage = 0;
        var listPage = Math.ceil(list.length / 8);
        
        for (var j = listcurrentPage * 8; j < (listcurrentPage + 1) * 8; j++) {
            $(".group").eq(j).show();
        }
        $("#information_page").append("<div class='page_Group'><div class='page_Group_prev'>上一页</div><div class='page_Group_next'>下一页</div></div>");
        $(".page_Group_prev").css("color", "#999");
        $(".page_Group_next").click(function () {
            if (listcurrentPage < listPage - 1) {
                listcurrentPage++;
                var curentlist = "";
                $(".group").hide();
                for (var j = listcurrentPage * 8; j < (listcurrentPage + 1) * 8; j++) {
                    $(".group").eq(j).show();
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
                $(".group").hide();
                for (var j = listcurrentPage * 8; j < (listcurrentPage + 1) * 8; j++) {
                    $(".group").eq(j).show();
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
    //分页展示到此结束
}
//设置当前用户的分组信息
function groupSelect(ContentGroupId, list) {
    for (var i = 0 ; i < list.length; i++) {
        if(ContentGroupId == list[i].Id){
            $(".group").eq(i).addClass("groupSelect");
        }
    }
}
//修改当前用户的分组信息
function changeSelect(list) {
    $(".group").live("click",function () {
        $(".group").eq($(".group").index($(this))).addClass("groupSelect");
        $(".group").eq($(".group").index($(this))).siblings().removeClass("groupSelect");
        $("#UserGroupId").val(list[$(".group").index($(this))].Id);
        $("#currentUserGroup").html(list[$(".group").index($(this))].Title);
    });
}
//设置当前用户的权限信息
function AuthorityCategorySelect(AuthorityCategory) {
    switch (AuthorityCategory) {
        case 1:
            $(".competence").eq(0).addClass("competenceSelect");
            break;
        case 2:
            $(".competence").eq(1).addClass("competenceSelect");
            break;
        case 3:
            $(".competence").eq(2).addClass("competenceSelect");
            break;
    }
}
//修改当前用户的权限信息
function changeAuthorityCategorySelect() {
    $(".competence").live("click", function () {
        $(".competence").eq($(".competence").index($(this))).addClass("competenceSelect");
        $(".competence").eq($(".competence").index($(this))).siblings().removeClass("competenceSelect");
        changeAuthorityCategorySelectTitle($(".competence").index($(this)));
    });
}
//结合changeAuthorityCategorySelect使用，设置选择后的dom展示信息
function changeAuthorityCategorySelectTitle(index) {
    switch(index){
        case 0:
            $("#currentAuthorityCategory").html("会员");
            $("#UserAuthorityCategory").val("1");
            break;
        case 1:
            $("#currentAuthorityCategory").html("管理员");
            $("#UserAuthorityCategory").val("2");
            break;
        case 2:
            $("#currentAuthorityCategory").html("超级管理员");
            $("#UserAuthorityCategory").val("3");
            break;
    }
}
//提交页面注册按钮
function submitClick() {
    $(".cancel").live("click", function () {
        $(".uvSele_manage_Alert").remove();
        count = 0;
    });
    $(".submit").live("click", function () {
        var userId = window.localStorage.um_currentUserId;
        var userGroupId = $("#UserGroupId").val();
        var userAuthorityCategory = $("#UserAuthorityCategory").val();
        $.post(baseUrl + "MemberManage/ModifyMemberAttrs", { "userId": userId, "userGroupId": userGroupId, "userAuthorityCategory": userAuthorityCategory }, function (data) {
            if (data == "success") {
                $(".uvSele_manage_Alert").remove();
                $("#lower").find("div").die("click");                $(".M_user").trigger("click");
                var um_memberModify_success = new R2.Business.AlertWindow("会员信息修改成功！");
                count = 0;
            }            
        });
    });
}

var count = 0;
function registerClick() {  
    $(".UMAlertWindow_close").live("click", function () {
        $(".uvSele_manage_Alert").remove();
        count = 0;
    });
    $(".UMAlertWindow_right_green").live("click", function () {
        count++;
        switch (count) {
            case 1:
                $(".selectOne").removeClass("selectOne").addClass("unselectOne");
                $(".unselectTwo").removeClass("unselectTwo").addClass("selectTwo");
                $(".title").eq(0).removeClass("select");
                $(".title").eq(3).addClass("select");
                $(".UMAlertWindow_left_gray").removeClass("UMAlertWindow_left_gray").addClass("UMAlertWindow_left_green");
                $(".UMshow").stop(true, false).animate({ left: '-770px' }, 500);
                break;
            case 2:
                $(".selectTwo").removeClass("selectTwo").addClass("unselectTwo");
                $(".unselectThree").removeClass("unselectThree").addClass("selectThree");
                $(".title").eq(3).removeClass("select");
                $(".title").eq(6).addClass("select");
                $(".UMshow").stop(true, false).animate({ left: '-1540px' }, 500);
                break;
            case 3:
                $(".selectThree").removeClass("selectThree").addClass("unselectThree");
                $(".unselectFour").removeClass("unselectFour").addClass("selectFour");
                $(".title").eq(6).removeClass("select");
                $(".title").eq(9).addClass("select");
                $(".UMAlertWindow_right_green").removeClass("UMAlertWindow_right_green").addClass("UMAlertWindow_right_gray");
                $(".UMshow").stop(true, false).animate({ left: '-2310px' }, 500);
                break;
        }
        if ($(".UMAlertWindow").length > 1) {
            $(".UMAlertWindow").siblings().remove();
        }
    });
    $(".UMAlertWindow_left_green").live("click", function () {
        count--;
        switch (count) {
            case 0:
                $(".unselectOne").removeClass("unselectOne").addClass("selectOne");
                $(".selectTwo").removeClass("selectTwo").addClass("unselectTwo");
                $(".title").eq(3).removeClass("select");
                $(".title").eq(0).addClass("select");
                $(".UMAlertWindow_left_green").removeClass("UMAlertWindow_left_green").addClass("UMAlertWindow_left_gray");
                $(".UMshow").stop(true, false).animate({ left: '0px' }, 500);
                break;
            case 1:
                $(".unselectTwo").removeClass("unselectTwo").addClass("selectTwo");
                $(".selectThree").removeClass("selectThree").addClass("unselectThree");
                $(".title").eq(6).removeClass("select");
                $(".title").eq(3).addClass("select");
                $(".UMshow").stop(true, false).animate({ left: '-770px' }, 500);
                break;
            case 2:
                $(".unselectThree").removeClass("unselectThree").addClass("selectThree");
                $(".selectFour").removeClass("selectFour").addClass("unselectFour");
                $(".title").eq(9).removeClass("select");
                $(".title").eq(6).addClass("select");
                $(".UMAlertWindow_right_gray").removeClass("UMAlertWindow_right_gray").addClass("UMAlertWindow_right_green");
                $(".UMshow").stop(true, false).animate({ left: '-1540px' }, 500);
                break;
        }
        if ($(".UMAlertWindow").length > 1) {
            $(".UMAlertWindow").siblings().remove();
        }

    });
}
/////////////////开始检索ZHAOs 2013年12月6日18:03:02
function memberManageSearchInit() {
    //upper2Search MemberSearch
    $("#MemberSearch").live("click", memberManageSearchBtnClick);
    $("#upper2Search").live("focus", function () {
        document.onkeydown = function (event) {
            var e = event || window.event;
            if (e && e.keyCode == 13) {
                memberManageSearchBtnClick();
            }
        };
    }).live("blur", function () {
        document.onkeydown = function (event) {
        };
    });
}

function memberManageSearchBtnClick() {
    var keyword = $("#upper2Search").val();
    if (keyword == "" || keyword == "会员昵称、真实姓名、会员分组") {
        return;
    }
    pageControl = new R2.Control.PageControl(baseUrl + "MemberManageSearch/MemberManageSearch?keyword=" + escape(keyword), {
        "countPerPage": 20,
        "firstPageID": "firstPage",
        "previousPageID": "prePage",
        "pageInfID": "pageInfo",
        "nextPageID": "nextPage",
        "lastPageID": "lastPage",
        "callback": PageControlOnSuccess2
    });

}

///////////////公用函数写在最后
function PageControlOnSuccess2(data) {
    $("#lower").empty();
    var len = data.length;
    var divStr = "<div class='member_board'>" +
                    "<div class='userId' style='display:none;'></div>" +
                    "<div class='AuthorityCategory' style='display:none;'></div>" +
                    "<div class='img_name'>" +
                        "<div class='userImg'></div>" +
                        "<div class='userName'></div>" +
                    "</div>" +
                   "</div>";
    for (var i = 0; i < data.length; i++) {
        $("#lower").append(divStr);
        $("#lower .member_board .userId:eq(" + i + ")").text(data[i].Id);
        $("#lower .member_board .AuthorityCategory:eq(" + i + ")").text(data[i].AuthorityCategory);
        if (data[i].RealName.length == 2) {
            $("#lower .userName:eq(" + i + ")").append((data[i].RealName)[0] + "&nbsp;&nbsp; " + (data[i].RealName)[1]);
        }
        else {
            $("#lower .userName:eq(" + i + ")").append(data[i].RealName);
        }
        if (data[i].Gender == "F") {
            $("#lower .userImg:eq(" + i + ")").css("background", "url(" + baseUrl + "Content/img/female.png) no-repeat 0 -30px");
        }
        if (data[i].AuthorityCategory == 2) {
            $("#lower .member_board:eq(" + i + ")").css("background-color", "#6480AE");
        } else if (data[i].AuthorityCategory == 3) {
            $("#lower .member_board:eq(" + i + ")").css("background-color", "#4668C5");
        }
    }
    $(".member_board").hover(function () {
        var groupCato = $(this).find(".AuthorityCategory").text();
        if (groupCato == 2) {
            $(this).css("background-color", "#732794");
        } else if (groupCato == 3) {
            $(this).css("background-color", "#613CBC");
        } else {
            $(this).css("background-color", "#026673");
        }
    }, function () {
        var groupCato = $(this).find(".AuthorityCategory").text();
        if (groupCato == 2) {
            $(this).css("background-color", "#6480AE");
        } else if (groupCato == 3) {
            $(this).css("background-color", "#4668C5");
        } else {
            $(this).css("background-color", "#018396");
        }
    });
}
