import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "../config/firebase"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRoutes = (Component) => {
    const navigate = useNavigate()
    const auth = getAuth(app)
    const validation = () => {
        let res =  onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(res);
                return (
                    Component
                )
            }else{
                navigate("/signin")
            }
        })
    }
    useEffect(() => {
        validation()
    }, [])
}

export default ProtectedRoutes  