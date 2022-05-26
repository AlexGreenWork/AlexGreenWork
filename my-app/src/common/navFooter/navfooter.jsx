import React from "react";
import s from "./navFooter.module.css"
import {NavLink} from "react-router-dom";
import {CountNoBrowsing, CountMessageNoBrowsing} from "../personalCabinet/personalCabinet"
import MessageStatus from "../personalCabinet/messages/messages_status";
import {useSelector} from "react-redux";
import {store} from "../../reducers";
import {useDispatch} from "react-redux";
import axios from 'axios';
import {API_URL} from "../../config";
import {NotifOffersProcessing, NotifConclusionProcessing} from "../../reducers/notificationReducer"

function CountNotificationALL() {
    const notifConc = useSelector(state => state.notification.offerForProcessing.notifConc[0])
    const countOffers = useSelector(state => state.notification.offerForProcessing.offersProcess)
    const dispatch = useDispatch()
    let tabNum = localStorage.getItem('userTabelNum');

    BrowseHistory();

    function BrowseHistory(tab) {
        let tabNum = localStorage.getItem('userTabelNum');
        try {
            axios.post(`${API_URL}api/offers/getHistoryBrowsing`, {
                tabNum: tabNum,

            })
                .then(res => {
                    let history = res.data;
                    if (history !== null) {
                        responsibleToOffersClose(Number(history[0]))
                        // dispatch(NotifOffersProcessing(Number(history[0]), oldConc));
                    } else {
                        // dispatch(NotifOffersProcessing(Number(history[0]), oldConc));
                        responsibleToOffersClose(Number(history[0]))
                    }
                })
        } catch (e) {
            alert(e.response)
        }
    }

    function responsibleToOffersClose(browsHist) {

        try {
            axios.post(`${API_URL}api/offers/responsibleToOffers`, {
                tabNum: tabNum,

            })
                .then(res => {
                    if (res.data != 'noResponsible') {
                        dispatch(NotifOffersProcessing(browsHist, [res.data[1], res.data[2]]));
                        // setResponsible(<OffersResponsible count= {countResp}/>)
                    } else {
                        dispatch(NotifOffersProcessing(browsHist, "noResponsible"));
                    }
                })
        } catch (e) {
            alert(e.response)
        }

    }

    if (countOffers + notifConc > 0) {
        return (
            <div className={s.countNoBrowser}>
                {countOffers + notifConc}
            </div>
        )
    } else {
        return <div></div>
    }

}

