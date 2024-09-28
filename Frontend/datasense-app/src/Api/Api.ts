
import { jwtDecode } from "jwt-decode";


import axios from "axios";



const api = axios.create({
    baseURL: "http://localhost:8000/api/login/",
});

const handleError = (error:any) => {
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


export default api;



const refreshUserToken = async() => {
    const refreshToken = localStorage.getItem('refresh_token');

    if(!refreshToken) {
        return false;
    }

    try {
        const response = await api.post("http://127.0.0.1:8000/api/refresh/", {
            resfresh: refreshToken
        })

        if (response.status === 200) {         
            localStorage.setItem('access_token', response.data.access);
            return true
        }

    } catch(error) {
    
        return false
    }
    

}

const auth = async() => {
    const accessToken = localStorage.getItem('access_token');

    if(!accessToken) {
        return false;
    }


    try {
        const decoded = jwtDecode(accessToken)
        const tokenExpiration: any = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refreshUserToken();
        } else {
           console.log("Failed to refresh Token");

        }

        return true
    
    } catch(error) {
        return false;
    }
}

interface userData {
    email: string,
    password:string,
}

export const userAuthentication = async (endpoint: string, data: userData) => {
    const isLoginEndPoint = endpoint === "login/";

    if (isLoginEndPoint) {
        try {
            const response = await api.post(endpoint, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response; 
        } catch (error) {
            throw error; 
        }
    }
};

