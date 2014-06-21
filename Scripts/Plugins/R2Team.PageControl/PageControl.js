/*
*描述：翻页插件
*create by nn 2013-10-16 13:55:31
*/
/**
*Class: R2.Control.PageControl
*翻页业务对象类
*/
R2.Control.PageControl = OpenLayers.Class({
    //-----------------Property-------------------//
    url: "",                            //访问后台的URl
    countPerPage: 0,                    //每页显示多少条数据
    firstPageID: "",                    //首页按钮的ID
    previousPageID: "",                 //上一页按钮的ID
    pageInfID: "",                       //显示页码信息
    nextPageID: "",                     //下一页按钮的ID
    lastPageID: "",                     //最后一页按钮的ID
    callback: $.noop,                      //回调函数
    pages: 0,
    currentPage: 1,
    totalCount: 0,
    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function (url, option) {
        this.url = url;
        OpenLayers.Util.extend(this, option);
        this.create();
    },

    //自定义函数
    create: function () {
        var PageControlObj = this;
        $.post(this.url, { "numOnePage": this.countPerPage, "pageIndex": 1 }, function (cbdata) {
            //从后台返回数据集合以及总记录数，用"#"分隔
            var data = cbdata.split("ContentAndCount");
            var list = eval("(" + data[0] + ")");
            //如果没有数据，解除翻页各个按钮的绑定事件，设置当前页为0，设置下一页，最后一页按钮颜色为灰
            if (list.length == 0) {
                PageControlObj.currentPage = 0;
                $("#" + PageControlObj.nextPageID).css("color", "gray");
                $("#" + PageControlObj.lastPageID).css("color", "gray");
                $("#" + PageControlObj.previousPageID).unbind("click");
                $("#" + PageControlObj.firstPageID).unbind("click");
                $("#" + PageControlObj.nextPageID).unbind("click");
                $("#" + PageControlObj.lastPageID).unbind("click");
            } else {
                $("#" + PageControlObj.nextPageID).css("color", "black");
                $("#" + PageControlObj.lastPageID).css("color", "black");
            }
            //获取总记录数
            PageControlObj.totalCount = parseInt(data[1]);
            //计算总页数                                                     
            PageControlObj.pages = getPages(PageControlObj.totalCount, PageControlObj.countPerPage);
            //返回结果集合         
            PageControlObj.callback(list);
            //设置页码信息
            $("#" + PageControlObj.pageInfID).html(PageControlObj.currentPage + "/" + PageControlObj.pages);
            //设置首页，上一页按钮颜色为灰
            $("#" + PageControlObj.previousPageID).css("color", "gray");
            $("#" + PageControlObj.firstPageID).css("color", "gray");
            //如果只有一页，设置下一页，最后一页按钮颜色为灰
            if (PageControlObj.pages == 1) {
                $("#" + PageControlObj.nextPageID).css("color", "gray");
                $("#" + PageControlObj.lastPageID).css("color", "gray");
                $("#" + PageControlObj.previousPageID).unbind("click");
                $("#" + PageControlObj.firstPageID).unbind("click");
                $("#" + PageControlObj.nextPageID).unbind("click");
                $("#" + PageControlObj.lastPageID).unbind("click");
            }
        });

        $("#" + this.previousPageID).click(function () {
            //如果当前页大于1，执行获取上一页数据操作
            if (PageControlObj.currentPage > 1) {
                PageControlObj.currentPage--;
                $("#" + PageControlObj.nextPageID).css("color", "black");
                $("#" + PageControlObj.lastPageID).css("color", "black");
                $.post(PageControlObj.url, { "numOnePage": PageControlObj.countPerPage, "pageIndex": PageControlObj.currentPage }, function (cbdata) {
                    var data = cbdata.split("ContentAndCount");
                    var list = eval("(" + data[0] + ")");
                    PageControlObj.callback(list);
                });
                $("#" + PageControlObj.pageInfID).html(PageControlObj.currentPage + "/" + PageControlObj.pages);
            }
            if (PageControlObj.currentPage == 1) {
                $("#" + PageControlObj.previousPageID).css("color", "gray");
                $("#" + PageControlObj.firstPageID).css("color", "gray");
            }
        });

        $("#" + this.nextPageID).click(function () {
            //如果当前页小于总页数，执行获取下一页数据操作
            if (PageControlObj.currentPage < PageControlObj.pages) {
                PageControlObj.currentPage++;
                $("#" + PageControlObj.previousPageID).css("color", "black");
                $("#" + PageControlObj.firstPageID).css("color", "black");
                $.post(PageControlObj.url, { "numOnePage": PageControlObj.countPerPage, "pageIndex": PageControlObj.currentPage }, function (cbdata) {
                    var data = cbdata.split("ContentAndCount");
                    var list = eval("(" + data[0] + ")");
                    PageControlObj.callback(list);
                });
                $("#" + PageControlObj.pageInfID).html(PageControlObj.currentPage + "/" + PageControlObj.pages);
            }
            if (PageControlObj.currentPage == PageControlObj.pages) {
                $("#" + PageControlObj.nextPageID).css("color", "gray");
                $("#" + PageControlObj.lastPageID).css("color", "gray");
            }
        });

        $("#" + this.firstPageID).click(function () {
            PageControlObj.currentPage = 1;
            $.post(PageControlObj.url, { "numOnePage": PageControlObj.countPerPage, "pageIndex": PageControlObj.currentPage }, function (cbdata) {
                var data = cbdata.split("ContentAndCount");
                var list = eval("(" + data[0] + ")");
                PageControlObj.callback(list);
            });
            $("#" + PageControlObj.pageInfID).html(PageControlObj.currentPage + "/" + PageControlObj.pages);
            if (PageControlObj.pages > 1) {
                $("#" + PageControlObj.previousPageID).css("color", "gray");
                $("#" + PageControlObj.firstPageID).css("color", "gray");
                $("#" + PageControlObj.nextPageID).css("color", "black");
                $("#" + PageControlObj.lastPageID).css("color", "black");
            }
        });

        $("#" + this.lastPageID).click(function () {
            PageControlObj.currentPage = PageControlObj.pages;
            $.post(PageControlObj.url, { "numOnePage": PageControlObj.countPerPage, "pageIndex": PageControlObj.currentPage }, function (cbdata) {
                var data = cbdata.split("ContentAndCount");
                var list = eval("(" + data[0] + ")");
                PageControlObj.callback(list);
            });
            if (PageControlObj.pages > 1) {
                $("#" + PageControlObj.nextPageID).css("color", "gray");
                $("#" + PageControlObj.lastPageID).css("color", "gray");
                $("#" + PageControlObj.previousPageID).css("color", "black");
                $("#" + PageControlObj.firstPageID).css("color", "black");
            }
            $("#" + PageControlObj.pageInfID).html(PageControlObj.currentPage + "/" + PageControlObj.pages);
        });
    },
    //重新加载当前页数据
    Refresh: function () {
        var PageControlObj = this;
        var start = (this.currentPage - 1) * this.countPerPage;
        $.post(PageControlObj.url, { "numOnePage": PageControlObj.countPerPage, "pageIndex": PageControlObj.currentPage }, function (cbdata) {
            var data = cbdata.split("ContentAndCount");
            var list = eval("(" + data[0] + ")");
            //如果当前页数据位0条，则加载上一页的数据
            if (list.length == 0) {
                var newstart = start - PageControlObj.countPerPage;
                //判断如果当前在第一页，重新加载时数据为0条,不执行操作
                if (newstart < 0) {
                    $("#" + PageControlObj.pageInfID).html(0 + "/" + 0);
                    return;
                }
                PageControlObj.currentPage--;
                $.post(PageControlObj.url, { "numOnePage": PageControlObj.countPerPage, "pageIndex": PageControlObj.currentPage }, function (cbdata) {
                    var data = cbdata.split("ContentAndCount");
                    var list = eval("(" + data[0] + ")");
                    PageControlObj.callback(list);
                    //获取总记录数
                    PageControlObj.totalCount = parseInt(data[1]);
                    //计算总页数                
                    PageControlObj.pages = getPages(PageControlObj.totalCount, PageControlObj.countPerPage);
                    $("#" + PageControlObj.pageInfID).html(PageControlObj.currentPage + "/" + PageControlObj.pages);
                    if (PageControlObj.pages == 1) {
                        $("#" + PageControlObj.previousPageID).css("color", "gray");
                        $("#" + PageControlObj.firstPageID).css("color", "gray");
                        $("#" + PageControlObj.nextPageID).css("color", "gray");
                        $("#" + PageControlObj.lastPageID).css("color", "gray");
                        $("#" + PageControlObj.previousPageID).unbind("click");
                        $("#" + PageControlObj.firstPageID).unbind("click");
                        $("#" + PageControlObj.nextPageID).unbind("click");
                        $("#" + PageControlObj.lastPageID).unbind("click");
                    }
                });
                return;
            }
            PageControlObj.callback(list);
            //重新计算总页数
            PageControlObj.totalCount = parseInt(data[1]);                    //获取总记录数
            PageControlObj.pages = getPages(PageControlObj.totalCount, PageControlObj.countPerPage);         //计算总页数
            $("#" + PageControlObj.pageInfID).html(PageControlObj.currentPage + "/" + PageControlObj.pages);
            //如果刷新后的总页数等于当前页，让下一页，最后一页按钮颜色变灰
            if (PageControlObj.pages == PageControlObj.currentPage) {
                $("#" + PageControlObj.nextPageID).css("color", "gray");
                $("#" + PageControlObj.lastPageID).css("color", "gray");
            }
        });
    },

    CLASS_NAME: "R2.Business.PageControl"
});
//计算总页数
function getPages(totalCount, countPerPage) {
    var pages = 0;
    if (totalCount % countPerPage == 0) {
        pages = parseInt(totalCount / countPerPage);
    } else {
        pages = parseInt(totalCount / countPerPage) + 1;
    }
    return pages;
}