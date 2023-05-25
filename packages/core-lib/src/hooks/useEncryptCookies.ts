import { CookieOptions } from "express";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { crypto } from '../utils';


const useEncryptCookies = (cookieArgs: string[]): [typeof cookies, typeof setCookie, typeof removeCookie] => {
    const [cookies, setCookie, removeCookie, ] = useCookies(cookieArgs);
    
    const encryptCookies = Object.keys(cookies).reduce((encrypted, key) => {
        const 
        _cookie = cookies[key];

        return { ...encrypted, [key]: crypto.decrypt(_cookie) }
    }, {})

    const setEncryptCookie = (cookieArg: string, data: string, options: CookieOptions | undefined) => {
        setCookie(cookieArg, crypto.encrypt(data), options);
    }

    useEffect(() => {}, [cookies]);

    return [ encryptCookies, setEncryptCookie, removeCookie ]
}

export default useEncryptCookies