import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Form, Modal, Row, Table, Toast, ToastContainer } from 'react-bootstrap'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { FaShippingFast } from 'react-icons/fa'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FilterContainer from '../../../components/FilterContainer'
import Loading from '../../../components/Loading'
import Page from '../../../components/Page'
import { LinkOrderAction } from '../../../configs/define'
import orderExchangeAPI from '../../../services/API/orderExchangeAPI'
import { colorTextStatus, StatusOrder, toTimeString } from '../../../services/utils/General'
import {Container, Content } from './DanhSachDoiTra.style'

const DanhSachDoiTra = () => {
    const [order, setOrder] = useState([])
    const [notify, setNotify] = useState({show: false, message: "", success: false})
    const [page, setPage] = useState({rowCount: 0, now: 1, next: null, prev: null})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({show: false})
    const [filter,setFilter] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    let navigate = useNavigate()
    const fetchOrder = async(objCondition) => {
        setLoading(true)
        const orderResponse = await orderExchangeAPI.getList(objCondition)
        setOrder(() => {
            if(orderResponse && orderResponse.success && orderResponse.data && orderResponse.data) {
                return orderResponse.data
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
        const objCondition = {page: page.now, joinOrder:true}
        const id = searchParams.get("id")
        const IDDonHang = searchParams.get('IDDonHang')
        const startDate = searchParams.get("startDate")
        const endDate = searchParams.get("endDate")
        const status = searchParams.get("TrangThai")
        if(id) {
            objCondition.id = id
        }
        if(IDDonHang) {
            objCondition.IDDonHang= IDDonHang
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

    const handleChangeStatus = async() => {
        const updateResponse = await orderExchangeAPI.changeStatus({id:message.id, TrangThai: message.TrangThai*1 +1})
        setNotify(()=> {
            if(!updateResponse) {
                return {show: true, message: "kết nối server thất bại", success: false}
            }
            return {show: true, message: updateResponse.message, success: updateResponse.success}
        })
        setMessage({show:false})
        fetchOrder()
    }
    const handleMessageClose = () => {
        setMessage({show: false})
    }
    // filter
    const searchHandler = () => {
        const dataFilter = {...filter}
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
        setFilter({})
    }

    const changeFilterHandler = (e) => {
        setFilter((filter)=> {
            return {...filter, [e.target.name] : e.target.value}
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
                                    ID đơn đổi trả
                                </Form.Label>
                                <Col>
                                    <Form.Control size="lg" type="text" placeholder="ID đơn đổi trả" className="fs-6" name='id' value={filter.id ? filter.id : ""} onChange={changeFilterHandler}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="col-6">
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    ID đơn hàng
                                </Form.Label>
                                <Col>
                                    <Form.Control size="lg" type="text" placeholder="ID đơn hàng" className="fs-6" name='IDDonHang' value={filter.IDDonHang ? filter.IDDonHang : ""} onChange={changeFilterHandler}/>
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
                                            <Form.Control size="lg" type="date" placeholder="Large text" className="fs-6" name='startDate' value={filter.startDate ? filter.startDate : ""} onChange={changeFilterHandler}/>
                                    </Form.Group>
                                </Col>
                                <Col className="col-3">
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label column="lg" lg={4} className="fs-6">
                                            Đến ngày
                                        </Form.Label>
                                            <Form.Control size="lg" type="date" placeholder="Large text" className="fs-6" name='endDate' value={filter.endDate ? filter.endDate : ""} onChange={changeFilterHandler}/>
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
                                    <Form.Select aria-label="Default select example" defaultValue="" name="TrangThai" value={filter.TrangThai ? filter.TrangThai : ""} onChange={changeFilterHandler}>
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
                            <th>ID đơn đổi trả</th>
                            <th>ID đơn hàng</th>
                            <th>Trạng thái</th>
                            <th>Thời gian tạo đơn</th>
                            <th>Giá trị đơn hàng</th>
                            <th>Phụ phí</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order && order.map((item, index)=> {
                                
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.IDDonHang}</td>
                                        <td className={`text-${colorTextStatus[item.DonHang_TrangThai]}`}>{StatusOrder[item.DonHang_TrangThai]}</td>
                                        <td>{toTimeString(item.ThoiGianTao * 1000)}</td>
                                        <td>{item.DonHang_TongGiaTriDonHang.toLocaleString('en-US')} VND</td>
                                        <td style={{color: "red"}}>{item.DonHang_PhuPhi ? item.DonHang_PhuPhi : "Không"}</td>
                                        <td className="d-flex" style={{height: "100%"}}>
                                            <span className="order-item-icon" onClick={()=>navigate(`${LinkOrderAction.order_detail}?id=${item.id}`)}><AiOutlineFileSearch/></span>
                                            {item.DonHang_TrangThai ===1 && <span className="order-item-icon" onClick={()=>setMessage({show: true, id: item.id, DonHang_TrangThai: item.DonHang_TrangThai})}><FaShippingFast/></span>}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Content>
            {page && <Page page={page} onClickPage={onClickPageHandler} />}
            <Modal
                show={message.show}
                onHide={handleMessageClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Xác nhận thay đổi trang thái đơn hàng ?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleMessageClose}>
                    Quay lại
                </Button>
                <Button variant="danger" onClick={handleChangeStatus}>Chấp nhận</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default DanhSachDoiTra