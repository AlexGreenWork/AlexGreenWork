
import React, { useState, useEffect } from 'react'
import "./chart.css"
import { ToolTip, InputDataTool, DestroyTool } from "./toolTip/toolTip"
import CircleChart from "./circleChart/circleChart"
import { getFunctionName } from '@mui/utils/getDisplayName'


//////////////////
///// 1. Величины по Х не должны повторяться
///// 2. x_type : amount of elements - скалированные числа в зависимости от хМах 
//       year - за год в таком случае количкство rows_count = mounth length -1
// let property =  {
// type: "linear",
// color_line: ["#524dd9", "#37d853"],
// width: 700,
// height: 250,
// padding_top: 50,
// padding_right: 80,
// padding_left: 30,
// x_type: "amount of elements",
// rows_count: 4,
// text_color_rows: '#888888',
// font_style_rows: 'normal 28px Helvetica, sans-serif',
// money: "false",
// pouring: "true",
// lineWidthData: "4",
// vertical_line: "fasle",
// vertical_line_width: "2",
// vertical_line_color: "#dddd",
// pen: {active :"true",
//     circle_radius: 7,
//     colorBorder: "blue",
//     colorPouring: "white",
//     lineWidth: '4'},

// textVertex: { active :"true",
//                 correctX_pos: 10,
//                 correctY_pos:-20,
//                 font:"28px sans-serif",
//                 text_color: 'blue',
//                 },
// intCircle:{
//     circle_radius: 12,
//     colorBorder: "red",
//     colorPouring: "white",
//     lineWidth: '2'
// }, 
//  mouse :{
//     padding_mouse_left: 50,
//     padding_mouse_top: 50,
//   }
// }
//////////////////
function Charts(props) {
    // console.log( props.chartName , props.property)
    // obj.hasOwnProperty(prop)
    if (props.property.midleLine.valid === "true" && props.data !== null && props.dopData !== null && props.property !== null) {

        props.data['dataMidleLine'] = MidleLine(props.data, props.property, props.dopData)
    }

    let property = props.property
    let data = ColorLine(props.data, property.color_line)

    let sortObjdata = sortData(data)

    const [yMin, yMax] = computeBoundaries(data)
    const [xMin, xMax] = computeBoundariesX(data)
   

    if (property.x_type === 'year') {
        property = {
            ...property,
            rows_count: maxLengthXdata(data)
        }
    }

    function maxLengthXdata(data) {
        let arrData = Object.keys(data)
        let maxLength = 0;
        for (let i = 0; i < arrData.length; i++) {
            if (data[arrData[i]].value_x.length > maxLength) {
                maxLength = data[arrData[i]].value_x.length
            }

        }

        return maxLength - 1
    }

    useEffect(() => {
        if (props.data !== null) {
            Draw(property, data, yMin, yMax, xMin, xMax, sortObjdata, props.idElem, props.idContainer); legendsElem(data, props.idContainer, property.legend)
        }
    })

    return (/* font-family:"Roboto","Helvetica","Arial",sans-serif; font-weight: normal; */
        <div className='graph-Block' id={props.idContainer} style={{ width: `${props.property.width}px`, fontFamily: '"Roboto","Helvetica","Arial",sans-serif', fontWeight: 'normal', fontSize: "1.1em" }}  >
            <div style={{ textAlign: "center", fontSize: '1.4em' }}>{props.chartName}</div>
            <canvas id={props.idElem} ></canvas>
            <div className={`legends-chart${props.idContainer}`} style={{ display: 'flex', justifyContent: "space-around", marginTop: "5px" }}>
            </div>
        </div>
    )
}

