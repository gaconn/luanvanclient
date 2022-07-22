import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row, Spinner, Table, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { LinkCategoryAction } from "../../../configs/define";
import categoryAPI from "../../../services/API/categoryAPI";
import { Container, Content } from "./DanhSachTheLoai.style";
import Tree from "../../../components/Tree";

const DanhSachTheLoai = () => {
    const [category, setCategory] = useState([]);
    const [notify, setNotify] = useState({
        show: false,
        message: "",
        success: false,
    });
    const [del, setDel] = useState({ show: false, id: null });
    const [loading, setLoading] = useState(false);
    const [currentCate, setCurrentCate] = useState({});
    let navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [newCate, setNewCate] = useState({ IDTheLoaiCha: null, Ten: "", MoTa: "" });
    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            const supplierResponse = await categoryAPI.getTree();
            setCategory(supplierResponse.data);
            setNotify((notify) => {
                if (!supplierResponse.success) {
                    return {
                        show: true,
                        message: supplierResponse.message,
                        success: supplierResponse.success,
                    };
                }
                return notify;
            });
            setLoading(false);
        };
        fetchCategory();
    }, []);

    const handleDeleteAlertClose = () => {
        setDel({ ...del, show: false });
    };
    const handleDeleteAccept = async () => {
        const deleteCategoryResponse = await categoryAPI.delete(del.id);
        setDel({ ...del, show: false }); //ẩn dialog
        setNotify(() => {
            if (!deleteCategoryResponse || !deleteCategoryResponse.success) {
                return {
                    ...notify,
                    show: true,
                    message: "Có lỗi xảy ra. Vui lòng thử lại",
                    success: false,
                };
            }
            return {
                ...notify,
                show: true,
                message: deleteCategoryResponse.message,
                success: deleteCategoryResponse.success,
                errors: deleteCategoryResponse.errors,
            };
        });

        setLoading(true);
        const supplierResponse = await categoryAPI.getTree();
        setCategory(supplierResponse.data);
        setLoading(false);
    };
    const onDeleteClickHandler = (id) => {
        setDel({ ...del, show: true, id: id });
    };

    const showInfoHandler = (item) => {
        setCurrentCate(item);
    };

    const addMoreHandler = (idParent) => {
        setCurrentCate(null);
        setNewCate((old) => ({ ...old, IDTheLoaiCha: idParent }));
    };

    const addMoreSubmitHandler = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        const addResult = await categoryAPI.insert(newCate);

        setNotify((old) => {
            if (!addResult) {
                return { ...old, show: true, message: "Không thể kết nối server", success: false };
            }
            return { ...old, show: true, message: addResult.message, success: addResult.success };
        });

        if (!addResult || !addResult.success) {
            return;
        }
        setLoading(true);
        const supplierResponse = await categoryAPI.getTree();
        setCategory(supplierResponse.data);
        setLoading(false);
    };

    const updateSubmitHandler = async(e) => {
        const form = e.currentTarget
        e.preventDefault()
        if(form.checkValidity === false) {
            setValidated(true)
            return
        }

        const updateResponse = await categoryAPI.update(currentCate)

        setNotify((old)=> ({...old, show: true, message: updateResponse.message, success: updateResponse.success}))

        setLoading(true);
        const supplierResponse = await categoryAPI.getTree();
        setCategory(supplierResponse.data);
        setLoading(false);
    }

    console.log(category);
    const updateCateChangeHandler = (e) => {
        setCurrentCate((old)=> ({...old, [e.target.name]: e.target.value}))
    }
    const newCateChangeHandler = (e) => {
        setNewCate((old) => ({ ...old, [e.target.name]: e.target.value }));
    };
    return (
        <Container>
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    bg={notify.success ? "success" : "danger"}
                    onClose={() => setNotify({ ...notify, show: false })}
                    show={notify.show}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Thông báo</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{notify.message ? notify.message : ""}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Content>
                <div className="category-container">
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12" controlId="validationCustom01">
                                    <Form.Label>Tìm kiếm</Form.Label>
                                    <Form.Control type="text" name="keyword" />
                                </Form.Group>
                            </Row>
                            {category && (
                                <Tree parent={category} handleShowInfo={showInfoHandler} handleAddMore={addMoreHandler} onDeleteClick={onDeleteClickHandler} />
                            )}
                        </>
                    )}
                </div>
                {currentCate ? (
                    <div className="category-item-detail">
                        <Form noValidate validated={validated} onSubmit={updateSubmitHandler} style={{ width: "100%", padding: "20px" }}>
                            <h2 style={{ textAlign: "center", margin: "10px 0 20px 0" }}>Thông tin ngành hàng</h2>
                            <Row className="mb-3">
                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <Form.Label>ID ngành hàng</Form.Label>
                                        <Form.Control type="text" name="id" value={currentCate.id} />
                                    </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Label>Trạng thái</Form.Label>
                                    <Form.Select aria-label="" name="HoatDong" value={currentCate.HoatDong} onChange={updateCateChangeHandler}>
                                        <option value="0">Ngưng hoạt động</option>
                                        <option value="1">Hoạt động</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                {currentCate.IDTheLoaiCha && (
                                    <Form.Group as={Col} md="10" controlId="validationCustom01">
                                        <Form.Label>Thể loại cha</Form.Label>
                                        <Form.Control type="text" name="IDTheLoaiCha" value={currentCate.IDTheLoaiCha} />
                                    </Form.Group>
                                )}
                                <Form.Group as={Col} md="10" controlId="validationCustom01">
                                    <Form.Label>Tên thể loại</Form.Label>
                                    <Form.Control required type="text" name="Ten" value={currentCate.Ten} onChange={updateCateChangeHandler} />
                                    <Form.Control.Feedback type="invalid">Tên thể loại không được bỏ trống</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col} md="10" controlId="validationCustom02">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Hãy nhập thông tin mô tả về thể loại này."
                                        style={{ height: "100px" }}
                                        name="MoTa"
                                        value={currentCate.MoTa}
                                        onChange={updateCateChangeHandler}
                                    />
                                </Form.Group>{" "}
                            </Row>
                            <Button type="submit" className="mt-3">Cập nhật</Button>
                        </Form>
                    </div>
                ) : (
                    <div className="category-item-detail">
                        <Form noValidate validated={validated} onSubmit={addMoreSubmitHandler} style={{ width: "100%", padding: "20px" }}>
                        <h2 style={{ textAlign: "center", margin: "10px 0 20px 0" }}>Thêm ngành hàng</h2>
                        <Row className="mb-3">
                            {newCate.IDTheLoaiCha && (
                                <Form.Group as={Col} md="10" controlId="validationCustom01">
                                    <Form.Label>Thể loại cha</Form.Label>
                                    <Form.Control type="text" name="IDTheLoaiCha" value={newCate.IDTheLoaiCha} />
                                </Form.Group>
                            )}
                            <Form.Group as={Col} md="10" controlId="validationCustom01">
                                <Form.Label>Tên thể loại</Form.Label>
                                <Form.Control required type="text" name="Ten" value={newCate.Ten} onChange={newCateChangeHandler} />
                                <Form.Control.Feedback type="invalid">Tên thể loại không được bỏ trống</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} md="10" controlId="validationCustom02">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Hãy nhập thông tin mô tả về thể loại này."
                                    style={{ height: "100px" }}
                                    name="MoTa"
                                    value={newCate.MoTa}
                                    onChange={newCateChangeHandler}
                                />
                            </Form.Group>{" "}
                        </Row>
                        <Button type="submit">Thêm mới</Button>
                    </Form>
                    </div>
                )}
            </Content>
            <Modal show={del.show} onHide={handleDeleteAlertClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Cảnh báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteAlertClose}>
                        Quay lại
                    </Button>
                    <Button variant="danger" onClick={handleDeleteAccept}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default DanhSachTheLoai;
