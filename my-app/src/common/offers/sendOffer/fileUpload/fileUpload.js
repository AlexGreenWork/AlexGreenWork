import React from 'react';
import {API_URL} from "../../../../config";


function UploadFile(file){
    if (file === undefined){
        return console.log('предложение без вложения файла')

    }else{
   let fileTemp = document.getElementById(`${file}`).files[0]

    if(fileTemp === undefined){
        console.log('предложение без вложения файла')
    } else {

        console.log(fileTemp.data );

        let formData = new FormData();

        let xhr = new XMLHttpRequest();
        xhr.open('POST', `${API_URL}api/auth/upload`)

        formData.append("myFile",document.getElementById(`${file}`).files[0] );

        console.log(document.getElementById(`${file}`).files[0]);
        xhr.send(formData);

    }

    }
} 



//export default UploadFileForm;

export default UploadFile;