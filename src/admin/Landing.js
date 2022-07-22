import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import ProtectedPage from "./services/utils/ProtectedPage"
import 'bootstrap/dist/css/bootstrap.css';
import Main from "./pages"
import Denied from "./pages/Denied";
const Landing = () => {
    return <>
        
        <Routes>
            <Route path="permission-denied" element= {<Denied />} />
            <Route path="" element={<Auth />} />
            <Route path="auth" element= {<Auth />} />
            <Route element={<ProtectedPage />}>
                <Route path="home" element={<Home />} />
                <Route path=":manage">
                    <Route path=":option" element={<Main/>} />
                    <Route path="*" element={<div>option not found</div>} />
                </Route>
            </Route>
            <Route path="*" element={<div>admin page</div>} />
        </Routes>
    </>

}

export default Landing