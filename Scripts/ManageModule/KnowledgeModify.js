/*
*描述：知识修改
*create by nn 2013-10-14 15:32:13
*/

$(function () {
    ManageInit();
    new R2.Business.Classification();
    new R2.Business.Open();
    new R2.Business.Tag();
    new R2.Business.Ckeditor();
    KnowledgeModifyInit();
    AddCode();
});
function ManageInit() {
    $("#Head_nav").remove();
    $("#user_name").nextAll().remove();
    // $("#user_name").after("<div class='user_line'></div><div id='user_manage'>管理中心</div><div class='user_line'></div><div id='user_center'>个人中心</div><div class='user_line'></div><div class='ariticleRankList'>知识排行榜</div><div class='user_line'></div><div class='back_index'>返回首页</div><div id='user_exit'>退出</div>");
    $("#user_name").after("<div class='user_line'></div><div id='user_manage'>管理中心</div><div class='user_line'></div><div id='user_center'>个人中心</div><div class='user_line'></div><div class='back_index'>返回首页</div><div id='user_exit'>退出</div>");
    $("#Head_search").remove();
    $(".back_index").click(function () {
        //window.location.href = baseUrl + "Home/index";
        ManageKnowledgeLeaveAlert("Home/index");
    });
    $(".navigation").click(function () {
        ManageKnowledgeLeaveAlert("ManageModule/Manage");
        //history.go(-1);
    });
}
/**
*Class: R2.Business.Classification
*分类对象类
*/
R2.Business.Classification = OpenLayers.Class({
    //-----------------Property-------------------//

    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function (value, option) {
        this.createClassification();
        this.init();
    },

    //自定义函数
    createClassification: function () {
        for (var i = 0; i < myData.length; i++) {
            $("#Left_Classification_Select").append("<div class='title title" + i + "'>" + myData[i].value + "</>");
        }
        $(".title").click(function () {
            $("#Left_Classification_Select_Leaf").val("");
            $("#TreeNodeId").val("");
            $(this).addClass("titleClick").siblings().removeClass("titleClick");
            $("#Left_Classification_SelectTree").remove();
            var index = $(".title").index($(this));
            $("#Left_Classification_Select_Leaf").after("<div id='Left_Classification_SelectTree'></div>");
            switch (index) {
                case 0: selectTree("开发技术");
                    break;
                case 1: selectTree("GIS业务");
                    break;
                case 2: selectTree("常用服务");
                    break;
                case 3: selectTree("精华文摘");
                    break;
                default: selectTree("资源信息");
                    break;
            }
        });
    },

    init:function (){
        var result = $("#TreePath").text();
        var list = result.split("TreePathSplit");
        var treepath = "";
        for(var i = 0 ; i < list.length-2;i++){
            treepath = treepath + list[i] + ">";
        }
        treepath = treepath.substring(0, treepath.length - 1);
        switch (list[0]) {
            case "开发技术": $(".title").eq(0).trigger("click");
                break;
            case "GIS业务": $(".title").eq(1).trigger("click");
                break;
            case "常用服务": $(".title").eq(2).trigger("click");
                break;
            case "精华文摘": $(".title").eq(3).trigger("click");
                break;
            default: $(".title").eq(4).trigger("click");
                break;
        }
        $("#Left_Classification_Select_Leaf").val(treepath);
        var treeNodeId = $("#TreeId").text();
        $("#Left_Classification_Select_Leaf").after("<input type='hidden' value='" + treeNodeId + "' id='TreeNodeId'/>");
    },

    CLASS_NAME: "R2.Business.Classification"
});
function selectTree(treeName) {
    var layerTree = new Rrteam.Control.Rrtree({
        id: "Treelayer_Select",
        parentDivId: "Left_Classification_SelectTree",
        theme: "arrow",              //theme包含arrow[三角形]目前只有这个，line[+号]
        showRightClickMenu: false,   //是否右键菜单
        showCheckBox: false,            //是否显示checkbox
        showNodeTypeImg: false,    //是否显示图片（节点类型图片）
        titleLenght: 20,     //显示的标题文字长度,当长度大于这个值时，用...代替
        requestUrl: baseUrl + "TreeView/GetTreeByRootIdForUploadKnowledge?treeName=" + escape(treeName),         //后台地址
        //        xmlUrl: baseUrl + url,            //xml地址
        showFirstChildrenNodes: true,               //开始就展开一级子节点
        model: "folder",
        imagesUrl: baseUrl + "Scripts/QuoteJsLib/images/",
        nodeClickCallBack: nodeClickSelect,               //节点回调
        checkBoxClickCallBack: checkBoxClickSelect
    });
}
function nodeClickSelect(data) {
    $("#TreeNodeId").remove();
    var Id = data.nodeId;
    $.post(baseUrl + "TreeView/isAdd", { "treeNode": Id }, function (cbdata) {
        if (cbdata == "true") {
            $.post(baseUrl + "TreeView/getTreePath", { "treeNode": Id }, function (cbdata) {
                var result = cbdata.split("TreeSplit");
                var path = "";
                for (var i = 0 ; i < result.length - 1; i++) {
                    path = path + result[i] + ">";
                }
                path = path.substring(0, path.length - 1);
                $("#Left_Classification_Select_Leaf").val(path);
                $("#Left_Classification_Select_Leaf").after("<input type='hidden' value='" + Id + "' id='TreeNodeId'/>");
            });
        }
    });
}
function checkBoxClickSelect() {
}
/**
*Class: R2.Business.Open
*可见对象类
*/
var AllOpenList;
R2.Business.Open = OpenLayers.Class({
    //-----------------Property-------------------//

    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function (value, option) {
        this.createOpen();
    },

    //自定义函数
    createOpen: function () {
        var result = $("#visibilityList").text();
        if (result != "all") {
            var visibilityList = eval("(" + result + ")");
            $("#Left_Open_Text").empty();
            var result = $("#OpenList").text();
            var list = eval("(" + result + ")");
            OpenList = [];
            for (var i = 1; i < list.length; i++) {
                if (list[i].Title != "超级管理员") {
                    OpenList.push(list[i]);
                }
            }
            AllOpenList = list;
            var num = OpenList.length;
            var linelength = getSeparatedLine(num);
            //加载不可见选项
            if ($(".group").length == 0) {
                for (var i = 0; i < num; i++) {
                    var index = parseInt(Math.random() * 6);
                    var color = getColor(index);
                    $("#Left_Open_Select").append("<div class='group' style='background-color:" + color + "'>" + OpenList[i].Title + "<div class='Select'></div></div>");
                }
                $("#Left_Open_Select").css("height", linelength + "px");
            }
            //初始化默认分组
            for (var i = 0 ; i < OpenList.length; i++) {
                for (var j = 0; j < visibilityList.length; j++) {
                    if (OpenList[i].Id == visibilityList[j].UserGroupId) {
                        $(".Select").eq(i).addClass("Select_Icon");
                        $(".group").eq(i).addClass("addColor");
                        var length = $("#Left_Open_Text").html().length;
                        if (length == 0) {
                            $("#Left_Open_Text").append(OpenList[i].Title);
                        } else {
                            $("#Left_Open_Text").append("；" + OpenList[i].Title);
                        }
                    }
                }
            }
        } else {
            $("#Left_Open_Text").empty();
            var result = $("#OpenList").text();
            var list = eval("(" + result + ")");
            OpenList = [];
            for (var i = 1; i < list.length; i++) {
                if (list[i].Title != "超级管理员") {
                    OpenList.push(list[i]);
                }
            }
            AllOpenList = list;
            var num = OpenList.length;
            var linelength = getSeparatedLine(num);
            //加载不可见选项
            if ($(".group").length == 0) {
                for (var i = 0; i < num; i++) {
                    var index = parseInt(Math.random() * 6);
                    var color = getColor(index);
                    $("#Left_Open_Select").append("<div class='group' style='background-color:" + color + "'>" + OpenList[i].Title + "<div class='Select'></div></div>");
                }
                $("#Left_Open_Select").css("height", linelength + "px");
            }
        }
        
        //选择不可见分组
        $(".group").click(function () {
            var index = $(".group").index($(this));
            selectSingle(index);
        });
    },

    CLASS_NAME: "R2.Business.Open"
});
//点击其他数据的操作
var text;
function selectSingle(index) {
    //点击某个选项，如果当前状态为选中，将该选项的色块去掉
    if ($(".Select").eq(index).hasClass("Select_Icon")) {
        $(".Select").eq(index).removeClass("Select_Icon");
        selectOrUnselect(index);
    } else {
        //如果当前状态为没有选中，给该选项加上色块
        $(".Select").eq(index).addClass("Select_Icon");
        $(".group").eq(index).addClass("addColor");
        var length = $("#Left_Open_Text").html().length;
        if (length == 0) {
            $("#Left_Open_Text").append(OpenList[index].Title);
        } else {
            $("#Left_Open_Text").append("；" + OpenList[index].Title);
        }
    }
}
//选中或不选中文本框内容的变化
function selectOrUnselect(index) {
    text = $("#Left_Open_Text").html();
    var position = text.indexOf(OpenList[index].Title);
    var length = OpenList[index].Title.length;
    if (position == 0) {
        var start = position + length + 1;
        text = text.substring(start, text.length);
        $("#Left_Open_Text").html(text);
    } else {
        var start = position - 1;
        var end = position + length;
        var textbefore = text.substring(0, start);
        var textafter = text.substring(end, text.length);
        text = textbefore + textafter;
        $("#Left_Open_Text").html(text);
    }
}
//计算分隔线的长度
function getSeparatedLine(num) {
    var row;
    if (num % 3 == 0) {
        row = num / 3;
    } else {
        row = parseInt(num / 3) + 1;
    }
    return row * 40 - 15;
}

