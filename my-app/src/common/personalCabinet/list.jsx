import React from "react"
import Card from "./card";
import ScrollButton from "./scroll.jsx"
import {API_URL} from "../../../config.js"
import style from "./list.module.css"
import server from "../../actions/server";
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
						sort: "name",
						sort_type: false,
						old_sort: "name"
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
					this.sort_binds[this.state.sort]
									[this.state.sort_type]
					);
		return list;
	}

	create_list(res)
	{
		let results = [];
		if(res?.data)
		{
			for(let response of res.data)
			{
				if(!response?.users) continue;

				const list = this.sort_list(response.users);

				list.map((v, i) => {
					results.push(<tr key = {i}>
									<td colSpan = "4">
										<Card info = {v.tabnum} />
									</td>
								</tr> );
				});
			}
		}
		
		return results;
	}

	load(category, search)
	{
		const search_category = this.search_result_category.get(category);
		server.send_post_request(`${API_URL}api/user/show_category`,
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

	sort_handle(type)
	{
		let new_type = !this.state.sort_type;

		if(this.state.sort != this.state.old_sort)
		{
			new_type = false;
		}

		this.setState({sort: type, sort_type: new_type, old_sort: this.state.sort});
	}

    render() {
        return (<div className = {style.listcontainer}>
					<table className = {style.listtable} cellPadding="12">
							<col width = "20%"/>
							<col width = "20%"/>
							<col width = "20%"/>
						<thead>
							<tr>
								<th onClick={() => {this.sort_handle("tab")}}>
									Табельный номер
								</th>
								<th onClick={() => {this.sort_handle("name")}}>
									ФИО
								</th>
								<th onClick={() => {this.sort_handle("ceh")}}>
									Цех
								</th>
								<th onClick={() => {this.sort_handle("dep")}}>
									Отдел
								</th>
							</tr>
						</thead>
						<tbody>
							{this.create_list(this.state.values)}
						</tbody>
					</table>
					<ScrollButton/>
				</div>
        )
    }
}

export default List
