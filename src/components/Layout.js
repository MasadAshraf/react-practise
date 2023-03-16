import {Link, Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAuthPayload} from "../store/reducer/authSlice";

export default function Layout() {
    const isAuth = useSelector((state) => state.auth.isAuth)
    const dispatch = useDispatch();

    const handleLogout = () => {
        console.log('am logout')
        window.localStorage.clear();
        dispatch(setAuthPayload(false))
    }
    return (
        <>
            {isAuth ? <nav>
                <ul>
                    <li><Link to={'/'}>Home</Link></li>
                    <li>
                        <Link to={'products'}>Products</Link>
                    </li>
                    <li>
                        <a href="#" onClick={() => handleLogout()}>logout</a>
                    </li>

                </ul>
            </nav> : 'Please login first'}
            <div>
                <Outlet/>
            </div>
        </>
    )
}