/// <reference path="Project.js" />
$(function () {
    projInfoClick();
});


function projInfoClick() {
    $(".item_info").click(function () {
        var index = $(".item_info").index($(this));
        switch (index) {
            //海南抗震监管备案设防平台           
            case 0:
                return false;
                createProjInfodiv(index);
                break;
            //云南地质灾害信息管理系统
            case 1:
                return false;
                createProjInfodiv(index);
                break;
            //大连地质灾害信息管理系统
            case 2:
                createProjInfodiv(index);
                break;                 
            //地质灾害产品行业开发SDK
            case 3:
                return false;
                createProjInfodiv(index);
                break;
            //福建地质灾害信息管理系统            
            case 4:
                createProjInfodiv(index);
                break;
            //江西省地质灾害预警预报系统            
            case 5:
                return false;
                createProjInfodiv(index);
                break;
            //龙岩地质灾害信息管理系统
            case 6:
                return false;
                createProjInfodiv(index);
                break;
            //win8地灾系统APP
            case 7:
                return false;
                createProjInfodiv(index);
                break;
            //农村村庄地理信息系统
            case 8:
                createProjInfodiv(index);
                break;
            //R2Team Develpoer Library
            case 9:
                createProjInfodiv(index);
                break;
            //丽江世界文化遗产保护系统
            case 10:
                createProjInfodiv(index);
                break;
            //中国地下水资源数据库管理系统（平板）
            case 11:
                return false;
                createProjInfodiv(index);
                break;
            //中国地质大学出版社电子平台（平板）
            case 12:
                return false;
                createProjInfodiv(index);
                break;
            //地质灾害产品三维演示系统
            case 13:
                return false;
                createProjInfodiv(index);
                break;
            //海南民居工程
            case 14:
                createProjInfodiv(index);
                break;
            //济南地质灾害气象预警预报系统
            case 15:
                return false;
                //createProjInfodiv(index);
                //window.location.href = baseUrl + "TeamWork/jinan";
                window.open(baseUrl + "TeamWork/jinan","_blank");
                break;            
            default:
                break;
        }
    });
    
}

//填充项目项目信息的方法
function createProjInfodiv(index) {
    $("#projInfoContentDiv").css("display", "block");
    $(".About_item").css("display", "none");
    proj = projList[index];
    $(".projUrl").attr("href", proj.projUrl);
    $(".projUrl").html(proj.projUrl);
    $(".projXQdoc").attr("href", proj.projXQdocUrl);   
    $(".projYSSJDoc").attr("href", proj.projYSSJDocUrl);    
    $(".projZJGCFXDoc").attr("href", proj.projZJGCFXDocUrl);
    $(".projGNFXDoc").attr("href", proj.projGNFXDocUrl);
}