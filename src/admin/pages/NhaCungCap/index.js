import AddNhaCungCap from "./AddNhaCungCap"
import DanhSachNhaCungCap from "./DanhSachNhaCungCap"
import UpdateNhaCungCap from "./UpdateNhaCungCap"

const NhaCungCap = ({option}) => {
    var body 
    switch (option) {
        case "list":
            body = <DanhSachNhaCungCap/>
            break;
        case "add":
            body = <AddNhaCungCap />
            break
        case "update":
            body = <UpdateNhaCungCap />
            break
        default:
            break;
    }
    return (
        body
    )
}

export default NhaCungCap