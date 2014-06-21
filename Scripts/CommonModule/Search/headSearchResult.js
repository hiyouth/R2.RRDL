$(function () {
    searchAriticlesResult();
})


function searchAriticlesResult() {
    $("#HeadSearch_icon").live('click', function () {
        if ($("#HeadSearch").val() == "知识标题、知识标签、上传者昵称、上传者姓名" || $("#HeadSearch").val() == "" ) {            
            return false;
        }
        window.location.href = baseUrl + "Home/HeadSearchResult";
        localStorage.setItem("key", $("#HeadSearch").val());
    });
    $("#HeadSearch").keydown(function (event) {
        if (event.keyCode == 13) {
            if ($("#HeadSearch").val() == "知识标题、知识标签、上传者昵称、上传者姓名" || $("#HeadSearch").val() == "") {
                return false;
            }
            window.location.href = baseUrl + "Home/HeadSearchResult";
            localStorage.setItem("key", $("#HeadSearch").val());
           
        }
    });
}
