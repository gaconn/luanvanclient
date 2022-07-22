import { useState } from "react";
import { Button, Col, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import discountAPI from "../../../services/API/discountAPI";
import { Container, Content } from "./AddCampaign.style";

const AddCampaign = () => {
    const [validated, setValidated] = useState(false);
    const [discount, setDiscount] = useState({Ten:""})
    const [insertNotify, setInsertNotify] = useState({show: false, message: ""})

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
        const data = {...discount}
        data.ThoiGianBatDau = new Date(data.ThoiGianBatDau).getTime()/1000
        data.ThoiGianKetThuc = new Date(data.ThoiGianKetThuc).getTime()/1000
        const response = await discountAPI.insert(data)
        console.log(response);
        setInsertNotify(() =>{ 
            if(!response) {
                return {...insertNotify, show: true, message: "Không thể kết nối server", success: false}
            }
            return {...insertNotify, show: true, message: response.message, success: response.success, error: response.error}
        })
    };
  
    const onChangeInput = (e) => {
        setDiscount((discount)=> {
            return {...discount, [e.target.name]: e.target.value}
        })
    }
    return(
        <Container>
            <ToastContainer position="top-end" className="p-3">
                <Toast bg={insertNotify.success ? "success": "danger"} onClose={()=> setInsertNotify({...insertNotify, show: false})} show={insertNotify.show} delay={5000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Thông báo</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{insertNotify.error && insertNotify.length >0  ? insertNotify.error.join("-") : insertNotify.message}</Toast.Body>
                </Toast>
                
            </ToastContainer>

            <Content>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="discount-name">
                            <Form.Label>Tên chương trình khuyến mại</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Tên chương trình khuyến mại"
                                name="TenChuongTrinh"
                                value={discount.TenChuongTrinh}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">Tên không được để trống</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="discount-name">
                            <Form.Label>Giá trị giảm giá tối đa</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Giá trị giảm giá tối đa"
                                name="GiaChietKhauToiDa"
                                value={discount.GiaChietKhauToiDa}
                                onChange={onChangeInput}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="discount-name">
                            <Form.Label>Giá trị đơn hàng tối thiểu</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Giá trị đơn hàng tối thiểu"
                                name="DieuKienGiaToiThieu"
                                value={discount.DieuKienGiaToiThieu}
                                onChange={onChangeInput}
                                min={0}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="discount-name">
                            <Form.Label>Giá trị đơn hàng tối đa</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Giá trị đơn hàng tối đa"
                                name="DieuKienGiaToiDa"
                                value={discount.DieuKienGiaToiDa}
                                onChange={onChangeInput}
                                min={0}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="discount-name">
                            <Form.Label>Số lượng đơn được giảm giá</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Số lượng đơn được giảm giá"
                                name="SoLuongSuDungToiDa"
                                value={discount.SoLuongSuDungToiDa}
                                onChange={onChangeInput}
                                min={0}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="discount-name">
                            <Form.Label>Thời gian bắt đầu chương trình</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                placeholder="Thời gian bắt đầu chương trình"
                                name="ThoiGianBatDau"
                                value={discount.ThoiGianBatDau}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">Vui lòng nhập thời gian bắt đầu chương trình</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="discount-name">
                            <Form.Label>Thời gian kết thúc chương trình</Form.Label>
                            <Form.Control
                                required
                                type="date"
                                placeholder="Thời gian kết thúc chương trình"
                                name="ThoiGianKetThuc"
                                value={discount.ThoiGianKetThuc}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">Vui lòng nhập thời gian bắt đầu chương trình</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="discount-name">
                            <Form.Label>ID phương thức thanh toán hưởng khuyến mại</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="ID phương thức thanh toán hưởng khuyến mại"
                                name="IDPhuongThucThanhToan"
                                value={discount.IDPhuongThucThanhToan}
                                onChange={onChangeInput}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="discount-name">
                            <Form.Label>ID sản phẩm hưởng khuyến mại</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="ID sản phẩm hưởng khuyến mại"
                                name="IDSanPham"
                                value={discount.IDSanPham}
                                onChange={onChangeInput}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="discount-name">
                            <Form.Label>{"Phần trăm giảm giá (%)"}</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Phần trăm giảm giá"
                                name="PhanTramChietKhau"
                                value={discount.PhanTramChietKhau}
                                onChange={onChangeInput}
                                min={0}
                                max={100}
                                disabled={discount.GiaTriChietKhau ? "true": ""}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="discount-name">
                            <Form.Label>{"Giá trị khuyến mãi (VND)"}</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Giá trị chiết khấu"
                                name="GiaTriChietKhau"
                                value={discount.GiaTriChietKhau}
                                onChange={onChangeInput}
                                disabled={discount.PhanTramChietKhau ? "true": ""}
                            />
                        </Form.Group>
                    </Row>
                    
                    <Button type="submit">Thêm mới</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default AddCampaign