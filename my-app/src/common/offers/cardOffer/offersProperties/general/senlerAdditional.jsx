import React from "react";
import { store } from "../../../../../reducers";


function AddSendlerOffers(){

   let obj = {};
   let elemArr = [];
   Object.assign(obj, store.getState().offers)
   
   if(obj?.addSendler.length !== 0 && obj?.addSendler !== "[null]" ){
   
    let objYetSendlers = JSON.parse(obj.addSendler)
    let key =  Object.keys(objYetSendlers)
  
        for(let i = 0; i<key.length; i++ ){

        let name = objYetSendlers[key[i]].name
        let surname = objYetSendlers[key[i]].surname
        let middlename = objYetSendlers[key[i]].middlename
        elemArr[i] = React.createElement("div", {className:"formFilds",  key:`qw${key[i].toString()}` , value:i }, <label id={`sendler${[i]}`} key={key[i]}> {i+1}: {surname} {name} {middlename}</label> ) ;
      /*   key={number.toString()}
                  value={number} */
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
