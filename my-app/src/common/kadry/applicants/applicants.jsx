import React, {useEffect, useState} from "react";
import s from "./applicants.module.css"
// import {NavLink} from "react-router-dom";


import ContentContainer from "../../contentHome/contentContainer";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import server from "../../../actions/server";
import {API_LOC_URL, API_URL} from "../../../config";
import ListApplicants from "./listApplicants";
import {Redirect} from "react-router-dom";
import axios from "axios";
import ListApp from "./cartApplicants/list";


const Applicants = () => {
    const [value, setValue] = React.useState('1');
    const [surName, setSurName] = React.useState('');
    const [name, setName] = React.useState('');
    const [middleName, setMiddleName] = React.useState('');
    const [spec, setSpec] = React.useState('');
    const [bDay, setBDay] = React.useState('');
    const [telNumber, setTelNumber] = React.useState('');
    const [education, setEducation] = React.useState('');
    const [heldPosition1, setHeldPosition1] = React.useState('');
    const [heldPosition2, setHeldPosition2] = React.useState('');
    const [heldPosition3, setHeldPosition3] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [colorTel, setColorTel] = React.useState('');
    const [colorEmail, setColorEmail] = React.useState('');
    const [worked, setWorked] = React.useState(null)
    const [file, setFile] = React.useState(null)
    const [fileFlag, setFileFlag] = React.useState(0)


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);


    // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    //     setValue(newValue);
    // };


    const data = new FormData()
    data.append("formData", file);
    console.log('data - ', data)
    console.log(file)
    let currUser = localStorage.getItem('userTabelNum')


    async function submitAppForm() {
        if (surName == '' || name == '' || middleName == '' || spec == '' || bDay == '' || telNumber == '' || education == '' || email == '') {
            alert('Заполните все обязательные поля')
        } else {
            await submitFileApplicants()
            await submitApplicants()

            setSurName('');
            setName('');
            setMiddleName('');
            setSpec('');
            setBDay('');
            setTelNumber('');
            setEducation('');
            setHeldPosition1('');
            setHeldPosition2('');
            setHeldPosition3('');
            setEmail('');
            setColorTel('');
            setColorEmail('');
            setWorked(null);


            document.getElementById('fileInp').value=''

        }

    }

    async function submitFileApplicants() {
        try {
            data.delete("telNumber")
            data.delete("currUser")
            data.delete("email")
            // data.delete("formData")
            data.append("currUser", `${currUser}`)
            data.append("email", `${email}`)
            data.append("telNumber", `${telNumber}`)
            data.append("formData", `${file}`);
            const response1 = await axios.post(
                `${API_URL}api/kadry/UploadQuestionnaire`,
                data, {headers: {'Content-Type': 'multipart/form-data'}}
            )
            alert("Файл Анкеты добавлен");
        } catch (e) {
            console.log(e)
        }
    }

    async function submitApplicants() {
        if(file !== null){
            console.log("файл есть")
            setFileFlag(1)
            console.log(fileFlag)
        }
        try {
            const response = await server.send_post_request(
                `${API_URL}api/kadry/applicantsToDb`,
                {
                    surName,
                    name,
                    middleName,
                    spec,
                    bDay,
                    telNumber,
                    education,
                    heldPosition1,
                    heldPosition2,
                    heldPosition3,
                    email,
                    worked,
                    currUser,
                    data,
                    fileFlag
                }
            );
            console.log(response)
            alert(response.data.message);

        } catch (e) {
            alert(e.response.data.message);
        }
    }

    function inpSpec(event) {
        setSpec(event.target.value)
    }

    function inpSurname(event) {
        setSurName(event.target.value)
    }

    function inpName(event) {
        setName(event.target.value)
    }

    function inpMiddleName(event) {
        setMiddleName(event.target.value)
    }

    function inpBDay(event) {
        setBDay(event.target.value)
    }

    function inpTelNumberChange(event) {
        setTelNumber(event.target.value)
    }

    function inpTelNumber(event) {




        switch (telNumber.length) {
            case 12:
                setColorTel('green 3px 3px 3px')
                document.getElementById('telLabel').innerHTML = `<div style='color:green'>Номер введен правильно!</div>`;
                break;

            case 1:  // if (x === 'value2')
                setColorTel('rgba(0,0,0,0) 3px 3px 3px')
                document.getElementById('telLabel').innerHTML = ``;
                break;
            case 0:  // if (x === 'value2')
                setColorTel('rgba(0,0,0,0) 3px 3px 3px')
                document.getElementById('telLabel').innerHTML = ``;
                break;

            default:
                setColorTel('red 3px 3px 3px')
                document.getElementById('telLabel').innerHTML = `<div style='color:red'>Номер телефона введен неправильно!</div>`;
                break;
        }

    }

    function inpEducation(event) {
        setEducation(event.target.value)
    }

    function inpHeldPosition1(event) {
        setHeldPosition1(event.target.value)
    }

    function inpHeldPosition2(event) {
        setHeldPosition2(event.target.value)
    }

    function inpHeldPosition3(event) {
        setHeldPosition3(event.target.value)
    }

    function worker() {
        if (worked === null) {
            setWorked('checked')
        } else {
            setWorked(null)
        }

    }

    function inpEmailChange(event){
        setEmail(event.target.value)
    }
    function inpEmail(event) {

        let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        let myMail = event.target.value;
        let valid = re.test(myMail);
        if (valid) {
            setColorEmail('green 3px 3px 3px')
            document.getElementById('emailLabel').innerHTML = `<div style='color:green'>Правильный Email!</div>`;
        } else {
            setColorEmail('red 3px 3px 3px')
            document.getElementById('emailLabel').innerHTML = `<div style='color:red'>Email введен неправильно!</div>`;
        }
        if (event.target.value == 0) {
            document.getElementById('emailLabel').innerHTML = ``
            setColorEmail('rgba(0,0,0,0) 3px 3px 3px')
        }
    }

    function fileToState(event) {
        setFile(event.target.files[0])
    }

    function redir() {
        return <Redirect to={{pathname: "/kadry_/applicants"}}/>
    }

    return (
        <div style={{
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center"
        }}>

            <ContentContainer/>

            <div style={{
                position: "absolute",
                display: "flex",
                justifycontent: "center",
                width: "65vw",
                top: 0,
                justifyContent: "center",
                height: "100%"
            }} className={s.content}>

                <div className={s.allTable} style={{width: "95%"}}>
                    <h2>Соискатели</h2>
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <TabContext value={value}>
                            <Box sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                width: "100%",
                                display: "flex",
                                justifyContent: "center"
                            }}>
                                <TabList /* onChange={/* handleChange} */ aria-label="lab API tabs example">
                                    <Tab onClick={redir} label="Анкеты соискателей" value="1"/>
                                    <Tab label="Добавить соискателя" value="2"/>
                                </TabList>
                            </Box>
                            <TabPanel value="1" style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                alignItems: "center"
                            }}>
                                <div>Анкеты соискателей</div>
                                <TextField id="outlined-search" label="Поиск"
                                           type="search"
                                           style={{
                                               margin: "5px"
                                           }}/>
                                <ListApp/>
                                <ListApplicants/>


                            </TabPanel>
                            <TabPanel value="2" style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                alignItems: "center"
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "50%",

                                }}>


                                    <div style={{display: "flex", paddingLeft: '2%', paddingRight: '2%'}}>
                                        <label htmlFor="fileInp" style={{marginRight: '2%'}}>Добавте файл
                                            анкеты:</label>
                                        <input type="file" name="myFile" id="fileInp" style={{width: '50%'}}
                                               onChange={fileToState} />
                                    </div>
                                    <TextField style={{margin: "5px", backgroundColor: "white"}}
                                               id="surname"
                                               required='true'
                                               label="Фамилия"
                                               placeholder="Иванов"
                                               onChange={inpSurname}
                                               value={surName}
                                    />
                                    <TextField style={{margin: "5px", backgroundColor: "white"}}
                                               id="name"
                                               label="Имя"
                                               placeholder="Иван"
                                               onChange={inpName}
                                               required='true'
                                               value={name}
                                    />
                                    <TextField style={{margin: "5px", backgroundColor: "white"}}
                                               id="middleName"
                                               label="Отчество"
                                               placeholder="Иванович"
                                               onChange={inpMiddleName}
                                               required='true'
                                               value={middleName}
                                    />
                                    <TextField style={{margin: "5px", backgroundColor: "white"}}
                                               id="spec"
                                               label="Специальность"
                                               placeholder="Токарь"
                                               onChange={inpSpec}
                                               required='true'
                                               value={spec}
                                    />

                                    <div
                                        className={s.dateDiv}>
                                        <input className={s.datePicker}
                                               type="date" id="start" name="trip-start"
                                               value={bDay}
                                               min="1900-01-01"
                                               onChange={inpBDay}
                                        />
                                    </div>
                                    <label htmlFor="telNumber" id="telLabel"></label>
                                    <TextField
                                        style={{margin: "5px", backgroundColor: "white", boxShadow: colorTel}}

                                        id="telNumber"
                                        label="Телефон"
                                        onBlur={inpTelNumber}
                                        onChange={inpTelNumberChange}
                                        // onKeyDown={inpTelNumber}
                                        placeholder="37529112233455"
                                        required='true'
                                        type='number'
                                        value={telNumber}
                                    />
                                    <TextField style={{margin: "5px", backgroundColor: "white"}}
                                               id="education"
                                               label="Образование"
                                               onChange={inpEducation}
                                               placeholder="Инженер-системотехник"
                                               required='true'
                                               value={education}
                                    />
                                    <TextField style={{margin: "5px", backgroundColor: "white"}}
                                               id="heldPosition1"
                                               label="Занимаемая должность 1"
                                               onChange={inpHeldPosition1}
                                               placeholder="грузчик"
                                               value={heldPosition1}
                                    />
                                    <TextField style={{margin: "5px", backgroundColor: "white"}}
                                               id="heldPosition2"
                                               label="Занимаемая должность 2"
                                               onChange={inpHeldPosition2}
                                               placeholder="токарь"
                                               value={heldPosition2}
                                    />
                                    <TextField style={{margin: "5px", backgroundColor: "white"}}
                                               id="heldPosition3"
                                               label="Занимаемая должность 3"
                                               onChange={inpHeldPosition3}
                                               placeholder="начальник производства"
                                               value={heldPosition3}
                                    />
                                    <label htmlFor="telNumber" id="emailLabel"></label>
                                    <TextField
                                        style={{margin: "5px", backgroundColor: "white", boxShadow: colorEmail}}
                                        id="email"
                                        label="email"
                                        onBlur={inpEmail}
                                        onChange={inpEmailChange}
                                        placeholder="email@mail.ru"
                                        required='true'
                                        value={email}
                                    />
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row-reverse",
                                        justifyContent: "flex-end",
                                        paddingLeft: "1%",
                                        margin: "10px"

                                    }}>
                                        <label style={{paddingLeft: "12%"}} htmlFor="worked" id="worked">Бывший
                                            сотрудник предприятия</label>
                                        <input style={{width: "100%", left: "-19%", position: "absolute"}}
                                               onChange={worker} type="checkbox" id="worked" name="worked" {...worked}/>
                                    </div>

                                </div>
                                <button onClick={submitAppForm}>Добавить соискателя</button>
                            </TabPanel>

                        </TabContext>
                    </Box>


                </div>
            </div>
        </div>
    );

}

export default Applicants;
