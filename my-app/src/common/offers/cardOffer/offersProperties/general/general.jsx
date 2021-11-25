import React from "react";
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
import UploadFile from "../../../sendOffer/fileUpload/fileUpload";
import Context from "../../../../context/Context";
import {API_URL} from "../../../../../config";
import {useContext} from "react";
import {toStatus} from "../../../../../actions/offers";


function RequestSelectOffers() {
    let idOffers = localStorage.getItem('idOffers');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}api/offers/selectMyOffers`, false); /// СИНХРОННЫЙ ЗАПРОС!!!
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`selectOffers=${idOffers}`);

    return xhr.response
}

function ReadDir(){
    let idOffers = localStorage.getItem('idOffers');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_URL}api/offers/FilesMyOffers`, false); /// СИНХРОННЫЙ ЗАПРОС!!!
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`idOffers=${idOffers}`);

    return xhr.response
}



 

function FileList(){
  let offersFile = JSON.parse(ReadDir());
  let arr = new Array
  arr = offersFile

 for(let i=0; i<offersFile.length; i++){
     arr[i] =  React.createElement("div", null, offersFile[i]); 
 }

  return React.createElement("div", null, arr)
}


const CommonOffer = () => {
    let offersData = JSON.parse(RequestSelectOffers());  //Данные из запроса
   
    

    ///////////////////// MULTISELECT_ROLE_FOR_WG
    function AdminChange(props) {
        const isAdmin = props.isAdmin;
        if (isAdmin == 'wg') {
            return <IsAdminRG/>;

        } else {
            return <IsAdminUser/>
        }
    }


    const [viewChange, setViewChange] = React.useState('');


    function changeViewMultiSelect() {

        if (viewChange == true) {
            setViewChange(false)

        }
        if (viewChange == false) {
            setViewChange(true)
        }

    }
    function saveMultiSelect(){
        setViewChange(false)
    }

    function MultiSelectChange(props) {
        const viewChange =  props.viewChange
        if (viewChange == false) {
            return <div>
                <Button onClick={changeViewMultiSelect}>Редактировать</Button>

            </div>;

        } if (viewChange == true) {
            return (
                <Multiselect/>
            )
        }
    }
 let offerId = localStorage.getItem("idOffers")
function Multiselect() {
        return(
            <div>
                <div className={s.navMultiSel}>
                    <Button onClick={changeViewMultiSelect}>Отменить</Button>
                    <Button onClick={() => toStatus(offerId, view, category, status)}>Сохранить</Button>
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
                            <FormControl fullWidth sx={{width: (100 % -0),}} component="fieldset"
                                         sx={{width: (100 % -0),}}>
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
                            <FormControl fullWidth sx={{width: (100 % -0),}} component="fieldset"
                                         sx={{width: (100 % -0),}}>
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



                <MultiSelectChange viewChange={viewChange} />

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

    const [category, setCategory] = React.useState('');

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

    const [view, setview] = React.useState('');

    const handleChangeView = (event) => {
        setview(event.target.value);
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

    const [status, setStatus] = React.useState('');


    const [rejectStatusOff, setRejectStatusOff] = React.useState('');
    const [stepStatusOff, setStepStatusOff] = React.useState('');

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
        let btnFormON = document.querySelector('.close-btn');

        if (btnFormON == null) {

            UploadFile('file');

        } else {
            console.log(".close-btn true");
        }


    }

    const isStepFailed = (step) => {
        return step === rejectStatusOff;
    };
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
                    <div className={s.date}>{offersData.date.slice(0, 10)}</div>
                    <div
                        className={s.from}>{offersData.surnameSendler} {offersData.nameSendler} {offersData.middlenameSendler}</div>
                    <div> Статус предложения: {offersData.status}</div>
                </div>
                <div className={s.offerText}>{offersData.textOffer} </div>
            </div>
            <div>
                <div id="listFile">Прикрепленные файлы</div>
                <div> {FileList()} </div>

                <form className="offers" onSubmit={handleSubmit}>
                    <input type="file" name="myFile" id="file"></input>
                    <div className={s.buttonConfirm}>
                        <button id="form-button" className="form-btn-sendOffer" type="submit" value="submit">Отправить
                            файл
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}


export default CommonOffer;