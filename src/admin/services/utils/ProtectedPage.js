import axios from "axios"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { logout } from "./Auth"
import token from "./token"

const ProtectedPage = () => {
    let location = useLocation()
    if(!localStorage.getItem("USER_NAME") || !localStorage.getItem('TOKEN')) {
        logout()
        return <Navigate to='auth' state={{from: location}} replace />
    }
    if(!localStorage.getItem('USER_LEVEL') || localStorage.getItem('USER_LEVEL') > 3) {
        return <Navigate to={'permission-denied'} replace/>
    }

    if(!axios.defaults.headers.common['Authorization']) {
        token.setToken(localStorage.getItem('TOKEN'))
    }
    return <Outlet />
}

export default ProtectedPage