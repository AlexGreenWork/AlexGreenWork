import React, {useState} from "react";
import s from "./sendOfferworker.module.css"
import Button from "@material-ui/core/Button";
import Input from "../../utils/input";


const SendOfferWorker = () => {
    const [firstName, setFirstName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [lastName, setLastName] = useState("")
    const [tabelNumber, setTabelNumber] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    return (
        <div className={s.sendOfferContainer}>

            <form id="form-offer-auth" className={s.form} method="post">
                <div className={s.header}>
                    <h4>Подача предложения сотрудником</h4>
                </div>

                <div className={s.form_fields_user}>
                    <Input value={firstName} type="text" placeholder="Имя"/>
                    <Input value={middleName} type="text" placeholder="Отчество"/>
                    <Input value={lastName} type="text" placeholder="Фамилия"/>
                    <Input value={tabelNumber} type="text" placeholder="Табельный"/>
                    <Input value={email} type="text" placeholder="E-mail"/>
                    <Input value={phoneNumber} type="text" placeholder="Телефон"/>
                    <Input placeholder="Название предложения" type="text" autoComplete="on"/>
                    <textarea placeholder="Описание проблемы" type="text" autoComplete="off"/>
                    <textarea placeholder="Текст предложения" type="text" autoComplete="off"/>


                    {/*<div className={s.footer}>*/}
                    {/*    <input type="checkbox" name="agreement" id="agree" required=""/>*/}
                    {/*    <label htmlFor="agree">Все введено верно</label>*/}
                    {/*</div>*/}
                    <div className={s.fileUpload}>
                        <input type="file" name="filename"/>
                    </div>
                </div>

                <div className={s.submit}>
                    <Button variant="contained" color="primary" className="form-btn-sendOffer" type="submit"
                            value="submit">Подтвердить
                        запись
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default SendOfferWorker;