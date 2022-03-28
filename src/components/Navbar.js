import { Link } from "react-router-dom";

function Navbar() {
    return(
        <div>
            <nav className="nav-bar nav">
                <div className="logo pl-xl">
                    <Link to="/" className="logo-text charcoal-white">Pomodoro</Link>
                </div>
                {/* <ul className="nav-action ml-auto mr-md">
                    <li className="nav-action-item">
                        <a className="nav-action-text charcoal-white mr-md" href="./alert.html">Components</a></li>
                    <li className="nav-action-item"><a className="nav-action-text charcoal-white" href="https://github.com/surajmore98/charcoal-ui">Github</a></li>
                </ul> */}
            </nav>
        </div>
    )
}


export default Navbar;