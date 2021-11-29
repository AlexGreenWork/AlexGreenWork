import React from "react"
const axios = require("axios");

class List extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {values: []};

		this.search_result_category = new Map([
												["Табельный номер", "1"],
												["ФИО", "2"],
												["Код цеха", "3"]
											]);
		console.log(this.props);
		this.create_list = this.create_list.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
	}

	create_list(res)
	{
		console.log(res);
		let results = [];
		if(res?.data)
		{
			for(let response of res.data)
			{
				if(!response?.users) continue;

				for(let user of response.users)
				{
					results.push(<tr>
									<td>
										{user.tabnum}
									</td>
									<td>
										{user.name}
									</td>
									<td>
										{user.department}
									</td>
									<td>
										{user.division}
									</td>
								</tr>);
				}
			}
		}
		
		return results;
	}

	load(category, search)
	{
		const search_category = this.search_result_category.get(category);
		axios.post("http://localhost:5000/api/user/show_category",
					{
						search: search,
						category: search_category
					}).then((res) => {

			this.setState({values: this.create_list(res)});
		})
	}

	componentDidUpdate(prop)
	{
		if(this.props === prop) return;
		this.load(this.props.category, this.props.search);
	}

    render() {
        return (
            <table style={{width: "100%", color: "black"}}>
				<tbody>
					{this.state.values}
				</tbody>
            </table>
        )
    }
}

export default List
