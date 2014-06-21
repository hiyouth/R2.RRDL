/*
描述：用于管理中心里的内容分类管理和内容分组管理功能
author： 张振强  2013年10月16日
*/
/*
    Modified ByZHAOs 2013年11月14日9:36:18
    增加目录树 删除功能
*/
$(function () {
    $(".M_type").click(function () {
        $("#Manage_right").empty();
        var ManageTree = new R2.Business.ManageTree();
    });
    $(".M_group").click(function () {
        $(".group_add").die("click");
        $(".group_dele").die("click");
        $(".group_rename").die("click");
        $("#Manage_right").empty();
        $.post(baseUrl + "UserGroupManage/GetUserGroups", {}, function (cbdata) {
            var list = eval("(" + cbdata + ")");
            window.UserGroupList = SimpleUserGroup(list);
            var ManageTree = new R2.Business.ManageKnowledge();
        });
    });
});

//后台获取的用户分组过滤掉游客，超级管理员
function SimpleUserGroup(list) {
    var result = [];
    for (var i = 0 ; i < list.length; i++) {
        if ((list[i].Title != "游客") && (list[i].Title != "超级管理员")) {
            result.push(list[i]);
        }
    }
    return result;
}

//内容分类管理
R2.Business.ManageTree = OpenLayers.Class({
    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function () {
        this.initRight();
        this.initMTree();
    },
    //搭建右侧功能区
    initRight: function () {
        var Right =
        '<div class="type_manage">' +
            '<div class="type_manage_title">请先选择需要管理的板块</div>' +
            '<div class="tree_manage">' +
                '<div class="tree_type">开发技术<div class="tree_type_hover_bg"></div></div>' +
                '<div class="tree_type">GIS业务<div class="tree_type_hover_bg"></div></div>' +
                '<div class="tree_type">常用服务<div class="tree_type_hover_bg"></div></div>' +
                '<div class="tree_type">精华文摘<div class="tree_type_hover_bg"></div></div>' +
                '<div class="tree_type">资源信息<div class="tree_type_hover_bg"></div></div>' +
            '</div>' +
            '<div class="type_manage_title type_manage_title2">在目录树上右键添加、修改、删除节点</div>' +
            '<div id="manage_type_tree"></div>' +
        '</div>';
        $("#Manage_right").html(Right);
        $(".type_manage_title2").hide();
    },
    //内容大分类点击事件：判断加载哪个目录树
    initMTree: function () {
        $(".tree_type").click(function () {
            $(this).addClass("tree_type_hover").siblings().removeClass("tree_type_hover");
            $(".tree_type_hover_bg").css("display", "none");
            $(this).children(".tree_type_hover_bg").css("display", "block");
            $(".type_manage_title2").show();
            $("#manage_type_tree").empty();
            var ClickNum = $(this).index();
            switch (ClickNum) {
                case 0: MTree("开发技术");
                    break;
                case 1: MTree("GIS业务");
                    break;
                case 2: MTree("常用服务");
                    break;
                case 3: MTree("精华文摘");
                    break;
                default: MTree("资源信息");
                    break;
            }
        });
    },
    CLASS_NAME: "R2.Business.ManageTree"
}); //内容分类管理目录树
function MTree(TreeName) {
    var layerTree = new Rrteam.Control.Rrtree({
        id: "Treelayer",
        parentDivId: "manage_type_tree",
        theme: "arrow",
        showRightClickMenu: true,
        showCheckBox: false,
        showNodeTypeImg: false,
        titleLenght: 20,
        requestUrl: baseUrl + "TreeView/GetTreeByRootIdForTreeManage?TreeName=" + escape(TreeName),
        requestOperateUrl: baseUrl + "TreeView/OperateTreeNode",
        showFirstChildrenNodes: true,
        model: "folder",
        imagesUrl: baseUrl + "Scripts/QuoteJsLib/images/",
        nodeOperaFailCallBack: nodeOperaFailResult
    });
}

function nodeOperaFailResult(data) {
    var a = new R2.Business.AlertWindow(data);
}












































