const Draw = (property, data, yMin, yMax, xMin, xMax, sortObjdata, idElem, idContainer) => {

    var canvas = document.getElementById(idElem);


    canvas.style.width = property.width + "px"
    canvas.style.height = property.height + "px"
    const HEIGHT_DPI = property.height * 2;
    const WIDTH_DPI = property.width * 2;
    const VIEW_HEIGHT = HEIGHT_DPI - property.padding_top * 2;
    const VIEW_WIDTH = WIDTH_DPI - property.padding_right * 2
    const yRatio = VIEW_HEIGHT / ((yMax - yMin) == 0 ? VIEW_HEIGHT : (yMax - yMin))
    const xRatio = VIEW_WIDTH / (xMax - xMin)
    const CIRCLE_RADIUS = 10
    canvas.width = WIDTH_DPI;
    canvas.height = HEIGHT_DPI;



    const proxy = new Proxy({}, {
        set(...args) {
            const result = Reflect.set(...args)
            requestAnimationFrame(paint)
            // console.log('change', ...args );
            return result
        }
    })

    function paint() {

        clear()
        switch (property.type) {
            case "linear": const dataLinear = chartLinear(idElem, property, data, HEIGHT_DPI, WIDTH_DPI, VIEW_HEIGHT, yMin, yMax, yRatio, xRatio, xMax, xMin, VIEW_WIDTH, proxy.mouse)
                if (proxy.mouse === null) {
                    return null
                }
                verticalLineValue(proxy.mouse.x, dataLinear, property.padding_top, xRatio, HEIGHT_DPI, WIDTH_DPI, xMax, xMin, sortObjdata, property.padding_left, yRatio, property.padding_right, data, property.intCircle, property.x_type, idElem, property, data)

                break;
            case "circle":
                if (proxy.mouse !== null) {
                    CircleChart(idElem, idContainer, property, data, HEIGHT_DPI, WIDTH_DPI, proxy.mouse.x, proxy.mouse.y,);
                }
                if (proxy.mouse === null) {
                    return null
                }

                break;
        }


    }

    canvas.addEventListener('mousemove', mousemove);
    canvas.addEventListener('mouseleave', mouseleave);

    function mousemove({ clientX, clientY }) {

        proxy.mouse = {
            x: clientX,
            y: clientY
        }
        ToolTip(clientX, clientY, property.mouse, data, idElem, idContainer)

    }

    function mouseleave() {
        proxy.mouse = null
        DestroyTool()
    }

    const ctx = canvas.getContext("2d");

    function clear() {
        ctx.clearRect(0, 0, WIDTH_DPI, HEIGHT_DPI)
        switch (property.type) {
            case "linear": chartLinear(idElem, property, data, HEIGHT_DPI, WIDTH_DPI, VIEW_HEIGHT, yMin, yMax, yRatio, xRatio, xMax, xMin, VIEW_WIDTH);
              
                if (property.midleLine.valid === "true" &&   data.hasOwnProperty("dataMidleLine")) {
                   
                    const ctx = canvas.getContext("2d");
                    ctx.beginPath()
                    ctx.setLineDash([16, 16]);
                    ctx.moveTo(0,  (HEIGHT_DPI )  - property.padding_top - data.dataMidleLine.value_y[0] * yRatio  );
                    ctx.lineTo(WIDTH_DPI,  (HEIGHT_DPI )  - property.padding_top - data.dataMidleLine.value_y[0] * yRatio);
                    ctx.strokeStyle = "#959393"
                    ctx.stroke()
                    ctx.closePath()
                    ctx.setLineDash([]);
                }
                break;
            case "circle":
                CircleChart(idElem, idContainer, property, data, HEIGHT_DPI, WIDTH_DPI, 0, 0,);
                break;

        }
    }

    switch (property.type) {
        case "linear": chartLinear(idElem, property, data, HEIGHT_DPI, WIDTH_DPI, VIEW_HEIGHT, yMin, yMax, yRatio, xRatio, xMax, xMin, VIEW_WIDTH);
            break;
        case "circle": CircleChart(idElem, idContainer, property, data, HEIGHT_DPI, WIDTH_DPI,);


    }

}


