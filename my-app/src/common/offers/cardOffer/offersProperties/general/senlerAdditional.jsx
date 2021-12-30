import React, {useState} from "react";
import {API_URL} from "../../../../../config";
import {store} from "../../../../../reducers";


function AddSendlerOffers(){

   let obj = {};
   let elemArr = [];
   Object.assign(obj, store.getState().offers)
   
   if(obj?.addSendler.length !== 0 && obj?.addSendler !== "[null]" ){

    let objYetSendlers = JSON.parse(obj.addSendler)
   
    let key =  Object.keys(objYetSendlers)
    console.log(objYetSendlers)
        for(let i = 0; i<key.length; i++ ){

        let name = objYetSendlers[key[i]].nameSendler
        let surname = objYetSendlers[key[i]].surnameSendler
        let middlename = objYetSendlers[key[i]].middlenameSendler
       
        elemArr[i] = React.createElement("div", {className:"formFilds",  key:`qw${key[i].toString()}` , value:i }, <label id={`sendler${[i]}`} key={key[i]}> {i+1}: {surname} {name} {middlename}</label> ) ;
      
        }

   } else {

    elemArr = []

    }

  if(elemArr.length !== 0){
    return (
        React.createElement("div", {className:"formFildsAll"} , <div>Соавторы:</div> ,elemArr )
    )
  } else{

  }
return (
    React.createElement("div", {className:"formFilds"} )
)
}

export default AddSendlerOffers;
