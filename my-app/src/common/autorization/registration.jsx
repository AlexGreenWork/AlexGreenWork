import React, {useState} from 'react';
import s from "./authorization.module.css"
import {registration} from "../../actions/user";
import Button from "@material-ui/core/Button";

const Registration = () => {
    const [name, setName] = useState("")
    const [middlename, setMiddleName] = useState("")
    const [surname, setSurName] = useState("")
    const [email, setEmail] = useState("")
    const [tabelNum, setTabelNum] = useState("0")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [fired, setFired] = useState(true)
    const [adminOptions, setAdminOptions] = useState("user")


    function inpName(event) {
        setName(event.target.value)
    }

    function inpMid(event) {
        setMiddleName(event.target.value)

    }

    function inpSur(event) {
        setSurName(event.target.value)
    }

    function inpPassword(event) {
        setPassword(event.target.value)

    }

    function inpEmail(event) {
        setEmail(event.target.value)
        setAdminOptions('user')
    }

    function inpTab(event) {
        setTabelNum(event.target.value)
    }

    function inpPhoneNumber(event) {
        setPhoneNumber(event.target.value)
    }


    let inputIn;
    if (fired) {

        inputIn = <input style={{
            borderRadius: "5px",
            height: "4vh",
            padding: "5px"
        }}  className={s.inp} onChange={inpTab} type="number" placeholder="Введите табельный..."/>

    } else {

        inputIn = '';
    }


    return (
        <div className={s.authorization}>
            <div className="authorization__header"><h2>Регистрация:</h2></div>

            <div className={s.formReg}>
                <div className={s.inpChek}><input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} type="checkbox" checked={fired}
                                                  onChange={() => setFired(!fired)}/><span>Я сотрудник ОАО "БЕЛАЗ"</span>
                </div>
                <div>{inputIn}</div>
                <input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} className={s.inp} onChange={inpSur} type="text" placeholder="Введите фамилию..."/>
                <input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} className={s.inp} onChange={inpName} type="text" placeholder="Имя"/>
                <input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} className={s.inp} onChange={inpMid} type="text" placeholder="Введите отчество..."/>
                <input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} className={s.inp} onChange={inpEmail} type="text" placeholder="Введите email..."/>
                <input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} className={s.inp} onChange={inpPhoneNumber} type="number"
                       placeholder="Введите номер телефона..."/>
                <input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} className={s.inp} onChange={inpPassword} type="password" placeholder="Введите пароль..."/>
                <div>
                    <Button className="authorization__btn"
                            style={{
                                background:"white"
                            }}
                            onClick={() => registration(surname, name, middlename, email, tabelNum, phoneNumber, password, fired, adminOptions)}>Зарегистрироваться
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Registration;
