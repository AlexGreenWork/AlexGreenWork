import React, {useEffect, useState} from "react";
import s from "./conclusion.module.css"
import FindWorkers from "../../../../personalCabinet/findWorkers/findWorkers";
import Button from "@material-ui/core/Button";
import ConclusionCard from "./conclusionCard";
import {store} from "../../../../../reducers";
import {API_URL} from "../../../../../config";
import {responseToOffer, selectMyOffers, selectToMyOffer} from "../../../../../reducers/offerReducer";
import {useDispatch} from "react-redux";
import {render} from "react-dom";
import ConclusionList from "./conclusionList";
import ViewFileDoc from "../../../../../Pics/svg/ViewFiles/docFileSvg";
import server from "../../../../../actions/server";
import {element} from "prop-types";
import {saveRespRGAnnotationToDb} from "../../../../../actions/file";
import {closeConclusionRG} from "../../../../../actions/file";
import axios from "axios";
import style from "./conclusionCard.module.css";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import FilesRG from "./conclusionFiles"
import {saveNotesToDb} from "../../../../../actions/file"
import { red } from "@mui/material/colors";
console.log(store.getState().search.searchUser)




///////////////////////////////////////////////////////////////////////////////////////////////////
const ConclusionOffer = () => {

    const dispatch = useDispatch()


    const [viewChange, setViewChange] = React.useState(false);

    function changeViewSelect() {
        if (viewChange === true) {

            setViewChange(false)
        }
        if (viewChange === false) {
            setViewChange(true)
        }

    }

    function SelectChangeConclusionResponsible() {


        if (viewChange == false) {
            return (<div style={{
                    textAlign: "center"
                }}>
                    <Button sx={{
                        border: '1px solid lightblue',
                        boxShadow: '1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);',
                        margin: '10px'

                    }}
                            onClick={changeViewSelect}>Выбрать сотрудника рабочей группы</Button>

                </div>

            )
        }
        if (viewChange == true) {
            return (
                <div>
                    <div style={{
                        textAlign: "center"
                    }}> Выберите отвественного сотрудника по заключению от подразделения:
                    </div>

                    <div className={s.finder}>
                        <FindWorkers/>
                        <div style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Button style={{
                                width: "300px",
                                border: "1px solid #1890ff"
                            }} onClick={saveResponsible}>Добавить / Изменить
                            </Button>
                            <Button style={{
                                width: "300px",
                                border: "1px solid #1890ff"
                            }} onClick={changeViewSelect}>Отменить
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const [sCount, setSCount] = React.useState(0)
    const [update, needUpdate] = React.useState(false);
    const [card, setCards] = React.useState([])

    useEffect(() => {
    })

     function addResp(value) {
        setResponsibles(responsibles.push({}));
    }

    function deleteResp(){
        setResponsibles(responsibles.pop({}));
    }


    function IsAdminRG() {
        return (<div>
                <Button style={{
                    border: "1px solid #a5bff9",
                    marginBottom: "10px"
                }} onClick={addResp}>+ Добавить заключение и отвественного сотрудника</Button>

            </div>
        )
    }

    function IsAdminRGUpload() {
        return (<div className={s.fileUpload} >
            <input type="file" name="filename" className={s.buttonS}/>wefw
        </div>

        )
    }


    const [annotationRGMark, setAnnotationRGMark] = useState(`${store.getState().offers.offer.responsibles_rg?.mark}`)

    // function AnnotationInput(){
    //     const w = document.getElementById("textAreaRGConc").innerText
    //     // setAnnotationRGMark(w)
    //     console.log(w)
    // }

    async function saveRespRGAnnotation(){
        const w = document.getElementById("textAreaRGConc").innerText
        alert("Аннотация добавлена")
      dispatch(saveRespRGAnnotationToDb(w))

    }
    function IsAdminRGUploadAnnotation() {
        return (<div className={s.fileUpload}>
            <Button onClick={saveRespRGAnnotation} style={{
                background:"#e9e9ff",
                margin:"25px",
                boxShadow: "1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
            }}>Добавить аннотацию</Button>
        </div>

        )
    }

    function IsAdminUser() {
        return (
            <div></div>
        )
    }

    // function RespChange(props) {
    //     let isVisible;
    //     if (store.getState().offers.offer.responsible1 == null) {
    //         isVisible = props.isVisible;
    //     }
    //     if (store.getState().offers.offer.responsible2 == null && store.getState().offers.offer.responsible1 !== null) {
    //         isVisible = 1;
    //     }
    //     if (store.getState().offers.offer.responsible3 == null && store.getState().offers.offer.responsible2 !== null && store.getState().offers.offer.responsible1 !== null) {
    //         isVisible = 2;
    //     }
    //     if (store.getState().offers.offer.responsible3 !== null && store.getState().offers.offer.responsible2 !== null && store.getState().offers.offer.responsible1 !== null) {
    //         isVisible = 3;
    //     }
    //
    //
    //     if (isVisible == 0)
    //     {
    //         return (
    //             <div></div>
    //         )
    //     }
    //
    //     if (isVisible == 1) {
    //
    //         return (
    //             <div>
    //                 <ConclusionCard name={1} resp={store.getState().offers.offer.responsible1}/>
    //             </div>
    //         )
    //     }
    //     if (isVisible == 2) {
    //         return (
    //             <div>
    //                 <ConclusionCard name={2} resp={store.getState().offers.offer.responsible2}/>
    //                 <ConclusionCard name={1} resp={store.getState().offers.offer.responsible1}/>
    //             </div>
    //         )
    //     }
    //     if (isVisible == 3) {
    //         return (
    //             <div>
    //                 <ConclusionCard name={3} resp={store.getState().offers.offer.responsible3}/>
    //                 <ConclusionCard name={2} resp={store.getState().offers.offer.responsible2}/>
    //                 <ConclusionCard name={1} resp={store.getState().offers.offer.responsible3}/>
    //             </div>
    //         )
    //     }
    // }

    function AdminChange(props) {
        const isAdmin = props.isAdmin;
        if (isAdmin == 'wg') {
            return <IsAdminRG/>;

        } else {
            return <IsAdminUser/>
        }
    }
    function AdminChangeUploadFile(props) {
        const isAdmin = props.isAdmin;
        if (isAdmin == `${store.getState().offers.offer.responsibles_rg?.responsible_tabnum}`) {
            return (
                <div></div>);

        } else {
            return <IsAdminUser/>
        }
    }
    function AdminChangeUploadAnnotation(props) {
        const isAdmin = props.isAdmin;
        if (isAdmin == `${store.getState().offers.offer.responsibles_rg?.responsible_tabnum}`) {
            return <IsAdminRGUploadAnnotation/>;

        } else {
            return <IsAdminUser/>
        }
    }

    function AdminChange2(props) {
        const isAdmin = props.isAdmin;
        if (isAdmin == 'wg') {

            return (
                <div>
                    <div style={{
                        textAlign: "center"
                    }}>
                    </div>
                    <SelectChangeConclusionResponsible/>
                </div>
            )
        } else {
            return <div></div>
        }
    }


    async function saveResponsible() {
        try {
            setViewChange(false)
            const idOffer = localStorage.getItem('idOffers')
            const respName = store.getState().search.searchUser.name
            const respTabnum = store.getState().search.searchUser.tabnum

            await server.send_post_request(`${API_URL}api/offers/toDbSaveResposibleRG`, {
                respTabnum,
                respName,
                idOffer
            })
            let fio = store.getState().search.searchUser.name
            let tabnum = store.getState().search.searchUser.tabnum

            dispatch(selectToMyOffer(fio, tabnum))
            setNameRg(store.getState().search.searchUser.name)
            setDateRg(Date())
            setTabelRg(store.getState().search.searchUser.tabnum)


            alert('Ответственный сотрудник добавлен')

        } catch (e) {
            alert(e.response.data.message)
        }
    }

    async function readResp() {
        try {

        } catch (e) {
            return (e.response.date.message)
        }

    }

    const [nameRG, setNameRg] = useState(`${store.getState().offers.offer.responsibles_rg?.fiofull}`)
    const [dateRG, setDateRg] = useState(`${store.getState().offers.offer.responsibles_rg?.open}`)
    const [dateCloseRG, setDateCloseRg] = useState(`${store.getState().offers.offer.responsibles_rg?.close}`)
    const [tabelRG, setTabelRg] = useState(`${store.getState().offers.offer.responsibles_rg?.responsible_tabnum}`)


    /** console.log(dateRG)
     console.log(store.getState().offers.offer.responsibles_rg?.fiofull)
     console.log(store.getState().offers.offer.responsibles_rg?.open)
     **/

        ///////////////////////////////////////////////////////////////
        // const responsibles = store.getState().offers.offer.responsibles
    const [responsibles, setResponsibles] = React.useState(store.getState().offers.offer.responsibles)


    //console.log("Респы - ", responsibles)


    // function AllResponsibles (){
    //
    //     return <ConclusionList props={responsibles}/>
    //
    //
    //     // responsibles.map((index) =>
    //     //     <ConclusionCard name={index} id={index} resp={index.fiofull} tabel={index.responsible_tabnum} /> ).reverse()
    // }

    var month = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря'
    ];

    var open = new Date(`${dateRG}`);
    var newDate = open.getDate().toString().padStart(2, '0') + ' ' + month[open.getMonth()];

    var close = new Date(`${dateCloseRG}`);
    var newCloseDate = close.getDate().toString().padStart(2, '0') + ' ' + month[close.getMonth()];
    
function AdminChangeAnnotationWiev(props){
        const isAdmin = props.isAdmin;
        if (isAdmin == `${store.getState().offers.offer.responsibles_rg?.responsible_tabnum}`) {
            return (
                <div contentEditable={"true"} id="textAreaRGConc" placeholder="Напишите краткую аннотацию..." className={s.conclusionTextArea} style={{
                    width:"100%",
                    flexDirection:"column"
                }} > {annotationRGMark}
                </div>
            )

        } else {
            return (
                <div id="textAreaRGConc" placeholder="Напишите краткую аннотацию..." className={s.conclusionTextArea} style={{
                    width:"100%",
                    flexDirection:"column"
                }} > {annotationRGMark}
                </div>
            )
        }
}
    function saveNotes(){
        const actual = document.getElementById("actual").innerText
        const innovate = document.getElementById("innovate").innerText
        const cost = document.getElementById("cost").innerText
        const duration = document.getElementById("duration").innerText
        const idOffer = localStorage.getItem('idOffers')
        const tabNum = localStorage.getItem('userTabelNum')
        alert("Оценки записаны")
        dispatch(saveNotesToDb(actual, innovate, cost, duration,tabNum, idOffer ))
    }
    function closeCunclusion(){
        const idOffer = localStorage.getItem('idOffers')
        const tabNum = localStorage.getItem('userTabelNum')
        alert("Заключение закрыто")
        setDateCloseRg(Date())
        dispatch(closeConclusionRG(tabNum, idOffer ))
    }
    const [actual, setActual] = React.useState('')
    const [innovate, setInnovate] = React.useState('')
    const [cost, setCost] = React.useState('')
    const [duration, setDuration] = React.useState('')
    
    function AdminChangeSaveNotes() {
        const MyTabnum = localStorage.getItem('userTabelNum');
        if (MyTabnum == store.getState().offers.offer.responsibles_rg?.responsible_tabnum) {
            
            return (<TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell align="right">Актуальность</TableCell>
                            <TableCell align="right">Инновативность</TableCell>
                            <TableCell align="right">Затратность</TableCell>
                            <TableCell align="right">Протяженность</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableCell/>
                        <TableCell id="actual" className={s.NoteCell} align="right" contenteditable="true" type="number">
                        <select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                        </select>  
                        {store.getState().offers.offer.responsibles_rg?.actual}
                            </TableCell>
                        <TableCell id="innovate" className={s.NoteCell} align="right" contenteditable="true" type="number">{store.getState().offers.offer.responsibles_rg?.innov}</TableCell>
                        <TableCell id="cost" className={s.NoteCell} align="right" contenteditable="true" type="number">{store.getState().offers.offer.responsibles_rg?.cost}</TableCell>
                        <TableCell id="duration" className={s.NoteCell} align="right" contenteditable="true" type="number">{store.getState().offers.offer.responsibles_rg?.extent}</TableCell>
                    </TableBody>
                </Table>
                    <div>
                        <Button style={{
                            background: "#e9e9ff",
                            margin: "25px",
                            boxShadow: "1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
                        }} onClick={(value) => {
                            saveNotes(store.getState().offers.offer.responsibles_rg?.responsible_tabnum)
                        }}>Записать оценки</Button>
                        <Button style={{
                            background: "#e9e9ff",
                            margin: "25px",
                            boxShadow: "1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
                        }} onClick={(value) => {
                            closeCunclusion(store.getState().offers.offer.responsibles_rg?.responsible_tabnum)
                        }}>Сдать заключение</Button>

                    </div>
            </TableContainer>

            );
        } else {
            return (<TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell align="right">Актуальность</TableCell>
                            <TableCell align="right">Инновативность</TableCell>
                            <TableCell align="right">Затратность</TableCell>
                            <TableCell align="right">Протяженность</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCell/>
                        <TableCell  align="right"  type="number">1</TableCell>
                        <TableCell align="right"  type="number">1</TableCell>
                        <TableCell align="right"  type="number">1</TableCell>
                        <TableCell align="right"  type="number">1</TableCell>
                    </TableBody>
                </Table>
            </TableContainer>);
        }
    }
    function CloseChange(isClose){
        console.log(isClose.isClose)
        if(isClose.isClose == "null"){
            console.log("Отработало")
            return <div></div>
        }if(isClose.isClose == "undefined"){
            return <div></div>
        }else{
            return <div style={{width:"100%", backgroundColor:"#ea8888", display: "flex", justifyContent: "center"}}> Заключение закрыто: {newCloseDate}{' ' + close.getFullYear() } года.</div>
            
        }
    }

    return (
        <div id="OffContainer" className={s.cardOfferContainer1}>
            <AdminChange isAdmin={localStorage.getItem("userAdminOptions")}/>
            <ConclusionList responsibles={responsibles} />


            {/*{responsibles.map((index) =>*/}
            {/*       <ConclusionCard name={index} id={index} resp={index.fiofull} tabel={index.responsible_tabnum} /> ).reverse()*/}
            {/*}*/}
            {/*<AllResponsibles/>*/}
            {/*<RespChange isVisible={sCount}/>*/}

            <div className={s.header} style={{
                borderTop: "10px solid grey",
                borderBottom: "10px solid grey"
            }}>
                <CloseChange isClose={dateCloseRG}/>
                <div className={s.date}>
                    <div>Дата начала обработки:</div>
                    <div>{newDate}{' ' + open.getFullYear()}</div>
                </div>
                <div className={s.nameWorkGroup}>
                    <div>Подразделение:</div>
                    <div>Рабочая группа</div>
                </div>

                <div className={s.ExecutWorker}>

                    <div style={{
                        display: "flex",
                        alignItems: "center"
                    }}>Ответственный сотрудник:
                    </div>
                    <div style={{
                        display: "flex"

                    }}>
                        <div style={{
                            boxShadow: "0px 4px 8px 0px rgba(34, 60, 80, 0.2)",
                            display: "flex",
                            borderBottomLeftRadius: "15px",
                            borderTopLeftRadius: "15px"
                        }}>
                            <div style={{
                                backgroundImage: `url(${API_URL + 'files/photos/' + tabelRG + ".jpg"})`,
                                width: "40px",
                                height: "40px",
                                backgroundSize: "cover",
                                borderRadius: "50%",
                                backgroundPosition: "center"
                            }}>
                            </div>

                            <div style={{
                                marginRight: '5px', marginLeft: '5px', display: "flex",
                                alignItems: "center"
                            }}>{nameRG}</div>
                            <div style={{
                                marginRight: '5px', marginLeft: '5px', display: "flex",
                                alignItems: "center"
                            }}> Табельный: {tabelRG} </div>
                        </div>
                    </div>
                </div>

                <AdminChange2 isAdmin={localStorage.getItem("userAdminOptions")}/>
                <div className={s.filesConclusion}>
                    <div style={{
                        borderBottom: "1px solid #dfdcdc",
                        marginBottom: "11px"
                    }}>Файлы заключения рабочей группы:</div>
                    <div className={s.conclusionFilesArea}>
                        <div className={s.conclusionFilesAreaFile} style={{
                            display: "flex",
                            flexDirection: "column",
                            cursor: "pointer"
                        }}>
                            <FilesRG tabNum={tabelRG}/>
                        </div>


                    </div>
                    <AdminChangeUploadFile isAdmin={localStorage.getItem("userTabelNum")}/>
                </div>
                <div className={s.filesConclusion11}>
                    <div style={{
                        marginBottom: "25px",
                    }}>Краткая аннотация заключения рабочей группы:</div>
                    <AdminChangeAnnotationWiev isAdmin={localStorage.getItem("userTabelNum")}/>
                    
                    <AdminChangeUploadAnnotation isAdmin={localStorage.getItem("userTabelNum")}/>

                </div>


                <div style={{display: "flex", width: "100%", borderBottom: "1px solid #00000033"}}>

                    <div>Оценка</div>
                </div>



                <AdminChangeSaveNotes  isAdmin={localStorage.getItem("userAdminOptions")}/>
            </div>

        </div>

    )
}
export default ConclusionOffer;
