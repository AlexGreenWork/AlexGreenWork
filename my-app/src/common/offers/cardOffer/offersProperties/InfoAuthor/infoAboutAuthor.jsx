import React from "react";
import {NavLink} from "react-router-dom";
import s from "./infoAboutAuthor.module.css"

const InfoAboutAuthor = () => {

    return (
        <div className={s.cardOfferContainer}>




            <div className={s.header}>
                <div className={s.nameOffer}>
                    <div>Автор:</div>
                    <div> Василий Иванович Пупкин</div>
                </div>
                <div className={s.nameOffer}>
                    <div>Табельный номер:</div>
                    <div> 12159</div>
                </div>
                <div className={s.nameOffer}>
                    <div>Цех/Управление:</div>
                    <div> ПЛАНОВО - ЭКОНОМИЧЕСКОЕ УПРАВЛЕНИЕ</div>
                </div>
                <div className={s.nameOffer}>
                    <div>Участок:</div>
                    <div> БЮРО НОРМАТИВОВ</div>
                </div>
                <div className={s.nameOffer}>
                    <div>Должность:</div>
                    <div> ЭКОНОМИСТ</div>
                </div>
                <div className={s.nameOffer}>
                    <div>E-mail:</div>
                    <div> pupkin@belaz.minsk.by</div>
                </div>
                <div className={s.insideOffers}>
                    <div>Поступившие предложения:</div>
                    <div>
                        <div>1</div>
                        <div>12/08/21</div>
                        <div className={s.offerText}>Снижение затрат с административных издержек и ответственность за
                            использование служебного автотранспорта в личных целях.
                        </div>
                    </div>
                    <div>
                        <div>2</div>
                        <div>19/09/21</div>
                        <div className={s.offerText}>Изменение мршрута деталей прессового цеха.
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default InfoAboutAuthor;