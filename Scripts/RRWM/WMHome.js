/*
*描述：任务确认模块，进入团队任务子系统的主界面
*create by xyp 2014-4 
*/
$(function () {
    $(window).load(function () {
        if (getCookie("userinf") != null) {
            $(".WM_confirm").trigger("click");
        }
        else {
           new R2.Business.AlertWindow("您尚未登录，要想执行此操作，请先登陆！", { "LoadUrl": "Home/Index" });
        }       
    });
    WManagerInit();

    ////左侧点击字体变色
    $(".WManager_nav div:eq(0)").css("color", "#017586");
    $(".WManager_navSty").click(function () {
        var index = $(".WManager_navSty").index(this);
        $(".WManager_navSty").css("color", "#333").eq(index).css("color", "#017586");
        /*modified by jjm @2014.5.7*/
        switch(index){
            case 0: {
                new R2.Business.ConfirmTask();
                break;
            }
            case 1: {
                new R2.Business.CheckTask();
                break;
            }
            case 2: {
                new R2.Business.TaskManage();
                break;
            }
            case 3: {
                new R2.Business.TaskHoursTableStatistics('WManager_right');
                break;
            }
            case 4: {
                new R2.Business.TaskHoursChartStatistics('WManager_right');
                break;
            }
            case 5: {
                new R2.Business.Years();
                break;
            }
            case 6: {
                new R2.Business.BonusDisplay();
                break;
            }
            case 7: {
                new R2.Business.BonusTableStatistics();
                break;
            }
            case 8: {
                new R2.Business.BonusChartStatistics();
                break;
            }
            case 9: {
                new R2.Business.BonusLineStatistics();
                break;
            }
            default: {

            }
        }
    });
    
});
function WManagerInit() {
    $("#Head_nav").remove();
    $("#Head_right").css("top", "30px");
    $(".user_line").remove();
    $("#user_manage").remove();
    $("#user_upload").remove();
    $("#user_center").remove();
    $("#Copyright").remove();
    $("#user_exit").before("</div><div class='back_index'>返回首页</div>");
    $("#Head_search").remove();
    $(".back_index").click(function () {
        window.location.href = baseUrl + "Home/index";
    });
}
/*------------------------------------------任务确认模块--------------------------------------*/
R2.Business.ConfirmTask = OpenLayers.Class({
    projName: "",
    projectNumber: "",
    projectNO: "",
    taskCheckerId: "",
   
    groupMember: [],
    taskNumber: [],
    groupMemberID: [],
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);


        this.initConfirmPage();
        this.getConfirmList();
    },
    //加载待确认页面
    initConfirmPage: function () {
        var tempObj = this;
        var Confirm_str = '<div id="WM_project">' +
            '<div class="project_text">Project</div><div id="projectList"></div>' +
        '</div>' +
        '<div id="WM_task">' +
            '<div id="task_name">' +
                '<div id="task_groupName"></div>' +
                '<div id="task_all">全部成员</div>' +
                '<div class="task_line1"></div>' +
                '<div id="task_group"></div>' +
                '<div class="task_line2"></div>' +
                '<div id="task_add"></div>' +
            '</div>' +
            '<div id="confirmList"></div>' +
        '</div>';
        $("#WManager_right").html("");
        $("#WManager_right").html(Confirm_str);
        $("#task_add").click(function () {

            tempObj.sendProjectNamePost();
        });
    },
    //将用户所在的小组发送后台，后台返回该小组所有待确认任务列表的信息
    getConfirmList: function () {
        var Obj = this;
        var userInfo = window.localStorage.globalUserInfoStr;
        var groupInfo = userInfo.split("#")[4];
        //加载所在的小组名称 
        $.post(baseUrl + "UserGroupManage/GetGroupByGroupId", { "groupId": groupInfo }, function (data) {
            $("#task_groupName").empty().append(data.Title);
        });
        $.post(baseUrl + "WMTask/GetUnConfirmedTaskByGroupId", { "groupId": groupInfo }, function (data) {
            if (data.length>=1) {
                //加载待确认用户的彩色列表
                Obj.userConfirmList(data);                
                //加载Projects列表
                new R2.Business.ProjectsList({ task: data, groupMemberID: null, groupID: groupInfo, flag: 1, });
            } else {
               // new R2.Business.AlertWindow("没有待确认任务！");
                return false;
            }
        });

    },
    ////加载待确认用户的彩色列表
    userConfirmList: function (data) {
        var obj = this;
        var back_color = ["#E3EDAF", "#F7DBED", "#FAEAC6", "#D1DEE5", "#B7E0BF", "#E3E5F9", "#E9ECDB", "#C9EAF5", "#E3EDAF", "#F7DBED", "#FAEAC6", "#D1DEE5", "#B7E0BF", "#E3E5F9", "#E9ECDB", "#C9EAF5"];
        var font_color = ["#468155", "#D057B5", "#CC6600", "#3366CC", "#03460F", "#663399", "#768355", "#0066FF", "#468155", "#D057B5", "#CC6600", "#3366CC", "#03460F", "#663399", "#768355", "#0066FF"];

        $("#task_group").html("");
        var cnt = 0;
        var flag = 0;
        obj.taskNumber = [];
        obj.groupMember = [];
        obj.groupMemberID = [];
        
        obj.taskNumber[0] = 1;
        obj.groupMember[0] = data[0].TaskerName;
        obj.groupMemberID[0] = data[0].TaskerId;

        for (var i = 1; i < data.length; i++) {
            for (var j = 0; j < obj.groupMember.length; j++) {
                if (obj.groupMember[j] == data[i].TaskerName) {
                    flag = 1;
                    obj.taskNumber[j] += 1;
                }
            }
            if (flag == 0) {
                cnt++;
                obj.taskNumber[cnt] = 1;
                obj.groupMember[cnt] = data[i].TaskerName;
                obj.groupMemberID[cnt] = data[i].TaskerId;
            }
            flag = 0;
        }


        for (var i = 0; obj.groupMember[i] != '' && i < obj.groupMember.length; i++) {
            var str = "<div class='groupMember'>" + obj.groupMember[i] + "<div class='task_number'>" + obj.taskNumber[i] + "</div></div>";
            $("#task_group").append(str);
            if (i < 16) {
                $(".groupMember").eq(i).css({ "background-color": back_color[i], "color": font_color[i] });
            }
            else {
                $(".groupMember").eq(i).css({ "background-color": back_color[i - 16], "color": font_color[i - 16] });
            }
        }
        //点击某个用户，筛选出该用户的所有待确认任务列表
        $(".groupMember").click(function () {
            var index = $(".groupMember").index(this);

            $.post(baseUrl + "WMTask/FindNotConfirmedByUserID", { userId: obj.groupMemberID[index] }, function (data) {
                new R2.Business.ProjectsList({ task: data, groupMemberID: obj.groupMemberID[index], flag: 1 });
            });
        });
        //点击全部成员，获取所有用户的待确认任务
        $("#task_all").click(function () {
            var userInfo = window.localStorage.globalUserInfoStr;
            var groupInfo = userInfo.split("#")[4];
            $.post(baseUrl + "WMTask/GetUnConfirmedTaskByGroupId", { "groupId": groupInfo }, function (data) {

                //加载Projects列表
                new R2.Business.ProjectsList({
                    task: data, groupMemberID: null, groupID: groupInfo, flag: 1,
                });
            });
        });
       
    },
    
    //发送post请求，将用户名及所在小组发送给后台，后台返回项目名称、项目编号、责任人、审核人
    sendProjectNamePost: function () {
        var tempObj = this;
        var userInfo = window.localStorage.globalUserInfoStr;
        var groupInfo = userInfo.split("#")[4];
        //获取责任人和审核人,也就是所在小组的所有成员
        $.post(baseUrl + "WMUser/GetAllMembersByGroupId", { groupId: groupInfo }, function (data) {
            var nameStr = [];
            var idStr = [];
            for (var i = 0; i < data.length; i++) {
                nameStr[i] = data[i].split(',')[0];
                idStr[i] = data[i].split(',')[1];
            }
            tempObj.memberName = nameStr;
            tempObj.memberId = idStr;
            tempObj.taskCheckerId = idStr;
            //获取所有项目名称和项目编号
            $.post(baseUrl + "WMProject/GetAllProject", null, function (cbdata) {
                var projNameStr = "";
                var projNOStr = "";
                var projNumberStr = "";
                for (var projName in cbdata) {
                    projNameStr += projName + ",";
                    projNOStr += cbdata[projName].split(',')[0] + ",";
                    projNumberStr += cbdata[projName].split(',')[1] + ",";
                }
                projNumberStr = projNumberStr.substring(0, projNumberStr.length - 1); //去掉字符串的最后一个','
                projNOStr = projNOStr.substring(0, projNOStr.length - 1); //去掉字符串的最后一个','
                projNameStr = projNameStr.substring(0, projNameStr.length - 1); //去掉字符串的最后一个','
                tempObj.projName = projNameStr.split(",");
                tempObj.projectNumber = projNumberStr.split(",");
                tempObj.projectNO = projNOStr.split(",");
               // tempObj.projName[tempObj.projName.length - 1] = "\0";
               // tempObj.projectNumber[tempObj.projectNumber.length - 1] = "\0";
               // tempObj.projectNO[tempObj.projectNO.length - 1] = "\0";
                new R2.Business.AddTask({
                    projectName: tempObj.projName,
                    projectNumber: tempObj.projectNumber,  //编号
                    projectId: tempObj.projectNO,       //projId
                    taskPerson: tempObj.memberName,
                    taskPersonId: tempObj.memberId,

                    taskChecker: tempObj.memberName,
                    taskCheckerId: tempObj.taskCheckerId
                });
            });
        });
    },

    CLASS_NAME: "R2.Business.ConfirmTask"
});


