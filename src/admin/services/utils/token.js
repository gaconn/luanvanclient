import axios from "axios";

const token = {
    setToken: (token) => {
        axios.defaults.headers.common['Authorization'] = token
    },
    deleteToken : () => {
        delete axios.defaults.headers.common['Authorization']
    }
}

export default token