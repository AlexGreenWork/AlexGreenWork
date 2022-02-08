import React, {useState} from "react";
import s from "./general.module.css"
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@material-ui/core/Button";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import AddSendlerOffers from "./senlerAdditional";
import {API_URL} from "../../../../../config";
import {useDispatch, useSelector} from "react-redux";
import {toStatus} from "../../../../../actions/offers";
import { store } from "../../../../../reducers";




function ReadDir() {
    let idOffers = localStorage.getItem('idOffers');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}api/offers/FilesMyOffers`, false); /// СИНХРОННЫЙ ЗАПРОС!!!
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`idOffers=${idOffers}`);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let offersData = JSON.parse(xhr.response);           
           // console.log(offersData)      
        }
    }   
    return xhr.response
}


function IMG(props) {
    return (
        <div className="imgFile">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">

                <g>
                    <title>Layer 1</title>
                    <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_1" y2="1.66663"
                          x2="0.73774" y1="49.64471" x1="0.84703" fill="none"/>
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_2" y2="2.10379" x2="0.84703"
                          y1="2.10379" x1="34.94534" stroke="#000" fill="none"/>
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_4" y2="49.64471" x2="49.15297"
                          y1="12.70487" x1="49.26226" stroke="#000" fill="none"/>
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_6" y2="13.03274" x2="49.26226"
                          y1="2.32237" x1="34.72676" stroke="#000" fill="none"/>
                    <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_7" y2="13.90705"
                          x2="34.72676" y1="2.75953" x1="34.72676" fill="none"/>
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_8" y2="13.46989" x2="34.72676"
                          y1="13.57918" x1="49.04368" stroke="#000" fill="none"/>
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_9" y2="49.09826" x2="3.46997"
                          y1="36.63926" x1="3.36068" stroke="#000" fill="none"/>
                    <line transform="rotate(1.43372 5.35885 36.5227)" stroke="#000" stroke-linecap="undefined"
                          stroke-linejoin="undefined" id="svg_10" y2="36.63926" x2="2.92353" y1="36.40613" x1="7.79418"
                          fill="none"/>
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_11" y2="41.77587" x2="3.36068"
                          y1="41.77587" x1="6.3115" stroke="#000" fill="none"/>
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_12" y2="49.31684" x2="10.68308"
                          y1="36.42068" x1="10.68308" stroke="#000" fill="none"/>
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_13" y2="49.53542" x2="13.52461"
                          y1="36.42068" x1="13.63389" stroke="#000" fill="none"/>
                    <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_14" y2="49.20755"
                          x2="13.03297" y1="49.09826" x1="17.45903" fill="none"/>
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_15" y2="49.42613" x2="20.847"
                          y1="36.52997" x1="20.62842" stroke="#000" fill="none"/>
                    <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_16" y2="49.09826"
                          x2="20.30427" y1="49.09826" x1="24.56284" fill="none"/>
                    <line transform="rotate(-2.33302 22.1038 43.3606)" stroke-linecap="undefined"
                          stroke-linejoin="undefined" id="svg_17" y2="43.30592" x2="20.73771" y1="43.41521"
                          x1="23.46995" stroke="#000" fill="none"/>
                    <line transform="rotate(5.38926 22.4317 36.9671)" stroke="#000" stroke-linecap="undefined"
                          stroke-linejoin="undefined" id="svg_18" y2="37.18571" x2="20.51913" y1="36.74855"
                          x1="24.34426" fill="none"/>
                </g>
            </svg>
            {props.type}


        </div>
    )
}

function downloadFile(obj) {
   // console.log(obj.props.children[0].props.children)
    let idOffers = localStorage.getItem('idOffers');
    window.location = `${API_URL}api/offers/downloadMyFile?idOffers=${idOffers}&folder=SendlerFiles&fileName=${obj.props.children[0].props.children}`;
}

function FileList() {

    let offersFile = JSON.parse(ReadDir());
    let arr = new Array();
    arr = offersFile

    for (let i = 0; i < offersFile.length; i++) {
        for (let j = 0; j < offersFile[i].length; j++) {

            if (offersFile[i][j] == '.') {


                let format = offersFile[i].slice(j)
                arr[i] = React.createElement("div", {className: "fileElement", key:"fileElement"+i}, <div>{offersFile[i]}</div>, <IMG
                    type={format}/>, <input className="downloadFileFromGeneral download" type="submit" value="скачать"
                                            onClick={() => {
                                                downloadFile(offersFile[i])
                                            }}/>);
            } else {

            }
        }

    }

    return React.createElement("div", {className: "elementContainer"}, arr)
}


const CommonOffer = () => {

    const [listFile, setFileList] = useState(<FileList/>);

    const [viewChange, setViewChange] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [view, setView] = React.useState('');
    const offersData =  useSelector(state => store.getState().offers.offer)
    const [status, setStatus] = React.useState(`${localStorage.getItem('status')}`);


    if (offersData.category == 1) {
        offersData.category = "По организации производства"
    }
    if (offersData.category == 2) {
        offersData.category = "По улучшению существующих процессов и продукции"
    }
    if (offersData.category == 3) {
        offersData.category = "Рационализаторское предложение"
    }


let nameStatus;

    if (offersData.status == 1) {
        nameStatus = "Подано"
    }
    if (offersData.status == 2) {
        nameStatus = "Рассматривается первоначальной рабочей группой"
    }
    if (offersData.status == 3) {
        nameStatus = "Отклонено первоначальной рабочей группой"
    }
    if (offersData.status == 4) {
        nameStatus = "Направлено в подразделения для подготовки заключения и предварительного обоснования"
    }
    if (offersData.status == 5) {
        nameStatus = "Рассматривается рабочей группой"
    }
    if (offersData.status == 6) {
        nameStatus = "Отклонено рабочей группой после рассмотрения подразделением(ями)"
    }
    if (offersData.status == 7) {
        nameStatus = "Направлено секретарю комиссии"
    }
    if (offersData.status == 8) {
        nameStatus = "Запланировано к рассмотрению комиссией"
    }
    if (offersData.status == 9) {
        nameStatus = "Рассмотрено комиссией. Оформление результатов"
    }
    if (offersData.status == 10) {
        nameStatus = "Результаты рассмотрения комиссией оформлены"
    }
    if (offersData.status == 11) {
        nameStatus = "Отклонено комиссией"
    }
    if (offersData.status == 12) {
        nameStatus = "Направлено для внедрения"
    }
    if (offersData.status == 13) {
        nameStatus = "Внедрено"
    }

    if (offersData.view == 1) {
        offersData.view = "Новые объекты на производстве"
    }
    if (offersData.view == 2) {
        offersData.view = "Улучшение технологии"
    }
    if (offersData.view == 3) {
        offersData.view = "Улучшение конструкции"
    }
    if (offersData.view == 4) {
        offersData.view = "Улучшение организации производства"
    }
    if (offersData.view == 5) {
        offersData.view = "Улучшение поддерживающей системы"
    }

    ///////////////////// MULTISELECT_ROLE_FOR_WG
    function AdminChange(props) {
        const isAdmin = props.isAdmin;
        if (isAdmin == 'wg') {
            return <IsAdminRG/>;

        } else {
            return <IsAdminUser/>
        }
    }




    function changeViewMultiSelect() {

        if (viewChange == true) {
            setViewChange(false)

        }
        if (viewChange == false) {
            setViewChange(true)
        }

    }


    function MultiSelectChange(props) {
        const viewChange = props.viewChange
        if (viewChange == false) {
            return <div>
                <Button onClick={changeViewMultiSelect}>Редактировать</Button>

            </div>;

        }
        if (viewChange == true) {
            return (
                <Multiselect/>
            )
        }
    }

    function saveStatus() {


        toStatus(offerId, view, category, status)
        setViewChange(false)
        alert("Изменения сохранены")
    }

    let offerId = localStorage.getItem("idOffers")

    function Multiselect() {
        return (
            <div>
                <div className={s.navMultiSel}>
                    <Button onClick={changeViewMultiSelect}>Отменить</Button>
                    <Button onClick={saveStatus}>Сохранить</Button>
                </div>

                <div className={s.multiselect}>

                    <div className={s.fallen}><span>Категория предложения:</span><span
                        className={s.spanCat}>{categoryView(category)}</span>


                        <Box className={s.boxF} sx={{width: 300,}}>
                            <FormControl fullWidth sx={{width: (100 % -0),}} component="fieldset">
                                <InputLabel id="demo-simple-select-label">Категория</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="category"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">

                                    </MenuItem>
                                    <MenuItem value={1}>По организации производства</MenuItem>
                                    <MenuItem value={2}>По улучшению существующих процессов и продукции</MenuItem>
                                    <MenuItem value={3}>Рационализаторское предложение</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className={s.fallen}><span>Вид предложения:</span><span
                        className={s.spanCat}>{viewOfView(view)}</span>
                        <Box className={s.boxF} sx={{width: 300,}}>
                            <FormControl fullWidth sx={{width: (100 % -0),}} component="fieldset">
                                <InputLabel id="demo-simple-select-label">Вид</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={view}
                                    label="view"
                                    onChange={handleChangeView}
                                >
                                    <MenuItem value="">
                                        <em></em>
                                    </MenuItem>
                                    <MenuItem value={1}>Новые объекты на производстве</MenuItem>
                                    <MenuItem value={2}>Улучшение технологии</MenuItem>
                                    <MenuItem value={3}>Улучшение конструкции</MenuItem>
                                    <MenuItem value={4}>Улучшение организации производства</MenuItem>
                                    <MenuItem value={5}>Улучшение поддерживающей системы</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className={s.fallen}><span>Статус:</span>
                        <span className={s.spanCat}>{statusOfView(status)}</span>
                        <Box className={s.boxF} sx={{width: 300,}}>
                            <FormControl fullWidth sx={{width: (100 % -0),}} component="fieldset">
                                <InputLabel id="demo-simple-select-label">Статус</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="status"
                                    onChange={handleChangeStatus}
                                >
                                    <MenuItem value="">
                                        <em></em>
                                    </MenuItem>
                                    <MenuItem value={1}>Подано</MenuItem>
                                    <MenuItem value={2}>Рассматривается первоначальной рабочей группой</MenuItem>
                                    <MenuItem value={3}>Отклонено первоначальной рабочей группой</MenuItem>
                                    <MenuItem value={4}>Направлено в подразделения для подготовки заключения и
                                        предварительного
                                        обоснования</MenuItem>
                                    <MenuItem value={5}>Рассматривается рабочей группой</MenuItem>
                                    <MenuItem value={6}>Отклонено рабочей группой после рассмотрения
                                        подразделением(ями)</MenuItem>
                                    <MenuItem value={7}>Направлено секретарю комиссии</MenuItem>
                                    <MenuItem value={8}>Запланировано к рассмотрению комиссией</MenuItem>
                                    <MenuItem value={9}>Рассмотрено комиссией. Оформление результатов</MenuItem>
                                    <MenuItem value={10}>Результаты рассмотрения комиссией оформлены</MenuItem>
                                    <MenuItem value={11}>Отклонено комиссией</MenuItem>
                                    <MenuItem value={12}>Направлено для внедрения</MenuItem>
                                    <MenuItem value={13}>Внедрено</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>
            </div>

        )


    }


    function IsAdminRG() {


        return (<div>


                <MultiSelectChange viewChange={viewChange}/>

            </div>
        )
    }

    function IsAdminUser(props) {
        return (
            <div></div>
        )
    }


    ////////////////END_MULTISELECT_ROLE_FOR_WG


    const steps = ['Подано ', 'Первоначальное рассмотрение', 'Рассмотрение подразделениями', 'Рассмотрение комиссией', 'Внедрение'];



    const handleChange = (event) => {
        setCategory(event.target.value)

    };

    function categoryView(category) {
        if (category == 1) {
            return "По организации производства"
        }
        if (category == 2) {
            return "По улучшению существующих процессов и продукции"
        }
        if (category == 3) {
            return "Рационализаторское предложение"
        }
    }



    const handleChangeView = (event) => {
        setView(event.target.value);
    };

    function viewOfView(view) {
        if (view == 1) {
            return "Новые объекты на производстве"
        }
        if (view == 2) {
            return "Улучшение технологии"
        }
        if (view == 3) {
            return "Улучшение конструкции"
        }
        if (view == 4) {
            return "Улучшение организации производства"
        }
        if (view == 5) {
            return "Улучшение поддерживающей системы"
        }
    }




    let rejectStatus = ChangeStatRej()

    function ChangeStatRej(rejectStatus) {

        const ev = `${status}`

        if (ev == 1) {
            rejectStatus = -1;

            return rejectStatus
        }
        if (ev == 2) {
            rejectStatus = -1;

            return rejectStatus
        }
        if (ev == 3) {
            rejectStatus = 1;

            return rejectStatus
        }
        if (ev == 4 || ev == 5) {
            rejectStatus = -1;

            return rejectStatus
        }
        if (ev == 6) {
            rejectStatus = 2;

            return rejectStatus
        }

        if (ev == 7 || ev == 8 || ev == 9 || ev == 10) {
            rejectStatus = -1;

            return rejectStatus
        }
        if (ev == 11) {
            rejectStatus = 3;

            return `${rejectStatus}`
        }
        if (ev == 12 || ev == 13) {
            rejectStatus = -1;

            return `${rejectStatus}`
        }

    };




    let stepStatus = ChangeStatStep()

    function ChangeStatStep(stepStatus) {


        const ev = `${status}`
        if (ev == 1) {
            stepStatus = 0;
            return stepStatus
        }
        if (ev == 2) {
            stepStatus = 1;
            return stepStatus
        }
        if (ev == 3) {
            stepStatus = 1;
            return stepStatus
        }
        if (ev == 4 || ev == 5) {
            stepStatus = 2;
            return stepStatus
        }
        if (ev == 6) {
            stepStatus = 2;
            return stepStatus
        }

        if (ev == 7 || ev == 8 || ev == 9 || ev == 10) {
            stepStatus = 4;
            return stepStatus
        }
        if (ev == 11) {
            stepStatus = 4;
            return stepStatus
        }
        if (ev == 12 || ev == 13) {
            stepStatus = 5;
            return stepStatus
        }

    };



    const [rejectStatusOff, setRejectStatusOff] = React.useState(`${rejectStatus}`);
    const [stepStatusOff, setStepStatusOff] = React.useState(`${stepStatus}`);

    const handleChangeStatus = (event, status) => {
        setStatus(event.target.value);
        const ev = event.target.value;
        if (ev == 1) {
            setRejectStatusOff(-1);
            setStepStatusOff(0);
        }
        if (ev == 2) {
            setRejectStatusOff(-1);
            setStepStatusOff(1);
        }
        if (ev == 3) {
            setRejectStatusOff(1);
            setStepStatusOff(1);
        }
        if (ev == 4 || ev == 5) {
            setRejectStatusOff(-1);
            setStepStatusOff(2);
        }
        if (ev == 6) {
            setRejectStatusOff(2);
            setStepStatusOff(2);
        }

        if (ev == 7 || ev == 8 || ev == 9 || ev == 10) {
            setRejectStatusOff(-1);
            setStepStatusOff(3);
        }
        if (ev == 11) {
            setRejectStatusOff(3);
            setStepStatusOff(3);
        }
        if (ev == 12 || ev == 13) {
            setRejectStatusOff(-1);
            setStepStatusOff(4);
        }
    };


    function statusOfView(status) {
        if (status === 1) {
            return "Подано"
        }
        if (status === 2) {
            return "Рассматривается первоначальной рабочей группой"
        }
        if (status === 3) {
            return "Отклонено первоначальной рабочей группой"
        }
        if (status === 4) {
            return "Направлено в подразделения для подготовки заключения и предварительного обоснования"
        }
        if (status === 5) {
            return "Рассматривается рабочей группой"
        }
        if (status === 6) {
            return "Отклонено рабочей группой после рассмотрения подразделением(ями)"
        }
        if (status === 7) {
            return "Направлено секретарю комиссии"
        }
        if (status === 8) {
            return "Запланировано к рассмотрению комиссией"
        }
        if (status === 9) {
            return "Рассмотрено комиссией. Оформление результатов"
        }
        if (status === 10) {
            return "Результаты рассмотрения комиссией оформлены"
        }
        if (status === 11) {
            return "Отклонено комиссией"
        }
        if (status === 12) {
            return "Направлено для внедрения"
        }
        if (status === 13) {
            return "Внедрено"
        }
    }

    // const visibleMenu = () => {
    //     if(count=1){
    //         document.getElementsByTagName(Box).
    //     }
    // }
    const handleSubmit = (event) => {

        event.preventDefault();

        UploadFileCard('fileCard');


    }

    const isStepFailed = (step) => {
        return step == rejectStatusOff;
    };


  

    function UploadFileCard(file) {


        if (file === undefined) {
            return console.log('предложение без вложения файла');

        } else {

            let idOffers = localStorage.getItem('idOffers');
            let formData = new FormData();
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `${API_URL}api/auth/uploadMyCard`)

            formData.append("idOffers", idOffers);
            formData.append("myFileCard", document.getElementById(`${file}`).files[0]);

            xhr.send(formData);

            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let result = this.responseText;
                    setFileList(<FileList/>)

                }
            }
        }
    }



    return (
        <div className={s.nameOffer}>


            <div className={s.idOffer}>
                <div>№:{offersData.Id}</div>
                <div className={s.nameOfferHead}>. {offersData.nameOffer}</div>
            </div>
            <Box sx={{width: '100%'}}>
                <Stepper activeStep={stepStatusOff} sx={{
                    '@media screen and (max-width: 553px)': {
                        flexWrap: 'wrap'
                    }
                }}>
                    {steps.map((label, index) => {
                        const labelProps = {};
                        if (isStepFailed(index)) {
                            labelProps.optional = (
                                <Typography variant="caption" color="error">Отклонено</Typography>
                            );

                            labelProps.error = true;
                        }
                        return (
                            <Step key={label}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Box>


            <div id={"containerProperties"} className={s.propertiesOffer}>

                <AdminChange isAdmin={localStorage.getItem("userAdminOptions")}/>


            </div>

            <div className={s.cardOffer}>
                <div className={s.from}>
                    <div className={s.date}>Дата предложения: {offersData.date.slice(0, 10)}</div>
                    <div className={s.fieldOfCategoryOffer}>
                        <div className={s.nameCategoryOfOffer}>Автор предложения:</div>
                        <div style={{
                            fontWeight: 1000,
                            fontFamily: "serif",
                            padding: "10px"

                        }}>{offersData.surnameSendler} {offersData.nameSendler} {offersData.middlenameSendler}</div>
                        <AddSendlerOffers />
                       
                    </div>
                    <div className={s.fieldOfCategoryOffer}>
                        <div className={s.nameCategoryOfOffer}> Категория предложения:</div>
                        <div style={{
                            fontWeight: 1000,
                            fontFamily: "serif",

                            padding: "10px"
                        }}>{offersData.category}</div>
                    </div>
                    <div className={s.fieldOfCategoryOffer}>
                        <div className={s.nameCategoryOfOffer}> Вид предложения:</div>
                        <div style={{
                            fontWeight: 1000,
                            fontFamily: "serif",

                            padding: "10px"
                        }}>{offersData.view}</div>
                    </div>
                    <div className={s.fieldOfCategoryOffer}>
                        <div className={s.nameCategoryOfOffer}> Статус предложения:</div>
                        <div style={{
                            fontWeight: 1000,
                            fontFamily: "serif",

                            padding: "10px"
                        }}>{nameStatus}</div>
                    </div>
                </div>
                <div className={s.fieldOfCategoryOffer}> Содержание предложения:
                    <div style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        boxShadow: "0 0 2px rgba(0, 0, 0, 0.5)",
                        fontStyle: "italic"

                    }}> {offersData.textOffer}</div>
                </div>
                <div className={s.fieldOfCategoryOffer}> Описание проблемы:
                    <div style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        boxShadow: "0 0 2px rgba(0, 0, 0, 0.5)",
                        fontStyle: "italic"

                    }}> {offersData.descriptionProblem}  </div>
                </div>
            </div>
            <div className={s.fileContainerLayer}>
                <div id="listFile">Прикрепленные файлы</div>

                <div>  {listFile} </div>

                <form className="offersFile" onSubmit={handleSubmit}>
                    <input type="file" name="myFileCard" id="fileCard"></input>
                    <div className={s.buttonConfirm}>
                        <button id="form-button" className="form-btn-sendOffer" type="submit" value="submit"
                                onClick={() => setFileList(<FileList/>)}>Отправить
                            файл
                        </button>
                    </div>


                </form>
            </div>

        </div>

    )
}


export default CommonOffer;