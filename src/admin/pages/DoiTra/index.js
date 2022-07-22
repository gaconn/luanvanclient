import React from 'react'
import DanhSachDoiTra from './DanhSachDoiTra';
import ThemDanhSachDoiTra from './ThemDanhSachDoiTra';

const DoiTra = ({option}) => {
    switch (option) {
        case "list":
            return <DanhSachDoiTra />
        case "insert":
            return <ThemDanhSachDoiTra />
        default:
            break;
    }
  return (
    <div>DoiTra</div>
  )
}

export default DoiTra