import React, {useContext, useState} from 'react';
import './fileList.css'
import {API_URL} from "../../../../config";
import { CompassOutlined } from '@ant-design/icons';




function Files(props){
    console.log(props)
    let idOffers = localStorage.getItem('idOffers');
    let elemFilesArr = []; //елементы  файлами
    let allfilesObj = JSON.parse(props.allFiles)
    let downloadFolder;
    if(props.dirName == "SendlerFiles"){
        downloadFolder = "SendlerFiles"
    } else if( props.dirName.slice(-1) == "R"){
        downloadFolder = 'ResponsibleRg/' +props.dirName.slice(0, 5);
       
    } else{
        downloadFolder = 'responsible' +props.dirName;
    }
   
    let numberOfFiles = allfilesObj[props.dirName].files.length;
   
    for(let j = 0; j < numberOfFiles; j++){

        let fileName = allfilesObj[props.dirName].files[j];
        let elFile = React.createElement("div", {className:"files", key:`keyFileContainer`+j} ,
            <div key={`keyFile`+j} className="files-name" onChange={(e) => {}}> {fileName} </div>, 
             <div className='btn-download'><input type="submit"  value="скачать"  onClick={()=>{ 
             window.location = `${API_URL}api/offers/downloadMyFile?idOffers=${idOffers}&folder=${downloadFolder}&fileName=${fileName}`;}}/> </div> );
        
        elemFilesArr.push(elFile)
      
    }

    return React.createElement("div", {className:"sendlerFiles"} ,<div className='files-list'>  Список файлов </div> , <div className='files-list-container'>   {elemFilesArr}</div>);
}



function Folders(props){
   
    let arrElem = []; // елементы с папками
    let elemFilesArr = []; //елементы  файлами
    let allfilesObj = JSON.parse(props.allFiles)
   

    let dirName = Object.keys(allfilesObj);
   
    
    for(let i = 0; i < dirName.length; i++ ){
       let fileName = allfilesObj[dirName[i]];   
       if(fileName !== undefined){
       
        if(dirName[i] !== "SendlerFiles"){
                let elem = React.createElement("div", {className:"responsible-block", key:`keyDirContainer`+i} ,
                    <div className='departament'>Подразделение: {allfilesObj[dirName[i]].department}</div> ,
                    <div  key={`keyDir`+i} className='responsible'> Член комиссии: {allfilesObj[dirName[i]].fioResp}</div>,
                    <div className='tabnum'>Табельный номер: {dirName[i].slice(0, 5)}</div> ,
                // <div className='division'>Участок/Отдел: {allfilesObj[dirName[i]].division}</div>,
                <Files allFiles = {props.allFiles} dirName = {dirName[i]} /> );
                 arrElem.push(elem) 
        } else {
            let elem = React.createElement("div", {className:"responsible-block", key:`keyDirContainer`+i} , 
                <div className='sendler' key={`keyDir`+i} > Файлы автора предложения: {allfilesObj[dirName[i]].fioResp}</div>,
                <Files allFiles = {props.allFiles} dirName = {dirName[i]} /> );
            arrElem.push(elem) 
       }
                 
        } else{
            
            elemFilesArr.push(React.createElement("div", {className:"qwer"} , <div> Нет файлов1</div>))
        }
        
    }
        if(allfilesObj[dirName[0]] !== undefined){
            return  React.createElement("div", {className:"files-block"}
             , <div> Файлы предложения{ arrElem}</div> )
        } else {
            
        }
    
}



let count = 0;

const FileList = () => {
   
    
    const [filesObj, setFilesObj] = useState(0);
    const [tabResp, setTabResp] = useState(0);
    
    window.addEventListener("popstate",function(e){
   
    },false);

    if(filesObj == 0){
        ReadDir();
        
    } else {
        
    }
    
    function ReadDir() {
        let idOffers = localStorage.getItem('idOffers');
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `${API_URL}api/files/allFiles`, true); 
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
              let resp = xhr.response
                
              
              let dirName = JSON.parse(xhr.response);
              let tabResp1 = Object.keys(dirName);
              setFilesObj(resp);
            
              if(count !== tabResp1.length){
                  if(tabResp1[count] !== "SendlerFiles"){
                   
                    setFilesObj(resp);
                    count++;
                  } else{
                   
                    count = 0;
                  }
               
              } else{
                
                count = 0;
              }
                            
            }
        }   
        xhr.send(`idOffers=${idOffers}`);
     
    }

   


    if(filesObj !== 0){
        return(
            <div>
              
            <Folders allFiles = {filesObj} tabResp = {tabResp}/>
            </div> 
       )
    } else{
        return(
            <div>
           Нет файлов
            </div> 
       )
    }
   
     


};

export default FileList;
