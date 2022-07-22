import FormAuth from "../components/FormAuth"
import { useState } from 'react'
import { Navigate, useLocation } from "react-router-dom"
const Auth = () => {
    let location = useLocation()
    if(localStorage.getItem("USER_NAME")) {
        return <Navigate to='/manage/home' state={{from: location}} replace />
    }
    return (
        <FormAuth />
    )
}

export default Auth