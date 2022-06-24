import { useState } from "react";

export default function useToken{

    function getToken(): string | null {
        const tokenString = sessionStorage.getItem('token');
        if (tokenString == null ) {
            return null;
        }
        
        const userToken = JSON.parse(tokenString as string);
        return userToken?.token;
      }

    const [token, setToken] = useState<string | null>(getToken());

    const saveToken = (userToken: string | null) => {
        sessionStorage.setItem('token', JSON.stringify(useToken));
        setToken(userToken)
    }

    return {
        setToken: saveToken,
        token
    }

}