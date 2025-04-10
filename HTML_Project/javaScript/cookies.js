export function madeCookie(myID, myName) {
    document.cookie = `myID=${myID}; max-age=180; path=/`; //max-age 초단위 시간 지속 (조정하면서 테스트 해 주세요)
    document.cookie = `myName=${myName}; max-age=180; path=/`;

    //쿠키 확인
    setTimeout(() => {
        const cookieID = document.cookie.split('; ').find(row => row.startsWith('myID='))?.split('=')[1];
        console.log("저장된 myID:", cookieID);
    }, 200);
}
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
        console.log("불러온 myName:", cookieName, " 불러온 myID:", cookieID);

        const myInfo = {
            'name' : cookieName,
            'ID' : cookieID
        }

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
export function removeCookie(){
    document.cookie = "myID=; max-age=0; path=/";
    document.cookie = "myName=; max-age=0; path=/";
}