import React from "react";
import {Budget} from "./budget";
import {Card, CardContent, Grid, Typography } from '@mui/material';
import server from '../../actions/server';
import { API_URL } from '../../config';
import moment from 'moment';
import s from "./TopComission.module.css"
import Charts from "./chartStates/chart";
import axios from "axios";

class OffersState extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = { state: [],
						info: [],
						pointer: moment(),
						data:[],
						property:{},
						propertyCircle : {},
						dataChart:{}
					};

		this.month_table = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount()

	{
		server.send_post_request(`${API_URL}api/offers/offersState`)
			.then((res) => {
				let keyobjData = Object.keys(res.data.state)
				let validData = {};
				let validDataElem = {};
				for(let i = 0; i < keyobjData.length; i++){
					validDataElem = {

							dataName: "В ОБРАБОТКЕ",
							value_x: [109],
							value_y: [0],
							color:"red"

					}
					validDataElem.dataName = `${keyobjData[i]}`;
					validDataElem.value_x = [res.data.state[keyobjData[i]]]
					validDataElem.value_y = [0]
					validDataElem.color = "red"
					validData["data"+i] = validDataElem
				}


					this.setState({ state: res.data.state,
									info: res.data.info,
									dataChart: validData});

			});

				axios.post(`${API_URL}api/statistics/usersRegistration`, { })
				.then(res => {
					this.setState({data: res.data})

			})

			let parentElem = document.querySelector('.'+s.info_all_count).getBoundingClientRect()

			let property = {
				type: "linear",
				color_line: ["#524dd9", "#37d853"],
				width: parentElem.width-35,
				height: 150,
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
				vertical_line: "fasle",
				vertical_line_width: "2",
				vertical_line_color: "#dddd",
				pen: {active :"true",
					circle_radius: 7,
					colorBorder: "blue",
					colorPouring: "white",
					lineWidth: '4'},
				toolTipText:{
					type: "amount"
				},

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
					lineWidth: '2'
				},
				 mouse :{
				  padding_mouse_left: 15,
				  padding_mouse_top: -80,
				},
				midleLine:{
					valid: "false",

				}

			}
			this.setState({property:property});

		let propertyCircle = {
			type: "circle",
			legend:"value",
			color_line: ["#ff7600",'#2fcd37', "#f53434"],
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
			vertical_line: "fasle",
			vertical_line_width: "2",
			vertical_line_color: "#dddd",

			midleLine:{
				valid: "false",

			},
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
			mouse :{
				padding_mouse_left: 15,
				padding_mouse_top: -80,
			},
			toolTipText:{
				type: "amount"
			},
			circleChart:{
				outer_radius: 300,
				inner_radius: 150,
				text:{
					color: "black",
					type:"proc"
				},

			}

		}
			this.setState({propertyCircle: propertyCircle});
	}

	/**
		* @typedef {Object} States
		* @property {number} c
		* @property {number} d
		* @property {number} m
		*
		* @params {Array<States>} state
		*
		* @typedef {Object} State
		* @property {number} all
		* @property {number} last_year
		* @property {number} last_month
		*
		* @return State
	**/
	calculate_offers_info(state)
	{
		const current_month = this.state.pointer.month() + 1;
		const current_year = this.state.pointer.year();

		const last_pointer = this.state.pointer.clone().year(this.state.pointer.year() - 1).month(this.state.pointer.month());

		const last_month = last_pointer.month();
		const last_year =  last_pointer.year();

		const result = {all: 0,
						begin_year_range: current_year,
						last_year_range: current_year,
						diff_year: 0,
						diff_month: 0,
						last_year_state: 0,
						last_month_state: 0}

		let diff_y = 0;
		let diff_m = 0;

		for(const s of state)
		{
			result.all += s.c;

			if(s.y < result.begin_year_range)
			{
				result.begin_year_range = s.y;
			}

			if(s.y === last_year)
			{
				diff_y += s.c;
			}

			if(s.y === current_year)
			{
				result.last_year_state += s.c;

				if(s.m === last_month)
				{
					diff_m += s.c;
				}

				if(s.m === current_month)
				{
					result.last_month_state += s.c;
				}
			}
		}

		result.diff_year = result.last_year_state - diff_y;
		result.diff_month = result.last_month_state - diff_m;

		return result;
	}

	render()
	{
		// let parentElem = document.querySelector('.'+s.info_all_count).getBoundingClientRect()
		// let property = {
		// 	type: "linear",
		// 	color_line: ["#524dd9", "#37d853"],
		// 	width: 300,
		// 	height: 150,
		// 	padding_top: 50,
		// 	padding_right: 80,
		// 	padding_left: 30,
		// 	x_type: "year",
		// 	rows_count: 4,
		// 	text_color_rows: '#888888',
		// 	font_style_rows: 'normal 28px Helvetica, sans-serif',
		// 	money: "false",
		// 	pouring: "true",
		// 	lineWidthData: "4",
		// 	vertical_line: "fasle",
		// 	vertical_line_width: "2",
		// 	vertical_line_color: "#dddd",
		// 	pen: {active :"true",
		// 		circle_radius: 7,
		// 		colorBorder: "blue",
		// 		colorPouring: "white",
		// 		lineWidth: '4'},

		// 	textVertex: { active :"true",
		// 				  correctX_pos: 10,
		// 				  correctY_pos:-20,
		// 				  font:"28px sans-serif",
		// 				  text_color: 'blue',
		// 				 },
		// 	intCircle:{
		// 		circle_radius: 12,
		// 		colorBorder: "red",
		// 		colorPouring: "white",
		// 		lineWidth: '2'
		// 	},
		// 	 mouse :{
		// 	  padding_mouse_left: 15,
		// 	  padding_mouse_top: -80,
		// 	}

		// }
		// setTimeout(()=>{this.setState({property:property});}, 100)


		const offers_info = this.calculate_offers_info(this.state.info);
		window.onresize = ()=>{
			let parentElem = document.querySelector('.'+s.info_all_count).getBoundingClientRect()
			let resizeprop = {...this.state.property, width: parentElem.width-35}
					this.setState({property:resizeprop});

		}
		/* window.addEventListener(`onresize`, event => {
			 console.log(event)

		}, false);
			 */



		return(<>
					<div className = {s.info_container}>
						<Card className = {s.info_all_count} style = {{borderRadius: "0px"}}>
							<CardContent sx={{height: '100%'}}>
								<Grid container>
									<Grid item>
										<Typography color="textSecondary" gutterBottom variant="h5">
											{`Всего предложений за ${offers_info.begin_year_range} - ${offers_info.last_year_range}:`}
										</Typography>
										<Typography color="textPrimary" variant="h1" style={{position:"absolute",right: "65%"}}>
											{offers_info.all}
										</Typography>
										{}
										{/*<Charts data={this.state.dataChart} property = {this.state.propertyCircle} idElem={"chart10"} idContainer = {"container10"}  chartName = {""}/>*/}
										{ Object.keys( this.state.propertyCircle).length !== 0  ? <Charts data={this.state.dataChart} property = {this.state.propertyCircle} idElem={"chart10"} idContainer = {"container10"}  chartName = {"Обработка предложений"}/> : <div>null</div>}
									</Grid>
								</Grid>
							</CardContent>

						</Card>
						<div style={{position:"relative", zIndex:"0"}}>
							<div style={{position:"absolute", right:"15%", top:"50px"}} >
								{/*<Charts data={this.state.data} property = {this.state.property} idElem={"chart"} idContainer = {"container"} chartName = {"Кол-во предложений и регистраций (помесячно)"}/>*/}
								{ Object.keys(this.state.property).length !== 0  ? <Charts data={this.state.data} property = {this.state.property} idElem={"chart"} idContainer = {"container"} chartName = {"Подача предложений и регистрация пользователей"}/> : <div>null</div>}
							</div>

							<Budget className = {s.info_details_count}
									style = {{borderRadius: "0px", borderBottom: "1px solid black"}}
									name={`За ${this.state.pointer.format("YYYY")} год`}
									amount={offers_info.last_year_state}
									diff={offers_info.diff_year}/>



							<Budget className = {s.info_details_count}
									style = {{borderRadius: "0px"}}
									name={`Предложений за ${this.month_table[this.state.pointer.month()]} месяц`}
									amount={offers_info.last_month_state}
									diff={offers_info.diff_month}/>
						</div>

					</div>
					 <div className = {s.state_container}>
						 {/*<Budget style={{backgroundColor:"#ed6c02"}} className={s.state}*/}
							{/*		name="В обработке"*/}
							{/*		amount={this.state.state['в обработке'] | 0}/>*/}

						 {/*<Budget style={{backgroundColor:"#2e7d32"}} className={s.state}*/}
							{/*		name="Обработано"*/}
							{/*		amount={this.state.state['обработано'] | 0}/>*/}

						 {/*<Budget style={{backgroundColor:"#d32f2f"}} className={s.state}*/}
							{/*		name="Отклонено"*/}
							{/*		amount={this.state.state['отклонено'] | 0}/>*/}
					</div>
					{/* <div style={{position:"relative", left:"10%"}}><Charts data={this.state.data} property = {property} idElem={"chart"} idContainer = {"container"}/></div> */}

				</>
		);
	}
}

export default OffersState;
