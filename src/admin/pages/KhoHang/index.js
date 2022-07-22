import React from 'react'
import DanhSachSanPhamTrongKho from './DanhSachSanPhamTrongKho';
import DanhSachSanPhamXuatKho from './DanhSachSanPhamXuatKho';
import LuuKho from './LuuKho';

const KhoHang = ({option}) => {
    switch (option) {
        case 'in-warehouse':
            return <DanhSachSanPhamTrongKho />
        case 'exported-warehouse':
            return <DanhSachSanPhamXuatKho/>
        case 'import-warehouse':
            return <LuuKho />
        default:
            break;
    }
  return (
    <div>KhoHang</div>
  )
}

export default KhoHang