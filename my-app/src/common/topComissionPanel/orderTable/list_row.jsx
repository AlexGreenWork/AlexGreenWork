import {
	TableCell,
} from '@mui/material';
import CustomTableRow from './custom_row'
import React from 'react';
import {CardOfferLinkAdapter} from "../../../common/offers/offers.jsx"
import { SeverityPill } from '../severity-pill';
import moment from 'moment';

class ListRow extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const row = this.props.row;
		const offerSendler = row['surnameSendler'] + " " + row['nameSendler'] + " " + row['middlenameSendler'];

		return ( <CustomTableRow key={this.props.id}>
				<TableCell>
					<CardOfferLinkAdapter
						  id={row['Id']}
						  date={row['date']}
						  name={row['nameSendler']}
						  surname={row['surnameSendler']}
						  midlename={row['middlenameSendler']}
						  status={row['status']}
						  nameOffer={row['nameOffer']}
						  tabelNum={row['tabelNum']}
						  dateComission={row['dateComission']}
						  email={row['email']}
					>
						<div onMouseEnter={(e) => {e.target.innerText = "Подробнее"}}
							onMouseOut={(e) => {e.target.innerText = `№ ${row['Id']}`}}>
							№ {row['Id']}
						</div>
					</CardOfferLinkAdapter>
				</TableCell>
				<TableCell>
					{offerSendler}
				</TableCell>
				<TableCell>
					{moment(row['date']).format("DD-MM-YYYY")}
				</TableCell>
				<TableCell>
					<SeverityPill
						color={(row['offer_status'] === 'обработано' && 'success')
							|| (row['offer_status'] === 'отклонено' && 'error')
								|| 'warning'}
					>
						{row['offer_status']}
					</SeverityPill>
				</TableCell>
			</CustomTableRow>
		)
	}
}

export default ListRow;
