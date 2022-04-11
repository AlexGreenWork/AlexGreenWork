import React from "react";
import s from './contentContainer.module.css';
import { NavLink } from "react-router-dom";
import ContentContainer from "../contentHome/contentContainer";

const Excursion = () => {
    return (
        <div style={{
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center"
        }}>

            <ContentContainer />

            <div style={{
                position: "absolute",
                display: "flex",
                justifycontent: "center",
                width: "65vw",
                top: 0,
                justifyContent: "center",
                height: "100%"
            }} className={s.content}>
               
                <div className={s.allTable} style={{ width: "95%" }}>
                    <h2>Экскурсии</h2>
                    <table className={s.allTableFirst} style={{ width: "100%" }}>
                   
                        <caption >Наименование услуг</caption>
                        <tr className={s.footerTable} >
                            <th>Наименование услуги</th>
                            <th></th>
                            <th style={{padding:"5px"}}>Цена в руб.РБ, c НДС</th>

                        </tr>
                        <tr className={s.strlight}>
                            <td >Экскурсионное сопровождение без предоставления транспорта (взрослый билет включает паспорт туриста, игрушку ШП 45-00; детский- рекламный фликер, игрушка ШП 45-00)</td>
                            <td>
                                <tr className={s.tdIgnore}>
                                    <td className={s.tdIgnore}>с одного ребенка в возрасте до 18 лет</td>
                                </tr>
                            <td className={s.tdIgnore}>с одного взрослого гражданина с 18 лет и старше</td>
                            </td>
                            <td className={s.tdRigrht}>
                                <tr>
                                    <td className={s.tdIgnore} style={{position:"relative", top:"0px"}}>10руб</td>
                                </tr>
                                <tr>
                                    <td className={s.tdIgnore} style={{position:"relative", top:"50x"}}>15руб</td>
                                </tr>
                            </td>
                        </tr>
                        <tr className={s.strDark} >
                            <td>Экскурсионное сопровождение для сборной группы с предоставлением транспорта         (в стоимость включены игрушка ШП-45, паспорт туриста/ рекламный фликер)</td>
                            <td>стоимость для ребенка и взрослого единая</td><td className={s.cost}>30руб</td>
                        </tr>
                        <tr className={s.strlight} ><td>Индивидуальное экскурсионное сопровождение "Семейный тур"     (с предоставлением транспорта)</td>
                            <td>стоимость экускурсии фиксированная для группы до 10 человек включительно</td>
                            <td className={s.cost}>170руб</td>
                        </tr>
                        <tr className={s.strDark}>
                            <td>Экскурсионное сопровождение для социально значимых групп населения без  предоставления транспорта (тур для бывших работников Общества, инвалидов с сопровождающими лицами и др.)</td>
                            <td>стоимость экскурсии фиксированная для группы до 30 человек </td>
                            <td className={s.cost}>70руб</td>
                        </tr>



                    </table>
                    <table className={s.allTableTwo} style={{ width: "100%" }}>
                        <caption>Дополнительные услуги</caption>
                        <tr className={s.footerTable}>
                            <th>Дополнительные услуги</th>
                            <th></th>
                            <th style={{padding:"10px"}}>Цена в руб.РБ, c НДС</th>

                        </tr>
                        <tr className={s.strlight} >
                            <td>Проезд в кабине к/с БЕЛАЗ гр. 45т. с водителем испытателем (10 мин)</td>
                        <td >
                            <tr>
                                с одного взрослого гражданина
                            </tr>
                        </td>
                        
                            <td className={s.cost}>75руб</td>
                        
                        </tr>
                        <tr className={s.strDark}>
                            <td>Предоставление электробуса </td>
                            <td>на время проведения экскурсии</td>
                            <td className={s.cost}>103,42руб</td>
                        </tr>
                        <tr className={s.strlight}>
                            <td>Фотосъемка и печать фотографий для туристов</td>
                            <td>с одного человека</td>
                            <td className={s.cost}>1руб</td>
                        </tr>
                        <tr className={s.strDark}>
                            <td>Памятное видео с проезда в кабине к/с БЕЛАЗ гр. 45т. </td>
                            <td>с одного человека</td>
                            <td className={s.cost}>5руб</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Excursion;
