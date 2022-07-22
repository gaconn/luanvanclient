import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartAPI from "../../services/API/Cart";
import ProducAPI from "../../services/API/ProductAPI";
import ImageDetail from "./image";
import uniqid from 'uniqid';
const DetailComponent = () => {
    const [Detail, setDetail] = useState([])
    const navigate = useNavigate()
    let id = localStorage.getItem('DetailID')
    const [cart, setCart] = useState({ SoLuong: 1 })
    const changeInput = (event) => {
        setCart({ ...cart, [event.target.name]: event.target.value })
    }

    const fetchProductDetail = async (id) => {
        const response = await ProducAPI.detail(id)
        const data = response.data
        if (response.success && response.error.length === 0) {
            setDetail(data)
            localStorage.removeItem('DetailID')
        }
        if (id === null && Detail.length === 0) {
            navigate('../Shop')
        }
    }
    useEffect(() => {
        fetchProductDetail(id)
    }, [])
    const ProductState = (state) => {
        var result = ''
        if (state.TrangThai != 1) {
            return result = "Hết hàng"
        }
        return result = "Còn hàng";
    }

    const handleInfoCart = async (item, CartSL) => {
        let SessionID=localStorage.getItem('SessionID')
        let UID = localStorage.getItem('UID')
        if (!SessionID && !UID) {
            let session = uniqid()
            localStorage.setItem('SessionID', session)
            SessionID = localStorage.getItem('SessionID')
        }
        const data = { IDSanPham: item.id, SoLuong: CartSL.SoLuong, SessionID: SessionID, IDTaiKhoan: UID }
        const addToCart = CartAPI.AddToCart(data)
    }



    return (
        <>
            {/* Product Details Section Begin */}
            <section className="product-details spad">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item">
                                    {
                                        Detail && Detail.HinhAnh &&
                                        <img
                                            className="product__details__pic__item--large"
                                            src={process.env.REACT_APP_API_IMAGE + Detail.HinhAnh[0]}
                                            alt=""
                                            style={{width:400,height:400}}
                                        />
                                    }
                                </div>
                                {/* Hình Ảnh Thêm */}



                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__text">
                                <h3>{Detail.Ten}</h3>
                                <div className="product__details__rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-half-o" />
                                    <span>(18 reviews)</span>
                                </div>
                                <div className="product__details__price">${Detail.GiaGoc * 2}</div>
                                <p>
                                    <b> Số Lượng:</b>{" "}
                                    <span>{Detail.SoLuong}</span>
                                </p>
                                <div className="product__details__quantity">
                                    <div className="quantity">
                                        <div className="pro-qty">
                                            <input type="nummber" name='SoLuong' min={1} defaultValue={1} onChange={changeInput} />
                                        </div>
                                    </div>

                                </div>
                                <a href='/Cart' className="primary-btn" onClick={() => handleInfoCart(Detail, cart)}>
                                    Thêm Vào Giỏ Hàng
                                </a>
                                <a href="#" className="heart-icon">
                                    <span className="icon_heart_alt" />
                                </a>
                                <ul>
                                    <li>
                                        <b>Tình Trạng</b> <span>{ProductState(Detail)}</span>
                                    </li>
                                    <li>
                                        <b>Giao Hàng</b>{" "}
                                        <span>
                                            trong 1 ngày.
                                        </span>
                                    </li>
                                    <li>
                                        <b>Cân nặng</b> <span>{Detail.CanNang}</span>
                                    </li>
                                    <li>
                                        <b>Chia sẻ</b>
                                        <div className="share">
                                            <a href="#">
                                                <i className="fa fa-facebook" />
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-twitter" />
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-instagram" />
                                            </a>
                                            <a href="#">
                                                <i className="fa fa-pinterest" />
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="product__details__tab">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            data-toggle="tab"
                                            href="#tabs-1"
                                            role="tab"
                                            aria-selected="true"
                                        >
                                            Mô tả
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                        <div className="product__details__tab__desc">
                                            <h6>Thông tin sản phẩm</h6>
                                            <p>
                                                {Detail.MoTa}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Product Details Section End */}
        </>

    );
}

export default DetailComponent;