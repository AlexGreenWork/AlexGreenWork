import React, {useState} from 'react';
import s from "./authorization.module.css"
import Input from "../../utils/input";
import {registration} from "../../actions/user";

const Registration = () => {
    const [name, setName]=useState("")
    const [middlename, setMiddleName]=useState("")
    const [surname, setSurName]=useState("")
    const [email, setEmail] = useState("")
    const [tabelNum, setTabelNum] = useState("0")
    const [phoneNumber, setPhoneNumber]=useState("")
    const [password, setPassword] = useState("")
    const [fired, setFired] = useState(true)
    const [adminOptions, setAdminOptions] = useState("user")



    function inpName(event){
        setName(event.target.value)
    }
    function inpMid(event){
        setMiddleName(event.target.value)

    }function inpSur(event){
        setSurName(event.target.value)
    }
    function inpPassword(event){
        setPassword(event.target.value)

    }function inpEmail(event){
        setEmail(event.target.value)
        setAdminOptions('user')
    }
    function inpTab(event){
        setTabelNum(event.target.value)
    }function inpPhoneNumber(event){
        setPhoneNumber(event.target.value)
    }


    let inputIn;
    if(fired){

        inputIn = <input className={s.inp} onChange={inpTab} type="number" placeholder="Введите табельный..."/>

    }else{

        inputIn ='';
    }
    return (
        <div className={s.authorization}>
            <div className="authorization__header"><h2>Регистрация:</h2></div>

            <div className={s.formReg}>
            <div className={s.inpChek}><input type = "checkbox" checked={fired} onChange={()=> setFired(!fired)}/><span>Я работник Белаза</span></div>
            <div>{inputIn}</div>
            <input className={s.inp} onChange={inpName}   type="text" placeholder="Имя"/>
            <input className={s.inp} onChange={inpMid} type="text" placeholder="Введите отчество..."/>
            <input className={s.inp} onChange={inpSur} type="text" placeholder="Введите фамилию..."/>
            <input className={s.inp} onChange={inpEmail} type="text" placeholder="Введите email..."/>
            <input className={s.inp} onChange={inpPhoneNumber} type="number" placeholder="Введите номер телефона..."/>
            <input className={s.inp} onChange={inpPassword} type="password" placeholder="Введите пароль..."/>



            <button className="authorization__btn" onClick={() => registration(name, middlename, surname, email, tabelNum, phoneNumber, password,fired,adminOptions)}>Зарегистрироваться</button>
            </div>
        </div>
    );
};

export default Registration;
