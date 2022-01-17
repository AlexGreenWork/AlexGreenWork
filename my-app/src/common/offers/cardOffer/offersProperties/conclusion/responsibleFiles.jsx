import React, {useEffect, useState} from "react";
import {API_URL} from "../../../../../config";
import s from "./conclusion.module.css"
import axios from "axios";

function FilesList(props){
    const [filesList, setFilesList] = useState(null);

    let idOffers = localStorage.getItem('idOffers');
    let tabelNum = localStorage.getItem('userTabelNum');
      
    if(filesList === null){
        
        axios.post(`${API_URL}api/files/FilesListResponsible`, {  tabelNum: tabelNum,
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
                   <CreateFilelist fileList = {filesList} />
                </div>
                )
      
            } else{
                return(
                    <div>
                       <CreateFilelist fileList = {props.filesData} />
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
       
        return <FilesBlock key={'respFilesList'+key} fileName={count}/>})
    }
   
}

function FilesBlock(props){
   
    let idOffers = localStorage.getItem('idOffers');
    let tabelNum = localStorage.getItem('userTabelNum');
    let downloadFolder = `responsible${tabelNum}`;

    return(
        <div>
            <div className="files-name" onChange={(e) => {}}> {props.fileName} </div> 
             <div className='btn-download'><input type="submit"  value="скачать"  onClick={()=>{ 
             window.location = `${API_URL}api/offers/downloadMyFile?idOffers=${idOffers}&folder=${downloadFolder}&fileName=${props.fileName}`;}}/> </div>
        </div>
    )
}

function FilesResponsible(){

    const [filesListComponent, setFilesListComponent] = useState(<FilesList/>);

    return (
        <div>
            {filesListComponent}
             <input type="file" name="myFileResp" id="myfile" className={s.buttonS}/>
             <button onClick={()=>{
                let idOffers = localStorage.getItem('idOffers');
                let tabelNum = localStorage.getItem('userTabelNum');
                let formData = new FormData();               
                
                formData.append("idOffers", idOffers);
                formData.append("tabelNum", tabelNum);
                formData.append("myFileResp", document.getElementById(`myfile`).files[0]);
               
                let xhr = new XMLHttpRequest();
                xhr.open('POST', `${API_URL}api/files/FilesResponsible`)
              
                console.log(document.getElementById(`myfile`).files[0])
                xhr.send(formData);
                xhr.onreadystatechange = function () {

                if (this.readyState == 4 && this.status == 200) {
                    let result = this.responseText;

                            axios.post(`${API_URL}api/files/FilesListResponsible`, {  tabelNum: tabelNum,
                                                                                      idOffers: idOffers
                    
                            })
                            .then(res => {
                            
                                setFilesListComponent(<FilesList filesData={res.data}/>)
                            
                            })
            
                    
                   console.log(result)
                }
            }
           

             }}>Загрузить файл</button>
        </div>
       
    )
}

export default FilesResponsible