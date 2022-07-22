import axios from "axios"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { logout } from "./Auth"

const ProtectedPageWarehouse = () => {
    let location = useLocation()
    if(!localStorage.getItem("USER_NAME") || !axios.defaults.headers.common['Authorization']) {
        logout()
        return <Navigate to='auth' state={{from: location}} replace />
    }
    if(!localStorage.getItem('USER_LEVEL') || localStorage.getItem('USER_LEVEL') > 3) {
        return <Navigate to={'permission-denied'} replace/>
    }
    return <Outlet />
}

export default ProtectedPageWarehouse