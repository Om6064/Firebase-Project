import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "../config/firebase"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ProtectedRoutes = ({ Component }) => {
    const navigate = useNavigate()
    const auth = getAuth(app)
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    const validation = () => {
        let res = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
                navigate("/signin")
            }
        })
    }

    useEffect(() => {
        validation()
    }, [])

    // while checking, render nothing (or a loader)
    if (isAuthenticated === null) return null  

    return <Component /> 
}

export default ProtectedRoutes
