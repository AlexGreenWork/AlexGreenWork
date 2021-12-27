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


console.log(store.getState().search.searchUser)

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

    function deleteResp() {
        setResponsibles(responsibles.pop({}));
    }


    function IsAdminRG() {
        return (<div>
                <Button style={{
                    border: "1px solid #a5bff9",
                    marginBottom: "10px"
                }} onClick={addResp}>+ Добавить заключение и отвественного сотрудника</Button>


                <Button style={{
                    border: "1px solid #a5bff9",
                    marginBottom: "10px"
                }} onClick={deleteResp}>- Удалить заключение</Button>
            </div>
        )
    }

    function IsAdminRGUpload() {
        return (<div className={s.fileUpload} >
            <input type="file" name="filename" className={s.buttonS}/>
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
      dispatch(saveRespRGAnnotationToDb(w))

    }
    function IsAdminRGUploadAnnotation() {
        return (<div className={s.fileUpload}>
            <Button onClick={saveRespRGAnnotation} style={{
                background:"#e9e9ff",
                margin:"25px"
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
        if (isAdmin == 'wg') {
            return <IsAdminRGUpload/>;

        } else {
            return <IsAdminUser/>
        }
    }
    function AdminChangeUploadAnnotation(props) {
        const isAdmin = props.isAdmin;
        if (isAdmin == 'wg') {
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


            await axios.post(`${API_URL}api/offers/toDbSaveResposibleRG`, {
                respTabnum,
                respName,
                idOffer

            })
            let fio = store.getState().search.searchUser.name
            let tabnum = store.getState().search.searchUser.tabnum

            dispatch(selectToMyOffer(fio, tabnum))
            setNameRg(store.getState().search.searchUser.name)
            setDateRg(store.getState().offers.offer.responsibles_rg?.open)
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

    const [nameRG, setNameRg] = React.useState(`${store.getState().offers.offer.responsibles_rg?.fiofull}`)
    const [dateRG, setDateRg] = React.useState(`${store.getState().offers.offer.responsibles_rg?.open}`)
    const [tabelRG, setTabelRg] = React.useState(`${store.getState().offers.offer.responsibles_rg?.responsible_tabnum}`)


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

    var d = new Date(`${dateRG}`);
    var newDate = d.getDate().toString().padStart(2, '0') + ' ' + month[d.getMonth()];


    return (
        <div id="OffContainer" className={s.cardOfferContainer}>
            <AdminChange isAdmin={localStorage.getItem("userAdminOptions")}/>
            <ConclusionList responsibles={responsibles}/>


            {/*{responsibles.map((index) =>*/}
            {/*       <ConclusionCard name={index} id={index} resp={index.fiofull} tabel={index.responsible_tabnum} /> ).reverse()*/}
            {/*}*/}
            {/*<AllResponsibles/>*/}
            {/*<RespChange isVisible={sCount}/>*/}

            <div className={s.header} style={{
                borderTop: "10px solid grey",
                borderBottom: "10px solid grey"
            }}>
                <div className={s.date}>
                    <div>Дата начала обработки:</div>
                    <div>{newDate}{' ' + d.getFullYear()}</div>
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
                            <ViewFileDoc/>
                            <div>Заключение</div>
                        </div>


                    </div>
                    <AdminChangeUploadFile isAdmin={localStorage.getItem("userAdminOptions")}/>
                </div>
                <div className={s.filesConclusion11}>
                    <div style={{
                        marginBottom: "25px",
                    }}>Краткая аннотация заключения рабочей группы:</div>
                    <div contentEditable={"true"} id="textAreaRGConc" className={s.conclusionTextArea} style={{
                        width:"100%",
                        flexDirection:"column"
                    }} > {annotationRGMark}
                    </div>
                    <AdminChangeUploadAnnotation isAdmin={localStorage.getItem("userAdminOptions")}/>
                </div>
            </div>


        </div>

    )
}
export default ConclusionOffer;