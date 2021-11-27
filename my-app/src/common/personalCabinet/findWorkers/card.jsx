import React, {useEffect} from "react"
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
			this.setState({info: res.data});
        })
	}

	componentDidUpdate(prop)
	{
		if(this.props.info === prop.info) return;
		this.load(this.props.info.id);
	}


    render()
    {
		if(!this.state) 
		{
			return (
						<div>
						</div>
					);
		}
		else
		{
			return (
						<div style={
										{
											width: "100%",
											height: "200px",
											padding: "40px 40px 20px 40px",
											backgroundColor: "#607fff",
											borderRadius: "5px",
											color: "white"
										}
									}>
							<table style={
											{
												width: "100%",
											}
										}>
								<col style={{width: "50%"}}></col>
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
							</table>
						</div>
				)
		}
    }
}

export default Cart
