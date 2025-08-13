import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { Link } from "react-router-dom"
import { app } from "../config/firebase"
import { useState } from "react"
import { toast } from "react-toastify"

const Signup = () => {
    const [input, setInput] = useState({
        email: "", password: "", compassword: ""
    })
    const auth = getAuth(app)

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, input.email, input.password)
        } catch (error) {
            toast.error(error.code);
        }
        setInput({
            email: "", password: "", compassword: ""
        })
    }
    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }



    return (
        <>
            <section className="bg-[url('/Background.png')] h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center p-4">
                <div className="flex flex-col md:flex-row rounded-2xl overflow-hidd-lg w-full max-w-[1050px]">

                    <div className="w-full md:w-5/12 p-6 md:p-8 bg-[#084b3e]">
                        <div className="flex flex-col justify-between h-full md:h-[650px]">
                            <div>
                                <img src="/logo.png" alt="" />
                            </div>
                            <div className="text-[#f9e2ba] text-2xl md:text-4xl mt-6 md:mt-0">
                                Say hello to global food and beverage producers and suppliers, all in one place
                            </div>
                        </div>
                    </div>


                    <div className="w-full md:w-7/12 p-6 md:p-10 text-2xl md:text-4xl bg-white text-[#232323]">
                        Let’s get started <br />
                        with a few simple steps

                        <form className="w-full max-w-md my-10 md:my-20" onSubmit={handleSignUp}>
                            <div className="relative z-0 w-full mb-5 group my-8 md:my-12">
                                <input type="email" name="floating_email" id="email" value={input.email} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required onChange={handleChange} />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group my-8 md:my-12">
                                <input type="password" name="floating_password" id="password" value={input.password} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required onChange={handleChange} />
                                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group my-8 md:my-12">
                                <input type="password" name="repeat_password" id="compassword" value={input.compassword} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required onChange={handleChange} />
                                <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                            </div>
                            <button className="mt-8 md:mt-12 bg-[#00c38b] text-white font-bold text-lg md:text-xl w-full text-center rounded-2xl px-8 py-4 md:px-11 md:py-3">
                                Sign Up
                            </button>
                        </form>

                        <div className="text-sm text-[#bdbdbd]">
                            By signing up, you agree to our
                            <a href="" className="text-[#00c38b] hover:underline"> Terms of Service.</a>
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