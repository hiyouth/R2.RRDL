/*描述：检测录入任务的信息是否符合规则。
*create by 熊燕萍 2014-5-13 
*/
R2.Business.FormatCheck = OpenLayers.Class({
    inputId:"",
    zhengze:null,
   
    initialize: function (option) {

        OpenLayers.Util.extend(this, option);
        this.check();
    },
    check: function () {
        var obj = this;
        switch (obj.inputId) {
            case "TaskTitle": { obj.taskTitleCheck(); break; }
            case "TaskSecondTitle":
            case "TaskContent":
            case "TaskStandard": { obj.taskcontentCheck(); break; }
            case "ScheduledStartTime":
            case "ConfirmedFinishTime":
            case "ScheduledFinishTime": { obj.datetimeCheck(); break; }
            case "ScheduleBonus":
            case "Bonus":
            case "QualityFactor":
            case "UsedHours":{ obj.bonusCheck(); break; }
            default: { }
        }      
    },
    taskTitleCheck: function () {
        var obj = this;
        $("#" + obj.inputId).blur(function () {
            var $parent = $(this).parent();
            $("#" + obj.inputId).next().remove();
            //不能为空且长度不能超过8！
            if (this.value == "" || this.value.length > 20) {   
                $parent.append('<lable class="star_sty">×</lable>');
            }
            else {     
                $parent.append('<img src="' + baseUrl + 'Content/RRWM/img/checkicon.png" class="msg_ok">');
            }
        });

    },
    taskcontentCheck: function () {
        var obj = this;
        $("#" + obj.inputId).blur(function () {
            var $parent = $(this).parent();
            $("#" + obj.inputId).next().remove();
            if (this.value == "") {
                $parent.append('<lable class="star_sty">×</lable>');
            }
            else {    
                $parent.append('<img src="' + baseUrl + 'Content/RRWM/img/checkicon.png" class="msg_ok">');    
            }
        });

    },
    datetimeCheck: function () {
        var obj = this;
       
        $("#" + obj.inputId).datetimepicker().on('changeDate', function(ev){   
            var $parent = $("#" + obj.inputId).parent();
            $("#" + obj.inputId).next().remove();
            //if (obj.inputId == "ScheduledFinishTime") {
            //    var finishtime = $("#ScheduledFinishTime").val();
            //    var starttime = $("#ScheduledStartTime").val();
               
            //    if (this.value == "" || starttime > finishtime) {
            //        $parent.append('<lable class="star_sty">×</lable>');
            //    }
            //    else {
            //        $parent.append('<img src="' + baseUrl + 'Content/RRWM/img/checkicon.png" class="msg_ok">');
            //    }
            //}
            //else {
                if (this.value == "") {
                    $parent.append('<lable class="star_sty">×</lable>');
                    
                }
                else {
                    $parent.append('<img src="' + baseUrl + 'Content/RRWM/img/checkicon.png" class="msg_ok">');
                    if (obj.inputId == "ScheduledStartTime") {
                        var time1 = $("#ScheduledStartTime").val();                       
                        $('#ScheduledFinishTime').datetimepicker('setStartDate', time1);
                    }
                    if (obj.inputId == "ScheduledFinishTime") {
                        var time2 = $("#ScheduledFinishTime").val();
                        $('#ScheduledStartTime').datetimepicker('setEndDate', time2);
                    }
                }
            //}
        });
    },
    bonusCheck: function () {
        var obj = this;
        var z = new RegExp(obj.zhengze);
        $("#" + obj.inputId).blur(function () {
            var $parent = $(this).parent();
            var val = this.value;
            $("#" + obj.inputId).next().remove();
         
            if (obj.inputId == "QualityFactor") {
                if (!z.test(val) || val == ""||val>1.5) {
                    $parent.append('<lable class="star_sty">×&nbsp;(0~1.5)</lable>');
                }
                else {                   
                        $parent.append('<img src="' + baseUrl + 'Content/RRWM/img/checkicon.png" class="msg_ok">');                   
                }
            }
            else {
                if (!z.test(val) || val == "") {
                    $parent.append('<lable class="star_sty">×</lable>');
                }
                else {
                    if (val == "0") {
                        new R2.Business.AlertWindow("注意：您输入的数为0！");
                    }
                   $parent.append('<img src="' + baseUrl + 'Content/RRWM/img/checkicon.png" class="msg_ok">');
                }
            }
        });
    },
    CLASS_NAME: "R2.Business.FormatCheck"
});
