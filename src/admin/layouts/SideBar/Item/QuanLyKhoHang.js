import { Accordion } from "react-bootstrap"
import { AiOutlinePlus } from "react-icons/ai"
import { BiAddToQueue } from "react-icons/bi"
import { BsHouseDoor } from "react-icons/bs"
import { RiStackLine, RiStackOverflowFill } from "react-icons/ri"
import { Link } from "react-router-dom"
import { LinkWarehouseAction } from "../../../configs/define"
import IconTagToggle from "../IconTagToggle"
import ListTagToggle from "../ListTagToggle"
import { Item, List } from "../SideBar.style"

const QuanLyKhoHang = () => {
    return (
        <Item>
            <div className="side-bar-item-control">
                <IconTagToggle eventKey="1"><BsHouseDoor /></IconTagToggle>
                <span className="side-bar-item-label">Quản lý kho hàng</span>
                <ListTagToggle eventKey="1"><AiOutlinePlus /></ListTagToggle>
            </div>
            <Accordion.Collapse eventKey="1">
                <div className="side-bar-item-expand-list">
                    <List>
                        <Item className="side-bar-item-sub side-1" id="side-bar-item-sub-1" key="1">
                            <Link to={LinkWarehouseAction.in_warehouse} className="side-bar-item-control" >
                                <span className="side-bar-item-icon-sub"><RiStackLine /></span>
                                <span className="side-bar-item-label" >Danh sách đơn hàng trong kho</span>
                            </Link>
                        </Item>
                        <Item className="side-bar-item-sub">
                            <Link to={LinkWarehouseAction.exported_warehouse} className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><RiStackOverflowFill /></span>
                                <span className="side-bar-item-label">Danh sách đơn hàng xuất kho</span>
                            </Link>
                        </Item>
                        <Item className="side-bar-item-sub">
                            <Link to={LinkWarehouseAction.import_warehouse} className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><BiAddToQueue /></span>
                                <span className="side-bar-item-label">Lưu kho</span>
                            </Link>
                        </Item>
                    </List>
                </div>
            </Accordion.Collapse>
        </Item>
    )
}

export default QuanLyKhoHang