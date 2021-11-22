import React from "react";
import s from "./navFooter.module.css"
import {NavLink} from "react-router-dom";

const Navfooter = () => {
    return (
        <div className={s.navContainer}>
            <div className={s.buttons}>

                <NavLink className="active" to="/" title="home">
                    Главная
                </NavLink>
                <NavLink to="/personalCabinet/authorization" title="personal Cabinet">
                    Личный кабинет
                </NavLink>
                <NavLink to="#" title="Title 3">
                    Назад
                </NavLink>

            </div>
        </div>
    );

}
export default Navfooter;