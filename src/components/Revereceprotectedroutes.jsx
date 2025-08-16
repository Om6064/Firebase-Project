import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { app } from "../config/firebase"

const ReverseProtectedRoutes = ({ Component }) => {
  const navigate = useNavigate()
  const auth = getAuth(app)

  onAuthStateChanged(auth, (currentUser) => {
   if (currentUser) {
     navigate("/dashboard")
   }
 })

  return <Component />
}

export default ReverseProtectedRoutes
    