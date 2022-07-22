import { useParams } from "react-router-dom"
import SideBar from "../layouts/SideBar"
import NhaCungCap from "./NhaCungCap"
import TheLoai from "./TheLoai"
import SanPham from "./SanPham"
import Order from "./Order"
import User from "./User"
import KhoHang from "./KhoHang"
import DoiTra from "./DoiTra"
import Discount from "./Discount"
const Main = () => {
    const {manage, option} = useParams()
    var pageBody 

    switch (manage) {
        case "supplier":
            pageBody = <NhaCungCap option={option} />
            break;
        case "category":
            pageBody = <TheLoai option={option}/>
            break;
        case "product": 
            pageBody = <SanPham option= {option} />
            break;
        case "order":
            pageBody = <Order option= {option}/>
            break;
        case "user":
            pageBody = <User option = {option}/>
            break
        case "warehouse":
            pageBody = <KhoHang option = {option}/>
            break
        case "change": 
            pageBody = <DoiTra option = {option}/>
            break
        case "discount":
            pageBody = <Discount option = {option} />
            break
        default:
            break;
    }
    return (
        <div className="d-flex">
            <SideBar/>
            <div className="flex-fill">
                {pageBody}
            </div>
        </div>
    )
}

export default Main