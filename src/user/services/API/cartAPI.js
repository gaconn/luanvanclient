import axios from "axios"

const cartUrl = process.env.REACT_APP_API_HOST_URL + "/cart"

const cartAPI = {
    getCart: async(params) => {
        try {
            const url = cartUrl+"/get-cart"
            const response = await axios.get(url, {params: params})
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
}

export default cartAPI