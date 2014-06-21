//展示原始图片 xyp
/*--------------------------------------展示原始图片--------------------------------------*/
R2.Business.ShowPicture = OpenLayers.Class({
    index:0,
    imgUrl: "http://localhost/RRFS/files/designer/r2.jinan济南市地质灾害气象风险预警与预报/系统界面图/首页.png",
    initialize: function (option) {
        OpenLayers.Util.extend(this, option);
        this.initPage();
        this.registClick();

    },
    initPage: function () {
       
        var str = '<div class="ShowPicture">' +
                     '<img class="showpic" src="' + this.imgUrl[this.index] + '">' +
                     '<div id="preImg">上一张</div>' +
                     '<div id="nextImg">下一张</div>' +
                  '</div>';
        $("body").append(str);
        var img = $(".showpic");
        var h = img.parent().height();
        var _img = new Image();
        _img.onload = function () {
            if (h >= this.height) {
                img.css({ "margin-top": h / 2 - this.height / 2 });
            } else {
                $(".ShowPicture").css({ "width": this.width, "height": this.height, "position": "fixed" });
            }
        }
        _img.src = img.attr('src');
       // $("#HomeRight").css({ "position": "fixed" });
       
    },
    registClick: function () {
        var that = this;
        $(".ShowPicture").click(function () {
            $(".ShowPicture").remove();
           // $("#HomeRight").css({ "position": "absolute" });
        });
        var count = that.index;
        $("#preImg").click(function (event) {
            count--;
            if (count >= 0 && count < that.imgUrl.length) {
                $(".ShowPicture img").attr("src", that.imgUrl[count]);
            }
            //if (count == 0) {
            //    $("#preImg").css("background-color", "grey");
            //}
            //else { $("#preImg").css("background-color", "#ff4e00"); }
            event.stopPropagation();
        });
        $("#nextImg").click(function (event) {
            count++;
            if (count >= 0 && count < that.imgUrl.length) {
                $(".ShowPicture img").attr("src", that.imgUrl[count]);
            }
            //if (count == that.imgUrl.length - 1) {
            //    $("#nextImg").css("background-color", "grey");
            //}
            //else { $("#nextImg").css("background-color", "#ff4e00"); }
            event.stopPropagation();
        });
    },
    CLASS_NAME: "R2.Business.ShowPicture"
});