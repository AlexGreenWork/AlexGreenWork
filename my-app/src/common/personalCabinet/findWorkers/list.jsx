import React from "react"
import Row from "./row";
const axios = require("axios");

class List extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {values: [],};
		this.search_result_category = new Map([
												["Табельный номер", "1"],
												["ФИО", "2"],
												["Код цеха", "3"],
												["Название цеха", "4"]
											]);
		this.create_list = this.create_list.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);

		//console.log(this.props.category);
		this.load(this.props.category, this.props.search);
	}

	create_list(res)
	{
		let results = [];
		if(res?.data)
		{
			for(let response of res.data)
			{
				if(!response?.users) continue;

				response.users.map((v, i) => {
					results.push(<Row key = {i} tabnum = {v.tabnum} name = {v.name} department = {v.department} division = {v.division}/> );
				});
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
            <table style={{width: "100%", color: "black"}} cellPadding="12">
				<tbody>
					{this.state.values}
				</tbody>
            </table>
        )
    }
}

export default List
