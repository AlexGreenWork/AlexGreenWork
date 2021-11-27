import React, {useEffect} from "react"
const axios = require("axios");

class Cart extends React.Component
{
    constructor(props)
	{
        super(props);
		this.load = this.load.bind(this);
		this.state = {info: []};
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
        return (
            <div style={
                            {
                                width: "100%",
                                height: "200px",
                            }
                        }>
				<table style={
								{
									border: "1px"
								}
							}
					>
					<tr>
						<td>
							Табельный номер
						</td>
						<td>
							ФИО
						</td>
						<td>
							Должность
						</td>
						<td>
							Цех
						</td>
						<td>
							Отдел
						</td>
					</tr>
					<tr>
						<td>
							{this.state.info.tabnum}
						</td>
						<td>
							{this.state.info.name}
						</td>
						<td>
							{this.state.info.prof}
						</td>
						<td>
							{this.state.info.department}
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

export default Cart
