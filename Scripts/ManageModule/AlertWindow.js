

R2.Business.AlertWindow = OpenLayers.Class({
    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用

    //弹出内容
    content: "",

    //是否有取消按钮
    HasCancel:false,

    //跳转到url
    LoadUrl: "",

    //自定义确定按钮的id，默认无
    ensureId: "",

    //自定义取消按钮的id，默认无
    cancelId: "",

    initialize: function (content,option) {
        this.content = content;
        OpenLayers.Util.extend(this, option);
        this.initAlertWindow();
        this.closeAlertWindow();
        this.isHasCancel();
        this.isHasNewId();
    },

    //加载dom
    initAlertWindow: function () {
        var alertDiv =
                '<div class="AlertWindow">' +
                    '<div class="AlertWindow_content">' +
                        '<div class="AlertWindow_center">' +
                            '<div class="AlertWindow_center_cont">'+this.content+'</div>' +
                            '<div class="AlertWindow_btn">' +
                                '<div class="AlertWindow_submit AlertWindow_submit1">确 定</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
        $("body").append(alertDiv);

    },

    closeAlertWindow: function () {
        var that = this;
        $(".AlertWindow_submit1").click(function () {
            $(".AlertWindow").remove();

            //判断是否跳转到新页面
            if (that.LoadUrl != "") {
                window.location.href = baseUrl + that.LoadUrl;
            } else {

            }
        });
        $(".AlertWindow_submit2").live("click",function () {
            $(".AlertWindow").remove();
        });
    },

    //判断是否有取消按钮
    isHasCancel:function(){
        var that=this;
        if (that.HasCancel == true) {
            $(".AlertWindow_submit1").before('<div class="AlertWindow_submit AlertWindow_submit2">取 消</div>');
            
        } else {          
        }
    },

    //判断确定或取消按钮是否有自定义ID

    isHasNewId: function () {
        if (this.ensureId != "") {
            $(".AlertWindow_submit1").attr("id", this.ensureId);
        }

        if (this.cancelId != "") {
            $(".AlertWindow_submit2").attr("id", this.cancelId);
        }
    },
    CLASS_NAME: "R2.Business.AlertWindow",
})