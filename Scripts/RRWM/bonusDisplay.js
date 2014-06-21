/*计划时间模块 by-xyp 2014年6月5日11:51:22*/


/*---------------------------------2014-2020年--------------------------------------------*/
R2.Business.BonusDisplay = OpenLayers.Class({
    //标记左右滑动的状态 flag=0时初始状态显示1-9月数据，flag=1时滑屏显示12个月数据
    flag: 0,
    //小组成员姓名
    names: ["蒋建明", "熊燕萍", "赵森森", "曹四文", "宁楠", "李雄", "郭毅", "雷磊", "曹晓敏", "王少波"],
    //小组成员的全年数据
    day: [[11.5, 22, 20, 26, 25],
                  [15, 0, 0, 0, 0],
                  [18, 20, 0, 6, 5],
                  [0, 0, 3, 0, 0],
                  [0, 30, 0, 25, 0],
                  [0, 5, 0, 19, 0],
                  [0, 0, 14, 0, 10],
                  [0, 18, 15, 0, 0],
                  [20, 0, 21, 0, 5],
                  [0, 20, 3, 0, 19],
                  [0, 21, 0, 5, 0],
                  [28, 0, 14, 20, 0]],
    initialize: function (option) {

        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.registClickEvt();
        $(".nameList li").eq(0).trigger("click");
    },
    initPage: function () {
        $("#WManager_right").html("");
        var strName = '<div class="namesContent"><select id="groupsName" class="input_sty" type="text"><option>R2Team</option><option>水利组</option></select><ul class="nameList"></ul><div class="morenameList"></div></div>';
        $("#WManager_right").html(strName).css({ "overflow-x": "hidden", "min-width": "1130px" });
        for (var i = 0; i < this.names.length; i++) {
            var nameContent = '<li>' + this.names[i] + '</li>';
            $(".nameList").append(nameContent);
            if (i > 6) {
                $(".nameList li:eq("+i+")").hide();
            }
        }
        $("#WManager_right").append('<div class="moreMonth"></div>');
    },
    registClickEvt: function () {
        var that = this;
        $(".nameList li").click(function () {
            var index = $(".nameList li").index(this);
            $(".nameList li").removeClass("textColor").eq(index).addClass("textColor");
            new R2.Business.memberBonus({ day: that.day, flag: that.flag });
        });
        $(".morenameList").toggle(function () {
           
            $(".morenameList").addClass("morenameList_1");
            for (var i = 7; i < that.names.length; i++) {
                $(".nameList li:eq("+i+")").show();
            }
        }, function () {
          
            $(".morenameList").removeClass("morenameList_1");
            for (var i = 7; i < that.names.length; i++) {
                $(".nameList li:eq(" + i + ")").hide();
            }
        });

        $(".moreMonth").toggle(function () {
            that.flag = 1;
            $(".monthList1:eq(9),.monthList1:eq(10),.monthList1:eq(11)").show();
            $(".moreMonth").addClass("moreMonth_1");
            $("#WManager_left").hide();
            $("#WManager_right").animate({ "left": "0px" });

        }, function () {
            that.flag = 0;
            $(".moreMonth").removeClass("moreMonth_1");
            $(".monthList1:eq(9),.monthList1:eq(10),.monthList1:eq(11)").hide();
            $("#WManager_left").show();
            $("#WManager_right").animate({ "left": "210px" });
        });
    },
    CLASS_NAME: "R2.Business.BonusDisplay"
});

