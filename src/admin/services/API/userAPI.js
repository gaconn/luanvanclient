import axios from "axios"
const BASE_URL = process.env.REACT_APP_API_HOST_URL + "/user"
const userAPI = {
    login : async(data) => {
        const url = BASE_URL+"/login"
        const response = await axios.post(url, data)
        return response.data
    },
    getList: async (params) => {
        const url = BASE_URL + "/get-list"
        const response = await axios.get(url, {params: params})
        return response.data
    },
    update: async (params) => {
        const url = BASE_URL + "/update"
        const response = await axios.put(url, params)
        return response.data
    },
    getDetail: async (params) => {
        const url = BASE_URL + "/get-detail"
        const response = await axios.get(url, {params: params})
        return response.data
    }
}
export default userAPI