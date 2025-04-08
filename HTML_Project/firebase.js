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
        
        if(inputID == id){
            if(inputPW == pw){
                /* 로그인 성공 */
                isLogin = true;
                return true;
            }
            else{
                /* 비밀번호 틀림 */
                return false;
            }
        }
    });

    /* 아이디가 없음 */
    return false;

})

/* 가입 버튼  */
$("#register").click(async function () {
    let docs = await getDocs(collection(db, "info"));
    let regID = $('#regID').val();
    let regPW = $('#regPW').val();
    let regPWCheck = $('#regPWC').val();
    let regName = $('#regName').val();

    if(regPW != regPWCheck){
        /* 비밀번호 서로 다름 */
        alert("")
        return false;
    }
    if(!regID || !pattern.test(id)){
        /* 공백이 포함되어 있거나 빈값 입력력 */
        return false;
    }

    docs.forEach((doc) => {
        let row = doc.data();
        let id = row['id'];
        if(id == regID){
            /* id중복 */
            return false;
        }
        if(regName == row['name']){
            /* 닉네임 중복 */
            return false;
        }
    });


    let doc = {
        'id': regID,
        'pw': regPW,
        'name': regName
    };
    await addDoc(collection(db, "info"), doc);
})

/* 댓글 작성 */
$('postingComment').click(async function () {
    if(!isLogin){
        /* 비로그인 상태일 때 */
        return false;
    }
    let comment = $('#comment').val();
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let ymd = year + '/' + month + '/' + date

    let doc = {
        'id':this.id,
        'name':this.name,
        'comment':comment,
        'date': ymd
    }
    await addDoc(collection(db, "comments"), doc);
})

/* 댓글 갱신 */
let commentsDocs = await getDocs(collection(db, "comments"));
commentsDocs.forEach((doc)=>{
    let row = doc.data();
    let name = row['name'];
    let date = row['date'];
    let comment = row['comment'];

    /* 댓글 html코드 */
    let text = ``;

    $('#commentArea').append(text);
})