//从这里起是分组管理
R2.Business.ManageKnowledge = OpenLayers.Class({
    //-----------------Function-------------------//
    //关键函数，初始化对象时会调用
    initialize: function () {
        this.initRight();
        
        this.group_Click();
        this.initMGTree();
        this.AlertClose();
    },
    //搭建右侧功能区
    initRight: function () {
        var Right =
        '<div class="group_manage">' +
            '<div class="group_manage_title">请选择管理分组</div>' +
            '<div class="group_tree_manage select_group_manage">' +
                '<div class="group_add"></div>' +
            '</div>' +
            '<div class="group_manage_title group_manage_title2">请选择对应操作</div>' +
            '<div class="group_manage_content">' +
                '<div class="group_rename">重命名</div>' +
                '<div class="group_dele">删除分组</div>' +
            '</div>' +
        '</div>';
        $("#Manage_right").html(Right);
        $(".group_manage_title2, .group_manage_content").hide();
        //获得已有的内容分组，并插入div中
        var Group = "";
        for (var i = 0; i < window.UserGroupList.length; i++) {
            Group += '<div class="group_tree_type">' + window.UserGroupList[i].Title + '<div class="group_tree_type_hover_bg"></div></div><input type="hidden" value=' + window.UserGroupList[i].Id + ' class="id">';
        };
        $(".select_group_manage").append(Group);
    },
    //点击某一内容分组后，内容分类可选，点击内容分类后加载此分类的目录树
    initMGTree: function () {
        $(".select_group_manage .group_tree_type").click(function () {
            //判断内容分组是否选中，如果已经选中 那么取消选中，下方选中的内容分类和目录树也去掉
            if ($(this).hasClass("group_tree_type_hover")) {
                $(".group_tree_type").removeClass("group_tree_type_hover");
                $(".group_tree_type_hover_bg").css("display", "none");
                $(".group_manage_title2, .group_manage_content").hide();
            } else {
                $(this).addClass("group_tree_type_hover").siblings().removeClass("group_tree_type_hover");
                $(".group_tree_type_hover_bg").css("display", "none");
                $(this).children(".group_tree_type_hover_bg").css("display", "block");
                //点击某一内容分类，后面加上 新建 重命名 删除等按钮
                $(".group_manage_title2, .group_manage_content").show();
                window.userGroupId = $(".id").eq($(".select_group_manage .group_tree_type").index(this)).val();
            }
        });
    },
    //新建、重命名、删除分组 事件
    group_Click: function () {
        var that = this;
        var clickIndex = "";
        $(".group_add").live("click", function () {
            $(".group_tree_type").removeClass("group_tree_type_hover");
            $(".group_tree_type_hover_bg").css("display", "none");
            $(".group_manage_title2, .group_manage_content").hide();
            clickIndex = 0;
            that.Alertdiv(clickIndex);
        });
        $(".group_rename").live("click", function () {
            clickIndex = 1;
            that.Alertdiv(clickIndex);
        });
        $(".group_dele").live("click", function () {
            clickIndex = 2;
            that.Alertdiv(clickIndex);
        });
    },
    //板子
    Alertdiv: function (clickIndex) {
        var that = this;
        var temp_center = "";
        var nowName = $(".select_group_manage .group_tree_type_hover").text();
        if (clickIndex == 0) {
            temp_center = '<div>请输入新建小组的名称：<input type="text" class="Alert_newGroup"/></div></div><div class="Alert_warn">';
        } else if (clickIndex == 1) {
            temp_center = '<div>重命名 ' + nowName + ' 为：<input type="text" class="Alert_newGroup"/></div></div><div class="Alert_warn">';
        } else {
            temp_center = '删除后不可恢复，确定删除此小组吗？';
        }
        var alertDiv =
        '<div class="manage_Alert">' +
            '<div class="Alert_content">' +
                '<div class="Alert_center">' +
                    '<div class="Alert_center_cont">' + temp_center + '</div>' +
                    '<div class="Alert_btn">' +

                        '<div class="Alert_submit">确 定</div>' +
                    '</div>' +
                '</div>' +
                '<div class="Alert_close">×</div>' +
            '</div>' +
        '</div>';
        $("body").append(alertDiv);
        if (clickIndex == 0) {
            that.group_add();
        } else if (clickIndex == 1) {
            that.group_rename(nowName);
        } else {
            that.group_dele(nowName);
        }
        $(".manage_Alert").nextAll(".manage_Alert").remove();
        $(".Alert_newGroup").focus();
    },

    //判断字符长度
    getByteLen:function (val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            if (val[i].match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            } else {
                len += 1;
            }
        }
        return len;
    },
    //新建事件
    group_add: function () {
        var obj = this;
        $(".Alert_submit").click(function () {
            var value = $(".Alert_newGroup").val();
            var len=obj.getByteLen(value);    
            if (value == "") {
                $(".Alert_warn").text("请在输入框中输入新建小组的名称！");
            }
            else if (len > 10) {
                $(".Alert_warn").text("新建小组的名称不能大于10个字符！");
                return false;
            }
            else {
                for (var i = 0; i < window.UserGroupList.length; i++) {
                    if (value == window.UserGroupList[i].Title) {
                        $(".Alert_warn").text("内容小组已存在，请更换名称！");
                        return false;
                    }
                }
                $.post(baseUrl + "UserGroupManage/Add", { "title": value }, function (cbdata) {
                    var data = eval("(" + cbdata + ")");
                    var Group = "";
                    Group += '<div class="group_tree_type">' + data.Title + '</div><input type="hidden" value=' + data.Id + ' class="id">';
                    $(".select_group_manage").append(Group);
                    window.UserGroupList.push(data);
                    $(".select_group_manage .group_tree_type").unbind("click");
                    $(".select_group_manage .group_tree_type").click(function () {
                        //判断内容分组是否选中，如果已经选中 那么取消选中，下方选中的内容分类和目录树也去掉
                        if ($(this).hasClass("group_tree_type_hover")) {
                            $(".group_tree_type").removeClass("group_tree_type_hover");
                            $(".group_manage_title2, .group_manage_content").hide();
                        } else {
                            $(this).addClass("group_tree_type_hover").siblings().removeClass("group_tree_type_hover");
                            //点击某一内容分类，后面加上 新建 重命名 删除等按钮
                            $(".group_manage_title2, .group_manage_content").show();
                            window.userGroupId = $(".id").eq($(".select_group_manage .group_tree_type").index(this)).val();
                        }
                    });
                });
                $(".manage_Alert").remove();
            }
        });
    },
    //重命名事件
    group_rename: function (nowName) {
        var obj = this;
        
        $(".Alert_submit").click(function () {
            var value = $(".Alert_newGroup").val();
            var len = obj.getByteLen(value);
            if (value == "") {
                $(".Alert_warn").text("请在输入框中输入小组的新名称！");
            }
            else if (len > 10) {
                $(".Alert_warn").text("新建小组的名称不能大于10个字符！");
                return false;
            }
            else {
                for (var i = 0; i < UserGroupList.length; i++) {
                    if (value == UserGroupList[i].Title) {
                        $(".Alert_warn").text("内容小组已存在，请更换名称！");
                        return false;
                    }
                }
                $.post(baseUrl + "UserGroupManage/Rename", { "id": window.userGroupId, "name": value }, function (cbdata) {
                    $(".manage_Alert").remove();
                    $(".M_group").trigger("click");
                });
            }
        });
    },

    //删除事件
    group_dele: function (nowName) {
        $(".Alert_submit").click(function () {
            //var nowCount = "";
            //for (var i = 0; i < window.group.length; i++) {
            //    if (nowName == window.group[i].value) {
            //        nowCount = i;
            //    }
            //}
            //$(".select_group_manage .group_tree_type_hover").remove();
            $.post(baseUrl + "UserGroupManage/UserGroupIsEmpty", { "userGroupId": window.userGroupId }, function (cbdata) {
                switch(cbdata){
                    case "true":
                        $.post(baseUrl + "UserGroupManage/Delete", { "userGroupId": window.userGroupId }, function () {
                            $(".M_group").trigger("click");
                        });
                        break;
                    case "false":
                        var alet = new R2.Business.AlertWindow("分组中有用户，不能删除！");
                        break;
                }
            });
            $(".manage_Alert").remove();
        });
    },
    //弹出框关闭事件
    AlertClose: function () {
        $(".Alert_close").live("click", function () {
            $(".manage_Alert").remove();
        });
    },
    CLASS_NAME: "R2.Business.ManageKnowledge"
}); //内容分组管理目录树
function MGTree(TreeName) {
    var layerTree = new Rrteam.Control.Rrtree({
        id: "Treelayer",
        parentDivId: "manage_type_tree",
        theme: "arrow",
        showRightClickMenu: true,
        showCheckBox: true,
        showNodeTypeImg: true,
        titleLenght: 20,
        requestUrl: baseUrl + "TreeView/GetTreeByRootId?TreeName=" + escape(TreeName),
        showFirstChildrenNodes: true,
        model: "view",
        imagesUrl: baseUrl + "Scripts/QuoteJsLib/images/",
        nodeClickCallBack: nodeClick,                    //回调函数
        checkBoxClickCallBack: checkBoxClick
    });
}
function nodeClick(data) {
    data;
}
function checkBoxClick(type, data) {
    type;
    data;
}