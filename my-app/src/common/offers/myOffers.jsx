import React from "react";
import {NavLink} from "react-router-dom";
import s from "./sendOffer/offerForm/offers.module.css"
import {API_URL} from "../../config";

function Resp() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}api/offers/allOffers`, false)
    xhr.send();
    console.log(xhr.response)
    return xhr.response;


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
    // console.log(offersData[0]);
    offersData.map((offerArr) => {
        if (offerArr.Id === id) {
            console.log(offerArr);

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

//
//
// const Offer = (props) => {
//     return (
//         <div className={s.header}>
//             <div className={s.offerPreview}>
//                 <div className={s.from}>
//                     <div className={s.date}>{props.date}</div>
//                     <div className={s.fromName}>  {props.name}</div>
//                     <div className={s.status}> : {props.status}</div>
//
//                 </div>
//                 <div className={s.offerText}>{props.nameOffer}
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// const MyOffers = () => {
//     let offersData = [
//         {
//             date: '12/09/21',
//             name: 'Ваше предложение',
//             status: 'Отклонено первоначальной рабочей группой',
//             nameOffer: 'Изменение мршрута деталей прессового цеха.'
//         },
//         {
//             date: '12/09/21',
//             name: 'Адрей Валерьевич Крутько',
//             status: 'Отклонено первоначальной рабочей группой',
//             nameOffer: 'Сокращение трудового дня.'
//         },
//         {
//             date: '12/09/21',
//             name: 'Василий Петрович Бидонский',
//             status: 'Отклонено рабочей группой после рассмотрения подразделением(ями)',
//             nameOffer: 'Модернизация линии по производству опор'
//         },
//         {
//             date: '12/09/21',
//             name: 'Сергей Витальевич Слуцкий ',
//             status: 'Направлено секретарю комиссии',
//             nameOffer: 'Изменение штатного расписания'
//         },
//         {
//             date: '12/09/21',
//             name: 'Виктор Петрович Калюжный',
//             status: 'Результаты рассмотрения комиссией оформлены',
//             nameOffer: 'Вход по электронным пропускам'
//         },
//         {
//             date: '12/09/21',
//             name: 'Ирина Викторовна Волкова',
//             status: 'Направлено для внедрения',
//             nameOffer: 'Изменение маршрута деталей прессового цеха'
//         },
//
//     ]
//     return (
//         <div className={s.offersContainer}>
//             <div className={s.titleHeader}><NavLink to="/offers"> Предложения</NavLink></div>
//
//             <NavLink to='/cardOffer'><Offer name={offersData[0].name} status={offersData[0].status}
//                                            nameOffer={offersData[0].nameOffer} date={offersData[0].date}/></NavLink>
//
//
//         </div>
//     )
// }
// export default MyOffers;