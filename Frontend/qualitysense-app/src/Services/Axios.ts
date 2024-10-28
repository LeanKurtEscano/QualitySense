import axios from "axios";

export const deleteGenerated = async (id: number): Promise<boolean> => {
    const accessToken = localStorage.getItem('access_token');

    const response = await axios.post("http://localhost:8000/dashboard-api/delete/", {
        id: id
    }, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }


    });
     
    if(response.status === 200) {
        return true
    } else {
        return false
    }


}


export const getUserDetails = async() => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get("http://localhost:8000/dashboard-api/profile/",{
       headers: {
        'Authorization' : `Bearer ${accessToken}`
       }
    })

    return response
}

export const deleteAccount = async() => {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.delete("http://localhost:8000/dashboard-api/account/",{
       headers: {
        'Authorization' : `Bearer ${accessToken}`
       }
    })

    return response

    
}

export const userEmailReset = async() => {
    const email = localStorage.getItem('email_otp');

    const otpResponse = await axios.post("http://localhost:8000/api/reset-otp/",{
        email : email,
    },{
       headers: {
        'Content-Type' : 'application/json'
       }
    })

    return otpResponse

}
export const getUserOTP= async(email:string) => {
    const otpResponse = await axios.post("http://localhost:8000/api/otp/",{
        email : email
    },{
       headers: {
        'Content-Type' : 'application/json'
       }
    })

    return otpResponse
}

export const passwordOTP = async(otpCode: string) => {
    const userEmail = localStorage.getItem('email_otp');
    const response = await axios.post("http://localhost:8000/api/email-otp/",{
        email: userEmail,
        otpCode:otpCode,

    },{
       headers: {
        'Content-Type' : 'application/json'
       }
    })

    return response

}

export const verifyOTP = async(otpCode:string, username: string, email: string, password:string) => {
    const otpVerify = await axios.post("http://localhost:8000/api/verify/",{
        username:username,
        email:email,
        password:password,
        otpCode:otpCode,

    },{
       headers: {
        'Content-Type' : 'application/json'
       }
    })

    return otpVerify

}

export const sendEmail = async(email:String) => {
    const response = await axios.post("http://localhost:8000/api/email/",{
        email: email
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response
}

export const resetPassword = async(password:string, confirm:string) => {
    const email = localStorage.getItem('email_otp');
    const response = await axios.post("http://localhost:8000/api/reset/", {
        email: email,
        password: password,
        confirm: confirm,
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response
}