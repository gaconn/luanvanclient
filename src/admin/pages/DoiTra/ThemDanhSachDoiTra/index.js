import { useEffect, useState } from "react";
import { Button, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import orderAPI from "../../../services/API/orderAPI";
import orderExchangeAPI from "../../../services/API/orderExchangeAPI";
import { StatusOrder } from "../../../services/utils/General";
import { Container, Content } from "./ThemDanhSachDoiTra.style";

const ThemDanhSachDoiTra = () => {
    const [validated, setValidated] = useState(false);
    const [orderExchange, setOrderExchange] = useState({Ten:""})
    const [notify, setNotify] = useState({show: false, message: ""})
    const [orderDetail, setOrderDetail] = useState()
    const [searchParams, setSearchParams] = useSearchParams()

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

        const response = await orderExchangeAPI.insert(orderExchange)
        
        setNotify(() =>{ 
            if(!response) {
                return {...notify}
            }
            return {...notify, show: true, message: response.message, success: response.success}
        })
        fetchDetail()
    };
  
    const onChangeInput = (e) => {
        setOrderExchange((orderExchange)=> {
            return {...orderExchange, [e.target.name]: e.target.value}
        })
    }

    const onChangeIDInput = async (e) => {
        setSearchParams({IDDonHang: e.target.value})
        setOrderExchange((orderExchange) => {
            return {...orderExchange, [e.target.name]: e.target.value}
        })
    }
    //detail order
    const fetchDetail = async () => {
        var response 
        if(searchParams.get("IDDonHang")) {
             response = await orderAPI.getDetail({IDDonHang: searchParams.get("IDDonHang")})
        }
        
        setOrderDetail((od)=>{
            if(response && response.success && response.data) {
                return response.data
            }
            return {IDDonHang: 0}
        })
    }
    useEffect(()=> {
        fetchDetail()
    }, [searchParams])
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
                    <Row className="mb-3">
                        <Form.Group  controlId="orderExchange-order-id">
                            <Form.Label>ID đơn hàng</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="ID đơn hàng"
                                name="IDDonHang"
                                value={orderExchange.IDDonHang}
                                onChange={onChangeIDInput}
                            />
                            <Form.Control.Feedback type="invalid">Vui lòng nhập ID đơn hàng</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group controlId="orderExchange-reason">
                            <Form.Label>Lý do</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Lý do đổi trả"
                                name="LyDo"
                                value={orderExchange.LyDo}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">Vui lòng nhập lý do đổi hàng</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group controlId="orderExchange-phuphi">
                            <Form.Label>Phụ phí</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Số tiền phụ phí"
                                name="PhuPhi"
                                value={orderExchange.PhuPhi}
                                onChange={onChangeInput}
                            />
                        </Form.Group>
                    </Row>
                    <Button type="submit">Thêm mới</Button>
                </Form>
                {orderDetail && orderDetail.IDDonhang ? <div className="p-4">
                    <div className="d-flex order-info order-section p-2">
                        <div className="pr-3">
                            <h3>Thông tin đặt hàng</h3>
                            <div><span>Họ tên: </span> {orderDetail.HoTen ? orderDetail.HoTen : ""}</div>
                            <div><span>Email: </span> {orderDetail.Email ? orderDetail.Email : (orderDetail.ThongTinDatHang && orderDetail.ThongTinDatHang.Email)}</div>
                            <div><span>Số điện thoại: </span> {orderDetail.SoDienThoai ? orderDetail.SoDienThoai : (orderDetail.ThongTinDatHang && orderDetail.ThongTinDatHang.SoDienThoai)}</div>
                            <div><span>Địa chỉ giao hàng: </span> {orderDetail.TinhThanh ? `${orderDetail.SoNha}, ${orderDetail.PhuongXa}, ${orderDetail.QuanHuyen}, ${orderDetail.TinhThanh}`:
                                (orderDetail.ThongTinDatHang  && `${orderDetail.ThongTinDatHang.SoNha}, ${orderDetail.ThongTinDatHang.PhuongXa}, ${orderDetail.ThongTinDatHang.QuanHuyen}, ${orderDetail.ThongTinDatHang.TinhThanh}`)
                            }</div>
                        </div>
                        <div>
                            <h3>Thông tin đơn hàng</h3>
                            <div><span>Mã đơn hàng: </span> {orderDetail.MaDonHang}</div>
                            <div><span>Ngày đặt hàng: </span> {new Date(orderDetail.ThoiGianTao*1000).toLocaleDateString()}</div>
                            <div><span>Trạng thái: </span> {StatusOrder[orderDetail.TrangThai]}</div>
                            <div><span>Hình thức thanh toán: </span> {orderDetail.IDPhuongThucThanhToan === 1 ? "Thanh toán khi nhận hàng": "Thanh toán qua momo"}</div>
                        </div>
                    </div>
                    <div className="order-section p-2 order-bill-list">
                        <div>
                            <h3>Chi phí đơn hàng</h3>
                            <div className="order-bill">
                                <span>Số  sản phẩm</span>
                                <span>{orderDetail && orderDetail.List && orderDetail.List.length ? orderDetail.List.length: 0}</span>
                            </div>
                            <div className="order-bill">
                                <span>Tổng phí vận chuyển</span>
                                <span>+ {orderDetail.TongPhiVanChuyen ? orderDetail.TongPhiVanChuyen.toLocaleString('en-US') : 0} VND</span>
                            </div>
                            <div className="order-bill">
                                <span>Phụ phí</span>
                                <span>+ {orderDetail.PhuPhi ? orderDetail.PhuPhi.toLocaleString('en-US') : 0} VND</span>
                            </div>
                            <div className="order-bill">
                                <span>Tổng giá trị chiết khấu</span>
                                <span>- {orderDetail.TongGiaTriChietKhau ? orderDetail.TongGiaTriChietKhau.toLocaleString('en-US') : 0} VND</span>
                            </div>
                            
                            <div className="order-bill order-total">
                                <span>Tổng thành tiền</span>
                                <span>{orderDetail.TongThanhTien ? orderDetail.TongThanhTien.toLocaleString('en-US') : 0} VND</span>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="text-danger">
                    {
                        orderExchange && orderExchange.IDDonHang ? "Không tìm thấy đơn hàng" : ""
                    }    
                </div>
                }
            </Content>
        </Container>
    )
}

export default ThemDanhSachDoiTra