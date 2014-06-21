/*
*描述：移交任务，在数据库中新增一条任务
*create by xyp 2014-5-10 
*/

R2.Business.HandOverTask = OpenLayers.Class({
    task:"",
    flag:0,
    initialize: function (option) {

        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.registEvent();
    },
    //加载录入页面
    initPage: function () {
        
        var obj = this;
        $("#WManager_right").html("");
        var str = '<div class="pageTitle_">移交任务<div class="tri_img"></div></div>' +
            '<div id="Confirm_content"><div id="Comfirm_top">' +
                '<div class="taskType_sty"><lable class="text_sty">任务名称：</lable><input id="TaskTitle" type="text" class="input_sty" ></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">任务二级分类：</lable><input id="TaskSecondTitle" type="text" class="input_sty"></div>' +
                    '<div class="taskType_sty taskType_sty2"><lable class="text_sty text_sty2">任务内容：</lable><textarea class="textareaSty input_sty" id="TaskContent" rows="5" cols="100"></textarea></div>' +
                    '<div class="taskType_sty taskType_sty2"><lable class="text_sty text_sty2">任务标准：</lable><textarea class="textareaSty input_sty" id="TaskStandard" rows="5" cols="100"></textarea></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">计划工时：</lable><input id="ScheduleBonus" type="text" class="input_sty" value="0"></div>' +
                     '<div class="taskType_sty"><lable class="text_sty">计划开始时间：</lable><input id="ScheduledStartTime" class="input_sty" type="text"></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">计划完成时间：</lable><input id="ScheduledFinishTime" class="input_sty" type="text"><lable class="star_sty">*</lable></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">任务所属月份：</lable><select id="TaskMonth" class="input_sty" type="text"><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">Apirl</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">Auguest</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select></div>' +
                    '<div class="taskType_sty"><lable class="text_sty">任务所属周次：</lable><select id="TaskWeek" class="input_sty" type="text"><option value="1">W1</option><option value="2">W2</option><option value="3">W3</option><option value="4">W4</option><option value="5">W5</option></select></div>' +
                    '<div class="taskType_sty taskType_sty2"><lable class="text_sty text_sty2">备注：</lable><textarea class="textareaSty input_sty" id="TaskRemarks" rows="5" cols="100"></textarea></div>' +
                '<div class="taskConfirm_sty taskConfirm_sty2"><div class="button_sty" id="send_Confirm">确认移交</div><div class="button_sty" id="GoBack_">返回</div></div>'+
             '</div><div class="HandOverTask_details">' +
                '<div class="details_text">任务详情：</div>'+
                '<div id="detailsContent">' +
                    '<div class="details_sty"><lable class="dtext_sty">任务类型：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务类别：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">项目名称：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">项目编号：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">责任人：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">计划工时数：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">已核算工时数：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务质量系数：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务所属月份：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务所属周次：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务审核人：</lable><lable class="dtext_content"></lable></div>' +                   
              '</div>'+
        '</div></div>';
     
        $("#WManager_right").html(str);

        $("#TaskTitle").val(obj.task.TaskTitle);
        $("#TaskSecondTitle").val(obj.task.SecondLevelTitle);
        $("#TaskContent").val(obj.task.TaskContent);
        $("#TaskStandard").val(obj.task.TaskFinishStandard);
        $("#ScheduleBonus").val(obj.task.ScheduledBonus);
        $("#ScheduledStartTime").val(obj.task.ScheduledStartTime);
        $("#ScheduledFinishTime").val(obj.task.ScheduledFinishTime);
        $("#TaskMonth").val(obj.task.Month);
        $("#TaskWeek").val(obj.task.Week);
        $("#TaskRemarks").val(obj.task.Memo);


        $(".dtext_content").eq(0).text(taskType(obj.task.TaskType));
        $(".dtext_content").eq(1).text(taskCategory(obj.task.TaskCategory));
        $(".dtext_content").eq(2).text(obj.task.proName);
        $(".dtext_content").eq(3).text(obj.task.ProNO);
        $(".dtext_content").eq(4).text(obj.task.TaskerName);
        $(".dtext_content").eq(5).text(obj.task.ScheduledBonus);
        $(".dtext_content").eq(6).text(obj.task.Bonus);
        $(".dtext_content").eq(7).text(obj.task.QualityFactor);
        $(".dtext_content").eq(8).text(taskMonth(obj.task.Month));
        $(".dtext_content").eq(9).text(taskWeek(obj.task.Week));
        $(".dtext_content").eq(10).text(obj.task.CheckerName);
        
       
        $("#ScheduledFinishTime,#ScheduledStartTime").datetimepicker({
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
        new R2.Business.FormatCheck({ inputId: "ScheduleBonus", zhengze: /^(\d{1}(\.\d{1})?|10)$/ });
    }, 
   

    //点击事件
    registEvent: function () {
        var object = this;
        //创建一个任务对象
        var obj = new R2.Business.Task();
      
        //点击返回
        $("#GoBack_").click(function () {
            $(".WM_check").trigger("click");
        });
        
        //点击提交
        $("#send_Confirm").click(function () {

            obj.TaskType = object.task.TaskType;
            obj.TaskCategory = object.task.TaskCategory;
            obj.ProjectID = object.task.ProjectID;
            obj.TaskTitle = $("#TaskTitle").val();
            obj.SecondLevelTitle = $("#TaskSecondTitle").val();
            obj.TaskContent = $("#TaskContent").val();
            obj.TaskFinishStandard = $("#TaskStandard").val();
            obj.ScheduledBonus = $("#ScheduleBonus").val();
            obj.TaskerNameId = object.task.TaskerId;
            obj.ScheduledStartTime = $("#ScheduledStartTime").val();
            obj.ScheduledFinishTime = $("#ScheduledFinishTime").val();
            obj.Month = $('#TaskMonth option:selected').val();
            obj.Week = $('#TaskWeek option:selected').val();
            obj.CheckerNameId = object.task.CheckerId;
            obj.Memo = $("#TaskRemarks").val();

            var l = $(".star_sty").length;
            if (l > 0) {
                new R2.Business.AlertWindow("输入有误，请重新输入！");
            }
            else {
                var strAddTask = "";
                strAddTask = JSON.stringify(obj);
             //   alert(strAddTask);
                $.post(baseUrl + "WMTask/AddTask", { taskStr: strAddTask }, function (data) {
                    if (data == "success") {
                        new R2.Business.AlertWindow("任务移交成功！", { ensureId: "handoverclick" });
                    }
                    //AlertWindow确定按钮的click事件
                   
                    $("#handoverclick").click(function () {
                        if (object.flag == 0) {
                            $(".WM_check").trigger("click");
                        }
                        else { $(".WM_confirm").trigger("click"); }
                    });
                });

            }
        });
    },
    CLASS_NAME: "R2.Business.HandOverTask"
});