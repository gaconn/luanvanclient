import axios from "axios"

var orderUrl = process.env.REACT_APP_API_HOST_URL+"/order"

const orderAPI = {
    getAll: async(params = {page: 1}) => {
        const url = orderUrl + '/get-orders'
        const response = await axios.get(url, {params: params})
        return response.data
    },
    getDetail: async (params) => {
        const url = orderUrl + '/get-order-detail'
        const response = await axios.get(url, {params: params})
        return response.data
    },
    changeStatus: async (params) => {
        const url = orderUrl + '/change-status'
        const response = await axios.put(url, params)
        return response.data
    }
}

export default  orderAPI