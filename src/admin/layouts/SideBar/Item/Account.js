import React from 'react'
import { Accordion } from 'react-bootstrap'
import { AiOutlinePlus } from 'react-icons/ai'
import { RiAccountCircleLine } from 'react-icons/ri'
import { HiOutlineLogout } from 'react-icons/hi'
import IconTagToggle from '../IconTagToggle'
import ListTagToggle from '../ListTagToggle'
import { Item, List } from '../SideBar.style'
import { logout } from '../../../services/utils/Auth'
import { useNavigate } from 'react-router-dom'

const Account = () => {
    const navigate = useNavigate()
    const logoutHandler = () => {
        logout()
        navigate('/manage/auth', {replace:true})
    }
  return (
    <Item>
        <div className="side-bar-item-control">
            <IconTagToggle eventKey="11"><RiAccountCircleLine /></IconTagToggle>
            <span className="side-bar-item-label">{localStorage.getItem('USER_NAME') ? localStorage.getItem('USER_NAME') : 'Tài khoản'}</span>
            <ListTagToggle eventKey="11"><AiOutlinePlus/></ListTagToggle>
        </div>
        <Accordion.Collapse eventKey="11">
            <div className="side-bar-item-expand-list">
                <List>
                    <Item className="side-bar-item-sub" onClick={logoutHandler}>
                        <div className="side-bar-item-control">
                            <span className="side-bar-item-icon-sub"><HiOutlineLogout /></span>
                            <span className="side-bar-item-label">Đăng xuất</span>
                        </div>
                    </Item>
                </List>
            </div>
        </Accordion.Collapse>
    </Item>
  )
}

export default Account