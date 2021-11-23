import React, { useState } from "react";
import {NavLink} from "react-router-dom";
import s from "./sendOffer/offerForm/offers.module.css"
import {API_URL} from "../../config";



function Resp() {
    
    let xhr = new XMLHttpRequest();

    let userPhoneNumber = localStorage.getItem('userPhoneNumber');
    let userTabelNum = localStorage.getItem('userTabelNum');
    let userName = localStorage.getItem('userName');
    let userSurName = localStorage.getItem('userSurName');
    let userMiddleName = localStorage.getItem('userMiddleName');
    
    let userEmail = localStorage.getItem('userEmail');
   

    xhr.open('POST', `${API_URL}api/offers/myOffers`, false); /// СИНХРОННЫЙ ЗАПРОС!!!
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`firstName=${userName}&userSurName=${userSurName}&middleName=${userMiddleName}&email=${userEmail}`+
            `&tabelNumber=${userTabelNum}&phoneNumber=${userPhoneNumber}`);
                 
          
           xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let result = this.responseText;
                               
                return result
      }

    }
    
    return xhr.response
}

const Offer = (props) => {
    return (
        <div>
            <NavLink to='/cardOffer' onClick={() => {
                Message(props.id)
            }}>
                <div className={s.header}>
                    <div className={s.offerPreview}>
                        <div className={s.from}>

                            <div className={s.fromName}>  {props.surname + " " + props.name + " " + props.midlename}</div>
                            <div className={s.date}> {props.date.slice(0, 10)}</div>
                            <div className={s.status}>  {props.status}</div>
                        </div>
                        <div className={s.offerText}>{props.nameOffer}</div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

function Message(id) {
    let offersData = JSON.parse(Resp());
     console.log(offersData[0]);
    offersData.map((offerArr) => {
        if (offerArr.Id === id) {
           
            let msg = document.createElement('div');
            msg.className = "message";
            msg.innerHTML = `<label>Имя: ${offerArr.nameSendler}</label>
                <label>Фамилия: ${offerArr.surnameSendler}</label>
                <label>Отчество: ${offerArr.middlenameSendler}</label>
                <label>Номер телефона: ${offerArr.nameSendler}</label>
                <label>Электронная почта: ${offerArr.email}</label>
                <label>Дата подачи предложения: ${offerArr.date.slice(0, 10)}</label>
                <label>Название предложения: ${offerArr.nameOffer}</label>
                <label>Сдержание предложения: ${offerArr.textOffer}</label>
                <label>Описание проблемы: ${offerArr.descriptionProblem}</label>`
            document.body.appendChild(msg)
        }
    })
}


const OffersLink = () => {
    let offersData = JSON.parse(Resp());
    return offersData.map((number) => <Offer id={number.Id} date={number.date} name={number.nameSendler}
                                             surname={number.surnameSendler} midlename={number.middlenameSendler}
                                             status={number.status} nameOffer={number.nameOffer}/>)

}

const Offers = () => {
    return (
        <div className={s.offersContainer}>
            <div className={s.titleHeader}><NavLink to="/personalCabinet/offers"> Предложения</NavLink></div>
            <OffersLink/>

        </div>
    )
}
export default Offers;