import React, {useState} from 'react';
import "../personalCabinet.module.css"
import { API_URL } from '../../../config';
import axios from 'axios';
import s from "./myFiles.module.css"
import "../myFiles/myfiles.css"


function downloadFile(idOffers, fileName) {
     window.location = `${API_URL}api/offers/downloadMyFile?idOffers=${idOffers}&folder=SendlerFiles&fileName=${fileName}`;
 }
 
 function downloadFileWG(idOffers, fileName) {
     
    let tabNum = localStorage.getItem('userTabelNum');
    window.location = `${API_URL}api/offers/downloadMyFile?idOffers=${idOffers}&folder=responsible${tabNum}&fileName=${fileName}`;
}

function FilesOne(props){
      
    return (
        <div className='filesRow'> 
            <div className='number'>{props.number+1}</div>
            <div >{props.fileName}</div>
            <button onClick={()=>{downloadFile(props.idOffers, props.fileName)}}>Скачать</button>
        </div>
    )
}

function FilesBlock(props){
 
   let a = props.filesData.length

  // console.log("qwef")
    if(a !== 0 && props.filesData !== 0){
     
        return props.filesData.map((count, i)=><FilesOne key={'fileList'+count} number = {i}fileName={count} idOffers = {props.idOffers} />)
    } else {
       
       
       
        return(
            <div>
                Нет Файлов
            </div>
        )
    }
   
}

function FilesList(props){
/*     const [reqFiles, setReqFiles] = useState(0);
   
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
 */
   

    return <div className='filesList'>
       
       <FilesBlock filesData = {props.filesList} idOffers = {props.idOffers}/>
    </div>
}



function OffersBlock(props){

    const [reqMyFile, setMyFile] = useState(0);
    if(reqMyFile === 0){
        try{
            axios.post(`${API_URL}api/offers/FilesMyOffers`, {  idOffers: props.id,
                                                    
                                                        })
                                                        .then(res => {
                                                          setMyFile(res.data)
                                                         // console.log(res.data)
                                                          
                                                        })
        } catch (e){
            alert(e.response.message)
        }
    }
   
    if(reqMyFile === 0 || reqMyFile.length === 0){
        return <div id={props.id}>   </div>
    } else{

        return <div id={props.id} className='offersBlock'>  
       
        <div className='offersNameblock' >
        
          <div className='offersName'>
              №{props.id} {props.nameOffer}
          </div>
        </div>
        <FilesList idOffers = {props.id} filesList = {reqMyFile}/>
    </div>
    }
   

    
}

function OfferList(props){
    console.log(props)
  
    return props.offers.map((count)=><OffersBlock key={'offerList'+count.Id} id={count.Id} nameOffer={count.nameOffer}/>)
}

function FilesWg(props){
   
    return(
        <div className='filesRow'>{props.listFile}
         <div className='number'>{props.number+1}</div>
         <button onClick={()=>{downloadFileWG(props.idOffers, props.listFile)}}>Скачать</button>
        </div>
    )
}

function WgListFile(props){
    
    return props.listFile.map((count, i)=><FilesWg key={'FilesWg'+count.Id} number={i} listFile = {count} idOffers = {props.idOffers}/>)
}


function WgBlock(props){
   
     return <div  className='offersBlock'>  
                 <div >
                 <div className="offersName">№{props.id} {props.nameOffer}</div>
                 </div>
                
                     <div className='wg-block'>
                     <WgListFile listFile = {props.listFile} idOffers = {props.id}/>
                     </div>
                 
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
                <div className='filesWG'>Файлы рабочей группы</div>
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

            <div className={`${s.personalCabinetContainer} `}  >
               <div className='blockname'>Мои файлы</div> 
                <OfferList  offers={reqMyOff}/>
                <WgFilesList/>
            </div>
        )
    }
    
}

export default MyFiles;