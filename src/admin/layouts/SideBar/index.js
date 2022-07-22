import {Container, Content , List, Item} from "./SideBar.style"
import {AiOutlinePlus} from "react-icons/ai"
import {RiAccountCircleLine} from 'react-icons/ri'
import {FiSettings} from 'react-icons/fi'
import Accordion from "react-bootstrap/Accordion"
import Home from "./Item/Home"
import QuanLyKhoHang from "./Item/QuanLyKhoHang"
import QuanLyDonHang from "./Item/QuanLyDonHang"
import QuanLyNhaCungCap from "./Item/QuanLyNhaCungCap"
import QuanLyGianHang from "./Item/QuanLyGianHang"
import QuanLyDoiTra from "./Item/QuanLyDoiTra"
import QuanLyKhuyenMai from "./Item/QuanLyKhuyenMai"
import QuanLyPhuongThucThanhToan from "./Item/QuanLyPhuongThucThanhToan"
import QuanLyNguoiDung from "./Item/QuanLyNguoiDung"
import QuanLyPhanQuyen from "./Item/QuanLyPhanQuyen"
import QuanLyTheLoai from "./Item/QuanLyTheLoai"
import Account from "./Item/Account"
const SideBar = () => {
    
    return (
        <>
            <Container className="side-bar-container">
            <Content className="side-bar-content">
                <Accordion defaultActiveKey="0">
                <List className="side-bar-list-1">
                    <Home/>
                    
                    { localStorage.getItem('USER_LEVEL') < 4 && <QuanLyKhoHang/>}

                    { localStorage.getItem('USER_LEVEL') < 3 &&
                        <>
                            <QuanLyDonHang />
                        
                            <QuanLyNhaCungCap />
                            
                            <QuanLyGianHang />
                            
                            <QuanLyDoiTra />
                            
                            <QuanLyKhuyenMai/>
                            
                            <QuanLyPhuongThucThanhToan/>
                            
                            <QuanLyTheLoai />
                            
                        </>
                    }
                    {   localStorage.getItem('USER_LEVEL') < 2 &&
                        <>
                            <QuanLyNguoiDung/>
                        </>
                    }

                </List>
                </Accordion>
                <Accordion defaultActiveKey="0">
                    <List>
                        <Account />
                        <Item>
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon"><FiSettings /></span>
                                <span className="side-bar-item-label">Setting</span>
                                <span className="side-bar-item-icon-expand"><AiOutlinePlus/></span>
                            </div>
                        </Item>
                    </List>
                </Accordion>
            </Content>
        </Container>
        </>
    )
}

export default SideBar