/*---------------------------------分数展示--------------------------------------------*/
R2.Business.memberBonus = OpenLayers.Class({
    month: ["January", "February", "March", "Apirl", "May", "June", "July", "Auguest", "September", "October", "November", "December"],
    week: ["W1", "W2", "W3", "W4", "W5"],
    flag:0,
    day: [],
    initialize: function (option) {

        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.registClick();
    },
    initPage: function () {
        $("#leftMainContent").remove();

        var strMonth = '<div id="leftMainContent"><div id="yearHead">年份：<select id="searchYear" type="text" class="input_sty"><option>2014</option><option>2015</option></select></div><div class="monthContent1"></div><div class="score"><div class="yuandian"></div><div class="scoreDetails">评分细节</div><div class="scoring">给他打分</div></div></div>';
        $("#WManager_right").append(strMonth);
        for (var i = 0; i < 12; i++) {
            var months = '<div class=monthList1><div class="month_text1">' + this.month[i] + '</div><ul class="weekList1"></ul></div>';
            $(".monthContent1").append(months);
            for (var j = 0; j < 5; j++) {
                var wk = '<li>' + this.week[j] + '<span class="daySty">（' + this.day[i][j] + '）</span>' + '</li>';
                $(".weekList1").eq(i).append(wk);
            }
        }       
            
        if (this.flag == 0) {
            $(".monthList1:eq(9),.monthList1:eq(10),.monthList1:eq(11)").hide();
        }
    },
    registClick: function () {
        var that = this;
        var indexWeek,month,week;       
        $(".scoreDetails").click(function () {
            new R2.Business.scoresDetails();
        });
        $(".scoring").click(function () {
            new R2.Business.scoring();
        });
        $(".weekList1 li").click(function () {
            indexWeek = $(".weekList1 li").index(this);
            month = parseInt(indexWeek / 5) + 1;
            week = indexWeek % 5 + 1;
            $(".weekList1 li").removeClass("textColor1").eq(indexWeek).addClass("textColor1");
            $(".daySty").removeClass("textColor1").eq(indexWeek).addClass("textColor1");
        });
    },
    CLASS_NAME: "R2.Business.memberBonus"
});
/*---------------------------------评分细节--------------------------------------------*/

R2.Business.scoresDetails = OpenLayers.Class({
    data:"",
    initialize: function (option) {

        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.registClick();
    },
    initPage: function () {
        $("#leftMainContent").remove();
       
        var str = '<div class="detailsHead">' +
                        '<div class="dateDetails">年份：<lable id="yearHeadLab">2014</lable><lable id="monthHeadLab">May</lable><lable id="weekHeadLab">W1</lable></div>' +
                  '</div>' +
                  '<div class="bounsContent">' +
                  '<table id="bonusTable1" border="0" cellspacing="0" cellpadding="0" >' +
                        '<thead>' +
                            '<tr>' +
                                '<th style="width: 100px;">周合计</th>' +
                                '<th style="width: 120px;">加分合计</th>' +
                                '<th style="width: 100px;">减分合计</th>' +
                                '<th style="width: 100px;">工时</th>' +
                                '<th style="width: 200px;">本周实际工作天数</th>' +
                                '<th style="width: 200px;">评价</th>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                            '<tr>' +
                                '<td>23</td>' +
                                '<td>3</td>' +
                                '<td>1</td>' +
                                '<td>3.5</td>' +
                                '<td>5</td>' +
                                '<td>注意编码规范问题dfs上的发生方式上的大幅度的方</td>' +
                            '</tr>' +
                        '</tbody>' +
                  '</table>' +
                  '</div>' +
                  '<div class="bounsContent2">' +
                  '<table id="bonusTable2" border="0" cellspacing="0" cellpadding="0" >' +
                        '<thead>' +
                            '<tr>' +
                                '<th style="width: 100px;">未按时汇报</th>' +
                                '<th style="width: 160px;">未主动沟通造成任务延期</th>' +
                                '<th style="width: 100px;">超出预期加分</th>' +
                                '<th style="width: 100px;">周例会缺勤</th>' +
                                '<th style="width: 100px;">五天全勤</th>' +
                                '<th style="width: 100px;">创新思考</th>' +
                                '<th style="width: 80px;">出差</th>' +
                                '<th style="width: 100px;">参加培训活动</th>' +
                                '<th style="width: 80px;">机动1</th>' +
                                '<th style="width: 80px;">机动2</th>' +
                                '<th style="width: 80px;">机动3</th>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                            '<tr>' +
                                '<td>0</td>' +
                                '<td>0</td>' +
                                '<td>1</td>' +
                                '<td>0</td>' +
                                '<td>2</td>' +
                                '<td>1</td>' +
                                '<td>0</td>' +
                                '<td>1</td>' +
                                '<td>0</td>' +
                                '<td>0</td>' +
                                '<td>0</td>' +
                            '</tr>' +
                        '</tbody>' +
                  '</table>'+
                  '</div>' +
                  '<div id="goback">返回</div>';
        $("#WManager_right").append(str);
    },
    registClick: function () {
        $("#goback").click(function () {
            new R2.Business.BonusDisplay();
        });
        $(".nameList li").unbind();
    },
    CLASS_NAME: "R2.Business.scoresDetails"
});

