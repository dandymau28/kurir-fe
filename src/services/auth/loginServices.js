import axios from "axios";
import apiConfig from "../../config/api";

const loginServices = {
    login: async({username = '', password = ''}) => {
        return await axios.post( apiConfig.url +  '/api/auth/login', {
            username, password
        });
    },
    register: async({ username = '', password = '', name = '', role = 'kurir' }) => {
        return await axios.post( apiConfig.url + '/api/auth/register', {
            username, password, name, role
        });
    }
}

export default loginServices