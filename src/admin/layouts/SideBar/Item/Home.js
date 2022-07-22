import { AiOutlineHome } from "react-icons/ai"
import { Link } from "react-router-dom"
import { Item } from "../SideBar.style"

const Home = () => {
    return (
        <Item>
            <div className="side-bar-item-control">
                <span className="side-bar-item-icon"><AiOutlineHome /></span>
                <span className="side-bar-item-label"><Link to="/manage/home">Home</Link></span>
            </div>
        </Item>
    )
}

export default Home