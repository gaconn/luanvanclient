import { Accordion } from "react-bootstrap"
import { AiOutlinePlus } from "react-icons/ai"
import { BiUserPlus } from "react-icons/bi"
import { FaUserAlt } from "react-icons/fa"
import { RiFolderUserLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { LinkUserAction } from "../../../configs/define"
import IconTagToggle from "../IconTagToggle"
import ListTagToggle from "../ListTagToggle"
import { Item, List } from "../SideBar.style"

const QuanLyNguoiDung = () => {
    return (
        <Item>
            <div className="side-bar-item-control">
                <IconTagToggle eventKey="8"><FaUserAlt /></IconTagToggle>
                <span className="side-bar-item-label">Quản lý người dùng</span>
                <ListTagToggle eventKey="8"><AiOutlinePlus/></ListTagToggle>
            </div>
            <Accordion.Collapse eventKey="8">
                <div className="side-bar-item-expand-list">
                    <List>
                        <Item className="side-bar-item-sub">
                            <Link to={`${LinkUserAction.user_list}`} className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><RiFolderUserLine /></span>
                                <span className="side-bar-item-label">Danh sách người dùng</span>
                            </Link>
                        </Item>
                        <Item className="side-bar-item-sub">
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><BiUserPlus /></span>
                                <span className="side-bar-item-label">Thêm người dùng</span>
                            </div>
                        </Item>
                    </List>
                </div>
            </Accordion.Collapse>
        </Item>
    )
}

export default QuanLyNguoiDung