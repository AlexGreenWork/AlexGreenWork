import React from "react";

import s from "./infoAboutAuthor.module.css"
import { API_URL } from "../../../../../config";



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

function UserInfo(){
    let xhr = new XMLHttpRequest();
    let userTabelNum = localStorage.getItem('userTabelNum');
    xhr.open('POST', `${API_URL}api/offers/userInfo`, false); /// СИНХРОННЫЙ ЗАПРОС!!!
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`userTab=${userTabelNum}`)
    return xhr.response
}

const CreateCompMyOffers = ()=>{
    let offersData = JSON.parse(Resp());  //Данные из запроса
    return offersData.map((number, index)=><MyOffersComp id={number.Id} date={number.date}
                                            nameOffer={number.nameOffer}  counter={index+1}/>)
}



const MyOffersComp = (props) => {

    return(
        <div>
            <div>{props.counter}</div>
            <div>{props.date.slice(0, 10)}</div>
            <div className={s.offerText}>
               №{props.id} {props.nameOffer}        
            </div>
        </div>
    )
}

function validElem(){
    
    if(localStorage.getItem('userTabelNum')!==0){
        const divStyle = {

            display: "flux",

          };
          return divStyle
    } else {
        const divStyle = {
            display: "none",
          };
          return divStyle
    }
}



const InfoAboutAuthor = () => {
    let userInfo = {
        position: null,
        division: null,
        department: null,
    }
    let offersData = JSON.parse(Resp());  //Данные из запроса
   
    let userTabelNum = localStorage.getItem('userTabelNum');
   
    if(userTabelNum !== 0){
     userInfo = JSON.parse(UserInfo());
    }
    return (
        <div className={s.cardOfferContainer}>
            <div className={s.header}>
                <div className={s.nameOffer}>
                    <div>Автор:</div>
                    <div> {offersData[0].surnameSendler} {offersData[0].nameSendler} {offersData[0].middlenameSendler}</div>
                </div>
                <div className={s.nameOffer} style={validElem()}>
                    <div>Табельный номер:</div>
                    <div> {offersData[0].tabelNum}</div>
                </div>
                <div className={s.nameOffer} style={validElem()}>
                    <div>Цех/Управление:</div>
                    <div> {userInfo.department}</div>
                </div>
                <div className={s.nameOffer} style={validElem()}>
                    <div>Участок/Отдел:</div>
                    <div> {userInfo.division}</div>
                </div>
                <div className={s.nameOffer} style={validElem()}>
                    <div>Должность:</div>
                    <div> {userInfo.position}</div>
                </div>
                <div className={s.nameOffer}>
                    <div>E-mail:</div>
                    <div> {offersData[0].email}</div>
                </div>
                <div className={s.insideOffers}>
                    <div>Поступившие предложения:</div>
                    
                    <CreateCompMyOffers/>
                </div>


            </div>
        </div>
    )
}
export default InfoAboutAuthor;