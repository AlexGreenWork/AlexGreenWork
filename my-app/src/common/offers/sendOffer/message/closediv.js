import React from "react";
import {NavLink} from "react-router-dom";

function closeDiv() {
   
    let closeButton = document.createElement('div');
    closeButton.className = "close-btn";
    closeButton.innerHTML = "&#10060";
    let msg = document.querySelector('.tab-true');
   
    msg.append(closeButton);
   
    
   // <div className="button-confirm"></div>


}

export default closeDiv;