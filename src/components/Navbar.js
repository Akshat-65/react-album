import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar-wrapper">
            <div className="header">
                <span className="heading">ALBUMS</span>
                <div>
                    <Link to="/"><span className="nav">Home</span></Link>
                    <Link to="/add"><span className="nav">Add album</span></Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;