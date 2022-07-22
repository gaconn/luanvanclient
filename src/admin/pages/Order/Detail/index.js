import {Container, Content } from "./Detail.style"


import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router-dom"
import orderAPI from "../../../services/API/orderAPI"
import {Row, Col, InputGroup, Form, DropdownButton, Dropdown, Modal, Button, ToastContainer, Toast} from 'react-bootstrap'
import {FaShippingFast} from "react-icons/fa"
import { StatusOrder } from "../../../services/utils/General"

const Detail = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [notify, setNotify] = useState({show: false, message: "", success: false})
    const [orderDetail, setOrderDetail] = useState([])
    const [modal,setModal] = useState({show: false})
    const fetchDetail = async () => {
        const IDDonHang = searchParams.get('id')
        const response = await orderAPI.getDetail({IDDonHang: IDDonHang})
        setNotify((noti)=> {
            if(!response || !response.success) {
                return {show: true, message: response.message, success: response.success}
            }
            return noti
        })
        setOrderDetail((od)=>{
            if(response && response.success && response.data) {
                return response.data
            }
            return od
        })
    }
    useEffect(()=> {
        fetchDetail()
    },[])
    console.log(orderDetail);

    const handleChangeAlertClose = () => {
        setModal({...modal, show: false})
    }
    const handleChangeAccept = async() => {
        setModal({...modal, show: false}) //ẩn dialog

        setNotify((notify) => {
            if(modal.TrangThai < orderDetail.TrangThai) {
                return {show: true, message: 'Không thể quay lại trạng thái trước', success: false}
            }
            return notify
        })

        if(modal.TrangThai < orderDetail.TrangThai) {
            console.log('fail');
            return
        }

        const response = await orderAPI.changeStatus({id: orderDetail.IDDonhang, TrangThai: modal.TrangThai})

        setNotify((notify) => {
            if(response) {
                return {show: true, message: response.message, success: response.success}
            }
            return notify
        })
        fetchDetail()
    }
    const onControlClick = (e, status) => {

        setModal({...modal, show: true, TrangThai: status})
    }
  return (
    <Container>
        <ToastContainer position="top-end" className="p-3 position-fixed">
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
            <div className="order-section">
                <h3>Chức năng</h3>
                <ul className="order-function-list">
                    <li> <FaShippingFast/>Sửa địa chỉ giao hàng</li>
                </ul>
            </div>

            <div className="d-flex order-info order-section">
                <div>
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

            <div className="order-section">
                <Row className="order-item-list-title">
                    <Col>STT</Col>
                    <Col>Mã sản phẩm</Col>
                    <Col>Hình ảnh</Col>
                    <Col>Tên sản phẩm</Col>
                    <Col>Số lượng</Col>
                    <Col>Giá gốc</Col>
                    <Col>Phí vận chuyển</Col>
                    <Col>Phụ phí</Col>
                    <Col>Tổng cộng</Col>
                </Row>
                {
                    orderDetail && orderDetail.List && orderDetail.List.map((item, index)=> {
                        return (
                            <Row key={index} className="order-item-value">
                                <Col>{index}</Col>
                                <Col>{item.id}</Col>
                                <Col><img src={item.SanPham_HinhAnh&& JSON.parse(item.SanPham_HinhAnh) && `${process.env.REACT_APP_API_HOST_URL}/public/images/${JSON.parse(item.SanPham_HinhAnh)[0]}`} alt="hình ảnh"/></Col>
                                <Col>{item.SanPham_Ten}</Col>
                                <Col>{item.SoLuong}</Col>
                                <Col>{item.SanPham_GiaGoc && item.SanPham_GiaGoc.toLocaleString('en-US')} VND</Col>
                                <Col>{item.PhiVanChuyen && item.PhiVanChuyen.toLocaleString('en-US')} VND</Col>
                                <Col>{0}</Col>
                                <Col>{item.ThanhTien && item.ThanhTien.toLocaleString('en-US')} VND
                                
                                </Col>
                            </Row>
                        )
                    })
                }
                
            </div>

            <div className="order-section order-bill-list">
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
                <InputGroup className="mb-3">
                    <DropdownButton
                    variant="outline-secondary"
                    title={StatusOrder[orderDetail.TrangThai]}
                    id="input-group-dropdown-2"
                    align="end"
                    >
                    <Dropdown.Item href="#" onClick={(e)=>onControlClick(e, 0)}>{StatusOrder[0]}</Dropdown.Item>
                    <Dropdown.Divider />

                    <Dropdown.Item href="#" onClick={(e)=>onControlClick(e, 1)}>{StatusOrder[1]}</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#" onClick={(e)=>onControlClick(e, 2)}>{StatusOrder[2]}</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#" onClick={(e)=>onControlClick(e, 3)}>{StatusOrder[3]}</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#" onClick={(e)=>onControlClick(e, 4)}>{StatusOrder[4]}</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#" onClick={(e)=>onControlClick(e, 5)}>{StatusOrder[5]}</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#" onClick={(e)=>onControlClick(e, 6)}>{StatusOrder[6]}</Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
            </div>
            <Modal
                show={modal.show}
                onHide={handleChangeAlertClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Cảnh báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sau khi thay đổi trạng thái bạn sẽ không thể quay lại trạng thái trước. Bạn có chắc chắn muốn thay đổi không ?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleChangeAlertClose}>
                    Quay lại
                </Button>
                <Button variant="danger" onClick={handleChangeAccept}>Xác nhận</Button>
                </Modal.Footer>
            </Modal>
        </Content>
    </Container>
  )
}

export default Detail