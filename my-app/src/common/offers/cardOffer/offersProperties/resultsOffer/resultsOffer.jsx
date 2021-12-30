import React from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import s from './results.module.css'
import server from "../../../../../actions/server";
import { API_URL } from "../../../../../config";
import { connect } from "react-redux";
import moment from "moment";

class Row extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {open: false};
	}

	colored_by_rating(rating)
	{
		if(rating < 5 && rating > 0)
			return "Red"
		else if(rating >= 5 && rating < 7)
			return "Orange"
		else if(rating >= 7)
			return "Green"
	}

	create_rating_ceil(rating)
	{
		return <TableCell style = {{color: this.colored_by_rating(rating),
									fontSize: "16px",
									fontWeight: "bold"
								}}>
			{rating}
		</TableCell>;
	}

	render()
	{
		return (
			<React.Fragment>
				<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}
							onClick={() => this.setState({open: !this.state.open})}
				>
					<TableCell>
						<IconButton
							aria-label="expand row"
							size="small"
						>
							{this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</TableCell>
					<TableCell component="th" scope="row">
						{this.props.name}
					</TableCell>
					{this.create_rating_ceil(this.props.actuality)}
					{this.create_rating_ceil(this.props.innovation)}
					{this.create_rating_ceil(this.props.cost)}
					{this.create_rating_ceil(this.props.duration)}
					{this.create_rating_ceil(this.props.middle)}
				</TableRow>
				<TableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
						<Collapse in={this.state.open} timeout="auto" unmountOnExit>
							<Box sx={{ margin: 1 }}>
								<Typography variant="h6" gutterBottom component="div">
									Оценка предложения
								</Typography>
								<Table size="small" aria-label="purchases">
									<TableHead>
										<TableRow>
											<TableCell style={{width: "250px"}}>Проверил</TableCell>
											<TableCell>Актуальность</TableCell>
											<TableCell>Инновативность</TableCell>
											<TableCell>Затратность</TableCell>
											<TableCell>Протяженность</TableCell>
											<TableCell>Общая оценка</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{this.props.history.map((historyRow) => (<>
											<TableRow key={historyRow.inspector}>
												<TableCell rowSpan = "2">
													{historyRow.inspector}
												</TableCell>
												{this.create_rating_ceil(historyRow.actuality)}
												{this.create_rating_ceil(historyRow.innovation)}
												{this.create_rating_ceil(historyRow.cost)}
												{this.create_rating_ceil(historyRow.duration)}
												<TableCell rowSpan = "2"
															align = "center"
															style = {{color: this.colored_by_rating(historyRow.middle)}}>
													{historyRow.middle}
												</TableCell>
											</TableRow>
											<TableRow key={historyRow.inspector}>
												<TableCell style={{width: "200px"}}>Дата начала проверки</TableCell>
												<TableCell>{historyRow.dateStart}</TableCell>
												<TableCell style={{width: "250px"}}>Дата окончания проверки</TableCell>
												<TableCell>{historyRow.dateFinish}</TableCell>
											</TableRow>
										</>))}
									</TableBody>
								</Table>
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			</React.Fragment>
		);
	}
}

class ResultTable extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {rows: []}
		this.load = this.load.bind(this);
		this.init = this.init.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount()
	{
		this.load(this.props.offerId)
	}

	create_row(header, data)
	{
		const row = {
			name: header,
			actuality: data.actual,
			innovation: data.innovation,
			cost: data.cost,
			duration : data.extent,
			history: [],

		};

		for(const value of data.data)
		{
			row.history.push(
				{
					dateStart: value.open? moment(value.open).format("DD-MM-YYYY"): "N/A",
					inspector: value.fio,
					middle: value.middle,
					dateFinish: value.close? moment(value.close).format("DD-MM-YYYY") : "N/A",
					actuality: value.actuality,
					innovation: value.innovation,
					cost: value.cost,
					duration : value.duration,
				});
		}

		return row;
	}

	create_rows(data)
	{
		const rows = []
		for(const header in data.responsibles)
		{
			rows.push(this.create_row(header, data.responsibles[header]));
		}
		
		for(const header in data.responsibles_rg)
		{
			rows.push(this.create_row(`Рабочая группа: ${header}`, data.responsibles_rg[header]));
		}

		this.setState({rows: rows})
	}

	init(res)
	{
		this.create_rows(res.data)
	}

	/**
		* @param {Number} offer_id
	**/
	load(offer_id)
	{
		server.send_post_request(`${API_URL}api/offers/respResults`,{idOffer: offer_id}).then(this.init);
	}

	render()
	{
		return (
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Проверяющий</TableCell>
							<TableCell>Актуальность</TableCell>
							<TableCell>Инновативность</TableCell>
							<TableCell>Затратность</TableCell>
							<TableCell>Протяженность</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.rows.map((row) => (
							<Row key={row.name} {...row} />
						))}
					</TableBody>
				</Table>
		)
	}
}


class ResultsOffer extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
			<div className={s.containerOff} >
				<TableContainer component={Paper}>
					<ResultTable offerId = {this.props.offerId}/>
				</TableContainer>
			</div>
		)
	}
}

const mapReduxStateToClassProps = (state) =>
{
	return {offerId: state.offers.offer.Id}
}

export default connect(mapReduxStateToClassProps)(ResultsOffer);
