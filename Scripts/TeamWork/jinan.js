/// <reference path="../QuoteJsLib/jquery-1.7.1.min.js" />
/// <reference path="../QuoteJsLib/OpenLayers.js" />

$(function () {
    var jn_word = [{ wordTitle: "系统需求文档", WordUrl: "Content/jinan/ZD-济南地质灾害气象预警预报系统-R2.mht" },
        { wordTitle: "功能设计文档", WordUrl: "Content/jinan/ZD-济南地质灾害气象预警预报系统_功能设计-R2Team.mht" },
        { wordTitle: "原始数据文档", WordUrl: "Content/jinan/济南地质灾害气象预警原始数据说明书-RTeam.mht" },
        { wordTitle: "中间过程文档", WordUrl: "Content/jinan/济南地质灾害气象预警中间过程数据说明书-RTeam.mht" }];

    var jn_worder = [{ name: "雷磊", zhiwei: "项目负责人" }, { name: "曹晓敏", zhiwei: "部分预警研发人员" }, { name: "赵森", zhiwei: "前后端参与研发人员" }, { name: "李雄", zhiwei: "部分预警研发人员" },
        { name: "曹四文", zhiwei: "核心系统研发人员" }, { name: "蒋建明", zhiwei: "雨量管理研发人员" }, { name: "帅磊", zhiwei: "设计师" },
        { name: "张振强", zhiwei: "前端研发人员" }, { name: "郭毅", zhiwei: "前端研发人员" }];
    var sysdescp = "本系统中业务数据库中的雨量数据包含的是2013年7月份数据。";
    //var workdescp = "雷磊是本项目的项目经理，负责系统的整体需求文档撰写以及系统整体把握，和框架结构设计；帅磊是本系统的界面设计师，负责控制界面的美工和整体效果及美感；" +
    //    "蒋建明负责项目中的雨量查询模块等；李雄负责系统前期当中的预警分析中的第五步（计算预警值）等；曹晓敏负责项目开始前期预警部分等；郭毅和张振强负责前期灾害点录入编辑的界面等；"+
    //    "赵森负责项目中的前期灾害点录入编辑界面部分等；曹四文负责项目前期部分功能和后期系统的跟进和修改完善、以及预警部分的完善修改，和部分文档的编写（原始数据文档、中间过程数据文档、功能设计部分文档）等。";

    var jn = new R2.Business.JinanPage({
        leftid: "PageLeft",
        rightid: "PageRight",
        title: "济南地质灾害气象预警预报系统",
        word: jn_word,  //[{wordTitle:"题目",WordUrl:""},{wordTitle:"题目",WordUrl:""}]
        worker: jn_worder, //[{name:"题目",zhiwei:""},{name:"题目",zhiwei:""}]
        SystemDesc: sysdescp,
        //workerDesc: workdescp,
        siteUrl: "http://192.168.83.236/jinan",
        videoUrl: "../../Content/video/jinan3.wmv",
    });
})

