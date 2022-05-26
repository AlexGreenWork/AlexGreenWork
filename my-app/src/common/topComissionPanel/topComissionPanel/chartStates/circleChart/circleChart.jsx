import React, { useState, useEffect } from 'react'
import "./chart.css"
import { ToolTip, InputDataTool, DestroyTool } from "../toolTip/toolTip"
function CircleChart(idElem, idContainer, property, data, HEIGHT_DPI, WIDTH_DPI, proxy_mouse_y, proxy_mouse_x,) {

    let arrData = []
    let arrData_value = []
    let objDataKey = Object.keys(data)
    let sumData = 0;
    for (let i = 0; i < objDataKey.length; i++) {
        let elemValue = data[objDataKey[i]].value_x[0]
        sumData += elemValue
        arrData_value.push(elemValue)
    }
    for (let i = 0; i < objDataKey.length; i++) {
        let elemValue = data[objDataKey[i]].value_x[0]
        let proc = (elemValue * 100) / sumData
        let name = data[objDataKey[i]].dataName
        arrData.push([proc, data[objDataKey[i]].color, name])
    }

    const canvas = document.querySelector('#' + idElem)
    const ctx = canvas.getContext("2d");
    let sumSector = 0
    let sumSector1 = 0
    let arrCancel = []


    arrData.map((value, i) => {
        let nextLine = []
        arrCancel.push(Sector1(ctx, value[0] + sumSector1, nextLine, value[1], WIDTH_DPI, HEIGHT_DPI, property.circleChart.inner_radius, property.circleChart.outer_radius))
        sumSector1 += value[0]

    })

    ctx.clearRect(0, 0, WIDTH_DPI, HEIGHT_DPI)
    arrData.map((value, i) => {
        let nextLine = []

        if (i != arrData.length) {
            if ((i - 1) < 0) {
                Sector(ctx, value[0] + sumSector, arrCancel[arrData.length - 1], value[1], WIDTH_DPI, HEIGHT_DPI, property.circleChart.inner_radius, property.circleChart.outer_radius, arrData[i], property.circleChart.text, sumSector, arrData_value[i], canvas, proxy_mouse_y, proxy_mouse_x, 1, property.mouse, value[0], idElem, property);
            } else {
                Sector(ctx, value[0] + sumSector, arrCancel[i - 1], value[1], WIDTH_DPI, HEIGHT_DPI, property.circleChart.inner_radius, property.circleChart.outer_radius, arrData[i], property.circleChart.text, sumSector, arrData_value[i], canvas, proxy_mouse_y, proxy_mouse_x, null, property.mouse, value[0], idElem, property);
            }

        }
        sumSector += value[0]

    })

    if (proxy_mouse_y !== 0 && proxy_mouse_x !== 0) {
        Interactive(ctx, canvas, HEIGHT_DPI, WIDTH_DPI, proxy_mouse_y, proxy_mouse_x)
    }

    ctx.beginPath();
    ctx.font = "normal 48px Helvetica, sans-serif";
    ctx.fillStyle = "black"
    ctx.strokeStyle = "black"
    ctx.lineWidth = 4;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(sumData, (WIDTH_DPI / 2), (HEIGHT_DPI / 2))
    ctx.closePath();

}
let preValue = 0;
function Sector(ctx, value, nextLine, color, WIDTH_DPI, HEIGHT_DPI, inner_radius, outer_radius, data, propText, sumSector, dataNumber, canvas, mouseX, mouseY, number1, property_mouse, value_data, idElem, property) {
   
    let nextLineStartX = nextLine[2];
    let nextLineStartY = nextLine[3];
    let nextLineEndX = nextLine[0];
    let nextLineEndY = nextLine[1];
    let ugMouse = Interactive(ctx, canvas, HEIGHT_DPI, WIDTH_DPI, mouseX, mouseY)
    let ugRad = (((360 * value) / 100) * Math.PI) / 180
    ctx.beginPath();
    ctx.strokeStyle = color
    ctx.fillStyle = color

    if (ugMouse !== 0 && mouseX !== 0 && mouseY !== 0) {
        if (ugMouse > preValue && ugMouse < ugRad) {
            nextLineStartX = nextLine[4];
            nextLineStartY = nextLine[5];
            nextLineEndX = nextLine[6];
            nextLineEndY = nextLine[7];
            inner_radius += 30;
            outer_radius += 30;
            InputDataTool(null, Math.round(data[0]) + '%', dataNumber, null, color, `data123`, null, property);
        }

        if (number1 == 1 && ugMouse < preValue && ugMouse < ugRad) {
            nextLineStartX = nextLine[4];
            nextLineStartY = nextLine[5];
            nextLineEndX = nextLine[6];
            nextLineEndY = nextLine[7];
            inner_radius += 30;
            outer_radius += 30;

            InputDataTool(null, Math.round(data[0]) + '%', dataNumber, null, color, "data123", null, property);
        }
    }

    let arcInnerPenX = inner_radius * Math.cos(ugRad) + WIDTH_DPI / 2
    let arcIinnerPenY = inner_radius * Math.sin(ugRad) + HEIGHT_DPI / 2;
    let arcOuterPenX = outer_radius * Math.cos(ugRad) + WIDTH_DPI / 2
    let arcOuterPenY = outer_radius * Math.sin(ugRad) + HEIGHT_DPI / 2;
    ctx.moveTo(nextLineStartX, nextLineStartY);
    ctx.lineTo(nextLineEndX, nextLineEndY)
    ctx.arc(WIDTH_DPI / 2, HEIGHT_DPI / 2, outer_radius, preValue, ugRad, false)
    ctx.arc(WIDTH_DPI / 2, HEIGHT_DPI / 2, inner_radius, ugRad, preValue, true)
    ctx.fill()
    ctx.stroke()
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white"
    ctx.stroke()
    ctx.closePath();

    if (propText.type === "proc") {
        let ugRadpre = (((360 * sumSector) / 100) * Math.PI) / 180
        let radText = inner_radius + (outer_radius - inner_radius) / 2
        let arcInnerPenXPre = radText * Math.cos(ugRad - (ugRad - ugRadpre) / 2) + WIDTH_DPI / 2
        let arcIinnerPenYPre = radText * Math.sin(ugRad - (ugRad - ugRadpre) / 2) + HEIGHT_DPI / 2;
        let arcInnerPenXText = arcInnerPenXPre
        let arcIinnerPenYText = arcIinnerPenYPre;
        ctx.beginPath();
        ctx.font = "bold 35px Helvetica, sans-serif";
        ctx.fillStyle = "white"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.strokeText(Math.round(data[0]) + "%", arcInnerPenXText, arcIinnerPenYText)
        ctx.fillText(Math.round(data[0]) + "%", arcInnerPenXText, arcIinnerPenYText)
        ctx.closePath();

    } else if (propText.type === "number") {

        let ugRadpre = (((360 * sumSector) / 100) * Math.PI) / 180
        let radText = inner_radius + (outer_radius - inner_radius) / 2
        let arcInnerPenXPre = radText * Math.cos(ugRad - (ugRad - ugRadpre) / 2) + WIDTH_DPI / 2
        let arcIinnerPenYPre = radText * Math.sin(ugRad - (ugRad - ugRadpre) / 2) + HEIGHT_DPI / 2;
        let arcInnerPenXText = arcInnerPenXPre
        let arcIinnerPenYText = arcIinnerPenYPre;
        ctx.beginPath();
        ctx.font = "bold 35px Helvetica, sans-serif";
        ctx.fillStyle = "white"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 4;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.strokeText(dataNumber, arcInnerPenXText, arcIinnerPenYText)
        ctx.fillText(dataNumber, arcInnerPenXText, arcIinnerPenYText)
      
        ctx.closePath();

    }

    preValue = ugRad;
    return [arcOuterPenX, arcOuterPenY, arcInnerPenX, arcIinnerPenY]
}

