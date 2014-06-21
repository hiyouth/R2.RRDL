/*
*描述：任务管理模块
*create by xyp 2014-5-13 
*/
R2.Business.TaskManage = OpenLayers.Class({
    //当前页
    currentPage: 0,
    //总页数
    totalPage: 0,

    flag: 1,
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.registClick();
        $(".taskTitle_text").eq(0).trigger("click");
        new R2.Business.AllTaskList();
    },
    initPage: function () {
        var tempObj = this;
        var Confirm_str = '<div id="WM_project">' +
            '<div id="projectListContent"></div>' +
        '</div>' +
        '<div id="task_Content">' +
            '<div id="task_Top">' +
                '<div id="title">' +
                    '<div id="Projects_text" class="taskTitle_text">Projects</div>' +
                    '<div id="Groups_text" class="taskTitle_text">Groups</div>' +
                    '<div id="Members_text" class="taskTitle_text">Members</div>' +
                '</div>' +
                '<div id="pageBtn">' +
                    //'<div class="pageBtn_all">总数：<lable id="totalNumber">0</lable></div>' +
                    '<div class="pageBtn_sty">第一页</div>' +
                    '<div class="pageBtn_sty">上一页</div>' +
                    '<div class="pageBtn_sty"><lable id="currentPage">' + tempObj.currentPage + '</lable>/<lable id="totalPage">' + tempObj.totalPage + '</lable></div>' +
                    '<div class="pageBtn_sty">下一页</div>' +
                    '<div class="pageBtn_sty pageBtn_sty2">最后一页</div>' +
                '</div>' +
            '</div>' +
            '<div id="taskmanageList"></div>' +
        '</div>';
        $("#WManager_right").html("");
        $("#WManager_right").html(Confirm_str);

    },
    registClick: function () {
        var obj = this;
        $(".taskTitle_text").click(function () {
            var index = $(".taskTitle_text").index(this);
            switch (index) {
                case 0: {
                    $(".taskTitle_text").removeClass("border_sty2 border_sty3").eq(0).addClass("border_sty1");
                    new R2.Business.ProjectsGroupsMembersList({ flag: 1 });
                    break;
                }
                case 1: {
                    $(".taskTitle_text").removeClass("border_sty1 border_sty3").eq(1).addClass("border_sty2");
                    new R2.Business.ProjectsGroupsMembersList({ flag: 2 });
                    break;
                }
                case 2: {
                    $(".taskTitle_text").removeClass("border_sty1 border_sty2").eq(2).addClass("border_sty3");
                    new R2.Business.ProjectsGroupsMembersList({ flag: 3 });
                    break;
                }
                default: { }
            }
        });
    },
    CLASS_NAME: "R2.Business.TaskManage"
});




