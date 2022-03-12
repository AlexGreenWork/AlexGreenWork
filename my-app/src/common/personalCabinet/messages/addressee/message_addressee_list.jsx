import React from "react";
import MessagesAddressee from "./message_addressee";
import s from "../style/message.module.css"

class MessagesAddresseeList extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
				<div className={s.messages}>
					{this.props.addressee.map((address, id) => (
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
