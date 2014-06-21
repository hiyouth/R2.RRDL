R2.Business.BonusChartStatistics = OpenLayers.Class({
    initialize: function (option) {

        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.initClick();
        $(".bonusQueryBtns li").eq(0).trigger("click");
        
    },
    initPage: function () {
        $("#WManager_right").html("");
        var str = '<div id="bonusChartStatistics">' +
                        '<div id="bonusColumChart">' +
                            '<div class="bonusColumTitle">分数统计</div>' +
                                '<ul class="bonusQueryBtns">' +
                                    '<li class="queryselected">周&nbsp;累&nbsp;计</li>' +
                                    '<li class="queryunSelected">月&nbsp;累&nbsp;计</li>' +
                                    '<li class="queryunSelected">季度累计</li>' +
                                    '<li class="queryunSelected">年&nbsp;累&nbsp;计</li>' +
                                '</ul>' +
                                '<div id="bonusColumContent"></div>' +
                        '</div>' +
                        //'<div id="bonusLineChart"></div>' +
                  '</div>';
        $("#WManager_right").html(str);      
    },
    initClick: function () {
        var that = this;
        $(".bonusQueryBtns li").click(function () {
            var index = $(".bonusQueryBtns li").index(this);
            $(".bonusQueryBtns li").eq(index).removeClass("queryunSelected").addClass("queryselected").siblings().removeClass("queryselected").addClass("queryunSelected");
            switch (index) {
                case 0: { that.WeekStatic(); break; }
                case 1: { that.MonthStatic(); break; }
                case 2: { that.SensonStatic(); break; }
                case 3: { that.YearStatic(); break; }
                default: { }
            }
        });
    },
    initSelectBtn: function () {
        $("#bonusColumContent").html("");
        var strWeek = '<div class="queryBtn">' +
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
                                '<option value="2014">2014</option>' +
                                '<option value="2015">2015</option>' +
                                '<option value="2016">2016</option>' +
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
                        '<div id="queryWeek" class="querySty">' +
                            '<lable class="queryLable">周&nbsp;数：</lable>' +
                            '<select id="queryWeekName" class="input_sty" type="text">' +
                                '<option value="1">W1</option>' +
                                '<option value="2">W2</option>' +
                                '<option value="3">W3</option>' +
                                '<option value="4">W4</option>' +
                                '<option value="5">W5</option>' +
                            '</select>' +
                        '</div>' +
                        '<div id="searchBtn">Search</div>' +
                    '</div>' +
                    '<div id="bonusColumChartContent"></div>';
        $("#bonusColumContent").html(strWeek);
    },
    WeekStatic: function () {
        var that = this;
        that.initSelectBtn();
       
        $("#searchBtn").click(function () {
            var group = $("#queryGroupName option:selected").text();
            var year = $("#queryYearName").val();
            var month = $("#queryMonthName").val();
            var week=$("#queryWeekName option:selected").text();
            //数据展示
            var data = [30,22,31,28];
            var name = ["熊燕萍", "蒋建明", "赵森", "曹四文"];
            var otherInfo = {
                type: "周累计",
                group: group,
                date: year + "." + month + "." + week,
            };
            that.showbonusColum(data, name, otherInfo);
        });
        $("#searchBtn").trigger("click");
    },
    MonthStatic: function () {
        var that = this;
        that.initSelectBtn();
        $("#queryWeek").remove();
        $("#searchBtn").click(function () {
            var group = $("#queryGroupName option:selected").text();
            var year = $("#queryYearName").val();
            var month = $("#queryMonthName").val();
            //数据展示
            var data = [70, 62, 66.8,61.5];
            var name = ["熊燕萍", "蒋建明", "赵森", "曹四文"];
            var otherInfo = {
                type: "月累计",
                group: group,
                date: year + "." + month
            };
            that.showbonusColum(data, name, otherInfo);
        });
        $("#searchBtn").trigger("click");
    },
    SensonStatic: function () {
        var that = this;
        that.initSelectBtn();
        $("#queryMonth,#queryWeek").remove();
        var strSenson = '<div id="querySenson" class="querySty">' +
                            '<lable class="queryLable">季&nbsp;度：</lable>' +
                            '<select id="queryMonthName" class="input_sty" type="text">' +
                                '<option value="1">Senson1</option>' +
                                '<option value="2">Senson2</option>' +
                                '<option value="3">Senson3</option>' +
                                '<option value="4">Senson4</option>' +
                            '</select>' +
                        '</div>';
        $("#queryYear").after(strSenson);
        $("#searchBtn").click(function () {
            var group = $("#queryGroupName option:selected").text();
            var year = $("#queryYearName").val();
            var month = $("#queryMonthName option:selected").text();
            //数据展示
            var data = [210, 222, 201,198];
            var name = ["熊燕萍", "蒋建明", "赵森", "曹四文"];
            var otherInfo = {
                type: "季度累计",
                group: group,
                date: year + "." + month
            };
            that.showbonusColum(data, name, otherInfo);
        });
        $("#searchBtn").trigger("click");
    },
    YearStatic: function () {
        var that = this;
        that.initSelectBtn();
        $("#queryMonth,#queryWeek").remove();
        $("#searchBtn").click(function () {
            var group = $("#queryGroupName option:selected").text();
            var year = $("#queryYearName").val();
            //数据展示
            var data = [830, 772, 731,688];
            var name = ["熊燕萍", "蒋建明", "赵森","曹四文"];
            var otherInfo = {
                type: "年累计",
                group: group,
                date: year
            };
            that.showbonusColum(data, name, otherInfo);
        });
        $("#searchBtn").trigger("click");
    },
    initColumnData:function(data, name) {
        var str = "";
        var color = ['#72c259', '#f2f39c', '#f6ac8f', '#6cbcde', '#304894', '#322487', '#286692'];
        for (i = 0; i < name.length; i++) {
            str += "{name: '" + name[i] + "', y: " + data[i] + ", color: '" + color[i] + "'},";
        }
        var str3 = "[" + str + "]";
        var data_all = eval('(' + str3 + ')');
        return data_all;
    },
    showbonusColum: function (data, name,otherInfo) {
        var data_all = this.initColumnData(data, name);
        $('#bonusColumChartContent').highcharts({
            chart: {
                type: 'column',
                animation: Highcharts.svg,
                marginRight: 15,
                marginLeft: 40,
                borderWidth: 0
            },
            credits: {
                enabled: false
            },
            title: {
                text: otherInfo.group + '  团队精英分数统计  ' + otherInfo.date,
                y: 10
            },
            subtitle: {
                text: otherInfo.type,
                y: 35
            },
            xAxis: {
                categories:name,
                labels: {
                    // rotation: -45,
                    rotation: 0,
                    align: 'right',
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '分数 '
                }
            },
            series: [{
                name: '分数',
                data: data_all,
                dataLabels: {  //柱上面的数字
                    enabled: true,
                    rotation: 0, //旋转
                    color: 'black',
                    align: 'center',
                    x: 4,
                    y: 10,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif',
                        textShadow: '0 0 3px black'
                    }
                }
            }]

        }); 
    },
    CLASS_NAME: "R2.Business.BonusChartStatistics"
});
/*---------------------------------------折线图---------------------------------------*/
R2.Business.BonusLineStatistics = OpenLayers.Class({
    initialize: function (option) {

        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.initClick();
        $(".bonusQueryBtns li").eq(0).trigger("click");
    },
    initPage: function () {
        $("#WManager_right").html("");
        var str = '<div id="bonusChartStatistics">' +
                        '<div id="bonusColumChart">' +
                            '<div class="bonusColumTitle">平均分数统计</div>' +
                                '<ul class="bonusQueryBtns">' +                                    
                                    '<li class="queryselected">月&nbsp;累&nbsp;计</li>' +
                                    '<li class="queryunSelected">季度累计</li>' +
                                    '<li class="queryunSelected">年&nbsp;累&nbsp;计</li>' +
                                '</ul>' +
                                '<div id="bonusLineContent"></div>' +
                        '</div>' +                     
                  '</div>'
        $("#WManager_right").html(str);
    },
    initClick: function () {
        var that = this;
        $(".bonusQueryBtns li").click(function () {
            var index = $(".bonusQueryBtns li").index(this);
            $(".bonusQueryBtns li").eq(index).removeClass("queryunSelected").addClass("queryselected").siblings().removeClass("queryselected").addClass("queryunSelected");
            switch (index) {            
                case 0: { that.MonthStatic(); break; }
                case 1: { that.SensonStatic(); break; }
                case 2: { that.YearStatic(); break; }
                default: { }
            }
        });
    },
    initSelectBtn: function () {
        $("#bonusColumContent").html("");
        var strWeek = '<div class="queryBtn">' +
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
                    '<div id="bonusLineChartContent"></div>';
        $("#bonusLineContent").html(strWeek);
    },
    MonthStatic: function () {
        var that = this;
        that.initSelectBtn();
       
        $("#searchBtn").click(function () {
            var group = $("#queryGroupName option:selected").text();
            var year = $("#queryYearName").val();
            var month = $("#queryMonthName").val();
            //数据展示
            var data = [[22, 23, 31, 28, 0], [32, 22, 33, 28, 0], [25, 23, 28, 20, 0],[26,20,30,25,0]];
            var name = ["熊燕萍", "蒋建明", "赵森","曹四文"];
            var otherInfo = {
                categories: ['W1', 'W2', 'W3', 'W4', 'W5'],
                type: '月平均',
                group: group,
                date:year+"."+month
            };
            that.showDataToLineAvg(data,name,otherInfo);
        });
        $("#searchBtn").trigger("click");
    },
    SensonStatic: function () {
        var that = this;
        that.initSelectBtn();
        $("#queryMonth").remove();
        var strSenson = '<div id="querySenson" class="querySty">' +
                            '<lable class="queryLable">季&nbsp;度：</lable>' +
                            '<select id="queryMonthName" class="input_sty" type="text">' +
                                '<option value="1">Senson1</option>' +
                                '<option value="2">Senson2</option>' +
                                '<option value="3">Senson3</option>' +
                                '<option value="4">Senson4</option>' +
                            '</select>' +
                        '</div>';
        $("#queryYear").after(strSenson);
        $("#searchBtn").click(function () {
            var group = $("#queryGroupName option:selected").text();
            var year = $("#queryYearName").val();
            var month = $("#queryMonthName option:selected").text();
            //数据展示
            var data = [[22, 23, 31], [32, 22, 33], [25, 23, 28], [26, 20, 30]];
            var name = ["熊燕萍", "蒋建明", "赵森", "曹四文"];
            var otherInfo = {
                categories: ['M1', 'M2', 'M3'],
                type: '季度平均',
                group: group,
                date: year + "." + month
            };
            that.showDataToLineAvg(data, name, otherInfo);
        });
        $("#searchBtn").trigger("click");
    },
    YearStatic: function () {
        var that = this;
        that.initSelectBtn();
        $("#queryMonth").remove();
        $("#searchBtn").click(function () {
            var group = $("#queryGroupName option:selected").text();
            var year = $("#queryYearName").val();
            //数据展示
            var data = [[22, 23, 31, 32, 22, 33, 22, 23, 31, 22, 23, 31],
                        [32, 22, 33, 22, 23, 31, 25, 23, 28, 26, 20, 30],
                        [25, 23, 28, 26, 20, 30, 31, 22, 23, 22, 33, 22],
                        [26, 20, 30, 25, 23, 28, 33, 22, 23, 28, 26, 20]];
            var name = ["熊燕萍", "蒋建明", "赵森", "曹四文"];
            var otherInfo = {
                categories: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
                type: '年平均',
                group: group,
                date: year
            };
            that.showDataToLineAvg(data, name, otherInfo);
        });
        $("#searchBtn").trigger("click");
    },
    initLineData: function (data, name) {
        var str = "";
       // var color = ['#4690B2', '#0E63BA', '#187BCF', '#217D91', '#304894', '#322487', '#286692'];
        for (i = 0; i < name.length; i++) {
            str += "{name: '" + name[i] + "',data: [" + data[i] + "]},";
        }
        var str3 = "[" + str + "]";
        var data_all = eval('(' + str3 + ')');
        return data_all;
    },
    showDataToLineAvg: function (data, name, otherInfo) {
        var data_all = this.initLineData(data, name);
        $('#bonusLineChartContent').highcharts({
            chart: {
                type: 'line',
                animation: Highcharts.svg,
                marginRight: 15,
                marginLeft: 40,
                borderWidth: 0
            },
            credits: {
                enabled: false
            },
            title: {
                text: otherInfo.group+'  团队精英工时统计  '+otherInfo.date,
                y: 10
            },
            subtitle: {
                text: otherInfo.type,
                y: 35
            },
            
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },

            xAxis: {
                categories: otherInfo.categories,
                labels: {
                   // rotation: -45,
                    rotation:0,
                    align: 'right',
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '分数 '
                }
            },
            series: data_all
        });
    },
    CLASS_NAME: "R2.Business.BonusLineStatistics"
});