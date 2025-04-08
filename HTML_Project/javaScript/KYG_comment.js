const commentBox = document.querySelector(".comment__box");
const commentInput = commentBox.querySelector("input");
const commentBtn = commentBox.querySelector("button");

const addComment = (input) => {
  if(input=="") return;
  const comment = document.createElement("div");
  const commentPanel = document.querySelector(".comment__panel");

  const commentName = document.createElement("span");
  commentName.classList.add("comment__name");
  commentName.innerText="김아무개";
  
  const commentText = document.createElement("span");
  commentText.classList.add("comment__text");
  
  const today = new Date();
  const todayDate = document.createElement("span");
  todayDate.classList.add("comment__date");
  todayDate.innerText = `방문 날짜 : ${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${today.getHours()}시 ${today.getMinutes()}분`

  commentText.innerText = input;
  comment.className = "comment";

  commentPanel.appendChild(comment);
  comment.appendChild(commentName);
  comment.appendChild(commentText);
  comment.appendChild(todayDate);
  commentPanel.classList.remove("hidden");
};

const handleCommentClick = () => {
  const input = commentInput.value;
  addComment(input);
  commentInput.value = "";
};

commentBtn.addEventListener("click", handleCommentClick);