import React from "react";
import logo from "./../../Pics/logo/Belaz_logo.png";
import s from "./header.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
// import avatarLogo from '../../assets/img/avatar.svg'
import { API_URL } from "../../config";
import GoBack from "../buttons/backButton/backButton";
import Clock from "./clock/clock";

const Header = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const avatar = currentUser.avatar
    ? `${API_URL + "files/avatar/" + currentUser.avatar}`
    : `${
        API_URL +
        "files/photos/" +
        localStorage.getItem("userTabelNum") +
        ".jpg"
      }`;

  return (
    <div className={s.header}>
      <div className={s.clear}>
        <GoBack />
      </div>
      <Clock/>
      <div
        className={s.brand}
        style={{
          padding: "2px",
          backgroundColor: "rgba(255, 255, 255, .3)",
          borderRadius: "3px",
        }}
      >
        <img className={s.logotype} src={logo} alt="logo"></img>
      </div>
      <div
        style={{
          position: "absolute",
          top: "0",
          color: "white",
          marginLeft: 0,
          width: "100%",
          fontSize: ".8em",
          textAlign: "center",
        }}
      >
        {" "}
        Для помощи подачи предложения можете обратиться по тел: 94-19
      </div>
      <div className={s.loginBar}>
        {!isAuth && (
          <div className="navbar__login">
            <NavLink to="/authorization" style = {{textShadow: "2px 1px 6px black"}}>Войти</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to="/registration" style = {{textShadow: "2px 1px 6px black"}}>Регистрация</NavLink>
          </div>
        )}

        {isAuth && (
          <NavLink to="/profile">
            <div
              className={s.avatar}
              style={{
                backgroundImage: `url("${avatar}")`,
                width: 40,
                backgroundSize: "cover",
                height: 40,
                borderRadius: "50%",
              }}
            ></div>

            {/*<img className={s.avatar} src={avatar} alt="avatarLogo"/>*/}
          </NavLink>
        )}
        {isAuth && (
          <div className={s.navbarLogin} onClick={() => dispatch(logout())} style = {{textShadow: "2px 1px 6px black"}}>
            Выход
          </div>
        )}
      </div>
      <div className={s.containerWaves}>
        <svg
          className={s.waves}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className={s.parallax}>
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
};
export default Header;
