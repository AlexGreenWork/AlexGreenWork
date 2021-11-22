import React, { useState } from 'react';

function OffersFormFree() {

    const [name, setName] = useState("");
    const [lastNameFree, setLastName] = useState("");
    const [middleNameFree, setMiddleName] = useState("");
    const [Email, setEmail] = useState("");
   // const [tabelNumber, setTabelNumber] = useState("");
    const [phoneNumberFree, setPhoneNumber] = useState("");
    const [nameOfferFree, setNameOffer] = useState("");
    const [problemfree, setProblem] = useState("");
    const [offerfree, setOffer] = useState("");
    const [checked, setChecked] = useState(false);

    function EventClose() {

        document.querySelector(".close-btn").addEventListener('click', function() {
            let removeDiv = document.querySelector('#tab-true');

            if (removeDiv) {

                document.querySelector('#firstName').value = null;
                document.querySelector('#middleName').value= null;
                document.querySelector('#lastName').value = null;
                document.querySelector('#tabelNumber').value = null;
                document.querySelector('#emailInput').value = null;
                document.querySelector('#phoneNumber').value = null;
                document.querySelector('#nameOffer').value = null;
                document.querySelector('#problem').value = null;
                document.querySelector('#offer').value = null;
                document.querySelector('#agree').checked = false;

                document.querySelector('#firstNameFree').value = null;
                document.querySelector('#middleNameFree').value= null;
                document.querySelector('#lastNameFree').value = null;
                //document.querySelector('#tabelNumber').value = null;
                document.querySelector('#emailInputFree').value = null;
                document.querySelector('#phoneNumberFree').value = null;
                document.querySelector('#nameOfferFree').value = null;
                document.querySelector('#problemfree').value = null;
                document.querySelector('#offerfree').value = null;
                document.querySelector('#agreeFree').checked = false;



                removeDiv.remove();
                //window.location.href = "http://localhost:3000/index";

            } else {
                console.log('removeDiv не существует');
            }
        });


    }

    function closeDiv() {

        let closeButton = document.createElement('div');
        closeButton.className = "close-btn";
        closeButton.innerHTML = "&#10060";
        let msg = document.querySelector('.tab-true');

        msg.append(closeButton);
        <div className="button-confirm"></div>

    }

    function OffFunc(name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer) {




            if (name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer){


                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://localhost:5000/forms')
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                xhr.send(`firstName=${name}&lastName=${lastName}&middleName=${middleName}&emailInput=${Email}&tabelNumber=${tabelNumber}`+
                    `&phoneNumber=${phoneNumber}&nameOffer=${nameOffer}&problem=${problem}&offer=${offer}`)
                xhr.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let params = this.responseText;
                        Result(params);

                        function Result(result) {

                            console.log("result = " + result);
                            let msgNewTab = document.createElement('div');
                            msgNewTab.id = "tab-true";
                            msgNewTab.className = "tab-true";
                            msgNewTab.innerHTML = `<label id="tabtru" for="tabNum">${result}</label>`;
                            document.body.append(msgNewTab);

                            closeDiv();
                            EventClose();

                        }
                    }
                }
            }

    }
   
  
    const handleSubmit = (event) => {
      
        event.preventDefault();
        let btnFormON =  document.querySelector('.close-btn');
       
        if(btnFormON == null){
           let  tabelNumber =0
            OffFunc(name, lastNameFree, middleNameFree, Email, tabelNumber, phoneNumberFree, nameOfferFree, problemfree, offerfree, checked);
           
        }else{
           console.log(".close-btn true");
        }
      
      
    }
  
    return (
     
      <form className="offers"  onSubmit={handleSubmit}>
      <div className="form-fields">
          <div className="form-field">
              <input type="text" placeholder="Иван1" id="firstNameFree" className="input-data" name="firstNameFree" value={name}
              onChange={(e) => setName(e.target.value)} required autoComplete="off"/>
              <label htmlFor="firstNameFree">Имя</label>
              <div className="false-input false-name"></div>
          </div>
  
          <div className="form-field">
              <input type="text" placeholder="Иванов2" id="lastNameFree" className="input-data" name="lastNameFree" required autoComplete="off"
              value={lastNameFree} onChange={(e) => setLastName(e.target.value)}/>
              <label htmlFor="lastNameFree">Фамилия</label>
              <div className="false-input false-lastNameFree"></div>
          </div>
          <div className="form-field">
              <input type="text" placeholder="Иванович" id="middleNameFree" className="input-data" name="middleNameFree" required autoComplete="off"
              value={middleNameFree} onChange={(e) => setMiddleName(e.target.value)}/>
              <label htmlFor="middleNameFree">Отчество</label>
              <div className="false-input false-middleNameFree"></div>
          </div>
  
          
          <div className="form-field">
              <input type="emailfree" placeholder="e-mail-adress@gmail.com" className="input-data" id="emailInputFree" name="emailfree" required autoComplete="off"
              value={Email} onChange={(e) => setEmail(e.target.value)}/> 
              <label htmlFor="emailInputFree">E-mail</label>
              <div className="false-input false-emailInputFree"></div>
          </div>
          <div className="form-field">
              <input type="tel" maxLength="13" minLength="13" pattern="\+\d\d\d\d\d\d\d\d\d\d\d\d" id="phoneNumberFree" placeholder="+375293333333" className="input-data" name="phoneNumberFree" required autoComplete="off"
              value={phoneNumberFree} onChange={(e) => setPhoneNumber(e.target.value)} />
              <label htmlFor="phoneNumberFree">Номер телефона</label>
              <div className="false-input false-phoneNumberFree"></div>
          </div>
  
          <div className="form-field">
              <input type="text" placeholder="Название" id="nameOfferFree" className="input-data" name="nameOfferFree" required autoComplete="on"
              value={nameOfferFree} onChange={(e) => setNameOffer(e.target.value)}/>
              <label htmlFor="nameOfferFree">Название предложения</label>
              <div className="false-input false-nameOfferFree"></div>
          </div>
          <div className="form-field">
              <textarea id="problemfree" className="input-data" name="problemfree" required autoComplete="off" cols="50"
              value={problemfree} onChange={(e) => setProblem(e.target.value)}></textarea>
              <footer>
                  <label htmlFor="problemfree">Описание проблемы</label>
              </footer>
              <div className="false-input false-problemfree"></div>
          </div>
          <div className="form-field">
              <textarea id="offerfree" className="input-data" name="offerfree" required autoComplete="off" cols="50" 
              value={offerfree} onChange={(e) => setOffer(e.target.value)}></textarea>
  
              <footer>
                  <label htmlFor="problemfree">Предложение</label>
              </footer>
              <div className="false-input false-offerfree"></div>
          </div>
          <div className="form-field checkbox">
              <input type="checkbox" name="agreement"  id="agreeFree" className="input-data" 
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
      </div>
  </form>
      
    )
  }

function CheckedCheckBox(){

    let inputFreeTrue = document.querySelector('#agreeFree');
    if(inputFreeTrue.checked == true){
        return "submit"
    } else{ 
        return '';
    }

}

  export default OffersFormFree;

