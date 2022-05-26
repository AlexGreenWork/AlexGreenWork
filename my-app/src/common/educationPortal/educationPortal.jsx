import React, {useEffect} from "react";
import s from "./educationPortal.module.css"
import {NavLink, Redirect} from "react-router-dom";
import ContentContainer from "../contentHome/contentContainer";
import {useDispatch} from "react-redux";
import {redirect} from "next/dist/server/api-utils";


const EducationPortal = () => {
    const [step, setStep] = React.useState('1')


    const Step1 = () => {
        const [email, setEmail] = React.useState('')
        const [password, setPassword] = React.useState("")
        const [confirmPassword, setConfirmPassword] = React.useState("")
        const [confPassword, setConfPassword] = React.useState("")
        const [emailDirty, setEmailDirty] = React.useState(false)
        const [passwordDirty, setPasswordDirty] = React.useState(false)
        const [confirmPasswordBool, setConfirmPasswordBool] = React.useState(false)
        const [emailError, setEmailError] = React.useState('Емейл не может быть пустым')
        // const [emailMessage, setEmailMessage] = React.useState('Введите e-mail, указанный при регистрации')
        const [passwordError, setPasswordError] = React.useState('Пароль не может быть пустым')
        const [formValid, setFormValid] = React.useState(false)
        const dispatch = useDispatch()
        const [colorType, setColorType] = React.useState('#333333');
        const [colorLatin, setColorLatin] = React.useState('#333333');
        const [colorNumber, setColorNumber] = React.useState('#333333');
        const [colorSpecial, setColorSpecial] = React.useState('#333333');
        const [colorLower, setColorLower] = React.useState('#333333');
        const [colorUpper, setColorUpper] = React.useState('#333333');
        const [passwordConfirm, setPasswordConfirm] = React.useState('');


        useEffect(() => {
            if (emailError, passwordError) {
                setFormValid(false)
            } else {
                setFormValid(true)
            }
        }, [emailError, passwordError])

        function emailHandler(event) {
            setEmail(event.target.value)
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!re.test(String(event.target.value).toLowerCase())) {
                setEmailError('Некорректный email');
                if (event.target.value.length === 0) {
                    setEmailError('Email не может быть пустым');
                }
            } else {
                setEmailError('')
            }


        }

        const passwordHandler = (e) => {
            setPassword(e.target.value)
            if (e.target.value.length < 8 || e.target.value.length > 14
            ) {
                setPasswordError('Некорректный пароль')
                setColorType('red');
                if (!e.target.value) {
                    setPasswordError('Пароль не может быть пустым')
                }

            } else {
                setPasswordError('')
                setColorType('green')
            }

            const regexp1 = /([a-zA-Z])/;
            if (regexp1.test(e.target.value)) {
                // console.log('1', regexp1.test(e.target.value))
                setColorLatin('green')
            } else {
                // console.log('2', regexp1.test(e.target.value))
                setColorLatin('red')
                setPasswordError('Некорректный пароль')
            }


            const regexp2 = /([0-9])/;
            if (regexp2.test(e.target.value)) {
                setColorNumber('green')
            } else {
                setColorNumber('red')
                setPasswordError('Некорректный пароль')
            }

            const regexp3 = /([$&+,:;=?@#|'<>.^*()%!-])/;
            if (regexp3.test(e.target.value)) {
                setColorSpecial('green')
            } else {
                setColorSpecial('red')
                setPasswordError('Некорректный пароль')
            }

            const regexp4 = /([a-z])/;
            if (regexp4.test(e.target.value)) {
                setColorLower('green')
            } else {
                setColorLower('red')
                setPasswordError('Некорректный пароль')
            }

            const regexp5 = /([A-Z])/;
            if (regexp5.test(e.target.value)) {
                setColorUpper('green')
            } else {
                setColorUpper('red')
                setPasswordError('Некорректный пароль')
            }
            if (e.target.value.length === 0) {
                console.log("legth")
                setPasswordError('Пароль не может быть пустым')
            }
        }
        const passwordConfirmation = (event) => {
            if (password != event.target.value) {
                setConfirmPassword('Пароли не совпадают')
                setConfirmPasswordBool(true)
                setConfPassword(event.target.value)
            } else {
                setConfPassword(event.target.value)
                setConfirmPasswordBool(false)
                setConfirmPassword('')
            }
        }
        const blurHandler = (event) => {
            if (password != confPassword) {
                setConfirmPassword('Пароли не совпадают')

            } else {

                setConfirmPassword('')
            }
            switch (event.target.name) {
                case 'email':
                    setEmailDirty(true)
                    break
                case 'password':
                    setPasswordDirty(true)
                    break
                case 'confPassword':
                    setConfirmPasswordBool(true)
                    console.log('confPass')
                    break
            }
        }


        return (
            <div>
                <div>
                    <input type="email"
                           onChange={emailHandler}
                           onBlur={blurHandler}
                           value={email}
                           className="reg_mail"
                           name="email"
                    />
                    {(emailDirty && emailError) && <div style={{color: '#EF3125', fontSize: '10px'}}>{emailError}</div>}
                </div>
                <div>
                    <input type="password"
                           onChange={passwordHandler}
                           onBlur={blurHandler}
                           value={password}
                           className="reg_password"
                           name="password"
                    />
                    {(passwordDirty) &&
                        <div style={{color: '#EF3125', fontSize: '10px'}}>{passwordError}</div>}
                </div>
                <div>
                    <input type="password"
                           onChange={passwordConfirmation}
                           onBlur={blurHandler}
                           value={confPassword}
                           className="reg_password"
                           name="confPassword"
                    />
                    {(confirmPasswordBool && confirmPassword) &&
                        <div style={{color: '#EF3125', fontSize: '10px'}}>{confirmPassword}</div>}
                </div>


            </div>
        );
    }
    const Step2 = () => {
        return (
            <div>
                <select name="sel" id="Spec" style={{width:"100%", backgroundColor:"white", marginBottom:"20px", marginTop:"20px"}}>
                    <option enabled>Выберите пользователя</option>
                    <option value="Чебурашка">Разработчик</option>
                    <option value="Чебурашка">Заказчик</option>

                </select>
            </div>
        )
    }

    function StepperRegBtn() {


        if ((Number(step)) < 3) {
            setStep(`${String((Number(step) + 1))}`)
        } else {
            setStep('4')
        }


        console.log(step)
    }

    function StepperReg(props) {
        switch (props.step) {
            case '1':
                return <Step1/>
                break
            case '2':
                return <Step2/>
                break
            case '3':
                return <div>step3</div>
                break
            case '4':
                return <Redirect
                    to={{
                        pathname: "/",

                    }}
                />
                break
        }
        // if (props.step == '1') {
        //
        //     return <Step1/>
        //
        // }
        // if (props.step == '2') {
        //
        //     return <div> STEP2</div>
        //
        // }
        // if (props.step == '3') {
        //     return <div>STEP3</div>
        // }


    }
    function ButtonVar(){
        if((Number(step)) == 3){
            return  <button onClick={StepperRegBtn}>Завершить регистрацию</button>
        }else {
            return <button onClick={StepperRegBtn}>Следующая страница</button>
        }
    }

    return (
        <div>

            <StepperReg step={step}/>
            <ButtonVar step={step}/>
            {/*<button onClick={StepperRegBtn}>Следующая страница</button>*/}
        </div>
    );


}
export default EducationPortal;
