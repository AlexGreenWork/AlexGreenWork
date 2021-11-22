import React from "react";
import s from "./sendOfferFree.module.css"
import Button from '@material-ui/core/Button';


const SendOfferFree = () => {
    return (
        <div className={s.sendOfferContainer}>

            <form id="form-offer-auth" className={s.form} method="post">
                <div className={s.header}>
                    <h4>Подача предложения</h4>
                </div>
                <div className={s.form_fields}>
                    <div className={s.form_field}>
                        <input type="text" placeholder="Иван" id="firstName" name="firstName" required=""
                               autoComplete="off"/>
                        <label htmlFor="firstName">Имя</label>
                    </div>
                    <div className={s.form_field}>
                        <input type="text" placeholder="Иванович" id="lastName" name="middleName" required=""
                               autoComplete="off"/>
                        <label htmlFor="middleName">Отчество</label>
                    </div>
                    <div className={s.form_field}>
                        <input type="text" placeholder="Иванов" id="lastName" name="lastName" required=""
                               autoComplete="off"/>
                        <label htmlFor="lastName">Фамилия</label>
                    </div>

                    <div className={s.form_field}>
                        <input type="email" placeholder="e-mail-adress@gmail.com" id="emailInput" name="email"
                               autoComplete="off"/>
                        <label htmlFor="emailInput">E-mail</label>
                    </div>
                    <div className={s.form_field}>
                        <input type="tel" id="phoneNumber" placeholder="+375293333333" name="phoneNumber"
                               autoComplete="off"/>
                        <label htmlFor="phoneNumber">Номер телефона</label>
                    </div>
                    <div className={s.form_field}>
                        <input type="text" placeholder="Название" id="nameOffer" name="nameOffer" autoComplete="on"/>
                        <label htmlFor="nameOffer">Название предложения</label>
                    </div>
                    <div className={s.form_field}>
                        <textarea id="problem" name="problem" autoComplete="off"/>
                        <label htmlFor="problem">Описание проблемы</label>
                    </div>
                    <div className={s.form_field}>
                        <textarea id="Offer" name="offer" autoComplete="off"/>
                        <label htmlFor="offer">Предложение</label>
                    </div>
                </div>
                <div className={s.footer}>
                    <input type="checkbox" name="agreement" id="agree" required=""/>
                    <label htmlFor="agree">Все введено верно</label>
                </div>


                <div className={s.submit}>
                    <Button variant="contained" color="primary" className="form-btn-sendOffer" type="submit"
                            value="submit" onClick={()=>(alert('Форма отравлена'))}>Подтвердить
                        запись
                    </Button>

                </div>
            </form>
        </div>
    )
}
export default SendOfferFree;