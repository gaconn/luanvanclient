//style
import './App.css';

//libraries
import {BrowserRouter , Routes, Route} from "react-router-dom"

//admi
import AdminLanding  from "./admin/Landing"
//user
import UserLanding  from "./user/Landing"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/manage/*' element={<AdminLanding />}/>
        <Route path='/*' element={<UserLanding/>} />
        <Route path='*' element= {<div>Nothing here</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
