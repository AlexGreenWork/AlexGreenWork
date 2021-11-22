import React from "react";
import s from "./personalCabinet.module.css"
import {NavLink} from "react-router-dom";
import Messages from "./messages/messages";
import Offers from "../offers/offers";


const PersonalCabinet = () => {
    return (
        <div className={s.personalCabinetContainer}>
            <div className={s.header}>
                <div className={s.upHeader}>
                    <div></div>
                    <div className={s.namePage}><h4>Личный кабинет</h4></div>

                </div>

            </div>

            <div className={s.navPCab}>
                <ul className={s.topmenu}>
                    <li><NavLink className={s.down} to="/personalCabinet/Offers">Предложения > </NavLink>
                        <ul className={s.submenu}>
                            <li><NavLink  to="/personalCabinet/myOffers">Мои Предложения</NavLink>
                            </li>
                            <li><NavLink  to="/personalCabinet/Offers">Предложения для
                                обработки</NavLink></li>

                        </ul>
                    </li>
                </ul>
                <NavLink className={s.offers} to="/personalCabinet/messages" > Сообщения </NavLink>

                <NavLink className={s.offers} to="/personalCabinet/files"  >
                    Мои файлы
                </NavLink>
                <NavLink className={s.offers} to="/personalCabinet/tasks"  >
                    Задачи
                </NavLink>
                <NavLink className={s.offers} to="/personalCabinet/findWorkers"  >
                    Найти сотрудника
                </NavLink>

            </div>
            <div className={s.contentContainer}>
                {/*<Messages/>*/}

                {/*<Offers/>*/}


            </div>


        </div>
    )
}
export default PersonalCabinet;