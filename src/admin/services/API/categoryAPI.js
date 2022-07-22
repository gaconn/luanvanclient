import axios from "axios"

const categoryUrl = process.env.REACT_APP_API_HOST_URL + "/category"

const categoryAPI = {
    getAll: async(params) => {
        try {
            const url = categoryUrl+"/get-all"
            const response = await axios.get(url, {params: params})
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    insert: async(data) => {
        try {
            const url = categoryUrl+"/insert"
            const response = await axios.post(url,data)
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    update: async(data) => {
        try {
            const url = categoryUrl + "/update"
            const response = await axios.put(url, data)
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    delete: async(id) => {
        try {
            const url = `${categoryUrl}/delete/${id}`
            const response = await axios.delete(url)
            return response.data
        } catch (error) {
            console.log(error);            
        }
    },
    detail: async (id) => {
        try {
            const url = `${categoryUrl}/get-detail`
            const response = await axios.get(url, {params: {id}})
            return response.data
        } catch (error) {
            console.warn(error)
        }
    },
    getTree: async () => {
        try {
            const url = `${categoryUrl}/get-tree`
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            console.log(error)            
        }
    }
}

export default categoryAPI