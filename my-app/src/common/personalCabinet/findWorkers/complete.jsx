import React from "react";
import {AutoComplete, Input} from "antd";
import {API_URL} from "../../../config.js"
import Translit from "./translit.js"
const {post} = require("axios");


class Complete extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {options: [],
						input_changed_value: ""}

		this.search_result_category = new Map([
												["1", "Табельный номер"],
												["2", "ФИО"],
												["3", "Код цеха"],
												["4", "Название цеха"]
											]);
		this.search_value = this.search_value.bind(this);
		this.select_value = this.select_value.bind(this);
		this.header_click = this.header_click.bind(this);

		this.text_translite = new Translit();
	}


	category_server_converter(category)
	{
		return this.search_result_category.get(category);
	}

	search_value(value)
	{
		const new_value = this.text_translite.convert(value);

		this.setState({show: false,
						input_changed_value: new_value});

        post(`${API_URL}api/user/search`, {search: new_value}).then((res) => {
            this.setState({options: this.create_options(new_value, res)});
        })

		this.props.onSearch?.(value);
	}

	create_options(search, response)
	{
		let result = [];
		for(const item of response.data)
		{
			result.push(this.create_category_header(search, item.category, item.count));
			result = result.concat(this.create_items(item.category, item.users));
		}
		return result;
	}

	create_items(category, values)
	{
		let items = [];
		for(let i = 0; i < values.length; i++)
		{
			const value = values[i];
			items.push(this.create_item(`${category}` + i , value.name, value.tabnum, value.division, value.department))
		}
		return items;
	}

	select_value(values)
	{
		this.setState({options: []});
		this.props.onSelectItem?.(values)
	}

	create_item(id, name, tabnum, division, department)
	{
		return {
			key: id,
			id: tabnum,
			value: name,
			label:(<div style={{
				display: 'flex',
				justifyContent: 'space-between',
			}}
			onClick = {(value) => this.select_value({tabnum: tabnum, name: name, department: department, division: division})}
			>
				<span>
					<div style={{display:"flex"}}>
						<div style={{fontWeight:"bold"}}>
							{name} &gt;&nbsp;
						</div>
						 Цех: {department} &gt; Отдел: {division}
					</div>
				</span>
			</div>),
		}
	}

	header_click(category, search)
	{
		this.props.onSelectHeader?.(category.target.innerText, search);
	}

	create_category_header(search, item_category, item_count)
	{
		const category = `${this.category_server_converter(item_category)}`;

		return {
			value: category,
			label: (<div
				style={{
					display: 'flex', justifyContent: 'space-between',
				}}
			>
				<span style={{color:"red", display:"flex"}}>
				  <div style={{fontWeight:"bold", color:"blue"}}> "{search}" </div> нашлось в {' '}
				</span>
				<span onClick={(value) => this.header_click(value, search)}
						style={
								{
									color: "blue",
									fontSize: "18px",
									fontStyle: "Bold"
								}
							}>
					{category}
				</span>
				<span>{item_count} результатов </span>
			</div>),
		};
	}

	render()
	{
		return (
			<>
				<AutoComplete
					dropdownMatchSelectWidth={500}
					style={{
						width: '100%',
						paddingBottom: '40px',
						fontSize: '14px',
						fontWeight: "bold"
					}}
					value = {this.state.input_changed_value}
					options ={this.state.options}
					onSearch={this.search_value}
				>
					<Input placeholder = "Введите текст для поиска" size="large" style={{ fontSize: '14px', textAlign: "center"}}/>
				</AutoComplete>
		</>);
	}
};

export default Complete
