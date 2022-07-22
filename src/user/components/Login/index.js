
import image from '../../assets/img/banner/banner-login.png'
import {  useState } from 'react'
import isEmty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail';
import CustommerAPI from '../../services/API/CustomerAPI'
import { useNavigate ,Link} from 'react-router-dom'
import token from '../../services/utils/setToken'
import Toast from "react-bootstrap/Toast"
import ToastContainer from "react-bootstrap/ToastContainer"
const Logincomponents = () => {
    const navigate = useNavigate()
    const [account,setAccount]=useState({Email:'',MatKhau:''})
    const [validated,setValidated]=useState('')
    const [notify, setNotify] = useState()
     
    
  
    const InputOnChange=(e)=>{
        setAccount(account=>({ ...account, [e.target.name]: e.target.value }))
    }
   
    const handleAcountSubmit=async (event)=>{
        const isvalidated=validatedAll() 
        if(!isvalidated) {
            event.preventDefault()
            return
        }

        const form = event.currentTarget;
         if (form.checkValidity() === false) {
             event.preventDefault()
             event.stopPropagation()
             return
         }
         event.preventDefault()
         const response= await CustommerAPI.login(account)
         setNotify(() => {
            if(response) {
                if(!response.success) {
                    return {show: true, success: false, message: response.message, error: response.error}
                }
                if(response.error.length > 0 ){
                    return {show: true, success: false, message: response.message, error: response.error}
                }
                if(response.success && response.error.length ===0 ){
                    return {show: false, success: true, message: response.message, error: response.error}
                }
              
            }
            
            return {show: true, success: false, message: "Có lỗi xảy ra, vui lòng thử lại"}
        })
         const data = response.data[0]
         console.log(data);
         if(response) {
             if(response.success && response.error.length ===0 ) {
                 if(data.token) {
                     token.setAuthToken(data.token)
                     localStorage.setItem('USER_NAME', data.HoTen)
                     localStorage.setItem('UID', data.id)
                   navigate('../Home')
                 }
                     
             } 
         }
    }
    const validatedAll=()=>{
        const nsg={}
            //Kiểm tra email
    
            if (!isEmail(account.Email)) {
                nsg.Email='Không đúng định dạng email'        
            }
            //Kiểm tra password
            if(account.MatKhau.length < 6) {
                nsg.MatKhau= 'Mật khẩu phải lớn hơn là 6 ký tự'
            }
         
        if(isEmty(account.Email)){
            nsg.Email='Vui lòng nhập email'
        }
        if(isEmty(account.MatKhau)){
            nsg.MatKhau='Vui lòng nhập mật khẩu'
        }
        setValidated(nsg)
        if(Object.keys(nsg).length>0)
         {return false}
        return true
        
    }
  
    return (
        
           <div>
             <div className="py-6 wow zoomIn" >
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div
                        className="hidden lg:block lg:w-1/2 bg-cover "
                        style={{
                            backgroundImage:
                            `url(${image})`
                        }}
                    />
                    <div className="w-full p-8 lg:w-1/2">
                        <p className="text-xl text-gray-600 text-center">Chào mừng trở lại!</p>
                        <a
                            href="#"
                            className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
                        >
                            <div className="px-4 py-3">
                                <svg className="h-6 w-6" viewBox="0 0 40 40">
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#FFC107"
                                    />
                                    <path
                                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                        fill="#FF3D00"
                                    />
                                    <path
                                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                        fill="#4CAF50"
                                    />
                                    <path
                                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                        fill="#1976D2"
                                    />
                                </svg>
                            </div>
                            <h6 className="px-4 py-3 w-5/6 text-center text-black font-bold">
                            Đăng nhập bằng Google
                            </h6>
                        </a>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 lg:w-1/4" />
                            <a href="#" className="text-xs text-center text-gray-500 uppercase">
                            hoặc đăng nhập bằng email
                            </a>
                            <span className="border-b w-1/5 lg:w-1/4" />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="email" required name='Email' onChange={InputOnChange}
                            />
                            <p style={{color:'red'}}>{validated.Email}</p>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <Link to="/NewPassword" className="text-xs text-gray-500">
                                Quên mật khẩu?
                                </Link>
                            </div>
                            <input
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password" required name='MatKhau' onChange={InputOnChange}
                            />
                            <p style={{color:'red'}}>{validated.MatKhau}</p>
                        </div>
                        <div className="mt-8">
                            <button onClick={handleAcountSubmit} className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                            Đăng nhập
                            </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 md:w-1/4" />
                            <Link to="/Register" className="text-xs text-gray-500 uppercase">
                            hoặc đăng ký
                            </Link>
                            <span className="border-b w-1/5 md:w-1/4" />
                        </div>
                    </div>
                </div>
            </div>
            {
                notify && <ToastContainer position="top-end" className="p-3">
                    <Toast bg="danger" onClose={()=>setNotify({...notify, show: false})} show={notify.show} delay={4000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Thông báo</strong>
                        <small className="text-muted">vừa xong</small>
                    </Toast.Header>
                    <Toast.Body>
                        <h5 className="notify-message">{notify.message}</h5>
                        {
                            notify.error.length >0 && notify.error.map((item, index)=> {
                                return <div key={index} className="notify-error">{item}</div>
                            })
                        }
                    </Toast.Body>
                    </Toast>
                </ToastContainer>
            }
              
           </div>

        

    );
}

export default Logincomponents;