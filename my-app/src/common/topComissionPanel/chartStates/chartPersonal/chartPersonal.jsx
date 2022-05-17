import React, { useState, useEffect } from "react";
import Charts from "../chart"
import axios from "axios";
import { API_URL } from "../../../../config"

function ChartPersonal() {

    const [data, setData] = useState(null)
    const [chart, setChart] = useState(null)
    const [allpers, setAllpers] = useState(null)

    if (data === null) {
        axios.post(`${API_URL}api/statistics/personnelStream`, {})
            .then(res => {
                console.log(res.data)
                setData(res.data)

            })
    }

    if (allpers === null) {
        axios.post(`${API_URL}api/statistics/personnelAll`, {})
            .then(res => {
                console.log(res.data)
                setAllpers(res.data)

            })
    }


    let property = {
        type: "linear",
        color_line: ["#3f00ff", '#33ff00a3'],
        width: 200,
        height: 400,
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
        }



    }
    window.addEventListener(`resize`, event => {
        let parentElem = document.querySelector('.chartPersonalStream').getBoundingClientRect()
        let resizeprop = { ...property, width: parentElem.width - 35 }
        setChart(resizeprop);

    }, false);

    useEffect(() => {
        if (chart === null) {
            let parentElem = document.querySelector('.chartPersonalStream').getBoundingClientRect()
            setChart({ ...property, width: parentElem.width - 35 })
        }
    })
  
    return (
        <div className="chartPersonalStream">
            <div style={{ position: 'relative', top: '30px', left: '50px', fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontWeight: 'normal', fontSize: "1.5em" }}>Всего трудящихся: {allpers}</div>
            {chart === null ? null : <Charts data={data} property={chart} idElem={"chart2"} idContainer={"container3"} chartName={"Поток кадров"} />}
        </div>
    )
}

export default ChartPersonal;