import React, {useEffect, useState} from "react";
import s from "./cityGuide.module.css";
import ContentContainer from "../contentHome/contentContainer";
import {NavLink} from "react-router-dom";


const CityGuide = () => {
    return (
        <div style={{width: "100%"}}>
            <ContentContainer/>
            <div
                style={{

                    backgroundColor: "white",
                    // backgroundColor: "#ffffffd1",
                    position: "absolute",
                    top: "100px",
                    left: "16vw",
                    transform: "translate(-0.4vw)",
                    width: "68vw",
                    height: "calc(100% - 170px)",
                    overflowY: "scroll"
                }}
            >
                <ul id={s.categories} className={s.clr}>
                    <NavLink to="/educationPortal" title="кадры">
                    <li>
                        <div>
                            <img
                                src="https://gbcdn.mrgcdn.ru/uploads/post/848/og_cover_image/71fd12b2bde0d1dce028f60b24fabd15"
                                alt=""/>
                            <h1>Портал тестирования</h1>
                            <p>Портал обучения для диллеров </p>
                        </div>
                    </li>
                    </NavLink>

                    <li>
                        <div>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrpk5xkQbFtaTlSHLk2Lj0edN-KYCEvBNocw&usqp=CAU"
                                alt=""/>
                            <h1>Роководство по эскплуатации</h1>
                            <p>Тут можно скачать руководство по эсплуатации и ремонту </p>
                        </div>
                    </li>
                    <NavLink
                        to="/kadry" title="кадры">
                        <li>

                            <div>

                                <img
                                    src="data:image/jpeg;base64,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"
                                    alt=""/>
                                <h1>Портал отдела кадров</h1>
                                <p>Спец допуск</p>

                            </div>

                        </li>
                    </NavLink>
                    <li>
                        <div>
                            <img src="https://krutilvertel.com/image/cache/data/cover/traktor/belaz-7555b-280x374.webp"
                                 alt=""/>
                            <h1>This is a title</h1>
                            <p>Some sample text about the article this hexagon leads to</p>
                        </div>
                    </li>

                    <li>
                        <div>
                            <img
                                src="https://specmahina.ru/wp-content/uploads/2018/08/transportnoe-sredstvo-prednaznachennoe-dlya-vypolneniya-rabot-v-karere.jpg"
                                alt=""/>
                            <h1>This is a title</h1>
                            <p>Some sample text about the article this hexagon leads to</p>
                        </div>
                    </li>

                    <li>
                        <div>
                            <img
                                src="http://tourdlyavas.by/UserFiles/%D0%91%D0%B5%D0%BB%D0%90%D0%B7%D0%B7%D0%B0%D0%B2%D0%BE%D0%B4.jpg"
                                alt=""/>
                            <h1>This is a title</h1>
                            <p>Some sample text about the article this hexagon leads to</p>
                        </div>
                    </li>

                    <li>
                        <div>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMu5XVoP0oKaHXUNetWK6KYZyl6ruIBiOeSA&usqp=CAU"
                                alt=""/>
                            <h1>This is a title</h1>
                            <p>Some sample text about the article this hexagon leads to</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img
                                src="data:image/jpeg;base64,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"
                                alt=""/>
                            <h1>This is a title</h1>
                            <p>Some sample text about the article this hexagon leads to</p>
                        </div>
                    </li>

                    <li className={s.pusher}></li>

                </ul>

            </div>
        </div>
    )
}
export default CityGuide;
