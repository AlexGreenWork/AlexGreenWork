import React, { useState } from 'react';
import s from "./authorization.module.css"
import { registration } from "../../actions/user";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import { API_URL } from '../../config';

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
        setPhoneNumber("375"+event.target.value)
        console.log(phoneNumber)
    }

    function addFioSendler(tabNum) {

        try {
            axios.post(`${API_URL}api/auth/fioSendler`, {
                tabNum: tabNum,

            })
                .then(res => {


                    let fio = res.data;


                    console.log(fio)
                    setName(fio[1])
                    setSurName(fio[0])
                    setMiddleName(fio[2])
                    // setEmail(fio[3])
                    // setPhoneNumber(fio[4])
                })
        } catch (e) {
            alert(e.response)
        }
    }


    let inputIn;
    if (fired) {

        inputIn = <input style={{
            borderRadius: "5px",
            height: "4vh",
            padding: "5px"
        }} className={s.inp} onChange={inpTab} type="number" placeholder="?????????????? ??????????????????..."
            onBlur={(e) => { addFioSendler(e.target.value) }}
            onChange={(e) => {
                if (e.target.value.length === 5) {
                    setTabelNum(e.target.value)
                    addFioSendler(e.target.value)
                }
            }}
            autoFocus />

    } else {

        inputIn = '';
    }


    return (
        <div className={s.authorization}>
            <div className="authorization__header"><h2>??????????????????????:</h2></div>

            <div className={s.formReg}>
                <div className={s.inpChek}><input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} type="checkbox" checked={fired}
                    onChange={() => setFired(!fired)} /><span>?? ?????????????????? ?????? "??????????"</span>
                </div>
                <div>{inputIn}</div>
                <input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} className={s.inp} onChange={inpSur} type="text" placeholder="?????????????? ??????????????..." value={surname} />
                <input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} className={s.inp} onChange={inpName} type="text" placeholder="??????" value={name} />
                <input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} className={s.inp} onChange={inpMid} type="text" placeholder="?????????????? ????????????????..." value={middlename} />
                <input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} className={s.inp} onChange={inpEmail} type="text" placeholder="?????????????? email..." value={email} />
                <div style={{display:"flex", alignItems: "baseline"}}>
                    +375
                    <input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} className={s.inp} onChange={inpPhoneNumber} type="tel" maxLength="9" 
                    placeholder="?????????????? ?????????? ????????????????..." />
                </div>
                <input style={{
                    borderRadius: "5px",
                    height: "4vh",
                    padding: "5px"
                }} className={s.inp} onChange={inpPassword} type="password" placeholder="?????????????? ????????????..." />
                <div>
                    <Button className="authorization__btn"
                        style={{
                            background: "white"
                        }}
                        onClick={() => registration(surname, name, middlename, email, tabelNum, phoneNumber, password, fired, adminOptions)}>????????????????????????????????????
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Registration;
