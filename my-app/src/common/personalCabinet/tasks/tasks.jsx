import React from "react";
import s from "./tasks.module.css"

import 'antd/dist/antd.css';

import { Calendar, Badge } from 'antd';

const Tasks = () => {
    function getListData(value) {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'warning', content: 'Собрание .' },
                    { type: 'success', content: 'Комиссия' },
                ];
                break;
            case 10:
                listData = [
                    { type: 'warning', content: 'Сделать заключение по предложению.' },
                    { type: 'success', content: 'Отчет по респондетам.' },
                    { type: 'error', content: 'Вынести решение.' },
                ];
                break;
            case 15:
                listData = [
                    { type: 'warning', content: 'Важное Событие' },
                    { type: 'success', content: 'Отправить отчет' },
                    { type: 'error', content: 'Ввод в эксплуатацию.' },
                    { type: 'error', content: 'Внедрение предложения.' },
                    { type: 'error', content: 'Повторная комиссия.' },
                    { type: 'error', content: 'Вынесение результатов.' },
                ];
                break;
            default:
        }
        return listData || [];
    }

    function dateCellRender(value) {
		console.log(value.format("DD-MM-YYYY"))
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }

    function getMonthData(value) {
        if (value.month() === 8) {
            return 1394;
        }
    }

    function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }
    return (
        <div className={s.sendOfferContainer}>

            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </div>
    )
}
export default Tasks;
