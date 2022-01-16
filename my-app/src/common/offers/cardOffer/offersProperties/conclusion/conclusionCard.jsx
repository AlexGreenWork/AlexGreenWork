import React from "react";
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
import {setPopupDisplay} from "../../../../../reducers/fileReducer";
import FilesRG from "./conclusionFiles";
import {useDispatch} from "react-redux";





const ConclusionCard = (props) => {
    const [viewChange, setViewChange] = React.useState(false);
    if(props.id.mark == null && props.id.responsible_tabnum == localStorage.getItem('userTabelNum')){
        props.id.mark = ''
    }else{
        props.id.mark = 'Аннотации пока нет'
    }
    const [annot, setAnnot] = React.useState(`${props.id.mark}`)
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
        console.log(props.id.responsible_tabnum)


        try{
            const ann = document.getElementById(`${'annotation'+props.name}`).innerText
            console.log(ann)
            setAnnot(ann)
            await axios.post(`${API_URL}api/offers/toDbSaveAnnot`, {
              idOffer,
               tabNum,
                ann
            })

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

            return (<FilesRG/>

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

        function IsAdminSaveNotes() {
            return (

                <div>
                    <Button style={{
                        background: "#e9e9ff",
                        margin: "25px",
                        boxShadow: "1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
                    }} onClick={(value) => {
                        deleteResponsible(props.id.offer_id, props.tabel)
                    }}>Записать оценки</Button>
                    <Button style={{
                        background: "#e9e9ff",
                        margin: "25px",
                        boxShadow: "1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
                    }} onClick={(value) => {
                        deleteResponsible(props.id.offer_id, props.tabel)
                    }}>Сдать заключение</Button>

                </div>
            )
        }

        function AdminChangeSaveNotes() {
            const MyTabnum = localStorage.getItem('userTabelNum');
            if (MyTabnum == props.id.responsible_tabnum) {
                return <IsAdminSaveNotes/>;
            } else {
                return <IsAdminUser/>
            }
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
    }if(props.id.responsible_tabnum == localStorage.getItem('userTabelNum') && props.id.open !== null){
        return (<div>
        В обработке...
            <Button>Завершить работу с заключением</Button>
        </div>)
    } if(props.id.responsible_tabnum !== localStorage.getItem('userTabelNum') && props.id.open !== null){
        return (<div>
            В обработке c /{props.id.open}/
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

        return (
            <div style={{
                position: "relative",
                display: "block"
            }} name={props.name}>

                <AdminChangeCloseBtn {...props} isAdmin={localStorage.getItem("userAdminOptions")}/>

                <div className={s.header}>
                    <ConfirmResponsible {...props} isAdmin={localStorage.getItem("userTabelNum")} />
                    <div className={s.date}>
                        <div>Дата:</div>
                        <div> {newDate}{' ' + d.getFullYear()}</div>
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
                        <button onClick={() => setIsActive(!isActive)}
                                className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                                tabIndex="0" type="button" aria-label="expand row">
                            <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                focusable="false" viewBox="0 0 24 24" aria-hidden="true"
                                data-testid="KeyboardArrowUpIcon">
                                <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
                            </svg>
                            <span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                        </button>
                        :
                        <button onClick={() => setIsActive(!isActive)}
                                className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root"
                                tabIndex="0" type="button" aria-label="expand row">
                            <svg
                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                                focusable="false" viewBox="0 0 24 24" aria-hidden="true"
                                data-testid="KeyboardArrowDownIcon">
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
                        <div style={{width: "100%"}} placeholder="Напишите краткую аннотацию..."
                            id={'annotation'+props.name} contentEditable={"true"} className={s.conclusionTextArea}>{annot}
                        </div>
                        <AdminChangeSaveAnnotation {...props} isAdmin={localStorage.getItem("userAdminOptions")}/>
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
                                <ViewFileDoc/>
                                <div>Заключение</div>
                            </div>


                        </div>
                        <AdminChangeUploadFile isAdmin={localStorage.getItem("userAdminOptions")}/>
                    </div>

                    <div className={s.filesConclusion11}>
                        <div style={{display: "flex", width: "100%", borderBottom: "1px solid #00000033"}}>
                            <div style={{display: "flex", width: "45%", alignItems: "center"}}>

                            </div>
                            <div>Оценка</div>
                        </div>


                            <TableContainer component={Paper}>
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
                                        <TableCell align="right" contenteditable="true" type="number">1</TableCell>
                                        <TableCell align="right" contenteditable="true" type="number">1</TableCell>
                                        <TableCell align="right" contenteditable="true" type="number">1</TableCell>
                                        <TableCell align="right" contenteditable="true" type="number">1</TableCell>
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
