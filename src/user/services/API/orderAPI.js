import axios from "axios"

const orderUrl = process.env.REACT_APP_API_HOST_URL + "/order"

const orderAPI = {
    checkout: async(params) => {
        try {
            const url = orderUrl+"/checkout"
            const response = await axios.post(url, params)
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    detail: async (id) => {
        try {
            const url = `${orderUrl}/get-detail`
            const response = await axios.get(url, {params: {id}})
            return response.data
        } catch (error) {
            console.warn(error)
        }
    },
    getCheckoutList: async (params) => {
        try {
            const url = orderUrl + "/get-product-checkout-list"
            const response = await axios.get(url, {params: params})
            return response.data
        } catch (error) {
            return false
        }
    }
}

export default orderAPI