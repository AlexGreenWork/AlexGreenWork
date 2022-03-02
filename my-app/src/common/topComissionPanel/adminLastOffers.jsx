import React from "react";
import LatestOrders from "./latest-orders";
import server from '../../actions/server';
import { API_URL } from '../../config';
import moment from "moment";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

class LastOffers extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = {list: {last_offers: []},
						pointer: moment(),
						avaliable_year: null,
						year: moment().year(),
						month: moment().month() + 1,
						avaliable_month: null}

		this.init = this.init.bind(this);
		this.update = this.update.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.onMonthChange = this.onMonthChange.bind(this);

		this.month_table = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
	}

	componentDidMount()
	{
		this.update(this.state.year, this.state.month);

		server.send_post_request(`${API_URL}api/offers/avaliableOffersDate`)
			.then((res) => {
				this.init(res.data.last_offers);
			});
	}

	update(year, month)
	{
		server.send_post_request(`${API_URL}api/offers/lastOffersByDate`, {year: year, month: month})
			.then((res) => {
					this.setState({list: {last_offers: res.data.last_offers}, year: year, month: month})
			});
	}

	/**
     * @param {object} data
     */
	init(data)
	{
		let years = [];
		for(let year in data)
		{
			years.push(year);
		}

		//Блядский option ругается на out-of-bound, поэтому добавляем текущий месяц и год, чтобы он заткнулся
		//Почему в методе init? для того что-бы лишний раз не дергать state, да и данные из базы подъедут
		data[this.state.year][this.state.month] = this.state.month;
		this.setState({avaliable_month: data, avaliable_year: years});
	}

	onDateChange(value)
	{
		const newYear = value.target.value;
		if(newYear != this.state.year)
		{
			const newMonth = this.state.avaliable_month[newYear].slice(-1)[0];
			this.update(newYear, newMonth);
		}
	}

	onMonthChange(value)
	{
		const newMonth = value.target.value;
		if(newMonth !== this.state.year)
		{
			this.update(this.state.year, newMonth);
		}
	}

	render()
	{
		//Блядский option ругается на out-of-bound, поэтому добавляем проверку на инициализацию,
		//после выполнения метода init в массиве всегда будет текуций год и месяц
		if(!this.state.avaliable_year || !this.state.avaliable_month) return null;

		return(
				<>
					<div style={{display: "grid", gridTemplateColumns:"auto auto", marginTop:"20px"}} >
						<FormControl sx={{ m: 1, minWidth: 120 }}>
							<InputLabel style={{textAlign: "center",
												color: "blue",
												fontSize: "20px"}}
										id="select-label-year"
							>
								Год
							</InputLabel>
							<Select
								labelId="select-label-year"
								id="select-year"
								value={this.state.year}
								label="Месяц"
								onChange={this.onDateChange}
							>
								{this.state.avaliable_year.map((data, id) => (
									<MenuItem key={id} value = {data}>{data}</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl sx={{ m: 1, minWidth: 120 }}>
							<InputLabel style={{textAlign: "center",
												color: "blue",
												fontSize: "20px"}}
										 id="select-label-month"
							>
								Месяц
							</InputLabel>
							<Select
								labelId="select-label-month"
								id="select-month"
								value={this.state.month}
								label="Месяц"
								onChange={this.onMonthChange}
							>
								{this.state.avaliable_month[this.state.year].map((data, id) => (
									<MenuItem key={id} value = {data}>{this.month_table[data - 1]}</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<LatestOrders title={`Предложения за ${this.month_table[this.state.month - 1]} месяц`}
									last_offers = {this.state.list.last_offers}
									style={{marginTop:"3px"}}/>
				</>
			);
	}
}

export default LastOffers;
