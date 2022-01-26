import React from "react";
import s from "./workerVariable.module.css"
import {NavLink} from "react-router-dom";

const WorkerVariable = () => {
    return (


        <div className={s.container}>
            <div className={s.span}>Являетесь ли вы сотрудником завода?</div>
            <div className={s.yesNo}>
                <div className={s.yes}>
                    <NavLink to="/sendOfferWorker">Да, сотрудник </NavLink>
                </div>
                <div className={s.no}>
                    <NavLink to="/sendOfferWorker">Нет, не сотрудник</NavLink>
                    {/*<NavLink to="/sendOfferFree">Нет, не сотрудник</NavLink>*/}
                </div>
            </div>
        </div>


    )
}
export default WorkerVariable;

