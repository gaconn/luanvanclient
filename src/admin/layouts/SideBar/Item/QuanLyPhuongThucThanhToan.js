import { Accordion } from "react-bootstrap"
import { AiOutlinePlus } from "react-icons/ai"
import { FaRegListAlt, FaRegMoneyBillAlt } from "react-icons/fa"
import IconTagToggle from "../IconTagToggle"
import ListTagToggle from "../ListTagToggle"
import { Item, List } from "../SideBar.style"

const QuanLyPhuongThucThanhToan = () => {
    return (
        <Item>
            <div className="side-bar-item-control">
                <IconTagToggle eventKey="7"><FaRegMoneyBillAlt /></IconTagToggle>
                <span className="side-bar-item-label">Phương thức thanh toán</span>
                <ListTagToggle eventKey="7"><AiOutlinePlus/></ListTagToggle>
            </div>
            <Accordion.Collapse eventKey="7">
                <div className="side-bar-item-expand-list">
                    <List>
                        <Item className="side-bar-item-sub">
                            <div className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><FaRegListAlt /></span>
                                <span className="side-bar-item-label">Danh sách phương thức thanh toán</span>
                            </div>
                        </Item>
                    </List>
                </div>
            </Accordion.Collapse>
        </Item>
    )
}

export default QuanLyPhuongThucThanhToan