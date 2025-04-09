/*멘트 기능*/
// 멘트리스트 (멘트 + 작성자)
const quotes = [
    { text: "버그 잡다가 나를 잡겠다 😅🫠🐞", author: "김용준" },
    { text: "돌아는 가는데 왜 돌아가는진 모르겠음 🌀🔧", author: "최경진" },
    { text: "에러는 팀워크를 강화하는 기회다.", author: "영우" },
    { text: "마감은 끝이 아니라 또 다른 시작이다.", author: "하린" },
    { text: "깃 충돌은 잠시, 이해는 영원히.", author: "준서" },
    { text: "코드 한 줄보다 마음 한 줄이 더 깊다.", author: "소연" }
];
//현재 날짜 정보 값 불러오기
const today = new Date().toISOString().slice(0, 10);
const stored = localStorage.getItem("quote_" + today);

let quote;
if (stored) {
    // 저장된 값 있으면 사용
    quote = JSON.parse(stored);
} else {
    // 없으면 랜덤 선택 후 저장
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    localStorage.setItem("quote_" + today, JSON.stringify(quote));
}

// 출력
document.getElementById("team-quote").innerText = `"${quote.text}"`;
document.getElementById("team-author").innerText = `— ${quote.author}`;