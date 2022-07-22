const { default: axios } = require("axios")

const BASE_URL = process.env.REACT_APP_API_HOST_URL + "/permission"

const permissionAPI = {
    getList: async(params) => {
        const url = BASE_URL + "/get-list"
        const response = await axios.get(url,{params: params})
        return response.data
    } 
}

export default permissionAPI