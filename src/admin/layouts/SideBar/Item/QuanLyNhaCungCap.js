import { Accordion } from "react-bootstrap"
import { AiOutlinePlus } from "react-icons/ai"
import { BsCardChecklist } from "react-icons/bs"
import { FaHandsHelping } from "react-icons/fa"
import { GiHumanPyramid } from "react-icons/gi"
import { Link } from "react-router-dom"
import IconTagToggle from "../IconTagToggle"
import ListTagToggle from "../ListTagToggle"
import { Item, List } from "../SideBar.style"
import { LinkPage } from "../../../configs/define"
const QuanLyNhaCungCap = () => {
    return (
        <Item>
            <div className="side-bar-item-control">
                <IconTagToggle eventKey="3"><GiHumanPyramid /></IconTagToggle>
                <span className="side-bar-item-label">Quản lý nhà cung cấp</span>
                <ListTagToggle eventKey="3"><AiOutlinePlus/></ListTagToggle>
            </div>
            <Accordion.Collapse eventKey="3">
                <div className="side-bar-item-expand-list">
                    <List>
                        <Item className="side-bar-item-sub" id="supplier_list">
                            <Link to={LinkPage.supplier+"/list"} className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><BsCardChecklist /></span>
                                <span className="side-bar-item-label">Danh sách nhà cung cấp</span>   
                            </Link>
                        </Item>
                        <Item className="side-bar-item-sub" id="supplier_add">
                            <Link to={LinkPage.supplier+"/add"} className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><FaHandsHelping /></span>
                                <span className="side-bar-item-label">Thêm nhà cung cấp</span>   
                            </Link>
                        </Item>
                    </List>
                </div>
            </Accordion.Collapse>
        </Item>
    )
}

export default QuanLyNhaCungCap