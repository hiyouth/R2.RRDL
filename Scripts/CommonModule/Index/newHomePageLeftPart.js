$(function () {
    var typeName = "";
    for (var i = 0; i < 5; i++) {
        switch (i) {
            case 0:
                typeName = "开发技术";
                break;
            case 1:
                typeName = "GIS业务";
                break;
            case 2:
                typeName = "常用服务";
                break;
            case 3:
                typeName = "精华文摘";
                break;
            case 4:
                typeName = "资源信息";
                break;
            default:
                typeName = "";
        }
        getContent(i,typeName);
    }
});

function getContent(i,typeName) {
    $.post(baseUrl + "HomePageLeft/GetContent", { "typeName": typeName }, function (data) {
        //alert(data);    Html?Css?Javascript?OpenLayers?.Net?
        var typeList = data.split('?');
        for (var t = 0; t < typeList.length-1; t++) {
            $(".homePageBlock:eq(" + i + ") .below").append("<div style='cursor:pointer;' class='classify'>" + typeList[t] + "</div>");
        }
    });
}