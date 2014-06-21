$(function () {
    $(".M_newuser").click(function () {
        LoadUserVerifyRight();
        //$("#upperSearch").val(window.localStorage.newUserSearchKeyword);
        //$(".userInfo").remove();
        //$("#UserSearch").trigger("click");
    });
});
function LoadUserVerifyRight() {
    var temp = new R2.Business.UserVerify("", {});
    $("#lower .userInfo").die("click");
    $(".UVAlertWindow_left_green").die("click");
    $(".UVAlertWindow_right_green").die("click");
    $("#uv_submit").die("click");
    $("#uv_cancel").die("click");
    $(".UVAlertWindow_close").die("click");
    $(".uv_group").die("click");
    temp.createRightUpper();
    temp.createRightLower();
    temp.createMiddle();
    temp.boardEventRegister();
    temp.middleSwitch(); 
}

