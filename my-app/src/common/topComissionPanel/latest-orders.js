import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from './severity-pill';
import React from 'react';
import server from '../../actions/server';
import { API_URL } from '../../config';
import moment from 'moment';

const orders = [
  {
    id: uuid(),
    ref: '231',
    amount: 30.5,
    customer: {
      name: 'Екатерина Танькова'
    },
    createdAt: 1555016400000,
    status: 'в обработке'
  },
  {
    id: uuid(),
    ref: '250',
    amount: 25.1,
    customer: {
      name: 'Вася Пупкин'
    },
    createdAt: 1555016400000,
    status: 'обработано'
  },
  {
    id: uuid(),
    ref: '667',
    amount: 10.99,
    customer: {
      name: 'Александр Мордвинкин'
    },
    createdAt: 1554930000000,
    status: 'отклонено'
  },
  {
    id: uuid(),
    ref: '320',
    amount: 96.43,
    customer: {
      name: 'Анна Кац'
    },
    createdAt: 1554757200000,
    status: 'в обработке'
  },
  {
    id: uuid(),
    ref: '290',
    amount: 32.54,
    customer: {
      name: 'Кларк Кент'
    },
    createdAt: 1554670800000,
    status: 'обработано'
  },
  {
    id: uuid(),
    ref: '240',
    amount: 16.76,
    customer: {
      name: 'Адам Денисов'
    },
    createdAt: 1554670800000,
    status: 'обработано'
  }
];

class OrdersHeader extends React.Component
{
	constructor(props)
	{
		super(props);
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
				  <TableCell sortDirection="desc">
					<Tooltip
					  enterDelay={300}
					  title="Sort"
					>
					  <TableSortLabel
						active
						direction="desc"
					  >
					   Дата
					  </TableSortLabel>
					</Tooltip>
				  </TableCell>
				  <TableCell>
					Статус
				  </TableCell>
				</TableRow>
			  </TableHead>
		);
	}
}

class OrdersList extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {list: []}
	}

	componentDidMount()
	{
		server.send_post_request(`${API_URL}api/offers/lastOffersByDate`, {begin: moment().format("YYYY-MM-DD")})
			.then((res) => {
					this.setState({list: res.data})
			});
	}

	convert_state(status)
	{
		switch(status)
		{
			case 3:
			case 6:
			case 11:
				return 'отклонено'
			case 13:
				return 'обработано'
			default:
				return 'в обработке'
		}
	}

	render()
	{
		console.log(this.state.list)
		return (
			<Table>
				<OrdersHeader/>
				<TableBody>
					{this.state.list.map((order, id) => (
						<TableRow
							hover
							key={id}
						>
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
									color={(this.convert_state(order.offer_status) === 'обработано' && 'success')
										|| (this.convert_state(order.offer_status) === 'отклонено' && 'error')
											|| 'warning'}
								>
									{this.convert_state(order.offer_status)}
								</SeverityPill>
							</TableCell>
						</TableRow>
					))}
			  </TableBody>
			</Table>
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
			<PerfectScrollbar>
			  <Box sx={{ minWidth: 800 }}>
				<OrdersList/>
			  </Box>
			</PerfectScrollbar>
			<Box
			  sx={{
				display: 'flex',
				justifyContent: 'flex-end',
				p: 2
			  }}
			>
			  <Button
				color="primary"
				endIcon={<ArrowRightIcon fontSize="small" />}
				size="small"
				variant="text"
			  >
				Посмотреть все
			  </Button>
			</Box>
		  </Card>
		);
	}
}

export default LatestOrders;
