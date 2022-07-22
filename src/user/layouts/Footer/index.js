const Footer = () => {
    return (  
        <>
  {/* Footer Section Begin */}
  <footer className="footer spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="footer__about">
            <div className="footer__about__logo">
              <a href="./index.html">
                <img src="img/logo.png" alt="" />
              </a>
            </div>
            <ul>
              <li>Địa chỉ: 180 đường Cao Lỗ , Quận 8, TP.Hồ Chí Minh</li>
              <li>Phone: +84 0334596482</li>
              <li>Email: company@gmail.com.com</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
          <div className="footer__widget">
            <h6>Liên kết hữu ích</h6>
            <ul>
              <li>
                <a href="#">Cửa hàng linh kiện</a>
              </li>
              <li>
                <a href="#">Dịch vụ</a>
              </li>
              <li>
                <a href="#">Dự án</a>
              </li>
              <li>
                <a href="#">Liên hệ</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="footer__widget">
            <h6>Tham gia bản tin của chúng tôi ngay bây giờ</h6>
            <p>Nhận cập nhật qua Email về cửa hàng mới nhất của chúng tôi và các ưu đãi đặc biệt.</p>
            <form action="#">
              <input type="text" placeholder="Enter your mail" />
              <button type="submit" className="site-btn">
              Đặt mua
              </button>
            </form>
            <div className="footer__widget__social">
              <a href="#">
                <i className="fa fa-facebook" />
              </a>
              <a href="#">
                <i className="fa fa-instagram" />
              </a>
              <a href="#">
                <i className="fa fa-twitter" />
              </a>
              <a href="#">
                <i className="fa fa-pinterest" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </footer>
  {/* Footer Section End */}
</>

    );
}
 
export default Footer;