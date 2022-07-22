import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_ADDRESS_URL 
const addressAPI = {
    getAllCity:async(params={deth:1})=>{
        try {
            const URL=BASE_URL+'/api'
            const response=axios.get(URL,{params:params})
            return response.data
        } catch (error) {
            console.log(error)
        }
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
 
export default addressAPI;