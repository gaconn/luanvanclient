import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Toast, ToastContainer } from 'react-bootstrap';
import categoryAPI from '../../../services/API/categoryAPI';
import productAPI from '../../../services/API/productAPI';
import supplierAPI from '../../../services/API/supplierAPI';
import { Container, Content } from './SuaSanPham.style';
import {useSearchParams} from "react-router-dom"
import Image from '../../../components/Image';

const SuaSanPham = () => {
    const [validated, setValidated] = useState(false);
    const [product, setProduct] = useState([])
    const [insertNotify, setInsertNotify] = useState({show: false, message: ""})
    const [category, setCategory] = useState([])
    const [supplier, setSupplier] = useState([])
    const [searchParams, setSearchParams] = useSearchParams() 
    
    useEffect(()=> {
        const fetchCategory = async () => {
            const categoryDataResponse = await categoryAPI.getAll()

            setCategory(() => {
                if(!categoryDataResponse || !categoryDataResponse.success ||!categoryDataResponse.data ) {
                    return []
                }
                return categoryDataResponse.data.data
            })
        } 

        const fetchSupplier = async () => {
            const supplierDataResponse = await supplierAPI.getAll()
            setSupplier(() => {
                if(!supplierDataResponse || !supplierDataResponse.success || !supplierDataResponse.data) {
                    return []
                }
                return supplierDataResponse.data.data
            })
        }

        const fetchDetailProduct = async () => {
            const id = searchParams.get('id')
            const detailProduct = await productAPI.detail(id)
            setProduct(()=> {
                if(!detailProduct || !detailProduct.success ||!detailProduct.data ) {
                    return []
                }
                return detailProduct.data
            })

        }
        fetchCategory()
        fetchSupplier()
        fetchDetailProduct()
    },[])
    console.log(product);
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
        var isValidFile = true;
        if(product && product.file) {
            for (let i = 0; i < product.file.length; i++) {
                const type = product.file[i].type.split("/")[0]
    
                if(type !== "image") {
                    isValidFile = false
                }
            }
        }
        setInsertNotify((n) =>{ 
            if(!isValidFile) {
                return {show: true, message: "Định dạng file hình không hợp lệ", success: false}
            }
            return n
        })
        if(!isValidFile) return

        const arrObjKey = Object.keys(product)
        const formData = new FormData()
        for (let i = 0; i < arrObjKey.length; i++) {
            if(arrObjKey[i] === "file") {
                for (let index = 0; index < product[arrObjKey[i]].length; index++) {
                    formData.append('files', product[arrObjKey[i]][index])
                }
            } else if (arrObjKey[i] === 'HinhAnh') {
                formData.append(arrObjKey[i], JSON.stringify(product[arrObjKey[i]]))
            } else{
                formData.append(arrObjKey[i], product[arrObjKey[i]])
            }
        }
        const response = await productAPI.update(formData)
        
        setInsertNotify(() =>{ 
            if(!response) { 
                return {...insertNotify}
            }
            return {...insertNotify, show: true, message: response.message, success: response.success}
        })
    };
  
    const onChangeInput = (e) => {
        setProduct((p)=>({...p, [e.target.name]: e.target.value}))
    }

    const uploadFileHandler = (e) => {
        setProduct((p) => {
            return {...p, [e.target.name]: e.target.files}
        })
    }

    return(
        <Container>
            <ToastContainer position="top-end" className="p-3 position-fixed">
                <Toast bg={insertNotify.success ? "success": "danger"} onClose={()=> setInsertNotify({...insertNotify, show: false})} show={insertNotify.show} delay={3000} autohide>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Thông báo</strong>
                    <small className="text-muted">just now</small>
                </Toast.Header>
                <Toast.Body>{insertNotify.message ? insertNotify.message : ""}</Toast.Body>
                </Toast>
            </ToastContainer>

            <Content>
                <h3 className="text-center m-5">Thêm sản phẩm</h3>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className=" justify-content-center">
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="product-name">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Tên sản phẩm"
                                name="Ten"
                                value={product.Ten}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">Tên không được để trống</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}  controlId="product-name">
                            <Form.Label>Xuất xứ</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Xuất xứ"
                                name="XuatXu"
                                value={product.XuatXu}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">Xuất xứ không được để trống</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}  controlId="product-name">
                            <Form.Label>Kích thước</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Kích thước"
                                name="KichThuoc"
                                value={product.KichThuoc}
                                onChange={onChangeInput}
                            />
                        </Form.Group>

                        <Form.Group as={Col}  controlId="product-name">
                            <Form.Label>Cân nặng</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cân nặng"
                                name="CanNang"
                                value={product.CanNang}
                                onChange={onChangeInput}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}  controlId="product-name">
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Số lương"
                                name="SoLuong"
                                value={product.SoLuong}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">Số lượng không được để trống</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col}  controlId="product-name">
                            <Form.Label>Giá gốc</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Giá gốc"
                                name="GiaGoc"
                                value={product.GiaGoc}
                                onChange={onChangeInput}
                            />
                            <Form.Control.Feedback type="invalid">Giá không được để trống</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}  controlId="product-name">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                    as="textarea"
                                    placeholder="Hãy nhập thông tin mô tả về sản phẩm này."
                                    style={{ height: "100px" }}
                                    name="MoTa"
                                    value={product.MoTa}
                                    onChange={onChangeInput}
                                />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}  controlId="product-name">
                            <Form.Label>Thể loại</Form.Label>
                            <Form.Select 
                                required
                                name="IDTheLoai"
                                value={product.IDTheLoai}
                                onChange={onChangeInput}
                            >
                                <option value="">Chọn ngành hàng</option>
                                {
                                    category&& category.length > 0 && category.map((item, index)=> {
                                        return <option value={item.id} key={index}>{item.Ten}</option>
                                    })
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Vui lòng chọn ngành hàng</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}  controlId="product-name">
                            <Form.Label>Nhà cung cấp</Form.Label>
                            <Form.Select 
                                required
                                name="IDNhaCungCap"
                                value={product.IDNhaCungCap}
                                onChange={onChangeInput}
                            >
                                <option value="">Chọn nhà cung cấp</option>
                                {
                                    supplier && supplier.length >0&& supplier.map((item, index) => {
                                        return <option value={item.id} key={index}>{item.Ten}</option>
                                    })
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Vui lòng chọn nhà cung cấp</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        {
                            product.HinhAnh && product.HinhAnh.map((item, index)=> {
                                return <img src={`${process.env.REACT_APP_API_HOST_URL}/public/images/${item}`} className="product-images" alt="product"/>
                            })
                        }
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}  controlId="product-name">
                            <Form.Label>Hình ảnh</Form.Label>
                            <Form.Control type="file" name='file' multiple onChange={uploadFileHandler}/>
                        </Form.Group>
                    </Row>
                    <Button type="submit">Sửa thông tin</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default SuaSanPham