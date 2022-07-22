import axios from "axios"
const BASE_URL = process.env.REACT_APP_API_ADDRESS_URL 
const addressAPI = {
    getAllCity : async(params = {depth: 1}) =>{
        const url = BASE_URL + "/api/"
        const response = await axios.get(url, {params: params})
        return response.data
    },
    getDistrictByCityCode: async (params) => {
        const url = BASE_URL + `/api/p/${params.code}?depth=2`
        const response = await axios.get(url)
        return response.data
    },
    getWardByDistrictCode: async (params) => {
        const url = BASE_URL + `/api/d/${params.code}?depth=2`
        const response = await axios.get(url)
        return response.data
    }
}
export default addressAPI