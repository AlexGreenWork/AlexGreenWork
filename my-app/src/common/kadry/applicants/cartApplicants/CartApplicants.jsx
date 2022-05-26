import React, {Component, useState} from "react";
import s from "./cartApplicants.module.css"
import {NavLink} from "react-router-dom";
// import CartApplicant from "./CartApplicant";
import st from "./cartApplicant.module.css"
import {API_URL} from "../../../../config";

// import {Document, Page, pdfjs} from 'react-pdf/dist/umd/entry.webpack';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";


// pdfjs.GlobalWorkerOptions.workerSrc = '../../../../minjs/pdf.worker.min';


export function Test(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);


    console.log(props)

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }

    return (
        <div style={{width: "100%", height: "100%"}}>
            <object
                data={'http://isi.belaz.minsk.by:5000/kadry/' + `${props.tel}` + '.pdf#toolbar=0&amp;navpanes=0&amp;scrollbar=0&amp;page=1&amp;view=FitH'}
                type="application/pdf"
                width="100%"
                height="2000px">

            </object>


            {/*<Document options={{cMapUrl: 'cmaps/', cMapPacked: true,}}*/}
            {/*          file={filePathPdf}*/}
            {/*          onLoadSuccess={onDocumentLoadSuccess}*/}
            {/*          onLoadError={() => {*/}
            {/*              console.log("CALLED");*/}
            {/*          }}*/}
            {/*          onLoadProgress={() => {*/}
            {/*              console.log("PROGRESS");*/}
            {/*          }}*/}
            {/*>*/}
            {/*    <Page pageNumber={pageNumber}/>*/}
            {/*</Document>*/}
            {/*<p>*/}
            {/*    Page {pageNumber} of {numPages}*/}
            {/*</p>*/}
        </div>
    );

}


