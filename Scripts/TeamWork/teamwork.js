
$(function () {
    gotoProject();
})
function gotoProject() {
    $(".item_info").click(function () {
        var index = $(".item_info").index($(this));
        switch (index) {
            case 15:
                //window.location.href = baseUrl + "TeamWork/jinan";
                ManageKnowledgeLeaveAlert("TeamWork/jinan")
                break;
            default: break;
        }
    })

    //返回显示团队作品
    $(".projReturn").click(function () {
        $("#projInfoContentDiv").hide();
        $(".About_item").show();
    })
}