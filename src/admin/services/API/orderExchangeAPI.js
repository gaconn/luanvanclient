import axios from "axios"

var orderExchangeUrl = process.env.REACT_APP_API_HOST_URL+"/order-exchange"

const orderExchangeAPI = {
    getList : async (params) => {
        const url = orderExchangeUrl + "/get-list"
        const response = await axios.get(url, {params:params})
        return response.data
    },
    insert : async (params) => {
        const url = orderExchangeUrl + "/insert"
        const response = await axios.post(url, params)
        return response.data
    },
    update: async (params) => {
        const url = orderExchangeUrl + "/update"
        const response = await axios.put(url, params)
        return response.data
    },
    delete : async (params) => {
        const url = orderExchangeUrl + "/delete"
        const response = await axios.delete(url, {params:params})
        return response.data
    } 
}

export default orderExchangeAPI
