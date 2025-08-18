import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase"; // <-- make sure db is exported from firebase.js
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const Addproduct = () => {
    const [input, setInput] = useState({
        name: "",
        color: "",
        category: "",
        price: "",
    });

    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let tempObj = {};
        if (input.name.trim() === "") tempObj.name = "Product Name is required";
        if (input.color.trim() === "") tempObj.color = "Color is required";
        if (input.category.trim() === "") tempObj.category = "Category is required";
        if (input.price.trim() === "") {
            tempObj.price = "Price is required";
        } else if (Number(input.price) <= 0) {
            tempObj.price = "Price must be greater than 0";
        }

        setError(tempObj);

        if (Object.keys(tempObj).length === 0) {
            try {
                await addDoc(collection(db, "Products"), {
                    name: input.name,
                    color: input.color,
                    category: input.category,
                    price: Number(input.price),
                });
                setInput({ name: "", color: "", category: "", price: "" });
                navigate("/dashboard");
                toast.success("product added Successfully")
            } catch (err) {
                toast.error(err);
            }
        }
    };

    return (
        <section className="bg-[url('/Background.png')] min-h-screen bg-no-repeat bg-cover bg-center flex items-center justify-center p-4 relative pt-[100px]">
            <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden w-full max-w-[1050px] shadow-lg">

    
                <div className="w-full md:w-5/12 p-6 md:p-8 bg-[#084b3e] flex flex-col justify-between">
                    <img src="/logo.png" alt="logo" className="w-32" />
                    <div className="text-[#f9e2ba] text-2xl md:text-4xl mt-6">
                        Say hello to global food and beverage producers and suppliers,
                        all in one place
                    </div>
                </div>

              
                <div className="w-full md:w-7/12 p-6 md:p-10 text-xl md:text-2xl bg-white text-[#232323] flex flex-col justify-center">
                    <p className="mb-6">
                        Let’s get started <br /> with a few simple steps
                    </p>

                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <div className="relative z-0 w-full group my-6 md:my-10">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={input.name}
                                onChange={handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Product Name
                            </label>
                            {error.name && <p className="text-red-500 text-xs mt-1">{error.name}</p>}
                        </div>

                        <div className="relative z-0 w-full mb-2 group my-6 md:my-10">
                            <span className="block mb-2 text-sm font-medium text-gray-500">Color</span>
                            <div className="flex items-center gap-6">
                                {["Red", "Blue", "Black"].map((clr) => (
                                    <label key={clr} className="flex items-center gap-2 text-sm text-gray-700">
                                        <input
                                            type="radio"
                                            name="color"
                                            value={clr}
                                            checked={input.color === clr}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300"
                                        />
                                        {clr}
                                    </label>
                                ))}
                            </div>
                            {error.color && <p className="text-red-500 text-xs mt-1">{error.color}</p>}
                        </div>

                       
                        <div className="relative z-0 w-full mb-2 group my-6 md:my-10">
                            <select
                                id="category"
                                name="category"
                                value={input.category}
                                onChange={handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            >
                                <option value="">-- Select Category --</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Mobile">Mobile</option>
                            </select>
                            <label
                                htmlFor="category"
                                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] 
                                peer-focus:start-0 peer-focus:text-green-600 
                                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Category
                            </label>
                            {error.category && <p className="text-red-500 text-xs mt-1">{error.category}</p>}
                        </div>

                        
                        <div className="relative z-0 w-full mb-2 group my-6 md:my-10">
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={input.price}
                                onChange={handleChange}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="price"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Price
                            </label>
                            {error.price && <p className="text-red-500 text-xs mt-1">{error.price}</p>}
                        </div>

                        <button className="mt-4 bg-[#00c38b] text-white font-bold text-lg md:text-xl w-full text-center rounded-2xl px-8 py-4 md:px-11 md:py-3">
                            + Add Product
                        </button>
                    </form>

                    <div className="text-sm text-[#bdbdbd] mt-6">
                        you agree to our
                        <a className="text-[#00c38b] hover:underline">Terms of Service.</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Addproduct;