//项目资料页对象
R2.Business.JinanPage = OpenLayers.Class({
    leftid: "",  //左边容器div的id
    rightid:"",  //右边容器div的id
    title:"",    //项目名称题目
    word: [],  //[{wordTitle:"文档名称",WordUrl:"文档路劲"},{wordTitle:"文档题目",WordUrl:"文档路劲"}]
    worker: [], //[{name:"人名",zhiwei:"工作职位"},{name:"姓名",zhiwei:"工作职位"}]
    SystemDesc: "",  //系统描述
    workerDesc:"",   //工作人员描述 后取消了不用
    siteUrl: "",   //系统部署的站点url
    videoUrl: "",  //视频路劲
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.addleft();  //添加左边内容（四个文文档）
        this.addrightContent(); //添加右边内容
        this.CreateEvent();//注册相关事件
    },
    
    addleft:function(){
        var Num_word = this.word.length;
        var lefthtml = '<div class="wordHead" id="xmBaseInfo">主页简介</div><div class="wordHead">文档</div>';
        if (Num_word > 0) {
            for (var i = 0; i < Num_word; i++) {
                lefthtml += '<div class="XmwordTitle">' + this.word[i].wordTitle + ' </div>';
            }
            //lefthtml += '</div>';
            $("#" + this.leftid).append(lefthtml);
        }
    },
    addrightContent: function () {
        var righthtml = '';
        righthtml += '<div class="xmRow">' +
                 '<div class="xm_right_Title">系统名称</div>'+
                 '<div class="xm_right_txt">'+this.title+'</div>'+
                  '</div>';
        righthtml += '<div class="xmRow">' +
                 '<div class="xm_right_Title">内网地址</div>' +
                 '<div class="xm_right_txt" id="jnsiteUrl">' + this.siteUrl + '</div>' +
                  '</div>';


        var Num_worder = this.worker.length;
        
        if (Num_worder > 0) {
            var team = '';
            team += '<div class="xmRow">' +
                 '<div class="xm_right_Title">项目成员</div>' +
                 '<div class="xm_right_txt">';
            for (var i = 0; i < Num_worder; i++) {
                team += '<div class="xm_menbox">' +
                         '<div class="xm_men_name">' + this.worker[i].name + ':</div>' +
                         '<div class="xm_men_zhiwei">' + this.worker[i].zhiwei + '</div>' +
                     '</div>';
            }
            team += '</div></div>';
            righthtml += team;

            righthtml += '<div class="xmRow">' +
                '<div class="xm_right_Title">项目备注</div>' +
                '<div class="xm_right_txt" id="xmdesc">' + this.SystemDesc + '</div>' +
                 '</div>';
            //righthtml += '<div class="xmRow">' +
            //    '<div class="xm_right_Title">工作描述</div>' +
            //    '<div class="xm_right_txt" id="workdesc">' + this.workerDesc + '</div>' +
            //     '</div>';

            righthtml += '<div class="xmRow">'+
                    ' <div class="xm_right_Title">项目视频</div>'+
                    ' <div class="xm_right_txt">'+
                         '<div class="videobox">'+
                          //' <video width="660" height="440" controls>'+
                          //       ' <source src="'+this.videoUrl+'" type="video/mp4"> '+
                          //  ' </video>'+


                       '<object id="player" height="440" width="660" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6">'
                       +'<param NAME="AutoStart" VALUE="0">'
                       +'<param NAME="Balance" VALUE="0">'
                       +'<param name="enabled" value="-1">'
                       +'<param NAME="EnableContextMenu" VALUE="-1">'
                       + '<param NAME="url" VALUE="' + this.videoUrl + '">'
                       +'<param NAME="PlayCount" VALUE="1">'
                       +'<param name="rate" value="1">'
                       +'<param name="currentPosition" value="0">'
                       +'<param name="currentMarker" value="0">'
                       +'<param name="defaultFrame" value="">'
                       +'<param name="invokeURLs" value="0">'
                       +'<param name="baseURL" value="">'
                       +'<param name="stretchToFit" value="0">'
                       +'<param name="volume" value="50">'
                       +'<param name="mute" value="0">'
                       +'<param name="uiMode" value="mini">'
                       +'<param name="windowlessVideo" value="0">'
                       +'<param name="fullScreen" value="0">'
                       +'<param name="enableErrorDialogs" value="-1">'+
                        +'</object>'+



                        ' </div>'+
                    ' </div>'+
               ' </div>';
            
            righthtml+='<div class="wIframe">'+
                       ' <iframe src="" id="wordIframe" >'+
                        '</iframe> '+            
                         ' </div>';
            $("#" + this.rightid).append(righthtml);
        }
    },
    CreateEvent: function () {
        var that = this;
        $(".XmwordTitle").live("click", function () {
            var index = $(".XmwordTitle").index($(this));
            that.leftEvent(index);
        });
        $("#xmBaseInfo").click(function () {
            $(".xmRow").css({ "display": "block" });
            $("#" + this.rightid + " >div").show();
            $(".wIframe").css({ "display": "none" });
            $("#wordIframe").attr("src", "");
        })
        $("#jnsiteUrl").click(function () {
            window.open(that.siteUrl);
        })
    },
    leftEvent: function (index) {
        //在线查看文档
        $(".xmRow").css({ "display": "none" });
        $(".wIframe").css({ "display": "block" });
        $("#wordIframe").attr("src", baseUrl+this.word[index].WordUrl);
    }

})