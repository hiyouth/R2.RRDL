//indow.R2 = {};

//R2.Business = OpenLayers.Class(R2, {});

R2.Business.Search = OpenLayers.Class({
    //检索条件区文本输入框ID
    inputTextAreaID: "",
    //检索执行DIV的ID
    searchOKID: "",
    //是否支持自动获取查询关键字
    isAutoDetective: true,
    //关键字监听结果展示框的宽度
    fieldDetectResultDivWidth: 200,
    //输入条件监听的后台地址
    conditionFieldDetectiveURL: "",
    //关键字侦听查询完成后的回调函数
    callbackOnDetectedFields: $.noop,
    //查询后台地址
    searchFunctionURL: "",
    //查询按钮事件回调
    callbackOnClickSearch: $.noop,


    //检索文本框内容长度变量，用于控制发送请求
    searchConditionTextLengthOld: 0,
    searchConditionTextLengthNew: 0,


    /*
    *初始化函数：参数（输入框ID，确定按钮ID，其它）
    */
    initialize: function (inputID, okDivID, option) {
        if (inputID == "" || okDivID == "" || inputID == undefined || okDivID == undefined) {
            return;
        }
        this.inputTextAreaID = inputID;
        this.searchOKID = okDivID;
        OpenLayers.Util.extend(this, option);

        //是否支持关键字侦听
        if (this.isAutoDetective) {
            this.appendDetectiveResultDiv();
            this.registerDetectiveEvent();
        }

        //确定按钮事件注册
        this.registerOKButtonEvent();
    },

    appendDetectiveResultDiv: function () {
        var parentDiv = $("#" + this.inputTextAreaID).parent();
        var DetectiveResultDiv = $("<div id='" + this.inputTextAreaID + "DetectiveResult' class='Search_DetectResultDiv'>");
        DetectiveResultDiv.css({ width: this.fieldDetectResultDivWidth, display: "none" });
        //DetectiveResultDiv.css({ display: "none" });

        parentDiv.append(DetectiveResultDiv);
    },

    registerDetectiveEvent: function () {
        var isClickResult = false;
        var obj = this;
        $("#" + this.inputTextAreaID).focusin(function (eve) {
            //文本框获得焦点时绑定键盘监听事件
            $(this).bind({
                keydown: function () {
                    //键盘按下的时候获取当前的文本长度
                    obj.searchConditionTextLengthOld = $(this).val().length;
                },
                keyup: function () {
                    //键盘弹起的时候获取文本长度
                    obj.searchConditionTextLengthNew = $(this).val().length;
                    //文本长度发生变化，发送查询请求
                    if (obj.searchConditionTextLengthNew - obj.searchConditionTextLengthOld != 0 && obj.searchConditionTextLengthNew != 0) {
                        $.post(obj.conditionFieldDetectiveURL, { "_method": "dectectField", "condition": $("#" + obj.inputTextAreaID).val() }, function (data) {
                            //1st.处理数据
                            var detectedDataStrArray = data.toString().split('&');
                            if (detectedDataStrArray.length == 0) {
                                return;
                            }
                            //动态设置结果框的高度
                            $("#" + obj.inputTextAreaID + "DetectiveResult").css({
                                height: function (index, value) { return detectedDataStrArray.length * 25; }
                            });

                            var detectResultContentStr = "";
                            for (var i = 0; i < detectedDataStrArray.length; i++) {
                                detectResultContentStr = detectResultContentStr + '<div id="' + obj.inputTextAreaID + 'DetectiveResultChild' + i + '" class="Search_DetectiveResultChild">' + detectedDataStrArray[i] + '</div>';
                            }

                            $("#" + obj.inputTextAreaID + "DetectiveResult").html("");
                            $("#" + obj.inputTextAreaID + "DetectiveResult").append(detectResultContentStr);

                            $(".Search_DetectiveResultChild").live("click", function (event) {
                                $("#" + obj.inputTextAreaID).val($("#" + event.srcElement.id).text());
                                $("#" + obj.inputTextAreaID + "DetectiveResult").hide();
                            });

                            //移入结果区域时将input光标事件取消
                            $(".Search_DetectiveResultChild").mouseenter(function (evt) {
                                $("#" + obj.inputTextAreaID).unbind('focusout');
                            });
                            //移出结果区域时将input光标事件注册
                            $(".Search_DetectiveResultChild").mouseout(function (evt) {
                                $("#" + obj.inputTextAreaID).focusout(function (evt) {
                                    $("#" + obj.inputTextAreaID).unbind("keydown keyup");
                                    $("#" + obj.inputTextAreaID + "DetectiveResult").hide();
                                })
                            });
                            //2nd.结果展示
                            $("#" + obj.inputTextAreaID + "DetectiveResult").show();
                        });
                    }

                    if (obj.searchConditionTextLengthNew == 0) {
                        $("#" + obj.inputTextAreaID + "DetectiveResult").hide();
                    }
                }
            });
        });

        $("#" + this.inputTextAreaID).focusout(function (event) {
            //文本框失去焦点时解除绑定键盘监听事件
            $(this).unbind("keydown keyup");
            $("#" + obj.inputTextAreaID + "DetectiveResult").hide();
        });
    },

    registerOKButtonEvent: function () {
        var SearchObj = this;
        var SearchOKButton = $("#" + this.searchOKID);
        var SearchConditionText = $("#" + this.inputTextAreaID);

        SearchOKButton.click(function () {
            if (SearchConditionText.val() == "") {
                return;
            }
            var SearchConditionTextVal = SearchConditionText.val();
            //过滤字符串中的空格
            SearchConditionTextVal = SearchConditionTextVal.replace(/\s/g, '');
            SearchObj.callbackOnClickSearch(SearchConditionTextVal);
//            $.post(SearchObj.searchFunctionURL, { "_method": "search", "condition": SearchConditionTextVal }, function (data) {
//                //回调
//                SearchObj.callbackOnSearchSuccess(data);
//            });
        });
    },

    CLASS_NAME: "R2.Business.Search"
});