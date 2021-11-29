import React from "react"
import style from "./card.module.css"
const axios = require("axios");

class Cart extends React.Component
{
    constructor(props)
	{
        super(props);
		this.load = this.load.bind(this);
    }

	load(tabnum)
	{
        axios.post("http://localhost:5000/api/user/info", {search: tabnum}).then((res) => {
			console.log(res);
			this.setState({info: res.data});
        })
	}

	componentDidUpdate(prop)
	{
		if(this.props.info === prop.info) return;
		this.load(this.props.info.id);
		console.log(this.props);
	}


    render()
    {
		if(this.state === null
			|| this.state.info === null
			|| Object.keys(this.state.info).length === 0) 
		{
			return (
						<div>
						</div>
					);
		}
		else
		{
			return (
						<div className = {style.card}>
							<table>
								<tbody>
									<tr>
										<td>
											Табельный номер
										</td>
										<td>
											{this.state.info.tabnum}
										</td>
									</tr>
									<tr>
										<td>
											ФИО
										</td>
										<td>
											{this.state.info.name}
										</td>
									</tr>
									<tr>
										<td>
											Должность
										</td>
										<td>
											{this.state.info.prof}
										</td>
									</tr>
									<tr>
										<td>
											Цех
										</td>
										<td>
											{this.state.info.department}
										</td>
									</tr>
									<tr>
										<td>
											Отдел
										</td>
										<td>
											{this.state.info.division}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
				)
		}
    }
}

export default Cart
