import React from "react";
import {Budget} from "./budget";
import LatestOrders from "./latest-orders";
import {Card, CardContent, Grid, Typography } from '@mui/material';
import server from '../../actions/server';
import { API_URL } from '../../config';
import moment from 'moment';
import s from "./TopComission.module.css"

class TopComission extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = {list: {last_offers: []},
						state: [],
						info: [],
						pointer: moment()}
	}

	componentDidMount()
	{
		server.send_post_request(`${API_URL}api/offers/lastOffersByDate`, {begin: this.state.pointer.format("YYYY-MM-DD")})
			.then((res) => {
					this.setState({list: {last_offers: res.data.last_offers},
									state: res.data.state,
									info: res.data.info});
			});
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
		const result = {all: 0,
					diff_year: 0,
					diff_month: 0,
					last_year: 0,
					last_month: 0}

		const current_month = this.state.pointer.month() + 1;
		const current_year = this.state.pointer.year();

		const last_pointer = this.state.pointer.clone().year(this.state.pointer.year() - 1).month(this.state.pointer.month() - 1);

		const last_month = last_pointer.month();
		const last_year =  last_pointer.year();

		let diff_y = 0;
		let diff_m = 0;

		console.log(last_month, last_year);

		for(const s of state)
		{
			result.all += s.c;

			if(s.y === last_year)
			{
				diff_y += s.y;
			}

			if(s.m === last_month)
			{
				diff_m += s.m;
			}

			if(s.y === current_year)
			{
				result.last_year += s.c;
			}

			if(s.m === current_month)
			{
				result.last_month += s.c;
			}
		}

		result.diff_year = result.last_year - diff_y;
		result.diff_month = result.last_month - diff_m;

		console.log(result);

		return result;
	}

	render()
	{
		
		const offers_info = this.calculate_offers_info(this.state.info);

		return(<div style={{
					gridColumn: "2/6",
					gridRow: "2/6",
					overflowY: "scroll"
				}}> 
					<div style={{
								display: "flex",
								flexDirection:"column",
								height: "fit-content",
								overflowY:"scroll"
				}}>
						<div className = {s.info_container}
						>
							<Card className = {s.info_all_count}>
								<CardContent sx={{height: '100%'}}>
									<Grid container>
										<Grid item>
											<Typography color="textSecondary" gutterBottom variant="h5">
												Всего предложений:
											</Typography>
											<Typography color="textPrimary" variant="h1" >
												{offers_info.all}
											</Typography>
										</Grid>
									</Grid>
								</CardContent>
							</Card>

							 <Budget className = {s.info_details_count}
										name="За год"
										amount={offers_info.last_year}
										diff={offers_info.diff_year}/>

							 <Budget className = {s.info_details_count}
										name="Предложений за месяц"
										amount={offers_info.last_month}
										diff={offers_info.diff_year}/>
						</div>
						 <div className = {s.state_container}> 
							 <Budget style={{backgroundColor:"#ed6c02"}} className={s.state}
										name="В обработке"
										amount={this.state.state['в обработке']}/>

							 <Budget style={{backgroundColor:"#2e7d32"}} className={s.state}
										name="Обработано"
										amount={this.state.state['обработано']}/>

							 <Budget style={{backgroundColor:"#d32f2f"}} className={s.state}
										name="Отклонено"
										amount={this.state.state['отклонено']}/>
						</div>
						<LatestOrders last_offers = {this.state.list.last_offers} style={{marginTop:"3px"}}/>
					</div>
				</div>

		);
	}
}

export default TopComission
