/*
*描述：新增任务
*create by xyp 2014-4-22 
*/

R2.Business.AddTask = OpenLayers.Class({
   // 项目名称
    projectName: "",
    //项目编号
    projectNumber:"",
    //项目Id
    projectId: "",

    //责任人
    taskPerson: "",
    //责任人id
    taskPersonId:"",
    //任务审核人 
    taskChecker: "", 
    //任务审核人id
    taskCheckerId: "",

    initialize: function (option) {
        
        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.initProjectName();
        this.initTaskPerson();
        this.initTaskChecker();
        this.registEvent();
       
    },
    //加载录入页面
    initPage: function () {
        $("#WManager_right").html("");
        var str = '<div id="addTask_text">录入任务<div class="tri_img"></div></div>'+
                    '<div id="Task_content"><form action="" method="POST" id="addTaskForm">'+
                    '<div class="taskType_sty"><lable class="text_sty">任务类型：</lable><input type="radio" style="margin-right:5px;margin-left:27px;" name="rwlx" value="2" id="jihua" checked=true/><lable for="jihua">计划</lable><input type="radio" style="margin-right:5px;margin-left:5px;" name="rwlx" value="1" id="jidong"/><lable for="jidong">机动</lable></div>' +
                    '<div class="taskType_sty"><lable class="text_sty text_redcolor">任务类别：</lable><div id="rwlb_text"><div class="rwlb_sty">编码</div><div class="rwlb_sty">测试</div><div class="rwlb_sty">需求调研</div><div class="rwlb_sty">交流学习</div><div class="rwlb_sty">项目实施</div><div class="rwlb_sty">文档编写</div></div></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">项目名称：</lable><select id="ProjectName" class="input_sty" type="text"></select></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">项目编号：</lable><div class="text_stybh"></div></div>' +
                    '<div class="taskType_sty taskType_sty3"><lable class="text_sty">任务名称：</lable><input id="TaskTitle" type="text" class="input_sty" ><lable class="star_sty">*</lable></div>' +
                    '<div class="taskType_sty taskType_sty3"><lable class="text_sty">任务二级分类：</lable><input id="TaskSecondTitle" type="text" class="input_sty"><lable class="star_sty">*</lable></div>' +
                    '<div class="taskType_sty taskType_sty2"><lable class="text_sty text_sty2 text_redcolor">任务内容：</lable><textarea class="textareaSty input_sty" id="TaskContent" rows="5" cols="96"></textarea><lable class="star_sty">*</lable></div>' +
                    '<div class="taskType_sty taskType_sty2"><lable class="text_sty text_sty2">任务标准：</lable><textarea class="textareaSty input_sty" id="TaskStandard" rows="5" cols="96"></textarea><lable class="star_sty">*</lable></div>' +
                    '<div class="taskType_sty"><lable class="text_sty text_redcolor">计划工时：</lable><input id="ScheduleBonus" type="text" class="input_sty" value=""><lable class="star_sty">*</lable></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">责任人：</lable><select id="TaskPerson" type="text" class="input_sty"></select></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">计划开始时间：</lable><input id="ScheduledStartTime"  class="input_sty" type="text"><lable class="star_sty">*</lable></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">计划完成时间：</lable><input id="ScheduledFinishTime" class="input_sty" type="text"><lable class="star_sty">*</lable></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">任务所属月份：</lable><select id="TaskMonth" class="input_sty" type="text"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">Apirl</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">Auguest</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">任务所属周次：</lable><select id="TaskWeek" class="input_sty" type="text"><option value="1">W1</option><option value="2">W2</option><option value="3">W3</option><option value="4">W4</option><option value="5">W5</option></select></div>' +
                    '<div class="taskType_sty "><lable class="text_sty">任务审核人：</lable><select id="TaskChecker"class="input_sty" type="text"></select></div>' +
                    '<div class="taskType_sty taskType_sty2"><lable class="text_sty text_sty2">备注：</lable><textarea class="textareaSty input_sty" id="TaskRemarks" rows="5" cols="96"></textarea></div>' +
                    '<div class="taskType_sty taskType_sty2"><div class="button_sty" id="send">提交</div><div class="button_sty" id="GoBack">返回</div></div></form></div>';
        $("#WManager_right").html(str);
       
        $("#ScheduledStartTime,#ScheduledFinishTime").datetimepicker({
            todayBtn: 1,
            autoclose: 1,
            format: "yyyy-m-d h:00:00",
            startDate:"2014-1-1 00:00",
            minView: 1,
            forceParse: false,
        });
       
        new R2.Business.FormatCheck({ inputId: "TaskTitle", });
        new R2.Business.FormatCheck({ inputId: "TaskSecondTitle", });
        new R2.Business.FormatCheck({ inputId: "TaskContent", });
        new R2.Business.FormatCheck({ inputId: "TaskStandard", });
        new R2.Business.FormatCheck({ inputId: "ScheduledStartTime", });
        new R2.Business.FormatCheck({ inputId: "ScheduledFinishTime", });
        new R2.Business.FormatCheck({ inputId: "ScheduleBonus", zhengze: /^(\d{1}(\.\d{1})?|10)$/ });
        var date = new Date();
        var month = date.getMonth()+1;
        $("#TaskMonth").val(month);
    },
    //加载项目名称以及项目编号的联动
    initProjectName: function () {
        for (var i = 0; i < this.projectName.length; i++) {
            var projectName_str = '<option value="' + this.projectId[i] + '">' + this.projectName[i] + '</option>';
            $("#ProjectName").append(projectName_str);
        }       
        var projectNumber = this.projectNumber;
        $(".text_stybh").empty().append(projectNumber[0]);
        $("#ProjectName").change(function () {
            var opt = $("#ProjectName option:selected");
            var temp = opt[0].index;
            $(".text_stybh").empty().append(projectNumber[temp]);
        });       
    },
    //加载责任人
    initTaskPerson: function () {
        for (var i = 0; i < this.taskPerson.length; i++) {
            var taskPerson_str = '<option value="' + this.taskPersonId[i] + '">' + this.taskPerson[i] + '</option>';
            $("#TaskPerson").append(taskPerson_str);
        }
        var userInfo = window.localStorage.globalUserInfoStr;
        var userId = userInfo.split("#")[0];
        $("#TaskPerson").val(userId);
    },
    //加载审核人
    initTaskChecker: function () {
        for (var i = 0; i < this.taskChecker.length; i++) {
            var taskChecker_str = '<option value="' + this.taskCheckerId[i] + '">' + this.taskChecker[i] + '</option>';
            $("#TaskChecker").append(taskChecker_str);
        }
    },

    //点击事件
    registEvent: function () {
        var object = this;
        ////创建一个任务对象
        var obj = new R2.Business.Task();
        obj.TaskCategory = 0;
        ////选择任务类别
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
        
        ////点击返回
        $("#GoBack").click(function () {
            $(".WM_confirm").trigger("click");
        });
        ////点击提交
        $("#send").click(function () {
            var test = 0;
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
            obj.Month = $('#TaskMonth option:selected').val();
            obj.Week = $('#TaskWeek option:selected').val();
            obj.CheckerNameId = $('#TaskChecker option:selected').val();
            obj.Memo = $("#TaskRemarks").val();
            //alert(obj.TaskContent);
            if (obj.TaskCategory == 0) {
                new R2.Business.AlertWindow("请选择任务类别！"); return;
            }
            var l = $(".star_sty").length;
            if (l > 0) {
                new R2.Business.AlertWindow("输入格式有误，请重新输入！");
            }
            else {
                //if (obj.ScheduledBonus == "0") {
                //    new R2.Business.AlertWindow("计划工时数为0，是否确认？",{ ensureId: "scheduledBonusClick", HasCancel: true });
                //}
                //if (obj.TaskerNameId == obj.CheckerNameId) {
                //    new R2.Business.AlertWindow("任务责任人与审核人相同，是否确认？", { ensureId: "taskerCheckerClick", HasCancel: true });
                //}
                //if (obj.ScheduledStartTime > obj.ScheduledFinishTime) {
                //    new R2.Business.AlertWindow("任务日期范围有误，请重新输入！");
                //}
                //else {
                //    object.sendpost(obj);
                //}
                object.sendpost(obj);
            }
        });
    },
    //发送post请求，添加任务
    sendpost: function (obj) {
        var strAddTask = "";
        strAddTask = JSON.stringify(obj);
        //alert(strAddTask);
        $.post(baseUrl + "WMTask/AddTask", { taskStr: strAddTask }, function (data) {
            if (data == "success") {
                new R2.Business.AlertWindow("任务录入成功！", { "LoadUrl": "WorkManagerHome/WorkManager" });
            }
        });
    },
    CLASS_NAME: "R2.Business.AddTask"
});