function Sector1(ctx, value, nextLine, color, WIDTH_DPI, HEIGHT_DPI, inner_radius, outer_radius) {

    let ugRad = (((360 * value) / 100) * Math.PI) / 180
    let arcInnerPenX = inner_radius * Math.cos(ugRad) + WIDTH_DPI / 2
    let arcIinnerPenY = inner_radius * Math.sin(ugRad) + HEIGHT_DPI / 2;
    let arcOuterPenX = outer_radius * Math.cos(ugRad) + WIDTH_DPI / 2
    let arcOuterPenY = outer_radius * Math.sin(ugRad) + HEIGHT_DPI / 2;
    let startPenOuterX = outer_radius * Math.sin(preValue) + WIDTH_DPI / 2
    let startPenOuterY = outer_radius * Math.sin(preValue) + HEIGHT_DPI / 2
    let arcInnerPenXSelect = (inner_radius + 100) * Math.cos(ugRad) + WIDTH_DPI / 2
    let arcIinnerPenYSelect = (inner_radius + 100) * Math.sin(ugRad) + HEIGHT_DPI / 2;
    let arcOuterPenXSelect = (outer_radius + 100) * Math.cos(ugRad) + WIDTH_DPI / 2
    let arcOuterPenYSelect = (outer_radius + 100) * Math.sin(ugRad) + HEIGHT_DPI / 2;
    preValue = ugRad;
    return [arcOuterPenX, arcOuterPenY, arcInnerPenX, arcIinnerPenY, arcInnerPenXSelect, arcIinnerPenYSelect, arcOuterPenXSelect, arcOuterPenYSelect]
}


