/*
**团队分数统计功能模块. 表格统计
**created by xyp @2014.05.17
*/
R2.Business.BonusTableStatistics = OpenLayers.Class({
    initialize: function (option) {

        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.initClick();
        $("#bonusTableStatistics ul li").eq(0).trigger("click");
    },
    initPage: function () {
        $("#WManager_right").html("");
        var strTableMonth = '<div id="bonusTableStatistics">' +
                            '<ul>' +
                                '<li class="head_month">月&nbsp;&nbsp;份</li>' +
                                '<li class="head_season">季&nbsp;&nbsp;度</li>' +
                                '<li class="head_year">全&nbsp;&nbsp;年</li>' +
                            '</ul>' +
                            '<div class="bonusTableStatisticsMain">' +                                                             
                            '</div>'
                        '</div>';
        $("#WManager_right").html(strTableMonth);      
    },
    initClick: function () {
        var that = this;
        $("#bonusTableStatistics ul li").click(function () {
            var index = $("#bonusTableStatistics ul li").index(this);
            $("#bonusTableStatistics ul li").eq(index).removeClass("StatisticsClass1").addClass("StatisticsClass").siblings().removeClass("StatisticsClass").addClass("StatisticsClass1");
            switch (index) {
                case 0: {
                    that.MonthPage(); break;
                }
                case 1: {
                    that.SensonsPage(); break;
                }
                case 2: {
                    that.YearsPage(); break;
                }
                default: { }
            }
        });
       
    },
    MonthPage: function () {
        $(".bonusTableStatisticsMain").html("");
        //<!--按月查询-->
        var str = '<div id="bounsStatitics">' +
                    '<div class="queryBtn">' +
                        '<div id="queryGroup" class="querySty">' +
                            '<lable class="queryLable">小&nbsp;组：</lable>' +
                            '<select id="queryGroupName" class="input_sty" type="text">' +
                                '<option>R2Team</option>' +
                                '<option>水利组</option>' +
                            '</select>' +
                        '</div>' +
                        '<div id="queryYear" class="querySty">' +
                            '<lable class="queryLable">年&nbsp;份：</lable>' +
                            '<select id="queryYearName" class="input_sty" type="text">' +
                                '<option>2014</option>' +
                                '<option>2015</option>' +
                                '<option>2016</option>' +
                            '</select>' +
                        '</div>' +
                        '<div id="queryMonth" class="querySty">' +
                            '<lable class="queryLable">月&nbsp;份：</lable>' +
                            '<select id="queryMonthName" class="input_sty" type="text">' +
                                '<option value="1">January</option>' +
                                '<option value="2">February</option>' +
                                '<option value="3">March</option>' +
                                '<option value="4">April</option>' +
                                '<option value="5">May</option>' +
                                '<option value="6">June</option>' +
                                '<option value="7">July</option>' +
                                '<option value="8">August</option>' +
                                '<option value="9">September</option>' +
                                '<option value="10">October</option>' +
                                '<option value="11">November</option>' +
                                '<option value="12">December</option>' +
                            '</select>' +
                        '</div>' +
                        '<div id="searchBtn">Search</div>' +
                    '</div>' +
                    '<div class="bonusStatisticsTableContent"></div>' +
                '</div>';
        $(".bonusTableStatisticsMain").html(str);
        var strData = '';
        for (var i = 0; i < 4; i++) {
            strData += '<tr>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td>熊燕萍</td>' +
                        '<td>33</td>' +
                        '<td>38</td>' +
                        '<td>35</td>' +
                        '<td>34</td>' +
                        '<td>30</td>' +
                        '<td>32</td>' +
                        '<td>126</td>' +
                        '<td>3</td>' +
                        '<td>1</td>' +
                        '<td>5</td>' +
                        '<td>5</td>' +
                        '</tr>';
        }
        var strTable = '<table id="bonusStaticTable" border="0" cellspacing="0" cellpadding="0" >' +
                            '<thead>' +
                            '<tr>' +
                                '<th style="width: 100px;">编号</th>' +
                                '<th style="width: 120px;">团队精英</th>' +
                                '<th style="width: 100px;">w1</th>' +
                                '<th style="width: 100px;">w2</th>' +
                                '<th style="width: 100px;">w3</th>' +
                                '<th style="width: 100px;">w4</th>' +
                                '<th style="width: 100px;">w5</th>' +
                                '<th style="width: 120px;">周平均</th>' +
                                '<th style="width: 120px;">月总分</th>' +
                                '<th style="width: 120px;">月增分</th>' +
                                '<th style="width: 120px;">月减分</th>' +
                                '<th style="width: 130px;">计划工作天数</th>' +
                                '<th style="width: 130px;">实际工作天数</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody>' + strData + '</tbody>' +
                       '</table>'
        $(".bonusStatisticsTableContent").append(strTable);
        $('#bonusStaticTable tbody tr:odd').css('background-color', '#FaFaFa');
        $('#bonusStaticTable tbody tr:even').css('background-color', '#DFF0D8');

        $("#searchBtn").click(function () {
        });

    },
    SensonsPage: function () {
        $(".bonusTableStatisticsMain").html("");
        //<!--按季度查询-->
        var str = '<div id="bounsStatitics">' +
                                    '<div class="queryBtn">' +
                                        '<div id="queryGroup" class="querySty">' +
                                            '<lable class="queryLable">小&nbsp;组：</lable>' +
                                            '<select id="queryGroupName" class="input_sty" type="text">' +
                                                '<option>R2Team</option>' +
                                                '<option>水利组</option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div id="queryYear" class="querySty">' +
                                            '<lable class="queryLable">年&nbsp;份：</lable>' +
                                            '<select id="queryYearName" class="input_sty" type="text">' +
                                                '<option>2014</option>' +
                                                '<option>2015</option>' +
                                                '<option>2016</option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div id="querySenson" class="querySty">' +
                                            '<lable class="queryLable">季&nbsp;度：</lable>' +
                                            '<select id="queryMonthName" class="input_sty" type="text">' +
                                                '<option value="1">Senson1</option>' +
                                                '<option value="2">Senson2</option>' +
                                                '<option value="3">Senson3</option>' +
                                                '<option value="4">Senson4</option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div id="searchBtn">Search</div>' +
                                    '</div>' +
                                    '<div class="bonusStatisticsTableContent"></div>' +
                                '</div>';
        $(".bonusTableStatisticsMain").html(str);
        var strData = '';
        for (var i = 0; i < 4; i++) {
            strData += '<tr>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td>熊燕萍</td>' +
                        '<td>33</td>' +
                        '<td>38</td>' +
                        '<td>35</td>' +                
                        '<td>36</td>' +
                        '<td>326</td>' +        
                        '<td>22</td>' +
                        '<td>20</td>' +
                        '</tr>';
        }
        var strTable = '<table id="bonusStaticTable" border="0" cellspacing="0" cellpadding="0">' +
                            '<thead>' +
                            '<tr>' +
                                '<th style="width: 100px;">编号</th>' +
                                '<th style="width: 120px;">团队精英</th>' +
                                '<th style="width: 100px;">M1</th>' +
                                '<th style="width: 100px;">M2</th>' +
                                '<th style="width: 100px;">M3</th>' +                               
                                '<th style="width: 120px;">周平均</th>' +
                                '<th style="width: 120px;">季度总分</th>' +
                                '<th style="width: 130px;">计划工作天数</th>' +
                                '<th style="width: 130px;">实际工作天数</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody>' + strData + '</tbody>' +
                       '</table>'
        $(".bonusStatisticsTableContent").append(strTable);
        $('#bonusStaticTable tbody tr:odd').css('background-color', '#FaFaFa');
        $('#bonusStaticTable tbody tr:even').css('background-color', '#DFF0D8');

        $("#searchBtn").click(function () {
            var senson = $("#queryMonthName").val();
            switch (senson) {
                case "1": {
                    $("#bonusStaticTable thead tr th").eq(2).text("M1");
                    $("#bonusStaticTable thead tr th").eq(3).text("M2");
                    $("#bonusStaticTable thead tr th").eq(4).text("M3");
                    break;
                }
                case "2": {
                    $("#bonusStaticTable thead tr th").eq(2).text("M4");
                    $("#bonusStaticTable thead tr th").eq(3).text("M5");
                    $("#bonusStaticTable thead tr th").eq(4).text("M6");
                    break;
                }
                case "3": {
                    $("#bonusStaticTable thead tr th").eq(2).text("M7");
                    $("#bonusStaticTable thead tr th").eq(3).text("M8");
                    $("#bonusStaticTable thead tr th").eq(4).text("M9");
                    break;
                }
                case "4": {
                    $("#bonusStaticTable thead tr th").eq(2).text("M10");
                    $("#bonusStaticTable thead tr th").eq(3).text("M11");
                    $("#bonusStaticTable thead tr th").eq(4).text("M12");
                    break;
                }
                default: { }
            }
        });
    },
    YearsPage: function () {
        $(".bonusTableStatisticsMain").html("");
        //<!--按年查询-->
        var str = '<div id="bounsStatitics">' +
                                    '<div class="queryBtn">' +
                                        '<div id="queryGroup" class="querySty">' +
                                            '<lable class="queryLable">小&nbsp;组：</lable>' +
                                            '<select id="queryGroupName" class="input_sty" type="text">' +
                                                '<option>R2Team</option>' +
                                                '<option>水利组</option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div id="queryYear" class="querySty">' +
                                            '<lable class="queryLable">年&nbsp;份：</lable>' +
                                            '<select id="queryYearName" class="input_sty" type="text">' +
                                                '<option>2014</option>' +
                                                '<option>2015</option>' +
                                                '<option>2016</option>' +
                                            '</select>' +
                                        '</div>' +
                                        '<div id="searchBtn">Search</div>' +
                                    '</div>' +
                                    '<div class="bonusStatisticsTableContent"></div>' +
                                '</div>';
        $(".bonusTableStatisticsMain").html(str);
        var strData = '';
        for (var i = 0; i < 4; i++) {
            strData += '<tr>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td>熊燕萍</td>' +
                        '<td>33</td>' +
                        '<td>38</td>' +
                        '<td>35</td>' +
                        '<td>36</td>' +
                        '<td>33</td>' +
                        '<td>38</td>' +
                        '<td>35</td>' +
                        '<td>36</td>' +
                        '<td>33</td>' +
                        '<td>38</td>' +
                        '<td>35</td>' +
                        '<td>36</td>' +
                        '<td>36</td>' +
                        '<td>826</td>' +
                        '<td>22</td>' +
                        '<td>20</td>' +
                        '</tr>';
        }
        var strTable = '<table id="bonusStaticTable" border="0" cellspacing="0" cellpadding="0">' +
                            '<thead>' +
                            '<tr>' +
                                '<th style="width: 100px;">编号</th>' +
                                '<th style="width: 120px;">团队精英</th>' +
                                '<th style="width: 100px;">M1</th>' +
                                '<th style="width: 100px;">M2</th>' +
                                '<th style="width: 100px;">M3</th>' +
                                '<th style="width: 100px;">M4</th>' +
                                '<th style="width: 100px;">M5</th>' +
                                '<th style="width: 100px;">M6</th>' +
                                '<th style="width: 100px;">M7</th>' +
                                '<th style="width: 100px;">M8</th>' +
                                '<th style="width: 100px;">M9</th>' +
                                '<th style="width: 100px;">M10</th>' +
                                '<th style="width: 100px;">M11</th>' +
                                '<th style="width: 100px;">M12</th>' +
                                '<th style="width: 120px;">周平均</th>' +
                                '<th style="width: 120px;">年总分</th>' +
                                '<th style="width: 130px;">计划工作天数</th>' +
                                '<th style="width: 130px;">实际工作天数</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody>' + strData + '</tbody>' +
                       '</table>'
        $(".bonusStatisticsTableContent").append(strTable);
        $('#bonusStaticTable tbody tr:odd').css('background-color', '#FaFaFa');
        $('#bonusStaticTable tbody tr:even').css('background-color', '#DFF0D8');
    },
    CLASS_NAME: "R2.Business.BonusTableStatistics"
});