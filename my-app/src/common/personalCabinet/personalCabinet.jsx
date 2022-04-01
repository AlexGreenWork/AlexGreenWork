import React, {useEffect, useState} from "react";
import s from "./personalCabinet.module.css"
import {NavLink} from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../config";
import {useDispatch, useSelector} from "react-redux";
import { store } from "../../reducers";
import {NotifOffersProcessing, NotifConclusionProcessing} from "../../reducers/notificationReducer"
import MessageStatus from "./messages/messages_status";

// const isAuth = useSelector(state => state.user.isAuth)
// const dispatch = useDispatch()



export const CountNoBrowsing = () =>{
    let tabNum = localStorage.getItem('userTabelNum');
    const [alloffers, setAllOffers] =  useState(null);
    const dispatch = useDispatch()
    const countOffers = useSelector(state => state.notification.offerForProcessing.offersProcess)
   
   
    if(alloffers === null){
        BrowseHistory(tabNum)

    }

    function BrowseHistory(tab){
        let tabNum = localStorage.getItem('userTabelNum');
        try {
            axios.post(`${API_URL}api/offers/getHistoryBrowsing`, {
                tabNum: tabNum,

            })
                .then(res => {
                    let history = res.data;
                    if(history !== null){
                        responsibleToOffersClose(Number(history[0]))
                        // dispatch(NotifOffersProcessing(Number(history[0]), oldConc));
                    } else {
                        // dispatch(NotifOffersProcessing(Number(history[0]), oldConc));
                        responsibleToOffersClose(Number(history[0]))
                    }
                })
        } catch (e) {
            alert(e.response)
        }
    }

    function  responsibleToOffersClose(browsHist){
       
        try{
            axios.post(`${API_URL}api/offers/responsibleToOffers`, {  tabNum: tabNum,
    
            })
                .then(res => {
                        if(res.data != 'noResponsible' ){
                            console.log(res.data)
                             dispatch(NotifOffersProcessing(browsHist, [res.data[1], res.data[2]]));
                            // setResponsible(<OffersResponsible count= {countResp}/>)
                        } else {
                            dispatch(NotifOffersProcessing(browsHist, "noResponsible"));
                        }
                })
        } catch (e){
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

function OffersResponsible(props){
  
    if(props.count != 'noResponsible'){
        return(
            <div className={s.navOffers}>
              
                <div className={s.linksPC}><NavLink className={s.offers} to="/personalCabinet/offersResponsible">Ваши заключения</NavLink></div>
               {props.count > 0 ? ( <div className={s.countUnlock}>{props.count}</div> ) : <div/>}
                {/* <div className={s.countUnlock}>{props.count}</div>  */}
            </div>
            
        )
    } else {
        return(<div></div>)
    }
    
}


 
const PersonalCabinet = () => {
   
    const countResp = useSelector(state => state.notification.offerForProcessing.notifConc[0])

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
                <OffersResponsible count= {countResp}/>

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
                <OffersResponsible count= {countResp}/>

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
                <OffersResponsible count= {countResp}/>
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
                    <OffersResponsible count= {countResp}/>
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