/*
*描述：确认任务界面和审核任务界面
*create by xyp 2014-5 
*/

/*-------------------------确认任务界面和审核任务界面--------------------------*/
R2.Business.ConfirmAndCheckTaskPage = OpenLayers.Class({

    task:"",
    flag:1,//flag==1时是确认任务界面，flag==2时是审核任务界面
    initialize: function (option) {

        OpenLayers.Util.extend(this, option);
        this.initPage();
       
        if (this.flag == 1) {
           
            this.confirmTaskClick();  //待确认     
        }
        else {
            this.checkTaskClick();  //待审核
        }
        
    },
    //搭建确认任务界面
    initPage: function () {
        var obj = this;
        $("#WManager_right").html("");
        var str = '<div id="pageTitle">TP-RRWM团队综合管理系统<div class="tri_img"></div></div>'+
            '<div id="Confirm_content"><div id="Comfirm_top">' +
                '<div class="taskConfirm_sty"><lable class="text_sty">任务状态：</lable><select id="taskState" class="input_sty" type="text"><option value="2">延期</option><option value="16" selected=true>已完成</option><option value="4">作废</option><option value="32">增加时间</option></select></div>' +
                '<div class="taskConfirm_sty taskConfirm_sty1"><lable class="text_sty">实际完成时间：</lable><input id="ConfirmedFinishTime" class="input_sty" type="text"><lable class="star_sty">*</lable></div>' +
                '<div class="taskConfirm_sty" style="width:290px;"><lable class="text_sty">任务所用小时数：</lable><input id="UsedHours" style="width:80px;"type="text" class="input_sty" value=""><lable class="star_sty">*</lable></div>' +
                '<div class="taskConfirm_sty taskConfirm_sty2"><lable class="text_sty text_sty2">备注：</lable><textarea class="textareaSty input_sty" id="TaskRemarks_" style="margin-left:90px;" rows="4" cols="102"></textarea></div>' +
                '<div class="taskConfirm_sty taskConfirm_sty2"><div class="button_sty" id="send_Confirm">提交</div><div class="button_sty" id="GoBack_">返回</div></div>'+
         '</div><div id="Task_details">' +
                '<div class="details_text">任务详情：</div>'+
                '<div id="detailsContent">' +
                    '<div class="details_sty"><lable class="dtext_sty">任务编号：</lable><lable id="re" class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">录入日期：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务类型：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务类别：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">项目名称：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">项目编号：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务名称：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务二级分类：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty details_sty1"><lable class="dtext_sty">任务内容：</lable><div class="dtext_content"></div></div>' +
                    '<div class="details_sty details_sty1"><lable class="dtext_sty">任务标准：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">计划工时：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">责任人：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">计划开始时间：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">计划完成时间：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务所属月份：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务所属周次：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty"><lable class="dtext_sty">任务审核人：</lable><lable class="dtext_content"></lable></div>' +
                    '<div class="details_sty details_sty1"><lable class="dtext_sty">备注：</lable><lable class="dtext_content"></lable></div>' +
              '</div>'+
        '</div></div>';
     
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
        $(".dtext_content").eq(14).text(taskMonth(obj.task.Month));
        $(".dtext_content").eq(15).text(taskWeek(obj.task.Week));
        $(".dtext_content").eq(16).text(obj.task.CheckerName);
        $(".dtext_content").eq(17).text(obj.task.Memo);
        $("#TaskRemarks_").val(obj.task.Memo);//备注      
        $("#ConfirmedFinishTime").datetimepicker({
            todayBtn: 1,
            autoclose: 1,
            format: "yyyy-m-d h:00:00",
            startDate: "2014-1-1 00:00",
            minView: 1,
            forceParse: false,
        });
        new R2.Business.FormatCheck({ inputId: "ConfirmedFinishTime" });
        new R2.Business.FormatCheck({ inputId: "UsedHours", zhengze: /^(\d{1,2}(\.\d{0})?|100)$/ });//0-100之间


       // alert($(".dtext_content").eq(8).height());
        $(".details_sty1").eq(0).css("min-height", $(".dtext_content").eq(8).height());
        $(".details_sty1").eq(1).css("min-height", $(".dtext_content").eq(9).height());
    },
    //确认任务的click事件
    confirmTaskClick: function () {
        var userInfo = window.localStorage.globalUserInfoStr;
        var taskerInfo = userInfo.split("#")[0];
       
            var obj = this;
            var object = new R2.Business.Task();
            $("#taskState").click(function () {
                object.TaskStatus = $('#taskState option:selected').val();
                if (object.TaskStatus == "2" || object.TaskStatus == "32") {
                    $("#send_Confirm").text("移交任务");
                }
                else {
                    $("#send_Confirm").text("提交");
                }
            });
            //提交按钮确认任务
            $("#send_Confirm").click(function () {
                if (taskerInfo != obj.task.TaskerId) {
                    new R2.Business.AlertWindow("对不起，您不是该任务的责任人无法确认此任务！");
                } else {
                    var l = $(".star_sty").length;
                    if (l > 0) {
                        new R2.Business.AlertWindow("输入有误，请重新输入！");
                    }
                    else {
                        object.ID = obj.task.ID;
                        object.TaskStatus = $('#taskState option:selected').val();
                       // obj.task.TaskStatus = $('#taskState option:selected').val(); //任务状态
                        object.ConfirmedFinishTime = $("#ConfirmedFinishTime").val();
                       // obj.task.ConfirmedFinishTime = $("#ConfirmedFinishTime").val(); //实际完成时间
                        object.UsedHours = $("#UsedHours").val();
                       // obj.task.UsedHours = $("#UsedHours").val(); //任务所用小时数
                        object.Memo = $("#TaskRemarks_").val();
                        var strModifyTask = "";
                        strModifyTask = JSON.stringify(object);
                      
                        $.post(baseUrl + "WMTask/ConfirmTask", { task: strModifyTask }, function (data) {
                            if (data == "success") {
                                if (object.TaskStatus == "2" || object.TaskStatus == "32") {
                                    new R2.Business.AlertWindow("确认要移交任务吗？", { ensureId: "checkclick1", HasCancel: true, });
                                } else {

                                    new R2.Business.AlertWindow("任务确认成功！", { ensureId: "checkclick" });

                                }
                            }
                            //AlertWindow确定按钮的click事件
                            $("#checkclick1").click(function () {
                                new R2.Business.HandOverTask({ task: obj.task,flag:1 });//移交任务
                            });
                            $("#checkclick").click(function () {
                                $(".WM_confirm").trigger("click");
                            });         
                        });
                    }
                }
            });
       
        //返回按钮
        $("#GoBack_").click(function () {
            $(".WM_confirm").trigger("click");      
        });
    },
    //审核任务的click事件
    checkTaskClick: function () {
        var userInfo = window.localStorage.globalUserInfoStr;
        var taskerInfo = userInfo.split("#")[0];

        var obj = this;
        $(".star_sty").remove();
        var strAppend = '<div class="taskConfirm_sty" ><lable class="text_sty">核算工时：</lable><input id="Bonus" type="text" class="input_sty" value=""><lable class="star_sty">*</lable></div>' +
                '<div class="taskConfirm_sty taskConfirm_sty3"><lable class="text_sty">任务质量系数：</lable><input id="QualityFactor"  type="text" class="input_sty" value=""><lable class="star_sty">*&nbsp;(0~1.5)</lable></div>';
        $(".taskConfirm_sty").eq(2).after(strAppend);

        $("#taskState").val(obj.task.TaskStatus);//任务完成状态
        $("#ConfirmedFinishTime").val(obj.task.ConfirmedFinishTime);//实际完成时间
        $("#UsedHours").val(obj.task.UsedHours);//所用小时数
        $("#TaskRemarks_").val(obj.task.Memo);//备注
        var temp = 0;
        if (obj.task.TaskStatus == "2" || obj.task.TaskStatus == "32") {
            temp = 1;
        }
        new R2.Business.FormatCheck({ inputId: "Bonus", zhengze: /^(\d{1}(\.\d{1})?|10)$/ });
        new R2.Business.FormatCheck({ inputId: "QualityFactor", zhengze: /^(\d{1}(\.\d{1,2})?|10)$/ });
        
        var object = new R2.Business.Task();
        $("#taskState").click(function () {
            object.TaskStatus = $('#taskState option:selected').val();
            if ((object.TaskStatus == "2" && temp == 0) || (object.TaskStatus == "32" && temp == 0)) {
                $("#send_Confirm").text("移交任务");
            }
            else {
                $("#send_Confirm").text("提交");
            }
        });
        //提交按钮审核任务
        $("#send_Confirm").click(function () {
            if (taskerInfo != obj.task.CheckerId) {
                new R2.Business.AlertWindow("对不起，您不是该任务的审核人无法审核此任务！");
            } else {

                object.ID = obj.task.ID;
                object.TaskStatus = $('#taskState option:selected').val(); //任务状态
                obj.task.TaskStatus = $('#taskState option:selected').val(); //任务状态
                object.ConfirmedFinishTime = $("#ConfirmedFinishTime").val(); //实际完成时间
                obj.task.ConfirmedFinishTime = $("#ConfirmedFinishTime").val(); //实际完成时间
                object.UsedHours = $("#UsedHours").val(); //任务所用小时数
                obj.task.UsedHours = $("#UsedHours").val(); //任务所用小时数
                object.Memo = $("#TaskRemarks_").val();//备注
                obj.task.Memo = $("#TaskRemarks_").val();//备注
                object.Bonus = $("#Bonus").val();    //工时数
                obj.task.Bonus = $("#Bonus").val();    //工时数
                object.QualityFactor = $("#QualityFactor").val();  //任务质量系数
                obj.task.QualityFactor = $("#QualityFactor").val();  //任务质量系数

                var l = $(".star_sty").length;
                if (l > 0) {
                    new R2.Business.AlertWindow("输入有误，请重新输入！");
                }
                else {
                    var strModifyTask = "";
                    strModifyTask = JSON.stringify(object);
                    //alert(strModifyTask);
                    $.post(baseUrl + "WMTask/ModifyTaskNomal", { task: strModifyTask }, function (data) {

                        if (data == "success") {
                            if ((object.TaskStatus == "2" && temp == 0) || (object.TaskStatus == "32" && temp == 0)) {
                                new R2.Business.AlertWindow("确认要移交任务吗？", { ensureId: "checkclick1", HasCancel:true,});                               
                            } else {

                                new R2.Business.AlertWindow("任务审核成功！", { ensureId: "checkclick" }); 

                            }
                        }
                        //AlertWindow确定按钮的click事件
                        $("#checkclick1").click(function () {
                            new R2.Business.HandOverTask({ task: obj.task,flag:0 });//移交任务
                        });
                        $("#checkclick").click(function () {
                            $(".WM_check").trigger("click");
                        });
                    });
                }
            }
        });
       
        //返回按钮
        $("#GoBack_").click(function () {
            $(".WM_check").trigger("click");            
        });
    },
    
    CLASS_NAME: "R2.Business.ConfirmAndCheckTaskPage"
});
function taskType(index) {
    var str = "";
    switch (index) {
        case 1: { str = "机动"; break; }
        case 2: { str = "计划"; break; }
        default: { }
    }
    return str;
}
function taskCategory(index) {
    var str = "";
    switch (index) {
        case 1: { str = "编码"; break; }
        case 2: { str = "文档编写"; break; }
        case 4: { str = "项目实施"; break; }
        case 16: { str = "交流学习"; break; }
        case 32: { str = "需求调研"; break; }
        case 64: { str = "测试"; break; }
        default: { }
    }
    return str;
}
function taskStatus(index) {
    var str = "";
    switch (index) {
        case 1: { str = "正在进行"; break; }
        case 2: { str = "延期"; break; }
        case 4: { str = "作废"; break; }
        case 16: { str = "已完成"; break; }
        case 32: { str = "增加时间"; break; }
        default: { }
    }
    return str;
}
function taskMonth(index) {
    var str = "";
    switch (index) {
        case 1: { str = "January"; break; }
        case 2: { str = "February"; break; }
        case 3: { str = "March"; break; }
        case 4: { str = "Apirl"; break; }
        case 5: { str = "May"; break; }
        case 6: { str = "June"; break; }
        case 7: { str = "July"; break; }
        case 8: { str = "Auguest"; break; }
        case 9: { str = "September"; break; }
        case 10: { str = "October"; break; }
        case 11: { str = "November"; break; }
        case 12: { str = "December"; break; }
        default: { }
    }
    return str;
}
function taskWeek(index) {
    var str = "";
    switch (index) {
        case 1: { str = "W1"; break; }
        case 2: { str = "W2"; break; }
        case 3: { str = "W3"; break; }
        case 4: { str = "W4"; break; }
        case 5: { str = "W5"; break; }
        default: { }
    }
    return str;
}