/*---------------------------------给他打分-------------------------------------------*/
R2.Business.scoring = OpenLayers.Class({
    initialize: function (option) {

        OpenLayers.Util.extend(this, option);
        new R2.Business.scoresDetails();
        this.initPage();       
        $("#goback").remove();
        this.registClick();
    },
    initPage: function () {
       
        var strScoring = '<div id="scorinContent">' +
                            '<div class="scoring_Content"><div class="score_lable">本周实际工作天数：</div><input id="workDay" type="text" class="input_sty"></div>' +
                            '<div class="scoring_Content"><div class="score_lable">未按时汇报：</div><input id="notReport" type="text" class="input_sty"><lable class="score_lable1">未按时汇报-2分</lable></div>' +
                            '<div class="scoring_Content"><div class="score_lable">未主动沟通造成任务延期：</div><input id="notCommunicate" type="text" class="input_sty"><lable class="score_lable1">未沟通-2分</lable></div>' +
                            '<div class="scoring_Content"><div class="score_lable">超出预期加分：</div><input id="beyondExpectation" type="text" class="input_sty"><lable class="score_lable1">超出预期+2分</lable></div>' +
                            '<div class="scoring_Content"><div class="score_lable">周&nbsp;&nbsp;例&nbsp;&nbsp;会&nbsp;&nbsp;缺&nbsp;&nbsp;勤：&nbsp;</div><input id="absentDuty" type="text" class="input_sty"><lable class="score_lable1">周例会缺勤-2分</lable></div>' +
                            '<div class="scoring_Content"><div class="score_lable">五&nbsp;天&nbsp;全&nbsp;勤：&nbsp;</div><input id="fullDuty" type="text" class="input_sty"><lable class="score_lable1">五天全勤+2分</lable></div>' +
                            '<div class="scoring_Content"><div class="score_lable">创&nbsp;&nbsp;新&nbsp;&nbsp;思&nbsp;&nbsp;考：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><input id="creatIdea" type="text" class="input_sty"><lable class="score_lable1">有新想法+2分</lable></div>' +
                            '<div class="scoring_Content"><div class="score_lable">出&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;差：&nbsp;&nbsp;</div><input id="businessTravel" type="text" class="input_sty"><lable class="score_lable1">按出差天数加分</lable></div>' +
                            '<div class="scoring_Content"><div class="score_lable">参&nbsp;加&nbsp;培&nbsp;训&nbsp;活&nbsp;动：</div><input id="training" type="text" class="input_sty"><lable class="score_lable1">参加培训活动+2分</lable></div>' +
                            '<div class="scoring_Content"><div class="score_lable">机&nbsp;&nbsp;&nbsp;动&nbsp;&nbsp;&nbsp;1：&nbsp;&nbsp;&nbsp;</div><input id="maneuver1" type="text" class="input_sty"></div>' +
                            '<div class="scoring_Content"><div class="score_lable">评&nbsp;&nbsp;价：</div><textarea id="evaluate" type="text" class="input_sty" rows="3" cols="38"></textarea></div>' +
                            '<div class="scoring_Content"><div class="score_lable">机&nbsp;&nbsp;&nbsp;动&nbsp;&nbsp;&nbsp;2：&nbsp;&nbsp;&nbsp;</div><input id="maneuver2" type="text" class="input_sty"></div>' +
                            '<div class="scoring_Content"></div>'+
                            '<div class="scoring_Content"><div class="score_lable">机&nbsp;&nbsp;&nbsp;动&nbsp;&nbsp;&nbsp;3：&nbsp;&nbsp;&nbsp;</div><input id="maneuver3" type="text" class="input_sty"></div>' +
                            '<div id="determine">确定</div>'+
                         '</div>';
        $("#WManager_right").append(strScoring);
    },
    registClick: function () {
        $("#determine").click(function () {
            new R2.Business.BonusDisplay();
        });
        $(".nameList li").unbind();
    },
    CLASS_NAME: "R2.Business.scoring"
});