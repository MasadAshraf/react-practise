import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAuthPayload, setAuthToken} from "../store/reducer/authSlice";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const isAuth = useSelector((state) => state.auth.isAuth)
    const [username, setUsername] = useState('mor_2314')
    const [password, setPassword] = useState('83r5^_')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuth){
            navigate('/')
        }

    });
    const handleLogin = (e) => {
            e.preventDefault()
        setLoading(true)
        if (username.length < 1  ){
            return false;
        }
        if (password.length < 1  ){
            return false;
        }

        fetch('https://fakestoreapi.com/auth/login',{
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({
                username : username,
                password : password
            })
        }).then(async response => {
            setLoading(false)
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                alert(error)
                return Promise.reject(error);
            }
            dispatch(setAuthToken(data.token));
            dispatch(setAuthPayload(true));
            navigate('/')
        })
            .catch(error => {

                console.error('There was an error!', error);
            });


    }

    if (loading){
        return (
            <h1>Loading....</h1>
        )
    }
    return (
        <div>
            <form>
                <label>Please enter username</label>
                <input value={username} type={'text'} onChange={(e) => setUsername(e.target.value)} />
                <label>Please enter password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value) } type={'password'}/>
                <button onClick={(e) => handleLogin(e)}>Login</button>
            </form>
        </div>
    )


}