const Navfooter = () => {
    if (localStorage.getItem("userAdminOptions") === "wg" || localStorage.getItem("userAdminOptions") === "admin" || localStorage.getItem("userAdminOptions") === "topComission ") {
        return (
            <div className={s.navContainer}>
                <div className={s.buttons}>

                    <NavLink className="active" to="/" title="home">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20.000000pt" height="20.000000pt"
                             viewBox="0 0 32.000000 32.000000" preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)" fill="#ffffff"
                               stroke="none">
                                <path
                                    d="M85 229 c-64 -64 -68 -71 -52 -83 12 -9 17 -27 17 -60 l0 -46 45 0 45 0 0 50 c0 43 3 50 20 50 17 0 20 -7 20 -50 l0 -50 45 0 45 0 0 46 c0 33 5 51 18 60 15 12 11 19 -53 83 -38 39 -72 71 -75 71 -3 0 -37 -32 -75 -71z m123 -22 c38 -39 42 -47 42 -95 0 -49 -2 -52 -25 -52 -23 0 -25 3 -25 50 l0 50 -40 0 -40 0 0 -50 c0 -47 -2 -50 -25 -50 -23 0 -25 3 -25 52 0 48 4 56 42 95 23 24 45 43 48 43 3 0 25 -19 48 -43z"/>
                            </g>
                        </svg>
                        <span style={{filter: "drop-shadow(2px 4px 6px black)"}}>Главная</span>
                    </NavLink>
                    <NavLink to="/personalCabinet" title="personal Cabinet">
                        <span style={{filter: "drop-shadow(2px 4px 6px black)"}}>Личный кабинет</span>
                        <CountNotificationALL/>
                        {/* <CountNoBrowsing/> */}
                        {/*<MessageStatus>*/}
                        {/*	<CountMessageNoBrowsing/>*/}
                        {/*</MessageStatus>*/}
                    </NavLink>
                    <NavLink className="active" to="/personalCabinet/messages" title="home">
                        <svg style={{marginRight: "5px", filter: "drop-shadow(2px 4px 6px black)"}}
                             xmlns="http://www.w3.org/2000/svg" version="1.0" width="20.000000pt" height="20.000000pt"
                             viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#ffffff"
                               stroke="none">
                                <path
                                    d="M25 567 c-3 -7 -4 -91 -3 -187 l3 -175 49 -3 c51 -3 54 -10 31 -66 -7 -17 -5 -18 21 -12 32 8 94 52 94 67 0 5 18 9 39 9 39 0 40 -1 43 -37 l3 -38 72 -3 c60 -2 75 -6 83 -22 11 -20 59 -50 80 -50 7 0 9 12 4 34 -6 34 -6 35 33 38 l38 3 0 135 0 135 -37 3 -37 3 -3 87 -3 87 -253 3 c-200 2 -254 0 -257 -11z m495 -177 l0 -170 -149 0 -149 0 -35 -35 c-44 -44 -54 -44 -49 0 l4 35 -51 0 -51 0 0 170 0 170 240 0 240 0 0 -170z m80 -130 l0 -120 -40 0 c-38 0 -40 -2 -40 -30 0 -38 -16 -38 -38 0 -16 29 -19 30 -89 30 l-73 0 0 30 0 29 108 3 107 3 3 88 3 87 29 0 30 0 0 -120z"/>
                            </g>
                        </svg>
                        <span style={{filter: "drop-shadow(2px 4px 6px black)"}}>Cообщения</span>

                        <MessageStatus>
                            <CountMessageNoBrowsing/>
                        </MessageStatus>

                    </NavLink>
                    <NavLink to="/personalCabinet/findWorkers" title="Title 3">
                        <svg style={{marginRight: "5px", filter: "drop-shadow(2px 4px 6px black)"}}
                             viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em"
                             fill="currentColor" aria-hidden="true">
                            <path
                                d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                        </svg>
                        <span style={{filter: "drop-shadow(2px 4px 6px black)"}}>Поиск сотрудника</span>
                    </NavLink>

                </div>
            </div>
        );
    }
    if (localStorage.getItem("userAdminOptions") === "user") {
        return (
            <div className={s.navContainer}>
                <div className={s.buttons}>

                    <NavLink className="active" to="/" title="home">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20.000000pt" height="20.000000pt"
                             viewBox="0 0 32.000000 32.000000" preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)" fill="#ffffff"
                               stroke="none">
                                <path
                                    d="M85 229 c-64 -64 -68 -71 -52 -83 12 -9 17 -27 17 -60 l0 -46 45 0 45 0 0 50 c0 43 3 50 20 50 17 0 20 -7 20 -50 l0 -50 45 0 45 0 0 46 c0 33 5 51 18 60 15 12 11 19 -53 83 -38 39 -72 71 -75 71 -3 0 -37 -32 -75 -71z m123 -22 c38 -39 42 -47 42 -95 0 -49 -2 -52 -25 -52 -23 0 -25 3 -25 50 l0 50 -40 0 -40 0 0 -50 c0 -47 -2 -50 -25 -50 -23 0 -25 3 -25 52 0 48 4 56 42 95 23 24 45 43 48 43 3 0 25 -19 48 -43z"/>
                            </g>
                        </svg>
                        <span style={{filter: "drop-shadow(2px 4px 6px black)"}}>Главная</span>
                    </NavLink>
                    <NavLink to="/personalCabinet" title="personal Cabinet">
                        <span style={{filter: "drop-shadow(2px 4px 6px black)"}}>Личный кабинет</span>

                    </NavLink>
                    <NavLink className="active" to="/personalCabinet/messages" title="home">
                        <svg style={{marginRight: "5px", filter: "drop-shadow(2px 4px 6px black)"}}
                             xmlns="http://www.w3.org/2000/svg" version="1.0" width="20.000000pt" height="20.000000pt"
                             viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#ffffff"
                               stroke="none">
                                <path
                                    d="M25 567 c-3 -7 -4 -91 -3 -187 l3 -175 49 -3 c51 -3 54 -10 31 -66 -7 -17 -5 -18 21 -12 32 8 94 52 94 67 0 5 18 9 39 9 39 0 40 -1 43 -37 l3 -38 72 -3 c60 -2 75 -6 83 -22 11 -20 59 -50 80 -50 7 0 9 12 4 34 -6 34 -6 35 33 38 l38 3 0 135 0 135 -37 3 -37 3 -3 87 -3 87 -253 3 c-200 2 -254 0 -257 -11z m495 -177 l0 -170 -149 0 -149 0 -35 -35 c-44 -44 -54 -44 -49 0 l4 35 -51 0 -51 0 0 170 0 170 240 0 240 0 0 -170z m80 -130 l0 -120 -40 0 c-38 0 -40 -2 -40 -30 0 -38 -16 -38 -38 0 -16 29 -19 30 -89 30 l-73 0 0 30 0 29 108 3 107 3 3 88 3 87 29 0 30 0 0 -120z"/>
                            </g>
                        </svg>
                        <span style={{filter: "drop-shadow(2px 4px 6px black)"}}>Cообщения</span>

                        <MessageStatus>
                            <CountMessageNoBrowsing/>
                        </MessageStatus>

                    </NavLink>
                    <NavLink to="/personalCabinet/findWorkers" title="Title 3">
                        <svg style={{marginRight: "5px", filter: "drop-shadow(2px 4px 6px black)"}}
                             viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em"
                             fill="currentColor" aria-hidden="true">
                            <path
                                d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                        </svg>
                        <span style={{filter: "drop-shadow(2px 4px 6px black)"}}>Поиск сотрудника</span>
                    </NavLink>

                </div>
            </div>
        );
    } else {
        return (
            <div className={s.navContainer}>
                <div className={s.buttons}>

                    <NavLink className="active" to="/" title="home">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20.000000pt" height="20.000000pt"
                             viewBox="0 0 32.000000 32.000000" preserveAspectRatio="xMidYMid meet">

                            <g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)" fill="#ffffff"
                               stroke="none">
                                <path
                                    d="M85 229 c-64 -64 -68 -71 -52 -83 12 -9 17 -27 17 -60 l0 -46 45 0 45 0 0 50 c0 43 3 50 20 50 17 0 20 -7 20 -50 l0 -50 45 0 45 0 0 46 c0 33 5 51 18 60 15 12 11 19 -53 83 -38 39 -72 71 -75 71 -3 0 -37 -32 -75 -71z m123 -22 c38 -39 42 -47 42 -95 0 -49 -2 -52 -25 -52 -23 0 -25 3 -25 50 l0 50 -40 0 -40 0 0 -50 c0 -47 -2 -50 -25 -50 -23 0 -25 3 -25 52 0 48 4 56 42 95 23 24 45 43 48 43 3 0 25 -19 48 -43z"/>
                            </g>
                        </svg>
                        <span>Главная</span>
                    </NavLink>
                    <NavLink to="/personalCabinet" title="personal Cabinet">
                        Личный кабинет
                    </NavLink>
                    <NavLink to="/personalCabinet/findWorkers" title="Title 3">
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em"
                             fill="currentColor" aria-hidden="true">
                            <path
                                d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                        </svg>

                    </NavLink>

                </div>
            </div>
        );
    }


}
export default Navfooter;
