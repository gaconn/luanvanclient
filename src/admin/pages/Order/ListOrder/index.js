import { useEffect, useState } from "react";
import { Col, Form, Row, Table, Toast, ToastContainer } from "react-bootstrap";
import FilterContainer from "../../../components/FilterContainer";
import { Container, Content } from "./ListOrder.style";
import Page from "../../../components/Page";
import {AiOutlineFileSearch} from 'react-icons/ai'
import {useNavigate, useSearchParams} from "react-router-dom"
import { LinkOrderAction } from "../../../configs/define"
import Loading from "../../../components/Loading";
import orderAPI from "../../../services/API/orderAPI";
import { colorTextStatus, StatusOrder, toTimeString } from "../../../services/utils/General";
const ListOrder = () => {
    const [order, setOrder] = useState([])
    const [notify, setNotify] = useState({show: false, message: "", success: false})
    const [page, setPage] = useState({rowCount: 0, now: 1, next: null, prev: null})
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [orderFilter, setOrderFilter] = useState({})
    let navigate = useNavigate()
    const fetchOrder = async(objCondition) => {
        setLoading(true)
        const orderResponse = await orderAPI.getAll(objCondition)
        console.log(orderResponse);
        setOrder(() => {
            if(orderResponse && orderResponse.success && orderResponse.data && orderResponse.data[0]) {
                return orderResponse.data[0]
            }
            return []
        })
        setNotify((notify)=> {
            if(!orderResponse.success) {
                return {show: true, message: orderResponse.message, success: orderResponse.success}
            }
            return notify
        })
        setPage((page) => {
            if(orderResponse.success && orderResponse.data && orderResponse.data[1]) {
                if(orderResponse.data[1].rowCount) {
                    let next = (page.now) * 10 < orderResponse.data[1].rowCount ? page.now+1: null
                    let prev = page.now > 1 ? page.now -1 : null
                    return {...page,rowCount: orderResponse.data[1].rowCount, next, prev}       
                }
            }
            return {...page}
        })
        setLoading(false)
    }
    useEffect(()=> {
        const objCondition = {page: page.now} 
        const id = searchParams.get("id")
        const startDate = searchParams.get("startDate")
        const endDate = searchParams.get("endDate")
        const status = searchParams.get("TrangThai")
        if(id) {
            objCondition.id = id
        }
        if(startDate) {
            objCondition.startDate = startDate
        }
        if(endDate) {
            objCondition.endDate = endDate
        }
        if(status) {
            objCondition.TrangThai = status
        }
        fetchOrder(objCondition)
    },[page.now, searchParams])
    const onClickPageHandler = (e) => {
        const pageValue = e.target.innerText *1;
        const nextPage= pageValue *10 <page.rowCount ? pageValue + 1 : null
        const prevPage = pageValue > 1 ? pageValue -1 : null
        setPage({...page, now: pageValue, prev: prevPage, next: nextPage})
    }
    // filter
    const searchHandler = () => {
        const dataFilter = {...orderFilter}
        if(dataFilter.startDate) {
            dataFilter.startDate = new Date(dataFilter.startDate).getTime()/1000
        }
        if(dataFilter.endDate) {
            dataFilter.endDate = new Date(dataFilter.endDate).getTime()/1000
        }
        const condition = new URLSearchParams(dataFilter).toString()
        setSearchParams(condition)
    }

    const unsearchHandler = () => {
        setSearchParams("")
        setOrderFilter({})
    }
    
    const changeFilterHandler = (e) => {
        setOrderFilter((orderFilter)=> {
            return {...orderFilter, [e.target.name] : e.target.value}
        })
    }
    return (
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
            <FilterContainer handleSearch={searchHandler} handleUnsearch={unsearchHandler}>
                <Form className="filter-form p-4">
                    <Row className="mb-3">
                        <Col className='col-6'>
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    ID đơn hàng
                                </Form.Label>
                                <Col>
                                    <Form.Control size="lg" type="text" placeholder="ID đơn hàng" className="fs-6" name='id' value={orderFilter.id ? orderFilter.id : ""} onChange={changeFilterHandler}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <h4>Thời gian đặt hàng</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-3">
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label column="lg" lg={4} className="fs-6">
                                            Từ ngày
                                        </Form.Label>
                                            <Form.Control size="lg" type="date" placeholder="Large text" className="fs-6" name='startDate' value={orderFilter.startDate ? orderFilter.startDate : ""} onChange={changeFilterHandler}/>
                                    </Form.Group>
                                </Col>
                                <Col className="col-3">
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label column="lg" lg={4} className="fs-6">
                                            Đến ngày
                                        </Form.Label>
                                            <Form.Control size="lg" type="date" placeholder="Large text" className="fs-6" name='endDate' value={orderFilter.endDate ? orderFilter.endDate : ""} onChange={changeFilterHandler}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-6">
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    Trạng thái
                                </Form.Label>
                                <Col>
                                    <Form.Select aria-label="Default select example" defaultValue="" name="TrangThai" value={orderFilter.TrangThai ? orderFilter.TrangThai : ""} onChange={changeFilterHandler}>
                                        <option value="">Chọn trạng thái</option>
                                        <option value="0">{StatusOrder[0]}</option>
                                        <option value="1">{StatusOrder[1]}</option>
                                        <option value="2">{StatusOrder[2]}</option>
                                        <option value="3">{StatusOrder[3]}</option>
                                        <option value="4">{StatusOrder[4]}</option>
                                        <option value="5">{StatusOrder[5]}</option>
                                        <option value="6">{StatusOrder[6]}</option>
                                    </Form.Select>
                                    
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </FilterContainer>
            <Content>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thông tin đặt hàng</th>
                            <th>Trạng thái</th>
                            <th>Thời gian đặt hàng</th>
                            <th>Giá trị đơn hàng</th>
                            <th>Khuyến mãi</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order && order.map((item, index)=> {
                                
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>
                                            <span>{item.ThongTinDatHang && item.ThongTinDatHang.Email ? item.ThongTinDatHang.Email : item.TaiKhoan_Email}</span> <br/>
                                            <span>{item.ThongTinDatHang && item.ThongTinDatHang.SoDienThoai ? item.ThongTinDatHang.SoDienThoai : item.TaiKhoan_SoDienThoai}</span>
                                        </td>
                                        <td className={`text-${colorTextStatus[item.TrangThai]}`}>{StatusOrder[item.TrangThai]}</td>
                                        <td>{toTimeString(item.ThoiGianTao * 1000)}</td>
                                        <td>{item.TongGiaTriDonHang}</td>
                                        <td style={{color: "red"}}>{item.MaChietKhau ? item.MaChietKhau : "Không"}</td>
                                        <td className="d-flex" style={{height: "100%"}}>
                                            <span className="order-item-icon" onClick={()=>navigate(`${LinkOrderAction.order_detail}?id=${item.id}`)}><AiOutlineFileSearch/></span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Content>
            {page && <Page page={page} onClickPage={onClickPageHandler} />}
        </Container>
    )

}
export default ListOrder