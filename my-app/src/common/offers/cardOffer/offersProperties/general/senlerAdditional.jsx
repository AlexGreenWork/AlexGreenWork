import React, {useState} from "react";
import {API_URL} from "../../../../../config";

function RequestAddSendlerOffers() {
    let idOffers = localStorage.getItem('idOffers');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}api/offers/sendAdd`, false); /// СИНХРОННЫЙ ЗАПРОС!!!
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`selectOffers=${idOffers}`);
   
    return xhr.response
}


function AddSendlerOffers(){
    let elemArr = [];
    if(RequestAddSendlerOffers() != 'null'){
        let addSendlers = JSON.parse(RequestAddSendlerOffers());  //Данные из запроса
    //RequestAddSendlerOffers()
    let key =  Object.keys(addSendlers)
   
    

    
    for(let i = 0; i<key.length; i++ ){
     
       let name = addSendlers[key[i]].name
       let surname = addSendlers[key[i]].surname
       let middlename = addSendlers[key[i]].middlename
       elemArr[i] = React.createElement("div", {className:"formFilds"} , <label id={`sendler${[i]}`} >{surname} {name} {middlename}</label> ) ;

    }
    } else {
        elemArr = []
    }
    
return (
    React.createElement("div", {className:"formFilds"} , elemArr ) 
)
}

export default AddSendlerOffers;
