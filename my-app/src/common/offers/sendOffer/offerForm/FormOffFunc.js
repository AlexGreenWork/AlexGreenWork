import EventClose from '../message/eventClose'
import closeDiv from '../message/closediv'
import {API_URL} from "../../../../config";

function OffFunc(name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer, allYetSendler) {

    try {
        console.log("OffFunc " + name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer, "allNewSendler =" + allYetSendler);


        if (name, lastName, middleName, Email, tabelNumber, phoneNumber, nameOffer, problem, offer) {

            console.log(tabelNumber)
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `${API_URL}api/auth/forms`)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhr.send(`firstName=${name}&lastName=${lastName}&middleName=${middleName}&emailInput=${Email}&tabelNumber=${tabelNumber}` +
                `&phoneNumber=${phoneNumber}&nameOffer=${nameOffer}&problem=${problem}&offer=${offer}&yetSendler=${allYetSendler}`)
            xhr.onreadystatechange = function () {
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