function chartLinear(idElem, property, data, HEIGHT_DPI, WIDTH_DPI, VIEW_HEIGHT, yMin, yMax, yRatio, xRatio, xMax, xMin, VIEW_WIDTH, mouseX, CIRCLE_RADIUS) {

    renderingXscale(idElem, property, data, HEIGHT_DPI, WIDTH_DPI, VIEW_HEIGHT, yMin, yMax, yRatio, xRatio, xMax, xMin, VIEW_WIDTH, mouseX)

    var canvas = document.getElementById(idElem);
    const ctx = canvas.getContext("2d");
    const keyData = Object.keys(data)
    let step = VIEW_HEIGHT / property.rows_count
    let textStep = (yMax - yMin) / property.rows_count
    ctx.beginPath();
    ctx.font = property.font_style_rows
    ctx.fillStyle = property.text_color_rows
    /////////////////////////
    //// отрислвка текста шкалы у
    ////////////////////////


    for (let i = 1; i <= property.rows_count; i++) {

        let y = step * i
        const text = yMax - textStep * i

        if (property.money === "false") {
            let textValid = text.toString().split('.')

            ctx.fillText(textValid[0], 10, y + property.padding_top - 5)
        } else {
            let textValid = text.toString().split('.')

            if (textValid.length > 1) {

                ctx.fillText(textValid[0] + ',' + textValid[1].slice(0, 2), 10, y + property.padding_top - 5)
            } else {
                ctx.fillText(textValid[0], 10, y + property.padding_top - 5)
            }

        }

        ctx.moveTo(0, y + property.padding_top);
        ctx.lineTo(WIDTH_DPI, y + property.padding_top);
        ctx.strokeStyle = "#ddd"
        ctx.lineWidth = "2"

    }

    ctx.stroke()


    for (let i = 0; i < keyData.length; i++) {
        let arrData = []
        let dataElement = data[keyData[i]]

        let sort_X = Object.keys(dataElement.value_x.reduce((o, v, i) => { o[v] = v; return o; }, {})).map(num => parseInt(num));


        let max = Math.max(...dataElement.value_y)
        for (let k = 0; k < dataElement.value_x.length; k++) {
            if (keyData[i] !== "dataMidleLine") {
                arrData.push([sort_X[k], dataElement.value_y[dataElement.value_x.indexOf(sort_X[k])]])
            } else {
                arrData.push([sort_X[k], dataElement.value_y[dataElement.value_x.indexOf(sort_X[k])]])
            }

        }

        ctx.beginPath();
        if (property.pouring === "true") {

            for (let j = 0; j < arrData.length; j++) {

                let x_y = arrData[j]
                ctx.lineTo(x_y[0] * xRatio + property.padding_left + 20, HEIGHT_DPI - property.padding_top - x_y[1] * yRatio);
                ctx.strokeStyle = dataElement.color
                ctx.lineWidth = property.lineWidthData

                ctx.stroke()
                if (j === arrData.length - 1) {

                    let grd = ctx.createLinearGradient(WIDTH_DPI / 2, HEIGHT_DPI - property.padding_top - max * yRatio, WIDTH_DPI / 2, HEIGHT_DPI);
                    grd.addColorStop(0, dataElement.color);
                    grd.addColorStop(1, "#ffffff00");
                    if (keyData[i] === "dataMidleLine") {
                        grd.addColorStop(0, "#ffffff00");
                        grd.addColorStop(1, "#ffffff00");
                    }
                    ctx.lineTo(x_y[0] * xRatio + property.padding_left + 20, HEIGHT_DPI - property.padding_top);
                    ctx.lineTo(0 * xRatio + property.padding_left + 20, HEIGHT_DPI - property.padding_top);
                    ctx.fillStyle = grd;
                    ctx.fill()


                }
                //ctx.stroke()

            }
        } else {
            for (let j = 0; j < arrData.length; j++) {
                ctx.lineJoin = "bevel"
                let x_y = arrData[j]
                //ctx.lineJoin = "bevel" || "round" || "miter";
                ctx.lineTo(x_y[0] * xRatio + property.padding_left + 20, HEIGHT_DPI - property.padding_top - x_y[1] * yRatio);
                ctx.strokeStyle = dataElement.color
                ctx.lineWidth = property.lineWidthData
                ctx.stroke()

            }
        }

        // if(property.midleLine.valid === "true"){
        //             MidleLine( canvas, data, HEIGHT_DPI, WIDTH_DPI,  yRatio, xRatio, property)
        //         }

        ctx.closePath();

        if (property.pen.active === 'true') {
            drawPen(idElem, null, null, property.pen, mouseX, arrData, xRatio, property.padding_left, HEIGHT_DPI, property.padding_top, yRatio)
        }
        if (property.textVertex.active === "true") {
            if (i !== keyData.length - 1 && keyData[i] !== "dataMidleLine") {
                darwTextVertex(idElem, arrData, xRatio, property.padding_left, HEIGHT_DPI, property.padding_top, yRatio, property.textVertex.correctX_pos, property.textVertex.correctY_pos, property.textVertex.font, property.textVertex.text_color, data)
            }

        }

    }
    if (property.midleLine.valid === "true" &&   data.hasOwnProperty("dataMidleLine")) {
                  
        const ctx = canvas.getContext("2d");
        ctx.beginPath()
        ctx.setLineDash([16, 16]);
        ctx.moveTo(0,  (HEIGHT_DPI )  - property.padding_top - data.dataMidleLine.value_y[0] * yRatio  );
        ctx.lineTo(WIDTH_DPI,  (HEIGHT_DPI )  - property.padding_top - data.dataMidleLine.value_y[0] * yRatio);
        ctx.strokeStyle = "#959393"
        
        ctx.stroke()
        ctx.closePath()
        ctx.setLineDash([]);
    }

}

