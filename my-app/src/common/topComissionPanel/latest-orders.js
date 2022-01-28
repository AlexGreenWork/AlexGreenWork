
import {
	Box,
	Card,
	CardHeader,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	TablePagination,
	Tooltip,
	Paper,
	TableContainer
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SeverityPill } from './severity-pill';
import React from 'react';
import OrdersList from './orderTable/order_list';

class CheckBox extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = {check: this.props.check}
		this.check = this.check.bind(this);
	}

	check(event)
	{
		this.setState({check: event.target.checked})
		if(this.props.checked && typeof this.props.checked === 'function')
		{
			this.props.checked(!this.state.check, this.props.label);
		}
	}

	render()
	{
		return (
				<FormControlLabel
					  control={<Checkbox checked={this.state.check} onChange={this.check} color={this.props.color? this.props.color : `default`}/>}
					  label={this.props.label}/>
		);
	}
}

class LatestOrders extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {list: this.props.last_offers,
						box: new Map([
							['в обработке', true],
							['обработано', true],
							['отклонено', true]
						])};
		this.check = this.check.bind(this);
	}

	componentDidUpdate(props)
	{
		if(this.props !== props
			&& this.props.last_offers.length > 0)
		{
			this.setState({list:this.props.last_offers});
		}
	}

	check(status, label)
	{
		this.state.box.set(label,status);
		const list = this.props.last_offers.filter((obj) => {return this.state.box.get(obj.offer_status)});
		this.setState({list: list, box: this.state.box});
	}

	render()
	{
		return (
		  <Card {...this.props}>
			<CardHeader title="Последние предложения" />
			  <Box sx={{ minWidth: 800 }}>
				<div style={{height: "auto", width: "100%", paddingLeft: "16px"}}>
					{Array.from(this.state.box, ([label, status], id) => <CheckBox key = {id}
																					label = {label}
																					checked = {this.check}
																					check = {status}
																					color={
																							(label === 'обработано' && 'success')
																								|| (label === 'отклонено' && 'error')
																									|| 'warning'}/>)
																							}
				</div>
				<OrdersList last_offers = {this.state.list}/>
			  </Box>
		  </Card>
		);
	}
}

export default LatestOrders;
