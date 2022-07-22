import { Navigate, Outlet, useLocation } from "react-router-dom"

const ProtectedPage = () => {
    let location = useLocation()
    if(!localStorage.getItem("USER_NAME")) {
        return <Navigate to='Login' state={{from: location}} replace />
    }
    return <Outlet />
}
export default ProtectedPage