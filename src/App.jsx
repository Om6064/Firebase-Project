import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import { ToastContainer } from "react-toastify"
import 'remixicon/fonts/remixicon.css';
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ReverseProtectedRoutes from "./components/Revereceprotectedroutes";
import Addproduct from "./components/Addproduct";
import Editproduct from "./components/Editproduct";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<ReverseProtectedRoutes Component={Signup} />} />
                    <Route path="/signin" element={<ReverseProtectedRoutes Component={Signin} />} />
                    <Route path="/dashboard" element={<ProtectedRoutes Component={Dashboard} />} />
                    <Route path="/addproduct" element={<ProtectedRoutes Component={Addproduct} />} />
                    <Route path="/editproduct/:id" element={<ProtectedRoutes Component={Editproduct} />} />
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </div>
    )
}

export default App