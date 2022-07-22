import axios from "axios"
const BASE_URL = process.env.REACT_APP_API_HOST_URL + "/cart"
const CartAPI = {
    AddToCart: async (data) => {
        try {
            const url = BASE_URL + '/add-to-cart'
            const response = await axios.post(url, data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    GetCart: async (params) => {
        try {
            const url = BASE_URL + '/get-cart'
            const response = await axios.get(url, { params: params })
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    getItemCart: async (id) => {
        try {
            const url = process.env.REACT_APP_API_HOST_URL+'/cart-item/get-all'
            const response = await axios.get(url, { params: { IDGioHang: id } })
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    getRemoveCart: async (idGH,idSP) => {
        try {
            const url = BASE_URL+'/remove-cart-item'
            const response = await axios.delete(url, { params: { IDGioHang: idGH ,IDSanPham:idSP} })
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
    updateSL:async(params)=>{
        try {
            const url = BASE_URL+'/update-cart-item'
            const response = await axios.put(url, params )
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default CartAPI;