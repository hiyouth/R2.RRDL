/// <reference path="../QuoteJsLib/jquery-1.7.1.min.js" />
/// <reference path="../QuoteJsLib/OpenLayers.js" />

/*
**团队工时统计功能模块. 表格统计
**继承于TaskHoursBaseClass
**created by jjm @2014.05.07
**统计的工时（计划和实际）类型包括：每周、每个月、每个季度、全年。还包括所有成员的平均工时统计，主要的指标是：周平均。
*/

R2.Business.TaskHoursTableStatistics = OpenLayers.Class(R2.Business.TaskHoursBaseClass, {
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

    /*
    * 初始化表格统计的基本属性、方法，包括 表格样式的拼接、初始化数据的加载显示，相关btn的事件等
    * Paramerters:
    * pId - {string} 整个表格统计的父容器。
    * options - {obj} 整个表格统计对象的部分属性
    */
    initialize: function (pId, options) {
        this.parentContainer = pId;
        var contentStr = this.createTableStaBasicContents();  //内容拼接
        $('#' + this.parentContainer).html(contentStr);
        this.setQuerySelectOriginalVlaue();  //设置 查询下拉列表的默认值
        this.initEvent();  //事件注册
        var tempObj = this;

        //数据初始化 月统计
        this.asyncRequestData('month', tempObj,
            { teamId: 3, year: this.currentYear, month: this.currentMonth },
            function (data) {
                tempObj.showTaskHoursDataForMonths(data);  //显示月统计的数据
            });
    },


    /*
    * 拼接表格统计基本内容，不包括数据。
    */
    createTableStaBasicContents: function () {
        //<!--按月查询-->
        var monthStr = '<div id="monthsStatitics" class="workTimeStaticItem wtsItemSel">' +
                                        '<div class="btnQuery">' +
                                            //'<div>' +
                                            //    '<div id="monthsStatiticsPrev" class="statiticsBtn statiticsBtnUn"><</div>' +
                                            //    '<div id="monthsStatiticsCur" class="statiticsBtn statiticsBtnSel">当&nbsp;前</div>' +
                                            //    '<div id="monthsStatiticsNext" class="statiticsBtn statiticsBtnUn">></div>' +
                                            //'</div>' +
                                            '<div class="statiticsSelectContent">' +
                                                '<ul>' +
                                                    '<li>' +
                                                        '<label class="queryTimeTips">小&nbsp;组：</label>' +
                                                        '<select class="select_month">' +
                                                            '<option value="r2">R2Team</option>' +
                                                            '<option value="shuili">水利组</option>' +
                                                            '<option value="wendang">文档组</option>' +
                                                        '</select>' +
                                                    '</li>' +
                                                    '<li>'+
                                                        '<label class="queryTimeTips">年&nbsp;份：</label>' +
                                                        '<select class="select_month">' +
                                                            '<option value="2013">2013</option>' +
                                                            '<option value="2014">2014</option>' +
                                                            '<option value="2015">2015</option>' +
                                                            '<option value="2016">2016</option>' +
                                                        '</select>' +
                                                    '</li>' +
                                                    '<li>' +
                                                    '<label class="queryTimeTips">月&nbsp;份：</label>' +
                                                    '<select class="select_month">' +
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
                                                '</li>'+
                                            '</ul>'+
                                            '</div>' +
                                            '<div class="statisticsTableContent"></div>' +
                                            '<div id="statiticsQuery_month" class="statiticsQueryBtn">Search</div>' +
                                        '</div>' +
                                        '<div class="workTimeStaticContent">' +
                                            '<div class="staticTableTips">' +
                                                '<div class="staticTeamName"id="teamNameMonth" >R&RTeam</div>' +
                                                '<div id="staticTableTimeMonth" class="staticTime">2014 April</div>' +
                                                '<div class="staticTableTipsInfo">月份查询，显示成员<label>全月每周</label>的工时情况。</div>' +
                                            '</div>' +
                                            '<div id="staticTableMonths">month</div>' +
                                        '</div>' +
                                    '</div>';
        //<!--按季度查询-->
        var quarterStr = '<div id="quartersStatitics" class="workTimeStaticItem wtsItemUn">' +
                                    '<div class="btnQuery">' +
                                        //'<div>' +
                                        //    '<div id="quartersStatiticsPrev" class="statiticsBtn statiticsBtnUn"><</div>' +
                                        //    '<div id="quartersStatiticsCur" class="statiticsBtn statiticsBtnSel">当&nbsp;前</div>' +
                                        //    '<div id="quartersStatiticsNext" class="statiticsBtn statiticsBtnUn">></div>' +
                                        //'</div>' +
                                        '<div class="statiticsSelectContent">' +
                                            '<ul>' +
                                                '<li>'+
                                                    '<label class="queryTimeTips">小&nbsp;组：</label>' +
                                                    '<select class="select_quater">' +
                                                        '<option value="r2">R2Team</option>' +
                                                        '<option value="shuili">水利组</option>' +
                                                        '<option value="wendang">文档组</option>' +
                                                    '</select>' +
                                                '</li>' +
                                                '<li>'+
                                                    '<label class="queryTimeTips">年&nbsp;份：</label>' +
                                                    '<select class="select_quater">' +
                                                        '<option value="2013">2013</option>' +
                                                        '<option value="2014">2014</option>' +
                                                        '<option value="2015">2015</option>' +
                                                        '<option value="2016">2016</option>' +
                                                    '</select>' +
                                                '</li>' +
                                                '<li>' +
                                                    '<label class="queryTimeTips">季&nbsp;度：</label>' +
                                                    '<select  class="select_quater">' +
                                                        '<option value="1">season1</option>' +
                                                        '<option value="2">season2</option>' +
                                                        '<option value="3">season3</option>' +
                                                        '<option value="4">season4</option>' +
                                                    '</select>' +
                                               '</li>'+
                                            '</ul>' +
                                        '</div>' +
                                        '<div class="statisticsTableContent"></div>' +
                                        '<div id="statiticsQuery_quater" class="statiticsQueryBtn">Search</div>' +
                                    '</div>' +
                                    '<div class="workTimeStaticContent">' +
                                        '<div class="staticTableTips">' +
                                            '<div class="staticTeamName" id="teamNameQuater">R&RTeam</div>' +
                                            '<div id="staticTableTimeQuater" class="staticTime">2014 第一季度</div>' +
                                            '<div class="staticTableTipsInfo">季度份查询，显示成员<label>季度每月</label>的工时情况。</div>' +
                                        '</div>' +
                                        '<div id="staticTableQuaters">quaters</div>' +
                                    '</div>'+
                                '</div>';
        //<!--全年查询-->
        var yearStr = '<div id="yearsStatitics" class="workTimeStaticItem wtsItemUn">' +
                                    '<div class="btnQuery">' +
                                        //'<div>' +
                                        //    '<div id="yearsStatiticsPrev" class="statiticsBtn statiticsBtnUn"><</div>' +
                                        //    '<div id="yearsStatiticsCur" class="statiticsBtn statiticsBtnSel">当&nbsp;前</div>' +
                                        //    '<div id="yearsStatiticsNext" class="statiticsBtn statiticsBtnUn">></div>' +
                                        //'</div>' +
                                        '<div class="statiticsSelectContent">' +
                                            '<ul>'+
                                                '<li>'+
                                                    '<label class="queryTimeTips">小&nbsp;组：</label>' +
                                                    '<select class="select_year">' +
                                                        '<option value="r2">R2Team</option>' +
                                                        '<option value="shuili">水利组</option>' +
                                                        '<option value="wendang">文档组</option>' +
                                                    '</select>' +
                                                '</li>' +
                                                '<li>'+
                                                    '<label class="queryTimeTips">年&nbsp;份：</label>' +
                                                    '<select  class="select_year">' +
                                                        '<option value="2013">2013</option>' +
                                                        '<option value="2014">2014</option>' +
                                                        '<option value="2015">2015</option>' +
                                                        '<option value="2016">2016</option>' +
                                                    '</select>' +
                                                '</li>' +
                                            '</ul>'+
                                        '</div>' +
                                        '<div class="statisticsTableContent"></div>' +
                                        '<div id="statiticsQuery_year" class="statiticsQueryBtn">Search</div>' +
                                    '</div>' +
                                    '<div class="workTimeStaticContent">' +
                                        '<div class="staticTableTips">' +
                                            '<div class="staticTeamName" id="teamNameYear">R&RTeam</div>' +
                                            '<div id="staticTableTimeYear" class="staticTime">2014</div>' +
                                            '<div class="staticTableTipsInfo">年份查询，显示成员<label>全年每季度</label>的工时情况。</div>' +
                                        '</div>' +
                                        '<div id="staticTableYears">year</div>' +
                                    '</div>' +
                                '</div>';

        var str = ' <div id="workTimeStatic" class="workTimeStatic">' +
                            '<ul class="stHeadUl">' +
                                '<li class="stHeadSel">月&nbsp;&nbsp;份</li>' +
                                '<li class="stHeadUn">季&nbsp;&nbsp;度</li>' +
                                '<li class="stHeadUn">全&nbsp;&nbsp;年</li>' +
                            '</ul>' +
                            '<div class="workTimeStaticMain">' +
                                monthStr +quarterStr + yearStr
                            '</div>' +
            '</div>';
        return str;
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
        //按月查询的默认值
        $('.select_month').eq(1).find('option[value="' + year + '"]').attr('selected', 'selected');
        $('.select_month').eq(2).find('option[value="' + month + '"]').attr('selected', 'selected');
        //按季度
        $('.select_quater').eq(1).find('option[value="' + year + '"]').attr('selected', 'selected');
        $('.select_quater').eq(2).find('option[value="' + quater + '"]').attr('selected', 'selected');
        //按年
        $('.select_year').eq(1).find('option[value="' + year + '"]').attr('selected', 'selected');
    },

    /*
    *事件注册
    *为当前对象中的 月份选项卡等添加 点击事件
    */
    initEvent: function () {
        var tempObj = this;
        //选项卡
        this.getElementObj('.stHeadUl li').unbind('click').bind('click', function () {
            var index = tempObj.getElementObj('ul li').index(this);
            //样式控制
            $(this).addClass('stHeadSel').removeClass('stHeadUn').siblings()
            .addClass('stHeadUn').removeClass('stHeadSel');
            $('.workTimeStaticItem').eq(index).show().siblings().hide();
            var options = {};
            var type = '';
            var func = null;
            switch (index) {
                //月查询
                case 0: {
                    options = { teamId: 3, year: tempObj.currentYear, month: tempObj.currentMonth };
                    type = 'month';
                    func = tempObj.showTaskHoursDataForMonths;
                    break;
                }
                    //季度查询
                case 1: {
                    options = { teamId: 3, year: tempObj.currentYear, quater: tempObj.getQuaterByMonth(tempObj.currentMonth) };
                    type = 'quater';
                    func = tempObj.showTaskHoursDataForQuaters;
                    break;
                }
                    //年度查询
                default: {
                    options = { teamId: 3, year: tempObj.currentYear };
                    type = 'year';
                    func = tempObj.showTaskHoursDataForYears; //展示全年查询结果
                    break;
                }
            }
            tempObj.asyncRequestData(type, tempObj, options, function (data) {
                func(data, options, tempObj);   //显示月统计的数据
            });

        });

        //上一个月，上一个季度，上一年
        this.getElementObj('.statiticsBtn').unbind('click').bind('click', function () {
            var index = tempObj.getElementObj('.statiticsBtn').index(this);
            $(this).addClass('statiticsBtnSel').removeClass('statiticsBtnUn').siblings()
            .addClass('statiticsBtnUn').removeClass('statiticsBtnSel');
            //var condition = {
            //    teamId: 'R2Team',
            //    year: 2014,
            //    month: 3
            ////};
            ////var condition = tempObj.queryConditionHandler(index, tempObj); //查询条件
            ////tempObj.asyncRequestData('month',
            ////    condition,
            ////    function (data) {
            ////        tempObj.showTaskHoursDataForMonths(data, 'month', tempObj);
            ////    });
        });

        //点击查询
        this.getElementObj('.statiticsQueryBtn').unbind('click').bind('click', function () {
            var tempArr = $(this).attr('id').split('_');
            tempObj.serachClickFunctionLogic(tempObj, tempArr[1]);
        });
    },

    /*
    * 查询点击逻辑  选择查询条件后 点击查询,显示查询结果
    * 提取出来是为了防止 initEvent 方法过于冗长
    * Paramaters：
    * tempObj - {obj} 总的上下文 对象
    * className - {string} 点击对象对应的查询类型条件的 下拉框类名 ，用于区分 是 按月查询[.select_month]、季度[.select_quater]、年[.select_month] 
    */
    serachClickFunctionLogic: function (tempObj, type) {
        var paraObj;            //异步请求时的传递参数
        var func = $.noop; //查询成功时的回调方法
        var className = '.select_' + type;
        var selObj = tempObj.getElementObj(className);  //得到下拉框对象 
        switch (type) {
            case 'year':
                paraObj = { teamId: 3, year: selObj.eq(1).val() };  //获得选择的年份
                func = tempObj.showTaskHoursDataForYears;
                break;
            case 'month':
                paraObj = { teamId: 3, year: selObj.eq(1).val(), month: selObj.eq(2).val() }; //获得选择的年份、月份
                func = tempObj.showTaskHoursDataForMonths;
                break;
            default:
                paraObj = { teamId: 3, year: selObj.eq(1).val(), quater: selObj.eq(2).val() }; //获得选择的年份 、季度、
                func = tempObj.showTaskHoursDataForQuaters;
                break;
        }
        tempObj.asyncRequestData(type, tempObj, paraObj,
            function (data) {
                func(data, paraObj, tempObj);  //显示月统计的数据 回调方法
            });
    },


    /*
    *显示工时数据
    *按月计算
    */
    showTaskHoursDataForMonths: function (data, options, that) {
        var length = data.length;
        var trStr = '';
        //var trStr = length == 0 && '<tr><td>木有加载粗来，查询的数据不存在……</td></tr>' || '';
        for (var i = 0; i < length; i++) {
            var tempStr = '<tr>' +
                                        '<td>' + parseInt(i + 1) + '</td>' +
                                        '<td>' + data[i].name + '</td>' +
                                        //'<td>' + data[i].hoursData[0].aData + ' /' + data[i].hoursData[0].nData + '</td>' +
                                        //'<td>' + data[i].hoursData[1].aData + ' /' + data[i].hoursData[1].nData + '</td>' +
                                        //'<td>' + data[i].hoursData[2].aData + ' /' + data[i].hoursData[2].nData + '</td>'+
                                        //'<td>' + data[i].hoursData[3].aData + ' /' + data[i].hoursData[3].nData + '</td>' +
                                        //'<td>' + data[i].hoursData[4].aData + ' /' + data[i].hoursData[4].nData + '</td>' +
                                          '<td>' + data[i].hoursData[0].aData + '</td>' +
                                        '<td>' + data[i].hoursData[1].aData + '</td>' +
                                        '<td>' + data[i].hoursData[2].aData + '</td>' +
                                        '<td>' + data[i].hoursData[3].aData + '</td>' +
                                        '<td>' + data[i].hoursData[4].aData + '</td>' +
                                        '<td>' + data[i].sumHours.aData + '/' + data[i].sumHours.nData + '</td>' +
                                        '<td>' + data[i].percent + '</td>' +
                                        '<td>' + data[i].avg + '</td>' +
                                    '</tr>';
            trStr += tempStr;
        }

        var str = '<table class="staticTableMonthes">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<th style="width: 100px;">编号</th>' +
                                        '<th style="width: 120px;">团队精英</th>' +
                                        '<th style="width: 120px;">w1&nbsp;&nbsp;</th>' +
                                        '<th style="width: 120px;">w2&nbsp;&nbsp;</th>' +
                                        '<th style="width: 120px;">w3&nbsp;&nbsp;</th>' +
                                        '<th style="width: 120px;">w4&nbsp;&nbsp;</th>' +
                                        '<th style="width: 120px;">w5&nbsp;&nbsp;</th>' +
                                        //<!--<th style="width: 120px;">计划总量(p)</th>-->'+
                                        '<th style="width: 120px;">总量&nbsp;&nbsp;</th>' +
                                        '<th style="width: 120px;">完成情况</th>' +
                                        '<th style="width: 120px;">每周平均</th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>' +
                                    trStr +
                                '</tbody>' +
                            '</table>';
        $('#staticTableMonths').html(str);
        /**控制表格的要样式*/
        $('.staticTableMonthes tbody tr:odd').css('background-color', '#FCF8E3');
        $('.staticTableMonthes tbody tr:even').css('background-color', '#D9EDF7');
    },

    /*
    *显示工时数据
    *按季度计算
    * 根据团队id、查询年份、月份,向后台请求获得团队成员的工时
    * Paramerters:
    * data: 成员的工时数据，基本格式是[
    *        {
    *             name:'王大炮',
    *             hoursData:[
    *                {nData:6,aData:5},
    *                {nData:6,aData:5},
    *                {nData:6,aData:5}
    *             ],
    *             sumHours: { nData: 59, aData: 52 },
    *             percent: Math.round(52 / 49 * 100) + '%',
    *             avgMonth: 22,
    *             avg: 4.5
    *        }
    */
    showTaskHoursDataForQuaters: function (data, options, that) {
        var length = data.length;
        var trStr = '';
        for (var i = 0; i < length; i++) {
            var tempStr = '<tr>' +
                                        '<td>' + parseInt(i + 1) + '</td>' +
                                        '<td>' + data[i].name + '</td>' +
                                        //'<td>' + data[i].hoursData[0].aData + ' /' + data[i].hoursData[0].nData + '</td>' +
                                        //'<td>' + data[i].hoursData[1].aData + ' /' + data[i].hoursData[1].nData + '</td>' +
                                        //'<td>' + data[i].hoursData[2].aData + ' /' + data[i].hoursData[2].nData + '</td>' +
                                        //'<td>' + data[i].sumHours.aData + '/' + data[i].sumHours.nData + '</td>' +
                                         '<td>' + data[i].hoursData[0].aData + '</td>' +
                                        '<td>' + data[i].hoursData[1].aData + '</td>' +
                                        '<td>' + data[i].hoursData[2].aData + '</td>' +
                                        '<td>' + data[i].sumHours.aData + '</td>' +
                                        '<td>' + data[i].percent + '</td>' +
                                        '<td>' + data[i].avgMonth + '</td>' +
                                        '<td>' + data[i].avg + '</td>' +
                                    '</tr>';
            trStr += tempStr;
        }

        var str = '<table class="staticTableQuaters">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<th style="width: 100px;">编号</th>' +
                                        '<th style="width: 120px;">团队精英</th>' +
                                        '<th style="width: 120px;">' + that.getMonthNameByRanking(options.quater, 1) + '&nbsp;&nbsp;</th>' +
                                        '<th style="width: 120px;">' + that.getMonthNameByRanking(options.quater, 2) + '&nbsp;&nbsp;</th>' +
                                        '<th style="width: 120px;">' + that.getMonthNameByRanking(options.quater, 3) + '&nbsp;&nbsp;</th>' +
                                        '<th style="width: 120px;">总量&nbsp;&nbsp;</th>' +
                                        '<th style="width: 120px;">完成情况</th>' +
                                        '<th style="width: 120px;">每月平均</th>' +
                                        '<th style="width: 120px;">每周平均</th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>' +
                                    trStr +
                                '</tbody>' +
                            '</table>';
        $('#staticTableQuaters').html(str);
        /**控制表格的要样式*/
        $('.staticTableQuaters tbody tr:odd').css('background-color', '#DFF0D8');
        $('.staticTableQuaters tbody tr:even').css('background-color', '#F3F3F3');
    },

    /*
    *显示工时数据  按年计算,
    * Paramaters:
    * data - {obj} -所有成员的年工时信息 基本形式如下：
    * data = [
    *       {
    *         name: '王大炮',
    *           hoursData: [
    *              { nData: 60, aData: 60 },
    *              { nData: 58, aData: 59 },
    *              { nData: 55, aData: 54 },
    *              { nData: 61, aData: 63 }
    *           ],
    *          sumHours: { nData: 239, aData: 232 },
    *          percent: Math.round(232 / 239 * 100) + '%',
    *          avgQuater: 67,
    *          avgMonth: 22,
    *          avg: 5
    *       },
    */
    showTaskHoursDataForYears: function (data, options, that) {
        var length = data.length;
        var trStr = '';
        for (var i = 0; i < length; i++) {
            var tempStr = '<tr>' +
                                        '<td>' + parseInt(i + 1) + '</td>' +
                                        '<td>' + data[i].name + '</td>' +
                                        //'<td>' + data[i].hoursData[0].aData + ' /' + data[i].hoursData[0].nData + '</td>' +
                                        //'<td>' + data[i].hoursData[1].aData + ' /' + data[i].hoursData[1].nData + '</td>' +
                                        //'<td>' + data[i].hoursData[2].aData + ' /' + data[i].hoursData[2].nData + '</td>' +
                                        //'<td>' + data[i].hoursData[3].aData + ' /' + data[i].hoursData[3].nData + '</td>' +
                                        //'<td>' + data[i].sumHours.aData + '/' + data[i].sumHours.nData + '</td>' +
                                        '<td>' + data[i].hoursData[0].aData + '</td>' +
                                        '<td>' + data[i].hoursData[1].aData + '</td>' +
                                        '<td>' + data[i].hoursData[2].aData + '</td>' +
                                        '<td>' + data[i].hoursData[3].aData + '</td>' +
                                        '<td>' + data[i].sumHours.aData + '</td>' +
                                        '<td>' + data[i].percent + '</td>' +
                                        '<td>' + data[i].avgQuater + '</td>' +
                                        '<td>' + data[i].avgMonth + '</td>' +
                                        '<td>' + data[i].avg + '</td>' +
                                    '</tr>';
            trStr += tempStr;
        }

        var str = '<table class="staticTableYears">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<th style="width: 100px;">编号</th>' +
                                        '<th style="width: 120px;">团队精英</th>' +
                                        '<th style="width: 120px;">season1&nbsp;&nbsp;</th>' +
                                        '<th style="width: 120px;">season2&nbsp;&nbsp;</th>' +
                                        '<th style="width: 120px;">season3&nbsp;&nbsp;</th>' +
                                        '<th style="width: 120px;">season4&nbsp;&nbsp;</th>' +
                                        //<!--<th style="width: 120px;">计划总量(p)</th>-->'+
                                        '<th style="width: 120px;">总量&nbsp;&nbsp;</th>' +
                                        '<th style="width: 120px;">完成情况</th>' +
                                        '<th style="width: 120px;">季度平均</th>' +
                                        '<th style="width: 120px;">每月平均</th>' +
                                        '<th style="width: 120px;">每周平均</th>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>' +
                                    trStr +
                                '</tbody>' +
                            '</table>';
        $('#staticTableYears').html(str);
        /**控制表格的要样式*/
        $('.staticTableYears tbody tr:odd').css('background-color', '#FFFFFF');
        $('.staticTableYears tbody tr:even').css('background-color', '#DFF0D8');
    },

    /*
    * 对返回的数据进行再次处理，得到符合要求的格式
    * Parameters:
    * data - {Array} 后台返回的查询数据
    * returns:
    * newData - {Array} 符合要求的新数据
    * 基本形式如下：
    *newData=[{
    *        name: '王大炮',
    *        hoursData: [
    *            { nData: 6, aData: 5 },
    *            { nData: 6, aData: 5 },
    *            { nData: 6, aData: 5 },
    *            { nData: 6, aData: 5 }
    *        ],
    *        sumHours: { nData: 26, aData: 25 },
    *        percent: Math.round(25 / 26 * 100) + '%',
    *        avg: 5
    *    }];
    */
    changeDataFormat: function (data, type, tempObj) {
        var newData = [];
        var length = data.length;
        ////每个成员的基本数据信息 对象
        for (var i = 0; i < length; i++) {
            var sum = 0;            //每个成员的实际工时总和
            var sSum = 0;         //计划工时总和
            //每个成员的基本数据信息 对象
            var myObj = tempObj.getBasicUserInfoObj(type);
            myObj.name = data[i].UserID;
            var bonus = data[i].BonusCollection;
            var bonusLength = bonus.length;

            for (var j = 0; j < bonusLength; j++) {
                sum += bonus[j].SumBonus;
                sSum += bonus[j].SumScheduleBounus;
                var wNum;
                if (type == 'month') {
                    wNum = parseInt(bonus[j].PerEach - 1);
                }
                else if (type == 'quater') {
                    wNum = parseInt(tempObj.getQuaterIndexByMonth(bonus[j].PerEach) - 1);
                }
                else {
                    wNum = parseInt(bonus[j].PerEach - 1);
                }
                myObj.hoursData[wNum].nData = bonus[j].SumScheduleBounus;  //将数据存在的周数换上到相应的数组
                myObj.hoursData[wNum].aData = bonus[j].SumBonus;
            }
            myObj.sumHours = { nData: sSum, aData: sum };
            myObj.percent = Math.round(sum / sSum * 100) + '%';
            if (type == 'quater') {
                myObj.avgMonth = 0;
            }
            if (type == 'year') {
                myObj.avgQuater = 0;
                myObj.avgMonth = 0;
            }
            myObj.avg = sum / bonusLength;
            newData.push(myObj);
        }
        return newData;
    },

    /*根据不同的查询类型：月、季度、年，返回基本的信息对象*/
    getBasicUserInfoObj: function (type) {
        var myObj;
        if (type == 'month') {
            //每个成员的基本数据信息 对象
            myObj = {
                name: '',
                hoursData: [
                    { nData: 0, aData: 0 },
                    { nData: 0, aData: 0 },
                    { nData: 0, aData: 0 },
                    { nData: 0, aData: 0 },
                    { nData: 0, aData: 0 }
                ],
                sumHours: { nData: 0, aData: 0 },
                percent: '',
                avg: 0
            };
            return myObj;
        }
        else if (type == 'quater') {
            myObj = {
                name: '',
                hoursData: [
                    { nData: 0, aData: 0 },
                    { nData: 0, aData: 0 },
                    { nData: 0, aData: 0 }
                ],
                sumHours: { nData: 0, aData: 0 },
                percent: '',
                avgMonth: 0,
                avg: 0
            };
            return myObj;
        }
        else {
            myObj = {
                name: '',
                hoursData: [
                    { nData: 0, aData: 0 },
                    { nData: 0, aData: 0 },
                    { nData: 0, aData: 0 },
                    { nData: 0, aData: 0 }
                ],
                sumHours: { nData: 0, aData: 0 },
                percent: '',
                avgQuater: 0,
                avgMonth: 0,
                avg: 0
            };
            return myObj;
        }

    },

    /*
    * 异步请求，根据查询条件，返回结果数据
    * Parameters:
    * type - {string} 查询类型 可能值 为 ：month 按月 查询，查询的  结果为 每周的工时 / quater 季度 / year 年
    * tempObj - {obj} this上下文
    * condition - {obj} 查询的条件 包括 团队的id,查询的时间 基本格式为 { teamId: 3, year: 2014, month: 5 },
    * callBack - {function} 回调函数 主要 是展示查询结果 的方法 
    */
    asyncRequestData: function (type, tempObj, condition, callBack) {
        var url = '';
        var selObj = tempObj.getElementObj('.select_' + type);
        var innerText;
        var name;
        switch (type) {
            case 'month':
                url = baseUrl + 'TaskHoursStatistics/GetTaskHoursDataForMonths';
                name = selObj.eq(0).find("option:selected").text();
                innerText = selObj.eq(1).find("option:selected").text() + '  ' + selObj.eq(2).find('option:selected').text();
                $('#teamNameMonth').text(name);
                $('#staticTableTimeMonth').text(innerText);
                break;
            case 'quater':
                url = baseUrl + 'TaskHoursStatistics/GetTaskHoursDataForQuaters';
                name = selObj.eq(0).find("option:selected").text();
                innerText = selObj.eq(1).find("option:selected").text() + '  ' + selObj.eq(2).find('option:selected').text();
                $('#teamNameQuater').text(name);
                $('#staticTableTimeQuater').text(innerText);
                break;
            default:
                url = baseUrl + 'TaskHoursStatistics/GetTaskHoursDataForYears';
                name = selObj.eq(0).find("option:selected").text();
                innerText = selObj.eq(1).find("option:selected").text()
                $('#teamNameYear').text(name);
                $('#staticTableTimeYear').text(innerText);
                break;
        }

        //请求数据
        $.post(url, condition, function (data) {
            data = tempObj.changeDataFormat(data, type, tempObj); //对数据进一步处理
            callBack(data);
        }, 'json');

    },

    /*
   *根据上一个周等按钮，得到新的查询条件
   *
   */
    queryConditionHandler: function (index, tempObj) {
        var condition = {
            teamId: 3,
            year: tempObj.currentYear,
            month: tempObj.currentMonth
        };
        switch (index) {
            case 0:
                if (tempObj.month == 1) {
                    tempObj.currentMonth = condition.month = 12;
                    tempObj.currentYear--;
                    condition.year--;
                } else {
                    tempObj.currentMonth--;
                    condition.month--;
                }
                break;
            case 1:
                //当前月份
                condition.month = tempObj.currentMonth = (new Date).getMonth() + 1;
                //当前年份
                condition.year = tempObj.currentYear = (new Date).getFullYear();
                break;
            default:
                if (tempObj.currentMonth == 12) {
                    tempObj.currentMonth = condition.month = 1;
                    tempObj.currentYear++;
                    condition.year++;
                } else {
                    tempObj.currentMonth++;
                    condition.month++;
                }
                break;
        }
        return condition;
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

    CLASS_NAME: 'R2.Business.TaskHoursTableSta'

});