import React, {useState} from 'react';
import OffFunc from './offerForm/FormOffFunc.js';
import UploadFile from './fileUpload/fileUpload'
import s from "./offerForm/formOffers.module.css";
import {useContext} from "react";
import Context from "../../context/Context";
import { compose } from 'redux';

let arrNewAllElem = []; 
let allNewSendler = {
   

};

function objClear(){
    allNewSendler = {};
}

objClear()


function OffersForm(props) {

    const [name, setName] = useState(localStorage.getItem('userName'));
    const [lastName, setLastName] = useState(localStorage.getItem('userSurName'));
    const [middleName, setMiddleName] = useState(localStorage.getItem('userMiddleName'));
    const [Email, setEmail] = useState(localStorage.getItem('userEmail'));
    const [tabelNumber, setTabelNumber] = useState(localStorage.getItem('userTabelNum'));
    const [phoneNumber, setPhoneNumber] = useState("");
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

    let addNewSendler = {
       
        name: nameNew,
        surname: lastNameNew,
        middlename: middleNameNew ,
        email: EmailNew,
        tabelNumber: tabelNumberNew,
        phoneNumber: phoneNumberNew,

    };

    function YetSendler(){
        let arr = [];
        console.log("allNewSendler");
        console.log(allNewSendler);
                 
      let key =  Object.keys(allNewSendler)
      console.log(key);
        let objLengtch = Object.keys(allNewSendler).length
        for(let i = 1; i<objLengtch; i++){
            
            console.log(`allNewSendler ${i}`);
            //console.log(allNewSendler);
            console.log(key[i]);
           // console.log(allNewSendler[key[i]]);
            let surname = allNewSendler[key[i]].surname;
            arr[i] = React.createElement("div", {className:"formFilds" , id:`yetSendler${i} `, key:`keyList${i}`} , 
                                         <label >{surname}</label>, 
                                         <div id ={`keyBtn${i}`} onClick={()=>{
              
              //  document.querySelector(`#keyBtn${i}`).remove();
               console.log('key[i]')
             //  setLastNameNew(undefined)
                if(objLengtch == 2){
                    objClear();
                }
               console.log(key[i])
               
               console.log(allNewSendler);
               
                let numElem = key[i];
                delete allNewSendler[numElem];
                console.log(allNewSendler);
                
                 
                setYetSendler(<YetSendler/>)
                
                
        }}>X</div>)
        }
        console.log(arr)
        return React.createElement("div", {className:"formFilds",  key:`container`} , arr)
       
    }

    addObjSend(nameNew, lastNameNew, lastNameNew, middleNameNew, EmailNew, tabelNumberNew, phoneNumberNew, count);
 
   function addObjSend(){
    
        allNewSendler[count] = addNewSendler;
        /* console.log("allNewSendler " )
        console.log(allNewSendler )
         */
    }
   
    function SaveBtn(){
        return(
            React.createElement("div", {className:"formFilds"} , <button value="submit" onClick={()=>{setNewSendler(newSendler == null); 
                console.log("ctate do ",nameNew, lastNameNew, lastNameNew, middleNameNew, EmailNew, tabelNumberNew, phoneNumberNew, count);    
                setYetSendler(YetSendler())   
             }} > Сохранить еще одного пользователя</button>)
        )
    }
    
    function AddSendler(props){
       
             
         let   arr = [
            React.createElement("div", {className:"formFilds"} , <label htmlFor={"firstName"+props}>Имя</label>, <input  type="text" name={"firstName"+props} id={"firstName"+props} onChange={(e) => setNameNew(e.target.value)}/> ),
            React.createElement("div", {className:"formFilds"} , <label htmlFor={"lastName"+props}>Фамилия</label>,  <input  type="text" name={"lastName"+props} id={"lastName"+props} onChange={(e) => setLastNameNew(e.target.value)}/>  ),
            React.createElement("div", {className:"formFilds"} , <label htmlFor={"middleName"+props}>Отчество</label>, <input  type="text" name={"middleName"+props} id={"middleName"+props} onChange={(e) => setMiddleNameNew(e.target.value)}/>),
            React.createElement("div", {className:"formFilds"} , <label htmlFor={"tabelNumber"+props}>Табельный номер</label>, <input  type="number" name={"tabelNumber"+props} id={"tabelNumber"+props} onChange={(e) => setEmailNew(e.target.value)}/> ),
            React.createElement("div", {className:"formFilds"} , <label htmlFor={"emailInput"+props}>E-mail</label>, <input  type="email" name={"email"+props} id={"emailInput"+props} onChange={(e) => setTabelNumberNew(e.target.value)} /> ),
            React.createElement("div", {className:"formFilds"} , <label htmlFor={"phoneNumber"+props}> Номер телефона</label>, <input  type="tel" name={"phoneNumber"+props} id={"phoneNumber"+props} onChange={(e) => setPhoneNumberNew(e.target.value)}/> ),
            ]

    return(React.createElement("div", {className:`offers newSendler${props} exists`} , arr, <SaveBtn/>  ))
    }  

    function NewSendler(){
        
      //  console.log(arrNewAllElem) 
        arrNewAllElem = []
      //  console.log(allNewSendler)
        return (
            
            <div className={s.buttonConfirm}>
            <button  onClick={()=>{
                
                 if(!document.querySelector(`.exists`)){
                    setCount(count+1); setNewSendler(AddSendler(count));
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

            OffFunc(name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer, checked, );
            UploadFile('file');

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
                        <input type="checkbox" name="agreement" id="agree" className="input-data"
                               value={checked} onChange={(e) => setChecked(!checked)}/>
                        <label htmlFor="agree" className="label-checkbox">Разрешаю передачу персональных данных</label>
                        <div className="false-input false-agree"></div>
                    </div>


                    
                    <div className={s.buttonConfirm}>
                        <button id="form-button" className="form-btn-sendOffer" type="submit" value="submit">Подтвердить
                            запись
                        </button>
                    </div>

                </div>

            </form>
            {newSendler}
            
            <NewSendler/>
            
        </div>

    )
}


export default OffersForm;

