import { object } from "prop-types";
import React from "react";
import { useState } from "react";
import "./clock.css"

function Clock() {

    return (
        <div className="date-time">
            <div className="time" >
                <div className="hours"></div>&nbsp;:&nbsp;<div className="minuts"></div>&nbsp;:&nbsp;<div className="seconds"></div>
            </div>
            <div className="date">
                <div className="day"></div> &nbsp; <div className="month"></div>&nbsp; <div className="year"></div>
            </div>
        </div>
    )


}

function tick() {


    setInterval(() => {
        let timeDate = new Date()
        let monthA = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
        
        document.querySelector('.hours').innerHTML = timeDate.getHours()
        if(timeDate.getMinutes() < 10){
            document.querySelector('.minuts').innerHTML = "0" + timeDate.getMinutes()
        } else{
            document.querySelector('.minuts').innerHTML = timeDate.getMinutes()
        }

        if(timeDate.getSeconds() < 10){
            document.querySelector('.seconds').innerHTML = "0" + timeDate.getSeconds()
        } else{
            document.querySelector('.seconds').innerHTML = timeDate.getSeconds()
        }
        
        document.querySelector('.year').innerHTML = timeDate.getFullYear()
        document.querySelector('.day').innerHTML = timeDate.getDate()
        document.querySelector('.month').innerHTML = monthA[timeDate.getMonth()]
    }, 1000)
}

tick()


export default Clock;
