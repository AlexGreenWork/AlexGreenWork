import React from 'react';
import server from '../../../actions/server';
import { API_URL } from '../../../config';
import moment from 'moment';
import { CardOfferLinkAdapter } from '../../offers/offers';

class State extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {list: []}
		this.componentDidMount = this.componentDidMount.bind(this);
		this.load = this.load.bind(this);
	}

	componentDidMount()
	{
		this.load();
	}

	load()
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
						responsibles: data.responsibles,
						responsibles_rg: data.responsibles_rg,
						last_offer_date: {...data.last_offer_date, date: moment(data.last_offer_date.date).format('DD-MM-YYYY') },
						co_offers: data.co_offers});
	}

	upper(/** @type {string}**/ value)
	{
		return value[0].toUpperCase() + value.substring(1);
	}

	create_offer_link(data)
	{
		const nameOffer = `№ ${data?.Id}: ${this.upper(data?.nameOffer)}`;

		return (<span onMouseEnter={(e) => {e.target.innerText = " Открыть предложение"}}
			onMouseOut={(e) => {e.target.innerText = ` ${nameOffer}`}}>
				&nbsp;{nameOffer}
		</span>)
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
					{this.state.list.map((value, id) => (
						<div key={id}>
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
							Последнее предложение:
						</span>
						{this.state.last_offer_date?.Id ?
							<CardOfferLinkAdapter
								  id={this.state.last_offer_date?.Id}
								  date={this.state.last_offer_date?.date}
								  name={this.state.last_offer_date?.nameSendler}
								  surname={this.state.last_offer_date?.surnameSendler}
								  midlename={this.state.last_offer_date?.middlenameSendler}
								  status={this.state.last_offer_date?.status}
								  nameOffer={this.state.last_offer_date?.nameOffer}
								  tabelNum={this.state.last_offer_date?.tabelNum}
								  dateComission={this.state.last_offer_date?.dateComission}
								  email={this.state.last_offer_date?.email}
							>
								{this.create_offer_link(this.state.last_offer_date)}
							</CardOfferLinkAdapter>
						: null}
					</div>
				</div>

				<div style={{display: "grid", gridTemplateColumns:"auto auto auto auto", paddingTop: "24px"}}>
					<div>
						<span style={{fontWeight: "bold", fontSize: "15px"}}>
							Последнее предложение подано:
						</span>
						&nbsp;{this.state.last_offer_date?.date}
					</div>
				</div>

				<div style={{display: "grid", gridTemplateColumns:"auto auto auto auto", paddingTop: "24px"}}>
					<div>
						<span style={{fontWeight: "bold", fontSize: "15px"}}>
							Был(а) Соавтором:
						</span>
						&nbsp;{this.state.co_offers}
					</div>
				</div>

				<div style={{display: "grid", gridTemplateColumns:"auto auto auto auto", paddingTop: "24px"}}>
					<div>
						<span style={{fontWeight: "bold", fontSize: "15px"}}>
							Был(а) назначен(а) ответственным сотрудником:
						</span>
						&nbsp;{this.state.responsibles}
					</div>
				</div>

				<div style={{display: "grid", gridTemplateColumns:"auto auto auto auto", paddingTop: "24px"}}>
					<div>
						<span style={{fontWeight: "bold", fontSize: "15px"}}>
							Был(а) в составе рабочей группы:
						</span>
						&nbsp;{this.state.responsibles_rg}
					</div>
				</div>
			</>);
	}
}

export default State;
