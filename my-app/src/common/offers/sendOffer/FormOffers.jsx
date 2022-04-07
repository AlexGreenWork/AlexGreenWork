import React, { useState, useEffect } from 'react';
import OffFunc from './offerForm/FormOffFunc.js';
import UploadFile from './fileUpload/fileUpload'
import s from "./offerForm/formOffers.module.css";
import "./offersStyle.css"
import axios from 'axios';
import { API_URL } from '../../../config'
import { NavLink } from "react-router-dom";

let size = 0;
let height = 0
let sizeOffer = 0;
let heightOffer = 0
let closeTop = 0;
let allNewSendler = {


};

function objClear() {
    allNewSendler = {};
}

objClear()

let addFlag = false;

function logScroll(e, id) {

    let el_close = document.querySelector(`.close-textArea`)
    height = document.querySelector(`#${id}`).clientHeight
    if (id === "problem") {

        el_close.style.top = `${height + 126}px`

        height = height + 126

    } else {

        el_close.style.top = `${heightOffer + 126}px`

    }

    let height_longscroll = Number(document.querySelector(`#${id}`).style.height[0] /* + document.querySelector(`#problem`).style.height[1] */)

    if (document.querySelector(`#${id}`).style.height.length === 0) {
        height_longscroll = 10

    }
    if (e.target.scrollTop > 0) {
        Resize(id)

    }
}

function textAreaOnChange(e, id) {
    const textarea = document.querySelector(`#${id}`)
    textarea.onscroll = logScroll(e, id);
}

function textAreaOnBlur(id) {

    let textarea = document.querySelector(`#${id}`)
    let el_close = document.querySelector(`.close-textArea`)


    if (id === "problem") {
        textarea.style.zIndex = "0"
        if (textarea.style.height.length !== 0) {
            height = Number(textarea.style.height.slice(0, 3))
        }

        el_close.style.top = `${closeTop}px`
        textarea.style.height = `${height}px`


    } else {
        textarea.style.zIndex = "0"

        if (textarea.style.height.length !== 0) {
            heightOffer = Number(textarea.style.height.slice(0, 3))
        }

        el_close.style.top = `${sizeOffer}px`
        textarea.style.height = `${heightOffer}px`

    }

    if (document.querySelector(".blockShow")) {
        document.querySelector(".blockShow").remove()

    }
}

function textAreaOnFocus(id) {
    let textarea = document.querySelector(`#${id}`)
    let close = document.createElement('div');
    close.className = "close-textArea"
    close.innerHTML = "Подтвердить";

    close.style.top = `${height + 80}px`
    let shadow = document.createElement('div');
    if (id === "problem") {
        textarea.style.zIndex = "1200"
        shadow.className = "shadow-close"
        document.querySelector(`#offer`).style.zIndex = '1';
    } else {
        textarea.style.zIndex = "1200"
        document.querySelector(`#problem`).style.zIndex = '1';
        shadow.className = "shadow-close-offer"
    }

    let blockShow = document.createElement('div');
    blockShow.className = "blockShow"

    document.querySelector(`.${id}`).appendChild(blockShow)
    document.querySelector(".blockShow").appendChild(close)
    document.querySelector(".blockShow").appendChild(shadow)

    let el_close = document.querySelector(`.close-textArea`)
    let textArea = document.querySelector(`#${id}`)

    if (id === "problem") {

        if (height === 0) {
            textarea.style.height = "110px"
            el_close.style.top = `${closeTop + 236}px`
        } else {

            if (closeTop === 0) {
                el_close.style.top = `${closeTop + 236}px`
            } else {
                el_close.style.top = `${closeTop}px`
            }

        }

    } else {

        if (heightOffer === 0) {
            el_close.style.top = `${heightOffer + 228}px`
        } else {
            el_close.style.top = `${heightOffer + 126}px`
        }
        heightOffer = textArea.clientHeight
    }



}

function Resize(idEl) {

    let heightTextArea = document.querySelector(`#${idEl}`).style.height
    let el_close = document.querySelector(`.close-textArea`)

    if (heightTextArea.length === 0) {
        document.querySelector(`#${idEl}`).style.height = "100px"
        el_close.style.top = `${226}px`

    } else {

        let a = Number(heightTextArea[0] + heightTextArea[1] + heightTextArea[2]) // счетчик процентов высоты десятки

        if (a > 0 && a < 450 /*|| a === 95 */) { //максимальное количество процентов на экране

            let count = 0 // счетчик от 0 до 9

            let overSize = setInterval(() => {

                if (count < 50) {  // на сколько процетов увеличить елемент

                    document.querySelector(`#${idEl}`).style.height = `${a + count}` + "px";
                    el_close.style.top = `${a + count + 126}px`
                    count++

                } else {
                    clearInterval(overSize);
                    if (idEl === 'problem') {
                        height = document.querySelector(`#${idEl}`).clientHeight
                        closeTop = Number(el_close.style.top.slice(0, 3))
                    } else {
                        heightOffer = document.querySelector(`#${idEl}`).clientHeight
                    }

                }



            }, 5);

            //   /  el_close.style.top = `${a + count + 1}px`

        } else {
            el_close.style.top = `${610}px`
        }

    }

}


