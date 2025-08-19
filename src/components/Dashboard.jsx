import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Products"));
            let tempArr = [];
            querySnapshot.forEach((doc) => {
                tempArr.push({ id: doc.id, ...doc.data() });
            });
            setProducts(tempArr);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "Products", id))
            fetchProducts()
            toast.success("Product Deleted Successful")
        } catch (error) {
            toast.error(error.code)
        }
    }

    const handleEdit = async(id) => {
        navigate(`/editproduct/${id}`)
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <section className="bg-[url('/Background.png')] h-screen bg-no-repeat bg-cover bg-center p-4">
            <div className="container mx-auto">
                <div className="relative top-28">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-xl text-white">Dashboard</h2>
                        <Link
                            to={"/addproduct"}
                            className="bg-[#00c38b] py-2 px-4 rounded-xl text-white my-7 font-semibold shadow-md"
                        >
                            + Add Product
                        </Link>
                    </div>


                    {products.length > 0 ? (
                        <div className="overflow-hidden rounded-xl shadow-md bg-white">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">Product Name</th>
                                        <th className="px-6 py-3">Color</th>
                                        <th className="px-6 py-3">Category</th>
                                        <th className="px-6 py-3">Price</th>
                                        <th className="px-6 py-3">Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="bg-white border-b hover:bg-gray-50"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                            >
                                                {product.name}
                                            </th>
                                            <td className="px-6 py-4">{product.color}</td>
                                            <td className="px-6 py-4">{product.category}</td>
                                            <td className="px-6 py-4">${product.price}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() => {
                                                            handleEdit(product.id)
                                                        }}
                                                        className="font-medium text-blue-600 hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            handleDelete(product.id)
                                                        }}
                                                        className="font-medium text-red-600 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center bg-white/70 rounded-xl shadow-md py-16 px-6 mt-8">
                            <svg
                                className="w-16 h-16 text-gray-400 mb-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 17v-6h13M5 13l4 4L19 7"
                                />
                            </svg>
                            <p className="text-gray-700 text-lg font-semibold mb-2">
                                No products found
                            </p>
                            <p className="text-gray-500 text-sm mb-4">
                                Start by adding your first product to see it here.
                            </p>
                            <Link
                                to="/addproduct"
                                className="bg-[#00c38b] text-white px-6 py-2 rounded-lg shadow hover:bg-[#00a877] transition"
                            >
                                + Add your first product
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
