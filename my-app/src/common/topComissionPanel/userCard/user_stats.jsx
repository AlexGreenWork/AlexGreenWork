import React from 'react';
import server from '../../../actions/server';
import { API_URL } from '../../../config';
import moment from 'moment';

class State extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {list: []}
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount()
	{
		server.send_post_request(`${API_URL}api/offers/userOfferStates`, {user: this.props.info})
			.then((res) => {
				this.init(res.data);
			});
	}

	init(data)
	{
		let sum = 0;
		for(let a of data.self_offers)
		{
			sum += a.c;
		}

		this.setState({list: data.self_offers,
						sum: sum,
						register: data.user,
						co_offers: data.co_offers});
	}

	upper(/** @type {string}**/ value)
	{
		return value[0].toUpperCase() + value.substring(1);
	}

	render()
	{
		return (<>
				<div style={{paddingTop: "16px", borderBottom: "2px solid #f0f0f0"}}>
					<span style={{fontSize: "17px", fontWeight: "bold"}}>Сведения:</span>
				</div>
				<span style={{fontWeight: "bold", fontSize: "15px"}}>
					Зарегистрирован(a):
				</span>
				&nbsp;
				<span>
					{moment(this.state.register).format("DD-MM-YYYY")}
				</span>
				<div style={{display: "grid", gridTemplateColumns:"auto auto auto auto", paddingTop: "24px"}}>
					<div>
						<span style={{fontWeight: "bold", fontSize: "15px"}}>
							Предложений подано:
						</span>
						&nbsp;{this.state.sum}
					</div>
					{this.state.list.map((value) => (
						<div>
							<span style={{fontWeight: "bold", fontSize: "15px"}}>
								{this.upper(value.info)}:
							</span>
							&nbsp;{value.c}
						</div>
					))}
				</div>

				<div style={{display: "grid", gridTemplateColumns:"auto auto auto auto", paddingTop: "24px"}}>
					<div>
						<span style={{fontWeight: "bold", fontSize: "15px"}}>
							Соавторств:
						</span>
						&nbsp;{this.state.co_offers}
					</div>
				</div>
			</>);
	}
}

export default State;