/*------------------------------------------Projects/Groups/Members列表----------------------------------------*/
R2.Business.ProjectsGroupsMembersList = OpenLayers.Class({
    task: [],
    //项目名称ID  
    projectID: [],
    //小组ID
    groupID: [],
    //用户ID
    memberID: [],

    flag: 1,   //flag==1时Projects列表,flag==2时Groups列表,flag==3时Members列表

    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        if (this.flag == 1) {
           this.initProjectsList(this.projectID);
            
        }
        else if (this.flag == 2) {
            this.initGroupsList();
           
        } else {
            this.initMembersList();
            
        }
    },
    //加载Projects列表
    initProjectsList: function () {
        var obj = this;
        
        //获取所有项目名称
        $.post(baseUrl + "WMTask/GetAllProjects", null, function (data) {
            $("#projectListContent").html("");
            var projectStr = '<div class="proTitle_sty">Projects</div>' +
                            '<div class="ListContent"></div>' +
                            '<div class="projectList_sty">全部</div>' +
                            '<div class="projectLine"></div>';
            for (var i = 0; data != '' && i < data.length; i++) {
                projectStr += '<div class="projectList_sty" title=' + data[i].ProjectName + '>' + data[i].ProjectName + '</div>';
                obj.projectID[i] = data[i].ID;
            }           
            $("#projectListContent").css({ "left": "-100px" });
            $("#projectListContent").html(projectStr).animate({ left: "3px" });

            $(".projectList_sty").click(function () {

                var index = $(".projectList_sty").index(this);
                var jt = '<div class="projectList_sty_jt"></div>';
                $(".projectList_sty_jt").remove();
                $(".projectList_sty").removeClass("projectList_color").eq(index).append(jt).addClass("projectList_color");
                if (index == 0) {   //如果点击的是全部，项目ID为0，获取页面总数
                    $.post(baseUrl + "WMTask/GetTaskCountByProjId", { projId: 0 }, function (data) {
                        $("#totalNumber").text(data);
                        var pageCount = Math.ceil(data / 10);
                        new R2.Business.PageClick({ flag: 1, totalPage: pageCount, projId: 0 });
                    });
                } else {           //如果点击的是具体某个项目，传入项目ID，获取页面总数
                    var t = index - 1;
                    $.post(baseUrl + "WMTask/GetTaskCountByProjId", { projId: obj.projectID[t] }, function (data) {
                        var pageCount = Math.ceil(data / 10);
                        new R2.Business.PageClick({ flag: 1, totalPage: pageCount, projId: obj.projectID[t] });
                    });
                }
            });
            $(".projectList_sty").eq(0).trigger("click");
        });      
    },
    //加载Groups列表
    initGroupsList: function () {
        var obj = this;
        var projectStr = '<div class="proTitle_sty">Groups</div>' +
                        '<div class="ListContent"></div>' +
                        '<div class="groupsList_sty">全部</div>' +
                        '<div class="projectLine"></div>';
        $.post(baseUrl + "WMTask/GetAllGroups", null, function (data) {
                
            for (var i = 0; data!= '' && i < data.length; i++) {
                projectStr += '<div class="groupsList_sty">' + data[i].Title + '</div>';
                obj.groupID[i] = data[i].Id;
            }
            $("#projectListContent").html("");
            $("#projectListContent").css({ "left": "-100px" });
            $("#projectListContent").html(projectStr).animate({ left: "3px" });

            $(".groupsList_sty").unbind().bind("click", function () {

                var index = $(".groupsList_sty").index(this);
                var jt = '<div class="projectList_sty_jt"></div>';
                $(".projectList_sty_jt").remove();
                $(".groupsList_sty").removeClass("projectList_color").eq(index).append(jt).addClass("projectList_color");
                if (index == 0) {   //如果点击的是全部，小组ID为0，获取页面总数
                    $.post(baseUrl + "WMTask/GetTaskCountByGroupId", { groupId: 0 }, function (data) {
                        $("#totalNumber").text(data);
                        var pageCount = Math.ceil(data / 10);
                        new R2.Business.PageClick({ flag: 2, totalPage: pageCount, groupId: 0 });
                    });
                } else {         //如果点击的是具体某个小组，传入小组ID,获取页面总数
                    var t = index - 1;
                    $.post(baseUrl + "WMTask/GetTaskCountByGroupId", { groupId: obj.groupID[t] }, function (data) {
                        var pageCount = Math.ceil(data / 10);
                        new R2.Business.PageClick({ flag: 2, totalPage: pageCount, groupId: obj.groupID[t] });
                    });
                }
            });
            $(".groupsList_sty").eq(0).trigger("click");
        });
    },
    //加载Members列表
    initMembersList: function () {
        var obj = this;
        $.post(baseUrl + "WMTask/GetAllMembers", {}, function (data) {
            
            var projectStr = '<div class="proTitle_sty">Groups</div>' +
                         '<div class="ListContent"></div>' +
                         '<div class="membersList_sty">全部</div>' +
                         '<div class="projectLine"></div>';
            for (var i = 0; data!= '' && i < data.length; i++) {
                projectStr += '<div class="membersList_sty1">' + data[i].RealName + '</div>';
                obj.memberID[i]=data[i].Id;
            }
            $("#projectListContent").html("");
            $("#projectListContent").css({ "left": "-100px" });
            $("#projectListContent").html(projectStr).animate({ left: "3px" });
            $(".membersList_sty").unbind().bind("click", function () {

                var jt = '<div class="projectList_sty_jt"></div>';
                $(".projectList_sty_jt").remove();
                $(".membersList_sty1").removeClass("projectList_color");
                $(".membersList_sty").append(jt).addClass("projectList_color");
                //如果点击的是全部，成员ID为0，获取页面总数
                $.post(baseUrl + "WMTask/GetTaskCountByUserId", { UserId: 0 }, function (data) {
                    var pageCount = Math.ceil(data / 10);
                    new R2.Business.PageClick({ flag: 3, totalPage: pageCount, memberId: 0, });
                });
            });
            $(".membersList_sty1").unbind().bind("click", function () {

                var index = $(".membersList_sty1").index(this);
                var jt = '<div class="projectList_sty_jt"></div>';
                $(".projectList_sty_jt").remove();
                $(".membersList_sty").removeClass("projectList_color");
                $(".membersList_sty1").removeClass("projectList_color").eq(index).append(jt).addClass("projectList_color");
                //如果点击的是某个成员，传入成员ID,获取页面总数
                $.post(baseUrl + "WMTask/GetTaskCountByUserId", { UserId: obj.memberID[index] }, function (data) {
                    var pageCount = Math.ceil(data / 10);
                    new R2.Business.PageClick({ flag: 3, totalPage: pageCount, memberId: obj.memberID[index], });
                });
            });
            $(".membersList_sty").trigger("click");
        });       
    },
    CLASS_NAME: "R2.Business.ProjectsGroupsMembersList"
});