//选中的标签下标
var selectTagIndex;
//当前点击的tag是第几个
var TagNum = 0;
//记录已经添加过的tag
var tagArray = [];
//标签类
/**
*Class: R2.Business.Tag
*标签对象类
*/
R2.Business.Tag = OpenLayers.Class({
    //-----------------Property-------------------//

    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function (value, option) {
        this.createTag();
        this.deleteTag();
    },

    //自定义函数
    createTag: function () {
        $("#Tag_Add").click(function () {
            $("#Left_Tag_Input").click(function () {
                $(".Tag_Error").remove();
            });
            var tag = $("#Left_Tag_Input").val();
            var flag = tagIsExist(tag);
            if (!flag) {
                $(".Tag_Error").remove();
                var count = $(".tag").length;
                var length = $(".Tag_Error").length;
                if (length == 0) {
                    if (tag != "" && count < 6) {
                        var index = parseInt(Math.random() * 6);
                        var color = getColor(index);
                        var len = getByteLen(tag);
                        if (len <= 16) {
                            var div = "<div class='tag' style='background-color:" + color + "'>" + tag + "</div>";
                            TagNum++;
                            $("#Left_Tag_Show").append(div);
                            $(".tag").show();
                            tagArray.push(tag);
                            $("#Left_Tag_Input").val("");
                        } else {
                            var error = "<font class = 'Tag_Error'>标签长度不能大于16个字节</font>";
                            $("#Left_Tag_Input").after(error);
                        }
                    } else {
                        if (tag == "") {
                            var error = "<font class = 'Tag_Error'>标签不能为空</font>";
                            $("#Left_Tag_Input").after(error);
                        } else {
                            var error = "<font class = 'Tag_Error'>标签不能超过6个</font>";
                            $("#Left_Tag_Input").after(error);
                        }
                    }
                }
            } else {
                var length = $(".Tag_Error").length;
                if (length == 0) {
                    var error = "<font class = 'Tag_Error'>不能重复添加标签</font>";
                    $("#Left_Tag_Input").after(error);
                }
            }
        });
    },
    deleteTag: function () {
        $(".tag").live("mouseover", function () {
            selectTagIndex = $(".tag").index($(this));
            var close = "<div class='Tag_Close'>X</div>";
            if ($(".Tag_Close").length == 0) {
                $(this).append(close);
            }
        });
        $(".tag").live("mouseleave ", function () {
            var index = $(".tag").index($(this));
            $(".Tag_Close").remove();
        });
        $(".Tag_Close").live("mouseover", function () {
            $(".Tag_Close").css("color", "#8AB5B9");
            $(".Tag_Close").attr("title", "删除标签");
        });
        $(".Tag_Close").live("mouseout", function () {
            $(".Tag_Close").css("color", "#675959");
        });
        $(".Tag_Close").live("click", function () {
            TagNum--;
            $(".tag").eq(selectTagIndex).remove();
            $(".Tag_Error").remove();
            tagArray.splice(selectTagIndex, 1);
        });
    },

    CLASS_NAME: "R2.Business.Tag"
});
//判断字符串占几个字节
function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) != null) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}
//判断当前添加的标签是否以及存在
function tagIsExist(tag) {
    var flag = false;
    for (var i = 0; i < tagArray.length; i++) {
        if (tag == tagArray[i]) {
            flag = true;
        }
    }
    return flag;
}
//预览tag
function previewTag() {
    var l = $(".tag").length;
    var text = "";
    if (l > 0) {
        text += $(".tag").eq(0).html();
        for (var i = 1; i < l; i++) {
            text += "," + $(".tag").eq(i).html();
        }
    }
    return text;
}
//获取随机背景色
function getColor(index) {
    var color;
    switch (index) {
        case 0: color = "#F2D6D6";
            break;
        case 1: color = "#E3E5F9";
            break;
        case 2: color = "#D6E7F0";
            break;
        case 3: color = "#E9ECDB";
            break;
        case 4: color = "#83D6E0";
            break;
        default: color = "#E3A7A7";
            break;
    }
    return color;
}
/**
*Class: R2.Business.Ckeditor
*上传内容对象类
*/
var ckd;

