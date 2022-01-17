import React from "react";
import logo from "./../../Pics/logo/Belaz_logo.png";
import s from "./header.module.css"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
// import avatarLogo from '../../assets/img/avatar.svg'
import {API_URL} from "../../config";
import GoBack from "../buttons/backButton/backButton";


const Header = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()


    const avatar = currentUser.avatar  ? `${API_URL + 'files/avatar/' + currentUser.avatar}` : `${API_URL + 'files/photos/' + localStorage.getItem("userTabelNum") + ".jpg"}`

    return (<div className={s.header}>
        <div className={s.clear}>
            <GoBack/>
        </div>

        <div className={s.brand} style={{
            padding: "2px",
            backgroundColor: "rgba(255, 255, 255, .3)",
            borderRadius: "3px"
        }} >

            <img className={s.logotype} src={logo} alt="logo"></img>
        </div>
       <div style={{
           position: "absolute",
           top: "0",
           color: "white",
           marginLeft:0,
           width:"100%",
           fontSize:".8em",
           textAlign:"center"
       }}> Для помощи подачи предложения  можете обратиться по тел: 94-19</div>
        <div className={s.loginBar}>
            {!isAuth && <div className="navbar__login"><NavLink to="/authorization">Войти</NavLink></div>}
            {!isAuth &&
                <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}

            {isAuth && <NavLink to='/profile'>
                <div className={s.avatar} style={{
                    backgroundImage: `url("${avatar}")`,
                    width: 40,
                    backgroundSize: "cover",
                    height: 40,
                    borderRadius: "50%"
                }}>
                </div>


                {/*<img className={s.avatar} src={avatar} alt="avatarLogo"/>*/}
            </NavLink>}
            {isAuth && <div className={s.navbarLogin} onClick={() => dispatch(logout())}>Выход</div>}

        </div>
    </div>)
}
export default Header;