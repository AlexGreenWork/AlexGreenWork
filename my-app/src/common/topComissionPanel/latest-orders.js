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
	TableContainer,
	Checkbox,
    FormControlLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SeverityPill } from './severity-pill';
import React from 'react';
import moment from 'moment';

class OrdersHeader extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
				columns: new Map([['offer_id', {label: 'Номер предложения', sort: 'desc', active: false}],
									['offer_sendler', {label: 'Автор', sort: 'desc', active: false}],
									['offer_date', {label: 'Дата', sort: 'desc', active: false}],
									['offer_status', {label: 'Статус', sort: 'desc', active: false}]
			])
		};

		this.onSort = this.onSort.bind(this);
	}

	onSort(event, id)
	{
		const column = this.state.columns.get(id);
		column.sort = column.sort === 'asc'? 'desc': 'asc';
		column.active = true;

		if(this.props.onSort && typeof this.props.onSort === 'function')
		{
			this.props.onSort(id, column.sort);
		}

		this.setState({columns: this.state.columns});
	}

	render()
	{
		return (
			<TableHead>
				<TableRow>
					{Array.from(this.state.columns, ([id, column]) => (
						<TableCell key={id}>
							<TableSortLabel active={column.active}
											direction={column.sort}
											onClick = {(event) => this.onSort(event, id)}
							>
								{column.label}
							</TableSortLabel>
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	}
}

const CustomTableRow = styled(TableRow)(({ theme }) => (
	{
		'&:nth-of-type(odd)':
		{
			backgroundColor: "lightgrey",
		},
		'&:last-child td, &:last-child th':
		{
			border: 0,
		},
	}
));

class OrdersList extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {list: this.props.last_offers, page: 0, rowsPerPage: 10};
		this.handleChangePage = this.onChangePage.bind(this);
		this.handleChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
		this.onSort = this.onSort.bind(this);
	}

	componentDidUpdate(props)
	{
		if(this.props !== props)
		{
			this.setState({list: this.props.last_offers});
		}
	}

	onChangePage(event, newPage)
	{
		this.setState({page: newPage});
	};

	onChangeRowsPerPage(event)
	{
		this.setState({page: 0, rowsPerPage: parseInt(event.target.value, 10)});
	};

	sortHandle(lv, rv, type)
	{
		if(type === 'asc')
		{
			return lv > rv;
		}
		else if(type === 'desc')
		{
			return lv < rv;
		}
	}

	onSort(id, type)
	{
		this.state.list.sort((lv, rv) => {
											return this.sortHandle(lv[id], rv[id], type);
										}
		);

		this.setState(this.state.list);
	}

	render()
	{
		return (<Paper>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, 50]}
						component="div"
						count={this.state.list.length}
						rowsPerPage={this.state.rowsPerPage}
						page={this.state.page}
						labelRowsPerPage = "Отобразить на странице"
						onPageChange={this.onChangePage}
						onRowsPerPageChange={this.onChangeRowsPerPage}
						showFirstButton
						showLastButton
					/>
					<TableContainer>
						<Table>
							<OrdersHeader onSort = {this.onSort}/>
							<TableBody>
								{this.state.list
									.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
									.map((order, id) =>
									(
										<CustomTableRow key={id} >
											<TableCell>
												{order['offer_id']}
											</TableCell>
											<TableCell>
												{order['offer_sendler']}
											</TableCell>
											<TableCell>
												{moment(order['offer_date']).format("DD-MM-YYYY")}
											</TableCell>
											<TableCell>
												<SeverityPill
													color={(order['offer_status'] === 'обработано' && 'success')
														|| (order['offer_status'] === 'отклонено' && 'error')
															|| 'warning'}
												>
													{order['offer_status']}
												</SeverityPill>
											</TableCell>
										</CustomTableRow>
								))}
						  </TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, 50]}
						component="div"
						count={this.state.list.length}
						rowsPerPage={this.state.rowsPerPage}
						page={this.state.page}
						labelRowsPerPage = "Отобразить на странице"
						onPageChange={this.onChangePage}
						onRowsPerPageChange={this.onChangeRowsPerPage}
						showFirstButton
						showLastButton
					/>
			</Paper>
		);
	}
}

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
