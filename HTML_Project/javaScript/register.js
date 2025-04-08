$(document).ready(function() {
    // 로그인 팝업 관련
    $("#loginBtn").click(function() {
        $("#loginPopup").css("display", "block");
    });

    $("#closeLoginPopup").click(function() {
        $("#loginPopup").css("display", "none");
    });

    // 회원가입 팝업 관련
    $("#registerBtn").click(function() {
        $("#registerPopup").css("display", "block");
    });

    $("#closeRegisterPopup").click(function() {
        $("#registerPopup").css("display", "none");
    });

    // 팝업 외부 클릭 시 닫기 (로그인)
    window.onclick = function(event) {
        if (event.target == document.getElementById("loginPopup")) {
            $("#loginPopup").css("display", "none");
        }
        if (event.target == document.getElementById("registerPopup")) {
            $("#registerPopup").css("display", "none");
        }
    }
});