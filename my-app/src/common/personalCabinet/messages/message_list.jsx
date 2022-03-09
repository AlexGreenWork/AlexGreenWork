import React from "react";
import s from "./messages.module.css"
import moment from "moment";
import Message from "./message";
import { API_URL } from "../../../config";

class MessageList extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	scroll_message_to_bottom()
	{
		const messageContainer = document.getElementById('messages_user_container');
		messageContainer.scrollTo(0, messageContainer.scrollHeight);
	}

	componentDidUpdate(props)
	{
		if(this.props !== props)
		{
			this.scroll_message_to_bottom();
		}
	}

	render()
	{
		return ( <div id = "messages_user_container" className={s.messages}>
					{this.props.messages.map((message, id) => (
						<Message key = {id}
								from = {this.props.users[message.from].sendler}
								id = {id}
								to = {message.to}
								users = {this.props.users}
								message = {message.message}
								time = {moment(message.time).format("DD-MM-YYYY HH:mm")}
								src = {`${API_URL}files/${this.props.users[message.from].avatarFolder}/${this.props.users[message.from].src}`}
								onClick = {this.props.onMessageClick}/>
					))}
				</div>
		)
	}
}

export default MessageList;