function computeBoundaries(data) {
    let min;
    let max;
    const keyData = Object.keys(data)
    for (let i = 0; i < keyData.length; i++) {
        let dataElement_Y = data[keyData[i]].value_y
        for (let j = 0; j < dataElement_Y.length; j++) {
            let y = dataElement_Y[j]

            if (typeof min !== 'number') min = y
            if (typeof max !== 'number') max = y

            if (min > y) {
                min = y
            }
            if (max < y) {
                max = y
            }
        }

    }

    return [min, max]
}

function renderingXscale(idElem, property, data, HEIGHT_DPI, WIDTH_DPI, VIEW_HEIGHT, yMin, yMax, yRatio, xRatio, xMax, xMin, VIEW_WIDTH, mouseX) {

    var canvas = document.getElementById(idElem);

    const ctx = canvas.getContext("2d");
    const keyData = Object.keys(data)

    /// horizontal line
    let step = (VIEW_WIDTH) / property.rows_count
    let textStep = (xMax - xMin) / property.rows_count
    ctx.beginPath();
    ctx.font = property.font_style_rows
    ctx.fillStyle = property.text_color_rows
    /////////////////////////
    //// отрисовка текста шкалы x
    ////////////////////////

    const month = ["Янв ", "Фев ", "Мар ", "Апр ", "Май", "Июн", "Июл ", "Авг ", "Сен ", "Окт ", "Нояб", "Дек "]

    const monthV = month.slice(0, property.rows_count).reverse()

    for (let i = property.rows_count; i >= 0; i--) {

        let monthIndex = month.indexOf(monthV[i])

        let x = step * i

        const text = xMax - textStep * i

        if (property.money === "false" && property.x_type === "amount of elements") {
            let textValid = text.toString().split('.')

            ctx.fillText(textValid[0], VIEW_WIDTH - x + 60, VIEW_HEIGHT + property.padding_top + 30)

        }

        if (property.x_type === "year") {
            let num_year = new Date()
            let date = new Date(num_year.getFullYear(), i, 0)

            if (month[monthIndex] === undefined) {
                ctx.fillText(0, VIEW_WIDTH - x + 60, VIEW_HEIGHT + property.padding_top + 30)
            } else {
                let num_year = new Date()
                let date = new Date(num_year.getFullYear(), monthIndex + 1, 0)

                if (0 === i) {

                    ctx.fillText(month[monthIndex] + num_year.getDate(), VIEW_WIDTH - x + 20, VIEW_HEIGHT + property.padding_top + 30)
                } else {
                    ctx.fillText(month[monthIndex] + date.getDate(), VIEW_WIDTH - x + 20, VIEW_HEIGHT + property.padding_top + 30)
                }

            }

        }

        // вертикальные линии
        if (property.vertical_line === "true") {
            if (i === 0) {
                ctx.moveTo(0 + property.padding_left + 20, 0);
                ctx.lineTo(0 + property.padding_left + 20, HEIGHT_DPI);
            }
            //   console.log(sortData(data))
            //  const VIEW_WIDTH = WIDTH_DPI - property.padding_right * 2
            ctx.moveTo(x + property.padding_left + 20, 0);
            ctx.lineTo(x + property.padding_left + 20, HEIGHT_DPI - property.padding_top + 10);
            ctx.strokeStyle = property.vertical_line_color
            ctx.lineWidth = property.vertical_line_width

            if (property.midleLine.valid === "true" &&  data.hasOwnProperty("dataMidleLine"))
            {
            
                ctx.fillText( data.dataMidleLine.razn_value[i], x + property.padding_left + 20 + property.midleLine.leftpadding ,  property.midleLine.textLinePadding + 10)
              
            }
          //  ctx.fill
        }


    }

    ctx.stroke()
    ctx.closePath();

}

