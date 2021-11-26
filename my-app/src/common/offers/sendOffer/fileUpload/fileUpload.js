import {API_URL} from "../../../../config";


function UploadFile(file){

    console.log(file)
    if (file === undefined){
        return console.log('предложение без вложения файла');
        

    }else{

   let fileTemp = document.getElementById(`${file}`).files[0]
   console.log(fileTemp);
    
   if(fileTemp === undefined){
        console.log('предложение без вложения файла')
    } else {

        console.log("фронт" );
       
        let formData = new FormData();

        let xhr = new XMLHttpRequest();
        xhr.open('POST', `${API_URL}api/auth/upload`)
        // xhr.setRequestHeader("Content-type", "multipart/form-data");
        formData.append("myFile", document.getElementById(`${file}`).files[0] );

        //console.log(document.getElementById(`${file}`).files[0]);
        console.log(formData)
        xhr.send(formData);

    }

    }
} 




//export default UploadFileForm;

export default UploadFile;