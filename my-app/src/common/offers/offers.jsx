import React from "react";
import {NavLink} from "react-router-dom";
import s from "./sendOffer/offerForm/offers.module.css"
import {API_URL} from "../../config";

function Resp() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}api/offers/allOffers`, false)
    xhr.send();
    //console.log(xhr.response)
    //return xhr.response;


}

const Offer = (props) => {
    return (
        <div>
            <NavLink to='/cardOffer' onClick={() => {
              localStorage.setItem('idOffers', props.id);
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

const OffersLink = () => {
    let offersData = JSON.parse(Resp());
    return offersData.map((number) => <Offer id={number.Id} date={number.date} name={number.nameSendler}
                                             surname={number.surnameSendler} midlename={number.middlenameSendler}
                                             status={number.status} nameOffer={number.nameOffer}/>)

}

const Offers = () => {
    return (
        <div className={s.offersContainer}>
            <div className={s.titleHeader}> Предложения для обработки рабочей группой</div>
            <OffersLink/>

        </div>
    )
}
export default Offers;
