import React from "react";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import server from "../../../../../actions/server";
import { API_URL } from "../../../../../config";
import { connect } from "react-redux";
import moment from "moment";


class Panel extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {expanded: false};
		this.expand = this.expand.bind(this);
	}

	get_date(date)
	{
		return (date)? moment(this.props.open).format("YYYY-MM-DD"): 'N/A';
	}

	get_info(date)
	{
		return (date)? "Предложение прошло предварительное рассмотрение" : "Предложение находится на рассмотрении";
	}

	expand(event, isExpanded)
	{
		this.setState({expanded: isExpanded});
	}

	render()
	{
		return (
				<Accordion
					style={{
						marginTop: "5vh",

					}}
					expanded={this.state.expanded} onChange={this.expand}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1bh-content"
						id="panel1bh-header"
					>
						<Typography sx={{ width: '38%', flexShrink: 0, fontWeight: 'bold' }}>
							{this.props.name}
						</Typography>
						<Typography sx={{ color: '#3ee09d', padding:'10px', fontWeight: 'bold' }}>{this.get_date(this.props.open)}</Typography>
						<Typography sx={{ color: '#3ee09d', padding:'10px' }}>-</Typography>
						<Typography sx={{ color: '#e43988', padding:'10px', fontWeight: 'bold' }}>{this.get_date(this.props.close)}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							{this.get_info(this.props.close)}
						</Typography>
					</AccordionDetails>
            </Accordion>
		)
	}
}

class HistoryOffer extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {data: []};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.init = this.init.bind(this);
	}

	/**
		* @typedef {Object} Values
		* @property {String} open
		* @property {String} name
		* @property {String} close
		*
		* @param {Values} values
		* @returns {React.Component} Panel
	**/
	create_panel(header, values)
	{
		return <Panel name = {header} open = {values.open} close = {values.close}/>;
	}


	/**
		* @typedef {Object} Data
		* @property {Array<Values>} responsibles
		* @property {Array<Values>} responsibles_rg
		*
		* @param {Data} data
		* @returns Array<Panel>
	**/
	create_panels(data)
	{
		let result = [];
		for(const responsible of data.responsibles)
		{
			result.push(this.create_panel(responsible.name, responsible));
		}

		for(const responsible of data.responsibles_rg)
		{
			result.push(this.create_panel('Рассмотрение подразделением комиссии', responsible));
		}

		return result;
	}

	init(res)
	{
		this.setState({data: this.create_panels(res.data)});
	}

	componentDidMount()
	{
		server.send_post_request(`${API_URL}api/offers/offerStates`,
			{
				idOffer: this.props.offerId
			}).then((res) => {
				this.init(res);
			});
	}

	render()
	{
		return (
			<div>
				{this.state.data}
			</div>
		);
	}
}

const mapReduxStateToClassProps = (state) =>
{
	return {offerId: state.offers.offer.Id}
}

export default connect(mapReduxStateToClassProps)(HistoryOffer);