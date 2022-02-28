import React from "react";
import LatestOrders from "./latest-orders";
import server from '../../actions/server';
import { API_URL } from '../../config';
import moment from "moment";

class LastOffers extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = {list: {last_offers: []},
						pointer: moment()}
	}

	componentDidMount()
	{
		server.send_post_request(`${API_URL}api/offers/lastOffersByDate`, {begin: this.state.pointer.format("YYYY-MM")})
			.then((res) => {
					this.setState({list: {last_offers: res.data.last_offers}})
			});
	}

	render()
	{
		return(<LatestOrders last_offers = {this.state.list.last_offers} style={{marginTop:"3px"}}/>);
	}
}

export default LastOffers;
