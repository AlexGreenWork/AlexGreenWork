import React, {useEffect, useState} from "react";
import s from "./conclusion.module.css"
import FindWorkers from "../../../../personalCabinet/findWorkers/findWorkers";
import Button from "@material-ui/core/Button";
import ConclusionCard from "./conclusionCard";
import {store} from "../../../../../reducers";
import {API_URL} from "../../../../../config";
import axios from "axios";


console.log(store.getState().search.searchUser)

const ConclusionOffer = () => {



    const [viewChange, setViewChange] = React.useState(false);

    function changeViewSelect() {
        if (viewChange === true) {

            setViewChange(false)
        }
        if (viewChange === false) {
            setViewChange(true)
        }

    }

    function SelectChangeConclusionResponsible() {


        if (viewChange == false) {
            return (<div style={{
                    textAlign: "center"
                }}>
                    <Button sx={{
                        border: '1px solid lightblue',
                        boxShadow: '1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);',
                        margin: '10px'

                    }}
                            onClick={changeViewSelect}>Выбрать сотрудника</Button>

                </div>

            )
        }
        if (viewChange == true) {
            return (
                <div>
                    <div style={{
                        textAlign: "center"
                    }}> Выберите отвественного сотрудника по заключению от подразделения:
                    </div>

                    <div className={s.finder}>
                        <FindWorkers/>
                        <div style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Button style={{
                                width: "300px",
                                border: "1px solid #1890ff"
                            }} onClick={saveResponsible}>Добавить / Изменить
                            </Button>
                            <Button style={{
                                width: "300px",
                                border: "1px solid #1890ff"
                            }} onClick={changeViewSelect}>Отменить
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }

    }

    const [sCount, setSCount] = React.useState(0)

    function addResp() {

        if (sCount == 0) {

            setSCount(1)
        }
        if (sCount == 1) {

            setSCount(2)
        }
        if (sCount == 2) {

            setSCount(3)
        }
        if (sCount == 3) {
            alert("Достигнут максимум заключений")
        }
    }

    function deleteResp() {
        if (sCount == 0) {
            alert("все заключения удалены")
        }
        if (sCount == 1) {
            setSCount(0)
        }
        if (sCount == 2) {
            setSCount(1)
        }
        if (sCount == 3) {
            setSCount(2)
        }
    }

    function IsAdminRG() {
        return (<div>
                <Button style={{
                    border: "1px solid #a5bff9",
                    marginBottom: "10px"
                }} onClick={addResp}>+ Добавить заключение и отвественного сотрудника</Button>


                <Button style={{
                    border: "1px solid #a5bff9",
                    marginBottom: "10px"
                }} onClick={deleteResp}>+ Удалить заключение</Button>
            </div>
        )
    }

    function IsAdminUser() {
        return (
            <div></div>
        )
    }

    function RespChange(props) {
            let isVisible;
            if(store.getState().offers.offer.responsible1 == null){
                isVisible = props.isVisible;
            }
            if(store.getState().offers.offer.responsible2 == null && store.getState().offers.offer.responsible1 !== null){
                isVisible = 1;
            }
            if(store.getState().offers.offer.responsible3 == null && store.getState().offers.offer.responsible2 !== null && store.getState().offers.offer.responsible1 !== null){
                isVisible = 2;
            }
            if(store.getState().offers.offer.responsible3 !== null && store.getState().offers.offer.responsible2 !== null && store.getState().offers.offer.responsible1 !== null){
                isVisible = 3;
            }


        if (isVisible == 0) {

            return (
                <div></div>
            )
        }


        if (isVisible == 1) {

           return (
               <div>
               <ConclusionCard name = {1} resp = {store.getState().offers.offer.responsible1} />
               </div>
           )
        }
        if (isVisible == 2) {
            return (
                <div>
                    <ConclusionCard  name = {2} resp = {store.getState().offers.offer.responsible2}/>
                    <ConclusionCard  name = {1} resp = {store.getState().offers.offer.responsible1}/>
                </div>
            )
        }
        if (isVisible == 3) {
            return (
                <div>
                    <ConclusionCard  name = {3} resp = {store.getState().offers.offer.responsible3}/>
                    <ConclusionCard  name = {2} resp = {store.getState().offers.offer.responsible2}/>
                    <ConclusionCard  name = {1} resp = {store.getState().offers.offer.responsible3}/>
                </div>
            )
        }
    }
    function AdminChange(props) {
        const isAdmin = props.isAdmin;
        if (isAdmin == 'wg') {
            return <IsAdminRG/>;

        } else {
            return <IsAdminUser/>
        }
    }
    function AdminChange2(props) {
        const isAdmin = props.isAdmin;
        if (isAdmin == 'wg') {

            return (
                <div>
                    <div style={{
                        textAlign: "center"
                    }}>
                    </div>
                    <SelectChangeConclusionResponsible/>
                </div>
        )
        } else {
            return <div></div>
        }
    }


    async function saveResponsible(){
     try{
         setViewChange(false)
         const idOffer = localStorage.getItem('idOffers')
        const respName = store.getState().search.searchUser.name
        const respTabnum = store.getState().search.searchUser.tabnum


        await axios.post(`${API_URL}api/offers/toDbSaveResposibleRG`, {
            respTabnum,
            respName,
            idOffer

        })

             setNameRg(store.getState().search.searchUser.name)
             setDateRg(store.getState().offers.offer.responsibles_rg?.open)
             setTabelRg(store.getState().search.searchUser.tabnum)


        alert('Ответственный сотрудник добавлен')

    } catch (e){
        alert(e.response.data.message)
    }
}

async function readResp(){
        try{

        }catch (e){
            return (e.response.date.message)
        }

}

const [nameRG, setNameRg]= React.useState(`${store.getState().offers.offer.responsibles_rg?.fiofull}`)
const [dateRG, setDateRg]= React.useState(`${store.getState().offers.offer.responsibles_rg?.open}`)
const [tabelRG, setTabelRg]= React.useState(`${store.getState().offers.offer.responsibles_rg?.responsible_tabnum}`)
console.log(dateRG)
    console.log(store.getState().offers.offer.responsibles_rg?.fiofull)
    console.log(store.getState().offers.offer.responsibles_rg?.open)

    return (
        <div className={s.cardOfferContainer}>
            <AdminChange isAdmin={localStorage.getItem("userAdminOptions")}/>

            <RespChange isVisible={sCount}/>
            <div className={s.header}>
                <div className={s.date}>
                    <div>Дата:</div>
                    <div>{dateRG}</div>
                </div>
                <div className={s.nameWorkGroup}>
                    <div>Подразделение:</div>
                    <div>Рабочая группа</div>
                </div>

                <div className={s.ExecutWorker}>

                    <div>Ответственный сотрудник:</div>

                    <div>
                        <div style={{
                        backgroundImage: `url(${API_URL + 'files/photos/' + tabelRG + ".jpg"})`,
                        width:"20px",
                        height:"20px",
                        backgroundSize: "cover",
                        borderRadius:"50%",
                        float: "left"
                    }}></div> {nameRG}</div>
                    <div> Табельный: {tabelRG} </div>
                </div>

                <AdminChange2 isAdmin={localStorage.getItem("userAdminOptions")}/>
                <div className={s.filesConclusion}>
                    <div>Файлы заключения подразделения:</div>
                    <div className={s.conclusionFilesArea}> files area:
                        <div>

                            <div>Заключение</div>
                        </div>
                        <div>

                            <div>Заключение</div>
                        </div>
                        <div className={s.fileUpload}>
                            <input type="file" name="filename"/>
                        </div>
                    </div>
                </div>
                <div className={s.shortAnotation}>
                    <div>Краткая аннотация заключения подразделения:</div>
                    <div className={s.conclusionTextArea}> text of conclusion area: Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit. Autem dolore excepturi hic nemo nihil quae reiciendis sunt
                        voluptatum. A autem et iusto, nam numquam officia optio provident quas quibusdam voluptatem.
                    </div>
                </div>
            </div>


        </div>

    )
}
export default ConclusionOffer;