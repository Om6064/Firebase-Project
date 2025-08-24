import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { app } from "../config/firebase"
import { toast } from "react-toastify"

const Signin = () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();
    const [input, setInput] = useState({
        email: "", password: ""
    })
    const navigate = useNavigate()
    const handleSignIn = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, input.email, input.password)
            toast.success("User Signin Successfully")
            navigate("/dashboard")
        } catch (error) {
            if (error.code == "auth/invalid-credential") {
                toast.error("invalid-credential")
            }
        }
        setInput({
            email: "", password: "", compassword: ""
        })
    }
    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }
    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider)
            toast.success("User Signin Successfully")
            navigate("/dashboard")
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }

    return (
        <>
            <section className="bg-[url('/Background.png')] h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center p-2 sm:p-4">
                <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-lg w-full max-w-[1050px] mt-6 sm:mt-12 md:mt-20">

                    <div className="w-full md:w-5/12 p-4 sm:p-6 md:p-8 bg-[#084b3e]">
                        <div className="flex flex-col justify-between h-full md:h-[650px]">
                            <div>
                                <img src="/logo.png" alt="logo" className="w-28 sm:w-36 md:w-44" />
                            </div>
                            <div className="text-[#f9e2ba] text-lg sm:text-2xl md:text-4xl mt-6 md:mt-0 leading-snug">
                                Say hello to global food and beverage producers and suppliers, all in one place
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-7/12 p-4 sm:p-6 md:p-10 text-lg sm:text-2xl md:text-4xl bg-white text-[#232323]">
                        <div className="leading-snug font-semibold">
                            Let’s get started <br />
                            with a few simple steps
                        </div>

                        <form className="w-full max-w-sm sm:max-w-md my-6 sm:my-10 md:my-20" onSubmit={handleSignIn}>
                            <div className="relative z-0 w-full mb-4 sm:mb-6 md:mb-8 group">
                                <input type="email" id="email" className="block py-2 px-0 w-full text-sm sm:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-green-600 peer" placeholder=" " value={input.email} required onChange={handleChange} />
                                <label htmlFor="email" className="absolute text-xs sm:text-sm text-gray-500 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">Email address</label>
                            </div>
                            <div className="relative z-0 w-full mb-4 sm:mb-6 md:mb-8 group">
                                <input type="password" id="password" className="block py-2 px-0 w-full text-sm sm:text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-green-600 peer" placeholder=" " value={input.password} required onChange={handleChange} />
                                <label htmlFor="password" className="absolute text-xs sm:text-sm text-gray-500 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">Password</label>
                            </div>
                            <button type="submit" className="mt-6 sm:mt-8 md:mt-12 bg-[#00c38b] text-white font-bold text-base sm:text-lg md:text-xl w-full text-center rounded-2xl px-6 py-3 sm:px-8 sm:py-4 md:px-11 md:py-3">
                                Sign In
                            </button>
                            <button type="button" className="mt-4 sm:mt-6 bg-transparent border border-black text-black font-bold text-base sm:text-lg md:text-xl w-full text-center rounded-2xl px-6 py-3 sm:px-8 sm:py-4 md:px-11 md:py-3" onClick={handleGoogleLogin}>
                                <div className="flex gap-2 sm:gap-3 items-center justify-center">
                                    <i className="ri-google-fill text-lg sm:text-xl" />
                                    Continue With Google
                                </div>
                            </button>
                        </form>

                        <div className="text-xs sm:text-sm text-[#bdbdbd] leading-relaxed">
                            By signing up, you agree to our
                            <span className="text-[#00c38b] hover:underline cursor-pointer"> Terms of Service.</span>
                            <br />
                            Don't Have An Account?{" "}
                            <Link to={"/"} className="text-[#00c38b] hover:underline">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signin
