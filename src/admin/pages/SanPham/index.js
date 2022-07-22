import React from 'react'
import DanhSachSanPham from "./DanhSachSanPham"
import SuaSanPham from './SuaSanPham'
import ThemSanPham from "./ThemSanPham"

const SanPham = ({option}) => {
    var body 
    switch (option) {
        case "list":
            body=<DanhSachSanPham />
            break;
        case "add":
            body = <ThemSanPham />
            break
        case 'update':
            body = <SuaSanPham />
            break
        default:
            break;
    }
  return (
    body
  )
}

export default SanPham