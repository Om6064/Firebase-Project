import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import { ToastContainer } from "react-toastify"
import 'remixicon/fonts/remixicon.css'; 
import Header from "./components/Header";

const App = () => {
    return (
        <div>
            <BrowserRouter>
            <Header/>
                <Routes>
                    <Route path ="/" element={<Signup/>}/>
                    <Route path="/signin" element={<Signin/>}/>
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </div>
    )
}

export default App