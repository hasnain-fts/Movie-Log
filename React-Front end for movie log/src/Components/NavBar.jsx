import { Link, useLocation } from "react-router-dom"

function Navbar() {
    const location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 sticky-top">
            <Link className="navbar-brand fw-bold fs-4" to='/'>
                🎬 Movie-Log
            </Link>
            <div className="d-flex gap-3 ms-auto">
                <Link
                    to='/'
                    className={`nav-link text-white ${location.pathname === '/' ? 'fw-bold border-bottom border-danger' : ''}`}
                >
                    Home
                </Link>
                <Link
                    to='/favorates'
                    className={`nav-link text-white ${location.pathname === '/favorates' ? 'fw-bold border-bottom border-danger' : ''}`}
                >
                    Favourites
                </Link>
                <Link
    to='/login'
    className={`nav-link text-white ${location.pathname === '/login' ? 'fw-bold border-bottom border-danger' : ''}`}
>
    Logout
</Link>
            </div>
        </nav>
    )
}
export default Navbar;