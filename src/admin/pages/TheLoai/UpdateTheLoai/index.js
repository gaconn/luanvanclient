import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import {  useSearchParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import categoryAPI from "../../../services/API/categoryAPI";
import { Container, Content } from "./UpdateTheLoai.style";

const UpdateTheLoai = () => {
    const [validated, setValidated] = useState(false);
    const [category, setCategory] = useState([])
    const [notify, setNotify] = useState({show: false, message: ""})
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            const category_id = searchParams.get('id')
            console.log(category_id);
            if(!category_id) return

            const response = await categoryAPI.detail(category_id) 
            setCategory((category)=> {
                if(response && (!response.success || response.data.length === 0)) {
                    return []
                }
                return response.data[0]
            })
            setNotify((notify)=> {
                if(response && (!response.success || response.data.length === 0)) {
                    return {...notify, show: true, message: "Không tìm thấy dữ liệu", success: false}
                }
                return {...notify}
            })
            setLoading(false)
        }
        fetchData()
    }, [searchParams])
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

        const response = await categoryAPI.update(category)
        
        setNotify(() =>{ 
            if(!response) {
                return {...notify}
            }
            return {...notify, show: true, message: response.message, success: response.success}
        })
    };
    console.log(category);
    const onChangeInput = (e) => {
        setCategory((category)=> {
            return {...category,[e.target.name]: e.target.value}
        })
    }
    if(loading) {
        return <Loading />
    }
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
                        <Form.Group as={Col} md="4" controlId="category-name">
                            <Form.Label>Tên nhà cung cấp</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Tên nhà cung cấp"
                                name="Ten"
                                value={category.Ten}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">Tên không được để trống</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="category-name">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select aria-label="" name="TrangThai" value={category.TrangThai} onChange={onChangeInput}>
                                <option value="0">Không hoạt động</option>
                                <option value="1">Hoạt động</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Vui lòng chọn trạng thái</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Thêm mới</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default UpdateTheLoai