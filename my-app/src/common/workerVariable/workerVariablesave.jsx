import React from "react";
import s from "./workerVariable.module.css"
import {NavLink} from "react-router-dom";
const WorkerVariable = () => {
    return (
        <div className={s.container}>
            <div>Являетесь ли вы сотрудником завода?</div>
            <div>
                <NavLink to="/sendOfferWorker">Да, сотрудник </NavLink>
            </div>
            <div>
                <NavLink to="/sendOfferFree">Нет, не сотрудник</NavLink>
            </div>
        </div>

    )
}
export default WorkerVariable;

