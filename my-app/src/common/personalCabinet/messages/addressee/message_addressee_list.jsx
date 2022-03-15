import React from "react";
import MessagesAddressee from "./message_addressee";
import s from "../style/message.module.css"
import h from "../style/addressee.module.css"
import Field from "../message/text_field";

class MessagesAddresseeList extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {filter: ""}

		this.onChange = this.onChange.bind(this);
	}

	onChange(e)
	{
		/**
		 * @type {string}
		 **/
		let value = e.target.value;
		value = value.trim();
		value = (value.length > 0)? value : null;
		this.setState({filter: value})
	}

	render()
	{
		let addressee = [];
		if(this.state.filter)
		{
			addressee = this.props.addressee.filter((value) => {
				return value.addressee.toLowerCase().startsWith(this.state.filter.toLowerCase());
			});
		}
		else
		{
			addressee = this.props.addressee;
		}

		return (
				<div className={s.messages}>
					<Field
						label="Поиск"
						color="info"
						className = {h.search}
						style = {{marginBottom: "20px"}}
						onChange={this.onChange}
						focused 
						autoFocus
					/>
					{addressee.map((address, id) => (
						<MessagesAddressee key={id}
											id = {address.user}
											unreads = {this.props.unread_message_count[address.user]}
											onClick = {this.props.onClick} {...address}/>
					))}
				</div>
		)
	}
}

export default MessagesAddresseeList;
