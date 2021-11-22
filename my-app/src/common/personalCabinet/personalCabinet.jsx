import React from "react";
import s from "./personalCabinet.module.css"
import {NavLink} from "react-router-dom";
import Messages from "./messages/messages";
import Offers from "../offers/offers";


const PersonalCabinet = () => {


    function IsAdminUser(props) {
        return (
            <div className={s.navPCab}>
                <div className={s.linksPC}>
                    <NavLink className={s.offers} to="/personalCabinet/myOffers">Мои Предложения</NavLink>
                </div>

                <div className={s.linksPC}><NavLink className={s.offers}
                                                    to="/personalCabinet/messages"> Сообщения </NavLink></div>

                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/files">
                    Мои файлы
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/tasks">
                    Задачи
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/findWorkers">
                    Найти сотрудника
                </NavLink></div>
            </div>
        )
    }

    function IsAdminAdmin(props) {
        return (
            <div className={s.navPCab}>

                <div className={s.linksPC}>
                    <NavLink className={s.offers} to="/personalCabinet/myOffers">Мои Предложения</NavLink>
                </div>

                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/Offers">Предложения для
                    обработки</NavLink></div>

                <div className={s.linksPC}><NavLink className={s.offers}
                                                    to="/personalCabinet/messages"> Сообщения </NavLink></div>

                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/files">
                    Мои файлы
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/tasks">
                    Задачи
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/findWorkers">
                    Найти сотрудника
                </NavLink></div>
                <div className={s.linksPC}>
                    <NavLink className={s.offers} to="/personalCabinet/myOffers">Панель администратора</NavLink>
                </div>
            </div>
        );
    }

    function IsAdminRG(props) {
        return (
            <div className={s.navPCab}>
                <div className={s.linksPC}>
                    <NavLink className={s.offers} to="/personalCabinet/myOffers">Мои Предложения</NavLink>
                </div>

                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/Offers">Предложения для
                    обработки</NavLink></div>

                <div className={s.linksPC}><NavLink className={s.offers}
                                                    to="/personalCabinet/messages"> Сообщения </NavLink></div>

                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/files">
                    Мои файлы
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/tasks">
                    Задачи
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/findWorkers">
                    Найти сотрудника
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/findWorkers">
                    Панель Рабочей группы
                </NavLink></div>
            </div>
        )
    }

    function AdminChange(props) {
        const isAdmin = props.isAdmin;
        if (isAdmin == 'wg') {
            return <IsAdminRG/>;
        }
        if (isAdmin == 'user') {
            return <IsAdminUser/>;
        }
        if (isAdmin == 'admin') {
            return <IsAdminAdmin/>;
        }else{
            return <IsAdminUser/>
        }



    }


    return (
        <div className={s.personalCabinetContainer}>
            <div className={s.header}>
                <div className={s.upHeader}>
                    <div></div>
                    <div className={s.namePage}><h4>Личный кабинет</h4></div>

                </div>

            </div>

            <AdminChange isAdmin={localStorage.getItem("userAdminOptions")}/>


        </div>
    )
}
export default PersonalCabinet;