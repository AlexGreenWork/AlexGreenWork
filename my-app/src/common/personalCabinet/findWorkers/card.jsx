import React from "react"
import {connect} from "react-redux"
import style from "./card.module.css"
import {selectcard} from "../../../actions/search";

import {API_URL} from "../../../config.js"
import server from "../../../actions/server"

class Cart extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {info: null};
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.update = this.update.bind(this);

		this.update(props);
	}

	componentDidUpdate(props)
	{
		this.update(this.props);
	}

	update(props)
	{
	    if(props?.info
			&& (
					this.state.info === null
					|| this.state.info.tabnum != props.info
				) 
			)
		{console.log(this.state.info, props.info);
			server.send_post_request(`${API_URL}api/user/info`, {search: props.info}).then((res) => {
				this.setState({info: res.data});
			})
		}
	}

	render()
	{
		if(this.state.info === null) return (<></>);

		return (
					<div className = {style.card} onClick = {() => this.props.dispatch(selectcard(`${this.state.info?.tabnum}`))}>
						<table>
							<col width = "20%"/>
							<col width = "20%"/>
							<tbody>
								<tr>
									<td rowSpan = "8">
										<div style={
														{
															width: "150px",
															height: "200px", 
															backgroundImage: `url(${API_URL}files/photos/${this.state.info?.tabnum}.jpg)`,
															backgroundRepeat: "round",
															borderRadius: "10px"
														}
													}>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										Табельный номер
									</td>
									<td>
										{this.state.info?.tabnum}
									</td>

								</tr>
								<tr>
									<td>
										ФИО
									</td>
									<td colSpan = "2">
										{this.state.info?.name}
									</td>
								</tr>
								<tr>
									<td>
										Должность
									</td>
									<td colSpan = "2">
										{this.state.info?.prof}
									</td>
								</tr>
								<tr>
									<td>
										Цех
									</td>
									<td colSpan = "2">
										{this.state.info?.department}
									</td>
								</tr>
								<tr>
									<td>
										Отдел
									</td>
									<td colSpan = "2">
										{this.state.info?.division}
									</td>
								</tr>
								{this.state.info?.brigada ?
									<tr>
										<td>
											Бригада
										</td>
										<td colSpan = "2">
											{this.state.info?.brigada}
										</td>
									</tr>
									: null
								}
								{this.state.info?.email ?
									<tr>
										<td>
											Электронная Почта
										</td>
										<td colSpan = "2">
											<a href = {`mailto:${this.state.info?.email}`}>{this.state.info?.email}</a>
										</td>
									</tr>
									: null
								}
								{/*<tr>*/}
								{/*	<td>*/}
								{/*		<button onClick={() => {dispatch(searchtabnum(`${this.state.info.tabnum}` ))}}*/}
								{/*				className = {style.card_button}>Добавить в задачу</button>*/}
								{/*	</td>*/}
								{/*</tr>*/}
							</tbody>
						</table>
					</div>
			);
	}
}

export default connect()(Cart)
