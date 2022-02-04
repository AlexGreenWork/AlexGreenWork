import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { API_URL } from "../../../../../config.js"

function OffersCostBlock() {
    console.log(true)
    return (
        <div>
            <div style={{ display: "flex" }}>
                <div>
                    <div> Автору:
                        {/* <div style={{
                                backgroundImage: `url(${API_URL + 'files/photos/' + store.getState().offers.offer.tabelNum + ".jpg"})`,
                                width: "40px",
                                height: "40px",
                                backgroundSize: "cover",
                                borderRadius: "50%",
                                backgroundPosition: "center"
                            }}>
                            </div> */}
                    </div>

                    <div contentEditable={"true"} id="author" style={{ backgroundColor: "white" }} onInput={e => console.log(e.target.innerText)} > 1500</div>
                </div>
                <div>
                    <div> Соавтору  </div>
                    <div contentEditable={"true"} id="soAuthor" onInput={e => console.log(e.target.innerText)} > 1500</div>
                </div>

            </div>
        </div>
    )
}

function CostOffersList() {
    return (
        <div>
            <OffersCostBlock />
            список блоков
        </div>
    )
}



function CostOffers() {

    const [reqCost, setreqCost] = useState(null)
    let idOffers = localStorage.getItem('idOffers')
    // try {
    //     axios.post(`${API_URL}api/auth/CostOffers`, {
    //         idOffers: idOffers,

    //     })
    //         .then(res => {

    //             let fio = res.data;
             
              
    //             }

    //         )
    // } catch (e) {
    //     alert(e.response)
    // }

    function ProfitChange() {
        if (localStorage.getItem('userAdminOptions') == 'wg' || localStorage.getItem('userAdminOptions') == 'topComission' || localStorage.getItem('userAdminOptions') == 'admin') {
            return <div>
                <Button sx={{
                    border: '1px solid lightblue',
                    boxShadow: '1px 4px 8px 4px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);',
                    margin: '10px'
                }} >Сохранить суммы</Button>
            </div>
    
        } else {
            return <div></div>
        }
    }
    

    return (<div>
        
            <CostOffersList />
            <ProfitChange />
    </div>

    )
}

export default CostOffers;