function computeBoundariesX(data) {
    let min;
    let max;
    const keyData = Object.keys(data)
    for (let i = 0; i < keyData.length; i++) {
        let dataElement_X = data[keyData[i]].value_x
        for (let j = 0; j < dataElement_X.length; j++) {
            let x = dataElement_X[j]
            if (typeof min !== 'number') min = x
            if (typeof max !== 'number') max = x

            if (min > x) {
                min = x
            }
            if (max < x) {
                max = x
            }
        }

    }
    return [min, max]
}

function verticalLineValue(mouseX, dataX, padding_top, xRatio, HEIGHT_DPI, WIDTH_DPI, xMax, xMin, sortObjdata, padding_left, yRatio, padding_right, data, intCircle, x_type, idElem, property) {
    // console.log(mouseX, xRatio,  xMax, xMin)

    var canvas = document.getElementById(idElem);
    const { left } = canvas.getBoundingClientRect()

    let elemData = Object.keys(sortObjdata)
    //razn_value

    const ctx = canvas.getContext("2d");
    let mouse_circle = (mouseX - left) * 2
    ctx.beginPath();
    ctx.moveTo((mouseX - left) * 2, 0);
    ctx.lineTo((mouseX - left) * 2, HEIGHT_DPI - padding_top);
    ctx.strokeStyle = "#0486ff";
    ctx.lineWidth = "2";
    ctx.stroke();
    let checkCirkle = false

    for (let i = 0; i < elemData.length; i++) {

        for (let j = 0; j < sortObjdata[elemData[i]].length; j++) {

            let x = sortObjdata[elemData[i]][j][0]
            let y = sortObjdata[elemData[i]][j][1]
            let color = data[elemData[i]].color
            let dataMidleLine = null
            if (elemData[i] === "dataMidleLine") {
                dataMidleLine = data.dataMidleLine.razn_value[j]
                
            }

            if (isOver(idElem, mouseX, x, sortObjdata[elemData[i]].length, y, WIDTH_DPI, HEIGHT_DPI, padding_left, padding_top, xRatio, yRatio, padding_right, mouse_circle, data[elemData[i]].dataName, color, intCircle, elemData[i], x_type, property, dataMidleLine) === true) {
                checkCirkle = true
                break;
            } else {
                if (i === elemData.length - 1 && j === sortObjdata[elemData[i]].length - 1 && checkCirkle === false) {

                    DestroyTool()
                } else {
                    // console.log("checkCirkle else", checkCirkle)
                }
            }
        }
    }

    ctx.stroke();
    ctx.closePath();


}




