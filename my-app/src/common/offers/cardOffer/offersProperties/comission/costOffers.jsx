import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { API_URL } from "../../../../../config.js"

function inputProperty(e, id) {
    let text = document.querySelector(`#author${id}`)

    if (e.nativeEvent.inputType !== "deleteContentBackward" && e.nativeEvent.inputType !== "deleteContentForward" && e.nativeEvent.inputType !== "insertFromPaste") {

        let codeKey = e.nativeEvent.data.charCodeAt();

        if (codeKey > 47 && codeKey < 58 || codeKey === 9 || codeKey === 8 || codeKey === 46) {

            text.innerText = e.target.innerText
            // console.log(text)
            text.focus();
            if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(text);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(text);
                textRange.collapse(false);
                textRange.select();
            }

        } else {

            text.innerText = text.innerText.slice(0, -1)
            text.focus();
            if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(text);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(text);
                textRange.collapse(false);
                textRange.select();
            }

        }
    }

}



function OffersCostBlock(props) {
    const [value, setValue] = useState(null)


    console.log(props.fio)
    if (props.fio.coAuthor === undefined) {
        return (
            <div>
                <div style={{ display: "flex" }}>
                    <div>
                        <div> Автор:
                            <div>
                                {props.fio.surname} {props.fio.name} {props.fio.middlename}
                            </div>
                        </div>
                        {/* <input type="number" step="0.01" min="0" value={value} onChange={(e)=>{setValue(e.target.value)}}/> */}
                        <div contentEditable={"true"} id={`author${props.number}`} style={{ backgroundColor: "white" }} onInput={(e) => { /* console.log(e.nativeEvent); inputProperty(e, props.number) */ }} > {props.fio.profit}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div style={{ display: "flex" }}>
                    <div>
                        <div> Соавтор:
                            <div>
                                {props.fio.surname} {props.fio.name} {props.fio.middlename}
                            </div>
                        </div>
                        <div contentEditable={"true"} id={`author${props.number}`} style={{ backgroundColor: "white" }} onInput={e => {/*  inputProperty(e, props.number) */ }} > {props.fio.profit}</div>
                    </div>
                </div>
            </div>
        )
    }

}

function CostOffersList(props) {
    console.log(props.req)


    if (props.req !== null) {
        return props.req.map((elem, key) => {
            console.log(elem)

            return <OffersCostBlock key={key} fio={elem} number={key} />
        })

    } else {
        return <div>null</div>
    }

}



function CostOffers() {

    const [reqCost, setreqCost] = useState(null)

    let idOffers = localStorage.getItem('idOffers')

    if (reqCost === null) {
        console.log(reqCost)
        try {
            axios.post(`${API_URL}api/auth/allAuthors`, {
                idOffers: idOffers,

            })
                .then(res => {
                    console.log(res.data.length)
                    setreqCost(res.data)
                }

                )
        } catch (e) {
            alert(e.response)
        }
    }

    function inputValidator(number, req) {

        let validInput = true;
       
        for (let i = 0; i < number; i++) {
          
            let countPont = 0
            let cost = document.querySelector(`#author${i}`).innerText;
           
            for (let j = 0; j < cost.length; j++) {
              
                let codeKey = cost[j].charCodeAt()

                if (codeKey > 47 && codeKey < 58 || codeKey === 9 || codeKey === 8 || codeKey === 46) {

                    validInput = true;

                    if (codeKey === 46) {
                        countPont++
                        console.log('countPont')
                    }

                } else {
                    console.log(false)
                    validInput = false;
                    i = number
                    j = cost.length
                }
                
                if (countPont > 1) {
                    validInput = false;
                    i = number
                    j = cost.length
                }
            }

            countPont = 0

        }
        if (validInput === true) {
          
            SaveProfit(number, req)
        
        } else {
            alert("Вы ввели неверную сумму")
        }
    }

    function SaveProfit(number, req) {
        let idOffers = localStorage.getItem('idOffers')


        for (let i = 0; i < number; i++) {
            let cost = document.querySelector(`#author${i}`).innerText;

            try {
                axios.post(`${API_URL}api/auth/CostOffersSave`, {
                    idOffers: idOffers,
                    tabNum: req[i].tabelNum,
                    cost: cost,
                })
                    .then(res => {
                        console.log(res.data)

                    }

                    )
            } catch (e) {
                alert(e.response)
            }
        }

    }


    function ProfitChange(props) {

        if (localStorage.getItem('userAdminOptions') == 'wg' || localStorage.getItem('userAdminOptions') == 'topComission' || localStorage.getItem('userAdminOptions') == 'admin') {
            return <div>
                <Button sx={{
                    border: '1px solid lightblue',
                    boxShadow: '1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);',
                    margin: '10px'
                }} onClick={() => { inputValidator(props.number, props.req); }}>Сохранить суммы</Button>

            </div>

        } else {
            return <div></div>
        }
    }

    if (reqCost === null) {
        console.log(reqCost)

        return (<div>

            {/* <CostOffersList req={reqCost} />
            <ProfitChange /> */}
        </div>

        )
    } else {
        console.log(reqCost)
        return (<div>

            <CostOffersList req={reqCost} />
            <ProfitChange number={reqCost.length} req={reqCost} />
        </div>

        )
    }

}

export default CostOffers;