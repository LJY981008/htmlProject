import { infoData, regist } from "/HTML_Project/javaScript/firebase.js";
import { madeCookie, cheakedCookie, removeCookie } from "/HTML_Project/javaScript/cookies.js";
import { initInfo, getUserId, getIsLogin } from "/comment.js";

const myInfo = cheakedCookie();


var myName = myInfo['name'];
var myID = myInfo['ID'];
var isLogin = (myName && myID) ? true : false;

if (isLogin) {
    $('#floatingUI').css("display", "none");
    $('#loginNameBox').css("display", "flex");
    $('#loginNameText').text(myName);
}


//로그인 회원가입 클릭이벤트에 엔터입력 추가
$("#loginID, #loginPW").keypress(function (event) {
    if (event.which === 13) {
        $("#login").click();
        return false;
    }
});

$('#registerId, #registerPassword, #registerPasswordConfirm, #regName').keypress(function (event) {
    if (event.which === 13) {
        $("#register").click();
        return false;
    }
});


/* 로그인 버튼 */
$("#login").click(async function () {
    const $loginIdInput = $("#loginID");
    const $loginPwInput = $("#loginPW");
    const $loginPopup = $("#loginPopup");

    const inputID = $loginIdInput.val();
    const inputPW = $loginPwInput.val();

    try {
        const querySnapshot = infoData;
        let loggedIn = false;

        querySnapshot.forEach((doc) => {
            const row = doc.data();
            const nickname = row['name'];
            const id = row['id'];
            const pw = row['pw'];
            console.log(nickname + id + pw);
            if (inputID === id) {
                if (inputPW === pw) {
                    // 로그인 성공 불러온 값 저장
                    myName = nickname;
                    myID = id;
                    isLogin = true;
                    alert(`어서오세요 ${myName}님`);

                    madeCookie(myID, myName);

                    // UI 변경
                    isLogin = true;
                    $loginPopup.hide();
                    $('#floatingUI').css("display", "none");
                    $('#loginNameBox').css("display", "flex");
                    $('#loginNameText').text(myName);
                    loggedIn = true;

                    getUserId(myID);
                    getIsLogin(isLogin);
                    initInfo();
                    return false; // 아이디와 비밀번호가 일치하면 종료료
                } else {
                    // 비밀번호 틀림
                    alert('비밀번호가 틀렸습니다.');
                    loggedIn = false;
                    return false; // 아이디가 맞으나 비밀번호가 틀리면 종료료
                }
            }
        });

        if (!loggedIn && querySnapshot.size > 0) { // 아이디를 찾지 못했고, 데이터가 있는 경우
            const foundId = querySnapshot.docs.some(doc => doc.data().id === inputID);
            if (!foundId) {
                alert('존재하지 않는 아이디입니다.');
            }
        } else if (querySnapshot.empty) {
            alert('등록된 사용자 정보가 없습니다.');
        }

        return loggedIn;

    } catch (error) {
        console.error("로그인 오류:", error);
        alert('로그인 처리 중 오류가 발생했습니다.');
        return false;
    }
});


$("#register").click(async function () {
    const regID = $('#registerId').val();
    const regPW = $('#registerPassword').val();
    const regPWCheck = $('#registerPasswordConfirm').val();
    const regName = $('#regName').val();
    const registerPopup = $('#registerPopup');
    let isIdTaken = false;
    let isNameTaken = false;

    if (!regID || /\s/.test(regID) || !regPW || !regName) { // 공백 체크
        alert('공백을 포함할 수 없습니다.');
        return false;
    }
    else if (regPW !== regPWCheck) { // 비밀번호와 비밀번호 확인란이 다를 때
        alert("비밀번호를 확인해주세요.");
        return false;
    } else {  // 입력 조건 충족
        try {
            const querySnapshot = infoData;

            querySnapshot.forEach((doc) => {
                const row = doc.data();
                if (row['id'] === regID) {
                    alert('아이디가 이미 존재합니다.');
                    isIdTaken = true;
                    return false; // 아이디가 이미 존재할 경우 종료
                }
                if (row['name'] === regName) {
                    alert('사용할 수 없는 이름입니다.');
                    isNameTaken = true;
                    return false; // 닉네임이 이미 존재할 경우 종료
                }
            });
            // 가입 조건 충족
            if (!isIdTaken && !isNameTaken) {
                regist(regID, regPW, regName);
                alert(`환영합니다. ${regName}님`);
                // 회원가입 후 자동로그인
                myID = regID;
                myName = regName;
                isLogin = true;
                madeCookie(myID, myName);
                registerPopup.hide();
                $('#floatingUI').hide();
                $('#loginNameBox').css("display", "flex");
                $('#loginNameText').text(myName);
            }

        } catch (error) {
            console.error("Firebase 회원가입 오류:", error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    }
});

/* 로그아웃 */
$('#logoutButton').click(function () {
    removeCookie();
    // 변수 초기화
    myID = '';
    myName = '';
    isLogin = false;

    // 로그인 창 다시 보여주기
    $('#floatingUI').css("display", "flex");

    // 로그인 상태 표시 숨기기
    $('#loginNameBox').css("display", "none");

    // 이름 텍스트 비우기
    $('#loginNameText').text('');
  });
