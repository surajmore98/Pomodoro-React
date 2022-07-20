import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMain } from "../MainProvider";

function Navbar() {
    const { isDarkMode, setDarkMode } = useMain();
    const navigate = useNavigate();
    const location = useLocation();

    function toggleMode() {
        setDarkMode((mode) => !mode);
    }

    const fontClassName = isDarkMode ? 'charcoal-black' : 'charcoal-white';

    return (
        <div>
            <nav className="nav-bar bg-primary">
                <div className="logo pl-xl">
                    <Link to="/" className={`logo-text ${fontClassName}`}>Pomodoro</Link>
                </div>
                <div className="nav-action-group ml-auto">
                    { location.pathname.toString().indexOf("/task/") > -1 &&
                        <div className="nav-action">
                            <button className={`btn font-bold white bg-charcoal-black ml-auto`} onClick={() => navigate("/")}>Back To List</button>
                        </div>
                    }
                    <div className="nav-action">
                        <button className={`btn btn-round bg-primary ${fontClassName}`} onClick={toggleMode}>
                            <i className="material-icons">{isDarkMode ? "light_mode" : "dark_mode" }</i>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}


export default Navbar;