function sortData(data) {
    let keyData = Object.keys(data)

    let objData = {}
    for (let i = 0; i < keyData.length; i++) {
        let arrData = []
        let dataElement = data[keyData[i]]
        let sort_X = Object.keys(dataElement.value_x.reduce((o, v, i) => { o[v] = v; return o; }, {})).map(num => parseInt(num));

        for (let k = 0; k < dataElement.value_x.length; k++) {
            arrData.push([sort_X[k], dataElement.value_y[dataElement.value_x.indexOf(sort_X[k])]])
        }
        objData[keyData[i]] = arrData
    }

    return objData
}

function sortDataXlineIndicator(data) {
    let keyData = Object.keys(data)
    let arrData = []

    for (let i = 0; i < keyData.length; i++) {

        let dataElement = data[keyData[i]]
        let sort_X = Object.keys(dataElement.value_x.reduce((o, v, i) => { o[v] = v; return o; }, {})).map(num => parseInt(num));

        for (let k = 0; k < dataElement.value_x.length; k++) {
            arrData.push([sort_X[k], dataElement.value_y[dataElement.value_x.indexOf(sort_X[k])]])
        }
        // objData[keyData[i]] = arrData
    }
    let sort_X_all = Object.keys(arrData.reduce((o, v, i) => { o[v] = v; return o; }, {})).map(num => parseInt(num));

    let arr = []
    sort_X_all.map((el, i) => {

        if (i !== sort_X_all.length - 1) {
            let center = (sort_X_all[i + 1] - el) / 2;

            arr.push(el)
            arr.push(Math.abs(center))
        }

    })
    return arr
}


function drawPen(idElem, x, y, propertyPen, mouseX, arrData, xRatio, padding_left, HEIGHT_DPI, padding_top, yRatio, color) {

    var canvas = document.getElementById(idElem);
    const ctx = canvas.getContext("2d");

    for (let j = 0; j < arrData.length; j++) {
        ctx.beginPath();
        let x_y = arrData[j]
        ctx.arc(x_y[0] * xRatio + padding_left + 20, HEIGHT_DPI - padding_top - x_y[1] * yRatio, propertyPen.circle_radius, 0, Math.PI * 2)
        ctx.strokeStyle = propertyPen.colorBorder
        ctx.lineWidth = propertyPen.lineWidth
        ctx.stroke()
        ctx.fill()
        ctx.fillStyle = propertyPen.colorPouring
        ctx.closePath();
    }
    // ctx.stroke()

}

function darwTextVertex(idElem, arrData, xRatio, padding_left, HEIGHT_DPI, padding_top, yRatio, correctX_pos, correctY_pos, font, text_color, data) {
    var canvas = document.getElementById(idElem);
    const ctx = canvas.getContext("2d");


    for (let j = 0; j < arrData.length; j++) {
        ctx.beginPath();
        let x_y = arrData[j]

        let text = x_y[1];
        // if(data.hasOwnProperty('dataMidleLine')){
        //     text = data.dataMidleLine.razn_value[j]
        // }
        if (text == undefined) {
            text = '0';
        }
        ctx.fillText(text, x_y[0] * xRatio + padding_left + correctX_pos, (HEIGHT_DPI - padding_top - x_y[1] * yRatio) + correctY_pos)
        ctx.fillStyle = text_color
        ctx.font = font
        ctx.stroke()
        ctx.closePath();
    }

}

function drawIntCircle(idElem, x, y, WIDTH_DPI, HEIGHT_DPI, padding_left, padding_top, xRatio, yRatio, intCircle) {

    var canvas = document.getElementById(idElem);
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x * xRatio + padding_left + 20, HEIGHT_DPI - padding_top - y * yRatio, intCircle.circle_radius, 0, Math.PI * 2)
    ctx.fillStyle = intCircle.colorPouring
    ctx.strokeStyle = intCircle.colorBorder
    ctx.lineWidth = intCircle.lineWidth
    ctx.fill()
    ctx.stroke()

}

