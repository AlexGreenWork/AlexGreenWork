import React from "react";
import logo from "./../../Pics/logo/Belaz_logo.png";
import s from "./header.module.css"
import {NavLink, withRouter} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import avatarLogo from '../../assets/img/avatar.svg'
import {API_URL} from "../../config";
import GoBack from "../buttons/backButton/backButton";


const Header = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const avatar = currentUser.avatar ? `${API_URL + 'files/avatar/' + currentUser.avatar}` : avatarLogo

    return (<div className={s.header}>
            <div className={s.clear}>
                <GoBack/>
            </div>

            <div className={s.brand}>
                <img className={s.logotype} src={logo} alt="logo"></img>
            </div>
            <div className={s.loginBar}>
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth &&
                    <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}

                {isAuth && <NavLink to='/profile'>
                    <img className={s.avatar} src={avatar} alt="avatarLogo"/>
                </NavLink>}
                    {isAuth && <div className={s.navbarLogin} onClick={() => dispatch(logout())}>Выход</div>}

            </div>
        </div>)
}
export default Header;