import axios from "axios"

var productUrl = process.env.REACT_APP_API_HOST_URL+"/product"
const productAPI = {
    getAll: async(objCondition) => {
        try {
            const url = productUrl+"/get-all"
            const response = await axios.get(url, {params: objCondition})
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    insert: async(data) => {
        try {
            const url = productUrl+"/insert"
            const response = await axios.post(url,data)
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    update: async(data) => {
        try {
            const url = productUrl + "/update"
            const response = await axios.put(url, data)
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    delete: async(id) => {
        try {
            const url = `${productUrl}/delete`
            const response = await axios.delete(url,{params: {id}})
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