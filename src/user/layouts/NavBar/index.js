import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from "react-router-dom";
import token from "../../services/utils/setToken";
import { FaUserAlt } from "react-icons/fa";
import './icon.css'
import iconImg from '../../assets/img/icon/icon2.png'
import { useEffect, useState } from "react";
import categoryAPI from "../../services/API/CategoryAPI";
import TreeNavBar from "./TreeNavBar";
import ListItem from "./ListItem";
import Section from "../Section";
const NavbarHeader = () => {
    const [category, setCategory] = useState([])
    const [idCategory, setIDCategory] = useState({})
    const navigate = useNavigate()
    const logoutHandler = () => {
        localStorage.removeItem("UID")
        localStorage.removeItem("USER_NAME")
        token.deleteToken()
        navigate("/Home", { replace: true })
    }
    // console.log(localStorage.getItem("UID"));
    useEffect(() => {
        const fetchDataDanhMuc = async () => {
            const response = await categoryAPI.getTree()
            setCategory(response.data)

        }
        fetchDataDanhMuc()
    }, [])
    const handleIDCategory = (id) => {
        setIDCategory(id)
    }
    const ListChild = (item) => {
        // if (item.listChild && !item.listChild.listChild) {
        //     return <ListItem listChild={item.listChild} handlerID={handleIDCategory} />
        // }
         return <TreeNavBar listChild={item.listChild} />
    }
    // console.log(idCategory)
    const checkInformation=()=>{
        if(localStorage.getItem("UID")){
            navigate(`/InformationCustomer?id=${localStorage.getItem("UID")}`)
        }
    }
    return (
        <>
            <Navbar bg="light" variant="light" expand='sm' sticky="top">
                <Container  >
                    <Navbar.Brand href="/"><img src={iconImg} style={{ width: 150, height: 100 }} /></Navbar.Brand>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-4 my-lg-4 grid grid-cols-3 gap-4 header1"
                            style={{ maxHeight: '100px' }}
                            navbarScroll

                        >

                            <Nav.Link href="/Shop">Cửa hàng</Nav.Link>
                            <Nav.Link href="/Contact">Liên hệ</Nav.Link>
                            <Nav.Link href="/Blog">Bản tin</Nav.Link>

                            <Nav.Link>
                                <ul className="menu-items">
                                    <li>
                                        Danh mục
                                        <div className="mega-menu">
                                            <div className="content">
                                                {
                                                    category && category.map && category.map((item, k) => (
                                                        <div className="col" key={k}>
                                                            <section>
                                                                <h2>{item.Ten}</h2>
                                                                <ul className="mega-links">
                                                                    {ListChild(item)}
                                                                </ul>
                                                            </section>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                    </li>
                                </ul>
                            </Nav.Link>
                        </Nav>

                        <Navbar.Brand href="Home">
                            <button type="button" className="icon-button">
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                <span className="icon-button__badge">2</span>
                            </button>
                        </Navbar.Brand>
                        <Dropdown >
                            <Dropdown.Toggle variant='' id="dropdown-button-dark-example1" className="d-flex align-items-center" >
                                <FaUserAlt />
                                <div className="p-1">{localStorage.getItem("USER_NAME") ? localStorage.getItem("USER_NAME") : "Tài khoản"}</div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="dark">
                                <Dropdown.Item onClick={checkInformation} active>
                                    Thông tin khách hàng
                                </Dropdown.Item>
                                {!localStorage.getItem("UID") &&
                                    <>
                                        <Dropdown.Item href="/Login"><i className="fa fa-user" aria-hidden="true"></i>&nbsp;Đăng nhập</Dropdown.Item>
                                        <Dropdown.Item href="/Register"><i className="fa fa-user-plus" aria-hidden="true"></i>&nbsp; Đăng ký</Dropdown.Item>
                                    </>
                                }
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={logoutHandler}><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Đăng xuất</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </Navbar.Collapse>
                </Container>

            </Navbar>

        </>
    );
}

export default NavbarHeader;