const commentBox = document.querySelector(".comment__box");
const commentInput = commentBox.querySelector("input");
const commentBtn = commentBox.querySelector("button");

const addComment = (input) => {
  const comment = document.createElement("div");
  const commentPanel = commentBox.querySelector(".panel");
  comment.innerText = input;
  comment.className = "comment";
  commentPanel.appendChild(comment);
};

const handleCommentClick = (event) => {
  event.preventDefault();
  const input = commentInput.value;
  addComment(input);
  commentInput.value = "";
};

commentBtn.addEventListener("click", handleCommentClick);