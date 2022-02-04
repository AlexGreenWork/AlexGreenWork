import React, { useState } from "react";
import s from "./conclusion.module.css"
import ViewFileDoc from "../../../../../Pics/svg/ViewFiles/docFileSvg";
import FindWorkers from "../../../../personalCabinet/findWorkers/findWorkers";
import Button from "@material-ui/core/Button";
import {store} from "../../../../../reducers";
import {API_URL} from "../../../../../config";
import server from "../../../../../actions/server";
import style from "./conclusionCard.module.css"
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from '@mui/material/Paper';
import axios from "axios";
import {closeConclusionResponsible} from "../../../../../actions/file";
import FilesResponsible from "./responsibleFiles"
import {useDispatch} from "react-redux";




const ConclusionCard = (props) => {
    const [viewChange, setViewChange] = React.useState(false);
    const [annot, setAnnot] = React.useState(`${props.id.mark}`)
    console.log(props.id.mark)
    if(props.id.mark == "null" ||props.id.mark == null && props.id.responsible_tabnum != localStorage.getItem("userTabelNum")){
        props.id.mark = ''
        console.log("worked if1" +props.id.mark)
        console.log("worked if1" +props.id.responsible_tabnum)
        setAnnot("")
    }if(props.id.mark == "null" ||props.id.mark == null && props.id.responsible_tabnum == localStorage.getItem("userTabelNum")){
        props.id.mark = ''
        console.log("worked if2" +props.id.responsible_tabnum)
        setAnnot("")
    }if(props.id.mark == ""  ){
        console.log("worked if3" +props.id.responsible_tabnum)
    }else{
        props.id.mark = annot;
    }
    
    function changeViewSelect() {
        setViewChange(true)
    }

    function changeViewSelectSave(props) {
        const idOffer = localStorage.getItem('idOffers')
        const respTabnum = store.getState().search.searchUser.tabnum
        deleteResponsible(idOffer, props.tabel);
        saveToDb(idOffer, respTabnum, props.name);
        setViewChange(false)
    }

    function SelectChangeConclusionResponsible(props) {
        if (viewChange == false) {
            return (
                <div style={{
                    textAlign: "center"
                }}>
                    <Button sx={{
                        border: '1px solid lightblue',
                        boxShadow: '1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);',
                        margin: '10px'
                    }}
                            onClick={changeViewSelect}>
                        Выбрать сотрудника
                    </Button>

                </div>
            )
        }
        if (viewChange == true) {
            return (
                <div>

                    <div style={{
                        textAlign: "center"
                    }}>
                        Выберите отвественного сотрудника по заключению от подразделения:
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
                            }} onClick={(value) => {
                                changeViewSelectSave(props)
                            }}>
                                Прикрепить сотрудника к предложению
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }
    }
    // const dispatch = useDispatch()
    async function saveAnnot(idOffer, tabNum){
        console.log(idOffer, tabNum)
        try{
            const ann = document.getElementById(`${'annotation'+props.name}`).innerText
            const position = props.name
            console.log(props.id.responsible_tabnum, props.name,  idOffer, tabNum, ann)
            
            setAnnot(ann)
            await axios.post(`${API_URL}api/offers/toDbSaveAnnot`, {
              idOffer,
               tabNum,
                ann,
                position                
            })
            alert("аннотация добавлена")

        }catch(e){
            console.log(e)
        }
    }

    async function deleteResponsible(idOffer, respTabnum) {
        try {
            await server.send_post_request(`${API_URL}api/offers/toDbDeleteResponsible`, {
                respTabnum,
                idOffer
            })

            if (respTabnum !== undefined) {
                alert('Ответственный сотрудник удален')
            }

        } catch (e) {
            alert(e.response.data.message)
        }
    }

    async function saveToDb(idOffer, respTabnum, position) {
        try {
            await server.send_post_request(`${API_URL}api/offers/toDbSaveResponsible`, {
                respTabnum,
                idOffer,
                position
            })

            alert('Ответственный сотрудник добавлен')
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const CardDivisionConclusion = () => {
        console.log(props)
        function IsAdminRG() {
            return (<div>
                    <SelectChangeConclusionResponsible {...props}/>
                    
                </div>
            )
        }

        function IsAdminUser(props) {
            return (
                <div></div>
            )
        }


        function AdminChange(props) {
            const isAdmin = props.isAdmin;
            if (isAdmin == 'wg') {
                return <IsAdminRG name={props.name}/>;

            } else {
                return <IsAdminUser/>
            }
        }

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

        var d = new Date(`${props.open}`);
        var newDate = d.getDate().toString().padStart(2, '0') + ' ' + month[d.getMonth()];

        function IsAdminRGUpload() {

            return (<div>

            </div>

            )
        }

        function IsAdminUser() {
            return (
                <div></div>
            )
        }

        function AdminChangeUploadFile(props) {
            const isAdmin = props.isAdmin;
            if (isAdmin == 'wg') {
                return <IsAdminRGUpload/>;

            } else {
                return <IsAdminUser/>
            }
        }

        function IsAdminCloseBtn() {
            return (
                <div>
                    <button className={style.closeBtn} onClick={(value) => {
                        deleteResponsible(props.id.offer_id, props.tabel)
                    }}>X
                    </button>
                </div>
            )
        }


        function IsAdminSaveAnnot() {
            return (

                <div>
                    <Button style={{
                        background: "#e9e9ff",
                        margin: "25px",
                        boxShadow: "1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
                    }} onClick={(value) => {
                        saveAnnot(props.id.offer_id, props.tabel, props.id.mark, props.id.responsible_tabnum, props.name)
                    }}>Добавить Аннотацию</Button>
                </div>
            )
        }


        function AdminChangeCloseBtn(props) {
            const isAdmin = props.isAdmin;

            if (isAdmin == 'wg') {

                return <IsAdminCloseBtn/>;

            } else {
                return <IsAdminUser/>
            }
        }

        function AdminChangeSaveAnnotation() {
            const MyTabnum = localStorage.getItem('userTabelNum');
            if (MyTabnum == props.id.responsible_tabnum) {
                return <IsAdminSaveAnnot idName={props.name}/>;
            } else {
                return <IsAdminUser/>
            }
        }
        async function saveNotesResponsible(){
            try{
            const idOffer = props.id.offer_id
            const tabNum = props.tabel
            const actual = document.getElementById("actual"+props.name).innerText 
            const innovate = document.getElementById("innovate"+props.name).innerText
            const cost = document.getElementById("cost"+props.name).innerText
            const duration = document.getElementById("duration"+props.name).innerText
            const position = props.name
            console.log(actual, innovate, cost, duration)
            console.log("offer",props.id.offer_id, "tabel",props.tabel, "mark",props.id.mark, "tabnum", props.id.responsible_tabnum, "propsName",props.name)
            // setAnnot(ann)
            await axios.post(`${API_URL}api/offers/toDbSaveNotesResponsible`, {
              idOffer,
               tabNum,
               actual,
               innovate,
               cost,
               duration,
               position
            })
            setActual(actual)
            setInnov(innovate)
            setCost(cost)
            setDuration(duration)
            alert("Оценки записаны")
            }catch(e){
                console.log(e)
            }
        }

        function IsAdminSaveNotes() {
            return (

                <div>
                    <Button style={{
                        background: "#e9e9ff",
                        margin: "25px",
                        boxShadow: "1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
                    }} onClick={(value) => {
                       saveNotesResponsible(props.id.offer_id, props.tabel, props.id.mark, props.id.responsible_tabnum, props.name)
                    }}>Записать оценки</Button>
                    <Button style={{
                        background: "#e9e9ff",
                        margin: "25px",
                        boxShadow: "1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
                    }} onClick={(value) => {
                        closeCunclusion()
                    }}>Сдать заключение</Button>

                </div>
            )
        }

        function IsAdminSaveNotes2() {
            return (

                <div>
                    <Button style={{
                        background: "#e9e9ff",
                        margin: "25px",
                        boxShadow: "1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
                    }} onClick={(value) => {
                       saveNotesResponsible(props.id.offer_id, props.tabel, props.id.mark, props.id.responsible_tabnum, props.name)
                    }}>Записать оценки</Button>
                    

                </div>
            )
        }



        function ChangeAnnotViewContentEditable(){
            const isMy = localStorage.getItem('userTabelNum')
            if (isMy == props.id.responsible_tabnum) {
                return  <div style={{width: "100%"}} placeholder="Напишите краткую аннотацию..."
                id={'annotation'+props.name} contentEditable={"true"} className={s.conclusionTextArea}>{annot}
            </div>;
            } else {
                return  <div style={{width: "100%"}} placeholder="Напишите краткую аннотацию..."
                id={'annotation'+props.name} contentEditable={"false"} className={s.conclusionTextArea}>{annot}
            </div>
            }
        }

        function AdminChangeSaveNotes() {
            const MyTabnum = localStorage.getItem('userTabelNum');
            if (MyTabnum == props.id.responsible_tabnum && props.id.close == null) {
                return <IsAdminSaveNotes/>;
            }if (MyTabnum == props.id.responsible_tabnum && props.id.close !== null) {
                return <IsAdminSaveNotes2/>;

            } else {
                return <IsAdminUser/>
            }
        }

        function ViewNotesResposible() {
            const MyTabnum = localStorage.getItem('userTabelNum');
            if (MyTabnum == props.id.responsible_tabnum) {
                return <TableContainer component={Paper}>
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
                         <TableCell id={'actual'+props.name} className={s.NoteCell} align="right" contenteditable="true" type="number">{actual}</TableCell>
                         <TableCell id={'innovate'+props.name} className={s.NoteCell} align="right" contenteditable="true" type="number">{innov}</TableCell>
                          <TableCell id={'cost'+props.name} className={s.NoteCell} align="right" contenteditable="true" type="number">{cost}</TableCell>
                          <TableCell id={'duration'+props.name} className={s.NoteCell} align="right" contenteditable="true" type="number">{duration}</TableCell>
                    </TableBody>
                    </Table>
            </TableContainer>;
            } else {
                return <TableContainer component={Paper}>
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
                         <TableCell id={'actual'+props.name} className={s.NoteCell} align="right"  type="number">{actual}</TableCell>
                         <TableCell id={'innovate'+props.name} className={s.NoteCell} align="right"  type="number">{innov}</TableCell>
                          <TableCell id={'cost'+props.name} className={s.NoteCell} align="right"  type="number">{cost}</TableCell>
                          <TableCell id={'duration'+props.name} className={s.NoteCell} align="right"  type="number">{duration}</TableCell>
                    </TableBody>
                    </Table>
            </TableContainer>
            }
        }
        const dispatch = useDispatch()
        function closeCunclusion(){
            const idOffer = localStorage.getItem('idOffers')
            const tabNum = localStorage.getItem('userTabelNum')
            alert("Заключение закрыто")
            setDateClose(Date())
            dispatch(closeConclusionResponsible(tabNum, idOffer ))
        }

        const [isActive, setIsActive] = React.useState(false);
        const [resOtv, setResOtv] = React.useState(`${props.id}`);
function ConfirmResponsible(){
   console.log(props)
    if(props.id.responsible_tabnum == localStorage.getItem('userTabelNum') && props.id.open == null){
        return <div><Button style={{
            border:"1px solid #a5bff9"
        }}
        >Принять в обработку</Button></div>
    }if(props.id.responsible_tabnum == localStorage.getItem('userTabelNum') && props.id.open !== null && props.id.close == null ){
        return (<div>
        В обработке с {newDate}{' ' + d.getFullYear()}...
            <Button onClick={(value) => {
                            closeCunclusion(props.id.tabNum)}}>Завершить работу с заключением</Button>
        </div>)
    }if(props.id.responsible_tabnum == localStorage.getItem('userTabelNum') && props.id.open !== null && props.id.close !== null ){
        return (<div>
        В обработке с {newDate}{' ' + d.getFullYear()}...
        </div>)   
    } if(props.id.responsible_tabnum !== localStorage.getItem('userTabelNum') && props.id.open !== null){
        return (<div>
            В обработке c  {newDate}{' ' + d.getFullYear()}
            </div>)
    }if(props.id.responsible_tabnum !== localStorage.getItem('userTabelNum') && props.id.open == null){
        return (<div>
           Еще не принято в обработку
        </div>)
    }
    else {
        return <div></div>
    }
}
const [dateClose, setDateClose] = useState(`${props.id.close}`)
var close = new Date(`${dateClose}`);
var newCloseDate = close.getDate().toString().padStart(2, '0') + ' ' + month[close.getMonth()];
function CloseChange(isClose){
        
    if(isClose.isClose == "null"){
       
        return <div></div>
    }if(isClose.isClose == "undefined"){
        return <div></div>
    }else{
        return <div style={{width:"100%", backgroundColor:"#ea8888", display: "flex", justifyContent: "center"}}> Заключение закрыто: {newCloseDate}{' ' + close.getFullYear() } года.</div>
        
    }
}

const [actual, setActual] = useState(`${props.id.actual}`)
const [innov, setInnov] = useState(`${props.id.innov}`)
const [cost, setCost] = useState(`${props.id.cost}`)
const [duration, setDuration] = useState(`${props.id.extent}`)

        return (
            <div style={{
                position: "relative",
                display: "block"
            }} name={props.name}>
                <CloseChange isClose={dateClose}/>
                <AdminChangeCloseBtn {...props} isAdmin={localStorage.getItem("userAdminOptions")}/>

                <div className={s.header}>
                    <ConfirmResponsible {...props} isAdmin={localStorage.getItem("userTabelNum")} />
                    <div className={s.date}>
                        
                    </div>
                    <div className={s.nameWorkGroup}>
                        <div>Подразделение:</div>
                        <div> {props.id.fullname}</div>
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
                                    backgroundImage: `url(${API_URL + 'files/photos/' + props.tabel + ".jpg"})`,
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
                                }}>{props.resp}</div>
                                <div style={{
                                    marginRight: '5px', marginLeft: '5px', display: "flex",
                                    alignItems: "center"
                                }}> Табельный: {props.tabel} </div>
                            </div>
                        </div>
                    </div>


                    <AdminChange name={props.name} isAdmin={localStorage.getItem("userAdminOptions")}/>

<div style={{
    width:"100%"
}} onClick={() => setIsActive(!isActive)}>
                    {isActive ?
                        <button style={{border: "0",
                            backgroundColor: "white"}} onClick={() => setIsActive(!isActive)}
                                className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                                tabIndex="0" type="button" aria-label="expand row">
                            <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                focusable="false" viewBox="0 0 24 24" aria-hidden="true"
                                data-testid="KeyboardArrowUpIcon"  style={{height: "24px"}}>
                                <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
                            </svg>
                            <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                        </button>
                        :
                        <button style={{border: "0",
                        backgroundColor: "white"}} onClick={() => setIsActive(!isActive)}
                                className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                                tabIndex="0" type="button" aria-label="expand row">
                            <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                focusable="false" viewBox="0 0 24 24" aria-hidden="true"
                                data-testid="KeyboardArrowDownIcon" style={{height: "24px"}}>
                                <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                            </svg>
                            <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                        </button>
                    }подробнее...
</div>

                    {isActive && <div className={s.conclusionAccordion}>
                    <div className={s.filesConclusion11}>
                        <div style={{
                            marginBottom: "25px"
                        }}>Краткая аннотация заключения подразделения({props.id.fullname}):
                        </div>
                        <AdminChangeSaveAnnotation {...props} isAdmin={localStorage.getItem("userAdminOptions")}/>
                        <ChangeAnnotViewContentEditable isMy={localStorage.getItem('userTabelNum')}/>
                        
                    </div>
                    <div className={s.filesConclusion}>
                        <div style={{
                            borderBottom: "1px solid #dfdcdc",
                            marginBottom: "11px"
                        }}>Файлы заключения ({props.id.fullname}):
                        </div>
                        <div className={s.conclusionFilesArea}>
                            <div className={s.conclusionFilesAreaFile} style={{
                                display: "flex",
                                flexDirection: "column",
                                cursor: "pointer"
                            }}>
                                <FilesResponsible tabNum={props.tabel}/>
                               {/*  <ViewFileDoc/> */}
                                
                            </div>


                        </div>
                        <AdminChangeUploadFile isAdmin={localStorage.getItem("userAdminOptions")}/>
                    </div>

                    <div className={s.filesConclusion11}>
                        <div style={{display: "flex", width: "100%", borderBottom: "1px solid #00000033"}}>
                            <div style={{display: "flex", width: "45%", alignItems: "center"}}>

                            </div>
                            <div>Оценка (максимальная оценка - 5 баллов)</div>
                        </div>

                            <ViewNotesResposible {...props} isResponsible = {localStorage.getItem("userTabelNum")}/>    
                            

                            <AdminChangeSaveNotes {...props} isAdmin={localStorage.getItem("userAdminOptions")}/>
                    </div>



                    </div>
                        }
                </div>
            </div>)

    }


    return (
        <div className={s.cardOfferContainer}>
            <div>
                <CardDivisionConclusion/>
            </div>


        </div>

    )
}
export default ConclusionCard;
