import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import  {useState} from 'react';
import DateTimePicker from '@mui/lab/DateTimePicker';

// import {useDispatch, useSelector} from "react-redux";

import s from "../comission/comission.module.css";
import CardOfferUpload from "../../../../components/card/card";
import DndOffer from "../../../../components/dnd/dnd";

import Button from "@material-ui/core/Button";

import {toDbDateComission} from "../../../../../actions/offers";

const ComissionOffer = () => {
    // const dispatch = useDispatch()
   // const dateComiss = useSelector( state => state.dateComission )
    const [dateComission, setDateComission] = React.useState('');

    const handleChange = (newValue) => {

        setDateComission(newValue);
    };


    const [viewChangeCom, setViewChangeCom] = React.useState('');


    function changeViewMultiSelect() {

        if (viewChangeCom == true) {
            setViewChangeCom(false)

        }
        if (viewChangeCom == false) {
            setViewChangeCom(true)
        }

    }

    function MultiSelectChangeCom(props) {
        const viewChangeCom = props.viewChangeCom
        if (viewChangeCom == false) {
            return <div>
                <Button sx={{
                    border:'1px solid lightblue',
                    boxShadow: '1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);',
                    margin: '10px'
                }}
                        onClick={changeViewMultiSelect}>Редактировать</Button>

            </div>;

        }
        if (viewChangeCom == true) {
            return (
                <div>
                    <div className={s.navMultiSel}>
                        <Button onClick={changeViewMultiSelect}>Отменить</Button>
                        <Button onClick={saveDateComission}>Сохранить</Button>
                    </div>

                    <div className={s.FormControl}>

                        <label htmlFor="" className={s.labelCalender} data-shrink="true">Дата</label>
                        <div className={s.inputCalender}>
                            <input type="datetime-local"

                                   value={dateComission}
                                   onChange={e => handleChange(e.target.value)}
                                   renderInput={(params) => <TextField {...params} />}
                            ></input>

                            <fieldset aria-hidden="true"
                                      className={s.OutlineCalender}>
                                <legend className="css-186xcr5"></legend>
                            </fieldset>
                        </div>
                    </div>
                </div>
            )
        }
    }

    function IsAdminRG() {


        return (<div>
                <MultiSelectChangeCom viewChangeCom={viewChangeCom}/>
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
            return <IsAdminRG/>;

        } else {
            return <IsAdminUser/>
        }
    }

    let offerId = localStorage.getItem("idOffers")

    function saveDateComission() {
        let T = /[T]/;
        let str = `${dateComission}`;
        let newstr = str.replace(T, " В ");
        localStorage.setItem('dateComission', newstr )
        toDbDateComission(offerId, newstr)
        setViewChangeCom(false)
        alert("Изменения сохранены")
    }


    /////////////////////////////
    // const [dateComision, setDateComision] = React.useState('');
    //
    // const handleChangeView = (event) => {
    //     setDateComision(event.target.value);
    // };


 let dateCom = localStorage.getItem('dateComission')
    return (


        <div className={s.nameOffer}>
            <div>Дата заседания комиссии: {dateCom}</div>


            <AdminChange isAdmin={localStorage.getItem("userAdminOptions")}/>


            <div className={s.uploadContainer} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div>
                    Файл протокола:
                </div>
                <div className={s.filesContainer}>
                    <CardOfferUpload/>
                </div>
                <DndOffer/>
            </div>

            <div>краткая аннотация решения</div>
            <div>Файл выписки</div>
            <div>Величина вознаграждения</div>

        </div>
    )
}
export default ComissionOffer;