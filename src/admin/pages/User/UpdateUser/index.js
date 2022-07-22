import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import { BiCode } from "react-icons/bi";
import { useParams, useSearchParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import addressAPI from "../../../services/API/addressAPI";
import permissionAPI from "../../../services/API/permissionAPI";
import userAPI from "../../../services/API/userAPI";
import { formatDateForInput } from "../../../services/utils/General";
import { Container, Content } from "./UpdateUser.style";

const UpdateUser = () => {
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState([])
    const [notify, setNotify] = useState({show: false, message: ""})
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [listCity, setListCity] = useState([])
    const [listDistrict, setListDistrict]= useState([])
    const [listWard, setListWard] = useState([])
    const [address, setAddress] = useState({city: "", district: "", ward: "", home: ""})
    const [permission, setPermission] = useState([])
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            const user_id = searchParams.get('id')
            console.log(user_id);
            if(!user_id) return
            const response = await userAPI.getDetail({id : user_id}) 
            setUser((user)=> {
                if(response && (!response.success || response.data.length === 0)) {
                    return user
                }
                return response.data[0]
            })
            setNotify((notify)=> {
                if(response && (!response.success || response.data.length === 0)) {
                    return {...notify, show: true, message: "Không tìm thấy dữ liệu", success: false}
                }
                return {...notify}
            })
            setLoading(false)
        }
        const fetchCity = async() => {
            const response = await addressAPI.getAllCity()
            setNotify((notify) => {
                if(!response) {
                    return {show: true, message: "Không thể lấy dữ liệu tỉnh thành", success: false}
                }
                return notify
            })
            setListCity((listCity)=> {
                if(response)
                    return response
                return listCity
            })
        }

        const fetchPermission = async() => {
            const response = await permissionAPI.getList()
            setNotify((notify)=> {
                if(response && (!response.success || response.data.length === 0)) {
                    return {...notify, show: true, message: "Không tìm thấy dữ liệu phân quyền", success: false}
                }
                return {...notify}
            })
            setPermission((permission)=> {
                if(response && response.success && response.data.length >0) {
                    return response.data
                }
                return permission
            })
        }
        fetchCity()
        fetchData()
        fetchPermission()
    }, [searchParams])
    const handleSubmit = async(event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        var isValid = true
        if (form.checkValidity() === false) {
            isValid =false
        }
        setValidated(true);

        if(!isValid) return

        if(address.city) {
            const arrCity = address.city.split('-')
            const strCity = arrCity && arrCity[1] ? arrCity[1] : ""
            user.TinhThanh = strCity
        }
        if(address.district) {
            const arrDistrict = address.district.split('-')
            const strDistrict = arrDistrict && arrDistrict[1] ? arrDistrict[1] : ""
            user.QuanHuyen = strDistrict
        }
        if(address.ward) {
            const arrWard = address.ward.split('-')
            const strWard = arrWard && arrWard[1] ? arrWard[1] : ""
            user.PhuongXa = strWard
        }

        const response = await userAPI.update(user)
        
        setNotify(() =>{ 
            if(!response) {
                return {...notify}
            }
            return {...notify, show: true, message: response.message, success: response.success}
        })
    };
    const onChangeInput = (e) => {
        setUser((user)=> {
            if(e.target.name === "NgaySinh") {
                return {...user, [e.target.name]: new Date(e.target.value).getTime()/1000}
            }
            return {...user,[e.target.name]: e.target.value}
        })
    }

    // xử lý địa chỉ
    const changeAddressHandler = (e) => {
        console.log(e.target.value);
        setAddress((addr) => {
            if(e.target.name === 'city')
                return {...addr, [e.target.name]: e.target.value, district: "", ward: ""}
            if(e.target.name === 'district')
                return {...addr, [e.target.name]: e.target.value, ward: ""}
            return {...addr, [e.target.name]: e.target.value}
        })
    }
    useEffect(()=> {
        const fetchDistrict = async () => {
            var response 
            if(address.city !== '') {
                let arrData = address.city.split("-")
                let code = arrData ? arrData[0] : 1
                response = await addressAPI.getDistrictByCityCode({code:code})
            }
            
            setListDistrict((district)=> {
                if(response && response.districts) {
                    return response.districts
                }
                return []
            })
        }
        fetchDistrict()
    }, [address.city])

    useEffect(()=> {
        const fetchWard = async () => {
            var response 
            if(address.district !== '') {
                let arrData = address.district.split("-")
                let code = arrData ? arrData[0] : 1
                response = await addressAPI.getWardByDistrictCode({code})
            }
            console.log(response);
            setListWard((ward)=> {
                if(response && response.wards) {
                    return response.wards
                }
                return []
            })
        }
        fetchWard()
    }, [address.district])
    console.log(user);
    if(loading) {
        return <Loading />
    }
    return(
        <Container>
            <ToastContainer position="top-end" className="p-3">
                <Toast bg={notify.success ? "success": "danger"} onClose={()=> setNotify({...notify, show: false})} show={notify.show} delay={3000} autohide>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Thông báo</strong>
                    <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body>{notify.message ? notify.message : ""}</Toast.Body>
                </Toast>
            </ToastContainer>

            <Content>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3" style={{width: "100%"}}>
                        <Form.Group as={Col} md="4" controlId="user-name">
                            <Form.Label>Họ tên</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Tên nhà cung cấp"
                                name="Ten"
                                value={user.HoTen}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">Tên không được để trống</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3" style={{width: "100%"}}>
                        <Form.Group as={Col} md="4" controlId="user-name">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email"
                                name="Email"
                                value={user.Email}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">Email không được để trống</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3" style={{width: "100%"}}>
                        <Form.Group as={Col} md="4" controlId="user-name">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                required
                                type="tel"
                                placeholder="Số điện thoại liên lạc"
                                name="SoDienThoai"
                                value={user.SoDienThoai}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">Số điện thoại không được để trống</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3" style={{width: "100%"}}>
                        <Form.Group as={Col} md="4" controlId="user-name">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control
                                type="date"
                                name="NgaySinh"
                                value={formatDateForInput(user.NgaySinh*1000)}
                                onChange={onChangeInput}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3" style={{width: "100%"}}>
                        <Form.Group as={Col} md="4" controlId="user-city">
                            <Form.Label>Tỉnh thành</Form.Label>
                            <Form.Select name="city" onChange={changeAddressHandler}>
                                <option value="">{user.TinhThanh}</option>
                                {
                                    listCity && listCity.map((city, index)=> {
                                        return <option key={index} value={`${city.code}-${city.name}`} >{city.name}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="user-district">
                            <Form.Label>Quận/Huyện:</Form.Label>
                            <Form.Select aria-label="Default select example" name="district" value={address.district} onChange={changeAddressHandler}>
                                <option value="">{user.QuanHuyen}</option>
                                {
                                    listDistrict && listDistrict.map((district, index)=> {
                                        return <option key={index} value={`${district.code}-${district.name}`} >{district.name}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="user-ward">
                            <Form.Label>Phường/Xã:</Form.Label>
                            <Form.Select aria-label="Default select example" name="ward" value={address.ward} onChange={changeAddressHandler}>
                                <option value="">{user.PhuongXa}</option>
                                {
                                    listWard && listWard.map((ward, index)=> {
                                        return <option key={index} value={`${ward.code}-${ward.name}`} >{ward.name}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3" style={{width: "100%"}}>
                        <Form.Group as={Col} md="4" controlId="user-home">
                            <Form.Label>Số nhà</Form.Label>
                            <Form.Control
                                type="text"
                                name="SoNha"
                                value={user.SoNha}
                                onChange={onChangeInput}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3" style={{width: "100%"}}>
                        <Form.Group as={Col} md="4" controlId="user-name">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select aria-label="" name="TrangThai" value={user.TrangThai} onChange={onChangeInput}>
                                <option value="0">Vô hiệu hóa</option>
                                <option value="1">Hoạt động</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Tên không được để trống</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="user-permission">
                            <Form.Label>Phân quyền</Form.Label>
                            <Form.Select aria-label="Default select example" name="permission" value={user.CapDoTaiKhoan} onChange={onChangeInput}>
                                <option value={user.CapDoTaiKhoan}>{user.CapDoTaiKhoan_Ten ? user.CapDoTaiKhoan_Ten : "User" }</option>
                                {
                                    permission && permission.map((item, index)=> {
                                        return <option key={index} value={item.id} >{item.Ten}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Chỉnh sửa</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default UpdateUser