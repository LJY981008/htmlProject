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
  apiKey: "AIzaSyCZmltuIqRXs2LWyGXKuaYHsFBkoCb4pjQ",
  authDomain: "sparta-d3979.firebaseapp.com",
  projectId: "sparta-d3979",
  storageBucket: "sparta-d3979.firebasestorage.app",
  messagingSenderId: "337696474068",
  appId: "1:337696474068:web:44605bbd0732619596cc41",
  measurementId: "G-PND6DC8KJR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const infoData = await getDocs(collection(db, "info"));
export const commentsData = await getDocs(collection(db, "comments"));

export async function regist(id, pw, name) {
    const newUser = {
        'id': id,
        'pw': pw,
        'name': name
    };
    const addedDocRef = await addDoc(collection(db, "info"), newUser);
}

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

