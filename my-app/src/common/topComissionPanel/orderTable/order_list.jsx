import {
	Table,
	TableBody,
	TableCell,
	TablePagination,
	Paper,
	TableContainer,
} from '@mui/material';
import OrdersHeader from './order_header.jsx'
import CustomTableRow from './order_row'
import { SeverityPill } from '../severity-pill';
import moment from 'moment';
import React from 'react';
import {CardOfferLinkAdapter} from "../../../common/offers/offers.jsx"

class OrdersList extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {list: this.props.last_offers, page: 0, rowsPerPage: 10};
		this.onChangePage = this.onChangePage.bind(this);
		this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
		this.onSort = this.onSort.bind(this);
	}

	componentDidUpdate(props)
	{
		if(this.props !== props)
		{
			this.setState({list: this.props.last_offers, page: 0});
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
													<CardOfferLinkAdapter
														  id={order['Id']}
														  date={order['date']}
														  name={order['nameSendler']}
														  surname={order['surnameSendler']}
														  midlename={order['middlenameSendler']}
														  status={order['status']}
														  nameOffer={order['nameOffer']}
														  tabelNum={order['tabelNum']}
														  dateComission={order['dateComission']}
														  email={order['email']}
													>
														<div onMouseEnter={(e) => {e.target.innerText = "Подробнее"}}
															onMouseOut={(e) => {e.target.innerText = order['Id']}}>
															{order['Id']}
														</div>
													</CardOfferLinkAdapter>
												</TableCell>
												<TableCell>
													{order['surnameSendler'] + " " + order['nameSendler'] + " " + order['middlenameSendler']}
												</TableCell>
												<TableCell>
													{moment(order['date']).format("DD-MM-YYYY")}
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

export default OrdersList;
