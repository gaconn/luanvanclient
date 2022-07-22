import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import imgIcon from '../../assets/img/icon/icon1.png'
import CustommerAPI from '../../services/API/CustomerAPI';
import { formatDateForInput } from "../../../user/services/utils/GenerateUtil";
import Loading from '../Loading';
const Information = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [user, setUser] = useState([])
    const [info, setInfo] = useState(false)
    const [DiaChi, setDiaChi] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
    const Customer_id = searchParams.get('id')
    useEffect(() => {
        {
            const fetchData = async () => {
                
                setLoading(true)
                const response = await CustommerAPI.getCustomerDetail({ id: Customer_id })
                if (response.data[0].SoDienThoai!==null || !response.data[0].NgaySinh!==null || response.data[0].TinhThanh !== null || response.data[0].QuanHuyen !== null || response.data[0].PhuongXa !== null || response.data[0].SoNha !== null) {
                    const addrress = response.data[0].TinhThanh + "," + response.data[0].QuanHuyen + "," + response.data[0].PhuongXa + "," + response.data[0].SoNha
                    setDiaChi({ ...DiaChi, addrress })
                    setInfo(true)
                }
               if(response.data[0].TinhThanh === null && response.data[0].QuanHuyen === null && response.data[0].PhuongXa === null && response.data[0].SoNha === null){
                navigate(`?updateID=${Customer_id}`)
               }
                setUser((user) => {
                    if (response && (!response.success || response.data.length === 0)) {
                        return user
                    }
                    return response.data[0]
                })
                setLoading(false)
            }
            fetchData()
        }
    }, [searchParams])
    const infomation = (user, DiaChi) => {
        return <>
            {user.SoDienThoai && <p className="mt-3 text-gray-700 text-sm ">  Số điện thoại : <label >{user.SoDienThoai}</label></p>}
            {user.NgaySinh && <p className="mt-3 text-gray-700 text-sm ">  Ngày Sinh: <label >{formatDateForInput(user.NgaySinh * 1000)}</label></p>}
            {DiaChi.addrress && <p className="mt-3 text-gray-700 text-sm ">  Địa Chỉ : <label >{DiaChi.addrress}</label></p>}
        </>
    }
    const UpdateID=()=>{
        navigate(`?updateID=${Customer_id}`)
    }
    if (loading) {
        return <Loading />
    }
    console.log(DiaChi)
    return (
        <>
            <h3 className='w-2/3 text-center mx-auto py-5' >Thông Tin Khách Hàng </h3>
            <div className="flex bg-white shadow-lg rounded-lg mx-auto md:mx-auto max-w-md md:max-w-1xl ">
                <div className="flex items-start px-4 py-6">
                    <img
                        className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                        src={imgIcon}
                        alt="avatar"
                    />
                    <div >
                        <div className="flex items-center justify-between ml-auto">
                            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                                {user.HoTen}
                            </h2>
                        </div>
                        <p className="text-gray-700">{formatDateForInput(user.ThoiGianTao * 1000) ? formatDateForInput(user.ThoiGianTao * 1000) : " "} </p>
                        <p className="mt-3 text-gray-700 text-sm ">
                            Email : <label >{user.Email}</label>
                        </p>
                        {
                            info && infomation(user, DiaChi)
                        }
                    </div>
                    <div className='mx-100'>
                        <Link to={`?updateID=${Customer_id}`}>
                            {
                                info &&  <i className="fa fa-pencil-square-o" aria-hidden="true" />
                            }
                        </Link>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Information;