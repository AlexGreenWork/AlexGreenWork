import * as React from 'react';
// import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import  {useState} from 'react';
// import DateTimePicker from '@mui/lab/DateTimePicker';

// import {useDispatch, useSelector} from "react-redux";

import s from "../comission/comission.module.css";
import CardOfferUpload from "../../../../components/card/card";
import DndOffer from "../../../../components/dnd/dnd";

import Button from "@material-ui/core/Button";
import { API_URL } from '../../../../../config';
import {toDbDateComission} from "../../../../../actions/offers";


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


function FileCommissionList(props) {
    
    if(props.req !== "null" ){
       
        let offersFile = JSON.parse(props.req);
        let arr = new Array();
        arr = offersFile
        console.log(offersFile)
        for (let i = 0; i < offersFile.length; i++) {
            for (let j = 0; j < offersFile[i].length; j++) {
    
                if (offersFile[i][j] == '.') {
    
    
                    let format = offersFile[i].slice(j)
                    arr[i] = React.createElement("div", {className: "fileElement"}, <div>{offersFile[i]}</div>, <IMG
                        type={format}/>, <input className="downloadFileFromGeneral download" type="submit" value="??????????????"
                                                onClick={() => {
                                                    downloadFile(offersFile[i])
                                                }}/>);
                } else {
    
                }
            }
    
        }
    
        return React.createElement("div", {className: "elementContainer"}, arr)
    } else{
        return React.createElement("div", {className: "elementContainer"}, <label>?????? ????????????</label>)
    }
    }
    

function downloadFile(obj) {
    // console.log(obj.props.children[0].props.children)
     let idOffers = localStorage.getItem('idOffers');
     window.location = `${API_URL}api/offers/downloadMyFile?idOffers=${idOffers}&folder=conclusionCommission&fileName=${obj.props.children[0].props.children}`;
 }


const ComissionOffer = () => {

    const [requestDir, setRequestDir] = React.useState(0);
    const [dateComission, setDateComission] = React.useState('');
    const [listFileComission, setListFileComission] = React.useState(<FileCommissionList req="null"/>);
    

    if(requestDir === 0){
        ReadDir();
        console.log('?????????????? ???????????????????? requestDir === 0');
    }
   // ReadDir();

    const handleSubmit = (event) => {

        event.preventDefault();
        UploadFileComission('file');
        //setRequestDir(0);
    }

    function UploadFileComission(file) {


        if (file === undefined) {
            return console.log('?????????????????????? ?????? ???????????????? ??????????');
    
        } else {
    
            let idOffers = localStorage.getItem('idOffers');
            let formData = new FormData();
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `${API_URL}api/auth/conclusComissionUpload`, true)
    
            formData.append("idOffers", idOffers);
            formData.append("fileConcCommission", document.getElementById(`${file}`).files[0]);
            console.log(document.getElementById(`${file}`).files[0])
            console.log(formData)
            xhr.send(formData);
    
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    
                    ReadDir();
                   // setListFileComission(<FileList1 req={requestDir}/>)
                   
                }
            }
        }
    }
    function ReadDir() {
        let idOffers = localStorage.getItem('idOffers');
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `${API_URL}api/files/FilesConclusionCommission`, true); 
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               
                console.log(xhr.response)  
                setRequestDir(xhr.response);
                setListFileComission(<FileCommissionList req={xhr.response}/>)
                
                
            }
        }   
        
        xhr.send(`idOffers=${idOffers}`);
    }
    

    const handleChange = (newValue) => {

        setDateComission(newValue);
    };


    const [viewChangeCom, setViewChangeCom] = React.useState('');


    function changeViewMultiSelect() {

        if (viewChangeCom == true) {
            setViewChangeCom(false)

        }
        if (viewChangeCom == false) {
            setViewChangeCom(true)
        }

    }

    function MultiSelectChangeCom(props) {
        const viewChangeCom = props.viewChangeCom
        if (viewChangeCom == false) {
            return <div>
                <Button sx={{
                    border:'1px solid lightblue',
                    boxShadow: '1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);',
                    margin: '10px'
                }}
                        onClick={changeViewMultiSelect}>??????????????????????????</Button>

            </div>;

        }
        if (viewChangeCom == true) {
            return (
                <div>
                    <div className={s.navMultiSel}>
                        <Button onClick={changeViewMultiSelect}>????????????????</Button>
                        <Button onClick={saveDateComission}>??????????????????</Button>
                    </div>

                    <div className={s.FormControl}>

                        <label htmlFor="" className={s.labelCalender} data-shrink="true">????????</label>
                        <div className={s.inputCalender}>
                            <input type="datetime-local"

                                   value={dateComission}
                                   onChange={e => handleChange(e.target.value)}
                                   renderInput={(params) => <TextField {...params} />}
                            ></input>

                            <fieldset aria-hidden="true"
                                      className={s.OutlineCalender}>
                                <legend className="css-186xcr5"></legend>
                            </fieldset>
                        </div>
                    </div>
                </div>
            )
        }
    }

    function IsAdminRG() {


        return (<div>
                <MultiSelectChangeCom viewChangeCom={viewChangeCom}/>
                {listFileComission}
                <form onSubmit={handleSubmit}>
                <input type="file" name="filename" id='file'/>
                <button id="form-button" className="form-btn-sendOffer" type="submit" value="submit" >?????????????????? ???????? </button>

            </form>
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
            return <IsAdminRG/>;

        } else {
            return <IsAdminUser/>
        }
    }

    let offerId = localStorage.getItem("idOffers")

    function saveDateComission() {
        let T = /[T]/;
        let str = `${dateComission}`;
        let newstr = str.replace(T, " ?? ");
        localStorage.setItem('dateComission', newstr )
        toDbDateComission(offerId, dateComission)
        setViewChangeCom(false)
        alert("?????????????????? ??????????????????")
    }


    /////////////////////////////
    // const [dateComision, setDateComision] = React.useState('');
    //
    // const handleChangeView = (event) => {
    //     setDateComision(event.target.value);
    // };


 let dateCom = localStorage.getItem('dateComission')
    return (


        <div className={s.nameOffer}>
            <div>???????? ?????????????????? ????????????????: {dateCom}</div>


            <AdminChange isAdmin={localStorage.getItem("userAdminOptions")}/>


            <div className={s.uploadContainer} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div>
                    ???????? ??????????????????:
                </div>
                <div className={s.filesContainer}>
                   {/*  <CardOfferUpload/> */}
                </div>
                {/* <DndOffer/> */}
            </div>
           
            
            <div>?????????????? ?????????????????? ??????????????</div>
            <div>???????? ??????????????</div>
            <div>???????????????? ????????????????????????????</div>

        </div>
    )
}
export default ComissionOffer;