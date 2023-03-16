import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import Root from "./components/Root";
import Layout from "./components/Layout";
import Products from "./components/Products";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setAuthPayload} from './store/reducer/authSlice';
import Login from "./components/Login";

function App() {
    const isAuth = useSelector((state) => state.auth.isAuth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            dispatch(setAuthPayload(false))
            navigate('/login')
        } else {
            dispatch(setAuthPayload(true))
        }
    }, [isAuth]);

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<><Root/></>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/login" element={<Login/>}/>
            </Route>
        </Routes>
    );
}

export default App;
