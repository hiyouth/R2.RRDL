/*计划时间模块 by-xyp 2014年6月5日11:51:22*/


/*---------------------------------2014-2020年--------------------------------------------*/
R2.Business.Years = OpenLayers.Class({
    flag:0,
    day: [[1, 2, 0, 6, 5],
                  [0, 0, 0, 0, 0],
                  [1, 2, 0, 6, 5],
                  [0, 0, 3, 0, 0],
                  [0, 5, 0, 5, 0],
                  [0, 5, 0, 1, 0],
                  [0, 0, 4, 0, 0],
                  [0, 0, 5, 0, 0],
                  [0, 0, 0, 0, 5],
                  [0, 0, 3, 0, 0],
                  [0, 2, 0, 5, 0],
                  [1, 0, 4, 0, 0]],
    initialize: function (option) {

        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.registClickEvt();
        $(".yearList li").eq(0).trigger("click");
    },
    initPage: function () {
        $("#WManager_right").html("");
        var years = ["2014年", "2015年", "2016年", "2017年", "2018年", "2019年", "2020年", "2021年", "2022年", "2023年"]
        var strYear = '<div class="yearsContent"><ul class="yearList"></ul><div class="moreList"></div></div>';
        $("#WManager_right").html(strYear).css({"overflow-x":"hidden","min-width":"1120px"});
        for (var i = 0; i < years.length; i++)
        {
            var yearContent = '<li>' + years[i] + '</li>';
            $(".yearList").append(yearContent);
        }
        $(".yearList li:eq(7),.yearList li:eq(8),.yearList li:eq(9),.yearList li:eq(10),.yearList li:eq(11)").hide();
        $("#WManager_right").append('<div class="moreMonth"></div>');
    },
    registClickEvt: function () {
        var that = this;
        var year;
        $(".yearList li").click(function () {
            var index = $(".yearList li").index(this);
            year = index + 2014;
            $(".yearList li").removeClass("textColor").eq(index).addClass("textColor");
            new R2.Business.Month({ year:year,day: that.day,flag:that.flag });
        });
        $(".moreList").toggle(function () {
            $(".moreList").addClass("moreList_1");
            $(".yearList li:eq(7),.yearList li:eq(8),.yearList li:eq(9),.yearList li:eq(10),.yearList li:eq(11)").show();
        }, function () {
            $(".moreList").removeClass("moreList_1");
            $(".yearList li:eq(7),.yearList li:eq(8),.yearList li:eq(9),.yearList li:eq(10),.yearList li:eq(11)").hide();
        });

        $(".moreMonth").toggle(function () {
            that.flag = 1;
            $(".monthList:eq(9),.monthList:eq(10),.monthList:eq(11)").show();
            $(".moreMonth").addClass("moreMonth_1");
            $("#WManager_left").hide();
            $("#WManager_right").animate({ "left": "0px" });

        }, function () {
            that.flag = 0;
            $(".moreMonth").removeClass("moreMonth_1");
            $(".monthList:eq(9),.monthList:eq(10),.monthList:eq(11)").hide();
            $("#WManager_left").show();
            $("#WManager_right").animate({ "left": "210px" });
        });
    },
    CLASS_NAME: "R2.Business.Years"
});

/*-----------------------------------月份--------------------------------------------*/
R2.Business.Month = OpenLayers.Class({
    flag:0,
    year:2014,
    month : ["January","February","March","Apirl","May","June","July","Auguest","September","October","November","December"],
    week : ["W1","W2","W3","W4","W5"],
       
    day:[],
    initialize: function (option) {

        OpenLayers.Util.extend(this, option);
        this.initPage();
        this. registClick();
    },
    initPage: function () {
        $(".monthContent").remove();
        $(".changeBtn").remove();
        var strMonth = '<div class="monthContent">' +
                       '</div><div class="changeBtn">' +
                           '<div class="yuandian"></div>' + 
                           '<lable id="lableYear">2014</lable><lable id="lableMonth">May</lable><lable id="lableWeek">W1</lable>' +
                           '<input id="scheduleDay" type="text" class="input_sty" value=""><lable class="day_Sty">&nbsp;&nbsp;天</lable>' +
                           '<div id="confirmBtn">确定</div>' +
                       '</div>';
        $("#WManager_right").append(strMonth);
        for (var i = 0; i < 12; i++)
        {
            var months = '<div class=monthList><div class="month_text">' + this.month[i] + '</div><ul class="weekList"></ul></div>';
            $(".monthContent").append(months);
            for (var j = 0; j < 5; j++)
            {
                var wk = '<li>' + this.week[j] + '（<span class="daySty">' + this.day[i][j] + '</span>天）' + '</li>';
                $(".weekList").eq(i).append(wk);
            }
        }
        // $("#WManager_right").append('<div class="moreMonth"></div>');
        if (this.flag == 0) {
            $(".monthList:eq(9),.monthList:eq(10),.monthList:eq(11)").hide();
        }
        var userInfo = window.localStorage.globalUserInfoStr;
        var identity = userInfo.split("#")[3];
        
    },
    registClick: function () {
        var that = this;
        //10、11、12月的显示与隐藏
        //$(".moreMonth").toggle(function () {
        //    $(".monthList:eq(9),.monthList:eq(10),.monthList:eq(11)").show();
        //    $(".moreMonth").addClass("moreMonth_1");
        //    $("#WManager_left").hide();
        //    $("#WManager_right").animate({"left":"0px"});

        //}, function () {
        //    $(".moreMonth").removeClass("moreMonth_1");
        //    $(".monthList:eq(9),.monthList:eq(10),.monthList:eq(11)").hide();
        //    $("#WManager_left").show();
        //    $("#WManager_right").animate({ "left": "210px" });
        //});
        var indexWeek;
        //点击每周，对应下方的日期信息文本改变
        $(".weekList li").click(function () {          
            indexWeek = $(".weekList li").index(this);
            var month = parseInt(indexWeek / 5) + 1;
            var week = indexWeek % 5 + 1;
            $(".weekList li").removeClass("textColor1").eq(indexWeek).addClass("textColor1");
            $(".daySty").removeClass("textColor1").eq(indexWeek).addClass("textColor1");
            $("#lableYear").text(that.year);
            $("#lableMonth").text(taskMonth(month));
            $("#lableWeek").text("W" + week);
            $("#scheduleDay").val($(".daySty").eq(indexWeek).text());
        });
        //确定按钮事件，修改每周的计划时间
        $("#confirmBtn").click(function () {
            $(".daySty").eq(indexWeek).text($("#scheduleDay").val());
        });
    },
    CLASS_NAME: "R2.Business.Month"
});