/*------------------------------------------Projects列表----------------------------------------*/
R2.Business.ProjectsList = OpenLayers.Class({
    task: [],
    projectsList: [],
    //项目名称ID
    projectID: [],
    //当前用户ID
    groupMemberID: [],
    groupID: 0,

    flag: 1,   //flag==1时待确认项目,flag==2待审核项目,flag==3根据审核人筛选待审核项目
   
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.initProjectsList();
    },
    //加载项目列表
    initProjectsList: function () {
        var obj = this;
        obj.projectsList = [];
        obj.projectID = [];

        var cnt = 0;
        var flag = 0;

        obj.projectsList[0] = obj.task[0].proName;
        obj.projectID[0] = obj.task[0].ProjectID;
        for (var i = 0; i < obj.task.length; i++) {
            for (var j = 0; j < obj.projectsList.length; j++) {
                if (obj.projectsList[j] == obj.task[i].proName) {
                    flag = 1;
                }
            }
            if (flag == 0) {
                cnt++;
                obj.projectsList[cnt] = obj.task[i].proName;
                obj.projectID[cnt] = obj.task[i].ProjectID;
            }
            flag = 0;
        }

        var projectStr = '<div class="proList_sty">全部</div>';
        for (var i = 0; obj.projectsList[i] != '' && i < obj.projectsList.length; i++) {
            projectStr += '<div class="proList_sty" title=' + obj.projectsList[i] + '>' + obj.projectsList[i] + '</div>';
        }   
        $("#projectList").html("");
        $("#projectList").html(projectStr);
        if (obj.flag == 1) {
            obj.initProjectsClick_1();
        }
        else if (obj.flag == 2) {
            obj.initProjectsClick_2();
        }
        else {
            obj.initProjectsClick_3();
        }
        $(".proList_sty").eq(0).trigger("click");
    },
    //点击项目列表(在待确认界面时)
    initProjectsClick_1: function () {
        
        var obj = this;
        $(".proList_sty").unbind().bind("click", function () {

            var index = $(".proList_sty").index(this);
            var jt = '<div class="proList_jt"></div>';
            $(".proList_jt").remove();
            $(".proList_sty").removeClass("proList_color").eq(index).append(jt).addClass("proList_color");

            if (index == 0) {
                if (obj.groupMemberID == null) {
                    $.post(baseUrl + "WMTask/GetTaskByProjIdAndGroupId", { projId: 0, groupId: obj.groupID }, function (data) {
                        new R2.Business.ConfirmTaskList({ conTaskList: data,flag:1 });
                    });
                } else {
                    $.post(baseUrl + "WMTask/GetTasksInProgressByProjAndUser", { proijId: 0, userId: obj.groupMemberID}, function (data) {
                        new R2.Business.ConfirmTaskList({ conTaskList: data, flag: 1 });
                    });
                }

            } else {
                var t = index - 1;
                if (obj.groupMemberID == null) {
                    $.post(baseUrl + "WMTask/GetTaskByProjIdAndGroupId", { projId: obj.projectID[t], groupId: obj.groupID }, function (data) {
                        new R2.Business.ConfirmTaskList({ conTaskList: data, flag: 1 });
                    });
                } else {
                    $.post(baseUrl + "WMTask/GetTasksInProgressByProjAndUser", { proijId: obj.projectID[t], userId: obj.groupMemberID }, function (data) {
                        new R2.Business.ConfirmTaskList({ conTaskList: data, flag: 1 });
                    });
                }
            }
        });

    },
    //点击项目列表(在待审核界面时)
    initProjectsClick_2: function () {
        var obj = this;
        $(".proList_sty").unbind().bind("click",function () {
            var index = $(".proList_sty").index(this);
            var jt = '<div class="proList_jt"></div>';
            $(".proList_jt").remove();
            $(".proList_sty").removeClass("proList_color").eq(index).append(jt).addClass("proList_color");
            if (index == 0) {
                if (obj.groupMemberID == null) {
                    $.post(baseUrl + "WMTask/GetUncheckedTaskByProjIdAnduserIdsAndStatus", { projId: 0, groupId: obj.groupID }, function (data) {
                        new R2.Business.ConfirmTaskList({ conTaskList: data,flag:2 });
                    });
                } else {
                    $.post(baseUrl + "WMTask/GetTasksUncheckedByByProjAndUser", { proijId: 0, userId: obj.groupMemberID }, function (data) {
                        new R2.Business.ConfirmTaskList({ conTaskList: data, flag: 2 });
                    });
                }
            } else {
                var t = index - 1;
                if (obj.groupMemberID == null) {
                    $.post(baseUrl + "WMTask/GetUncheckedTaskByProjIdAnduserIdsAndStatus", { projId: obj.projectID[t], groupId: obj.groupID }, function (data) {
                        new R2.Business.ConfirmTaskList({ conTaskList: data, flag: 2 });
                    });
                } else {
                    $.post(baseUrl + "WMTask/GetTasksUncheckedByByProjAndUser", { proijId: obj.projectID[t], userId: obj.groupMemberID }, function (data) {
                        new R2.Business.ConfirmTaskList({ conTaskList: data, flag: 2 });
                    });
                }
            }
        });
    },
    //点击项目列表(在待审核界面时，根据审核人筛选)
    initProjectsClick_3: function () {
        var obj = this;
        $(".proList_sty").unbind().bind("click",function () {
            var index = $(".proList_sty").index(this);
            var jt = '<div class="proList_jt"></div>';
            $(".proList_jt").remove();
            $(".proList_sty").removeClass("proList_color").eq(index).append(jt).addClass("proList_color");
            if (index == 0) {
                if (obj.groupMemberID == null) {
                    $.post(baseUrl + "WMTask/GetUncheckedTaskByProjIdAnduserIdsAndStatus", { projId: 0, groupId: obj.groupID }, function (data) {
                        new R2.Business.ConfirmTaskList({ conTaskList: data, flag: 2 });
                    });
                } else {
                    $.post(baseUrl + "WMTask/GetTasksUncheckedByProjAndChecker", { proijId: 0, checkerId: obj.groupMemberID }, function (data) {
                        new R2.Business.ConfirmTaskList({ conTaskList: data, flag: 2 });
                    });
                }
            } else {
                var t = index - 1;
                if (obj.groupMemberID == null) {
                    $.post(baseUrl + "WMTask/GetUncheckedTaskByProjIdAnduserIdsAndStatus", { projId: obj.projectID[t], groupId: obj.groupID }, function (data) {
                        new R2.Business.ConfirmTaskList({ conTaskList: data, flag: 2 });
                    });
                } else {
                    $.post(baseUrl + "WMTask/GetTasksUncheckedByProjAndChecker", { proijId: obj.projectID[t], checkerId: obj.groupMemberID }, function (data) {
                        new R2.Business.ConfirmTaskList({ conTaskList: data, flag: 2 });
                    });
                }
            }
        });
    },
    CLASS_NAME: "R2.Business.ProjectsList"
});





