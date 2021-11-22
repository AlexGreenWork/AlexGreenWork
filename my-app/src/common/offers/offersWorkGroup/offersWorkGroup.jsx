import React from "react";
import {NavLink} from "react-router-dom";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const OfferWorkGroup = (props) => {
    const Offers = () => {
        let offersData = [
            {
                date: '12/09/21',
                name: 'Юлия Александровна Батюк',
                status: 'Направлено в подразделения для подготовки заключения и предварительного обоснования',
                nameOffer: 'Оптимизация организационной структуры.'
            },
            {
                date: '12/09/21',
                name: 'Адрей Валерьевич Крутько',
                status: 'Отклонено первоначальной рабочей группой',
                nameOffer: 'Сокращение трудового дня.'
            },
            {
                date: '12/09/21',
                name: 'Василий Петрович Бидонский',
                status: 'Отклонено рабочей группой после рассмотрения подразделением(ями)',
                nameOffer: 'Модернизация линии по производству опор'
            },
            {
                date: '12/09/21',
                name: 'Сергей Витальевич Слуцкий ',
                status: 'Направлено секретарю комиссии',
                nameOffer: 'Изменение штатного расписания'
            },
            {
                date: '12/09/21',
                name: 'Виктор Петрович Калюжный',
                status: 'Результаты рассмотрения комиссией оформлены',
                nameOffer: 'Вход по электронным пропускам'
            },
            {
                date: '12/09/21',
                name: 'Ирина Викторовна Волкова',
                status: 'Направлено для внедрения',
                nameOffer: 'Изменение мршрута деталей прессового цеха'
            },

        ]
    return (
        <div className={s.header}>
            <div className={s.offerPreview}>
                <div className={s.from}>
                    <div className={s.date}>{props.date}</div>
                    <div className={s.fromName}>  {props.name}</div>
                    <div className={s.status}> : {props.status}</div>

                </div>
                <div className={s.offerText}>{props.nameOffer}
                </div>
            </div>
        </div>
    )
}


    return (
        <div className={s.offersContainer}>
            <div className={s.titleHeader}><NavLink to="/offers"> Предложения</NavLink></div>

            <NavLink to='/cardOffer'><Offer name={offersData[0].name} status={offersData[0].status}
                                           nameOffer={offersData[0].nameOffer} date={offersData[0].date}/></NavLink>
            <NavLink to='/cardOffer'><Offer name={offersData[1].name} status={offersData[1].status}
                                           nameOffer={offersData[1].nameOffer} date={offersData[1].date}/></NavLink>
            <NavLink to='/cardOffer'><Offer name={offersData[2].name} status={offersData[2].status}
                                           nameOffer={offersData[2].nameOffer} date={offersData[2].date}/></NavLink>
            <NavLink to='/cardOffer'><Offer name={offersData[3].name} status={offersData[3].status}
                                           nameOffer={offersData[3].nameOffer} date={offersData[3].date}/></NavLink>
            <NavLink to='/cardOffer'><Offer name={offersData[4].name} status={offersData[4].status}
                                           nameOffer={offersData[4].nameOffer} date={offersData[4].date}/></NavLink>
            <NavLink to='/cardOffer'><Offer name={offersData[5].name} status={offersData[5].status}
                                           nameOffer={offersData[5].nameOffer} date={offersData[5].date}/></NavLink>

        </div>
    )
}
export default OfferWorkGroup;






