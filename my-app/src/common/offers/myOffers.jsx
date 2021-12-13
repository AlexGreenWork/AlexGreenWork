import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import s from "./sendOffer/offerForm/offers.module.css"
import {API_URL} from "../../config";
import {useContext} from "react";
import Context from "../context/Context";

let requestResult;
//contextFunction


const Offer = (props) => {

    const value = useContext(Context);
    const [dateComission, setDateComission] = useState('');
function clickOnOfferLink(){
  
    value.contextFunction(props.id, props.tabelNum)
    localStorage.setItem('idOffers', props.id);
    localStorage.setItem('dateComission', props.dateComission);
    setDateComission(localStorage.getItem('dateComission'))
}


    return (
        <div>
            <NavLink to='/cardOffer' onClick={clickOnOfferLink}>
                <div className={s.header}>
                    <div className={s.offerPreview}>
                        <div className={s.from}>
                            <div className={s.date}> {props.id}</div>
                            <div className={s.date}> {props.date.slice(0, 10)}</div>
                            <div className={s.fromName}>  {props.surname + " " + props.name + " " + props.midlename}</div>

                            <div className={s.status}>  {props.status}</div>
                        </div>
                        <div className={s.offerText}>{props.nameOffer}</div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}



const OffersLink = (props) => {
    let offersData = JSON.parse(props.request);
   
       
    return offersData.map((number) =>
        <Offer id={number.Id} date={number.date} name={number.nameSendler}
               surname={number.surnameSendler} midlename={number.middlenameSendler}
               status={number.status} nameOffer={number.nameOffer} tabelNum={number.tabelNum} dateComission={number.dateComission} />)

}

const Offers = () => {
    let portotypeResponse= `[{"Id":"","nameOffer":"","date":"","tabelNum":"","nameSendler":"","surnameSendler":"","middlenameSendler":"","email":"","status":null,"descriptionProblem":"","responsible1":null,"markRespons1":null,"responsible2":null,"markRespons2":null,"responsible3":null,"markRespons3":null,"answerRG":null,"answerTEO":null,"textOffer":"","phoneNumber":" 3","note":null}]`;
    const [reqMyOff, setReqMyOff] = useState(portotypeResponse);

    function Resp() {

        let xhr = new XMLHttpRequest();
    
        let userPhoneNumber = localStorage.getItem('userPhoneNumber');
        let userTabelNum = localStorage.getItem('userTabelNum');
        let userName = localStorage.getItem('userName');
        let userSurName = localStorage.getItem('userSurName');
        let userMiddleName = localStorage.getItem('userMiddleName');
        let userEmail = localStorage.getItem('userEmail');
    
    
        xhr.open('POST', `${API_URL}api/offers/myOffers`, true); /// СИНХРОННЫЙ ЗАПРОС!!!
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
           
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               
               setReqMyOff(xhr.response)
                          
            }
    
        }
    
        xhr.send(`firstName=${userName}&userSurName=${userSurName}&middleName=${userMiddleName}&email=${userEmail}` +
            `&tabelNumber=${userTabelNum}&phoneNumber=${userPhoneNumber}&phoneNumber=${userPhoneNumber}`);
    
        return xhr.response
    }
    Resp()
    return (
        <div className={s.offersContainer}>
            <div className={s.titleHeader}>Мои предложения</div>
            <OffersLink request={reqMyOff}/>

        </div>
    )
}
export default Offers;