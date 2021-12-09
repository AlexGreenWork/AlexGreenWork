import React from "react"
import Row from "./row";
import {API_URL} from "../../../config.js"
import style from "./list.module.css"
const {post} = require("axios");

class List extends React.Component
{
	constructor(props)
	{
		super(props);

		this.sort_binds = {
						name: {
								false: (lv, rv) => {return lv.name > rv.name},
								true: (lv, rv) => {return lv.name < rv.name}
						},

						tab: {
								false: (lv, rv) => {return lv.tabnum > rv.tabnum},
								true: (lv, rv) => {return lv.tabnum < rv.tabnum}
						},

						ceh: {
								false: (lv, rv) => {return lv.department > rv.department},
								true: (lv, rv) => {return lv.department < rv.department }
						},

						dep: {
								false: (lv, rv) => {return lv.division > rv.division },
								true: (lv, rv) => {return lv.division < rv.division }
						}
		};

		this.state = {
						values: [],
						sort:	{by: "name", type: false}
					}

		this.search_result_category = new Map([
												["Табельный номер", "1"],
												["ФИО", "2"],
												["Код цеха", "3"],
												["Название цеха", "4"]
											]);

		this.create_list = this.create_list.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);

		this.load(this.props.category, this.props.search);
	}

	sort_list(list)
	{
		list.sort(
					this.sort_binds[this.state["sort"]["by"]]
									[this.state["sort"]["type"]]
					);
		return list;
	}

	create_list(res)
	{console.log("Create");
		let results = [];
		if(res?.data)
		{
			for(let response of res.data)
			{
				if(!response?.users) continue;

				const list = this.sort_list(response.users);

				list.map((v, i) => {
					results.push(<Row key = {i}
										tabnum = {v.tabnum}
										name = {v.name}
										department = {v.department}
										division = {v.division}
								/> );
				});
			}
		}
		
		return results;
	}

	load(category, search)
	{
		const search_category = this.search_result_category.get(category);
		post(`${API_URL}api/user/show_category`,
					{
						search: search,
						category: search_category
					}).then((res) => {
			this.setState({values: res});
		})
	}

	componentDidUpdate(prop)
	{
		if(this.props === prop) return;
		this.load(this.props.category, this.props.search);
	}

    render() {
        return (
            <table className = {style.listtable} cellPadding="12">
				<tbody>
					<th onClick={() => {this.setState({sort: {by: "tab", type: !this.state.sort.type}})}}>
						Табельный номер
					</th>
					<th onClick={() => {this.setState({sort: {by: "name", type: !this.state.sort.type}})}}>
						ФИО
					</th>
					<th onClick={() => {this.setState({sort: {by: "ceh", type: !this.state.sort.type}})}}>
						Цех
					</th>
					<th onClick={() => {this.setState({sort: {by: "dep", type: !this.state.sort.type}})}}>
						Отдел
					</th>
					{this.create_list(this.state.values)}
				</tbody>
            </table>
        )
    }
}

export default List
