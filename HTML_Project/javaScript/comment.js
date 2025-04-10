import { commentSaveToDB, getCommentDocs, deleteComment } from "./firebase.js";
import { createPageBtn, showPageBtn, preparePagination } from "./page.js";

let myID;
let myName;
let isLogin = false;

let commentCursors;

/* 댓글 작성 */
const commentBox = document.querySelector(".comment__box");
const commentInput = commentBox.querySelector("input");
const commentBtn = commentBox.querySelector("button");

const handleCommentClick = async () => {
    if (!isLogin) {
    alert('로그인을 하고 시도해주세요.');
    return false;
    }

    const input = commentInput.value;
    if (input == "") return;

    /* 댓글 firebase에 저장 */
    saveCommentToFirebase(myID, myName, input);

    commentInput.value = "";
};

commentBtn.addEventListener("click", handleCommentClick);



/* 댓글 firebase에 저장 */
export const saveCommentToFirebase = async (id, name, commentText) => {
    const today = new Date();
    const ymd = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
    
    try {
        // DB에 저장 완료 후, 리얼 타임으로 화면에 등록 
        commentSaveToDB(id, name, commentText, ymd, today);
        realtimeUpdateComment(ymd, commentText);
        createPageBtn();
        initInfo();
    } catch (error) {
        console.error("Firebase 댓글 저장 오류:", error);
        alert('댓글 저장 중 오류가 발생했습니다.');
    }
};

/* 새로고침하지 않고 화면에 리얼타임으로 댓글 업데이트 */
const realtimeUpdateComment = (name, ymd, commentText) => {
    const comment = document.createElement("div");
    const commentPanel = document.querySelector(".comment__panel");

    const commentName = document.createElement("span");
    commentName.classList.add("comment__name");
    commentName.innerText = name;

    const commentTextarea = document.createElement("span");
    commentTextarea.classList.add("comment__text");

    const todayDate = document.createElement("span");
    todayDate.classList.add("comment__date");
    todayDate.innerText = ymd;

    commentTextarea.innerText = commentText;
    comment.className = "comment";

    commentPanel.prepend(comment);
    comment.appendChild(commentName);
    comment.appendChild(commentTextarea);
    comment.appendChild(todayDate);
    commentPanel.classList.remove("hidden");
};

export function getIsLogin(login) {
    isLogin = login;
}

export function getUserId(name, id) {
    myName = name;
    myID = id;
}

export const initInfo = async () => {
    commentCursors = await preparePagination();
    await showComments();
    showPageBtn();

    const commentDeleteBtns = document.querySelectorAll(".commentDelete");
    commentDeleteBtns.forEach(deleteBtn => {
      deleteBtn.addEventListener("click", handleCommentDeleteClick);
    });
}

/* 페이지 로딩 시, 댓글 내림차순(최신순)으로 정렬하여 보여주기 */
export const showComments = async (pageIndex = 0) => {
    const commentPanel = document.querySelector(".comment__panel");
    commentPanel.innerHTML = '';
    // 댓글 반환
    const snapshot = await getCommentDocs(pageIndex, commentCursors);

    snapshot.forEach((doc) => {
        const row = doc.data();
        const text = `
            <div class="comment__wrap" data-id=${doc.id}>
                <div class="comment">
                    <span class="comment__name">${row.name}</span>
                    <span class="comment__text">${row.comment}</span>
                    <span class="comment__date">${row.date}</span>
                </div>
                ${row.id === myID ? '<button class="commentDelete">삭제</button>' : ''}
            </div>`;
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = text;
        const commentElement = tempDiv.firstElementChild;

        // append 시 실제 element를 append해야 이벤트도 붙습니다.
        document.querySelector(".comment__panel").appendChild(commentElement);

        // 이벤트 바인딩
        const deleteButton = commentElement.querySelector(".commentDelete");
        if (deleteButton) {
            deleteButton.addEventListener("click", handleCommentDeleteClick);
        }
    });
};

const handleCommentDeleteClick = async (event) => {
    const commentId = event.target.parentElement.dataset.id;

    try {
      deleteComment(commentId);
      alert("댓글이 삭제되었습니다.");
      initInfo();
    } catch (error) {
      console.error("댓글 삭제 중 오류:", error);
    }
}

// 호출: 첫 시작할 때 한 번만 실행
initInfo();