/*
这是一个悲伤的故事，首页全改，此页面全部注释，一字未改。ZHAOs 2013年12月9日14:52:54

var projectsBgColor = ["#6b9fb9", "#54a2a9", "#6480ae", "#8172a3", "#8ab5b9", "#4f979e"];
var dfd = [];
var projectsName = ["海南抗震监管备案设防平台", "云南地质灾害信息管理系统", "大连地质灾害信息管理系统", "福建地质灾害信息管理系统", "江西省地质灾害预警预报系统", "龙岩地质灾害信息管理系统", "win8地灾系统APP", "农村村庄地理信息系统", "R2Team Develpoer Library"];
var projectsTime = ["2012年4月", "2012年6月", "2012年10月", "2013年4月", "2013年4月", "2013年6月", "2013年8月", "2013年9月", "2013年10月"];

$(function () {
    TeamProjects();
    MoreTeamProjects();
    //MoreTeamProjectsShow();
})

function MoreTeamProjectsShow() {
    var count = 0;
    var time = setInterval(function () {
        if(count < 1100){
            $(".team_project").css("width", "+=1px");
            count++;
        }
    }, 1);
}

function TeamProjects() {
    var TeamProjects = "";
    for (var i = 0; i < projectsName.length; i++) {
        if (i % 2 == 0) {
            TeamProjects +=
                '<div class="every_achieve">' +
                    '<div class="achieve_content"></div>' +
                    '<div class="achieve_time"></div>' +
                '</div>';
        } else {
            TeamProjects +=
                '<div class="every_achieve">' +            
                    '<div class="achieve_time"></div>' +
                    '<div class="achieve_content"></div>' +
                '</div>';
        }
    }
    $(".team_achieve").append(TeamProjects);
    for (var i = 0; i < projectsName.length; i++) {
        $(".every_achieve").eq(i).children(".achieve_content").text(projectsName[i]);
        $(".every_achieve").eq(i).children(".achieve_time").text(projectsTime[i]);
        if (projectsBgColor.length < projectsName.length) {
            projectsBgColor = projectsBgColor.concat(projectsBgColor);
        }
        $(".every_achieve").eq(i).children(".achieve_content").css("background", projectsBgColor[i]);
    }
    $(".every_achieve:even").children(".achieve_time").css("margin-top", "40px");
    $(".every_achieve:odd").children(".achieve_time").css("margin-top", "110px");
    $(".every_achieve:odd").children(".achieve_content").css("margin-top", "40px");
    $(".every_achieve:eq(8)").children(".achieve_content").css({"padding": "30px 7px 40px","height":"60px"});
}

function MoreTeamProjects() {
    var i = 0;
    var picTimer;
    $(".achieve_more").hover(function () {
        if (i < projectsName.length - 6) {
                $(".team_achieve").animate({ "left": "-=200" }, 900);
            i++;
            $(".achieve_less").css("background-position", "0px -2px");
            if (i == projectsName.length - 6) {
                $(".achieve_more").css("background-position", "0px -2px");
            }
        }
        picTimer = setInterval(function () {
            if (i < projectsName.length - 6) {
                $(".team_achieve").animate({ "margin-left": "-=200" }, 900);
                i++;
                $(".achieve_less").css("background-position", "0px -2px");
            } else {
                $(".achieve_more").css("background-position", "0px -2px");
            }
        },1000);
    },function () {
        clearInterval(picTimer);
    });
    $(".achieve_less").hover(function () {
        if (i > 0) {
            $(".team_achieve").animate({ "left": "+=200" }, 900);
            i--;
            $(".achieve_more").css("background-position", "-30px -2px");
            if (i == 0) {
                $(".achieve_less").css("background-position", "-30px -2px");
            }
        }
        picTimer = setInterval(function () {
            if (i > 0) {
                $(".team_achieve").animate({ "left": "+=200" }, 900);
                i--;
                $(".achieve_more").css("background-position", "-30px -2px");
            } else {
                $(".achieve_less").css("background-position", "-30px -2px");
            }
        }, 1000);
    }, function () {
        clearInterval(picTimer);
    });
}
*/