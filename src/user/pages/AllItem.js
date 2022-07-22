
import { Outlet } from "react-router-dom";
import Header from "../layouts/Header"
import NavbarHeader from "../layouts/NavBar"
import Section from "../layouts/Section";


const AllItem = () => {
 
    return (
    <>
        <Header />
        <NavbarHeader />
        <Section />
        <Outlet />
    </>
    );
}

export default AllItem;
