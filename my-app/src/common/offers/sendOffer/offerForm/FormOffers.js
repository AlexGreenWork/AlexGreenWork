import React, { useState } from 'react';
import OffFunc from './FormOffFunc.js';

import UploadFile from '../fileUpload/fileUpload'

function OffersForm() {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [Email, setEmail] = useState("");
    const [tabelNumber, setTabelNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nameOffer, setNameOffer] = useState("");
    const [problem, setProblem] = useState("");
    const [offer, setOffer] = useState("");
    const [checked, setChecked] = useState(false);
    const [uplFile, setUplFile] = useState(0);


    const handleSubmit = (event) => {
      
        event.preventDefault();
        let btnFormON =  document.querySelector('.close-btn');
       
        if(btnFormON == null){
           
            OffFunc(name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer, checked);
            
            UploadFile('file');
           
        }else{
           console.log(".close-btn true");
        }
      
      
    }
  
    return (
     <div>
      <form className="offers"  onSubmit={handleSubmit}>
      <div className="form-fields">
          <div className="form-field">
              <input type="text" placeholder="Иван" id="firstName" className="input-data" name="firstName" value={name}
              onChange={(e) => setName(e.target.value)} required autoComplete="off"/>
              <label htmlFor="firstName">Имя</label>
              <div className="false-input false-name"></div>
          </div>
  
          <div className="form-field">
              <input type="text" placeholder="Иванов" id="lastName" className="input-data" name="lastName" required autoComplete="off"
              value={lastName} onChange={(e) => setLastName(e.target.value)}/>
              <label htmlFor="lastName">Фамилия</label>
              <div className="false-input false-lastName"></div>
          </div>
          <div className="form-field">
              <input type="text" placeholder="Иванович" id="middleName" className="input-data" name="middleName" required autoComplete="off"
              value={middleName} onChange={(e) => setMiddleName(e.target.value)}/>
              <label htmlFor="middleName">Отчество</label>
              <div className="false-input false-middleName"></div>
          </div>
  
          <div className="form-field">
              <input type="number" placeholder="табельный номер" className="input-data" id="tabelNumber" name="tabelNumber"  required autoComplete="on"
              value={tabelNumber} onChange={(e) => setTabelNumber(e.target.value)}/>
              <label htmlFor="tabelNumber">Табельный номер</label>
              <div className="false-input false-tabelNumber"></div>
          </div>
  
          <div className="form-field">
              <input type="email" placeholder="e-mail-adress@gmail.com" className="input-data" id="emailInput" name="email" required autoComplete="off"
              value={Email} onChange={(e) => setEmail(e.target.value)}/> 
              <label htmlFor="emailInput">E-mail</label>
              <div className="false-input false-emailInput"></div>
          </div>
          <div className="form-field">
              <input type="tel" maxLength="13" minLength="13" pattern="\+\d\d\d\d\d\d\d\d\d\d\d\d" id="phoneNumber" placeholder="+375293333333" className="input-data" name="phoneNumber" required autoComplete="off"
              value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              <label htmlFor="phoneNumber">Номер телефона</label>
              <div className="false-input false-phoneNumber"></div>
          </div>
  
          <div className="form-field">
              <input type="text" placeholder="Название" id="nameOffer" className="input-data" name="nameOffer" required autoComplete="on"
              value={nameOffer} onChange={(e) => setNameOffer(e.target.value)}/>
              <label htmlFor="nameOffer">Название предложения</label>
              <div className="false-input false-nameOffer"></div>
          </div>
          <div className="form-field">
              <textarea id="problem" className="input-data" name="problem" required autoComplete="off" cols="50"
              value={problem} onChange={(e) => setProblem(e.target.value)}></textarea>
              <footer>
                  <label htmlFor="problem">Описание проблемы</label>
              </footer>
              <div className="false-input false-problem"></div>
          </div>
          <div className="form-field">
              <textarea id="offer" className="input-data" name="offer" required autoComplete="off" cols="50" 
              value={offer} onChange={(e) => setOffer(e.target.value)}></textarea>
  
              <footer>
                  <label htmlFor="problem">Предложение</label>
              </footer>
              <div className="false-input false-offer"></div>
          </div>
          <div className="form-field checkbox">
              <input type="checkbox" name="agreement"  id="agree" className="input-data" 
              value={checked} onChange={(e) => setChecked(!checked)}/>
              <label htmlFor="agree" className="label-checkbox">Все введено верно</label>
              <div className="false-input false-agree"></div>
          </div>
  
          <div className="button-confirm">
              <button id="form-button" className="form-btn-sendOffer" type="submit" value="submit" >Подтвердить запись </button>
          </div>
          <div className="button-confirm">
              <button id="form-button-more" className="form-btn-sendOffer" type="submit" value="submit" >Добавить ещё одного автора предложения </button>
          </div>
          <input type="file" name="myFile" id="file"  ></input> 
      </div>
     
  </form>



  </div>
      
    )
  }

 
 // export default OffersForm;

