(function () {
    //Section 1 : 按下自定义按钮时执行的代码
    var a = {
        exec: function (editor) {
            show();
        }
    },
    b = 'addpic';
    CKEDITOR.plugins.add(b, {
        init: function (editor) {
            editor.addCommand(b, a);
            editor.ui.addButton('addpic', {
                label: '添加图片',
                icon: this.path + 'addpic.JPG',
                command: b
            });
        }
    });
})();

function show() {
    var str = "<div class='upCover'>" +
                    "<div class='uploadDiv'>" +
                        '<div id="uploadDivClose">×</div>' +
                        '<form  id="fileForm" runat="server" method="post" enctype="multipart/form-data" action="?">' +
                           '<input id="fileInput" type="file" name="fileName"/>' +
                           //'<input id="fileBtn" type="button" value="提交"/>' +
                           '<input type="submit" id="test" value="提交">' +
                           '<div id="output1" style="display:none;">' +
                       '</form>' +
                    "</div>" +
                "</div>";
    $("body").append(str);
}
    

$(function () {
    $("#uploadDivClose").live("click", function () {
        $(".upCover").remove();
    });
});








//var str = "<div class='upCover'>" +
//                 "<div class='uploadDiv'>" +
//                '<form id="myForm" mothod="post">' +
//                    '名称：<input type="text" name="name" /><br />' +
//                    '地址：<input type="text" name="address" /><br />' +
//                    '自我介绍：<textarea name="comment"></textarea><br />' +
//                    '<input type="submit" id="test" value="提交" /><br />' +
//                    '<div id="output1" style="display:none ;"></div>' +
//                '</form>' +
//                '</div>' +
//                '</div>';


//    //var file = $("#fileInput").val();
//    //if (file == "") {
//    //    return;
//    //}
//    $("#myForm").attr("action", '/UpImg/UpImg2');
//    $("#fileForm").ajaxForm(function () {
//        alert("Success!!!");
//    });
//    //$("#fileForm").submit(function () {
//    //    $(this).ajaxSubmit(function () {
//    //        $("#output1").html("XXX").show();
//    //    });
//    //    return false;
//    //});



//    //$("#fileBtn").live("click", function () {
//    //    var file = $("#fileInput").val();
//    //    if (file == "") {
//    //        return;
//    //    }
//    //    $("#fileForm").attr("action",  '/UpImg/UpImg');
//    //    //$("#fileForm").submit();
//    //    //var s = ckd.getData();
//    //    //s += "<img src='' style='width:100px;height:100px;border:1px solid red;background-color:#ccc;'></img>";
//    //    $("#fileForm").ajaxForm(function () {
//    //        alert("Success!!!");
//    //    });
//    //});

//    //var options = {
//    //    target: '#output1',
//    //    beforeSubmit: before,
//    //    success: success,
//    //};

//    //$("#fileForm").live("click",ajaxForm(options));
//});

////function before() {
////    alert("提交前");
////}

////function success() {
////    alert("提交后");
////}