import Category from "./CategoryCheckout";
import {FaHandHoldingUsd} from "react-icons/fa"
import {MdOutlinePayments} from "react-icons/md"
import { useEffect, useState } from "react";
import productAPI from "../../services/API/ProductAPI";
import {useNavigate, useSearchParams} from 'react-router-dom'
import {Form, Toast, ToastContainer} from "react-bootstrap"
import orderAPI from "../../services/API/orderAPI";
import cartAPI from "../../services/API/cartAPI";

const ChechOutComponent = () => {
    const [product, setProduct] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [notify, setNotify] = useState({show: false, message:""})
    const [validated, setValidated] = useState(false)
    const [order, setOrder] = useState({IDPhuongThucThanhToan: 1})
    const navigate = useNavigate()
    useEffect(()=> {
        const fetchProductDetail= async ()=> {
            const productID = searchParams.get('product_id')
            const fromCart = searchParams.get('from_cart')
            const SoLuong = searchParams.get('soluong')
            const IDTaiKhoan = localStorage.getItem('UID')
            const SessionID = localStorage.getItem('SessionID')
            const IDGioHang = searchParams.get('IDGioHang')
            var cartResponse 

            if(fromCart) { //nếu checkout từ cart
                cartResponse = await cartAPI.getCart({SessionID, IDTaiKhoan})
            }
            const response = await productAPI.getCheckoutList({id: productID, IDTaiKhoan, SessionID, fromCart})
            setNotify(noti=> {
                if(response && response.success && response.data) {
                    return noti
                }
                return {show: true, message: response.message, success: response.success}
            })

            setProduct(()=> {
                if(response && response.success && response.data) {
                    return response.data
                }
                return []
            })

            setOrder(()=> {
                if(response && response.success && response.data) {
                    return {IDSanPham: productID, IDTaiKhoan, SessionID, IDPhuongThucThanhToan:1,SoLuong, IDGioHang}
                }
                return {}
            })
        } 
        fetchProductDetail()
    },[searchParams])

    const checkoutButtonClickHandler = async(event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
            return
        }
        const response = await orderAPI.checkout(order)
        
        setNotify((noti) => {
            if(!response || !response.success) {
                return {show: true, message: "Đặt hàng không thành công. Không đủ sản phẩm trong kho", success: response.success}
            }
            return noti
        })

        if(response.success) {
            navigate("../checkout-success")
        }
    }
    const inputHandler = (e) => {
        setOrder((order)=> {
            return {...order, [e.target.name]: e.target.value}
        })
    }
    return (
        <>
            <ToastContainer position="bottom-end" className="p-3 position-fixed" style={{zIndex:"10"}}>
                <Toast bg={notify.success ? "success": "danger"} onClose={()=> setNotify({...notify, show: false})} show={notify.show} delay={3000} autohide>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Thông báo</strong>
                    <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body>{notify.message ? notify.message : ""}</Toast.Body>
                </Toast>
            </ToastContainer>
            {/* Checkout Section Begin */}
            <section className="checkout spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h6>
                                <span className="icon_tag_alt" /> Have a coupon?{" "}
                                <a href="#">Click here</a> to enter your code
                            </h6>
                        </div>
                    </div>
                    <div className="checkout__form">
                        <h4>Chi tiết đặt hàng</h4>
                        <Form noValidate validated={validated} onSubmit={checkoutButtonClickHandler}>
                            <div className="row">
                                {!localStorage.getItem("UID") ? 
                                <div className="col-lg-8 col-md-6">
                        
                                    <div className="checkout__input">
                                        <p>
                                            Email<span>*</span>
                                        </p>
                                        <input type="email" name="Email" value={order.Email} onChange={inputHandler} required/>
                                        <Form.Control.Feedback type="invalid">Vui lòng nhập email chính xác.</Form.Control.Feedback>
                                    </div>
                                    <div className="checkout__input">
                                        <p>
                                            Số điện thoại<span>*</span>
                                        </p>
                                        <input
                                            type="tel"
                                            placeholder="số điện thoại"
                                            className="checkout__input__add"
                                            name="SoDienThoai"
                                            required
                                            onChange={inputHandler}
                                            value={order.SoDienThoai}
                                        />
                                        <Form.Control.Feedback type="invalid">Vui lòng nhập số điện thoại. Số điện thoại được sử dụng để liên lạc khi hàng được giao tới.</Form.Control.Feedback>
                                    </div>
                                    <div className="checkout__input">
                                        <p>
                                            Tỉnh thành<span>*</span>
                                        </p>
                                        <input type="text" name="TinhThanh" required onChange={inputHandler} value={order.TinhThanh}/>
                                        <Form.Control.Feedback type="invalid">Vui lòng nhập địa chỉ tỉnh thành nhận hàng</Form.Control.Feedback>
                                    </div>
                                    <div className="checkout__input">
                                        <p>
                                            Quận huyện<span>*</span>
                                        </p>
                                        <input type="text" name="QuanHuyen" required onChange={inputHandler} value={order.QuanHuyen}/>
                                        <Form.Control.Feedback type="invalid">Vui lòng nhập quận/huyện nhận hàng</Form.Control.Feedback>
                                    </div>
                                    <div className="checkout__input">
                                        <p>
                                            Phường xã<span>*</span>
                                        </p>
                                        <input type="text" name="PhuongXa" required onChange={inputHandler} value={order.PhuongXa}/>
                                        <Form.Control.Feedback type="invalid">Vui lòng nhập phường/xã nhận hàng</Form.Control.Feedback>
                                    </div>
                                    <div className="checkout__input">
                                        <p>
                                            Số nhà<span>*</span>
                                        </p>
                                        <input type="text" name="SoNha" required onChange={inputHandler} value={order.SoNha}/>
                                        <Form.Control.Feedback type="invalid">Vui lòng nhập số nhà nhận hàng</Form.Control.Feedback>
                                    </div>
                                </div>
                                :
                                <div className="col-lg-8 col-md-6">
                                    <h4>Phương thức thanh toán</h4>

                                    <div className="d-flex checkout-payment" style={{fontSize:"1.2rem", width: "300px", justifyContent: "space-between"}}> 
                                        <input type="radio" name="IDPhuongThucThanhToan" id="directly" checked={order.IDPhuongThucThanhToan/1 === 1 ? "true": ""} required onChange={inputHandler} value={1}/>
                                        <label for="directly"><FaHandHoldingUsd/></label>
                                        <label for="directly">Thanh toán khi nhận hàng</label>
                                    </div>
                                    <div className="d-flex checkout-payment" style={{fontSize:"1.2rem", width: "300px", justifyContent: "space-between"}}>
                                        <input type="radio" name="IDPhuongThucThanhToan" id="online" checked={order.IDPhuongThucThanhToan/1 === 2 ? "true": ""} required onChange={inputHandler} value={2}/>
                                        <label for="online"><MdOutlinePayments/></label>
                                        <label for="online">Thanh toán qua ví Momo</label>
                                    </div>
                                    <Form.Control.Feedback type="invalid">Chọn phương thức thanh toán</Form.Control.Feedback>
                                </div>
                                }
                                <div className="col-lg-4 col-md-6">
                                    <Category data={product} SoLuong={searchParams.get('soluong')}/>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>
            {/* Checkout Section End */}
        </>

    );
}

export default ChechOutComponent;