//function getCkeditorValue() {
//    var value = "";
//    var details = ckd.getData();
//    var array = details.split("#代码开始#");
//    for (var i = 0 ; i < array.length; i++) {
//        if (array[i].indexOf("#代码结束#") == -1) {
//            value = value + array[i];
//        } else {
//            var array2 = array[i].split("#代码结束#");
//            if (array2[1] == "") {
//                value = value + CodeContentSP;
//            } else {
//                value = value + CodeContentSP + array2[1];
//            }
//        }
//    }
//    return value;
//}


R2.Business.Ckeditor = OpenLayers.Class({
    //-----------------Property-------------------//

    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function (value, option) {
        this.createCkeditor();
        this.preview();
        this.upload();
    },
    //自定义函数
    createCkeditor: function () {
        ckd = CKEDITOR.replace('editor01', {
            toolbar: 'Basic'
        });
    },
    preview: function () {
        $("#preview").click(function () {
            var details = getCkeditorValueToPreview(ckd.getData());
            var title = $("#Left_Tilte_Input").val();
            $("#ckeditorPreview_Title").html("标题：" + title);
            var visible = $("#Left_Open_Text").html();
            var tag = previewTag();
            if (visible == "") {
                visible = "全部";
            } else {
                visible = "超级管理员，"+visible;
            }
            var leaf = $("#Left_Classification_Select_Leaf").val();
            var inf = knowledgeModifyGetAuthorCreateTime();
            var author = inf.split("___")[0];
            var createTime = inf.split("___")[1];
            var Preview = new R2.Business.PreView(title, author, createTime, leaf, visible, tag, details);
            SyntaxHighlighter.highlight();
        });
    }, 
    upload: function () {
        $("#update").click(function () {
            $(".Upload_Error").hide();
            var ariticleId = $("#ariticleId").val();
            var open = $("#Left_Open_Text").html();
            var OpenTitleList = open.split("；");
            var openId = "";
            for (var i = 0; i < AllOpenList.length; i++) {
                for (var j = 0 ; j < OpenTitleList.length; j++) {
                    if (OpenTitleList[j] == AllOpenList[i].Title) {
                        openId = openId + AllOpenList[i].Id + "；";
                    }
                }
            }
            var user = getCookie("userinf");
            var userId = user.split("#")[0];
            var title = $("#Left_Tilte_Input").val();
            var classification = $("#Left_Classification_Select_Leaf").val();
            var tag = $("#Left_Tag_Show").html();
            var tilen = $(".titleError").length;
            var clen = $(".classificationError").length;
            var talen = $(".tagError").length;
            var content = ckd.getData();
            content = replacePlus(content);
            var colen = $(".contentError").length;
            var treeNodeId = $("#TreeNodeId").val();
            var treeNode = $("#TreeNodeId").val();
            var trlen = $(".treeError").length;
            if (treeNode == "" && trlen == 0) {
                $("#Left_Tilte_Input").after("<span class='uploadError treeError'>分类不能为空&nbsp;&nbsp;&nbsp;</span>");
            }
            if (title == "" && tilen == 0) {
                $("#Left_Tilte_Input").after("<span class='uploadError titleError'>标题不能为空&nbsp;&nbsp;&nbsp;</span>");
            }
            if (classification == "" && clen == 0) {
                $("#Left_Classification_Select_Leaf").after("<span class='uploadError classificationError'>分类不能为空&nbsp;&nbsp;&nbsp;</span>");
            }
            if (tag == "" && talen == 0) {
                $("#Tag_Add").after("<span class='uploadError tagError' style = ' float:right; margin-top:-40px;'>标签不能为空&nbsp;&nbsp;&nbsp;</span>");
            }
            if (content == "" && colen == 0) {
                $(".Upload_Error").show();
            }
            if (title != "" && classification != "" && tag != "" && content != "") {
                var tag = previewTag();
                $.post(baseUrl + "ManageModule/KnowledgeModify", { "title": title, "userId": userId, "invisibility": openId, "tag": tag, "content": escape(content), "ariticleId": ariticleId, "treeNodeParentId": treeNodeId }, function (cbdata) {
                    if (cbdata == "success") {
                        var alert = new R2.Business.AlertWindow("修改成功！", {
                            LoadUrl: "ManageModule/Manage",
                        }); 
                    }
                });
            }
        });
        $("#Left_Tilte_Input").click(function () {
            $(".uploadError").remove();
        });
        $("#Left_Classification_Select").click(function () {
            $(".uploadError").remove();
        });
        $("#Left_Tag_Input").click(function () {
            $(".uploadError").remove();
        });
    },
    CLASS_NAME: "R2.Business.Ckeditor"
});
var num;
function KnowledgeModifyInit() {
    var result = $("#Ariticle").text();
    var ariticle = eval("(" + result + ")");
    ckd.setData(ariticle.UGC);
    $("#Left_Tilte_Input").val(ariticle.Title);
    $("#ariticleId").val(ariticle.Id);
    for (var i = 0 ; i < ariticle.Tags.length; i++) {
        var index = parseInt(Math.random() * 6);
        var color = getColor(index);
        var div = "<div class='tag' style='background-color:" + color + "'>" + ariticle.Tags[i] + "</div>";
        TagNum++;
        $("#Left_Tag_Show").append(div);
        $(".tag").show();
        tagArray.push(ariticle.Tags[i]);
        $("#Left_Tag_Input").val("");
    }
}
