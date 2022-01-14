import React, {useEffect, useState} from "react";
import {API_URL} from "../../../../../config";
import s from "./conclusion.module.css"
import axios from "axios";


function FilesRG(){

    const [filesList, setFiles] = useState(null);


    function UploadFileComission(file) {


        if (file === undefined) {
            return console.log('предложение без вложения файла');
    
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

    return (
        <div>
             <input type="file" name="filename" className={s.buttonS}/>
             <button onClick={()=>{}}>Загрузить файл</button>
        </div>
       
    )
}

export default FilesRG