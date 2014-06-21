/*
*描述：审核任务
*create by xyp 2014-4-25 
*/
/*-------------------------------------任务审核模块----------------------------------------*/
R2.Business.CheckTask = OpenLayers.Class({
    projName: "",
    projectNumber: "",
    projectNO: "",
    taskCheckerId: "",

    groupMember: [],
    taskNumber: [],
    groupMemberID: [],
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);


        this.initCheckPage();
        this.getCheckList();
      //  this.usercheckClick();
    },
    initCheckPage: function () {
        var tempObj = this;
        var Confirm_str = '<div id="WM_project">' +
            '<div class="project_text">Project</div><div id="projectList"></div>' +
        '</div>' +
        '<div id="WM_task">' +
            '<div id="task_name">' +
                '<div id="task_groupName"></div>' +
                '<div id="Ctask_all">全部成员</div>' +
                '<div class="task_line1"></div>' +
                '<div id="task_group"></div>' +
                '<div class="task_line2"></div>' +
                '<div id="underCheck">待审核</div>' +
            '</div>' +
            '<div id="confirmList"></div>' +
        '</div>';
        $("#WManager_right").html("");
        $("#WManager_right").html(Confirm_str);              
    },
    getCheckList: function () {
        var Obj = this;
        var userInfo = window.localStorage.globalUserInfoStr;
        var groupInfo = userInfo.split("#")[4];
        $.post(baseUrl + "UserGroupManage/GetGroupByGroupId", { "groupId": groupInfo }, function (data) {
            $("#task_groupName").empty().append(data.Title);
        });
        $.post(baseUrl + "WMTask/GetUncheckedTaskByGroupId", { "groupId": groupInfo }, function (data) {
            if (data.length >= 1) {
                //加载待审核用户的彩色列表
                Obj.userCheckList(data);
                //加载Projects列表
                new R2.Business.ProjectsList({ task: data, groupMemberID: null, groupID: groupInfo, flag: 2, });
            } else {
                new R2.Business.AlertWindow("没有待审核任务！");
            }
        });

    },
    ////加载待确认用户的彩色列表
    userCheckList: function (data) {
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
            var str = "<div class='check_groupMember'>" + obj.groupMember[i] + "<div class='task_number'>" + obj.taskNumber[i] + "</div></div>";
            $("#task_group").append(str);
            if (i < 16) {
                $(".check_groupMember").eq(i).css({ "background-color": back_color[i], "color": font_color[i] });
            }
            else {
                $(".check_groupMember").eq(i).css({ "background-color": back_color[i - 16], "color": font_color[i - 16] });
            }
        }
        //点击某个用户，筛选出该用户的所有待审核任务列表
        $(".check_groupMember").click(function () {
            var index = $(".check_groupMember").index(this);

            $.post(baseUrl + "WMTask/GetTasksUncheckedByByProjAndUser", { proijId: 0, userId: obj.groupMemberID[index] }, function (data) {
                new R2.Business.ProjectsList({ task: data, groupMemberID: obj.groupMemberID[index], flag: 2 });
            });
        });
        //点击全部成员，获取所有用户的待审核任务
        $("#Ctask_all").click(function () {
            var userInfo = window.localStorage.globalUserInfoStr;
            var groupInfo = userInfo.split("#")[4];
            $.post(baseUrl + "WMTask/GetUncheckedTaskByProjIdAnduserIdsAndStatus", { projId: 0, groupId: groupInfo }, function (data) {

                //加载Projects列表
                new R2.Business.ProjectsList({
                    task: data, groupMemberID: null, groupID: groupInfo, flag: 2,
                });
            });
        });
        $("#underCheck").click(function () {

            new R2.Business.CheckTaskByChecker();
        });
    },
    CLASS_NAME: "R2.Business.CheckTask"
});



