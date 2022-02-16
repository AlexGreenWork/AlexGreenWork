import React, {useState} from "react";
import s from "./personalCabinet.module.css"
import {NavLink} from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../../config";






const CountNoBrowsing = () =>{
    let tabNum = localStorage.getItem('userTabelNum');
    const [alloffers, setAllOffers] =  useState(null);
   
    if(alloffers === null){
        BrowseHistory(tabNum)
  
    } else{
        console.log(alloffers.length)
    }
    function BrowseHistory(tab){
        let tabNum = localStorage.getItem('userTabelNum');
        try {
            axios.post(`${API_URL}api/offers/getHistoryBrowsing`, {
                tabNum: tabNum,
    
            })
                .then(res => {
    
    
                    let history = res.data;
    
                    Resp(history)
                    console.log(history)
                  
                   
                })
        } catch (e) {
            alert(e.response)
        }
    }
    
   
        function Resp(history) {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', `${API_URL}api/offers/allOffers`, true)
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    if(history !== null){
                        setAllOffers(JSON.parse(xhr.response).length-history.length)
                        console.log(JSON.parse(xhr.response).length-history.length)  
                    } else {
                        setAllOffers(JSON.parse(xhr.response).length)
                    }
                  
                }
            }
            xhr.send();
    }
    return (
        <div>{alloffers}</div>
    )
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
                    обработки</NavLink>
                    <CountNoBrowsing/></div>

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
                    обработки
                    <CountNoBrowsing/></NavLink></div>

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