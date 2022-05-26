import React from "react";
import s from "./kadry.module.css"
import {NavLink} from "react-router-dom";
import ContentContainer from "../contentHome/contentContainer";
import ChartPersonal from "../topComissionPanel/chartStates/chartPersonal/chartPersonal";


const Kadry = () => {
    return (
        <div style={{
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center"
        }}>

            <ContentContainer/>

            <div style={{
                position: "absolute",
                display: "flex",
                justifycontent: "center",
                width: "65vw",
                top: 0,
                justifyContent: "center",
                height: "100%"
            }} className={s.content}>

                <div className={s.allTable} style={{width: "95%"}}>
                    <h2>Портал кадров</h2>
                    <ChartPersonal/>
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        <NavLink className={s.navKadry} to="/kadry/applicants" title="personal Cabinet">
                            <div>Анкеты сотрудников</div>
                        </NavLink>
                        <NavLink className={s.navKadry} to="/kadry_/applicants" title="personal Cabinet">
                            <div>Анкеты соискателей</div>
                        </NavLink>
                        <NavLink className={s.navKadry} to="/kadry" title="personal Cabinet">
                            <div>Заявки на вакансию</div>
                        </NavLink>
                        <NavLink className={s.navKadry} to="/kadry" title="personal Cabinet">
                            <div>Банк резерва</div>
                        </NavLink>
                        <NavLink className={s.navKadry} to="/kadry" title="personal Cabinet">
                            <div>Тест</div>
                        </NavLink>


                    </div>

                </div>
            </div>
        </div>
    );


}
export default Kadry;
