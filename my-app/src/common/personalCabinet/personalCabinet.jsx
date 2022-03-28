import React, {useState} from "react";
import s from "./personalCabinet.module.css"
import {NavLink} from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../config";
import {useDispatch, useSelector} from "react-redux";
import { store } from "../../reducers";
import {NotifOffersProcessing} from "../../reducers/notificationReducer"
import MessageStatus from "./messages/messages_status";

// const isAuth = useSelector(state => state.user.isAuth)
// const dispatch = useDispatch()



export const CountNoBrowsing = () =>{
    let tabNum = localStorage.getItem('userTabelNum');
    const [alloffers, setAllOffers] =  useState(null);
    const dispatch = useDispatch()
    const countOffers = useSelector(state => state.notification.offerForProcessing)

    if(alloffers === null){
        BrowseHistory(tabNum)

    } else{

    }
    function BrowseHistory(tab){
        let tabNum = localStorage.getItem('userTabelNum');
        try {
            axios.post(`${API_URL}api/offers/getHistoryBrowsing`, {
                tabNum: tabNum,

            })
                .then(res => {


                    let history = res.data;

                    // Resp(history)
                    if(history !== null){

                        dispatch(NotifOffersProcessing(history[0]));
                    } else {
                        dispatch(NotifOffersProcessing(history[0]));

                    }


                })
        } catch (e) {
            alert(e.response)
        }
    }


    // function Resp(history) {
    //
    //     let xhr = new XMLHttpRequest();
    //     xhr.open('GET', `${API_URL}api/offers/allOffers`, true)
    //     xhr.onreadystatechange = function () {
    //         if (this.readyState === 4 && this.status === 200) {
    //             if(history !== null){
    //                 // setAllOffers(JSON.parse(xhr.response).length-history.length)
    //
    //                 dispatch(NotifOffersProcessing(JSON.parse(xhr.response).length-history.length));
    //             } else {
    //                 dispatch(NotifOffersProcessing(JSON.parse(xhr.response).length));
    //                 // setAllOffers(JSON.parse(xhr.response).length)
    //             }
    //
    //         }
    //     }
    //     xhr.send();
    // }

    if (countOffers > 0) {
        return (
            <div className={s.countNoBrowser}>
                {countOffers}
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }

}

export const CountMessageNoBrowsing = (props) => {
    if(props?.unread_message_count)
    {
        let unread = 0
        for(const key in props.unread_message_count)
        {
            unread += props.unread_message_count[key];
        }

        if(unread > 0)
        {
            return (
                <div className={s.countNoBrowser}>
                    {unread}
                </div>
            )
        }
    }

    return null;
}


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
                                                    to="/personalCabinet/messages"> Сообщения </NavLink>
                    <MessageStatus>
                        <CountMessageNoBrowsing/>
                    </MessageStatus>
                </div>

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
                    обработки</NavLink>
                    <CountNoBrowsing/></div>

                <div className={s.linksPC}>
                    <NavLink className={s.offers}
                             to="/personalCabinet/messages">
                        Сообщения
                    </NavLink>
                    <MessageStatus>
                        <CountMessageNoBrowsing/>
                    </MessageStatus>
                </div>

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
                    обработки
                    <CountNoBrowsing/></NavLink></div>

                <div className={s.linksPC}><NavLink className={s.offers}
                                                    to="/personalCabinet/messages"> Сообщения </NavLink>

                    <MessageStatus>
                        <CountMessageNoBrowsing/>
                    </MessageStatus>
                </div>

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
                    Панель Рабочей группы
                </NavLink></div>


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
                    обработки</NavLink>
                    <CountNoBrowsing/></div>

                <div className={s.linksPC}><NavLink className={s.offers}
                                                    to="/personalCabinet/messages"> Сообщения </NavLink>
                    <MessageStatus>
                        <CountMessageNoBrowsing/>
                    </MessageStatus>
                </div>

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