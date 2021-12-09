import React from "react";

import s from "./conclusion.module.css"
import ViewFileDoc from "../../../../../Pics/svg/ViewFiles/docFileSvg";
import FindWorkers from "../../../../personalCabinet/findWorkers/findWorkers";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import Complete from "../../../../personalCabinet/findWorkers/complete";
import ConclusionCard from "./conclusionCard";


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
                            }} onClick={changeViewSelect}>Прикрепить сотрудника к предложению</Button>
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

    function IsAdminUser(props) {
        return (
            <div></div>
        )
    }

    function RespChange(props) {
            let isVisible= props.isVisible
        if (isVisible == 1) {

           return (
               <ConclusionCard id={1}/>
           )
        }
        if (isVisible == 2) {
            return (
                <div>
                    <ConclusionCard  id={1}/>
                    <ConclusionCard id={2}/>
                </div>
            )
        }
        if (isVisible == 3) {
            return (
                <div>
                    <ConclusionCard  id={1}/>
                    <ConclusionCard id={2}/>
                    <ConclusionCard id={3}/>
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


    return (
        <div className={s.cardOfferContainer}>

            <AdminChange isAdmin={localStorage.getItem("userAdminOptions")}/>
            <RespChange isVisible = {sCount}/>
            <div className={s.header}>


                <Complete/>


                <div className={s.date}>
                    <div>Дата:</div>
                    <div> 12/09/21</div>
                </div>
                <div className={s.nameWorkGroup}>
                    <div>Подразделение:</div>
                    <div> Рабочая группа</div>
                </div>

                <div className={s.ExecutWorker}>
                    <div>Ответственный сотрудник:</div>
                    <div> Петров Петр Петрович</div>
                </div>
                <div className={s.filesConclusion}>
                    <div>Файлы заключения подразделения:</div>
                    <div className={s.conclusionFilesArea}> files area:
                        <div>
                            <ViewFileDoc/>
                            <div>Заключение</div>
                        </div>
                        <div>
                            <ViewFileDoc/>
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