export const StatusOrder = {
    0 : "Chờ kiểm duyệt",
    1 : "Đã kiểm duyệt",
    2: "Đang vận chuyển",
    3: "Đã chuyển hàng",
    4: "Chờ đổi trả",
    5: "Đã hoàn thành",
    6: "Đã hủy"
}
export const colorTextStatus = {
    0: "danger",
    1: "info",
    2: "info",
    3: "success",
    4: "warning",
    5: "success",
    6: "danger",
}

export const paymentMethod = {
    1: "Trực tiếp",
    2: "Momo"
}
export const toTimeString = (timestamp) => {
    const date = new Date(timestamp)
    if(!date) return ''
    var strDatetime = ""

    if(date.getDate()*1 <10) {
        strDatetime += `0${date.getDate()}`
    }else {
        strDatetime += date.getDate()
    }

    if((date.getMonth() +1) <10) {
        strDatetime += ` / 0${date.getMonth()+1}`
    } else {
        strDatetime += ' / '+(date.getMonth()+1)
    }

    strDatetime += ' / ' + date.getFullYear()

    return strDatetime
}

export const formatDateForInput = (timestamp) => {
    const date = new Date(timestamp)

    var strDatetime = ""
    strDatetime += date.getFullYear()
    strDatetime += '-' + (date.getMonth()+1 >10 ? date.getMonth()+1 : `0${date.getMonth()+1}`)
    strDatetime += '-' + (date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`)
    return strDatetime
}

//truyền vào thông tin chương trình giảm giá để lấy ra loại trương trình giảm giá

export const targetDiscount = (item) => {
    var payment 
    var product 
    var price 

    if(item.IDPhuongThucThanhToan || item.IDPhuongThucThanhToan === 0) {
        payment = <li style={{color: "blue"}}>Thanh toán {paymentMethod[item.IDPhuongThucThanhToan]}</li>
    }
    if(item.IDSanPham) {
        product = <li style={{color: "orange"}}>Sản phẩm {item.IDSanPham}</li>
    }

    if(item.DieuKienGiaToiThieu || item.DieuKienGiaToiDa) {
        price = <li style={{color: "green"}}>
            {item.DieuKienGiaToiThieu ?  item.DieuKienGiaToiThieu : 0 } - 
            {item.DieuKienGiaToiDa ? item.DieuKienGiaToiDa : "∞"}
        </li>
    }

    var result 
    if(!payment && !product && !price) {
        result = <ul>
            <li>Tất cả sản phẩm</li>
        </ul>
    }else {
        result = <ul>
            {payment ? payment : ""}
            {product ? product : ""}
            {price ? price : ""}
        </ul>
    }
    return result
}