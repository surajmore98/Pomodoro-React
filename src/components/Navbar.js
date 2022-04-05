import { Link } from "react-router-dom";

function Navbar() {
    return(
        <div>
            <nav className="nav-bar nav">
                <div className="logo pl-xl">
                    <Link to="/" className="logo-text charcoal-white">Pomodoro</Link>
                </div>
            </nav>
        </div>
    )
}


export default Navbar;