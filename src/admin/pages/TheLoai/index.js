import DanhSachTheLoai from "./DanhSachTheLoai";

const TheLoai = ({option}) => {
    var body
    switch (option) {
        case 'list':
              body= <DanhSachTheLoai />  
            break;
        default:
            break;
    }
    return (
        body
    )
}

export default TheLoai