function isOver(idElem, mouse, x, length, y, WIDTH_DPI, HEIGHT_DPI, padding_left, padding_top, xRatio, yRatio, padding_right, mouse_circle, nameData, color, intCircle, elemData, x_type, property, dataMidleLine) {
    const width = WIDTH_DPI / length;

    //    if(dataMidleLine !== null){
    //         x = dataMidleLine
    //    }
    let x_line = (x * xRatio + padding_left + 20)
    if (!mouse) {
        return false
    }

    if (Math.trunc(x_line) - 25 < Math.trunc(mouse_circle) && Math.trunc(x_line) + 25 > Math.trunc(mouse_circle)) {

        drawIntCircle(idElem, x, y, WIDTH_DPI, HEIGHT_DPI, padding_left, padding_top, xRatio, yRatio, intCircle)
        if (dataMidleLine === null || dataMidleLine === undefined) {
            InputDataTool(idElem, x, y, nameData, color, elemData, x_type, property);
        } else {
            InputDataTool(idElem, x, dataMidleLine, nameData, color, elemData, x_type, property);
        }

        return true
    }


}

function legendsElem(data, idContainer, prop_legend) {
    let container = document.querySelector('.legends-chart' + idContainer);
    let elemKey = Object.keys(data)

    if (data.length !== 0) {
        if (prop_legend == "value") {
            for (let i = 0; i < elemKey.length; i++) {

                let elem = document.createElement('div')
                let legend_items = document.querySelector('#legend_items' + i + "legends-chart" + idContainer)
                if (legend_items === null) {

                    elem.innerHTML = `<div style='display: flex; align-items: center; flex-direction: row;'>
    
                <div id='legend_items${i}legends-chart${idContainer}' style= 'width: 25px; height: 25px; border-radius:5px; background: ${data[elemKey[i]].color}; 
                margin: 5px;'></div>
                <div style = "padding-right: 5px;">${data[elemKey[i]].value_x}</div>
                <div>${data[elemKey[i]].dataName}</div>
                </div>`
                    container.appendChild(elem)

                }
            }
        } else {
            for (let i = 0; i < elemKey.length; i++) {

                let elem = document.createElement('div')
                let legend_items = document.querySelector('#legend_items' + i + "legends-chart" + idContainer)
                if (legend_items === null) {

                    elem.innerHTML = `<div style='display: flex; align-items: center; flex-direction: row;'>
    
                <div id='legend_items${i}legends-chart${idContainer}' style= 'width: 25px; height: 25px; border-radius:5px; background: ${data[elemKey[i]].color}; 
                margin: 5px;'></div>
                <div>${data[elemKey[i]].dataName}</div>
                </div>`
                    container.appendChild(elem)

                }
            }
        }

    }

}

function ColorLine(data, color) {
    // console.log("ColorLine", data)
    if (data !== null) {

        let elemKey = Object.keys(data)
        for (let i = 0; i < elemKey.length; i++) {
            data[elemKey[i]]["color"] = color[i]
        }

        return data
    }
    let dataFalse = {
        data1: {
            dataName: "В ОБРАБОТКЕ",
            value_x: [0, 30, 41, 36, 6, 0],
            value_y: [0, 14, 36, 51, 31, 0],
            color: "red"
        },
        data2: {
            dataName: "В ОБРАБОТКЕ",
            value_x: [0, 1, 2, 3, 4, 5],
            value_y: [0, 14, 36, 51, 31, 0],
            color: "red"
        },
    }
    return dataFalse
}


