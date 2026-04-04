import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaCartShopping } from "react-icons/fa6";
import useCarts from "../../../hooks/useCarts";


const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const [cart] = useCarts()

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Our Menu</Link></li>
        <li><Link to="/order/salad">Order Food</Link></li>

        <li>
            <Link to="/dashboard/cart">
                <button className="btn btn-ghost">
                    <FaCartShopping /> 
                    <div className="badge badge-sm badge-secondary">+{cart.length}</div>
                </button>
            </Link>
        </li>

        <li>
            {
                user ?
                    <>
                        <div>
                            <span className="bg-amber-50 text-black rounded-2xl px-5">{user?.displayName}</span>
                            <button onClick={handleLogOut}  >LogOut</button>
                        </div>

                    </> : <>
                        <Link to="/login">Login</Link>
                    </>
            }
        </li>

    </>

    return (
        <>
            <div className="navbar max-w-7xl fixed z-10 bg-black/60 text-white shadow-sm ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 items-center">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </>
    );
};

export default Navbar;