import { Avatar } from "@mui/material";
import React from "react";
import h from "../style/address.module.css"
import { API_URL } from "../../../../config";
import MessageStatusIcon from "../message_status_icon";

class MessagesAddressee extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const message_sendler = this.props.addressee;
		const avatar = `${API_URL}files/${this.props.avatarFolder}/${this.props.src}`

		return (
			<div className={`${h.header}`} onClick = {() => {this.props.onClick(this.props.id)}}>
				{this.props?.unreads?
					(
						<MessageStatusIcon count = {this.props.unreads}/>
					)
				: null}
				<Avatar className = {h.ava} alt={this.props.id} src = {avatar} />
				<div className = {h.messagePreview}>
					<div className = {h.user}>
						<h3>
							<span className = {h.from}>
								{message_sendler}
							</span>
						</h3>
					</div>
				</div>
			</div>
		)
	}
}

export default MessagesAddressee;
