import { Accordion } from "react-bootstrap"
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai"
import { FaClipboardList, FaUserTie } from "react-icons/fa"
import IconTagToggle from "../IconTagToggle"
import ListTagToggle from "../ListTagToggle"
import { Item, List } from "../SideBar.style"

const QuanLyPhanQuyen = () => {
    return (
        <Item>
            <div className="side-bar-item-control">
                <IconTagToggle eventKey="9"><FaUserTie /></IconTagToggle>
                <span className="side-bar-item-label">Quản lý phân quyền</span>
                <ListTagToggle eventKey="9"><AiOutlinePlus/></ListTagToggle>
            </div>
            <Accordion.Collapse eventKey="9">
                <div className="side-bar-item-expand-list">
                    <List>
                        <Item className="side-bar-item-sub">
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><FaClipboardList /></span>
                                <span className="side-bar-item-label">Danh sách phân quyền</span>
                            </div>
                        </Item>
                        <Item className="side-bar-item-sub">
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><AiOutlineEdit/></span>
                                <span className="side-bar-item-label">Thêm phân quyền</span>
                            </div>
                        </Item>
                    </List>
                </div>
            </Accordion.Collapse>
        </Item>
    )
}

export default QuanLyPhanQuyen