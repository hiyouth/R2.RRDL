$(document).ready(init);
function init(){
    $(".M_user").click(function () {
        $(".M_user").css("color", "#017586");
        var temp = new R2.Business.MemberManage("", {});
        temp.loadRightUpper();
        $('.member_board').die("click");
        $(".UMAlertWindow_right_green").die("click");
        $(".UMAlertWindow_left_green").die("click");
        $(".uvSele_Alert_close").die("click");        
        $("#uvSele_MemberAttrModify").die("click");
        $("#uvSele_MemberDrop").die("click");
        $("#uvSele_DropMemberYes").die("click");
        $("#uvSele_DropMemberCancel").die("click");
        $(".UMAlertWindow").remove();
        $(".AlertWindow").remove();
        temp.loadRightLower();
        temp.click_event_reg();        
    });  
}
