$(function () {
    DesignInit();
    new R2.Business.ProjectName({ id: "HomeLeft_content" });
    new R2.Business.SystemHome();
});
function DesignInit() {
    $("#Copyright").remove();
}
/*--------------------------------------项目名称列表--------------------------------------*/
R2.Business.ProjectName = OpenLayers.Class({
    id: "",
    proNumber:0,//项目编号
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.initProjectName();
        this.registproOptionsClick();
        this.registproNameClick();
       
        $("#proNameList li").eq(0).trigger("click");
    },
    initProjectName: function () {

        var proName = ["世界遗产保护系统Demo", "龙岩地质灾害气象预警", "大连地质灾害信息管理系统", "福建地质灾害气象预警预报系统", "农村村庄地理信息系统Demo", "军事地质辅助决策系统", "江西省地质灾害和矿山复绿数据库管理系统", "江西地质灾害监测预警系统", "济南市地质灾害气象风险预警与预报",
                        "湖北省地质灾害综合管理平台演示Demo", "云南省地质灾害气象预警", "云南省旅游景点展示Demo", "雅安地震宣传图", "汶川地质灾害信息系统", "地下水资源数据集成与服务系统", "地下水资源数据库系统APP", "地灾 Windows8 MetroUI",
                        "地质大学出版社APP", "国家突发地质灾害", "海口市创卫信息管理系统", "陕西突发公共事件预警信息发布平台", "R2Team library", "海南抗震设防平台A系统","海南抗震设防平台B系统", "三维地质灾害管理系统", "天津地下水"];
        var strProName = '<div class="proTitle">项目名称</div>'+
                         '<ul id="proNameList">' +
                                //'<li>世界遗产保护系统</li>'+
                         '</ul>';
        $("#" + this.id).html(strProName);
        for (var i = 0; i < proName.length; i++) {
            var str = '<li title=' + proName[i] + '>' + proName[i] + '</li>';
            $("#proNameList").append(str);
        }
        $("#proNameList li:eq(1),#proNameList li:eq(3),#proNameList li:eq(16),#proNameList li:eq(22)").addClass("textColorName");
        var str = '<div id="systemHome" class="proOptions">系统主界面</div>' +
                '<div id="systemPic" class="proOptions">系统切图</div>' +
                '<div id="systemPSD" class="proOptions">PSD源文件</div>' +
                '<div id="sysDoc" class="proOptions">文档</div>';
        $(".HomeLeft_white").append(str);
       
        
    },
    registproNameClick: function () {
        var obj = this;
        $("#proNameList li").click(function () {
            obj.proNumber = $("#proNameList li").index(this);
            var jt = '<div class="right_jt"></div>';
            $(".right_jt").remove();
            $("#proNameList li").removeClass("proNameList_color").eq(obj.proNumber).addClass("proNameList_color").append(jt);
            if (obj.proNumber == 2 || obj.proNumber == 7 || obj.proNumber == 10 || obj.proNumber == 22) {
                $("#systemJu").remove();
                var strj = '<div id="systemJu" class="proOptions">系统局部图</div>';
                $("#systemHome").after(strj);
                  obj.registsystemJuClick();
            } else {
                $("#systemJu").remove();
            }
          
            $(".proOptions").eq(0).trigger("click");
        });
        //鼠标移入移除时的滚动条事件
        $("#HomeLeft").hover(function (e) {
            $("#HomeLeft").css({ "position": "absolute" });
            $("#HomeRight").css({ "position": "fixed" });
            $("#HomeRight").removeClass("test");
            $(document).scrollTop(0);
        });
        $("#HomeRight").hover(function (e) {
            $("#HomeRight").css({ "position": "absolute" });
            $("#HomeLeft").css({ "position": "fixed" });
           
            
            $("#HomeRight").addClass("test");
        });
        
    },
    registproOptionsClick: function () {
        var obj = this;
        $(".proOptions").click(function () {
            var index = $(".proOptions").index(this);
            $(".proOptions").removeClass("proNameList_color").eq(index).addClass("proNameList_color");
            if (obj.proNumber != 2 && obj.proNumber != 7 && obj.proNumber != 10 && obj.proNumber != 22) {
                switch (index) {
                    case 0: {
                        new R2.Business.SystemHome({ proNumber: obj.proNumber }); break;
                    }
                    case 1: {
                        new R2.Business.SystemPicture({ proNumber: obj.proNumber });break;
                    }
                    case 2: {
                        new R2.Business.SystemPSD({ proNumber: obj.proNumber }); break;
                    }
                    case 3: {
                        new R2.Business.SystemDoc({ proNumber: obj.proNumber }); break;
                    }
                    default: { }
                }
            }
            else {
                switch (index) {
                    case 0: {
                        new R2.Business.SystemHome({ proNumber: obj.proNumber }); break;
                    }
                    case 1: {
                        new R2.Business.SystemPartialPicture({ proNumber: obj.proNumber }); break;
                    }
                    case 2: {
                        new R2.Business.SystemPicture({ proNumber: obj.proNumber }); break;
                    }
                    case 3: {
                        new R2.Business.SystemPSD({ proNumber: obj.proNumber }); break;
                    }
                    case 4: {
                        new R2.Business.SystemDoc({ proNumber: obj.proNumber }); break;
                    }
                    default: { }
                }
            }
        });
        
    },
    registsystemJuClick: function () {
        var obj = this;
        $("#systemJu").click(function () {
            new R2.Business.SystemPartialPicture({ proNumber: obj.proNumber });
        });
    },
    CLASS_NAME: "R2.Business.ProjectName"
});
/*--------------------------------------系统主界面--------------------------------------*/
R2.Business.SystemHome = OpenLayers.Class({
    //项目编号
    proNumber: 0,
    // id: "",
   // textTitle: ["主页.png", "二级页面", "三级页面", "四级页面"],
   // illustration: ["首页展示的是一二级菜单栏的展现方式", "二级页面展示的是一二级菜单栏的展现方式", "三级页面展示的是一二级菜单栏的展现方式", "首页展示的是一二级菜单栏的展现方式"],
   // imgUrl: "http://localhost/RRFS/files/designer/r2.jinan济南市地质灾害气象风险预警与预报/系统界面图/首页.png",
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.registClick();
       
    },
    initPage: function () {
        var that = this;
        $("#HomeRight").html("");
        var str = '<ul id="sysHome"></ul>';
        $("#HomeRight").html(str);
       
       // var Count = Math.ceil(sysPageUrl[this.proNumber].length / 10);             
        for (var i = 0; i < sysPageUrl[that.proNumber].length; i++) {
            sysPageName[that.proNumber][i] = /[^\/]+$/.exec(sysPageUrl[that.proNumber][i]);  //用正则表达式获取名字
            var strHome = '<li><div class="text_Home">' + sysPageName[that.proNumber][i] + '</div>' +
                          '<div class="text_illus">说明：' + sysPageIllustrate[that.proNumber][i] + '</div>' +
                          '<img class="imgUrl" src="' + sysPageUrl[that.proNumber][i] + '" ></li>';
            $("#sysHome").append(strHome);
        }
     
      //if(Count>1){
      //    var t = 1;
         
      //      $(document).scroll(function (e) {
              
      //          if ($(document).scrollTop() >= $(document).height() - $(window).height()) {  //滚动条到了底部
      //              if ($("#HomeRight").hasClass("test")) {
      //                  for (var i = 0; i < 10 && t <= Count && (t * 10 + i) < sysPageUrl[that.proNumber].length; i++) {
      //                      sysPageName[that.proNumber][t * 10 + i] = /[^\/]+$/.exec(sysPageUrl[that.proNumber][t * 10 + i]);  //用正则表达式获取名字
      //                      var strHome = '<li><div class="text_Home">' + sysPageName[that.proNumber][t * 10 + i] + '</div>' +
      //                                '<div class="text_illus">说明：' + sysPageIllustrate[that.proNumber][t * 10 + i] + '</div>' +
      //                                '<img class="imgUrl" src="' + sysPageUrl[that.proNumber][t * 10 + i] + '" ></li>';
      //                      $("#sysHome").append(strHome);
      //                  }
      //                  t++;
      //              }
      //         }
      //      })
      //  }
    },
    registClick: function () {
        var obj = this;
        $(".imgUrl").click(function () {
            var index = $(".imgUrl").index(this);
          //  $("#HomeRight").css({ "position": "fixed" });
            new R2.Business.ShowPicture({ imgUrl: sysPageUrl[obj.proNumber],index:index });
            
        });
    },
    CLASS_NAME: "R2.Business.SystemHome"
});
/*--------------------------------------系统切图--------------------------------------*/
R2.Business.SystemPicture = OpenLayers.Class({
    
    //项目编号
    proNumber: 0,

    imgSize: [],
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.initPage();
      // this.registClick();

    },
    initPage: function () {
        var that = this;
        $("#HomeRight").html("");
        var str = '<ul id="PictureContent"></ul>';
        $("#HomeRight").html(str);
        //var Count = Math.ceil(minPictureUrl[that.proNumber].length / 30);
        for (var i = 0; i < minPictureUrl[that.proNumber].length ; i++) {
            minPictureName[that.proNumber][i] = /[^\/]+$/.exec(minPictureUrl[that.proNumber][i]);  //用正则表达式获取名字
            var strImg = '<li><div class="picName">' + minPictureName[that.proNumber][i] + '</div><div class="picSize"></div><div class="picUrl"><img class="imgPosition" src="' + minPictureUrl[that.proNumber][i] + '"></div></li>';
           // var strImg = '<li><div class="picName">' + minPictureName[this.proNumber][i] + '</div><div class="picSize"></div><div class="picUrl" style="background:url(' + minPictureUrl[this.proNumber][i] + ') no-repeat center;"></div></li>';
            
            $("#PictureContent").append(strImg);
            //让图片居中显示
           
                var img = $(".imgPosition").eq(i);
                var h = img.parent().height();
                var h2 = $(".imgPosition").eq(i).height();           
                var t = h / 2 - h2 / 2;
                $(".imgPosition").eq(i).css({ "margin-top": t + "px" });
                var _img = new Image();
                // var img = $(".imgPosition");
                // var h = img.parent().height();
                // var h2 = $(".imgPosition").eq(i).height();
                // var t = h / 2 - h2 / 2;
                // var _img = new Image();
                             
                //_img.onload = function () {
                //    if (h >= this.height) {
                //        img.css({ "margin-top": t + "px" });
                //    } else {
                //        $(".imgPosition").eq(i).css({ "width": img.width, "height": img.height });
                //    }
                   
                //}
                _img.src = img.attr('src');
               
            //插入图片尺寸
                that.imgSize[i] = _img.width + '×' + _img.height;
            // that.imgSize[i] = img.width() + '×' + img.height();
                $(".picSize").eq(i).append(that.imgSize[i]);
        }
       
    },
   
    CLASS_NAME: "R2.Business.SystemPicture"
});
/*--------------------------------------PSD源文件--------------------------------------*/
R2.Business.SystemPSD = OpenLayers.Class({
    //项目编号
    proNumber: 0,
    illustration: "首页展示的是一二级菜单栏的展现方式",
    psdName: ["首页", "登陆页", "列表页"],
    psdUrl:[],
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.registPsdClick();

    },
    initPage: function () {
        $("#HomeRight").html("");
        var str = '<ul id="PSDContent"></ul>';
        $("#HomeRight").html(str);
        for (var i = 0; i < psdFileUrl[this.proNumber].length; i++) {
            psdFileName[this.proNumber][i] = /[^\/]+$/.exec(psdFileUrl[this.proNumber][i]);  //用正则表达式获取名字
            var strPsd = '<li><div class="psdName">' + psdFileName[this.proNumber][i] + '</div><div class="psdIMG"></div></li>';
            $("#PSDContent").append(strPsd);
        }
    },
    registPsdClick: function () {
        var obj = this;
        $("#PSDContent li").click(function () {
            var index = $("#PSDContent li").index(this);
            obj.AlertPSD();
        });
    },
    AlertPSD: function () {
        var str = '<div id="AlertPSD">' +
                     '<div class="AlertPSD_Middle">' +
                        '<div class="AlerPSD_center">' +
                            '<div class="PSDFile">下载PSD源文件</div><div class="ProPSDFile">下载项目PSD源文件</div>'+
                        '</div>' +
                        '<div class="AlertClose">×</div>' +
                     '</div>'+
                  '</div>';
        $("body").append(str);
        this.AlertPSDClick();
    },
    AlertPSDClick: function () {
        $(".AlertClose").click(function () {
            $("#AlertPSD").remove();
        });
    },
    CLASS_NAME: "R2.Business.SystemPSD"
});
/*--------------------------------------文档--------------------------------------*/
R2.Business.SystemDoc = OpenLayers.Class({
    //项目编号
    proNumber: 0,
    illustration: "首页展示的是一二级菜单栏的展现方式",
    imgUrl: "",
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.initPage();

    },
    initPage: function () {
        $("#HomeRight").html("");
        var str = '';
        $("#HomeRight").html(str);
    },
    CLASS_NAME: "R2.Business.SystemDoc"
});
/*--------------------------------------系统局部图--------------------------------------*/
R2.Business.SystemPartialPicture = OpenLayers.Class({
    //项目编号
    proNumber: 0,
    
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.registClick();
    },
    initPage: function () {
        $("#HomeRight").html("");
        var str = '<ul id="sysPartial"></ul>';
        $("#HomeRight").html(str);
        for (var i = 0; i < sysPartialUrl[this.proNumber].length; i++) {
            sysPartialName[this.proNumber][i] = /[^\/]+$/.exec(sysPartialUrl[this.proNumber][i]);  //用正则表达式获取名字
            var strHome = '<li><div class="text_Home">' + sysPartialName[this.proNumber][i] + '</div>' +
                          '<img class="partialImg" src="' + sysPartialUrl[this.proNumber][i] + '"></li>';
            $("#sysPartial").append(strHome);
          
        }
    },
    registClick: function () {
        var obj = this;
        $(".partialImg").click(function () {
            var index = $(".partialImg").index(this);
            new R2.Business.ShowPicture({ imgUrl: sysPartialUrl[obj.proNumber][index] });
            $("#HomeRight").css({ "position": "fixed" });
        });
    },
    CLASS_NAME: "R2.Business.SystemPartialPicture"
});

