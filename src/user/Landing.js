import { Route, Routes } from "react-router-dom"
import React, { Component } from 'react';
//  import "./assets/css/bootstrap.min.css"  
import "./assets/css/font-awesome.min.css"
import "./assets/css/elegant-icons.css"
import "./assets/css/nice-select.css"
import "./assets/css/jquery-ui.min.css"
import "./assets/css/owl.carousel.min.css"
import "./assets/css/slicknav.min.css"
import "./assets/css/style.css"

import All from "./pages/All"
//components
import HomeComponent from './components/Home'
import ShopComponent from "./components/Shop"
import ContactComponent from './components/Contact'
import BlogComponent from './components/Blog'
import RegisterComponent from './components/Register'
import Logincomponents from "./components/Login"
import Authenticate from "./components/Authenticate"
import CheckoutSuccess from "./components/Checkout/CheckoutSuccess";
import { WOW } from 'wowjs'
import Main from "./pages/Main";
import Checkout from "./components/Checkout"
import Cart from "./components/Cart"
import AllItem from './pages/AllItem'

class Landing extends Component {
    componentDidMount() {
        const wow = new WOW({

            boxClass: 'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0,          // distance to the element when triggering the animation (default is 0)
            mobile: true,       // trigger animations on mobile devices (default is true)
            live: false,       // act on asynchronously loaded content (default is true)
            callback: function (box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null // optional scroll container selector, otherwise use window


        }); // disables sync requirement
        wow.init()
    }
    render() {
        return (
            <Routes>
                {/* Tranh Chính */}
                <Route path="/*" element={<All />} >
                    <Route index element={<HomeComponent />} />
                    <Route path="Home" element={<HomeComponent />} />
                    <Route path="Checkout" element={<Checkout />} />
                    <Route path="checkout-success" element={<CheckoutSuccess />} />
                    <Route path="Contact" element={<ContactComponent />} />
                    <Route path="Blog" element={<BlogComponent />} />
                    <Route path="*" element={<div>option not found</div>} />
                </Route>
                <Route element={<AllItem />} >
                    <Route path=":option" element={<Main />}>
                        <Route path="*" element={<div>option not found</div>} />
                    </Route>
                    <Route path="Shop" element={<ShopComponent />} />
                    <Route path="Cart" element={<Cart />} />
                    <Route path="NewPassword" element={<Authenticate />} />
                </Route>
                <Route path="Login" element={<Logincomponents />} /> 
                <Route path="Register" element={<RegisterComponent />} />
            </Routes>
        );
    }
}

export default Landing