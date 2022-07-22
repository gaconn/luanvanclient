import { Accordion } from "react-bootstrap"
import { AiOutlinePlus } from "react-icons/ai"
import { FaClipboardList } from "react-icons/fa"
import { GiTrade } from "react-icons/gi"
import { RiPlayListAddFill } from "react-icons/ri"
import { Link } from "react-router-dom"
import { LinkChangeAction } from "../../../configs/define"
import IconTagToggle from "../IconTagToggle"
import ListTagToggle from "../ListTagToggle"
import { Item, List } from "../SideBar.style"

const QuanLyDoiTra = () => {
    return (
        <Item>
            <div className="side-bar-item-control">
                <IconTagToggle eventKey="5"><GiTrade /></IconTagToggle>
                <span className="side-bar-item-label">Quản lý đổi trả</span>
                <ListTagToggle eventKey="5"><AiOutlinePlus/></ListTagToggle>
            </div>
            <Accordion.Collapse eventKey="5">
                <div className="side-bar-item-expand-list">
                    <List>
                        <Item className="side-bar-item-sub">
                            <Link to={LinkChangeAction.change_list} className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><FaClipboardList /></span>
                                <span className="side-bar-item-label">Danh sách đổi trả</span>
                            </Link>
                        </Item>
                        <Item className="side-bar-item-sub">
                            <Link to={LinkChangeAction.change_insert} className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><RiPlayListAddFill /></span>
                                <span className="side-bar-item-label">Thêm đơn đổi trả</span>
                            </Link>
                        </Item>
                    </List>
                </div>
            </Accordion.Collapse>
        </Item>
    )
}

export default QuanLyDoiTra