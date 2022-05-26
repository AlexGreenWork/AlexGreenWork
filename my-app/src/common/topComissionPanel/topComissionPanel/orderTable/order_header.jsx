import {
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material';
import React from 'react';

class OrdersHeader extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
				columns: new Map([['Id', {label: 'Номер предложения', sort: 'desc', active: false}],
									['surnameSendler', {label: 'Автор предложения', sort: 'desc', active: false}],
									['date', {label: 'Дата поступления', sort: 'desc', active: false}],
									['offer_status', {label: 'Статус предложения', sort: 'desc', active: false}]
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

export default OrdersHeader;
