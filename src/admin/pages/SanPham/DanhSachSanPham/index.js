import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row, Table, Toast, ToastContainer } from 'react-bootstrap'
import { BsPencil } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FilterContainer from '../../../components/FilterContainer'
import Loading from '../../../components/Loading'
import Page from '../../../components/Page'
import { LinkProductAction } from '../../../configs/define'
import productAPI from '../../../services/API/productAPI'
import { Container, Content } from './DanhSachSanPham.style'
const DanhSachSanPham = () => {
    const [product, setProduct] = useState([])
    const [notify, setNotify] = useState({show: false, message: "", success: false})
    const [page, setPage] = useState({rowCount: 0, now: 1, next: null, prev: null})
    const [del, setDel] = useState({show: false, id: null})
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filter, setFilter] = useState({})
    let navigate = useNavigate()
    const fetchProduct = async(objCondition) => {
        setLoading(true)
        const productResponse = await productAPI.getAll(objCondition)
        setProduct(productResponse.data)
        setNotify((notify)=> {
            if(!productResponse.success) {
                return {show: true, message: productResponse.message, success: productResponse.success}
            }
            return notify
        })
        setPage((page) => {
            if(productResponse.success) {
                if(productResponse.data.rowCount) {
                    let next = (page.now) * 10 < productResponse.data.rowCount ? page.now+1: null
                    let prev = page.now > 1 ? page.now -1 : null
                    return {...page,rowCount: productResponse.data.rowCount, next, prev}       
                }
            }
            return {...page}
        })
        setLoading(false)
    }
    useEffect(()=> {
        const objCondition = {page: page.now}
        const id = searchParams.get('id')
        const name = searchParams.get('name')
        const status = searchParams.get('status')
        const supplier = searchParams.get('supplier')
        const category = searchParams.get('category')

        if(id) {
            objCondition.id = id
        }
        if(name) {
            objCondition.Ten = name
        }
        if(status) {
            objCondition.TrangThai = status
        }
        if(supplier) {
            objCondition.IDNhaCungCap = supplier
        }
        if(category) {
            objCondition.IDTheLoai = category
        }
        fetchProduct(objCondition)
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
        const deleteProductResponse = await productAPI.delete(del.id)
        setDel({...del, show: false}) //ẩn dialog
        setNotify(() => {
            if(!deleteProductResponse || !deleteProductResponse.success) {
                return {...notify, show: true, message: "Có lỗi xảy ra. Vui lòng thử lại", success: false}
            }
            return {...notify, show: true, message: deleteProductResponse.message, success: deleteProductResponse.success, errors: deleteProductResponse.errors}
        })

        setProduct(() => {
            if(deleteProductResponse&&deleteProductResponse.success) {
                var tmpProduct = [...product.data]
                tmpProduct= tmpProduct.filter((item)=> item.id !== del.id)
                return {data: tmpProduct, rowCount: product.rowCount -1}
                
            }
            return {...product}
        })
    }
    const onControlClick = (e, id, action) => {
        if(action === "update") {
            navigate(LinkProductAction.product_update+`?id=${id}`, {replace:true})
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
            <FilterContainer handleSearch={searchHandler} handleUnsearch={unsearchHandler}>
                <Form className="filter-form p-4">
                    <Row className="mb-3">
                        <Col className='col-6'>
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    ID sản phẩm
                                </Form.Label>
                                <Col>
                                    <Form.Control size="lg" type="text" placeholder="ID sản phẩm" className="fs-6" name='id' value={filter.id ? filter.id : ""} onChange={changeFilterHandler}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="col-6">
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    Tên sản phẩm
                                </Form.Label>
                                <Col>
                                    <Form.Control size="lg" type="text" placeholder="Tên sản phẩm" className="fs-6" name='name' value={filter.name ? filter.name : ""} onChange={changeFilterHandler}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="col-6">
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    Trạng thái
                                </Form.Label>
                                <Col>
                                    <Form.Select aria-label="Default select example" defaultValue="" name="status" value={filter.status ? filter.status : ""} onChange={changeFilterHandler}>
                                        <option value="">Chọn trạng thái</option>
                                        <option value="0">Không hoạt động</option>
                                        <option value="1">Hoạt động</option>
                                    </Form.Select>
                                    
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col className="col-6">
                            <Row>
                                <Form.Label column="lg" lg={4} className="fs-6">
                                    ID nhà cung cấp
                                </Form.Label>
                                <Col>
                                    <Form.Control size="lg" type="text" placeholder="ID nhà cung cấp" className="fs-6" name='supplier' value={filter.supplier ? filter.supplier : ""} onChange={changeFilterHandler}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="col-6">
                            <Row>
                                <Form.Label column="lg" lg={3} className="fs-6">
                                    ID ngành hàng
                                </Form.Label>
                                <Col>
                                    <Form.Control size="lg" type="text" placeholder="ID ngành hàng" className="fs-6" name='category' value={filter.category ? filter.category : ""} onChange={changeFilterHandler}/>
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
                            <th>Tên</th>
                            <th>Hình</th>
                            <th>Trạng thái</th>
                            <th>Số lượng sản phẩm</th>
                            <th>Nhà cung cấp</th>
                            <th>Thể loại</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product && product.data && product.data.map && product.data.map((item, index)=> {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.Ten}</td>
                                        <td>{item.HinhAnh && JSON.parse(item.HinhAnh) && <img key={index} width="100" height={40} alt="product_image" src={`${process.env.REACT_APP_API_HOST_URL}/public/images/${JSON.parse(item.HinhAnh)[0]}`} />}</td>
                                        <td className={item.TrangThai === 1 ? "text-primary": "text-danger"}>{item.TrangThai === 1 ? "Hoạt động" : "Ngưng hoạt động"}</td>
                                        <td>{item.SoLuong}</td>
                                        <td>{item.NhaCungCap_Ten}</td>
                                        <td>{item.TheLoai_Ten}</td>
                                        <td className="d-flex">
                                            <span className="product-item-icon" onClick={(e)=> onControlClick(e,item.id, "update")}><BsPencil/></span>
                                            <span className="product-item-icon" onClick={(e)=> onControlClick(e,item.id, "delete")}><MdDelete/></span>
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

export default DanhSachSanPham