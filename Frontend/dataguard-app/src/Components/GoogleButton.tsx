import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
const GoogleButton: React.FC = () => {

    const handleSuccess = (response: any) => {
        const token = response.credential
        console.log(token)
        handleGoogleLogin(token)

    }

    const handleGoogleLogin = async(token: string) => {
        try {
            const response = await axios.post("http://localhost:8000/api/google-signin/",{
                token: token
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(response.data)

        } catch(error) {
            alert("Failed to sign in using google");
        }
      

    }
    
    return (
        <div className="flex justify-center">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    console.log('Login Failed');
                }}
            />;
        </div>
    )
}

export default GoogleButton