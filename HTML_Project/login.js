$(document).ready(function() {
    $("#loginBtn").click(function() {
        $("#loginPopup").css("display", "block");
    });

    $(".close-button").click(function() {
        $("#loginPopup").css("display", "none");
    });

    // 팝업 외부 클릭 시 닫기
    window.onclick = function(event) {
        if (event.target == document.getElementById("loginPopup")) {
            $("#loginPopup").css("display", "none");
        }
    }
});