/*------------------------------------------翻页功能的点击事件----------------------------------------*/
R2.Business.PageClick = OpenLayers.Class({
    flag: "",
    currentPage: 1,
    totalPage: 0,
    projId: 0,
    groupId: 0,
    memberId: 0,
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.registpageClick();
        $(".pageBtn_sty").eq(0).trigger("click");
    },
    registpageClick: function () {
        var obj = this;
        $(".pageBtn_sty").unbind().bind("click", function () {
            var index = $(".pageBtn_sty").index(this);
            if (index == 0) {
                obj.currentPage = 1;
            }
            else if (index == 1 && obj.currentPage > 1) {
                obj.currentPage -= 1;
            }
            else if (index == 3 && obj.currentPage < obj.totalPage) {
                obj.currentPage += 1;
            }
            else if (index == 4) {
                obj.currentPage = obj.totalPage;
            }
            if (obj.currentPage == 1) {
                $(".pageBtn_sty").removeClass("pageBtn_sty1").eq(0).addClass("pageBtn_sty1");
                $(".pageBtn_sty").eq(1).addClass("pageBtn_sty1");
            }
            else if (obj.currentPage == obj.totalPage) {
                $(".pageBtn_sty").removeClass("pageBtn_sty1").eq(4).addClass("pageBtn_sty1");
                $(".pageBtn_sty").eq(3).addClass("pageBtn_sty1");
            }
            else { $(".pageBtn_sty").removeClass("pageBtn_sty1"); }
            switch (obj.flag) {
                case 1: {//发送项目ID（为0或者为projId），每页显示数量，当前页
                    $.post(baseUrl + "WMTask/GetTasksByProjIdWithPgInfo", { projId: obj.projId, numOnePage: 10, pageIndex: obj.currentPage }, function (data) {
                        new R2.Business.AllTaskList({ task: data, currentPage: obj.currentPage });
                    }); break;
                }
                case 2: {//发送小组ID（为0或者为groupId），每页显示数量，当前页
                    $.post(baseUrl + "WMTask/GetTaskByGroupIdWithPgIno", { groupId: obj.groupId, numOnePage: 10, pageIndex: obj.currentPage }, function (data) {
                        new R2.Business.AllTaskList({ task: data, currentPage: obj.currentPage });
                    }); break;
                }
                case 3: {//发送成员ID（为0或者为memberId），每页显示数量，当前页
                    $.post(baseUrl + "WMTask/GetTaskByUserIdWithPgIno", { userId: obj.memberId, numOnePage: 10, pageIndex: obj.currentPage }, function (data) {
                        new R2.Business.AllTaskList({ task: data, currentPage: obj.currentPage });
                    }); break;
                }
                default: { }
            }

            $("#currentPage").text(obj.currentPage);
            $("#totalPage").text(obj.totalPage);
        });
    },
    CLASS_NAME: "R2.Business.PageClick"
});



