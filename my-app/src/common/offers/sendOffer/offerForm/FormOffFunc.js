import EventClose from '../message/eventClose'
import closeDiv from '../message/closediv'
import {API_URL} from "../../../../config";
import axios from 'axios';


function OffFunc(name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer, allYetSendler, password) {
    try {
        console.log(name, lastName, middleName)
        axios.post(`${API_URL}api/auth/checkFio`, {
            surname : lastName,
            name : name,
            middleName : middleName,
            tabNum : tabelNumber
        })
            .then(res => {
                let fio = res.data;
                console.log(typeof fio)
                if(fio === true){
                    OffFuncSave(name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer, allYetSendler, password)
                } else {
                    document.querySelector('.false-name').innerText = "Проверьте данное поле"
                    document.querySelector('.false-lastName').innerText = "Проверьте данное поле"
                    document.querySelector('.false-middleName').innerText = "Проверьте данное поле"
                }
                
            })
    } catch (e) {
        alert(e.response)
    }
}


function OffFuncSave(name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer, allYetSendler, password) {
    
    try {
        console.log("OffFuncSave " + name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer, password, "allNewSendler =" + allYetSendler);


        if (name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer) {

            console.log(tabelNumber)
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `${API_URL}api/auth/forms`)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhr.send(`firstName=${name}&lastName=${lastName}&middleName=${middleName}&emailInput=${Email}&tabelNumber=${tabelNumber}` +
                `&phoneNumber=${phoneNumber}&nameOffer=${nameOffer}&problem=${problem}&offer=${offer}&password=${password}&yetSendler=${allYetSendler}`)
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let params = this.responseText;
                    Result(params);

                    function Result(result) {

                        console.log("result = " + result);
                        if(localStorage.getItem('userEmail') !== null){

                            if(result.includes("Предложение зарегистрировано") === true){

                                let phone = document.querySelector("#phoneNumber").value
                                let email = document.querySelector("#emailInput").value
                                localStorage.setItem("userPhoneNumber", phone);
                                localStorage.setItem("userEmail", email)
                            }
                        }
                        let msgNewTab = document.createElement('div');
                        msgNewTab.id = "tab-true";
                        msgNewTab.className = "tab-true";
                        msgNewTab.innerHTML = `<label id="tabtru" for="tabNum">${result}</label>`;
                        document.body.append(msgNewTab);
                        let shadowBox = document.createElement('div');
                        
                        shadowBox.className = "shadowBox";
                        document.body.append(shadowBox);
                        // checkRecData(result);
                        closeDiv();
                        EventClose();

                    }
                }
            }
        }
    }catch(e){
        console.log(e)
    }
}




  export default OffFunc;