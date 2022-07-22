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
    },
     getParent:async ()=>{
        try {
            const url = `${categoryUrl}/get-all`
            const response = await axios.get(url,{params:{parent:true}})
            return response.data
        } catch (error) {
            console.log(error)            
        }
    }
}

export default categoryAPI