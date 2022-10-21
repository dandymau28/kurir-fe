import axios from "axios"
import apiConfig from "../../config/api"

const userServices = {
    getAllCourier: async() => {
        let token = localStorage.getItem('access_token')

        let headers = { 
            authorization: "Bearer " + token
        }

        return await axios.get(apiConfig.url + "/api/users/courier", { headers });
    },
}

export default userServices