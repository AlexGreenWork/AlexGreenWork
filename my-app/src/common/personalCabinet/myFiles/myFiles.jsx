import React, {useState} from 'react';
import "../personalCabinet.module.css"
import { API_URL } from '../../../config';
import axios from 'axios';
import s from "./myFiles.module.css"


function downloadFile(idOffers, fileName) {
     window.location = `${API_URL}api/offers/downloadMyFile?idOffers=${idOffers}&folder=SendlerFiles&fileName=${fileName}`;
 }
 
 function downloadFileWG(idOffers, fileName) {
     
    let tabNum = localStorage.getItem('userTabelNum');
    window.location = `${API_URL}api/offers/downloadMyFile?idOffers=${idOffers}&folder=responsible${tabNum}&fileName=${fileName}`;
}

function FilesOne(props){
 
    return (
        <div> 
            <button onClick={()=>{downloadFile(props.idOffers, props.fileName)}}>Скачать</button>
            <div className="div">{props.fileName}</div>
        </div>
    )
}

function FilesBlock(props){
    if(props.filesData !== 0){
       
        return props.filesData.map((count)=><FilesOne key={'fileList'+count} fileName={count} idOffers = {props.idOffers} />)
    } else {
        return(
            <div>
                Нет Файлов
            </div>
        )
    }
   
}

function FilesList(props){
    const [reqFiles, setReqFiles] = useState(0);
   
    if(reqFiles === 0){
        try{
            axios.post(`${API_URL}api/offers/FilesMyOffers`, {  idOffers: props.idOffers,
                                                    
                                                        })
                                                        .then(res => {
                                                           
                                                           setReqFiles(res.data)
                                                          
                                                        })
        } catch (e){
            alert(e.response.message)
        }
    }

   

    return <div>
        список файлов
       <FilesBlock filesData = {reqFiles} idOffers = {props.idOffers}/>
    </div>
}



function OffersBlock(props){
  
    return <div>  
                <div>Название предложения</div>
                <div>№{props.id} {props.nameOffer}</div>
                <FilesList idOffers = {props.id}/>
            </div>

    
}

function OfferList(props){

    return props.offers.map((count)=><OffersBlock key={'offerList'+count.Id} id={count.Id} nameOffer={count.nameOffer}/>)
}

function FilesWg(props){
    console.log(props)
    return(
        <div>{props.listFile}
         <button onClick={()=>{downloadFileWG(props.idOffers, props.listFile)}}>Скачать</button>
        </div>
    )
}

function WgListFile(props){
    
    return props.listFile.map((count)=><FilesWg key={'FilesWg'+count.Id} listFile = {count} idOffers = {props.idOffers}/>)
}


function WgBlock(props){
    console.log(props)
     return <div>  
                 <div>Название предложения</div>
                 <div>№{props.id} {props.nameOffer}</div>
                 <WgListFile listFile = {props.listFile} idOffers = {props.id}/>
             </div>
 
     
 }

function WgList(props){
 
   return props.dataFiles.map((count)=> {
       
       let idOffers =  count[count.length-2]
       let arr = count.slice(0, count.length-2)
       let nameOffer =  count[count.length-1]
       
        return <WgBlock key={'WgList'+count} id={idOffers} nameOffer={nameOffer} listFile={arr}/>
    
    })
}


function WgFilesList(){
  
    const [reqMyFileWg, setMyFileWg] = useState(0);
    let userTabelNum = localStorage.getItem('userTabelNum');
   
    let role = localStorage.getItem('userAdminOptions');
    if(role === 'wg'){

        if(reqMyFileWg === 0){
            try{
                axios.post(`${API_URL}api/files/myFilesWG`, {  userTabelNum: userTabelNum,
                                                             
                                                          //  idOffers: idOffers,
                                                            })
                                                            .then(res => {
                                                               
                                                               setMyFileWg(res.data)
                                                             
                                                                
                                                            })
            } catch (e){
                alert(e.response.message)
            }
        
        }
    }
    

 if(reqMyFileWg === 0){
        return(

            <div className={s.personalCabinetContainer} >
                Файлов нет
                
            </div>
        )
    } else{
        return(

            <div className={s.personalCabinetContainer} >
                <div>Файлы рабочей группы</div>
                <WgList dataFiles={reqMyFileWg}/>
            </div>
        )
    }
}



const MyFiles = () => {

    const [reqMyOff, setReqMyOff] = useState(0);
    let userTabelNum = localStorage.getItem('userTabelNum');
    let userEmail = localStorage.getItem('userEmail');
    let role = localStorage.getItem('userAdminOptions');
    if(reqMyOff === 0){
        try{
            axios.post(`${API_URL}api/offers/myOffers`, {  tabelNumber: userTabelNum,
                                                           email: userEmail,
                                                     
                                                        })
                                                        .then(res => {
                                                            
                                                           setReqMyOff(res.data)
                                                       
                                                            
                                                        })
        } catch (e){
            alert(e.response.message)
        }
    
    }

   
    if(reqMyOff === 0){
        return(

            <div className={s.personalCabinetContainer} >
                Файлов нет
                <WgFilesList/>
            </div>
        )
    } else{
        return(

            <div className={s.personalCabinetContainer} >
                файлы
                <OfferList className={s.OffersBlock} offers={reqMyOff}/>
                <WgFilesList/>
            </div>
        )
    }
    
}

export default MyFiles;