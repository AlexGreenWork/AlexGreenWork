import PerfectScrollbar from 'react-perfect-scrollbar';
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
import moment from 'moment';

class OrdersHeader extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	sort(id)
	{
	}

	render()
	{
		return (
			<TableHead>
				<TableRow>
					<TableCell>
						Предложение
					</TableCell>
					<TableCell>
						Автор
					</TableCell>
					<TableCell >
						Дата
					</TableCell>
					<TableCell>
						Статус
					</TableCell>
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
		this.state = {page: 0, rowsPerPage: 10};
		this.handleChangePage = this.handleChangePage.bind(this);
		this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
	}

	handleChangePage(event, newPage)
	{
		this.setState({page: newPage});
	};

	handleChangeRowsPerPage(event)
	{
		this.setState({page: 0, rowsPerPage: parseInt(event.target.value, 10)});
	};

	render()
	{
		return (<Paper>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25, 50]}
						component="div"
						count={this.props.last_offers.length}
						rowsPerPage={this.state.rowsPerPage}
						page={this.state.page}
						labelRowsPerPage = "Отобразить на странице"
						onPageChange={this.handleChangePage}
						onRowsPerPageChange={this.handleChangeRowsPerPage}
						showFirstButton
						showLastButton
					/>
					<TableContainer>
						<Table>
							<OrdersHeader/>
							<TableBody>
								{this.props.last_offers
									.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
									.map((order, id) =>
									(
										<CustomTableRow key={id} >
											<TableCell>
												{order.offer_id}
											</TableCell>
											<TableCell>
												{order.offer_sendler}
											</TableCell>
											<TableCell>
												{moment(order.offer_date).format("DD-MM-YYYY")}
											</TableCell>
											<TableCell>
												<SeverityPill
													color={(order.offer_status === 'обработано' && 'success')
														|| (order.offer_status === 'отклонено' && 'error')
															|| 'warning'}
												>
													{order.offer_status}
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
						count={this.props.last_offers.length}
						rowsPerPage={this.state.rowsPerPage}
						page={this.state.page}
						labelRowsPerPage = "Отобразить на странице"
						onPageChange={this.handleChangePage}
						onRowsPerPageChange={this.handleChangeRowsPerPage}
						showFirstButton
						showLastButton
					/>
			</Paper>
		);
	}
}

class LatestOrders extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
		  <Card {...this.props}>
			<CardHeader title="Последние предложения" />
			  <Box sx={{ minWidth: 800 }}>
				<OrdersList last_offers = {this.props.last_offers}/>
			  </Box>
		  </Card>
		);
	}
}

export default LatestOrders;
