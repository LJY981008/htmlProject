// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDIYr5xaD01ndxx0anOhCgoKRHT6rAHWnc",
    authDomain: "weeklyme-4e92d.firebaseapp.com",
    projectId: "weeklyme-4e92d",
    storageBucket: "weeklyme-4e92d.firebasestorage.app",
    messagingSenderId: "499565676750",
    appId: "1:499565676750:web:60aa159f30a4917fe6689f",
    measurementId: "G-2D8RFG5CVT"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let isLogin = false;
var name = '';
var id = '';
var pattern = /\s/g;

/* 로그인 버튼 */
$("#login").click(async function () {
    let docs = await getDocs(collection(db, "info"));
    docs.forEach((doc) => {
        let row = doc.data();
        let nickname = row['name'];
        let id = row['id'];
        let pw = row['pw'];

        let inputID = $('#ID').val();
        let inputPW = $('#taPW').val();

        if (inputID == id) {
            if (inputPW == pw) {
                /* 로그인 성공 */
                this.name = nickname;
                this.id = id;
                this.isLogin = true;
                alert('어서오세요' + this.name + '님');
                /* ui변경 필요 */
                return true;
            }
            else {
                /* 비밀번호 틀림 */
                alert('비밀번호가 틀렸습니다.');
                return false;
            }
        }
    });
})

/* 가입 버튼  */
$("#register").click(async function () {
    console.log("회원가입 버튼 클릭됨");
    let regID = $('#regID').val();
    let regPW = $('#regPW').val();
    let regPWCheck = $('#regPWC').val();
    let regName = $('#regName').val();
    let flag = false;

    console.log("입력값:", regID, regPW, regPWCheck, regName);

    if (regPW != regPWCheck) {
        alert("비밀번호를 확인해주세요.");
        return false;
    }
    else if (!regID || pattern.test(regID)) { // 수정된 부분
        alert('아이디에 공백을 포함할 수 없습니다.');
        return false;
    }
    else {
        let docs = await getDocs(collection(db, "info"));
        docs.forEach((doc) => {
            let row = doc.data();
            let id = row['id'];
            if (id == regID) {
                alert('아이디가 이미 존재합니다.');
                flag = true;
                return false;
            }
            if (regName == row['name']) {
                alert('사용할 수 없는 이름입니다.');
                flag = true;
                return false;
            }
        });

        console.log("중복 검사 후 flag:", flag);

        if (!flag) {
            let doc = {
                'id': regID,
                'pw': regPW,
                'name': regName
            };
            try {
                const addedDocRef = await addDoc(collection(db, "info"), doc);
                console.log("회원가입 성공, 문서 ID:", addedDocRef.id);
                alert('환영합니다. ' + regName + '님');
                // 필요하다면 로그인 상태 업데이트
            } catch (error) {
                console.error("Firebase 회원가입 오류:", error);
                alert('회원가입 중 오류가 발생했습니다.');
            }
        }
    }
});

/* 댓글 작성 */
$('#postingComment').click(async function () {
    if (!isLogin) {
        /* 비로그인 상태일 때 */
        alert('로그인을 하고 시도해주세요.');
        return false;
    }
    let comment = $('#comment').val();
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let ymd = year + '/' + month + '/' + date

    let doc = {
        'id': this.id,
        'name': this.name,
        'comment': comment,
        'date': ymd
    }
    await addDoc(collection(db, "comments"), doc);
    alert('작성이 완료되었습니다.');
    window.location.reload();
})

/* 댓글 갱신 */
let commentsDocs = await getDocs(collection(db, "comments"));
commentsDocs.forEach((doc) => {
    let row = doc.data();
    let name = row['name'];
    let date = row['date'];
    let comment = row['comment'];

    /* 댓글 html코드 */
    let text = ``;

    $('#commentArea').append(text);
})