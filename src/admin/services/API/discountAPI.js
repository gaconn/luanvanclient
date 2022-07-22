import axios from "axios"

var discountUrl = process.env.REACT_APP_API_HOST_URL+"/discount"
const discountAPI = {
    getList: async(objCondition) => {
        try {
            const url = discountUrl+"/get-list"
            const response = await axios.get(url, {params: objCondition})
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    insert: async(data) => {
        try {
            const url = discountUrl+"/insert"
            const response = await axios.post(url,data)
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    update: async(data) => {
        try {
            const url = discountUrl + "/update"
            const response = await axios.put(url, data)
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    delete: async(id) => {
        try {
            const url = `${discountUrl}/delete`
            const response = await axios.delete(url, {params: {id}})
            return response.data
        } catch (error) {
            return {success: false, message: error.message}          
        }
    }
}

export default discountAPI