/*-----------------------------------------所有任务列表----------------------------------------*/
R2.Business.AllTaskList = OpenLayers.Class({
    //所有待确认任务信息
    task: [],
    currentPage: 0,
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
     
        this.initTitle();
        this.initList();
        this.registListClick();
        this.registEditClick();
        this.registDeleteClick();
    },
    //加载待确认任务列表标题
    initTitle: function () {
        ////加载列表标题
        var confirmTitleStr = '<div id="confirmListTitle">' +
                                    '<div id="NO" class="list_text" style="color:black;">序号</div>' +
                                    '<div id="taskPeople" class="list_text"style="color:black;">任务责任人</div>' +
                                    '<div id="taskNam" class="list_text"style="color:black;">任务名称</div>' +
                                    '<div id="taskScheduledTime" class="list_text"style="color:black;">计划完成时间</div>' +
                                    '<div id="taskScheduledBonus" class="list_text"style="color:black;">计划工时数</div>' +
                                    '<div id="taskChecker" class="list_text"style="color:black;">操作</div>' +
                                    '</div>' +
                                '<div id="taskmanageListContent"></div>';
        $("#taskmanageList").html("");
        $("#taskmanageList").html(confirmTitleStr);

    },
    //加载任务列表
    initList: function () {
        var obj = this;
        $("#confirmListContent").empty();
        $("#taskmanageListContent").empty();
        if (obj.task != "") {
            for (var i = 0; i < obj.task.length; i++) {
                var strList = '<div class="List_sty"></div>';
                $("#taskmanageListContent").append(strList);
                var strList = '<div class="list_text Number">' + (i+(obj.currentPage-1)*10+1) + '</div>' +
                                    '<div class="list_text task_peo">' + obj.task[i].TaskerName + '</div>' +
                                    '<div class="list_text task_nam">' + obj.task[i].TaskTitle + '</div>' +
                                    '<div class="list_text sche_time">' + obj.task[i].ScheduledFinishTime + '</div>' +
                                    '<div class="list_text sche_bonus">' + obj.task[i].ScheduledBonus + '</div>' +
                                    '<div class="list_text task_checker"><lable class="edit_sty">编辑</lable><lable class="delete_sty">删除</lable></div>';
                $(".List_sty").eq(i).append(strList);

            }
        }
    },
    //点击某一行，跳转到对应任务详情

    registListClick: function () {
        var obj = this;
        $(".List_sty").click(function () {
            var index = $(".List_sty").index(this);
            new R2.Business.TaskDetail({ task: obj.task[index] });
        });

    },
    //点击编辑
    registEditClick: function () {
        var obj = this;
        var userInfo = window.localStorage.globalUserInfoStr;
        var identity = userInfo.split("#")[3];
        $(".edit_sty").click(function (event) {
            if (identity != 3) {
                new R2.Business.AlertWindow("对不起，您没有此权限！");
            } else {
                var index = $(".edit_sty").index(this);

                //获取责任人和审核人
                $.post(baseUrl + "WMTask/GetAllMembers", {}, function (data) {
                    var nameStr = [];
                    var idStr = [];
                    for (var i = 0; i < data.length; i++) {
                        nameStr[i] = data[i].RealName;
                        idStr[i] = data[i].Id;
                    }
                    new R2.Business.TaskEdit({
                        task: obj.task[index],
                        taskPerson: nameStr,
                        taskPersonId: idStr,
                        taskChecker: nameStr,
                        taskCheckerId: idStr,
                    });
                });
               
            }
            event.stopPropagation();//停止事件冒泡
        });
    },
    //点击删除
    registDeleteClick: function () {
        var obj = this;
        var userInfo = window.localStorage.globalUserInfoStr;
        var identity = userInfo.split("#")[3];
        //var identity = 3;
        $(".delete_sty").click(function (event) {
            if (identity != 3) {
                new R2.Business.AlertWindow("对不起，您没有此权限！");
              //  new R2.Business.TaskManage();
            } else {
                new R2.Business.AlertWindow("确定要删除该任务吗？", { ensureId: "deleteclick", HasCancel: true });
                var index = $(".delete_sty").index(this);
                
            }
            $("#deleteclick").click(function () {
                $.post(baseUrl + "WMTask/DeleteTask", { taskId: obj.task[index].ID }, function (data) {
                    if (data == "success") {
                        new R2.Business.AlertWindow("任务删除成功！");
                    }
                    //new R2.Business.TaskManage();
                    if ($(".projectList_sty").length != 0) {
                        $(".projectList_sty").eq(0).trigger("click");
                    }
                    else if ($(".groupsList_sty").length != 0) {
                        $(".groupsList_sty").eq(0).trigger("click");
                    }
                    else {
                        $(".membersList_sty").trigger("click");
                    }
                });

            });
            event.stopPropagation();
        });
        
    },
    CLASS_NAME: "R2.Business.AllTaskList"
});


