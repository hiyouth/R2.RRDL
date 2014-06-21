/// <reference path="../QuoteJsLib/jquery-1.7.1.min.js" />
/// <reference path="../QuoteJsLib/OpenLayers.js" />
/// <reference path="../QuoteJsLib/highcharts.js" />

/*
**团队工时统计功能模块. 图形统计
**继承于TaskHoursBaseClass
**created by jjm @2014.05.08
**统计的工时（计划和实际）类型包括：每周平均、每个月平均、每个季度平均。还包括所有成员的平均工时统计，主要的指标是：周平均。
*/

R2.Business.TaskHoursChartStatistics = OpenLayers.Class(R2.Business.TaskHoursBaseClass,{
    //统计的总容器
    parentContainer: '',

    teamName: 'R2Team',

    //当前周数
    currentWeek: 1,

    //当前月份
    currentMonth: (new Date).getMonth() + 1,

    //当前年份
    currentYear: (new Date).getFullYear(),

    //开始加载数据回调
    startLoadData: $.noop,

    //完成加载数据回调
    finishLoadData: $.noop,

    //出错加载数据回调
    errorLoadData: $.noop,

    //初始化方法
    initialize: function (pId, options) {
        this.parentContainer = pId;
        var contentStr = this.createChartStaBasicContents();  //内容拼接
        this.getElementObj('.queryTimeWeek').show();
        $('#' + this.parentContainer).html(contentStr);
        this.initEvent();  //事件注册
        this.loadDataFirst(); //初始化数据
        this.setQuerySelectOriginalVlaue();  //设置时间选择的默认值
    },


    /*
    *拼接表格统计基本内容，不包括数据。
    */
    createChartStaBasicContents: function () {
        var str = '<div class="taskHoursChartMain">' +
                '<div class="taskHoursChartItem">' +
                    '<div class="itemTitle">累计工时</div>' +
                    '<ul class="itemQueryBtns" id="sumItemsQueryBtns">' +
                        '<li class="selected">周&nbsp;累&nbsp;计</li>' +
                        '<li class="unSelected">月&nbsp;累&nbsp;计</li>' +
                        '<li class="unSelected">季度累计</li>' +
                        '<li class="unSelected">年&nbsp;累&nbsp;计</li>' +
                    '</ul>' +
                    '<div class="btnQuery">' +
                            //'<div>' +
                            //    '<div id="monthsStatiticsPrev" class="statiticsBtn statiticsBtnUn"><</div>' +
                            //    '<div id="monthsStatiticsCur" class="statiticsBtn statiticsBtnSel">当&nbsp;&nbsp;前</div>' +
                            //    '<div id="monthsStatiticsNext" class="statiticsBtn statiticsBtnUn">></div>' +
                            //'</div>' +
                            '<div class="statiticsSelectContent">' +
                                '<ul>' +
                                    '<li>' +
                                        '<label class="queryTimeTips">小&nbsp;&nbsp;组：</label>' +
                                        '<select class="sumQueryTimeChart">' +
                                            '<option value="r2">R2Team</option>' +
                                            '<option value="shuili">水利</option>' +
                                            '<option value="wendang">文档</option>' +
                                        '</select>' +
                                    '</li>' +
                                    '<li>'+
                                        '<label class="queryTimeTips">年&nbsp;&nbsp;份：</label>' +
                                        '<select class="sumQueryTimeChart">' +
                                            '<option value="2013">2013</option>' +
                                            '<option value="2014">2014</option>' +
                                            '<option value="2015">2015</option>' +
                                            '<option value="2016">2016</option>' +
                                        '</select>' +
                                    '</li>' +
                                    '<li class="sumQueryTimeMonths">' +
                                        '<label class="queryTimeTips">月&nbsp;&nbsp;份：</label>' +
                                        '<select class="sumQueryTimeChart">' +
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
                                     '</li>' +
                                    '<li class="sumQueryTimeWeeks">' +
                                        '<label class="queryTimeTips">周&nbsp;&nbsp;数：</label>' +
                                        '<select class="sumQueryTimeChart">' +
                                            '<option value="1">w1</option>' +
                                            '<option value="2">w2</option>' +
                                            '<option value="3">w3</option>' +
                                            '<option value="4">w4</option>' +
                                            '<option value="5">w5</option>' +
                                        '</select>' +
                                     '</li>' +
                                    '<li style="display:none;" class="sumQueryTimeQuaters">' +
                                        '<label  class="queryTimeTips">季&nbsp;&nbsp;度：</label>' +
                                        '<select class="sumQueryTimeChart">' +
                                            '<option value="1">season1</option>' +
                                            '<option value="2">season2</option>' +
                                            '<option value="3">season3</option>' +
                                            '<option value="4">season4</option>' +
                                        '</select>' +
                                    '</li>' +
                                '</ul>'+
                            '</div>' +
                            '<div class="statisticsTableContent"></div>' +
                            '<div id="taskHoursChart_Sum" class="statiticsQueryBtn">Search</div>' +
                        '</div>' +
                    '<div id="taskHoursChartSum" class="taskHoursChart"></div>' +
                '</div>' +
                '<div class="taskHoursChartItem">' +
                    '<div class="itemTitle">平均工时<span>单位（每周）</span></div>' +
                    '<ul class="itemQueryBtns" id="avgItemsQueryBtns">' +
                        '<li class="selected">全&nbsp;&nbsp;月</li>' +
                        '<li class="unSelected">全&nbsp;季&nbsp;度</li>' +
                        '<li class="unSelected">全&nbsp;&nbsp;年</li>' +
                    '</ul>' +
                    '<div class="btnQuery">' +
                            '<div>' +
                                '<div id="Div1" class="statiticsBtn statiticsBtnUn"><</div>' +
                                '<div id="Div2" class="statiticsBtn statiticsBtnSel">当&nbsp;&nbsp;前</div>' +
                                '<div id="Div3" class="statiticsBtn statiticsBtnUn">></div>' +
                            '</div>' +
                            '<div class="statiticsSelectContent">' +
                                '<label class="queryTimeTips">年&nbsp;&nbsp;份：</label>' +
                                '<select class="avgQueryTimeChart">' +
                                    '<option value="2013">2013</option>' +
                                    '<option value="2014">2014</option>' +
                                    '<option value="2015">2015</option>' +
                                    '<option value="2016">2016</option>' +
                                '</select>' +
                                '<label class="queryTimeTips avgQueryTimeMonths">月&nbsp;&nbsp;份：</label>' +
                                '<select  class="avgQueryTimeChart avgQueryTimeMonths">' +
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
                                '<label style="display:none;" class="queryTimeTips avgQueryTimeQuaters">季&nbsp;&nbsp;度：</label>' +
                                '<select class="avgQueryTimeChart avgQueryTimeQuaters" style="display:none;">' +
                                    '<option value="1">season1</option>' +
                                    '<option value="2">season2</option>' +
                                    '<option value="3">season3</option>' +
                                    '<option value="4">season4</option>' +
                                '</select>' +
                            '</div>' +
                            '<div class="statisticsTableContent"></div>' +
                            '<div id="taskHoursChart_Avg" class="statiticsQueryBtn">Search</div>' +
                        '</div>' +
                    '<div id="taskHoursChartAvg" class="taskHoursChart"></div>' +
                '</div>' +
            '</div>';
        return str;
    },

    /*
    *事件注册
    *为当前对象中的 月份选项卡等添加 点击事件
    */
    initEvent: function () {
        var tempObj = this;

        //上一个月，上一个季度，上一年
        this.getElementObj('.statiticsBtn').unbind('click').bind('click', function () {
            var index = tempObj.getElementObj('.statiticsBtn').index(this);
            $(this).addClass('statiticsBtnSel').removeClass('statiticsBtnUn').siblings()
            .addClass('statiticsBtnUn').removeClass('statiticsBtnSel');
            var condition = tempObj.queryConditionHandler(index, tempObj); //处理查询条件
            tempObj.asyncRequestData('week', 0,
                condition,
                function (data) { tempObj.dealwithDataForSum(tempObj, data) }); //数据初始化 月统计
        });

        /*累计查询 查询类型选择，样式控制*/
        this.getElementObj('#sumItemsQueryBtns li').unbind('click').bind('click', function () {
            $(this).addClass('selected').removeClass('unSelected').siblings()
                .addClass('unSelected').removeClass('selected');
            var index = $(this).index();
            switch (index) {
                case 0:
                    $('.sumQueryTimeWeeks').show();
                    $('.sumQueryTimeMonths').show();
                    $('.sumQueryTimeQuaters').hide();
                    break;
                case 1:
                    $('.sumQueryTimeWeeks').hide();
                    $('.sumQueryTimeMonths').show();
                    $('.sumQueryTimeQuaters').hide();
                    break;
                case 2:
                    $('.sumQueryTimeWeeks').hide();
                    $('.sumQueryTimeMonths').hide();
                    $('.sumQueryTimeQuaters').show();
                    break;
                default:
                    $('.sumQueryTimeWeeks').hide();
                    $('.sumQueryTimeMonths').hide();
                    $('.sumQueryTimeQuaters').hide();
                    break;
            }
        });

        /*平均查询 查询类型选择，样式控制*/
        this.getElementObj('#avgItemsQueryBtns li').unbind('click').bind('click', function () {
            $(this).addClass('selected').removeClass('unSelected').siblings()
                .addClass('unSelected').removeClass('selected');
            var index = $(this).index();
            switch (index) {
                case 0:
                    $('.avgQueryTimeMonths').show();
                    $('.avgQueryTimeQuaters').hide();
                    break;
                case 1:
                    $('.avgQueryTimeMonths').hide();
                    $('.avgQueryTimeQuaters').show();
                    break;
                default:
                    $('.avgQueryTimeMonths').hide();
                    $('.avgQueryTimeQuaters').hide();
                    break;
            }
        });


        /*查询按钮 根据时间查询*/
        this.getElementObj('.statiticsQueryBtn').unbind('click').bind('click', function () {
            var type = $(this).attr('id').split('_')[1];
            if (type == 'Sum') {
                var index = $('#sumItemsQueryBtns').find('.selected').index();
                tempObj.getSumHoursByCondition(index);
            }
            else {
                var index = $('#avgItemsQueryBtns').find('.selected').index();
                tempObj.getAvgHoursByCondition(index);
            }
        });
    },

    /*
    * 初始化数据，加载周累计、周平均数据
    */
    loadDataFirst: function () {
        var tempObj = this;
        var options = { teamId: 3, year: this.currentYear, month: this.currentMonth, week: this.currentWeek };
        //加载显示周累计工时
        this.asyncRequestData('sum', 0, options,
            function (data) { tempObj.dealwithDataForSum(tempObj, data) }); //数据初始化 月统计

        //加载显示月平均工时
        options={ teamId: 3, year: this.currentYear, month: this.currentMonth };
        this.asyncRequestData('avg', 0,options,
            function (data) { tempObj.dealwithDataForAvg(tempObj, data, 0, options) }); //数据初始化 月统计
    },

    /*
   *控制所有查询下拉列表的默认值。主要根据当前客户端的时间
   * 其中年份，季度，月是当前的，周默认为第一周
   */
    setQuerySelectOriginalVlaue: function () {
        var data = new Date();
        var year = data.getFullYear();
        var month = data.getMonth() + 1
        var quater = this.getQuaterByMonth(month);  //获得当前季度
        //按累计查询的默认值
        $('.sumQueryTimeChart').eq(1).find('option[value="' + year + '"]').attr('selected', 'selected');
        $('.sumQueryTimeChart').eq(2).find('option[value="' + month + '"]').attr('selected', 'selected');
        //按季度
        $('.avgQueryTimeChart').eq(0).find('option[value="' + year + '"]').attr('selected', 'selected');
        $('.avgQueryTimeChart').eq(1).find('option[value="' + month + '"]').attr('selected', 'selected');
    },

    /*处理周查询得到的 累计工时 数据， 并传到显示数据的方法中，显示数据*/
    dealwithDataForSum: function (that, data) {
        var xData = [];  //x轴数据
        var yData = []; //y轴数据
        var colors = Highcharts.getOptions().colors;
        if (data.length > 10) {
            var newColors = ['#742894', '#FEF10F'];
            colors = colors.concat(colors);
        }
        for (var i = 0; i < data.length; i++) {
            xData.push(data[i].UserID);
            var bonus = data[i].BonusCollection;
            var length = bonus.length;
            var tempSum = 0;
            for (var j = 0; j < length; j++) {
                tempSum += bonus[j].SumBonus;
            }
            //if (i / 2 == 0) {
            //    color = '#2F7ED8';
            //}
            yData.push({ y: tempSum, color: colors[i]});
        }
        //数据展示
        that.showDataToChartSum(
            { xData: xData, yData: yData },
            that,
            { teamName: 'R2Team', time: '2014.5', type: '周累计' });
    },

    /*处理周查询得到的 周平均工时 数据， 并传到显示数据的方法中，显示数据*/
    dealwithDataForAvg: function (that, data, type,options) {
        var xData = [];  //x轴数据
        switch (type) {
            case 0:
                xData = ['week1', 'week2', 'week3', 'week4', 'week5'];
                break;
            case 1:
                xData = [that.getMonthNameByRanking(options.quater, 1), that.getMonthNameByRanking(options.quater, 2), that.getMonthNameByRanking(options.quater, 3)];
                break;
            default:
                xData = ['quater1', 'quater2', 'quater3', 'quater4'];
                break;
        }
        var yData = []; //y轴数据
        for (var i = 0; i < data.length; i++) {
            var sum = 0;            //每个成员的实际工时总和
            var sSum = 0;         //计划工时总和
            //每个成员的基本数据信息 对象
            var myObj = that.getBasicUserInfoObj(type);
            myObj.name = data[i].UserID;
            var bonus = data[i].BonusCollection;
            var bonusLength = bonus.length;

            for (var j = 0; j < bonusLength; j++) {
                sum += bonus[j].SumBonus;
                sSum += bonus[j].SumScheduleBounus;
                var wNum;
                if (type == 0) {
                    wNum = parseInt(bonus[j].PerEach - 1);
                }
                else if (type == 1) {
                    wNum = parseInt(that.getQuaterIndexByMonth(bonus[j].PerEach) - 1);
                }
                else {
                    wNum = parseInt(bonus[j].PerEach - 1);
                }
                //myObj.hoursData[wNum] = bonus[j].SumScheduleBounus;  //将数据存在的周数换上到相应的数组
                myObj.data[wNum] = bonus[j].SumBonus;
            }
            myObj.avg = sum / bonusLength;
            yData.push(myObj);
        }
        //数据展示
        that.showDataToChartAvg(
            { xData: xData, yData: yData },
            that,
            { teamName: 'R2Team', time: '2014.5', type: '周累计' });
    },

    /*
    *显示累计数据，累计工时的所有统计项目的数据均传到这个方法中显示
    *Parameters:
    *data - {obj} 经过处理工时数据，基本格式为：{xData：['阿信','石头','怪兽','玛莎','冠佑'],yData:[3.5,4,3.5,4.5,4]}
    * tempObj - {obj} 上下文对象
    * otherInfo -  {obj} 其他想要显示的信息 ，如团队的名称，统计的标题
    */
    showDataToChartSum: function (data, tempObj, otherInfo) {
        $('#taskHoursChartSum').highcharts({
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
                text: otherInfo.teamName + ' 团队精英工时统计   ' + otherInfo.time,
                y: 10
            },
            subtitle: {
                text: otherInfo.type,
                y: 35
            },
            plotOptions: {
                column: {
                    pointWidth:50
                }
            },
            xAxis: {
                categories: data.xData,
                labels: {
                    rotation: -45,
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
                    text: '工时 '
                }
            },
            series: [{
                name: '工时数量',
                data: data.yData,
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



        /**控制表格的要样式*/
    },

    /*
    *显示平均数据，平均工时的所有统计项目的数据均传到这个方法中显示
    *Parameters:
    *data - {obj} 经过处理工时数据，基本格式为：{xData：['阿信','石头','怪兽','玛莎','冠佑'],yData:[3.5,4,3.5,4.5,4]}
    * tempObj - {obj} 上下文对象
    * otherInfo -  {obj} 其他想要显示的信息 ，如团队的名称，统计的标题
    */
    showDataToChartAvg: function (data, tempObj, otherInfo) {
        $('#taskHoursChartAvg').highcharts({
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
                text: otherInfo.teamName + ' 团队精英工时统计   ' + otherInfo.time,
                y: 10
            },
            subtitle: {
                text: otherInfo.type,
                y: 35
            },
            xAxis: {
                categories: data.xData,//['W1', 'W2', 'W3', 'W4', 'W5']
                labels: {
                    rotation: -45,
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
                    text: '工时 '
                }
            },
            series: data.yData

        });
    },


    /*
    *根据上一个周等按钮，得到新的查询条件
    *
    */
    queryConditionHandler: function (index, tempObj) {
        var condition = {
            teamId: 3,
            year: tempObj.currentYear,
            month: tempObj.currentMonth,
            week: tempObj.currentWeek
        };
        if (index > 2) {
            condition = {
                teamId: 3,
                year: tempObj.currentYear,
                mont: tempObj.currentYear,
            };
        }
        switch (index) {
            case 0:
                if (tempObj.currentWeek == 1) {
                    tempObj.currentWeek = condition.week = 4;
                    tempObj.currentMonth--;
                    condition.month--;
                } else {
                    tempObj.currentWeek--;
                    condition.week--;
                }
                break;
            case 1:
                condition.week = tempObj.currentWeek = 1;
                //当前月份
                condition.month = tempObj.currentMonth = (new Date).getMonth() + 1;
                //当前年份
                condition.year = tempObj.currentYear = (new Date).getFullYear();
                break;
            case 2:
                if (tempObj.currentWeek == 4) {
                    tempObj.currentWeek = condition.week = 1;
                    tempObj.currentMonth++;
                    condition.month++;
                } else {
                    tempObj.currentWeek++;
                    condition.week++;
                }
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                break;
        }
        return condition;
    },

    /*
    * 处理上一个，下一个的逻辑
    */
    dealwithPreNextLogic: function () {

    },

    /*
    * 异步请求，根据查询条件，返回结果数据
    * Parameters:
    * type - {string} 查询类型 可能值 为 ：avg 每周的工时 / sum 求和
    * condition - {obj} 查询的条件 包括 团队的id,查询的时间
    * callBack - {function} 回调函数 主要 是展示查询结果 的方法 
    */
    asyncRequestData: function (type, index, condition, callBack) {
        var url = '';
        if (type == 'avg') {
            switch (index) {
                case 0:
                    url = baseUrl + 'TaskHoursStatistics/GetTaskHoursDataForMonths';
                    break;
                case 1:
                    url = baseUrl + 'TaskHoursStatistics/GetTaskHoursDataForQuaters';
                    break;
                default:

                    break;
            }

        }
        else {
            switch (index) {
                case 0:
                    url = baseUrl + 'TaskHoursStatistics/GetTaskHoursDataForWAvg';
                    break;
                case 1:
                    url = baseUrl + 'TaskHoursStatistics/GetTaskHoursDataForMonths';
                    break;
                case 2:
                    url = baseUrl + 'TaskHoursStatistics/GetTaskHoursDataForQuaters';
                    break;
                default:
                    url = baseUrl + 'TaskHoursStatistics/GetTaskHoursDataForYears';
                    break;
            }
        }
        //请求数据
        $.post(url, condition, function (data) {
            callBack(data);
        }, 'json');

    },


    /*
    * 累计工时统计 
    * 根据下拉框选择的查询时间条件，查询到相应时间的工时
    */
    getSumHoursByCondition: function (index) {
        var that = this;
        var condition = {
            teamId: '3',
            year: $('.sumQueryTimeChart').eq(1).val(),
            month: $('.sumQueryTimeChart').eq(2).val()
        };
        if (index == 0) {
            condition.week = $('.sumQueryTimeChart').eq(3).val();
        }
        if (index == 2) {
            condition.quater = $('.sumQueryTimeChart').eq(4).val();
        }
        this.asyncRequestData('sum', index, condition,
            function (data) { that.dealwithDataForSum(that, data) }); //数据初始化 月统计
    },

    /*
    * 累计工时统计 
    * 根据下拉框选择的查询时间条件，查询到相应时间的工时
    */
    getAvgHoursByCondition: function (index) {
        var that = this;
        var condition = {
            teamId: '3',
            year: $('.avgQueryTimeChart').eq(0).val(),
            month: $('.avgQueryTimeChart').eq(1).val()
        };
        if (index == 1) {
            condition.quater = $('.avgQueryTimeChart').eq(2).val();
        }

        this.asyncRequestData('avg', index, condition,
            function (data) { that.dealwithDataForAvg(that, data, index, condition); }); //数据初始化 月统计
    },

    /*
    *返回当前this(上下文)中对象，用于事件的注册
    *Parmaters:
    *objName - {string} 查询的名称，可以为标签名、类名、id
    *returen:
    *$obj - jQuery对象
    */
    getElementObj: function (objName) {
        return $('#' + this.parentContainer).find(objName);
    },


    /*根据不同的查询类型：月、季度、年，返回基本的信息对象*/
    getBasicUserInfoObj: function (type) {
        var myObj;
        //每个成员的基本数据信息 对象
        switch (type) {
            case 0:
                myObj = {
                    name: '',
                    data: [0, 0, 0, 0, 0]
                };
                break;
            case 1:
                myObj = {
                    name: '',
                    data: [0, 0, 0, ]
                };
                break;
            default:
                myObj = {
                    name: '',
                    data: [0, 0, 0, 0]
                }; break;
        }
        return myObj;
    },



    CLASS_NAME: 'R2.Business.TaskHoursTableSta'

});

