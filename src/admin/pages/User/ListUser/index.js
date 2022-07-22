import {Container, Content } from './ListUser.style'


import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row, Table, Toast, ToastContainer } from 'react-bootstrap'
import Page from '../../../components/Page'
import FilterContainer from '../../../components/FilterContainer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import userAPI from '../../../services/API/userAPI'
import { LinkUserAction } from '../../../configs/define'
import { BsPencil } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { toTimeString } from '../../../services/utils/General'

const ListUser = () => {
    const [notify, setNotify] = useState({show: false, message: "", success: false})
    const [page, setPage] = useState({rowCount: 0, now: 1, next: null, prev: null})
    const [del, setDel] = useState({show: false, id: null})
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState([])
    let navigate = useNavigate()
    const [filter, setFilter] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const fetchUser = async(objCondition) => {
        setLoading(true)
        const userResponse = await userAPI.getList(objCondition)
        console.log(userResponse);
        setUser(userResponse.data[0])
        setNotify((notify)=> {
            if(!userResponse.success) {
                return {show: true, message: userResponse.message, success: userResponse.success}
            }
            return notify
        })
        setPage((page) => {
            if(userResponse.success) {
                if(userResponse.data[1] && userResponse.data[1].rowCount) {
                    let next = (page.now) * 10 < userResponse.data[1].rowCount ? page.now+1: null
                    let prev = page.now > 1 ? page.now -1 : null
                    return {...page,rowCount: userResponse.data[1].rowCount, next, prev}       
                }
            }
            return {...page}
        })
        setLoading(false)
    }
    useEffect(()=> {
        const objCondition = {page: page.now}
        const id = searchParams.get('id')
        const email = searchParams.get('Email')
        const TrangThai = searchParams.get('TrangThai')
        if(id) {
            objCondition.id = id
        }
        if(email) {
            objCondition.Email = email
        }
        if(TrangThai) {
            objCondition.TrangThai = TrangThai
        }
        fetchUser(objCondition)
    },[page.now, searchParams])
    const onClickPageHandler = (e) => {
        const pageValue = e.target.innerText *1;
        const nextPage= pageValue *10 <page.rowCount ? pageValue + 1 : null
        const prevPage = pageValue > 1 ? pageValue -1 : null
        setPage({...page, now: pageValue, prev: prevPage, next: nextPage})
    }
    const handleDeleteAlertClose = () => {
        setDel({...del, show: false})
    }
    const handleDeleteAccept = async() => {
        const deleteUserResponse = await userAPI.delete(del.id)
        setDel({...del, show: false}) //ẩn dialog
        setNotify(() => {
            if(!deleteUserResponse || !deleteUserResponse.success) {
                return {...notify, show: true, message: "Có lỗi xảy ra. Vui lòng thử lại", success: false}
            }
            return {...notify, show: true, message: deleteUserResponse.message, success: deleteUserResponse.success, errors: deleteUserResponse.errors}
        })

        setUser(() => {
            if(deleteUserResponse.success) {
                var tmpUser = [...user.data]
                tmpUser= tmpUser.filter((item)=> item.id !== del.id)
                return {data: tmpUser, rowCount: user.rowCount -1}
                
            }
            return {...user}
        })
    }
    const onControlClick = (e, id, action) => {
        if(action === "update") {
            navigate(LinkUserAction.user_update+`?id=${id}`)
            return
        }

        setDel({...del, show: true, id: id})
    }

    // filter
    const searchHandler = () => {
        const dataFilter = {...filter}
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
                                    ID tài khoản
                                </Form.Label>
                                <Col>
                                    <Form.Control size="lg" type="text" placeholder="ID tài khoản" className="fs-6" name='id' value={filter.id ? filter.id : ""} onChange={changeFilterHandler}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="col-6">
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    Email
                                </Form.Label>
                                <Col>
                                    <Form.Control size="lg" type="text" placeholder="Email" className="fs-6" name='Email' value={filter.Email ? filter.Email : ""} onChange={changeFilterHandler}/>
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
                                        <option value="0">Vô hiệu hóa</option>
                                        <option value="1">Hoạt động</option>
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
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Ngày tạo</th>
                            <th>Trạng thái</th>
                            <th>Phân quyền</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user &&  user.map((item, index)=> {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.HoTen}</td>
                                        <td>{item.Email}</td>
                                        <td>{item.SoDienThoai}</td>
                                        <td>{toTimeString(item.ThoiGianTao *1000)}</td>
                                        <td className={item.TrangThai === 1 ? "text-primary": "text-danger"}>{item.TrangThai === 1 ? "Hoạt động" : "Vô hiệu hóa"}</td>
                                        <td>{item.CapDoTaiKhoan_Ten ? item.CapDoTaiKhoan_Ten : "User"}</td>
                                        <td className="d-flex">
                                            <span className="user-item-icon" onClick={(e)=> onControlClick(e,item.id, "update")}><BsPencil/></span>
                                            <span className="user-item-icon" onClick={(e)=> onControlClick(e,item.id, "delete")}><MdDelete/></span>
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
                show={del.show}
                onHide={handleDeleteAlertClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Cảnh báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        Bạn có chắc chắn muốn xóa ?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteAlertClose}>
                    Quay lại
                </Button>
                <Button variant="danger" onClick={handleDeleteAccept}>Xóa</Button>
                </Modal.Footer>
            </Modal>
        </Container>
  )
}

export default ListUser