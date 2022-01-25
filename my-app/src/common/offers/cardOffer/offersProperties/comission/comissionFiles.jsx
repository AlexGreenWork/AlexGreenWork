import * as React  from 'react';
import  {useState} from 'react';
import { API_URL } from '../../../../../config';
import s from "../comission/comission.module.css";
import axios from 'axios';

function IMG(props) {
    return (
        <div className="imgFile">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50">

                <g>
                    <title>Layer 1</title>
                    <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_1" y2="1.66663"
                        x2="0.73774" y1="49.64471" x1="0.84703" fill="none" />
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_2" y2="2.10379" x2="0.84703"
                        y1="2.10379" x1="34.94534" stroke="#000" fill="none" />
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_4" y2="49.64471" x2="49.15297"
                        y1="12.70487" x1="49.26226" stroke="#000" fill="none" />
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_6" y2="13.03274" x2="49.26226"
                        y1="2.32237" x1="34.72676" stroke="#000" fill="none" />
                    <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_7" y2="13.90705"
                        x2="34.72676" y1="2.75953" x1="34.72676" fill="none" />
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_8" y2="13.46989" x2="34.72676"
                        y1="13.57918" x1="49.04368" stroke="#000" fill="none" />
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_9" y2="49.09826" x2="3.46997"
                        y1="36.63926" x1="3.36068" stroke="#000" fill="none" />
                    <line transform="rotate(1.43372 5.35885 36.5227)" stroke="#000" stroke-linecap="undefined"
                        stroke-linejoin="undefined" id="svg_10" y2="36.63926" x2="2.92353" y1="36.40613" x1="7.79418"
                        fill="none" />
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_11" y2="41.77587" x2="3.36068"
                        y1="41.77587" x1="6.3115" stroke="#000" fill="none" />
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_12" y2="49.31684" x2="10.68308"
                        y1="36.42068" x1="10.68308" stroke="#000" fill="none" />
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_13" y2="49.53542" x2="13.52461"
                        y1="36.42068" x1="13.63389" stroke="#000" fill="none" />
                    <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_14" y2="49.20755"
                        x2="13.03297" y1="49.09826" x1="17.45903" fill="none" />
                    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_15" y2="49.42613" x2="20.847"
                        y1="36.52997" x1="20.62842" stroke="#000" fill="none" />
                    <line stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_16" y2="49.09826"
                        x2="20.30427" y1="49.09826" x1="24.56284" fill="none" />
                    <line transform="rotate(-2.33302 22.1038 43.3606)" stroke-linecap="undefined"
                        stroke-linejoin="undefined" id="svg_17" y2="43.30592" x2="20.73771" y1="43.41521"
                        x1="23.46995" stroke="#000" fill="none" />
                    <line transform="rotate(5.38926 22.4317 36.9671)" stroke="#000" stroke-linecap="undefined"
                        stroke-linejoin="undefined" id="svg_18" y2="37.18571" x2="20.51913" y1="36.74855"
                        x1="24.34426" fill="none" />
                </g>
            </svg>
            {props.type}


        </div>
    )
}

function downloadFile(obj) {
   
    let idOffers = localStorage.getItem('idOffers');
    window.location = `${API_URL}api/offers/downloadMyFile?idOffers=${idOffers}&folder=StatementFile&fileName=${obj}`;
}

function FilesObject(props){

    for (let i = 0; i < props.fileName.length; i++) {
        if (props.fileName[i] === '.') {
                    let format = props.fileName.slice(i);
                   
                    return(
                        <div className = "fileElement">
                           
                           <IMG type={format} />
                           <div>{props.fileName}</div>
                           <input className="downloadFileFromGeneral download" type="submit" value="скачать"
                            onClick={() => {
                                downloadFile(props.fileName)
                            }} />
                            {/* {props.fileName} */}
                        </div>
                    )
                }
     
    }
  
}


function Creationfies(props){
  
    if(props.arr === "null files"){
      
        return (
            <div>
                Нет файлов
            </div>
        )
    } else {
        return props.arr.map((name, key)=>{  return <FilesObject key={'StatementFile'+key} fileName = {name}/>})
    }
}



function StatementFileList(props) {
   
    const [fileList, setFileList] = useState(null)
    
    let idOffers = localStorage.getItem('idOffers');
 
    
    const handleSubmitStatement = (event) => {

        event.preventDefault();
        
        UploadStatementFile("StatementFile");
     
    }


    function  UploadStatementFile(file){
     
       
        if (file === undefined) {
            return console.log('предложение без вложения файла');

        } else {

            let idOffers = localStorage.getItem('idOffers');
            let formData = new FormData();
            let xhr = new XMLHttpRequest();
            xhr.open('POST', `${API_URL}api/files/StatementFileUpload`, true)

            formData.append("idOffers", idOffers);
            formData.append("StatementFile", document.getElementById(`${file}`).files[0]);
            // console.log(document.getElementById(`${file}`).files[0])
            
            xhr.send(formData);
            
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    setFileList(null)
                
                }
            }
        }
    }

    if(fileList === null){
        axios.post(`${API_URL}api/files/StatementFileList`, {  idOffers : idOffers,
    
        })
        .then(res => {
               
            setFileList(res.data)
           
        })
        return(
            <div>
              нет файлов
            </div>
        )
    } else{
      
        if(localStorage.getItem('userAdminOptions') === "wg" || localStorage.getItem('userAdminOptions') === "admin"){
             
            return (
                <div>
               
                <Creationfies arr = {fileList}/>
                <form onSubmit={handleSubmitStatement} >
                <input type="file" name="StatementFile" id='StatementFile' />
                <button id="form-button" className="form-btn-sendOffer" type="submit" value="submit" >Загрузить файл1 </button>
                </form>

                </div>
            
            )
        } else {
            return (
                <div>
                    <Creationfies arr = {fileList}/>
                </div>
            
            )
        }
        
    }

}

function StatementFiles(){

}



    export default StatementFileList;