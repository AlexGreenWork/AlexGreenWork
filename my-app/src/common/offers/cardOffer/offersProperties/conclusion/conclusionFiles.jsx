import React, {useEffect, useState} from "react";
import {API_URL} from "../../../../../config";
import s from "./conclusion.module.css"
import axios from "axios";

function FilesList(props){
    const [filesList, setFilesList] = useState(null);

    let idOffers = localStorage.getItem('idOffers');
    let tabelNum = props.tabNum;
      
    if(filesList === null){
        
        axios.post(`${API_URL}api/files/FilesListRespRg`, {  tabelNum: tabelNum,
            idOffers: idOffers

           })
           .then(res => {
           
               setFilesList(res.data)

           })

        return(
            <div>
               {/*  <CreateFilelist fileList = {filesList} /> */}
            </div>
            )
    } else {
       
        if(props.filesData === undefined){
           
            return(
                <div>
                   <CreateFilelist fileList = {filesList} tabNum={tabelNum}/>
                </div>
                )
      
            } else{
                return(
                    <div>
                       <CreateFilelist fileList = {props.filesData} tabNum={tabelNum}/>
                    </div>
                    )
        }
        
    }
    
}

function CreateFilelist(props){
    console.log(props)
    if(props.fileList === null || props.fileList  ==''){
        
        return <div>Нет файлов</div>
    } else {
        return props.fileList.map((count, key)=>{
       
        return <FilesBlock key={'respFilesList'+key} fileName={count} tabNum={props.tabNum}/>})
    }
   
}

function FilesBlock(props){
   
    let idOffers = localStorage.getItem('idOffers');
    let tabelNum = props.tabNum;
    let downloadFolder = `ResponsibleRg/${tabelNum}`;

    return(
        <div>
            <div className="files-name" onChange={(e) => {}}> {props.fileName} </div> 
             <div className='btn-download'><input type="submit"  value="скачать"  onClick={()=>{ 
             window.location = `${API_URL}api/offers/downloadMyFile?idOffers=${idOffers}&folder=${downloadFolder}&fileName=${props.fileName}`;}}/> </div>
        </div>
    )
}

function FilesRG(props){
    console.log(props)
    const [filesListComponent, setFilesListComponent] = useState(<FilesList tabNum={props.tabNum}/>);
    
    let idOffers = localStorage.getItem('idOffers');
    let tabelNum = props.tabNum;
    
    if(localStorage.getItem('userAdminOptions') === "wg"){
        return (
            <div>
                {filesListComponent}
                 <input type="file" name="myFileCard" id={"myfile"+props.tabNum} className={s.buttonS}/>
                 <button onClick={()=>{
                    
                    let formData = new FormData();               
                    
                    formData.append("idOffers", idOffers);
                    formData.append("tabelNum", tabelNum);
                    formData.append("myFileCard", document.getElementById(`myfile`+props.tabNum).files[0]);
                   
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', `${API_URL}api/files/FilesRespRg`)
                  
                    console.log(document.getElementById(`myfile`+props.tabNum).files[0])
                    xhr.send(formData);
                    xhr.onreadystatechange = function () {
    
                    if (this.readyState == 4 && this.status == 200) {
                        let result = this.responseText;
    
                                axios.post(`${API_URL}api/files/FilesListRespRg`, {  tabelNum: tabelNum,
                                                                                     idOffers: idOffers
                        
                                })
                                .then(res => {
                                    console.log(res.data)
                                    setFilesListComponent(<FilesList filesData={res.data} tabNum={tabelNum}/>)
                                
                                })
                
                        
                       console.log(result)
                    }
                }
               
    
                 }}>Загрузить файл</button>
            </div>
           
        )
    } else{
        axios.post(`${API_URL}api/files/FilesListRespRg`, {  tabelNum: tabelNum,
            idOffers: idOffers

        })
        .then(res => {
        console.log(res.data)
        setFilesListComponent(<FilesList filesData={res.data} tabNum={tabelNum}/>)

        })
        return (
            <div>
                {filesListComponent}
            </div>
            )
    }
    
}

export default FilesRG