function nextSector(value, value1, WIDTH_DPI, HEIGHT_DPI, inner_radius, outer_radius, sumSector, arcOuterPenXSelect) {

    value = sumSector + value[0] + value1[0]
    let ugRad = (((360 * value) / 100) * Math.PI) / 180
    let arcInnerPenX = inner_radius * Math.cos(ugRad) + WIDTH_DPI / 2
    let arcIinnerPenY = inner_radius * Math.sin(ugRad) + HEIGHT_DPI / 2;
    let arcOuterPenX = outer_radius * Math.cos(ugRad) + WIDTH_DPI / 2
    let arcOuterPenY = outer_radius * Math.sin(ugRad) + HEIGHT_DPI / 2;

    return [arcInnerPenX, arcIinnerPenY, arcOuterPenX, arcOuterPenY]
}

function Interactive(ctx, canvas, HEIGHT_DPI, WIDTH_DPI, mouseX, mouseY) {

    const { left, top } = canvas.getBoundingClientRect()
    let canvMouseX = (mouseX - left) * 2;
    let canvMouseY = (mouseY - top) * 2;
    let ugTR = 0;
    let formRadCircle = 0;

    if (canvMouseX > WIDTH_DPI / 2 && canvMouseY > HEIGHT_DPI / 2) { // 3 четверть
        ugTR = (((HEIGHT_DPI / 2) - (mouseY - top) * 2)) / (((WIDTH_DPI / 2) - (mouseX - left) * 2))
        formRadCircle = Math.atan(ugTR)
    } else if (canvMouseX < WIDTH_DPI / 2 && canvMouseY > HEIGHT_DPI / 2) {
        ugTR = (((mouseY - top) * 2) - (HEIGHT_DPI / 2)) / ((WIDTH_DPI / 2) - ((mouseX - left) * 2))
        formRadCircle = Math.PI / 2 + (Math.PI / 2 - Math.atan(ugTR))
    } else if (canvMouseX < WIDTH_DPI / 2 && canvMouseY < HEIGHT_DPI / 2) { // первая четверть
        ugTR = ((HEIGHT_DPI / 2) - ((mouseY - top) * 2)) / ((WIDTH_DPI / 2) - ((mouseX - left) * 2))
        formRadCircle = Math.PI + Math.atan(ugTR)
    } else if (canvMouseX > WIDTH_DPI / 2 && canvMouseY < HEIGHT_DPI / 2) { //вторая четверть
        ugTR = ((HEIGHT_DPI / 2) - ((mouseY - top) * 2)) / (((mouseX - left) * 2) - (WIDTH_DPI / 2))
        formRadCircle = 1.5 * Math.PI + (Math.PI / 2 - Math.atan(ugTR))
    }
    
    return formRadCircle
}

export default CircleChart