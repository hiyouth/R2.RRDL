/*
*描述：系统全局成员变量定义
*create by cxm 2013-10-11 9:42:01
*/

//此处在window对象中定义命名空间
window.R2 = {};

//加载脚本时立即执行本方法
(function initNameSpace() {
    R2 = R2 || {};
    R2.Control=OpenLayers.Class(R2, {});
    R2.Business=OpenLayers.Class(R2, {});

    //用于页面间传递数据
    R2.DataTransport = null;

})();


function AddCode() {
    $("#code").click(function () {
        $("#UploadKonwledge_BackgroundConver").show();
        $("#AddCodePlate").show();
    });
    $("#AddCode_Close").click(function () {
        $("#CodeContent").val("");
        $("#UploadKonwledge_BackgroundConver").hide();
        $("#AddCodePlate").hide();
    });
    $("#AddCode_Ok").click(function () {
        var code = $("#CodeContent").html();
        var CodeType = $("#Select_Language").val();
        var addCodeText = "";
        switch (CodeType) {
            case "csharp":
                addCodeText = "<pre>[code=csharp]" + code + "[/code]</pre>";
                break;
            case "java":
                addCodeText = "<pre>[code=java]" + code + "[/code]</pre>";
                break;
            case "cpp":
                addCodeText = "<pre>[code=cpp]" + code + "[/code]</pre>";
                break;
            case "jscript":
                addCodeText = "<pre>[code=jscript]" + code + "[/code]</pre>";
                break;
            case "css":
                addCodeText = "<pre>[code=css]" + code + "[/code]</pre>";
                break;
            case "xml":
                addCodeText = "<pre>[code=xml]" + code + "[/code]</pre>";
                break;
            case "sql":
                addCodeText = "<pre>[code=sql]" + code + "[/code]</pre>";
                break;
            case "php":
                addCodeText = "<pre>[code=php]" + code + "[/code]</pre>";
                break;
            case "vb":
                addCodeText = "<pre>[code=vb]" + code + "[/code]</pre>";
                break;
        }
        var content = ckd.getData();
        content = content + addCodeText;
        ckd.setData(content);
        $("#CodeContent").val("");
        $("#UploadKonwledge_BackgroundConver").hide();
        $("#AddCodePlate").hide();
    });
}

//知识预览要获取的内容
function getCkeditorValueToPreview(details) {
    var value = details;
    value = clearTarget(value);
    return value;
}

function clearTarget(value) {
    var firstArray = value.split("[code=");
    var secondArrayResult = "";
    var result = "";
    for (var i = 0 ; i < firstArray.length; i++) {
        secondArrayResult = secondSplit(firstArray[i]);
        result = result + secondArrayResult;
    }
    return result;
}
function secondSplit(val) {
    if(val.indexOf("[/code]")!=-1){
        var secondArray = val.split("[/code]");
        //val = clearPBRNBSP(getSecondTarget(secondArray[0])) + "</pre>" +secondArray[1];
        val = getSecondTarget(secondArray[0]) + "</pre>" + secondArray[1];
    }
    return val;
}

function getSecondTarget(val) {
    if (val.indexOf("csharp]") != -1) {
        val = val.substring(7, val.length);
        val = "<pre class='brush:csharp;'>" + val;
    }
    if (val.indexOf("java]") != -1) {
        val = val.substring(5, val.length);
        val = "<pre class='brush:java;'>" + val;
    }
    if (val.indexOf("cpp]") != -1) {
        val = val.substring(4, val.length);
        val = "<pre class='brush:cpp;'>" + val;
    }
    if (val.indexOf("jscript]") != -1) {
        val = val.substring(8, val.length);
        val = "<pre class='brush:jscript;'>" + val;
    }
    if (val.indexOf("css]") != -1) {
        val = val.substring(4, val.length);
        val = "<pre class='brush:css;'>" + val;
    }
    if (val.indexOf("xml]") != -1) {
        val = val.substring(4, val.length);
        val = "<pre class='brush:xml;'>" + val;
    }
    if (val.indexOf("sql]") != -1) {
        val = val.substring(4, val.length);
        val = "<pre class='brush:sql;'>" + val;
    }
    if (val.indexOf("php]") != -1) {
        val = val.substring(4, val.length);
        val = "<pre class='brush:php;'>" + val;
    }
    if (val.indexOf("vb]") != -1) {
        val = val.substring(3, val.length);
        val = "<pre class='brush:vb;'>" + val;
    }
    return val;
}

function clearPBRNBSP(val){
    ////去掉<br/>
    //var clearBR = val.split("<br />");
    //var clearBRresult = "";
    //for (var i = 0 ; i < clearBR.length; i++) {
    //    clearBRresult = clearBRresult + clearBR[i];
    //}
    ////去掉<p>
    //var clearP = clearBRresult.split("<p>");
    //var clearPresult = "";
    //for (var i = 0 ; i < clearP.length; i++) {
    //    clearPresult = clearPresult + clearP[i];
    //}
    ////去掉</p>
    //var clearTP = clearPresult.split("</p>");
    //var clearTPresult = "";
    //for (var i = 0 ; i < clearTP.length; i++) {
    //    clearTPresult = clearTPresult + clearTP[i];
    //}
    ////去掉空格
    //var clearNBPS = clearTPresult.split("&nbsp;");
    //var result = "";
    //for (var i = 0 ; i < clearNBPS.length; i++) {
    //    result = result + clearNBPS[i];
    //}
    //var result = val.replace(/\[\<br \/\>\]/g, "");
    //result = result.replace(/\[\<p\>\]/g, "");
    //result = result.replace(/\[\<\/p\>\]/g, "");
    //result = result.replace(/\[&nbsp;\]/g, "");
    //return result;
    return val;
}
//替换"+"
function replacePlus(val) {
    var result = val.replace(/\+/g, "CodeReplacePlus");
    return result;
}


//知识修改，获取作者，上传时间
function knowledgeModifyGetAuthorCreateTime() {
    var author = $("#author").text();
    var createTime = $("#createTime").text();
    return author + "___" + createTime;
}