import React, {useState} from "react";
import s from "./personalCabinet.module.css"
import {NavLink} from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../config";
import Messages from "./messages/messages";
import Offers from "../offers/offers";
import OffersResponsible from "./responsible/responsible";


const PersonalCabinet = () => {

    const [responsible, setResponsible] = useState(null)
    let tabNum = localStorage.getItem('userTabelNum');
     try{
        axios.post(`${API_URL}api/offers/responsibleToOffers`, {  tabNum: tabNum,

                                                    })
                                                    .then(res => {
                                                        if(responsible == null){
                                                            if(res.data != 'noResponsible' ){
                                                                setResponsible( <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/offersResponsible">Ваши заключения</NavLink></div>)
                                                            }

                                                        }



                                                    })
    } catch (e){
        alert(e.response)
    }


    function IsAdminUser(props)
    {
        return (
            <div className={s.navPCab}>
                <div className={s.linksPC}>
                    <NavLink className={s.offers} to="/personalCabinet/myOffers">Мои Предложения</NavLink>
                </div>

                <div className={s.linksPC}><NavLink className={s.offers}
                                                    to="/personalCabinet/messages"> Сообщения </NavLink></div>

                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/myFiles">
                    Мои файлы
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/tasks">
                    Задачи
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/findWorkers">
                    Найти сотрудника
                </NavLink></div>
                
                    {responsible}

            </div>
        )
    }

    function IsAdminAdmin(props)
    {
        return (
            <div className={s.navPCab}>

                <div className={s.linksPC}>
                    <NavLink className={s.offers} to="/personalCabinet/myOffers">Мои Предложения</NavLink>
                </div>

                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/Offers">Предложения для
                    обработки</NavLink></div>

                <div className={s.linksPC}><NavLink className={s.offers}
                                                    to="/personalCabinet/messages"> Сообщения </NavLink></div>

                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/myFiles">
                    Мои файлы
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/tasks">
                    Задачи
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/findWorkers">
                    Найти сотрудника
                </NavLink></div>
                <div className={s.linksPC}>
                    <NavLink className={s.offers} to="/personalCabinet/adminPanelComission">Панель администратора</NavLink>
                </div>

                {responsible}


            </div>
        );
    }

    function IsAdminRG(props)
    {
        return (
            <div className={s.navPCab}>
                <div className={s.linksPC}>
                    <NavLink className={s.offers} to="/personalCabinet/myOffers">Мои Предложения</NavLink>
                </div>

                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/Offers">Предложения для
                    обработки</NavLink></div>

                <div className={s.linksPC}><NavLink className={s.offers}
                                                    to="/personalCabinet/messages"> Сообщения </NavLink></div>

                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/myFiles">
                    Мои файлы
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/tasks">
                    Задачи
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/findWorkers">
                    Найти сотрудника
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/">
                    Панель Рабочей группы
                </NavLink></div>
                <div className={s.linksPC}>
                    <NavLink className={s.offers} to="/personalCabinet/adminPanelTopComission">Панель Рабочей группы</NavLink>
                </div>

                    {responsible}

            </div>
        )
    }
    function IsAdminTopComission(props) {
        return (
            <div className={s.navPCab}>
                <div className={s.linksPC}>
                    <NavLink className={s.offers} to="/personalCabinet/myOffers">Мои Предложения</NavLink>
                </div>

                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/Offers">Предложения для
                    обработки</NavLink></div>

                <div className={s.linksPC}><NavLink className={s.offers}
                                                    to="/personalCabinet/messages"> Сообщения </NavLink></div>

                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/myFiles">
                    Мои файлы
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/tasks">
                    Задачи
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/findWorkers">
                    Найти сотрудника
                </NavLink></div>
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/adminPanelComission">
                    Панель руководства
                </NavLink></div>
                <div className={s.linksPC}>
                    {responsible}
                </div>
            </div>
        )
    }

    function AdminChange(props)
    {
        const isAdmin = props.isAdmin;
        if (isAdmin == 'wg') {
            return <IsAdminRG/>;
        }
        if (isAdmin == 'user') {
            return <IsAdminUser/>;
        }
        if (isAdmin == 'admin') {
            return <IsAdminAdmin/>;
        }if (isAdmin == 'topComission') {
            return <IsAdminTopComission/>;
        }
        else{
            return <IsAdminUser/>
        }
    }


    return (
        <div className={s.personalCabinetContainer}>
            <div className={s.header}>
                <div className={s.upHeader}>
                    <div></div>
                    <div className={s.namePage}>
                        <h4>Личный кабинет</h4>
                    </div>
                </div>
            </div>
            <AdminChange isAdmin={localStorage.getItem("userAdminOptions")}/>
        </div>
    )
}
export default PersonalCabinet;