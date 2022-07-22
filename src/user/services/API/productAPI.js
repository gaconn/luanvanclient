import axios from "axios"

var productUrl = process.env.REACT_APP_API_HOST_URL+"/product"
const productAPI = {
    getAll: async(page) => {
        try {
            const url = productUrl+"/get-all"
            const response = await axios.get(url, {params: {page}})
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    detail: async (id) => {
        try {
            const url = `${productUrl}/get-detail`
            const response = await axios.get(url, {params: {id}})
            return response.data
        } catch (error) {
            console.warn(error)
        }
    }
}

export default productAPI