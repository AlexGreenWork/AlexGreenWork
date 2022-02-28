import {
	TableCell,
} from '@mui/material';
import CustomTableRow from './custom_row'
import React from 'react';
import {CardOfferLinkAdapter} from "../../../common/offers/offers.jsx"
import { SeverityPill } from '../severity-pill';
import moment from 'moment';
import UserCard from '../userCard/user_card';

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
				<TableCell key={`id_${row['Id']}`} style={{width: "20%"}}>
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
						<div onMouseEnter={(e) => {e.target.innerText = "Открыть предложение"}}
							onMouseOut={(e) => {e.target.innerText = `${row['Id']}`}}>
							{row['Id']}
						</div>
					</CardOfferLinkAdapter>
				</TableCell>
				<TableCell key={`sendler_${row['Id']}`} style = {{width: "30%"}}>
					<UserCard title = {offerSendler} info={row['tabelNum']}/>
				</TableCell>
				<TableCell key={`date_${row['Id']}`} >
					{moment(row['date']).format("DD-MM-YYYY")}
				</TableCell>
				<TableCell key={`state_${row['Id']}`} >
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
