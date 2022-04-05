import { Link } from "react-router-dom";
import { useMain } from "../MainProvider";

function Navbar() {
    const { isDarkMode, setDarkMode } = useMain();
    
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
                <div className="nav-action ml-auto">
                    <button className={`btn btn-round bg-primary ${fontClassName}`} onClick={toggleMode}>
                        <i className="material-icons">{isDarkMode ? "light_mode" : "dark_mode" }</i>
                    </button>
                </div>
            </nav>
        </div>
    )
}


export default Navbar;