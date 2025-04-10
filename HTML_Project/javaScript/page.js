import { getCommentDocNum, getAllCommentDocs } from "./firebase.js";
import { showComments } from "./comment.js";

export async function createPageBtn() {
    const pageLink = document.querySelector(".pageLink");
    console.log(pageLink)
    let count;
    
    count = await getCommentDocNum() + 1;

    // 총 문서 수가 5로 나눈 나머지가 1일 경우 버튼 생성
    if (count % 5 === 1) {
        // 버튼이 추가될 컨테이너 선택
        const existingButtons = document.querySelectorAll(".pageBtn").length;
        console.log(existingButtons)
        // 새로운 버튼 생성
        const newButton = document.createElement("button");
        newButton.innerText = `(${existingButtons + 1})`; // 버튼 텍스트 설정 (예: 3, 4 등 순차적으로 추가)
        newButton.value = existingButtons;
        newButton.classList.add("pageBtn"); // 버튼 클래스 추가
        console.log(newButton)
        pageLink.appendChild(newButton); // .pageLink에 버튼 추가
        // 버튼 클릭 이벤트 추가
        newButton.addEventListener("click", () => {
          const pageIndex = parseInt(newButton.value);
          showComments(pageIndex);
        });
    } else {
      return;
    }
}

export const showPageBtn = async () => {
    const pageLink = document.querySelector(".pageLink");
    let count;
    
    count = await getCommentDocNum();

    pageLink.innerHTML = "";
    while(count > 0) {
        const existingButtons = document.querySelectorAll(".pageBtn").length;
        
        // 새로운 버튼 생성
        const newButton = document.createElement("button");
        newButton.innerText = `(${existingButtons + 1})`; // 버튼 텍스트 설정 (예: 3, 4 등 순차적으로 추가)
        newButton.value = existingButtons;
        newButton.classList.add("pageBtn"); // 버튼 클래스 추가
        pageLink.appendChild(newButton); // .pageLink에 버튼 추가
        // 버튼 클릭 이벤트 추가
        newButton.addEventListener("click", () => {
            const pageIndex = parseInt(newButton.value);
            showComments(pageIndex);
        });
        count-=5;
    }
}

let pageSize = 5;
let commentCursors = []; // 각 페이지의 시작 문서를 저장

export async function preparePagination() {
    const snapshot = await getAllCommentDocs();

    commentCursors = [];
    snapshot.docs.forEach((doc, i) => {
        if ((i+1) % pageSize === 1) {
            commentCursors.push(doc);
        }
    });
    return commentCursors;
}

showPageBtn();
