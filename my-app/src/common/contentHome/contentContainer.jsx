import React from "react";
import s from './contentContainer.module.css';
import {NavLink} from "react-router-dom";

const ContentContainer = () => {
    return (
        <div className={s.contentContainer}>
            <div className={s.button1}>
                <NavLink  className={s.btnA} to="/workerVariable">
                    Подать предложение
                </NavLink>
            </div>
            <div className={s.button2}>
                <NavLink id="administration" className={s.btnA} to="/administration">   
                
                   Внутренний портал

                </NavLink>
            </div>
            <div className={s.button3}>
               <NavLink id="production" className={s.btnA} to="/personalCabinet/offers1">
                    Руководство

                </NavLink>
            </div>
            <div className={s.button4}>
                <NavLink id="contacts" className={s.btnA} to="/contacts">
                    Контакты

                </NavLink>
            </div>
            <div className={s.button5}>
                <NavLink id="excursion" className={s.btnA} to="/excursion">
                    Экскурсии

                </NavLink>
            </div>
            <div className={s.button6}>
                <NavLink id="news" className={s.btnA} to="/news">
                    Новости

                </NavLink>
            </div>
            <div className={s.button7}>
                <NavLink id="publicServices" className={s.btnA} to="/publicServices">
                    Услуги населению

                </NavLink>
            </div>
            <div className={s.button8}>
                <NavLink id="cityGuide" className={s.btnA} to="/cityGuide">
                    Городской гид

                </NavLink>
            </div>
        </div>
    );
}
export default ContentContainer;
