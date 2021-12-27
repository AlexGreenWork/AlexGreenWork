import React from "react";

import s from "./conclusion.module.css"
import ViewFileDoc from "../../../../../Pics/svg/ViewFiles/docFileSvg";
import FindWorkers from "../../../../personalCabinet/findWorkers/findWorkers";
import Button from "@material-ui/core/Button";
// import Complete from "../../../../personalCabinet/findWorkers/complete";
import {useSelector} from "react-redux";

import {saveToDb1 ,saveToDb2, saveToDb3 } from "../../../../../actions/offers"
import {store} from "../../../../../reducers";
import {API_URL} from "../../../../../config";
import server from "../../../../../actions/server";

const ConclusionCard = (props) => {

    const searchUser = useSelector(state =>state.search.searchUser.searchUserTabnum)

    const [viewChange, setViewChange] = React.useState(false);





function changeViewSelect() {

            setViewChange(true)


    }
        let propName = props.name;
    function changeViewSelectSave(props) {



            saveToDb(searchUser)
            setViewChange(false)
            alert("Изменения сохранены 1")


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
    async function saveToDb(){
        try{
            setViewChange(false)
            const idOffer = localStorage.getItem('idOffers')
            const respName = store.getState().search.searchUser.name
            const respTabnum = store.getState().search.searchUser.tabnum

            await server.send_post_request(`${API_URL}api/offers/toDbSaveResponsible`, {
                respTabnum,
                respName,
                idOffer

            })
            alert('Ответственный сотрудник добавлен')

        } catch (e){
            alert(e.response.data.message)
        }
    }
    async function saveToDb2(){
        try{
            setViewChange(false)
            const idOffer = localStorage.getItem('idOffers')
            const respName = store.getState().search.searchUser.name
            const respTabnum = store.getState().search.searchUser.tabnum

            await server.send_post_request(`${API_URL}api/offers/toDbSaveResposible2`, {
                respTabnum,
                respName,
                idOffer

            })
            alert('Ответственный сотрудник добавлен')

        } catch (e){
            alert(e.response.data.message)
        }
    }
    async function saveToDb3(){
        try{
            setViewChange(false)
            const idOffer = localStorage.getItem('idOffers')
            const respName = store.getState().search.searchUser.name
            const respTabnum = store.getState().search.searchUser.tabnum

            await server.send_post_request(`${API_URL}api/offers/toDbSaveResposible3`, {
                respTabnum,
                respName,
                idOffer

            })
            alert('Ответственный сотрудник добавлен')

        } catch (e){
            alert(e.response.data.message)
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

        var month = [
            'Января',
            'Февраля',
            'Марта',
            'Апреля',
            'Мая',
            'Июня',
            'Июля',
            'Августа',
            'Сентября',
            'Октября',
            'Ноября',
            'Декабря'
        ];

        var d = new Date(`${props.open}`);
        var newDate = d.getDate().toString().padStart(2, '0') + ' ' + month[d.getMonth()];

        function IsAdminRGUpload() {
            return (<div className={s.fileUpload}>
                    <input type="file" name="filename"/>
                </div>

            )
        }

        function IsAdminUser() {
            return (
                <div></div>
            )
        }

        function AdminChangeUploadFile(props) {
            const isAdmin = props.isAdmin;
            if (isAdmin == 'wg') {
                return <IsAdminRGUpload/>;

            } else {
                return <IsAdminUser/>
            }
        }



        return (
            <div name={props.name}>
                <div className={s.header}>




                    <div className={s.date}>
                        <div>Дата:</div>
                        <div> {newDate}{' ' +d.getFullYear()}</div>
                    </div>
                    <div className={s.nameWorkGroup}>
                        <div>Подразделение:</div>
                        <div> ///Подразделение////</div>
                    </div>

                    <div className={s.ExecutWorker}>

                        <div style={{    display: "flex",
                            alignItems: "center"}}>Ответственный сотрудник:</div>
                        <div style={{
                            display:"flex"

                        }}>
                            <div style={{
                                boxShadow: "0px 4px 8px 0px rgba(34, 60, 80, 0.2)",
                                display: "flex",
                                borderBottomLeftRadius: "15px",
                                borderTopLeftRadius: "15px"
                            }}>
                                <div style={{
                                    backgroundImage: `url(${API_URL + 'files/photos/' + props.tabel + ".jpg"})`,
                                    width: "40px",
                                    height: "40px",
                                    backgroundSize: "cover",
                                    borderRadius: "50%",
                                    backgroundPosition: "center"
                                }}>
                                </div>

                                <div style={{marginRight:'5px',marginLeft:'5px', display: "flex",
                                    alignItems: "center"}}>{props.resp}</div>
                                <div style={{marginRight:'5px',marginLeft:'5px', display: "flex",
                                    alignItems: "center"}}> Табельный: {props.tabel} </div>
                            </div>
                        </div>
                    </div>




                    <AdminChange name={props.name} isAdmin={localStorage.getItem("userAdminOptions")}/>
                    <div className={s.filesConclusion}>
                        <div style={{
                            borderBottom: "1px solid #dfdcdc",
                            marginBottom: "11px"
                        }}>Файлы заключения //подразделения//:</div>
                        <div className={s.conclusionFilesArea}>
                            <div className={s.conclusionFilesAreaFile} style={{
                                display: "flex",
                                flexDirection: "column",
                                cursor: "pointer"
                            }}>
                                <ViewFileDoc/>
                                <div>Заключение</div>
                            </div>


                        </div>
                        <AdminChangeUploadFile isAdmin={localStorage.getItem("userAdminOptions")}/>
                    </div>
                    <div className={s.filesConclusion11}>
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
                <CardDivisionConclusion />
            </div>



        </div>

    )
}
export default ConclusionCard;
