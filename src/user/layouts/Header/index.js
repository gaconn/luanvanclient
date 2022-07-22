
const Header = () => {
    return (
        <>
            {/* Header Section Begin */}
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                    <ul>
                                        <li>
                                            <i className="fa fa-envelope" /> company@gmail.com
                                        </li>
                                        <li>Giao hàng miễn phí cho tất cả Đơn hàng $ 99</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    <div className="header__top__right__social">
                                        <a href="#">
                                            <i className="fa fa-facebook" />
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-twitter" />
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-linkedin" />
                                        </a>
                                        <a href="#">
                                            <i className="fa fa-pinterest-p" />
                                        </a>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Header Section End */}
        </>


    );
}

export default Header;