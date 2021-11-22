import React from 'react';

function UploadFileForm(){

    return(
        <form>
            <input type="file" name="myFile" id="file"></input>
            <input type="submit" onClick={ handleSubmit}></input>
        </form>
    )
}

const handleSubmit = (event) => {
      
    event.preventDefault();
    UploadFile();
     
}

function UploadFile(file){
   
    let formData = new FormData();
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3001/upload')
   // xhr.setRequestHeader("Content-type", "multipart/form-data");
    formData.append("myFile", document.getElementById("file").files[0]);
    
    console.log(document.getElementById(`${file}`).files[0]);
    xhr.send(formData);
   

} 



export default UploadFileForm;

