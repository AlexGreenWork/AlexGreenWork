import React, { useState, useEffect } from "react";
import Charts, {MidleLine, sortData} from "../chart"
import axios from "axios";
import { API_URL } from "../../../../config"


function ChartPersonal() {

    const [data, setData] = useState(null)
    const [chart, setChart] = useState(null)
    const [allpers, setAllpers] = useState(null)
    const [allpersStart, setAllpersStart] = useState(null)
    if (data === null) {
        axios.post(`${API_URL}api/statistics/personnelStream`, {})
            .then(res => {
            
                setData(res.data)
                setAllpers(res.data.all)
            })
    }

    if(allpers !== null && allpersStart === null){
        let property = {midleLine: { name : ''}}
        let dataRazn = MidleLine(data.dataPersonal, property, allpers)
         setAllpersStart(dataRazn.razn_value[0])
   
    }
   



    let property = {
        type: "linear",
        color_line: ["#0400ffc2", '#00f51194', '#fb7b7b'],
        width: 800,
        height: 500,
        padding_top: 50,
        padding_right: 80,
        padding_left: 30,
        x_type: "year",
        rows_count: 4,
        text_color_rows: '#888888',
        font_style_rows: 'normal 28px Helvetica, sans-serif',
        money: "false",
        pouring: "true",
        lineWidthData: "4",
        vertical_line: "true",
        vertical_line_width: "2",
        vertical_line_color: "#dddd",
        pen: {
            active: "true",
            circle_radius: 7,
            colorBorder: "blue",
            colorPouring: "white",
            lineWidth: '4'
        },

        textVertex: {
            active: "true",
            correctX_pos: 10,
            correctY_pos: -20,
            font: "28px sans-serif",
            text_color: 'blue',
        },
        intCircle: {
            circle_radius: 12,
            colorBorder: "red",
            colorPouring: "white",


        },
        toolTipText: {
            type: "false"
        },
        mouse: {
            padding_mouse_left: 15,
            padding_mouse_top: -80,
        },
        circleChart: {
            outer_radius: 300,
            inner_radius: 150,
            text: {
                color: "black",
                type: "number"
            }
        },
        midleLine:{
             valid: "true",
             name: "Всего трудящихся",
             textLinePadding: 10,
             leftpadding: -30,
        }



    }

    // let windowOuterWidth = window.outerWidth
    // let windowOuterHeight = window.outerHeight

    // window.addEventListener(`resize`, event => {
    //     let parentElem = document.querySelector('.chartPersonalStream').getBoundingClientRect()
    //     let resizeprop = { ...property, width: parentElem.width - 35 }
       
    //     event.preventDefault()
    //     console.log(event.currentTarget.outerHeight)
    //     if(windowOuterWidth - 150 > event.currentTarget.outerWidth)
    //     {
    //         windowOuterWidth = windowOuterWidth - 300
    //         console.log(1)
    //         // setChart(null);
    //         // setChart(resizeprop);
    //     } else if(windowOuterWidth + 150 < event.currentTarget.outerWidth)
    //     {
    //         windowOuterWidth = windowOuterWidth + 300
    //         console.log(2)
    //         // setChart(null);
    //         // setChart(resizeprop);
    //         //  setChart(resizeprop);
    //     }
        
        
      

    // }, false);

    // useEffect(() => {
    //     /* 
    //     const [data, setData] = useState(null)
    // const [chart, setChart] = useState(null)
    // const [allpers, setAllpers] = useState(null)
    // const [allpersStart, setAllpersStart] = useState(null) */
    //     if (chart === null && data === null && allpers === null && allpersStart === null ) {
    //         let parentElem = document.querySelector('.chartPersonalStream').getBoundingClientRect()
    //      //  setChart({ ...property, width: parentElem.width - 35 })
           
    //     }

    // })
  
    return (
        <div className="chartPersonalStream" style={{ width:"800px", overflow:"auto"}}>
            <div style={{ position:'relative', top:"0px", display:"flex", justifyContent: "space-between", paddingLeft:"20px", paddingRight:"20px",fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontWeight: 'normal', fontSize: "1.5em" }}>
            <div id="personalPreYear" >Трудящихся начало года: {allpersStart}</div>
            <div >Всего трудящихся: {allpers}</div>
            </div>
           {data !== null ? <Charts data={data !== null ? data.dataPersonal : null} property={property} idElem={"chart2"} idContainer={"container3"} chartName={"Поток кадров"} dopData = {allpers}/> : null}
            {/* {data !== null ? null : <Charts data={data !== null ? data.dataPersonal : null} property={property} idElem={"chart2"} idContainer={"container3"} chartName={"Поток кадров"} dopData = {allpers}/>} */}
        </div>
    )
}

export default ChartPersonal;