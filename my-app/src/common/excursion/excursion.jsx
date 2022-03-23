import React from "react";
import s from './contentContainer.module.css';
import {NavLink} from "react-router-dom";
import ContentContainer from "../contentHome/contentContainer";

const Excursion = () => {
    return (
        <div style={{width:"100%",
            position:"relative",
            display:"flex",
            justifyContent:"center"}}>

            <ContentContainer />

            <div style={{
                position: "absolute",
                display: "flex",
                justifycontent: "center",
                width:"65vw",
                top:0,
                justifyContent:"center",
                height:"100%"
            }} className={s.content}>
                <h2>Экскурсии</h2>
                <div style={{width:"95%"}}>
                    <table border="1" style={{width:"100%"}}>
                        <caption>Наименование услуг</caption>
                        <tr>
                            <th>Наименование услуги</th>
                            <th></th>
                            <th>Цена в руб.РБ, c НДС</th>

                        </tr>
                        <tr><td>Экскурсионное сопровождение без предоставления транспорта (взрослый билет включает паспорт туриста, игрушку ШП 45-00; детский- рекламный фликер, игрушка ШП 45-00)</td><td><tr><td>с одного ребенка в возрасте до 18 лет</td></tr><td>с одного взрослого гражданина с 18 лет и старше</td><tr></tr></td><td><tr><td>10руб</td></tr><tr><td>15руб</td></tr></td></tr>
                        <tr><td>Экскурсионное сопровождение для сборной группы с предоставлением транспорта         (в стоимость включены игрушка ШП-45, паспорт туриста/ рекламный фликер)</td><td>стоимость для ребенка и взрослого единая</td><td>30руб</td></tr>
                        <tr><td>Индивидуальное экскурсионное сопровождение "Семейный тур"     (с предоставлением транспорта)</td><td>стоимость экускурсии фиксированная для группы до 10 человек включительно</td><td>170руб</td></tr>
                        <tr><td>Экскурсионное сопровождение для социально значимых групп населения без  предоставления транспорта (тур для бывших работников Общества, инвалидов с сопровождающими лицами и др.)</td><td>стоимость экскурсии фиксированная для группы до 30 человек </td><td>70руб</td></tr>



                    </table>
                    <table border="1" style={{width:"100%"}}>
                        <caption>Дополнительные услуги</caption>
                        <tr>
                            <th>Дополнительные услуги</th>
                            <th></th>
                            <th>Цена в руб.РБ, c НДС</th>

                        </tr>
                        <tr><td>Проезд в кабине к/с БЕЛАЗ гр. 45т. с водителем испытателем (10 мин)</td><td><tr><td>с одного взрослого гражданина</td></tr><tr></tr></td><td><tr><td>75руб</td></tr></td></tr>
                        <tr><td>Предоставление электробуса </td><td>на время проведения экскурсии</td><td>103,42руб</td></tr>
                        <tr><td>Фотосъемка и печать фотографий для туристов</td><td>с одного человека</td><td>1руб</td></tr>
                        <tr><td>Памятное видео с проезда в кабине к/с БЕЛАЗ гр. 45т. </td><td>с одного человека</td><td>5руб</td></tr>


                    </table>
                </div>
            </div>
        </div>
    );
}
export default Excursion;