/*----------------------------------------------任务编辑页面----------------------------------------*/
R2.Business.TaskEdit = OpenLayers.Class({
    task: [],
    // 项目名称
    projectName: "",
    //项目编号
    projectNumber: "",
    //Id
    projectNO: "",

    //责任人
    taskPerson: "",
    //责任人id
    taskPersonId: "",
    //任务审核人 
    taskChecker: "",
    //任务审核人id
    taskCheckerId: "",
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.initTaskPerson();
        this.initTaskChecker();   
        this.initProject();
        this.registClick();
       
    },
    initPage: function () {
        var obj = this;
        $("#WManager_right").html("");
        var str = '<div id="addTask_text">任务编辑<div class="tri_img"></div></div>' +
                    '<div id="Task_content"><form action="" method="POST" id="addTaskForm">' +
                    '<div class="taskType_sty"><lable class="text_sty">任务类型：</lable><input id="TaskType" type="radio" style="margin-right:5px;margin-left:27px;" name="rwlx" value="2" checked=true/>计划<input type="radio" style="margin-right:5px;margin-left:5px;" name="rwlx" value="1"/>机动</div>' +
                    '<div class="taskType_sty"><lable class="text_sty">任务类别：</lable><div id="rwlb_text"><div class="rwlb_sty">编码</div><div class="rwlb_sty">测试</div><div class="rwlb_sty">需求调研</div><div class="rwlb_sty">交流学习</div><div class="rwlb_sty">项目实施</div><div class="rwlb_sty">文档编写</div></div></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">项目名称：</lable><select id="ProjectName" class="input_sty" type="text"></select></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">项目编号：</lable><div class="text_stybh"></div></div>' +
                    '<div class="taskType_sty taskType_sty3"><lable class="text_sty">任务名称：</lable><input id="TaskTitle" type="text" class="input_sty" ></div>' +
                    '<div class="taskType_sty taskType_sty3"><lable class="text_sty">任务二级分类：</lable><input id="TaskSecondTitle" type="text" class="input_sty"></div>' +
                    '<div class="taskType_sty taskType_sty2"><lable class="text_sty text_sty2">任务内容：</lable><textarea class="textareaSty input_sty" id="TaskContent" rows="5" cols="96"></textarea></div>' +
                    '<div class="taskType_sty taskType_sty2"><lable class="text_sty text_sty2">任务标准：</lable><textarea class="textareaSty input_sty" id="TaskStandard" rows="5" cols="96"></textarea></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">计划工时：</lable><input id="ScheduleBonus" type="text" class="input_sty" value="0"></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">责任人：</lable><select id="TaskPerson" type="text" class="input_sty"></select></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">计划开始时间：</lable><input id="ScheduledStartTime" class="input_sty" type="text"></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">计划完成时间：</lable><input id="ScheduledFinishTime" class="input_sty" type="text"></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">任务状态：</lable><select id="TaskStatus" style="margin-left:27px;" class="input_sty" type="text"><option value="1">正在进行</option><option value="2">延期</option><option value="16">已完成</option><option value="4">作废</option><option value="32">增加时间</option></select></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">实际完成时间：</lable><input id="ConfirmedFinishTime"  class="input_sty" type="text"></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">任务所用小时数：</lable><input id="UsedHours" style="margin-left:-14px;" class="input_sty" type="text"></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">核算工时：</lable><input id="Bonus"style="margin-left:27px;" type="text" class="input_sty" value="0"></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">任务质量系数：</lable><input id="QualityFactor" class="input_sty" type="text"></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">任务所属月份：</lable><select id="TaskMonth" class="input_sty" type="text"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">Apirl</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">Auguest</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">任务所属周次：</lable><select id="TaskWeek" class="input_sty" type="text"><option value="1">W1</option><option value="2">W2</option><option value="3">W3</option><option value="4">W4</option><option value="5">W5</option></select></div>' +
                    '<div class="taskType_sty "><lable class="text_sty">任务审核人：</lable><select id="TaskChecker"class="input_sty" type="text"></select></div>' +
                    '<div class="taskType_sty taskType_sty2"><lable class="text_sty text_sty2">备注：</lable><textarea class="textareaSty input_sty" id="TaskRemarks" rows="5" cols="96"></textarea></div>' +
                    '<div class="taskType_sty taskType_sty2"><div class="button_sty" id="send">提交</div><div class="button_sty" id="GoBack">返回</div></div></form></div>';
        $("#WManager_right").html(str);

        $("#ScheduledFinishTime,#ScheduledStartTime,#ConfirmedFinishTime").datetimepicker({
            todayBtn: 1,
            autoclose: 1,
            format: "yyyy-m-d h:00:00",
            startDate: "2014-1-1 00:00",
            minView: 1,
            forceParse: false,
        });
        new R2.Business.FormatCheck({ inputId: "TaskTitle", });
        new R2.Business.FormatCheck({ inputId: "TaskSecondTitle", });
        new R2.Business.FormatCheck({ inputId: "TaskContent", });
        new R2.Business.FormatCheck({ inputId: "TaskStandard", });
        new R2.Business.FormatCheck({ inputId: "ScheduledStartTime", });
        new R2.Business.FormatCheck({ inputId: "ScheduledFinishTime", });
        new R2.Business.FormatCheck({ inputId: "ConfirmedFinishTime", });
        new R2.Business.FormatCheck({ inputId: "ScheduleBonus", zhengze: /^(\d{1}(\.\d{1})?|10)$/ });
        new R2.Business.FormatCheck({ inputId: "Bonus", zhengze: /^(\d{1}(\.\d{1})?|10)$/ });
        new R2.Business.FormatCheck({ inputId: "QualityFactor", zhengze: /^(\d{1}(\.\d{1,2})?|10)$/ });
        new R2.Business.FormatCheck({ inputId: "UsedHours", zhengze: /^(\d{1,2}(\.\d{1})?|100)$/ });

        $("#TaskType").val(obj.task.TaskType);                       //任务类型                                                             
        
       
        $("#TaskTitle").val(obj.task.TaskTitle);                     //任务名称
        $("#TaskSecondTitle").val(obj.task.SecondLevelTitle);        //任务二级分类
        $("#TaskContent").val(obj.task.TaskContent);                 //任务内容
        $("#TaskStandard").val(obj.task.TaskFinishStandard);         //任务标准
        $("#ScheduleBonus").val(obj.task.ScheduledBonus);            //计划工时
       
        $("#ScheduledStartTime").val(obj.task.ScheduledStartTime);   //计划开始时间
        $("#ScheduledFinishTime").val(obj.task.ScheduledFinishTime); //计划完成时间
        $("#TaskStatus").val(obj.task.TaskStatus);                   //任务状态
        $("#ConfirmedFinishTime").val(obj.task.ConfirmedFinishTime); //实际完成时间
        $("#UsedHours").val(obj.task.UsedHours);                     //任务所用小时数
        $("#Bonus").val(obj.task.Bonus);                             //核算工时
        $("#QualityFactor").val(obj.task.QualityFactor);             //任务质量系数
        $("#TaskMonth").val(obj.task.Month);                         //月份
        $("#TaskWeek").val(obj.task.Week);                           //周次
       
        $("#TaskRemarks").val(obj.task.Memo);                        //备注
    },
    registClick: function () {
        var obj1 = this;
        var obj = new R2.Business.Task();
        var taskCateNumber = [1, 64, 32, 16, 4, 2];
        var str2 = '<div class="checkIcon"></div>';
        $(".rwlb_sty").click(function () {
            var index = $(".rwlb_sty").index(this);
            $(".checkIcon").remove();
            $(".rwlb_sty").removeClass("checkIcon_sty").eq(index).append(str2).addClass("checkIcon_sty");
            obj.TaskCategory = taskCateNumber[index];

        });
        $("#TaskPerson,#TaskChecker").change(function () {
            var optTasker = $("#TaskPerson option:selected").val();
            var optChecker = $("#TaskChecker option:selected").val();
            if (optTasker == optChecker) {
                new R2.Business.AlertWindow("注意：任务责任人与审核人相同！");
            }
        });
        switch (obj1.task.TaskCategory) {                               //任务类别
            case 1: { $(".rwlb_sty").eq(0).trigger("click"); break; }
            case 64: { $(".rwlb_sty").eq(1).trigger("click"); break; }
            case 32: { $(".rwlb_sty").eq(2).trigger("click"); break; }
            case 16: { $(".rwlb_sty").eq(3).trigger("click"); break; }
            case 4: { $(".rwlb_sty").eq(4).trigger("click"); break; }
            case 2: { $(".rwlb_sty").eq(5).trigger("click"); break; }
            default: { }
        }
        $("#send").unbind().bind("click", function () {
            obj.ID = obj1.task.ID;
            obj.TaskType = $('[name=rwlx]:radio:checked').val();
            obj.ProjectID = $('#ProjectName option:selected').val();
            obj.TaskTitle = $("#TaskTitle").val();
            obj.SecondLevelTitle = $("#TaskSecondTitle").val();
            obj.TaskContent = $("#TaskContent").val();
            obj.TaskFinishStandard = $("#TaskStandard").val();
            obj.ScheduledBonus = $("#ScheduleBonus").val();
            obj.TaskerNameId = $('#TaskPerson option:selected').val();
            obj.ScheduledStartTime = $("#ScheduledStartTime").val();
            obj.ScheduledFinishTime = $("#ScheduledFinishTime").val();
            obj.ConfirmedFinishTime=$("#ConfirmedFinishTime").val();
            obj.TaskStatus=$('#TaskStatus option:selected').val();
            obj.UsedHours=$("#UsedHours").val();
            obj.Bonus=$("#Bonus").val();                          
            obj.QualityFactor=$("#QualityFactor").val();
            obj.Month = $('#TaskMonth option:selected').val();
            obj.Week = $('#TaskWeek option:selected').val();
            obj.CheckerNameId = $('#TaskChecker option:selected').val();
            obj.Memo = $("#TaskRemarks").val();


            var l = $(".star_sty").length;
            if (l > 0) {
                new R2.Business.AlertWindow("输入有误，请重新输入！");
            }
            else {
                //if (obj.ScheduledStartTime > obj.ScheduledFinishTime) {
                //    new R2.Business.AlertWindow("任务日期范围有误，请重新输入！");
                //} else {
                    
                //}
                var strAddTask = "";
                strAddTask = JSON.stringify(obj);
               // alert(strAddTask);
                $.post(baseUrl + "WMTask/UpdateAFullAttrTask", { taskStr: strAddTask }, function (data) {
                    new R2.Business.AlertWindow("任务更新成功！", { ensureId: "modifyclick" });
                    $("#modifyclick").click(function () {
                        new R2.Business.TaskManage();
                    });
                });
            }
        });
        $("#GoBack").unbind().bind("click", function () {
            new R2.Business.TaskManage();
        });

    },
    initProject: function () {
        var obj = this;
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
            obj.projectName = projNameStr.split(",");
            obj.projectNumber = projNumberStr.split(",");
            obj.projectNO = projNOStr.split(",");
            obj.projectName[obj.projectName.length - 1] = "杂类";
            obj.projectNO[obj.projectNO.length - 1] = "无";

            //加载项目名称以及项目编号的联动
            for (var i = 0; i < obj.projectName.length; i++) {
                var projectName_str = '<option value="' + obj.projectNO[i] + '">' + obj.projectName[i] + '</option>';
                $("#ProjectName").append(projectName_str);
            }
            var projectNumber = obj.projectNumber;
           // $(".text_stybh").empty().append(projectNumber[0]);
            $("#ProjectName").change(function () {
                var opt = $("#ProjectName option:selected");
                var temp = opt[0].index;
                $(".text_stybh").empty().append(projectNumber[temp]);
            });
            $("#ProjectName").val(obj.task.ProjectID);                       //项目名称
            $(".text_stybh").append(obj.task.ProNO);                     //项目编号
        });
    },
    //加载责任人
    initTaskPerson: function () {
        var obj = this;
        for (var i = 0; i < this.taskPerson.length; i++) {
            var taskPerson_str = '<option value="' + this.taskPersonId[i] + '">' + this.taskPerson[i] + '</option>';
            $("#TaskPerson").append(taskPerson_str);
        }
        $("#TaskPerson").val(obj.task.TaskerId);                     //责任人
    },
    //加载审核人
    initTaskChecker: function () {
        var obj = this;
        for (var i = 0; i < this.taskChecker.length; i++) {
            var taskChecker_str = '<option value="' + this.taskCheckerId[i] + '">' + this.taskChecker[i] + '</option>';
            $("#TaskChecker").append(taskChecker_str);
        }
        $("#TaskChecker").val(obj.task.CheckerId);
    },
    CLASS_NAME: "R2.Business.TaskEdit"
});


