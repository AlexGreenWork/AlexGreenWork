import React, { useState } from "react";
import States from "./adminStates"
import LastOffers from "./adminLastOffers"
//import MyResponsiveStream from './chartStates/chart'
import { ResponsiveLineCanvas } from '@nivo/line'
import s from './chartStates/chartStates.module.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Charts from './chartStates/chart'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import axios from 'axios'
import {API_URL} from '../../config'
import ChartPersonal from "./chartStates/chartPersonal/chartPersonal";

class TopComission extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {render: 0,
					buttonText:'Показать статистику',
					data: []};
	}



	render()

	{	  let data = {
        data1:{
            dataName: "В ОБРАБОТКЕ",
            value_x: [0, 30, 41, 36, 6, 0],
            value_y: [0, 14, 36, 51, 31, 0],
            color:"red"
        },
         data2:{
          dataName: "В ОБРАБОТКЕ",
          value_x: [0, 1, 2, 3, 4, 5],
          value_y: [0, 14, 36, 51, 31, 0],
          color:"red"
      },
    }

/* 
{
	"data_1": {
		"value_x": [0, 1, 2, 3, 4, 5],
		"value_y": [0, 14, 36, 51, 31, 0],
		"color": "#37d853",
		"dataName": "Пользователей зарегестрировано"
	},
	"data_2": {
		"value_x": [0, 1, 2, 3, 4, 5],
		"value_y": [0, 38, 41, 36, 6, 0],
		"color": "#524dd9",
		"dataName": "Подано предложений"
	}
} */
		if(this.state.render === 0){
		axios.post(`${API_URL}api/statistics/personnelStream`, { })
        .then(res => {
			this.setState({data: res.data, render: 1})
        
        })
	}
		
  let property = {
    type: "linear",
    color_line: ["#ac1cf5",'#5cf54a', "#cff112", "#ffa200"],
    width: 400,
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
    vertical_line: "false",
    vertical_line_width: "2",
    vertical_line_color: "#dddd",
    pen: {active :"true",
        circle_radius: 7,
        colorBorder: "blue",
        colorPouring: "white",
        lineWidth: '4'},
   
    textVertex: { active :"true",
                  correctX_pos: 10,
                  correctY_pos:-20,
                  font:"28px sans-serif",
                  text_color: 'blue',
                 },
    intCircle:{
        circle_radius: 12,
        colorBorder: "red",
        colorPouring: "white",
      
	
    },
		toolTipText:{
		type: "amount"
	},
     mouse :{
      padding_mouse_left: 15,
      padding_mouse_top: -80,
    },
    circleChart:{
      outer_radius: 300,
      inner_radius: 150,
	  text:{
		color: "black",
		type:"number"
	}
    }

}
	
		return(<div style={{
					position:"absolute",
				width:"90%",
				top:"100px",
				right:0,
				height:"calc(100% - 170px)",
					overflowY: "scroll",
				backgroundColor:"white"
				}}> 
        
					<div style={{
								display: "flex",
								flexDirection:"column",
								height: "fit-content",
				}}>
							<button className={s.buttonStatistic} onClick={()=>{
						if(this.state.render === 1){
							this.setState({render: 0
							});
						} else {
							this.setState({render: 1
							});
						}
					}} onMouseOver={()=>{
						this.setState({buttonText: <KeyboardArrowDownIcon className={s.buttonStatisticHover} />
						});
					}}
					onMouseLeave={()=>{this.setState({buttonText: "Показать статистику"
				})}}
					>{this.state.buttonText}</button>
						
						{ (this.state.render === 1) ? <States/> : <div></div>}
						{ (this.state.render === 1) ? <LastOffers/> : <div></div>}
						
			<ChartPersonal/>		
            <Charts data={this.state.data} property = {property} idElem={"chart23"} idContainer = {"container23"}/>
            {/* <Charts data={this.state.data} property = {property} idElem={"chart1"}/> */}
					{/* { (this.state.render === 0) ? <div className={s.chart}><RangeSlider/></div>: <div></div>} */}
					<div style={{width: "400px", height:"400px", background:"green",/*  position:"absolute", top:"523px" */}}></div>
					</div>
				</div>
		);
	}
}














export default TopComission
