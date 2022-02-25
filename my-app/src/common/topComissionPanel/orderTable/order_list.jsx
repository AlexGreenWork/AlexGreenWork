import {
	Table,
	TableBody,
	TablePagination,
	Paper,
	TableContainer,
} from '@mui/material';
import OrdersHeader from './order_header.jsx'
import React from 'react';
import ListRow from './list_row.jsx';

class OrdersList extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {list: this.props.last_offers,
						page: 0,
						rowsPerPage: 10,
						tabNum: null};
		this.onChangePage = this.onChangePage.bind(this);
		this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
		this.onSort = this.onSort.bind(this);
		this.onShow = this.onShow.bind(this);
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

	onShow(order, id)
	{
		return <ListRow key = {id} id = {id} row = {order}/>
	}

	render()
	{
		return (<>
					<Paper>
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
										.map(this.onShow)}
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
			</>
		);
	}
}

export default OrdersList;