/*-----------------------------------------待确认待审核任务列表----------------------------------------*/
R2.Business.ConfirmTaskList = OpenLayers.Class({
    //所有待确认任务信息
    conTaskList: [],
    flag:1,

    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.initConfirmTitle();
        this.initConfirmList();
        this.ConfirmClick();
       
    },
    //加载待确认任务列表标题
    initConfirmTitle: function () {
        ////加载列表标题
        var confirmTitleStr = '<div id="confirmListTitle">' +
                                    '<div id="NO" class="list_text" style="color:black;">序号</div>' +
                                    '<div id="taskPeople" class="list_text"style="color:black;">任务责任人</div>' +
                                    '<div id="taskNam" class="list_text"style="color:black;">任务名称</div>' +
                                    '<div id="taskScheduledTime" class="list_text"style="color:black;">计划完成时间</div>' +
                                    '<div id="taskScheduledBonus" class="list_text"style="color:black;">计划工时数</div>' +
                                    '<div id="taskChecker" class="list_text"style="color:black;">审核人</div>' +
                                    '</div>' +
                                '<div id="confirmListContent1"><div id="confirmListContent"></div></div>'+
                                '<div class="right_line"></div>'+
                                '<div class="bottom_line"></div>';
        $("#confirmList").html("");
        $("#confirmList").html(confirmTitleStr);

    },
    //加载待确认任务列表
    initConfirmList: function () {
        var obj = this;
        $("#confirmListContent").empty();
        if (obj.conTaskList != "") {
            for (var i = 0; i < obj.conTaskList.length; i++) {
                var strList = '<div class="List_sty"></div>';
                $("#confirmListContent").append(strList);
                var strListContent = '<div class="list_text Number">' + (i + 1) + '</div>' +
                                    '<div class="list_text task_peo">' + obj.conTaskList[i].TaskerName + '</div>' +
                                    '<div class="list_text task_nam">' + obj.conTaskList[i].TaskTitle + '</div>' +
                                    '<div class="list_text sche_time">' + obj.conTaskList[i].ScheduledFinishTime + '</div>' +
                                    '<div class="list_text sche_bonus">' + obj.conTaskList[i].ScheduledBonus + '</div>' +
                                    '<div class="list_text task_checker">' + obj.conTaskList[i].CheckerName + '</div>';
                $(".List_sty").eq(i).append(strListContent);
            }
        }
        var lineHeight = (obj.conTaskList.length) * 35;
        $(".right_line").css({ height: lineHeight + "px" });
        if (obj.conTaskList.length >= 10) {
            $(".bottom_line").show();
        }
        else {
            $(".bottom_line").hide();
        }
    },
    //待确认任务列表以及待审核列表的Click事件，点击某一行，跳转到对应确认界面或者审核界面
    ConfirmClick: function () {
        var obj = this;
        $(".List_sty").click(function () {
            var index = $(".List_sty").index(this);
            new R2.Business.ConfirmAndCheckTaskPage({ task: obj.conTaskList[index],flag:obj.flag });
        });
    },
    CLASS_NAME: "R2.Business.ConfirmTaskList"
});








/*-----------------------------------------任务类------------------------------------------*/
R2.Business.Task = OpenLayers.Class({
    ID:null,                 //任务ID
    RecordTime: null,        //任务录入时间
    TaskType: "",            //任务类型
    TaskCategory: "编码",    //任务类别
    proName: "",             //项目名称
    ProjectID: "",           //项目ID
    TaskTitle: "",           //任务名称
    SecondLevelTitle: "",    //任务二级分类
    TaskContent: "",         //任务内容
    TaskFinishStandard: "",  //任务完成标准
    ScheduledBonus: "",      //计划工时
    Bonus: "",               //工时
    TaskerName: "",          //责任人
    TaskerNameId: "",        //责任人ID
    TaskStatus: "正在进行",  //任务状态
    ScheduledStartTime: "",  //计划开始时间
    ScheduledFinishTime: "", //计划完成时间
    ConfirmedFinishTime: "", //实际完成时间
    UsedHours: "",           //所用小时数
    QualityFactor: "",       //任务质量系数
    Month: "",               //任务所属月份
    Week: "",                //任务所属周次
    CheckerName: "",         //审核人
    CheckerNameId: "",       //审核人ID
    Memo: "",                //备注

    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
    },
    CLASS_NAME: "R2.Business.Task"
});







