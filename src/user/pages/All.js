import Footer from "../layouts/Footer"
import Header from "../layouts/Header"
import NavbarHeader from "../layouts/NavBar"
import Section from "../layouts/Section"
import Banner from "../layouts/Banner"
import Loading from "../layouts/Loading"
import { Outlet } from "react-router-dom"
const useAllPage = () => {
    return (<>
        <Loading />
        <Header />
        <NavbarHeader />
        <Section />
        <Banner />
        <Outlet/>
        <Footer/>
    </>);
}

export default useAllPage;