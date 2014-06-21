/*
*描述：上传知识
*create by nn 2013-10-14 15:32:13
*/
$(function () {
    new R2.Business.Classification();
    new R2.Business.Open();
    new R2.Business.Tag();
    new R2.Business.Ckeditor();
    AddCode();
});
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
    },

    //自定义函数
    createClassification: function () {
        for (var i = 0; i < myData.length; i++) {
            $("#Left_Classification_Select").append("<div class='title title" + i + "'>" + myData[i].value + "</>");
        }
        $(".title").click(function () {
            $("#Left_Classification_Select_Leaf").val("");
            $("#TreeNodeId").val("");
            $(this).addClass("titleClick").siblings().removeClass("titleClick");//有问题siblings()
            $("#Left_Classification_SelectTree").remove();//移除前面的东西
            var index = $(".title").index($(this));//有问题index()函数
            $("#Left_Classification_Select_Leaf").after("<div id='Left_Classification_SelectTree'></div>");//after() 函数在所有匹配的元素之后插入 HTML 内容。 before() 函数在所有匹配的元素之前插入 HTML 内容。
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

    CLASS_NAME: "R2.Business.Classification" //有问题这句话是干吗的？？？？？？
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
        if(cbdata == "true"){
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
var OpenList;
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
        $("#Left_Open_Text").empty();
        var result = $("#OpenList").text();
        var list = eval("(" + result + ")");
        OpenList = [];
        for (var i = 1; i < list.length; i++) {
            if (list[i].Title!="超级管理员") {
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
        //选择不可见分组
        $(".group").click(function () {
            var index = $(".group").index($(this));
            selectSingle(index);
        });
    },

    CLASS_NAME: "R2.Business.Open"
});
//点击全选的操作
function selectAll() {
    var flag = isAllSelect();
    if (flag) {
        $(".Select").removeClass("Select_Icon");
        $("#Left_Open_Text").empty();
    } else {
        $(".Select").addClass("Select_Icon");
        $("#Left_Open_Text").empty();
        $("#Left_Open_Text").append(OpenList[0].Title);
    }
}
//点击其他数据的操作
var text;

function selectSingle(index) {
    //点击某个选项，如果当前状态为选中，将该选项的色块去掉
    if ($(".Select").eq(index).hasClass("Select_Icon")) {    //检查是否有这个属性
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
//全部选中时，点击某个选项，改变文本框的内容
function allSelectTextChange(index) {
    var text = OpenList[1].Title;
    for (var i = 2; i < OpenList.length; i++) {
        text += "；" + OpenList[i].Title;
    }
    $("#Left_Open_Text").html(text);
    selectOrUnselect(index + 1);
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
//判断是否全部选中
function isAllSelect() {
    var flag = true;
    for (var i = 0; i < $(".Select").length; i++) {
        if (!$(".Select").eq(i).hasClass("Select_Icon")) {
            flag = false;
        }
    }
    return flag;
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
            $(".tagError").remove();
            $("#Left_Tag_Input").click(function () {
                $(".Tag_Error").remove();
            });
            var tag = $("#Left_Tag_Input").val();
            var flag = tagIsExist(tag);
            if (!flag) {
                $(".Tag_Error").remove();
                var count = $(".tag").length; //lenght指的是什么啊
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
        var Leftwidth = $("#Head_nav").width();
        $("#Right").css("left", Leftwidth - 40);
        ckd = CKEDITOR.replace('editor01', {
            toolbar: 'Basic'
        });
    },
    preview: function () {
        $("#preview").click(function () {
            var classification = $("#Left_Classification_Select_Leaf").val();
            var details = getCkeditorValueToPreview(ckd.getData());
            var title = $("#Left_Tilte_Input").val();
            var visible = $("#Left_Open_Text").html();
            if (visible == "") {
                visible = "全部";
            } else {
                visible = "超级管理员；" + visible;
            }
            var tag = previewTag();
            var user = getCookie("userinf").split("#")[2];
            //知识预览Class  传七个值，文章标题、作者、上传时间、分类、可见分组、标签、文章内容
            var Preview = new R2.Business.PreView(title, user,"尚未上传",classification, visible, tag, details);
            SyntaxHighlighter.highlight();
        });

    },
    upload: function () {
        $("#upload").click(function () {
            $(".Upload_Error").hide();
            var open = $("#Left_Open_Text").html();
            var OpenTitleList = open.split("；");
            var openId = "";
            for (var i = 0; i < AllOpenList.length;i++){
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
                $.post(baseUrl + "Ariticle/AddAriticle", { "title": title, "userId": userId, "visibility": openId, "tag": tag, "content": escape(content), "treeNodeParentId": treeNodeId }, function (cbdata) {
                    if (cbdata == "success") {
                        var alert = new R2.Business.AlertWindow("上传成功，等待管理员审核！",{
                            LoadUrl: "Ariticle/UploadAriticle",
                        })
                    }
                });
            }
        });
        $("#Left_Tilte_Input").click(function () {
            $(".uploadError").remove();
            $(".Upload_Error").hide();
        });
        $("#Left_Classification_Select").click(function () {
            $(".uploadError").remove();
            $(".Upload_Error").hide();
        });
        $("#Left_Tag_Input").click(function () {
            $(".uploadError").remove();
            $(".Upload_Error").hide();
        });
    },
    CLASS_NAME: "R2.Business.Ckeditor"
});