/*-----------------------------------------任务详情页面----------------------------------------*/
R2.Business.TaskDetail = OpenLayers.Class({
    task: [],

    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.initPage();
    },
    initPage: function () {
        var obj = this;
        $("#WManager_right").html("");
        var str = '<div id="addTask_text">任务详情<div class="tri_img"></div></div>' +
                  '<div id="detailsContent1">' +
                    '<div class="details_sty"><lable class="dtext_sty">任务编号：</lable><lable id="re" class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">录入日期：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务类型：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务类别：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">项目名称：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">项目编号：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务名称：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务二级分类：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty details_sty1"><lable class="dtext_sty" style="color:#FF643D;">任务内容：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty details_sty1"><lable class="dtext_sty" style="color:#FF643D;">任务标准：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">计划工时：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">责任人：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">计划开始时间：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">计划完成时间：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty" style="color:#FF643D;">任务状态：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty" style="color:#FF643D;">实际完成时间：</lable><lable class="dtext_content">2014-4-1 9:00</lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">所用小时数：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">核算工时：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务质量系数：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务所属月份：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务所属周次：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务审核人：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty details_sty1"><lable class="dtext_sty">备注：</lable><lable class="dtext_content"></lable></div>' +
              '</div>' +
              '<div class="button_back">返回</div>';
        $("#WManager_right").html(str);
        $(".dtext_content").eq(0).text(obj.task.ID);
        $(".dtext_content").eq(1).text(obj.task.RecordTime);
        $(".dtext_content").eq(2).text(taskType(obj.task.TaskType));
        $(".dtext_content").eq(3).text(taskCategory(obj.task.TaskCategory));
        $(".dtext_content").eq(4).text(obj.task.proName);
        $(".dtext_content").eq(5).text(obj.task.ProNO);
        $(".dtext_content").eq(6).text(obj.task.TaskTitle);
        $(".dtext_content").eq(7).text(obj.task.SecondLevelTitle);
        $(".dtext_content").eq(8).text(obj.task.TaskContent);
        $(".dtext_content").eq(9).text(obj.task.TaskFinishStandard);
        $(".dtext_content").eq(10).text(obj.task.ScheduledBonus);
        $(".dtext_content").eq(11).text(obj.task.TaskerName);
        $(".dtext_content").eq(12).text(obj.task.ScheduledStartTime);
        $(".dtext_content").eq(13).text(obj.task.ScheduledFinishTime);
        $(".dtext_content").eq(14).text(taskStatus(obj.task.TaskStatus));
        $(".dtext_content").eq(15).text(obj.task.ConfirmedFinishTime);
        $(".dtext_content").eq(16).text(obj.task.UsedHours);
        $(".dtext_content").eq(17).text(obj.task.Bonus);
        $(".dtext_content").eq(18).text(obj.task.QualityFactor);
        $(".dtext_content").eq(19).text(taskMonth(obj.task.Month));
        $(".dtext_content").eq(20).text(taskWeek(obj.task.Week));
        $(".dtext_content").eq(21).text(obj.task.CheckerName);
        $(".dtext_content").eq(22).text(obj.task.Memo);

        $(".button_back").unbind().bind("click", function () {
            new R2.Business.TaskManage();
        });
        $(".details_sty1").eq(0).css("min-height", $(".dtext_content").eq(8).height());
        $(".details_sty1").eq(1).css("min-height", $(".dtext_content").eq(9).height());
    },
    CLASS_NAME: "R2.Business.TaskDetail"
});