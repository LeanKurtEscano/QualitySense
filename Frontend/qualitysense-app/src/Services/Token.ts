
import { jwtDecode } from "jwt-decode";
import axios from "axios";




const api = axios.create({
    baseURL: "http://localhost:8000/api/login/",
});

const handleError = (error: any) => {
    if (error.response) {
        const { status } = error.response;

        // Suppress logging for specific status codes
        if (status === 400 || status === 404) {
            return; // Do nothing
        }
    }

    // Log unexpected errors
    console.error("An unexpected error occurred:", error);
};

// Use in the interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        handleError(error);
        return Promise.reject(error);
    }
);


export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: { exp: number } = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const currentTime = Date.now() / 1000;

        return tokenExpiration < currentTime;
    } catch (error) {
        return true; 
    }
};




export const refreshUserToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
        return false
        
    } else if(isTokenExpired(refreshToken)) {
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        return false;
    }

    try {
        const response = await api.post("http://127.0.0.1:8000/api/refresh/", {
            refresh: refreshToken
        })

        if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access);
            return true
        }

    } catch (error) {

        return false
    }


}
export const auth = async () => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        return false;
    }


    try {
        const decoded = jwtDecode(accessToken)
        const tokenExpiration: any = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refreshUserToken();
        }


        return true

    } catch (error) {
        return false;
    }
}