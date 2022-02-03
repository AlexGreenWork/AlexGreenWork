import axios from 'axios'
import {addFile, deleteFileAction, setFiles} from "../reducers/fileReducer";
import {addUploadFile, changeUploadFile, showUploader} from "../reducers/uploadReducer";
import {hideLoader, showLoader} from "../reducers/appReducer";
import {API_URL} from "../config";
import server from "./server";
import {store} from "../reducers";


export function getFiles(dirId, sort) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            let url = `${API_URL}api/files`
            if (dirId) {
                url = `${API_URL}api/files?parent=${dirId}`
            }
            if (sort) {
                url = `${API_URL}api/files?sort=${sort}`
            }
            if (dirId && sort) {
                url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`
            }
            const response = await server.send_get_request(url);
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await server.send_post_request(`${API_URL}api/files`,{
                name,
                parent: dirId,
                type: 'dir'
            })
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const uploadFile = {name: file.name, progress: 0, id: Date.now()}
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))
            const response = await server.send_post_request(`${API_URL}api/files/upload`, formData, {
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploadFile(uploadFile))
                    }
                }
            });
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
}


export async function downloadFile(file) {
    const response = await fetch(`${API_URL}api/files/download?id=${file._id}`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await server.send_delete_request(`${API_URL}api/files?id=${file._id}`);
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
}

export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await server.send_get_request(`${API_URL}api/files/search?search=${search}`)
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e?.response?.data?.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}
export function saveRespRGAnnotationToDb(w) {
    return async () => {
        try {
            let respID = store.getState().offers.offer.responsibles_rg?.responsible_tabnum
            let id = localStorage.getItem("idOffers")
            if(respID == undefined){
                alert("Не возможно добавить аннотацию пока не выберите ответственного рабочей группы")
            }else {
                await server.send_post_request(`${API_URL}api/offers/saveRespRGAnnotationToDb`, {w, id, respID})
                // dispatch(setFiles(response.data))
            }
        } catch (e) {
            alert(e)
        }
    }
}

export function saveComissionAnnotationToDb(w) {
    return  () => {
        
            let comissionTabNum = localStorage.getItem("userTabelNum")
            let id = localStorage.getItem("idOffers")
            console.log(id,comissionTabNum,w)
            server.send_post_request(`${API_URL}api/offers/saveComissionAnnotationToDb`, {w, id, comissionTabNum})
    }
}


export function saveNotesToDb(actual, innovate, cost, duration,  tabNum, idOffer){
    return async ()=>{
        try{
            await axios.post(`${API_URL}api/offers/saveNotesToDbRG`, {actual, innovate, cost, duration, tabNum, idOffer})
        }catch(e){
            console.log(e)
        }
    }
}
export function closeConclusionRG(tabNum, idOffer){
    return async ()=>{
        try{
            await axios.post(`${API_URL}api/offers/closeConclusionResposible`, {tabNum, idOffer})
        }catch(e){
            console.log(e)
        }
    }
}
export function closeConclusionResponsible(tabNum, idOffer){
        return async ()=>{
        try{
            console.log(tabNum, idOffer)
            await axios.post(`${API_URL}api/offers/closeConclusionResponsible`, {tabNum, idOffer})
        }catch(e){
            console.log(e)
        }
    }
}

