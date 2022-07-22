import { Accordion } from "react-bootstrap"
import { AiOutlinePlus } from "react-icons/ai"
import { IoStorefrontOutline } from "react-icons/io5"
import { MdOutlineProductionQuantityLimits, MdOutlineSell } from "react-icons/md"
import {BiAddToQueue} from 'react-icons/bi'
import { Link } from "react-router-dom"
import { LinkProductAction } from "../../../configs/define"
import IconTagToggle from "../IconTagToggle"
import ListTagToggle from "../ListTagToggle"
import { Item, List } from "../SideBar.style"

const QuanLyGianHang = () => {
    return (
        <Item>
            <div className="side-bar-item-control">
                <IconTagToggle eventKey="4"><IoStorefrontOutline /></IconTagToggle>
                <span className="side-bar-item-label">Quản lý gian hàng</span>
                <ListTagToggle eventKey="4"><AiOutlinePlus/></ListTagToggle>
            </div>
            <Accordion.Collapse eventKey="4">
                <div className="side-bar-item-expand-list">
                    <List>
                        <Item className="side-bar-item-sub">
                            <Link to={`${LinkProductAction.product_list}`} className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><MdOutlineProductionQuantityLimits /></span>
                                <span className="side-bar-item-label">Danh sách sản phẩm</span>
                            </Link>
                        </Item>
                        <Item className="side-bar-item-sub">
                            <Link to={`${LinkProductAction.product_add}`} className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><BiAddToQueue /></span>
                                <span className="side-bar-item-label">Thêm sản phẩm</span>
                            </Link>
                        </Item>
                        <Item className="side-bar-item-sub">
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><MdOutlineSell /></span>
                                <span className="side-bar-item-label">Danh sách sản phẩm giảm giá</span>
                            </div>
                        </Item>
                    </List>
                </div>
            </Accordion.Collapse>
        </Item>
    )
}

export default QuanLyGianHang