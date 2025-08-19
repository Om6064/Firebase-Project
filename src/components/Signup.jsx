import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { app } from "../config/firebase"
import { useState } from "react"
import { toast } from "react-toastify"

const Signup = () => {
  const [input, setInput] = useState({
    email: "", password: "", compassword: ""
  })
  const navigate = useNavigate()
  const auth = getAuth(app)

  const handleSignUp = async (e) => {
    e.preventDefault()

    let tempobj = {}
    if (input.compassword !== input.password) {
      tempobj.compassword = "Password and Confirm Password should match"
    }

    if (Object.keys(tempobj).length > 0) {
      toast.error("Password and Confirm Password should match")
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, input.email, input.password)
      setInput({ email: "", password: "", compassword: "" })
      navigate("/signin")
    } catch (error) {
      toast.error(error.code)
    }
  }

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value })
  }

  return (
    <>
      <section className="bg-[url('/Background.png')] min-h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center p-4">
        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden w-full max-w-[1050px] mt-10 sm:mt-16 md:mt-20 shadow-lg">
          
        
          <div className="w-full md:w-5/12 p-6 sm:p-8 bg-[#084b3e] flex flex-col justify-between">
            <div>
              <img src="/logo.png" alt="logo" className="w-24 sm:w-28 md:w-32" />
            </div>
            <p className="text-[#f9e2ba] text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-6 md:mt-0 leading-relaxed">
              Say hello to global food and beverage producers and suppliers, all in one place
            </p>
          </div>

         
          <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-10 bg-white text-[#232323] flex flex-col justify-center">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
              Let’s get started <br className="hidden sm:block" /> with a few simple steps
            </p>

            <form className="w-full max-w-md my-8 sm:my-12 md:my-16" onSubmit={handleSignUp}>
              
           
              <div className="relative z-0 w-full mb-6 group">
                <input 
                  type="email" 
                  id="email" 
                  value={input.email} 
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm sm:text-base md:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                  placeholder=" " required 
                />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm sm:text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Email address
                </label>
              </div>

             
              <div className="relative z-0 w-full mb-6 group">
                <input 
                  type="password" 
                  id="password" 
                  value={input.password} 
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm sm:text-base md:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                  placeholder=" " required 
                />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm sm:text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Password
                </label>
              </div>

        
              <div className="relative z-0 w-full mb-6 group">
                <input 
                  type="password" 
                  id="compassword" 
                  value={input.compassword} 
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm sm:text-base md:text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                  placeholder=" " required 
                />
                <label htmlFor="compassword" className="peer-focus:font-medium absolute text-sm sm:text-base text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Confirm password
                </label>
              </div>

              <button className="mt-6 sm:mt-8 md:mt-12 bg-[#00c38b] text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl w-full text-center rounded-2xl px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4">
                Sign Up
              </button>
            </form>

            <div className="text-xs sm:text-sm md:text-base text-[#bdbdbd] text-center md:text-left">
              By signing up, you agree to our 
              <a href="#" className="text-[#00c38b] hover:underline"> Terms of Service.</a>
              <br />
              Already have an account? 
              <Link to={"/signin"} className="text-[#00c38b] hover:underline"> Log in</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup
