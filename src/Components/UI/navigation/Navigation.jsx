import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';


const Navigation = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        <div className='navigation'>
            {isAuth &&
                <MyButton onClick={logout}>
                    Выйти
                </MyButton>
            }
            
            <div className='navigation__links'>
                <Link to='/about' style={{marginRight: '15px'}}><MyButton>О сайте</MyButton></Link>
                <Link to='/posts'><MyButton>Список постов</MyButton></Link>
            </div>
        </div>
    )
}

export default Navigation;