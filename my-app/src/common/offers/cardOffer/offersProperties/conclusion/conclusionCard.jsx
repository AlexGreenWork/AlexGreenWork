import React from "react";

import s from "./conclusion.module.css"
import ViewFileDoc from "../../../../../Pics/svg/ViewFiles/docFileSvg";
import FindWorkers from "../../../../personalCabinet/findWorkers/findWorkers";
import Button from "@material-ui/core/Button";
import Complete from "../../../../personalCabinet/findWorkers/complete";
import {useSelector} from "react-redux";

import {saveToDb1 ,saveToDb2, saveToDb3 } from "../../../../../actions/offers"

const ConclusionCard = (props) => {

    const searchUser = useSelector(state =>state.search.searchUser.searchUserTabnum)

    const [viewChange, setViewChange] = React.useState(false);

    function saveToDb1(){
console.log("saveToDb1")
    }
function saveToDb2(){
    console.log("saveToDb2")
    }
function saveToDb3(){
    console.log("saveToDb3")
    }
function saveToDbRG(){
    console.log("saveToDbRG")
    }

function changeViewSelect() {

            setViewChange(true)


    }
        let propName = props.name;
    function changeViewSelectSave(props) {

        if (propName == 1) {

            saveToDb1(searchUser)
            setViewChange(false)
            alert("Изменения сохранены 1")
        }
       if (propName == 2) {

            saveToDb2(searchUser)
            setViewChange(false)
            alert("Изменения сохранены 2")
        }
       if (propName == 3) {

            saveToDb3(searchUser)
            setViewChange(false)
            alert("Изменения сохранены 3")
        }
       if (propName == "RG") {

            saveToDb1(searchUser)
            setViewChange(false)
            alert("Изменения сохранены")
        }


    }


    function SelectChangeConclusionResponsible(props) {



        if (viewChange ==false) {
            return (<div style={{
                    textAlign:"center"
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
        if (viewChange ==true) {
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
                            }} onClick={changeViewSelectSave}>Прикрепить сотрудника к предложению</Button>
                        </div>
                    </div>
                </div>
            )
        }

    }

    const CardDivisionConclusion = () => {


        function IsAdminRG() {
            return (<div>
                    <SelectChangeConclusionResponsible name={props.name}/>
                </div>
            )
        }

        function IsAdminUser(props) {
            return (
                <div></div>
            )
        }


        function AdminChange(props) {
            const isAdmin = props.isAdmin;
            if (isAdmin == 'wg') {
                return <IsAdminRG name = {props.name}/>;

            } else {
                return <IsAdminUser />
            }
        }



        return (
            <div name={props.name}>
                <div className={s.header}>




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
                        <div > табельный: {searchUser}</div>

                    </div>
                    <AdminChange name={props.name} isAdmin={localStorage.getItem("userAdminOptions")}/>
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
            </div>)

    }


    return (
        <div className={s.cardOfferContainer}>
            <div>
                <CardDivisionConclusion/>
            </div>



        </div>

    )
}
export default ConclusionCard;