export function MidleLine(data, property, dopData) {

    let sortDataObj = sortData(data);
   
    const [yMin, yMax] = computeBoundaries(data)
    let numberElem = Object.keys(sortDataObj)
    let validArr = false; // проверка на равное количество значений в массивах
    let arrLengthArr = [];
  
    for (let i = 0; i < numberElem.length; i++) {
        arrLengthArr.push(sortDataObj[numberElem[i]].length)
    }
    for (let i = 0; i < arrLengthArr.length; i++) {

        if (arrLengthArr[0] === arrLengthArr[i]) {
            validArr = true
        } else {
            break
        }

    }

    if (validArr === true) {

        let arrMidle = vlueMidleData(sortDataObj, dopData);
        
        let objData = {
            dataName: property.midleLine.name,
            value_x: arrMidle[0],
            value_y: arrMidle[1],
            razn_value: arrMidle[2],
            color: "red"
        }



        // ctxMidle.beginPath();

        // ctxMidle.moveTo(0, (HEIGHT_DPI - property.padding_top) / 2);

        // for(let i = 0; i < arrMidle.length; i++){

        // //    if( i < arrMidle.length-1){
        // //        console.log(arrMidle[i][1])
        // //        let cp1_x = (arrMidle[i][0] * xRatio + property.padding_left + 20)+0
        // //        let cp1_y = (HEIGHT_DPI - property.padding_top - arrMidle[i][1] * yRatio)-50
        // //        let cp2_x = (arrMidle[i][0] * xRatio + property.padding_left + 20)+0
        // //        let cp2_y = (HEIGHT_DPI - property.padding_top - arrMidle[i][1] * yRatio)-10
        // //     let x = arrMidle[i][0] * xRatio + property.padding_left + 20;
        // //     let y = HEIGHT_DPI - property.padding_top - arrMidle[i][1] * yRatio
        // //    ctxMidle.bezierCurveTo(cp1_x, cp1_y, cp2_x, cp2_y, x , y  );

        // // }      
        //     ctxMidle.lineTo( arrMidle[i][0] * xRatio + property.padding_left + 20, HEIGHT_DPI - property.padding_top - arrMidle[i][1] * yRatio);
        // }
        // // ctxMidle.bezierCurveTo (120, 30, 240, 30, 240, 120); 
        // //ctxMidle.lineTo(100, 100)
        // ctxMidle.strokeStyle = "red"
        // ctxMidle.lineWidth = "4"

        // ctxMidle.stroke();
        // ctxMidle.closePath();

        // }

        function vlueMidleData(sortDataObj, dopData) {

            const HEIGHT_DPI = property.height * 2;
            const VIEW_HEIGHT = HEIGHT_DPI - property.padding_top * 2;
            let yRatio = VIEW_HEIGHT / (yMax - yMin)
            let valueNull =  HEIGHT_DPI -  (property.padding_top * 2) - (yMax / 2) * yRatio
          
            let valueLastPers = dopData
            let arrMidle = []
            let x_value = [0]
            let y_value = [valueNull + 50]
            let razn_value = [0]
            let arrTextValue = []
            let sumRazn = []
            for (let i = 0; i < sortDataObj[numberElem[0]].length; i++) {
                let value = 0;
                let valueRazn = 0
                for (let j = 0; j < numberElem.length; j++) {
                    let arrDataElem = sortDataObj[numberElem[j]];
                    if (value === 0) {
                        value = arrDataElem[i][1]
                        valueRazn = arrDataElem[i][1]
                    } else {
                        value = value / arrDataElem[i][1]
                        valueRazn = valueRazn - arrDataElem[i][1]
                        // y_value.push((1 / value) * 55 )
                        y_value.push(valueRazn + (yMax / 2))
                        x_value.push(i)

                        // console.log(valueRazn)
                        razn_value.push(valueRazn * (-1))

                        //razn_value.push(valueLastPers - (valueRazn * (-1))) 
                        //valueLastPers =  valueLastPers - (valueRazn * (-1))
                        // arrMidle.push([i, (1 / value) * 35  ])
                        value = 0
                        valueRazn = 0
                    }


                }
            }
            razn_value = razn_value.slice(1)
            for (let i = 0; i < razn_value.length; i++) {
                let valuerazn = 0;
                for (let k = i; k < razn_value.length; k++) {
                    valuerazn += razn_value[k]
                    if (k == razn_value.length - 1) {
                        sumRazn.push(valuerazn)
                    }

                }

            }
            sumRazn.push(0)

            for (let i = 0; i < sumRazn.length; i++) {
                arrTextValue.push(dopData - sumRazn[i])
            }
            razn_value.unshift(0)
            sumRazn.reverse()

            let arrChartValue = []
          
            for (let i = 0; i < sumRazn.length; i++) {
                arrChartValue.push((yMax / 2) + sumRazn[i] / 2)
            }

            return [x_value, arrChartValue, arrTextValue]
        }
        return objData
    }
    return null
}


export default Charts