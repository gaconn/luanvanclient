import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/utils/Auth'
import token from '../services/utils/token'
import { Navigate } from 'react-router-dom'

const Denied = () => {
    const navigate = useNavigate()
    const logoutHandler = (e) => {
        logout()
        navigate("/manage/auth", {replace:true})
    }
    if(localStorage.getItem("USER_LEVEL") && localStorage.getItem('USER_LEVEL') < 4) {
        return <Navigate to={"/manage/home"} replace />
    }
  return (
    <div className='text-center' style={{color:"red"}}>
        <h2 style={{color:"red"}}>Đây là khu vực quản lý của quản trị viên</h2>
        <h2 style={{color:"red"}}>Bạn không có quyền truy cập</h2>
        <div style={{color:"blue", cursor:"pointer"}} onClick={logoutHandler} >Quay lại</div>
    </div>
  )
}

export default Denied