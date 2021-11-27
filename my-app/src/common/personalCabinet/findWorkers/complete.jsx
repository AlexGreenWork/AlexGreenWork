import React, {useState} from "react";
import {AutoComplete, Input} from "antd";
const axios = require("axios");
const Cart = require("./cart");

class Complete extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {options: [],
						search: []};

		this.search_result_category = new Map([
												["1", "Табельный номер"],
												["2", "ФИО"],
												["3", "Код цеха"]
											]);
		this.search_value = this.search_value.bind(this);
	}

	category_server_converter(category)
	{
		return this.search_result_category.get(category);
	}

	search_value(value)
	{
        axios.post("http://localhost:5000/api/user/search", {search: value}).then((res) => {
            this.setState({options: this.create_options(value, res)});
        })
	}

	create_options(search, response)
	{
		let result = [];
		for(const item of response.data)
		{
			result.push(this.create_category_header(search, item.category, item.count));
			result = result.concat(this.create_items(item.users));
		}
		return result;
	}

	create_items(values)
	{
		let items = [];
		for(const value of values)
		{
			items.push(this.create_item(value.name, value.tabnum, value.department, value.division))
		}
		return items;
	}

	create_item(name, tabnum, division, department)
	{
		return {
			label:(<div style={{
				display: 'flex',
				justifyContent: 'space-between',
			}}
			>
				<span>
					{name}
					Отдел {department}
					Цех {division}
				</span>
			</div>),
		}
	}

	create_category_header(search, item_category, item_count)
	{
		const category = ` в ${this.category_server_converter(item_category)}`;

		return {
			value: category, label: (<div
				style={{
					display: 'flex', justifyContent: 'space-between',
				}}
			>
				<span>
				  Found `{search}` on {' '}
					<a
						href={`http://localhost:3000/personalCabinet/findWorkers=${item_category}`}
						target="_blank"
						rel="noopener noreferrer"
					>
					{category}
				  </a>
				</span>
				<span>{item_count} результатов </span>
			</div>),
		};
	}

	render()
	{
		return (<AutoComplete
			dropdownMatchSelectWidth={500}
			style={{
				width: '100%',
			}}
			options={this.state.options}
			onSearch={this.search_value}
		>
			<Input.Search size="large" style={{
				fontSize: '14px',
				textAlign: 'center'
			}
			} enterButton/>
		</AutoComplete>);
	}
};

export default Complete
