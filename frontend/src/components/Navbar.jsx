import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar">

            <div className="logo">

                <h2>JobPortal</h2>

            </div>

            <div className="nav-links">

                <Link to="/login">
                    <button className="nav-btn">
                        Sign In
                    </button>
                </Link>

                <Link to="/register">
                    <button className="nav-btn register-btn">
                        Create Account
                    </button>
                </Link>

            </div>

        </nav>

    );

}

export default Navbar;