class ComponentDestruction extends React.Component { // нужен для очистки глобального обьекта после размонтирования компонента

    componentWillUnmount() {

        objClear();
        size = 0;
        height = 0
        size = 0;
        height = 0
        sizeOffer = 0;
        heightOffer = 0
        closeTop = 0;
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}


function OffersForm(props) {
    let winLocation = window.location.href;

    window.addEventListener("popstate", function (e) {
        objClear();

        addFlag = false;
    }, false);

    const nameMid = localStorage.getItem('userName') ? `${localStorage.getItem('userName')}` : ``
    const SurNameMid = localStorage.getItem('userSurName') ? `${localStorage.getItem('userSurName')}` : ``
    const MiddleNameMid = localStorage.getItem('userMiddleName') ? `${localStorage.getItem('userMiddleName')}` : ``
    const EmailMid = localStorage.getItem('userEmail') ? `${localStorage.getItem('userEmail')}` : ``
    const TabelNumMid = localStorage.getItem('userTabelNum') ? `${localStorage.getItem('userTabelNum')}` : ``
    const PhoneNumberMid = localStorage.getItem('userPhoneNumber') ? `+${localStorage.getItem('userPhoneNumber').slice(1)}` : ``


    const [name, setName] = useState(`${nameMid}`);
    const [lastName, setLastName] = useState(`${SurNameMid}`);
    const [middleName, setMiddleName] = useState(`${MiddleNameMid}`);
    const [Email, setEmail] = useState(`${EmailMid}`);
    const [tabelNumber, setTabelNumber] = useState(`${TabelNumMid}`);
    const [phoneNumber, setPhoneNumber] = useState(`${PhoneNumberMid}`);
    const [nameOffer, setNameOffer] = useState("");
    const [problem, setProblem] = useState("");
    const [offer, setOffer] = useState("");
    const [checked, setChecked] = useState(false);

    const [nameNew, setNameNew] = useState();
    const [lastNameNew, setLastNameNew] = useState();
    const [middleNameNew, setMiddleNameNew] = useState();
    const [EmailNew, setEmailNew] = useState();
    const [tabelNumberNew, setTabelNumberNew] = useState();
    const [phoneNumberNew, setPhoneNumberNew] = useState();
    const [yetSendler, setYetSendler] = useState();

    const [newSendler, setNewSendler] = useState();
    const [count, setCount] = useState(0);
    const [renderInput, setRenderInput] = useState(null);
    const [renderForm, setRenderForm] = useState(false);
    const [password, setPassword] = useState('')
    const [checkPass, setCheckPass] = useState(null)
    const [alertCheckPass, setAlertCheckPass] = useState(null)
    const [trueRegCheckPass, setTrueRegCheckPass] = useState(false)
    const [countFalseInput, setCountFalseInput] = useState(0)

    function StateClear() {
        setName('')
        setLastName('')
        setMiddleName('')
        setEmail('')
        setTabelNumber('')
        setPhoneNumber('')
        setNameOffer('')
        setProblem('')
        setOffer('')
        setChecked(false)
        setLastNameNew()
        setNameNew()
        setMiddleNameNew()
        setMiddleNameNew()
        setEmailNew()
        setTabelNumberNew()
        setPhoneNumberNew()
        setYetSendler()
        setNewSendler()
        setCount(0)
    }

    if (document.querySelector('#exit') !== null) {
        document.querySelector('#exit').addEventListener('click', StateClear)
    }


    function addFioYetSebdler(tabNum) {

        try {
            axios.post(`${API_URL}api/auth/fioSendler`, {
                tabNum: tabNum,

            })
                .then(res => {

                    let fio = res.data;

                    if (document.querySelector(`#firstName${count}`),
                        document.querySelector(`#lastName${count}`),
                        document.querySelector(`#middleName${count}`),
                        document.querySelector(`#emailInput${count}`),
                        document.querySelector(`#phoneNumber${count}`)) {

                        document.querySelector(`#firstName${count}`).value = fio[1];
                        document.querySelector(`#lastName${count}`).value = fio[0];
                        document.querySelector(`#middleName${count}`).value = fio[2];
                        // document.querySelector(`#emailInput${count}`).value = fio[3];
                        // if (fio[3] !== undefined) {
                        //     document.querySelector(`#emailInput${count}`).value = fio[3];
                        // } else {
                        //     document.querySelector(`#emailInput${count}`).value = "";
                        // }
                        // if (fio[5] !== undefined) {
                        //     document.querySelector(`#phoneNumber${count}`).value = "+" + fio[5].slice(1);
                        // } else {
                        //     document.querySelector(`#phoneNumber${count}`).value = "";
                        // }


                        setNameNew(fio[1])
                        setLastNameNew(fio[0])
                        setMiddleNameNew(fio[2])
                        // setEmailNew(fio[3])
                        // setPhoneNumberNew(fio[5])


                    }

                })
        } catch (e) {
            alert(e.response)
        }
    }

    function checkRegistration(tabNum){
        try {
            axios.post(`${API_URL}api/auth/checkRegistration`, {
                tabNum: tabNum,
            })
                .then(res => {
                    let reg = res.data;
                   
                    if(reg != false){
                        if (reg === true) {
                            setRenderInput('password')
                        } else {
                            setRenderInput('getPassword')
                        }
                    } else{
                        setRenderInput(null)     
                    }
                })
        } catch (e) {
            alert(e.response)
        }
    }

    function addFioSendler(tabNum) {
        if (localStorage.getItem('userTabelNum') === null) {
            try {
                axios.post(`${API_URL}api/auth/fioSendler`, {
                    tabNum: tabNum,
                })
                    .then(res => {
                        let fio = res.data;
                        setName(fio[1])
                        setLastName(fio[0])
                        setMiddleName(fio[2])
                        setEmail(fio[3])
                        setPhoneNumber("+"+fio[5])
                    })
            } catch (e) {
                alert(e.response)
            }
        } else if (localStorage.getItem('userTabelNum') === document.querySelector('#tabelNumber').value) {
            try {
                axios.post(`${API_URL}api/auth/fioSendler`, {
                    tabNum: tabNum,
                })
                    .then(res => {

                        let fio = res.data;

                        setName(fio[1])
                        setLastName(fio[0])
                        setMiddleName(fio[2])
                        setEmail(fio[3])
                        setPhoneNumber("+" + fio[5].slice(1))
                        console.log(phoneNumber)
                        console.log(fio[5])
                    })
            } catch (e) {
                alert(e.response)
            }
        } else {
            try {
                axios.post(`${API_URL}api/auth/fioSendler`, {
                    tabNum: tabNum,
                })
                    .then(res => {

                        let fio = res.data;

                        setName("")
                        setLastName("")
                        setMiddleName("")
                        setEmail("")
                        setPhoneNumber('')

                    })
            } catch (e) {
                alert(e.response)
            }
        }

    }

    let addNewSendler = {

        name: nameNew,
        surname: lastNameNew,
        middlename: middleNameNew,
        email: EmailNew,
        tabelNumber: tabelNumberNew,
        phoneNumber: phoneNumberNew,

    };

    addObjSend(addFlag)

    function YetSendler() {

        console.log(addNewSendler);
        let arrEl = [];
        let key = Object.keys(allNewSendler)
        console.log(key);

        let objLengtch = Object.keys(allNewSendler).length
        for (let i = 1; i < objLengtch; i++) {

            let surname = allNewSendler[key[i]].surname;
            console.log(allNewSendler[key[i]])
            console.log(surname)
            if (surname != undefined) {

                arrEl[i] = React.createElement("div", { className: "formYetSendler", id: `yetSendler${i} `, key: `keyList${i}` },
                    <label >{surname}</label>,
                    <div className="btnYetClose" id={`keyBtn${i}`} onClick={() => {

                        setNameNew(undefined)
                        setLastNameNew(undefined)
                        setMiddleNameNew(undefined)
                        setEmailNew(undefined)
                        setTabelNumberNew(undefined)
                        setPhoneNumberNew(undefined)

                        let numElem = key[i];
                        addFlag = true;
                        delete allNewSendler[numElem];
                        setYetSendler(<YetSendler />)
                    }}></div>)
            } else {
                delete allNewSendler[key[i]]
            }

        }
        console.log(arrEl)

        return React.createElement("div", { className: "formFildsForm", key: `container` }, arrEl)

    }

    function addObjSend(noadd) {


        if (noadd == true) {

        } else {
            let addNewSendler = {

                name: nameNew,
                surname: lastNameNew,
                middlename: middleNameNew,
                email: EmailNew,
                tabelNumber: tabelNumberNew,
                phoneNumber: phoneNumberNew

            };
            allNewSendler[count] = addNewSendler;


        }

    }

    function SaveBtn() {
        return (
            React.createElement("div", { className: "btnYetSend" }, <button value="submit" className='saveYetSendler' onClick={() => {


                let firstInput = document.querySelector(`#firstName${count}`).value;
                let twoInput = document.querySelector(`#lastName${count}`).value;
                let thirdInput = document.querySelector(`#middleName${count}`).value;
                let fourthInput = document.querySelector(`#tabelNumber${count}`).value;
                let fifthInput = document.querySelector(`#emailInput${count}`).value;
                let sixthInput = document.querySelector(`#phoneNumber${count}`).value;

                if (firstInput.length != 0 && twoInput.length != 0 && thirdInput.length != 0 && fourthInput.length != 0
                    && fifthInput.length != 0 && sixthInput.length != 0) {

                    setNewSendler(newSendler === null);
                    setYetSendler(<YetSendler />)
                    addFlag = false

                } else {
                    alert('Заполните все поля')
                }



                /* if(nameNew != undefined){
                    addObjSend(addNewSendler);   
                    setNameNew(undefined)
                    setLastNameNew(undefined)
                    setMiddleNameNew(undefined)
                    setEmailNew(undefined)
                    setTabelNumberNew(undefined)
                    setPhoneNumberNew(undefined)
                    setYetSendler(<YetSendler/>)   
                } */

            }} > Сохранить еще одного пользователя</button>)
        )
    }

    function AddSendler(props) {


        let arr = [
            React.createElement("div", { className: "formFilds" }, <label htmlFor={"tabelNumber" + props}>Табельный номер</label>,
                <input type="text" name={"tabelNumber" + props} id={"tabelNumber" + props} className='input-yetSendler' placeholder="12345"
                    required onChange={(e) => {
                        setTabelNumberNew(e.target.value);
                        if (e.target.value.length === 5) {
                            console.log(e.target.value)
                            addFioYetSebdler(e.target.value)
                        }
                    }} onBlur={(e) => { addFioYetSebdler(e.target.value) }} />),
            React.createElement("div", { className: "formFilds" }, <label htmlFor={"firstName" + props}>Имя</label>, <input type="text" name={"firstName" + props} id={"firstName" + props} className='input-yetSendler' placeholder="Иван" required onChange={(e) => setNameNew(e.target.value)} />),
            React.createElement("div", { className: "formFilds" }, <label htmlFor={"lastName" + props}>Фамилия</label>, <input type="text" name={"lastName" + props} id={"lastName" + props} className='input-yetSendler' placeholder="Иванов" required onChange={(e) => setLastNameNew(e.target.value)} />),
            React.createElement("div", { className: "formFilds" }, <label htmlFor={"middleName" + props}>Отчество</label>, <input type="text" name={"middleName" + props} id={"middleName" + props} className='input-yetSendler' placeholder="Иванович" required onChange={(e) => setMiddleNameNew(e.target.value)} />),
            React.createElement("div", { className: "formFilds" }, <label htmlFor={"emailInput" + props}>E-mail</label>, <input type="email" name={"email" + props} id={"emailInput" + props} className='input-yetSendler' placeholder="e-mail-adress@gmail.com" required onChange={(e) => setEmailNew(e.target.value)} />),
            React.createElement("div", { className: "formFilds" }, <label htmlFor={"phoneNumber" + props}> Номер телефона</label>, <input type="tel" name={"phoneNumber" + props} id={"phoneNumber" + props} className='input-yetSendler' placeholder="+375293333333" required onChange={(e) => setPhoneNumberNew(e.target.value)} />),
        ]




        return (React.createElement("div", {
            className: `shadowBox`, onClick: () => {
                addFlag = false;
                setNewSendler(undefined);
                setNameNew(undefined)
                setLastNameNew(undefined)
                setMiddleNameNew(undefined)
                setEmailNew(undefined)
                setTabelNumberNew(undefined)
                setPhoneNumberNew(undefined)



                /*   handleClick(event) {  
                      var clickedId = event.target.id;
                      console.log(clickedId);
                      alert("It works! You clicked " + clickedId)
                    } */

            }
        }, React.createElement("div", { className: `offers newSendler${props} exists`, onClick: (event) => event.stopPropagation() }, arr, <SaveBtn />, <div className='closeAddForm' onClick={() => {

            addFlag = false;
            setNewSendler(undefined);
            setNameNew(undefined)
            setLastNameNew(undefined)
            setMiddleNameNew(undefined)
            setEmailNew(undefined)
            setTabelNumberNew(undefined)
            setPhoneNumberNew(undefined)


        }}></div>)))
    }

    function NewSendler() {

        return (

            <div className={s.buttonConfirm} >
                <button onClick={() => {

                    if (!document.querySelector(`.exists`)) {
                        setCount(count + 1); setNewSendler(AddSendler(count));
                        //console.log(document.querySelector('.shadowBox'))

                        addFlag = false

                        addNewSendler = {

                            name: nameNew,
                            surname: lastNameNew,
                            middlename: middleNameNew,
                            email: EmailNew,
                            tabelNumber: tabelNumberNew,
                            phoneNumber: phoneNumberNew,

                        };



                    }
                }}>
                    Добавить ещё одного автора предложения
                </button>
            </div>
        )

    }


    const handleSubmit = (event) => {

        event.preventDefault();
        let btnFormON = document.querySelector('.close-btn');

        if (btnFormON == null) {

            console.log("OffFunc allNewSendler")
            console.log(allNewSendler)
            let allYetSendler = JSON.stringify(allNewSendler)
            console.log(allYetSendler)
            console.log(name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer)
            OffFunc(name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer, allYetSendler);
            objClear();
            allNewSendler = {}
            UploadFile('file');
            setYetSendler(undefined)
            setNameNew(undefined)
            setLastNameNew(undefined)
            setMiddleNameNew(undefined)
            setEmailNew(undefined)
            setTabelNumberNew(undefined)
            setPhoneNumberNew(undefined)

        } else {
            console.log(".close-btn true");
        }
    }
    if (localStorage.getItem('userTabelNum') === null) {

        if (renderInput === "password" && tabelNumber.length === 5) {
           //форма для сущ пользователя
        if(trueRegCheckPass === true){
       return(
<div className={s.sendOfferContainer}>
            <form className="offers" onSubmit={handleSubmit}>
                <div className="form-fields">
                    <div className={s.formFilds}>
                        <input type="text" minLength="5" placeholder="табельный номер" className="input-data" id="tabelNumber" disabled
                            name="tabelNumber" required autoComplete="on"
                            value={tabelNumber} onChange={(e) => {
                                setTabelNumber(e.target.value)
                                if (e.target.value.length === 5) {
                                    // addFioSendler(e.target.value)
                                    checkRegistration(tabelNumber);
                                }
                            }}  />
                        <label htmlFor="tabelNumber">Табельный номер</label>
                        <div className="false-input false-tabelNumber"></div>
                    </div>
                    <div className={s.formFilds}>
                    <input type="text" placeholder="Иванов" id="lastName" className="input-data" name="lastName"
                        required autoComplete="off" disabled
                        value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <label htmlFor="lastName">Фамилия</label>
                    <div className="false-input false-lastName"></div>
                </div>

                <div className={s.formFilds}>
                    <input type="text" placeholder="Иван" id="firstName" className="input-data" name="firstName"
                        value={name} disabled
                        onChange={(e) => setName(e.target.value)} required autoComplete="off" />
                    <label htmlFor="firstName">Имя</label>
                    <div className="false-input false-name"></div>
                </div>


                <div className={s.formFilds}>
                    <input type="text" placeholder="Иванович" id="middleName" className="input-data"
                        name="middleName" required autoComplete="off" disabled
                        value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                    <label htmlFor="middleName">Отчество</label>
                    <div className="false-input false-middleName"></div>
                </div>

                <div className={s.formFilds}>
                    <input type="email" placeholder="e-mail-adress@gmail.com" className="input-data" id="emailInput"
                        name="email"  autoComplete="off"
                        value={Email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="emailInput">E-mail</label>
                    <div className="false-input false-emailInput"></div>
                </div>
                <div className={s.formFilds}>
                    <input type="tel" maxLength="13" minLength="13" pattern="\+\d\d\d\d\d\d\d\d\d\d\d\d"
                        id="phoneNumber" placeholder="+375293333333" className="input-data" name="phoneNumber"
                        required autoComplete="off"
                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <label htmlFor="phoneNumber">Номер телефона</label>
                    <div className="false-input false-phoneNumber"></div>
                </div>

                <div className={s.formFilds}>

                    <input type="text" placeholder="Название" id="nameOffer" className="input-data" name="nameOffer"
                        required autoComplete="on"
                        value={nameOffer} onChange={(e) => setNameOffer(e.target.value)} />
                    <label htmlFor="nameOffer">Название предложения</label>
                    <div className="false-input false-nameOffer"></div>

                </div>
                <div className="problem">
                    <div className={s.formFilds}>

                        <textarea id="problem" className="input-data" name="problem" required autoComplete="off" cols="50"
                            value={problem}
                            onChange={(e) => {setProblem(e.target.value); textAreaOnChange(e, "problem");}}
                            onBlur={(e) => { textAreaOnBlur("problem"); }}
                            onFocus={() => {textAreaOnFocus("problem")}}></textarea>
                        <footer>
                            <label htmlFor="problem">Описание проблемы</label>
                        </footer>

                        <div className="false-input false-problem"></div>
                    </div>
                </div>
                <div className="offer">
                    <div className={s.formFilds}>
                        <textarea id="offer" className="input-data" name="offer" required autoComplete="off" cols="50"
                            value={offer}
                            onChange={(e) => {setOffer(e.target.value); textAreaOnChange(e, "offer");}}
                            onBlur={(e) => {textAreaOnBlur("offer");}
                          }
                            onFocus={() => {textAreaOnFocus("offer")}}></textarea>
                        <footer>
                            <label htmlFor="problem">Предложение</label>
                        </footer>
                        <div className="false-input false-offer"></div>
                    </div>
                </div>
                <input type="file" name="myFile" id="file"></input>
                <div className={s.formFieldCheckbox}>
                    <input type="checkbox" name="agreement" id="agree" className="input-data" required
                        value={checked} onChange={(e) => setChecked(!checked)} />
                    <label htmlFor="agree" className="label-checkbox">Разрешаю передачу персональных данных</label>
                    <div className="false-input false-agree"></div>
                </div>
                <NewSendler />
                {newSendler}
                <ComponentDestruction />

                <div className={s.buttonConfirm}>
                    <button id="form-button" className="form-btn-sendOffer" type="submit" value="submit" >Подтвердить
                        запись
                    </button>
                </div>

                </div>
            </form>
        </div>
       )     
        }
            
           
            return (                    // рендер полей в случае если табельный уже зарегестрирован
                <div className={s.sendOfferContainer}>
                    <form className="offers" onSubmit={handleSubmit}>
                        <div className="form-fields">
                            <div className={s.formFilds}>
                                <input type="text" minLength="5" placeholder="табельный номер" className="input-data" id="tabelNumber"
                                    name="tabelNumber" required autoComplete="on"
                                    value={tabelNumber} onChange={(e) => {
                                        setTabelNumber(e.target.value)
                                        if (e.target.value.length === 5) {
                                            console.log(tabelNumber.length)
                                            addFioSendler(e.target.value)
                                        }
                                    }}  />
                                <label htmlFor="tabelNumber">Табельный номер</label>
                                <div className="false-input false-tabelNumber"></div>
                            </div>
                            <div className="password">
                                <label htmlFor="password">Введите пароль</label>
                                <input type="text" placeholder="пароль" id="password" className="input-data" name="password"
                                    onChange={(e) => {setPassword(e.target.value) ; setAlertCheckPass(null)}} required autoComplete="off" />
                                <div className="false-input false-name"></div>
                            </div>
                            <div className='alertCheckPass'>
                            {alertCheckPass}
                            </div>
                        </div>
                        <div className={s.buttonConfirm}>
                        
                            <button id="form-button" className="form-btn-sendOffer" type="button" value="submit" onClick={
                                () => {
                                   
                                    if(countFalseInput < 3){
                                        try {
                                            axios.post(`${API_URL}api/auth/checkPassword`, {
                                                tabNum: tabelNumber,
                                                password: password
                                            })
                                                .then(res => {
    
                                                    let chekPass = res.data;
                                                    if (chekPass === true && trueRegCheckPass === false) {
                                                        setTrueRegCheckPass(true)
                                                        addFioSendler(tabelNumber);
                                                    } 
                                                    if(chekPass === false  || password.length === 0){
    
                                                        setAlertCheckPass("Неверный пароль");
                                                        setCountFalseInput(countFalseInput + 1)
                                                       
                                                    }
                                                })
                                        } catch (e) {
                                            alert(e.response)
                                        }
                                    } else {
                                        alert("Если не помните пароль, можете обратиться по тел: 94-19")
                                        setCountFalseInput(0)
                                    }
                                   
                                }
                            }>Подтвердить</button>
                        </div>

                    </form>
                </div>
            )

        } else if (renderInput === "getPassword" && tabelNumber.length === 5) {

            if (renderForm === true) {
                return (
                    <div className={s.sendOfferContainer}>
                        {yetSendler}
                        <form className="offers" onSubmit={handleSubmit}>
                            <div className="form-fields">

                                <div className={s.formFilds}>
                                    <input type="text" minLength="5" placeholder="табельный номер" className="input-data" id="tabelNumber"
                                        name="tabelNumber" required autoComplete="on"
                                        value={tabelNumber} onChange={(e) => {
                                            setTabelNumber(e.target.value)
                                            if (e.target.value.length === 5) {
                                                console.log(tabelNumber.length)
                                                addFioSendler(e.target.value)
                                            }
                                        }}  />
                                    <label htmlFor="tabelNumber">Табельный номер</label>
                                    <div className="false-input false-tabelNumber"></div>
                                </div>
                                <div className={s.formFilds}>
                                    <input type="text" placeholder="Иванов" id="lastName" className="input-data" name="lastName"
                                        required  autoComplete="off"
                                        value={lastName} onChange={(e) => setLastName(e.target.value)} onClick = {(e)=>{
                                            document.querySelector('.false-name').innerText = ""
                                            document.querySelector('.false-lastName').innerText = ""
                                            document.querySelector('.false-middleName').innerText = ""
                                        }} />
                                    <label htmlFor="lastName">Фамилия</label>
                                    <div className="false-input false-lastName"></div>
                                </div>

                                <div className={s.formFilds}>
                                    <input type="text" placeholder="Иван" id="firstName" className="input-data" name="firstName" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} required autoComplete="off" onClick = {(e)=>{
                                            document.querySelector('.false-name').innerText = ""
                                            document.querySelector('.false-lastName').innerText = ""
                                            document.querySelector('.false-middleName').innerText = ""
                                        }} />
                                    <label htmlFor="firstName">Имя</label>
                                    <div className="false-input false-name"></div>
                                </div>
                                <div className={s.formFilds}>
                                    <input type="text" placeholder="Иванович" id="middleName" className="input-data" 
                                        name="middleName" required autoComplete="off"
                                        value={middleName} onChange={(e) => setMiddleName(e.target.value)} onClick = {(e)=>{
                                            document.querySelector('.false-name').innerText = ""
                                            document.querySelector('.false-lastName').innerText = ""
                                            document.querySelector('.false-middleName').innerText = ""
                                        }} />
                                    <label htmlFor="middleName">Отчество</label>
                                    <div className="false-input false-middleName"></div>
                                </div>
                                <div className={s.formFilds}>
                                    <input type="email" placeholder="e-mail-adress@gmail.com" className="input-data" id="emailInput"
                                        name="email"  autoComplete="off"
                                        value={Email} onChange={(e) => setEmail(e.target.value)} />
                                    <label htmlFor="emailInput">E-mail</label>
                                    <div className="false-input false-emailInput"></div>
                                </div>
                                <div className={s.formFilds}>
                                    <input type="tel" maxLength="13" minLength="13" pattern="\+\d\d\d\d\d\d\d\d\d\d\d\d"
                                        id="phoneNumber" placeholder="+375293333333" className="input-data" name="phoneNumber"
                                        required autoComplete="off"
                                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    <label htmlFor="phoneNumber">Номер телефона</label>
                                    <div className="false-input false-phoneNumber"></div>
                                </div>

                                <div className={s.formFilds}>

                                    <input type="text" placeholder="Название" id="nameOffer" className="input-data" name="nameOffer"
                                        required autoComplete="on"
                                        value={nameOffer} onChange={(e) => setNameOffer(e.target.value)} />
                                    <label htmlFor="nameOffer">Название предложения</label>
                                    <div className="false-input false-nameOffer"></div>

                                </div>
                                <div className="problem">
                                    <div className={s.formFilds}>

                                        <textarea id="problem" className="input-data" name="problem" required autoComplete="off" cols="50"
                                            value={problem}
                                            onChange={(e) => { setProblem(e.target.value); textAreaOnChange(e, "problem"); }}
                                            onBlur={(e) => { textAreaOnBlur("problem"); }}
                                            onFocus={() => { textAreaOnFocus("problem") }}></textarea>
                                        <footer>
                                            <label htmlFor="problem">Описание проблемы</label>
                                        </footer>

                                        <div className="false-input false-problem"></div>
                                    </div>
                                </div>
                                <div className="offer">
                                    <div className={s.formFilds}>
                                        <textarea id="offer" className="input-data" name="offer" required autoComplete="off" cols="50"
                                            value={offer}
                                            onChange={(e) => { setOffer(e.target.value); textAreaOnChange(e, "offer"); }}
                                            onBlur={(e) => { textAreaOnBlur("offer"); }
                                            }
                                            onFocus={() => { textAreaOnFocus("offer") }}></textarea>
                                        <footer>
                                            <label htmlFor="problem">Предложение</label>
                                        </footer>
                                        <div className="false-input false-offer"></div>
                                    </div>
                                </div>
                                <input type="file" name="myFile" id="file"></input>
                                <div className={s.formFieldCheckbox}>
                                    <input type="checkbox" name="agreement" id="agree" className="input-data" required
                                        value={checked} onChange={(e) => setChecked(!checked)} />
                                    <label htmlFor="agree" className="label-checkbox">Разрешаю передачу персональных данных</label>
                                    <div className="false-input false-agree"></div>
                                </div>
                                <NewSendler />
                                {newSendler}
                                <ComponentDestruction />

                                <div className={s.buttonConfirm}>
                                    <button id="form-button" className="form-btn-sendOffer" type="submit" value="submit" >Подтвердить
                                        запись
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }


            return (
                <div className={s.sendOfferContainer}>
                    <form className="offers" onSubmit={handleSubmit}>
                        <div className="form-fields">
                            <div className={s.formFilds}>
                                <input type="text" minLength="5" placeholder="табельный номер" className="input-data" id="tabelNumber"
                                    name="tabelNumber" required autoComplete="on"
                                    value={tabelNumber} onChange={(e) => {
                                        setTabelNumber(e.target.value)
                                        if (e.target.value.length === 5) {
                                            console.log(tabelNumber.length)
                                            addFioSendler(e.target.value)
                                        }
                                    }}  />
                                <label htmlFor="tabelNumber">Табельный номер</label>
                                <div className="false-input false-tabelNumber"></div>
                            </div>
                            <div className="password">
                                <label>Введите пароль</label>
                                <input type="text" placeholder="пароль" id="password" className="input-data" name="password"
                                    onChange={(e) => setPassword(e.target.value)} required autoComplete="off" />
                                <div className="false-input false-name"></div>
                                <label>Придумайте пароль длинной не менее 5 символов</label>
                            </div>
                            <div className="password">
                                <label htmlFor="firstName">Подтвердите пароль</label>
                                <input type="text" placeholder="Подтвердите пароль" id="password" className="input-data" name="password"
                                    onChange={(e) => {setCheckPass(e.target.value) ; setAlertCheckPass(null) }} required autoComplete="off" />
                                <div className="false-input false-name"></div>
                            </div>
                            Введите дату рождения
                            <input type="date" id='date' required onClick={()=>{
                                let dateBlock = document.querySelector('.alertDate');
                                dateBlock.innerText = ""
                            }}></input>
                                    <div className='alertDate'></div>
                            <label htmlFor="firstName">{alertCheckPass}</label>
                        </div>
                        <button id="123" type="button" onClick={(e) => {
                            
                            let date = document.querySelector('#date').value
                            
                             let dateBlock = document.querySelector('.alertDate')
                              try {
                                axios.post(`${API_URL}api/auth/checkUserDateBirth`, {
                                    tabNum: tabelNumber,
                                    date : date
                                })
                                    .then(res => { 
                                        if(res.data === false){
                                            dateBlock.innerText = "Неверная дата";
                                            setRenderForm(false)
                                        } else if( password.length < 5){
                                            console.log(password.length)
                                            setAlertCheckPass("Пароль слишком короткий")
                                        }else if (password !== checkPass) {
                                            setAlertCheckPass("Пароль не совпадает")
                                            dateBlock.innerText = "";
                                        } else {
                                            setAlertCheckPass(null)
                                            setRenderForm(true)
                                        }
                                     })
                            } catch (e) {
                                alert(e.response)
                            }
                        }}>Подтвердить</button>
                    </form>

                </div>
            )
        } else if (tabelNumber.length < 5 && renderForm === true) {
            setRenderForm(false)
        }
     

        return (

            <div className={s.sendOfferContainer}>
                <form className="offers" onSubmit={handleSubmit}>
                    <div className="form-fields">
                        <div className={s.formFilds}>
                            <input type="text" minLength="5" placeholder="табельный номер" className="input-data" id="tabelNumber"
                                name="tabelNumber" required autoComplete="on"
                                value={tabelNumber} onChange={(e) => {
                                    setTabelNumber(e.target.value)
                                    if (e.target.value.length === 5) {
                                        // addFioSendler(e.target.value)
                                        checkRegistration(e.target.value);
                                    }
                                }}  />
                            <label htmlFor="tabelNumber">Табельный номер</label>
                            <div className="false-input false-tabelNumber"></div>
                        </div>
                    </div>
                </form>
            </div>
        )
    } else {
        return (
            //форма для личного кабинета
            <div className={s.sendOfferContainer}>
                {yetSendler}
                <form className="offers" onSubmit={handleSubmit}>
                    <div className="form-fields">

                        <div className={s.formFilds}>
                            <input type="text" disabled placeholder="табельный номер" className="input-data" id="tabelNumber"
                                name="tabelNumber" required autoComplete="on"
                                value={tabelNumber} onChange={(e) => {
                                    setTabelNumber(e.target.value)
                                    if (e.target.value.length === 5) {
                                        console.log(tabelNumber.length)
                                        addFioSendler(e.target.value)
                                    }
                                }}  />
                            <label htmlFor="tabelNumber">Табельный номер</label>
                            <div className="false-input false-tabelNumber"></div>
                        </div>
                        <div className={s.formFilds}>
                            <input type="text" disabled placeholder="Иванов" id="lastName" className="input-data" name="lastName"
                                required autoComplete="off"
                                value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <label htmlFor="lastName">Фамилия</label>
                            <div className="false-input false-lastName"></div>
                        </div>

                        <div className={s.formFilds}>
                            <input type="text" disabled placeholder="Иван" id="firstName" className="input-data" name="firstName" 
                                value={name}
                                onChange={(e) => setName(e.target.value)} required autoComplete="off" />
                            <label htmlFor="firstName">Имя</label>
                            <div className="false-input false-name"></div>
                        </div>


                        <div className={s.formFilds}>
                            <input type="text" disabled placeholder="Иванович" id="middleName" className="input-data"
                                name="middleName" required autoComplete="off"
                                value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                            <label htmlFor="middleName">Отчество</label>
                            <div className="false-input false-middleName"></div>
                        </div>
                        <div className={s.formFilds}>
                            <input type="email" placeholder="e-mail-adress@gmail.com" className="input-data" id="emailInput"
                                   name="email"  autoComplete="off"
                                   value={Email} onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="emailInput">E-mail</label>
                            <div className="false-input false-emailInput"></div>
                        </div>
                        <div className={s.formFilds}>
                            <input type="tel" maxLength="13" minLength="13" pattern="\+\d\d\d\d\d\d\d\d\d\d\d\d"
                                   id="phoneNumber" placeholder="+375293333333" className="input-data" name="phoneNumber"
                                   required autoComplete="off"
                                   value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            <label htmlFor="phoneNumber">Номер телефона</label>
                            <div className="false-input false-phoneNumber"></div>
                        </div>

                        <div className={s.formFilds}>

                            <input type="text" placeholder="Название" id="nameOffer" className="input-data" name="nameOffer"
                                required autoComplete="on"
                                value={nameOffer} onChange={(e) => setNameOffer(e.target.value)} />
                            <label htmlFor="nameOffer">Название предложения</label>
                            <div className="false-input false-nameOffer"></div>

                        </div>
                        <div className="problem">
                            <div className={s.formFilds}>

                                <textarea id="problem" className="input-data" name="problem" required autoComplete="off" cols="50"
                                    value={problem}
                                    onChange={(e) => { setProblem(e.target.value); textAreaOnChange(e, "problem"); }}
                                    onBlur={(e) => { textAreaOnBlur("problem"); }}
                                    onFocus={() => { textAreaOnFocus("problem") }}></textarea>
                                <footer>
                                    <label htmlFor="problem">Описание проблемы</label>
                                </footer>

                                <div className="false-input false-problem"></div>
                            </div>
                        </div>
                        <div className="offer">
                            <div className={s.formFilds}>
                                <textarea id="offer" className="input-data" name="offer" required autoComplete="off" cols="50"
                                    value={offer}
                                    onChange={(e) => { setOffer(e.target.value); textAreaOnChange(e, "offer"); }}
                                    onBlur={(e) => { textAreaOnBlur("offer"); }
                                    }
                                    onFocus={() => { textAreaOnFocus("offer") }}></textarea>
                                <footer>
                                    <label htmlFor="problem">Предложение</label>
                                </footer>
                                <div className="false-input false-offer"></div>
                            </div>
                        </div>
                        <input type="file" name="myFile" id="file"></input>
                        <div className={s.formFieldCheckbox}>
                            <input type="checkbox" name="agreement" id="agree" className="input-data" required
                                value={checked} onChange={(e) => setChecked(!checked)} />
                            <label htmlFor="agree" className="label-checkbox">Разрешаю передачу персональных данных</label>
                            <div className="false-input false-agree"></div>
                        </div>
                        <NewSendler />
                        {newSendler}
                        <ComponentDestruction />

                        <div className={s.buttonConfirm}>
                            <button id="form-button" className="form-btn-sendOffer" type="submit" value="submit" >Подтвердить
                                запись
                            </button>
                        </div>

                    </div>

                </form>




            </div>

        )
    }

}


export default OffersForm;

