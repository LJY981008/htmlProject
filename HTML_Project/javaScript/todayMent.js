// 멘트리스트 (멘트 + 작성자)
const quotes = [
    { text: "버그 잡다가 나를 잡겠다 😅🫠🐞", author: "김용준" },
    { text: "돌아는 가는데 왜 돌아가는진 모르겠음 🌀🔧", author: "최경진" },
    { text: "포기란 없다, 구글과 함께라면.💪🌐" , author: "이현하" },
    { text:"코드가 안 돌아가면, 우리가 돌면 된다.🤪🔧", author: "이현하" },
    { text: "처음은 어렵지만, 안 되는 건 없다. 코드도 인생도!🌱✨" , author: "우새빛" },
    { text: "내 코드는 완벽해. 컴파일러가 문제인 거지.", author: "이준영" }
];

// 현재 날짜 정보 값 불러오기 (로컬 시간대 반영)
const today = new Date(); // 현재 로컬 시간대로 날짜 객체 생성
const todayFormatted = today.toISOString().slice(0, 10); // 'YYYY-MM-DD' 형태로 변환

const stored = localStorage.getItem("quote_" + todayFormatted);

let quote;
if (stored) {
    // 저장된 값 있으면 사용
    quote = JSON.parse(stored);
} else {
    // 없으면 랜덤 선택 후 저장
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    localStorage.setItem("quote_" + todayFormatted, JSON.stringify(quote));
}

// 출력
document.getElementById("team-quote").innerText = `"${quote.text}"`;
document.getElementById("team-author").innerText = `— ${quote.author}`;
