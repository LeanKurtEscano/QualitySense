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