const CartApplicants = (props) => {
    const [isOpen, setIsOpen] = React.useState(false)
    // console.log(pdfjs.version)
    const CartApplicant = (props) => {
        const worker = props.req.workInBelaz

        console.log(worker)
        const photo = props.req.photo
        console.log(props.req.recommender)
        return (
            <div className={st.cartContainer} style={{
                position: "fixed",
                right: "0",
                bottom: "0",
                zIndex: "999",
                width: "100%",
                height: "100%",
                backgroundColor: "rgb(0 0 0 / 80%)",
                display: "flex"
            }}>

                <div onClick={openCartState} className={st.closeButton}>X</div>
                <div className={st.containerProfileBox}>

                    <div className={st.row}>

                        <div className={st.leftCol}>

                            <div style={{
                                height: "100%",
                                backgroundColor: "#c7c2c2",
                                padding: "10px",
                                maxWidth: "15vw",
                                minWidth: "15vw"
                            }}>
                                <div className={st.profileInfo}
                                     style={{color: "#c7c2c2", boxShadow: "5px 5px 5px grey"}}>

                                    {photo ? <img src={props.req.photo} style={{width: "100%"}} alt=""/> :
                                        <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16 2C13.2311 2 10.5243 2.82109 8.22202 4.35943C5.91973 5.89777 4.12532 8.08427 3.06569 10.6424C2.00607 13.2006 1.72882 16.0155 2.26901 18.7313C2.80921 21.447 4.14258 23.9416 6.10051 25.8995C8.05845 27.8574 10.553 29.1908 13.2687 29.731C15.9845 30.2712 18.7994 29.9939 21.3576 28.9343C23.9157 27.8747 26.1022 26.0803 27.6406 23.778C29.1789 21.4757 30 18.7689 30 16C30 12.287 28.525 8.72601 25.8995 6.1005C23.274 3.475 19.713 2 16 2ZM16 7C16.89 7 17.7601 7.26392 18.5001 7.75839C19.2401 8.25285 19.8169 8.95566 20.1575 9.77792C20.4981 10.6002 20.5872 11.505 20.4135 12.3779C20.2399 13.2508 19.8113 14.0526 19.182 14.682C18.5527 15.3113 17.7508 15.7399 16.8779 15.9135C16.005 16.0872 15.1002 15.9981 14.2779 15.6575C13.4557 15.3169 12.7529 14.7401 12.2584 14.0001C11.7639 13.26 11.5 12.39 11.5 11.5C11.4987 10.9087 11.6142 10.3229 11.8399 9.77637C12.0655 9.22981 12.397 8.73321 12.8151 8.31508C13.2332 7.89695 13.7298 7.56554 14.2764 7.33986C14.8229 7.11418 15.4087 6.99868 16 7ZM24 24.92C21.807 26.9023 18.9562 27.9999 16 27.9999C13.0439 27.9999 10.193 26.9023 8.00001 24.92V24.34C7.96214 22.9708 8.46602 21.6419 9.40221 20.6421C10.3384 19.6423 11.6313 19.0522 13 19H19C20.3625 19.0547 21.6493 19.6414 22.5841 20.6342C23.5189 21.6269 24.0273 22.9466 24 24.31V24.92Z"
                                                fill="#566885"/>
                                        </svg>}

                                    {/*<img src={props.req.photo} style={{width: "100%"}} alt=""/>*/}
                                    {/*<svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*    <path*/}
                                    {/*        d="M16 2C13.2311 2 10.5243 2.82109 8.22202 4.35943C5.91973 5.89777 4.12532 8.08427 3.06569 10.6424C2.00607 13.2006 1.72882 16.0155 2.26901 18.7313C2.80921 21.447 4.14258 23.9416 6.10051 25.8995C8.05845 27.8574 10.553 29.1908 13.2687 29.731C15.9845 30.2712 18.7994 29.9939 21.3576 28.9343C23.9157 27.8747 26.1022 26.0803 27.6406 23.778C29.1789 21.4757 30 18.7689 30 16C30 12.287 28.525 8.72601 25.8995 6.1005C23.274 3.475 19.713 2 16 2ZM16 7C16.89 7 17.7601 7.26392 18.5001 7.75839C19.2401 8.25285 19.8169 8.95566 20.1575 9.77792C20.4981 10.6002 20.5872 11.505 20.4135 12.3779C20.2399 13.2508 19.8113 14.0526 19.182 14.682C18.5527 15.3113 17.7508 15.7399 16.8779 15.9135C16.005 16.0872 15.1002 15.9981 14.2779 15.6575C13.4557 15.3169 12.7529 14.7401 12.2584 14.0001C11.7639 13.26 11.5 12.39 11.5 11.5C11.4987 10.9087 11.6142 10.3229 11.8399 9.77637C12.0655 9.22981 12.397 8.73321 12.8151 8.31508C13.2332 7.89695 13.7298 7.56554 14.2764 7.33986C14.8229 7.11418 15.4087 6.99868 16 7ZM24 24.92C21.807 26.9023 18.9562 27.9999 16 27.9999C13.0439 27.9999 10.193 26.9023 8.00001 24.92V24.34C7.96214 22.9708 8.46602 21.6419 9.40221 20.6421C10.3384 19.6423 11.6313 19.0522 13 19H19C20.3625 19.0547 21.6493 19.6414 22.5841 20.6342C23.5189 21.6269 24.0273 22.9466 24 24.31V24.92Z"*/}
                                    {/*        fill="#566885"/>*/}
                                    {/*</svg>*/}
                                    <h3>{props.req.fio}</h3>
                                    <span>{props.req.sp}</span>

                                </div>
                                <h3 style={{fontWeight: "bold"}}>Контакты</h3>
                                <div>
                                    <div>
                                        <i></i>
                                    </div>
                                    <div>

                                        <div style={{fontWeight: "bold"}}>
                                            Телефон: <i></i>
                                        </div>
                                        +{props.req.tel}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <i></i>
                                    </div>
                                    <div>

                                        <div style={{fontWeight: "bold"}}>
                                            E-mail: <i></i>
                                        </div>
                                        {props.req.email}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <i></i>
                                    </div>
                                    <div>

                                        <div style={{fontWeight: "bold"}}>
                                            Адрес: <i></i>
                                        </div>
                                        {props.req.address}
                                    </div>
                                </div>

                                <h4 style={{fontWeight: "bold", marginTop: "10px"}}>Рекомендатель:</h4>

                                <div>
                                    <b>{props.req.recommender}</b>

                                </div>


                            </div>
                            <div style={{
                                width: "70%",
                                height: "100%",
                                backgroundColor: "#ffffff",
                                paddingTop: "50px",
                                paddingLeft: "10px",
                                fontStyle: "italic"
                            }}>
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-end",
                                    flexDirection: "column",
                                    borderBottom: "3px #e1d1d1 solid"
                                }}>
                                    <h1>{props.req.fio}</h1>
                                    <h3>{props.req.sp}</h3>
                                    <h3>{props.req.bDay} {ageToStr(props.req.bDay)}</h3>

                                </div>


                                <div style={{display: "flex", flexDirection: "column"}} className="about">
                                    {worker && worker !== "null" ?
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "end",
                                            background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(43,255,89,0) 61%, rgba(43,255,89,1) 80%, rgba(43,255,89,0) 100%)"
                                        }}>Бывший сотрудник ОАО "Белаз" </div>
                                        :
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "end",
                                            background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,43,51,0) 61%, rgba(255,3,3,1) 80%, rgba(255,0,0,0) 100%)"
                                        }}>Ранее не работал в ОАО "Белаз"</div>}
                                    <div>
                                        <ul style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            fontWeight: "400",
                                            color: "#007bff",
                                            backgroundColor: "transparent",
                                            listStyle: "none"
                                        }} className="btn-link">
                                            <li style={{
                                                cursor: "pointer",
                                                boxShadow: "5px 5px 5px grey",
                                                float: "left",
                                                marginTop: "15px",
                                                padding: "5px 20px",
                                                borderRadius: "15px",
                                                border: "1px solid #888",
                                                marginRight: "10px",
                                                marginBottom: "10px",
                                                color: "#888"
                                            }}>
                                                <i className="fas fa-paper-plane"></i> Человек в соцсетях
                                            </li>


                                            <li style={{
                                                boxShadow: "5px 5px 5px grey",
                                                cursor: "pointer",
                                                float: "left",
                                                marginTop: "15px",
                                                padding: "5px 20px",
                                                borderRadius: "15px",
                                                border: "1px solid #888",
                                                marginRight: "10px",
                                                marginBottom: "10px",
                                                color: "#888"
                                            }}>
                                                <i className="fas fa-cloud-download-alt"></i> Скачать резюме
                                            </li>
                                        </ul>
                                    </div>
                                    <div style={{borderBottom: "1px solid #c3c2c2", borderTop: "1px solid #c3c2c2"}}>
                                        <h2 style={{
                                            left: "0",
                                            top: "0",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}>Другие профессии</h2>
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <h3><span style={{fontWeight: "bold"}}>Основная специальность:</span>
                                                <span>{props.req.sp}</span></h3>

                                            <div><i style={{fontWeight: "bold"}}>Специальность
                                                1: </i><i>{props.req.heldPosition1}</i></div>
                                            <div><i style={{fontWeight: "bold"}}>Специальность
                                                2: </i><i>{props.req.heldPosition2}</i></div>
                                            <div><i style={{fontWeight: "bold"}}>Специальность
                                                3: </i><i>{props.req.heldPosition3}</i></div>

                                        </div>
                                    </div>
                                    <Test tel={props.req.tel}/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>


        );

    }


    function ageToStr(props) {
        let txt;
        props = props % 100;
        if (props >= 5 && props <= 20) {
            txt = 'лет';
        } else {
            props = props % 10;
            if (props == 1) {
                txt = 'год';
            } else if (props >= 2 && props <= 4) {
                txt = 'года';
            } else {
                txt = 'лет';
            }
        }
        return txt;
    }

    function openCartState() {
        if (isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }

    }

    function OpenCart(props) {
        if (isOpen) {
            return <CartApplicant req={props.req}/>
        }
        return <div style={{width: "0", height: "0", position: "absolute"}}></div>


    }

    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            borderBottom: "1px solid #d9d6d6",
            fontWeight: "bold",
            fontSize: "0.9em"
        }}>

            <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "10px"}}><input
                type="checkbox"/></div>
            <OpenCart isOpen={false} req={props}/>
            <div onClick={openCartState} className={s.cart}

                 style={{display: "flex", width: "100%", minHeight: "60px"}}>

                <div className={s.rowCart}
                     style={{display: "flex", width: "50%",}}>{props.fio}</div>
                <div className={s.rowCart} style={{display: "flex", width: "20%"}}>{props.sp}</div>
                <div className={s.rowCart}
                     style={{display: "flex", width: "20%"}}>{props.bDay} {ageToStr(props.bDay)}</div>
                <div className={s.rowCart} style={{display: "flex", width: "20%"}}>Образование: {props.education} </div>
                <div className={s.rowCart} style={{
                    display: "flex",
                    paddingRight: "15px",
                    width: "20%",
                    fontSize: '.9em',
                    justifyContent: "flex-end"
                }}>{props.tel} </div>
            </div>


        </div>

    );

}

export default CartApplicants;
