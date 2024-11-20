import { parse } from 'cookie';

const cookieExtractor = (cookieString) => {
    if (!cookieString) {
        throw new Error('Cookie string is empty or undefined');
    }

    const parsedCookie = parse(cookieString);
    const userInfo = parsedCookie.userInfo;

    if (!userInfo) {
        throw new Error('UserInfo not found in cookie');
    }

    const userInfoObj = JSON.parse(userInfo);
    return userInfoObj;
};

export default cookieExtractor;