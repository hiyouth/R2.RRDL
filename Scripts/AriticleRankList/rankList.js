//$(document).ready(function () {
//    var a = 9;
//    $("#tabs").tabs();
//    fillTables();
//});


//    $.fn.tabs = function () {
//        var content = this.find("div");
//        var list = this.find("ul.tabs_header").find("li");
//        content.hide();
//        content.eq(0).show();
//        list.eq(0).addClass("active");
//        list.each(function (i) {
//            $(this).bind({
//                click: function () {
//                    list.removeClass("active");
//                    content.hide();
//                    content.eq(i).css("display", "");
//                    $(this).addClass("active");
//                },
//                mousemove: function () {
//                    $(this).addClass("hover");
//                },
//                mouseout: function () {
//                    $(this).removeClass("hover");
//                }
//            });
//        });
//    }


////根据点击的选项卡填充下方相应的table
//function fillTables() {
//    $(".tabs_header li").click(function () {
//        var index = $(this).index();
//        if (index == 0) {
//            if ($(".tabs_content:eq(0) table tr").length == 0) {
//                getMemberRankList();
//            }
//        }
//        if (index == 1) {
//            if ($(".tabs_content:eq(1) table tr").length == 1) {
//                getTeamRankList();
//            }
//        }
//        if (index == 2) {
//            if ($(".tabs_content:eq(2) table tr").length == 0) {
//                getTypeRankList();
//            }
//        }
//    });
//}
//function getMemberRankList() {
//    $.post(baseUrl + "RankList/GetMemberRank", null, function (data) {
//        var objList = eval("(" + data + ")");
//        for (var i = 0; i < objList.length; i++) {
//            var s = '<tr>' +
//                   '<td class="row0"></td>' +
//                   '<td class="row1"></td>' +
//                   '<td class="row2"></td>' +
//               '</tr>';
//            $(".tabs_content:eq(0) table").append(s);
//            $(".tabs_content:eq(0) tr:eq(" + i + ")").find(".row0").append("NO." + (i + 1));
//            $(".tabs_content:eq(0) tr:eq(" + i + ")").find(".row1").append(objList[i].RealName);
//            $(".tabs_content:eq(0) tr:eq(" + i + ")").find(".row2").append(objList[i].ariticleCount);
//        }
//    });
//    tableDecoration();
//}
//function getTeamRankList() {
//    tableDecoration();
//}
//function getTypeRankList() {
//    tableDecoration();
//}

////这个函数用来处理三个table的显示样式，如前三行高亮等
//function tableDecoration() {
//    $(".tabs_content tr:eq(0) td").css("color", "#C10808");    

//}
