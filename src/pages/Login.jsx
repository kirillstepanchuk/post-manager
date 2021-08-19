import React, { useContext } from 'react';
import MyButton from '../Components/UI/button/MyButton';
import MyInput from '../Components/UI/input/MyInput';
import { AuthContext } from '../context';

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = (evt) => {
        evt.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Страница для логина</h1>
            
            <form onSubmit={login}>
                <MyInput type="text" placeholder='Логин'/>
                <MyInput type="password" placeholder='Пароль'/>
                <MyButton>Войти</MyButton>
            </form>
        </div>
    )
}

export default Login;