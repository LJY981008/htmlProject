// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  doc,
  deleteDoc,
  startAt,
  limit,
  getCountFromServer,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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


export const infoData = await getDocs(collection(db, "info"));;
export const commentsData = await getDocs(collection(db, "comments"));

// 유저정보 호출출
export async function getInfoData() {
  infoData = await getDocs(collection(db, "info"));
  return infoData;
}
// 회원가입
export async function regist(id, pw, name) {
    const newUser = {
        'id': id,
        'pw': pw,
        'name': name
    };
    const addedDocRef = await addDoc(collection(db, "info"), newUser);
}
// 댓글 저장
export async function commentSaveToDB (id, name, text, ymd, today) {
  const newComment = {
    'id': id,
    'name': name,
    'comment': text,
    'date': ymd,
    'dateObj': today 
  };
  await addDoc(collection(db, "comments"), newComment);
}
// 댓글 총 갯수 반환
export async function getCommentDocNum() {
      const colRef = collection(getFirestore(), "comments");
      const a = await getCountFromServer(colRef)
      return a.data().count;
}
// 댓글 전체 반환
export async function getAllCommentDocs() {
  const q = query(collection(db, "comments"), orderBy("dateObj", "desc"));
  return await getDocs(q);
}
// 댓글 Doc Index 값에 따라 반환
export async function getCommentDocs(pageIndex, commentCursors) {
  const commentsRef = collection(db, "comments");
  const baseQuery = query(commentsRef, orderBy("dateObj", "desc"));

  let q;

  if (pageIndex === 0) {
    q = query(baseQuery, limit(5));
  } else {
    const startDoc = commentCursors[pageIndex];
    if (!startDoc) {
      console.warn("없는 페이지입니다.");
      return null;
    }
    q = query(baseQuery, startAt(startDoc), limit(5));
  }

  return await getDocs(q);
} 
// 특정 댓글 삭제
export async function deleteComment(commentId) {
  await deleteDoc(doc(db, "comments", commentId));
}

