import React, { useState, useEffect } from 'react';
import OffFunc from './offerForm/FormOffFunc.js';
import UploadFile from './fileUpload/fileUpload'
import s from "./offerForm/formOffers.module.css";
import "./offersStyle.css"
import axios from 'axios';
import {API_URL} from  '../../../config'
import {NavLink} from "react-router-dom";

let allNewSendler = {
   

};

function objClear(){
    allNewSendler = {};
}

objClear()

let addFlag = false;



function OffersForm(props) {

    window.addEventListener("popstate",function(e){
        objClear();
      
        addFlag = false;
    },false);
    
    const nameMid = localStorage.getItem('userName')  ? `${localStorage.getItem('userName')}` : ``
    const SurNameMid = localStorage.getItem('userSurName')  ? `${localStorage.getItem('userSurName')}` : ``
    const MiddleNameMid = localStorage.getItem('userMiddleName')  ? `${localStorage.getItem('userMiddleName')}` : ``
    const EmailMid = localStorage.getItem('userEmail')  ? `${localStorage.getItem('userEmail')}` : ``
    const TabelNumMid = localStorage.getItem('userTabelNum')  ? `${localStorage.getItem('userTabelNum')}` : ``
    const PhoneNumberMid = localStorage.getItem('userPhoneNumber')  ? `+${localStorage.getItem('userPhoneNumber').slice(2)}` : ``


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

    function addFioYetSebdler(tabNum){
       
        try{
            axios.post(`${API_URL}api/auth/fioSendler`, {  tabNum: tabNum,
    
                                                        })
                                                        .then(res => {
                                                          
                                                            console.log(res.data)
                                                            let fio = res.data;
                                                            console.log(fio[0])
                                                            console.log( document.querySelector(`#firstName${count}`))
                                                             document.querySelector(`#firstName${count}`).value = fio[1];
                                                             document.querySelector(`#lastName${count}`).value = fio[0];
                                                             document.querySelector(`#middleName${count}`).value = fio[2];

                                                             setNameNew(fio[1])
                                                             setLastNameNew(fio[0])
                                                             setMiddleNameNew(fio[2])
    
                                                        })
        } catch (e){
            alert(e.response)
        }
    }

    let addNewSendler = {
       
        name: nameNew,
        surname: lastNameNew,
        middlename: middleNameNew ,
        email: EmailNew,
        tabelNumber: tabelNumberNew,
        phoneNumber: phoneNumberNew,

    };

   // allNewSendler[count] = addNewSendler;

    addObjSend(addFlag)
   // console.log(addNewSendler)

 

    function YetSendler(){
     
        console.log(addNewSendler);
        let arrEl = [];          
        let key =  Object.keys(allNewSendler)
        console.log(key);
        let objLengtch = Object.keys(allNewSendler).length
        for(let i = 1; i<objLengtch; i++){
         
            let surname = allNewSendler[key[i]].surname;
            if( surname!=undefined ){
               
                arrEl[i] = React.createElement("div", {className:"formYetSendler" , id:`yetSendler${i} `, key:`keyList${i}`} , 
                <label >{surname}</label>, 
                <div  className="btnYetClose" id ={`keyBtn${i}`} onClick={()=>{
                   setNameNew(undefined)
                   setLastNameNew(undefined)
                   setMiddleNameNew(undefined)
                   setEmailNew(undefined)
                   setTabelNumberNew(undefined)
                   setPhoneNumberNew(undefined)
                   
                   let numElem = key[i];
                   addFlag = true;
                   delete allNewSendler[numElem];                    
                   setYetSendler(<YetSendler/>)                             
}}>X</div>)
            } else {
                delete  allNewSendler[key[i]]
            }
           
        }
        console.log(arrEl)
       
        return React.createElement("div", {className:"formFildsForm",  key:`container`} , arrEl)
       
    }
  
   function addObjSend(noadd){

    
    if(noadd == true){

    } else{
        let addNewSendler = {
       
            name: nameNew,
            surname: lastNameNew,
            middlename: middleNameNew ,
            email: EmailNew,
            tabelNumber: tabelNumberNew,
            phoneNumber: phoneNumberNew
    
        };
            allNewSendler[count] = addNewSendler;
            
            
    }
   
    }
   
    function SaveBtn(){ 
        return(
            React.createElement("div", {className:"btnYetSend"} , <button value="submit" onClick={()=>{
                
                
                 let firstInput = document.querySelector(`#firstName${count}`).value;
                 let twoInput = document.querySelector(`#lastName${count}`).value;
                 let thirdInput = document.querySelector(`#middleName${count}`).value;
                 let fourthInput = document.querySelector(`#tabelNumber${count}`).value;
                 let fifthInput = document.querySelector(`#emailInput${count}`).value;
                 let sixthInput = document.querySelector(`#phoneNumber${count}`).value;
                
                 if(firstInput.length != 0  && twoInput.length != 0 && thirdInput.length != 0 && fourthInput.length != 0
                     && fifthInput.length != 0 && sixthInput.length != 0 ){
                       
                        setNewSendler(newSendler == null); 
                        setYetSendler(<YetSendler/>)
                        addFlag = false
                      
                     } else{
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
    
    function AddSendler(props){
       
             
         let   arr = [
            React.createElement("div", {className:"formFilds"} , <label htmlFor={"tabelNumber"+props}>Табельный номер</label>, <input  type="number" name={"tabelNumber"+props} id={"tabelNumber"+props} placeholder="12345" required onChange={(e) => setTabelNumberNew(e.target.value)} onBlur={(e)=>{addFioYetSebdler(e.target.value)}}/> ),
            React.createElement("div", {className:"formFilds"} , <label htmlFor={"firstName"+props}>Имя</label>, <input  type="text" name={"firstName"+props} id={"firstName"+props} placeholder="Иван" required onChange={(e) => setNameNew(e.target.value)} /> ),
            React.createElement("div", {className:"formFilds"} , <label htmlFor={"lastName"+props}>Фамилия</label>,  <input  type="text" name={"lastName"+props} id={"lastName"+props} placeholder="Иванов" required onChange={(e) => setLastNameNew(e.target.value)}/>  ),
            React.createElement("div", {className:"formFilds"} , <label htmlFor={"middleName"+props}>Отчество</label>, <input  type="text" name={"middleName"+props} id={"middleName"+props} placeholder="Иванович" required onChange={(e) => setMiddleNameNew(e.target.value)}/>),
            React.createElement("div", {className:"formFilds"} , <label htmlFor={"emailInput"+props}>E-mail</label>, <input  type="email" name={"email"+props} id={"emailInput"+props} placeholder="e-mail-adress@gmail.com" required onChange={(e) =>setEmailNew(e.target.value) } /> ),
            React.createElement("div", {className:"formFilds"} , <label htmlFor={"phoneNumber"+props}> Номер телефона</label>, <input  type="tel" name={"phoneNumber"+props} id={"phoneNumber"+props} placeholder="+375293333333" required onChange={(e) => setPhoneNumberNew(e.target.value)}/> ),
            ]
            
            


    return(React.createElement("div", {className:`shadowBox`, onClick:()=>{
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
                                                                                                    
    }} , React.createElement("div", {className:`offers newSendler${props} exists`, onClick: (event)=>event.stopPropagation()} ,  arr, <SaveBtn/>, <div className='closeAddForm' onClick={()=>{
     
        addFlag = false;
        setNewSendler(undefined);
        setNameNew(undefined)
        setLastNameNew(undefined)
        setMiddleNameNew(undefined)
        setEmailNew(undefined)
        setTabelNumberNew(undefined)
        setPhoneNumberNew(undefined)  

   
    }}>&#10006;</div>)))
    }  

    function NewSendler(){
     
        return (
            
            <div className={s.buttonConfirm} >
            <button  onClick={()=>{
                
                 if(!document.querySelector(`.exists`)){
                    setCount(count+1); setNewSendler(AddSendler(count));
                    //console.log(document.querySelector('.shadowBox'))
                   
                    addFlag = false
                    
                    addNewSendler = {
       
                        name: nameNew,
                        surname: lastNameNew,
                        middlename: middleNameNew ,
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
           let allYetSendler= JSON.stringify(allNewSendler)
           console.log(allYetSendler)
            OffFunc(name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer,  allYetSendler  );
            objClear();
            allNewSendler={}
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

    return (
      
        <div className={s.sendOfferContainer}>
            {yetSendler}
            <form className="offers" onSubmit={handleSubmit}>
                <div className="form-fields">
                    <div className={s.formFilds}>
                        <input type="text" placeholder="Иван" id="firstName" className="input-data" name="firstName"
                               value={name}
                               onChange={(e) => setName(e.target.value)} required autoComplete="off"/>
                        <label htmlFor="firstName">Имя</label>
                        <div className="false-input false-name"></div>
                    </div>

                    <div className={s.formFilds}>
                        <input type="text" placeholder="Иванов" id="lastName" className="input-data" name="lastName"
                               required autoComplete="off"
                               value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        <label htmlFor="lastName">Фамилия</label>
                        <div className="false-input false-lastName"></div>
                    </div>
                    <div className={s.formFilds}>
                        <input type="text" placeholder="Иванович" id="middleName" className="input-data"
                               name="middleName" required autoComplete="off"
                               value={middleName} onChange={(e) => setMiddleName(e.target.value)}/>
                        <label htmlFor="middleName">Отчество</label>
                        <div className="false-input false-middleName"></div>
                    </div>

                    <div className={s.formFilds}>
                        <input type="number" placeholder="табельный номер" className="input-data" id="tabelNumber"
                               name="tabelNumber" required autoComplete="on"
                               value={tabelNumber} onChange={(e) => setTabelNumber(e.target.value)}/>
                        <label htmlFor="tabelNumber">Табельный номер</label>
                        <div className="false-input false-tabelNumber"></div>
                    </div>

                    <div className={s.formFilds}>
                        <input type="email" placeholder="e-mail-adress@gmail.com" className="input-data" id="emailInput"
                               name="email" required autoComplete="off"
                               value={Email} onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="emailInput">E-mail</label>
                        <div className="false-input false-emailInput"></div>
                    </div>
                    <div className={s.formFilds}>
                        <input type="tel" maxLength="13" minLength="13" pattern="\+\d\d\d\d\d\d\d\d\d\d\d\d"
                               id="phoneNumber" placeholder="+375293333333" className="input-data" name="phoneNumber"
                               required autoComplete="off"
                               value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                        <label htmlFor="phoneNumber">Номер телефона</label>
                        <div className="false-input false-phoneNumber"></div>
                    </div>

                    <div className={s.formFilds}>
                        <input type="text" placeholder="Название" id="nameOffer" className="input-data" name="nameOffer"
                               required autoComplete="on"
                               value={nameOffer} onChange={(e) => setNameOffer(e.target.value)}/>
                        <label htmlFor="nameOffer">Название предложения</label>
                        <div className="false-input false-nameOffer"></div>
                    </div>
                    <div className={s.formFilds}>
              <textarea id="problem" className="input-data" name="problem" required autoComplete="off" cols="50"
                        value={problem} onChange={(e) => setProblem(e.target.value)}></textarea>
                        <footer>
                            <label htmlFor="problem">Описание проблемы</label>
                        </footer>
                        <div className="false-input false-problem"></div>
                    </div>
                    <div className={s.formFilds}>
              <textarea id="offer" className="input-data" name="offer" required autoComplete="off" cols="50"
                        value={offer} onChange={(e) => setOffer(e.target.value)}></textarea>

                        <footer>
                            <label htmlFor="problem">Предложение</label>
                        </footer>
                        <div className="false-input false-offer"></div>
                    </div>
                    <input type="file" name="myFile" id="file"></input>
                    <div className={s.formFieldCheckbox}>
                        <input type="checkbox" name="agreement" id="agree" className="input-data" required
                               value={checked} onChange={(e) => setChecked(!checked)}/>
                        <label htmlFor="agree"  className="label-checkbox">Разрешаю передачу персональных данных</label>
                        <div className="false-input false-agree"></div>
                    </div>
                    <NewSendler/>
                    {newSendler}
                  
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


export default OffersForm;

