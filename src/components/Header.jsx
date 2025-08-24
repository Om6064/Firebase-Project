import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../config/firebase";
import { toast } from "react-toastify";

const useAuthenticationStatus = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth]);

    return user;
};

const Header = () => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const user = useAuthenticationStatus();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            toast.success("Signed out successfully");
            navigate("/signin");
        } catch (error) {
            toast.error("Something Went Wrong");
        }
    };

    return (
        <nav className="absolute top-0 z-10 w-full bg-black/70">
            <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo.png" className="h-16" alt="logo" />
                </Link>

                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                <div className={`${menuOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col justify-center items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        {!user ? (
                            <Link
                                to={"/signin"}
                                className="bg-[#00c38b] py-2 px-4 rounded-xl text-white"
                            >
                                Sign In
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to={"/dashboard"}
                                    className="text-white hover:text-[#00c38b]"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="bg-red-600 py-2 px-4 rounded-xl text-white"
                                >
                                    Sign Out
                                </button>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;