import { Accordion } from "react-bootstrap"
import { AiFillFileAdd, AiOutlinePlus } from "react-icons/ai"
import { BiCategory,  } from "react-icons/bi"
import { FaRegListAlt } from "react-icons/fa"
import {BsCardChecklist} from "react-icons/bs"

import IconTagToggle from "../IconTagToggle"
import ListTagToggle from "../ListTagToggle"
import { Item, List } from "../SideBar.style"
import { Link } from "react-router-dom"
import { LinkCategoryAction } from "../../../configs/define"

const QuanLyTheLoai = () => {
    return (
        <Item>
            <div className="side-bar-item-control">
                <IconTagToggle eventKey="10"><BiCategory /></IconTagToggle>
                <span className="side-bar-item-label">Quản lý ngành hàng</span>
                <ListTagToggle eventKey="10"><AiOutlinePlus/></ListTagToggle>
            </div>
            <Accordion.Collapse eventKey="10">
                <div className="side-bar-item-expand-list">
                    <List>
                        <Item className="side-bar-item-sub">
                            <Link to={LinkCategoryAction.category_list} className="side-bar-item-control">
                                <span className="side-bar-item-icon-sub"><BsCardChecklist /></span>
                                <span className="side-bar-item-label">Danh sách thể loại</span>
                            </Link>
                        </Item>
                    </List>
                </div>
            </Accordion.Collapse>
        </Item>
    )
}

export default QuanLyTheLoai