import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import imgIcon from '../../assets/img/icon/icon2.png'
import CustommerAPI from "../../services/API/CustomerAPI";
import addressAPI from "../../../admin/services/API/addressAPI";
import Loading from "../Loading";
import { formatDateForInput } from "../../services/utils/GenerateUtil";
import Alert from 'react-bootstrap/Alert';
const ValidateCheckout = () => {
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState([])
    const [notify, setNotify] = useState({ show: false, message: "" })
    const [searchParams, setSearchParams] = useSearchParams()
    const [listCity, setListCity] = useState([])
    const [listDistrict, setListDistrict] = useState([])
    const [listWard, setListWard] = useState([])
    const [address, setAddress] = useState({ city: "", district: "", ward: "" })
    const navigate = useNavigate()
    const user_id = searchParams.get('updateID')
    const fetchData = async (user_id) => { 
        if (!user_id) {
            return
        }
        const response = await CustommerAPI.getCustomerDetail({ id: user_id })
        setUser((user) => {
            if (response && (!response.success || response.data.length === 0)) {
                return user
            }
            return response.data[0]
        })
        setNotify((notify) => {
            if (response && (!response.success || response.data.length === 0)) {
                return { ...notify, show: true, message: "Không tìm thấy dữ liệu", success: false }
            }
            return { ...notify }
        })
    }
    useEffect(() => {
        fetchData(user_id)
    }, [searchParams])
    //City
    useEffect(() => {
        const fetAllCity = async () => {
            const response = await addressAPI.getAllCity()
            setNotify((notify) => {
                if (!response) {
                    return { show: true, message: "Không thể lấy dữ liệu tỉnh thành", success: false }
                }
                return notify
            })
            setListCity((listCity) => {
                if (response)
                    return response
                return listCity
            })
        }
        fetAllCity()
    }, [])
    //District
    useEffect(() => {
        const fetchDistrict = async () => {
            var response
            if (address.city !== '') {
                let arrData = address.city.split("-")
                let code = arrData ? arrData[0] : 1
                response = await addressAPI.getDistrictByCityCode({ code: code })
            }

            setListDistrict((district) => {
                if (response && response.districts) {
                    return response.districts
                }
                return []
            })
        }
        fetchDistrict()
    }, [address.city])
    //Ward
    useEffect(() => {
        const fetchWard = async () => {
            var response
            if (address.district !== '') {
                let arrData = address.district.split("-")
                let code = arrData ? arrData[0] : 1
                response = await addressAPI.getWardByDistrictCode({ code })
            }
            setListWard((ward) => {
                if (response && response.wards) {
                    return response.wards
                }
                return []
            })
        }
        fetchWard()
    }, [address.district])

  
    //get input
    const onChangeInput = (e) => {
        setUser((user) => {
            if (e.target.name === "NgaySinh") {
                return { ...user, [e.target.name]: new Date(e.target.value).getTime() / 1000 }
            }
            return { ...user, [e.target.name]: e.target.value }
        })
    }
    // Address
    const changeAddressHandler = (e) => {
        console.log(e.target.value)
        setAddress((arr) => {
            if (e.target.name === 'city')
                return { ...arr, [e.target.name]: e.target.value, district: "", ward: "" }
            if (e.target.name === 'district')
                return { ...arr, [e.target.name]: e.target.value, ward: "" }
            return { ...arr, [e.target.name]: e.target.value }
        })
    }
    //Submit
    const handleSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget;
        var isValid = true
        if (form.checkValidity() === false) {
            isValid = false
        }
        setValidated(true);
        if (!isValid) return
        if (address.city) {
            const arrCity = address.city.split('-')
            const strCity = arrCity && arrCity[1] ? arrCity[1] : ""
            user.TinhThanh = strCity
        }
        if (address.district) {
            const arrDistrict = address.district.split('-')
            const strDistrict = arrDistrict && arrDistrict[1] ? arrDistrict[1] : ""
            user.QuanHuyen = strDistrict
        }
        if (address.ward) {
            const arrWard = address.ward.split('-')
            const strWard = arrWard && arrWard[1] ? arrWard[1] : ""
            user.PhuongXa = strWard
        }
        const response = await CustommerAPI.updateInformation(user)

        setNotify(() => {
            if (!response) {
                return { ...notify }
            }
            return { ...notify, show: true, message: response.message, success: response.success }
        })
        setTimeout(() => {
            navigate(`?id=${user_id}`)
        }, 2000)

    }



    return (
        <>
            <Container >
                <Alert variant={notify.success ? "success" : "danger"} onClose={() => setNotify({ ...notify, show: false })} show={notify.show} dismissible >
                    <Alert.Heading>Thông Tin Khách Hàng</Alert.Heading>
                    <p>
                        {notify.message ? notify.message : ""}
                    </p>
                </Alert>
                <Row>
                    <Col ><h3><b style={{ color: "red", textAlign: "center" }}>Thông Tin Khách Hàng</b></h3></Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col xs={8}>

                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3" style={{ width: "100%" }}>
                                <Form.Group as={Col} md="6" controlId="user-name">
                                    <Form.Label>Họ tên</Form.Label>
                                    <Form.Control
                                        required
                                        onChange={onChangeInput}
                                        type="text"
                                        placeholder="Họ tên"
                                        name="HoTen"
                                        value={user.HoTen ? user.HoTen : ""}
                                    />
                                    <Form.Control.Feedback type="invalid">Tên không được để trống</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="user-name">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control
                                        required
                                        onChange={onChangeInput}
                                        type="tel"
                                        placeholder="Số điện thoại liên lạc"
                                        name="SoDienThoai"
                                        value={user.SoDienThoai ? user.SoDienThoai : ""}

                                    />
                                    <Form.Control.Feedback type="invalid">Số điện thoại không được để trống</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3" style={{ width: "100%" }}>
                                <Form.Group as={Col} md="6" controlId="user-name">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        onChange={onChangeInput}
                                        type="email"
                                        placeholder="Email"
                                        name="Email"
                                        value={user.Email ? user.Email : ""}
                                    />
                                    <Form.Control.Feedback type="invalid">Email không được để trống</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="user-name">
                                    <Form.Label>Ngày sinh</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="NgaySinh"
                                        value={formatDateForInput(user.NgaySinh * 1000) ? formatDateForInput(user.NgaySinh * 1000) : " "}
                                        onChange={onChangeInput}
                                    />
                                </Form.Group>

                            </Row>
                            <Row className="mb-3" style={{ width: "100%" }}>
                                <Form.Group as={Col} md="6" controlId="user-city">
                                    <Form.Label>Tỉnh thành</Form.Label>
                                    <Form.Select name="city" onChange={changeAddressHandler}>
                                        <option value=" ">{user.TinhThanh?user.TinhThanh:' '}</option>
                                        {
                                            listCity && listCity.map((city, index) => {
                                                return <option key={index} value={`${city.code}-${city.name}`} >{city.name}</option>
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="user-district">
                                    <Form.Label>Quận/Huyện:</Form.Label>
                                    <Form.Select aria-label="Default select example" name="district" onChange={changeAddressHandler}>
                                        <option value=" ">{user.QuanHuyen ? user.QuanHuyen:' '}</option>
                                        {
                                            listDistrict && listDistrict.map((discrict, k) => {
                                                return <option key={k} value={`${discrict.code}-${discrict.name}`}>{discrict.name}</option>
                                            })
                                        }

                                    </Form.Select>
                                </Form.Group>

                            </Row>
                            <Row className="mb-3" style={{ width: "100%" }}>
                                <Form.Group as={Col} md="6" controlId="user-ward">
                                    <Form.Label>Phường/Xã:</Form.Label>
                                    <Form.Select aria-label="Default select example" name="ward" onChange={changeAddressHandler}>
                                        <option value=" ">{user.PhuongXa ? user.PhuongXa:' '}</option>
                                        {
                                            listWard && listWard.map((ward, index) => {
                                                return <option key={index} value={`${ward.code}-${ward.name}`} >{ward.name}</option>
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="user-home">
                                    <Form.Label>Số nhà</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="SoNha"
                                        value={user.SoNha ? user.SoNha : " "}
                                        onChange={onChangeInput}
                                    />
                                </Form.Group>
                            </Row>
                            <Button type="submit">Cập Nhật</Button>
                        </Form>
                    </Col>
                    <Col xs={4}>
                        <Row></Row>
                        <Row> <Col><img src={imgIcon} /></Col></Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ValidateCheckout;