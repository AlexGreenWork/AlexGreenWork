import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { API_URL } from "../../../../../config.js"


function OffersCostBlock(props) {
    
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
                        <div contentEditable={"true"} id={`author${props.number}`} style={{ backgroundColor: "white" }}  > {props.fio.profit}</div>
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
                        <div contentEditable={"true"} id={`author${props.number}`} style={{ backgroundColor: "white" }}  > {props.fio.profit}</div>
                    </div>
                </div>
            </div>
        )
    }

}

function CostOffersList(props) {
   


    if (props.req !== null) {
        return props.req.map((elem, key) => {
           

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
        try {
            axios.post(`${API_URL}api/auth/allAuthors`, {
                idOffers: idOffers,

            })
                .then(res => {
                    
                    setreqCost(res.data)
                }

                )
        } catch (e) {
            alert(e.response)
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
                       alert(res.data)

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
                }} onClick={() => { SaveProfit(props.number, props.req) }}>Сохранить суммы</Button>

            </div>

        } else {
            return <div></div>
        }
    }

    if (reqCost === null) {
        
     
        return (<div>

            <CostOffersList req={reqCost} />
            <ProfitChange />
        </div>

        )
    } else {
        return (<div>

            <CostOffersList req={reqCost} />
            <ProfitChange number={reqCost.length} req={reqCost} />
        </div>

        )
    }

}

export default CostOffers;