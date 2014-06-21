/*
* 工时统计，包括表格统计、图形统计的公共类。
* 包含了一些公用的方法，如getQuaterIndexByMonth等，
* 表格统计和图形统计 两类均继承这个类。
* add by jjm @2014.6.14
*/

R2.Business.TaskHoursBaseClass = OpenLayers.Class({
    initialize: function () {

    },
    /*
   *根据月份返回季度
   *[1,2.3] 为1季度、[4,5.6] 为2季度、[7,8.9] 为3季度、[10,11.12] 为4季度、
   */
    getQuaterByMonth: function (month) {
        var quater = 4;
        var value = month / 3;
        if (value <= 1) {
            quater = 1;
            return quater;
        }
        else if (value > 1 && value <= 2) {
            quater = 2;
            return quater;
        }
        else if (value > 2 && value <= 3) {
            quater = 3;
            return quater;
        }
        else {
            return quater;
        }
    },

    /*
    *根据月份返回该月在季度中是属于第几个月
    *[1,4,7,10] 为第1个月、[2,5,8,11] 为2、[3,6.9,12] 为3
    */
    getQuaterIndexByMonth: function (month) {
        var index = 3;
        if ($.inArray(month, [1, 4, 7, 9]) >= 0) {
            index = 1;
            return index;
        }
        else if ($.inArray(month, [2, 5, 8, 10]) >= 0) {
            index = 2;
            return index;
        }
        else {
            index = 3;
            return index;
        }
    },

    /*根据选择的季度，以及这个月在季度中的第几个月得 月份名称简写*/
    getMonthNameByRanking: function (quater, rank) {
        var monthNameArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var index = quater * 3 - (3 - rank)-1; //根据季度和第几得到下标 的表达式
        return monthNameArr[index];
    },

    CLASS_NAME: 'TaskHoursBaseClass'
});