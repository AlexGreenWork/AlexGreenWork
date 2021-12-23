import React, {useState} from "react";
import s from './authorization.module.css'
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

import {useDispatch} from "react-redux";
import {login} from "../../actions/user";


const AuthorizationWorker = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    function emailChange(event) {
        setEmail(event.target.value)
    }

    function passwordChange(event) {
        setPassword(event.target.value)
    }
    function onKeyDown(event){
        if(event.keyCode === 13){

            dispatch(login(email, password))
        }
    }

    return (
        <div className={s.authorizationContainer}  >
            <form id="form-offer-auth" className={s.form} method="post">
                <div className={s.header}>
                    <h4>Авторизация сотрудника</h4>
                </div>
                <div className={s.form_field}>
                    <input onKeyDown={onKeyDown} onChange={emailChange} type="text" placeholder="Введите email..."/>
                </div>
                <div className={s.form_field}>
                    <input  onKeyDown={onKeyDown} onChange={passwordChange} type="password" placeholder="Введите пароль..."/>
                </div>
                <div className={s.submit}>
                    <Button className="authorization__btn"
                             onClick={() => dispatch(login(email, password))}>Войти</Button>
                </div>
                <NavLink to={'/registration'}>Регистрация</NavLink>
            </form>

        </div>
    )
}
export default AuthorizationWorker;