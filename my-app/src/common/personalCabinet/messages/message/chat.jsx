import React from "react";
import {NavLink} from "react-router-dom";
import s from "./messages.module.css"



const UserMessage = (props) => {

    return (
        <div className={s.header}>
            <div className={Header}>
                <button>V</button>
                <div>{props.name}</div></div>
            <div className={s.ava}>
                <img
                    src={props.src}
                    alt=""/>
            </div>
            <div className={s.messagePreview}>
                <div className={s.from}>{props.name}</div>
                <div className={s.message}>{props.message}</div>
            </div>
        </div>
    )

}

const Chat = () => {
    let messageData = [
        {name: 'Василий Виссарионович Столыпин',src:'https://i.pinimg.com/736x/20/51/ff/2051fff4c0c5cd31ac0f1393ea87f637--boys-style-man-style.jpg', message:'Приказ сверху работать сверх нормы!' },
        {name: 'Анна Витольдовна Власова',src: 'https://drasler.ru/wp-content/uploads/2019/05/%D0%9A%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-%D0%BD%D0%B0-%D0%B0%D0%B2%D1%83-%D0%B2-%D1%81%D1%82%D0%B8%D0%BC-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D1%8B%D0%B5-%D0%B4%D0%B5%D0%B2%D1%83%D1%88%D0%BA%D0%B8-%D0%BF%D0%BE%D0%B4%D0%B1%D0%BE%D1%80%D0%BA%D0%B0-5.jpg', message:"Перешли мне паспорта." },
        {name: 'Леонид Викторович Леонов',src: 'https://i12.fotocdn.net/s123/d85cb51dd117b1bd/user_l/2803251259.jpg', message:'Нужно отформатировать таблицу?' }

    ]
    return (
        <div className={s.messageContainer}>


            <UserMessage name={messageData[0].name} src={messageData[0].src} message = {messageData[0].message}/>


        </div>
    )
}
export default Chat;