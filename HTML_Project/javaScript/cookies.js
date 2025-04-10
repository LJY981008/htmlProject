import { initInfo, getUserId } from "./comment.js";

//쿠키 저장
export function madeCookie(myID, myName) {
    document.cookie = `myID=${myID}; max-age=180; path=/`; //max-age 초단위 시간 지속 : 3분
    document.cookie = `myName=${myName}; max-age=180; path=/`;

    //콘솔 확인용
    setTimeout(() => {
        const cookieID = document.cookie.split('; ').find(row => row.startsWith('myID='))?.split('=')[1];
        console.log("저장된 myID:", cookieID);
    }, 200);
}

//쿠키 불러오기
export function cheakedCookie() {
    const cookieName = document.cookie
        .split('; ')
        .find(row => row.startsWith('myName='))
        ?.split('=')[1];

    const cookieID = document.cookie
        .split('; ')
        .find(row => row.startsWith('myID='))
        ?.split('=')[1];

    if (cookieName && cookieID) {
        //콘솔 확인용
        console.log("불러온 myName:", cookieName, " 불러온 myID:", cookieID);

        const myInfo = {
            'name' : cookieName,
            'ID' : cookieID
        }
        getUserId(cookieName, cookieID);
        return myInfo;
    }
    else{
        const myInfo = {
            'name' : '',
            'ID' : ''
        }
        return myInfo;
    }
}
//쿠키 삭제
export function removeCookie(){
    document.cookie = "myID=; max-age=0; path=/";
    document.cookie = "myName=; max-age=0; path=/";
}