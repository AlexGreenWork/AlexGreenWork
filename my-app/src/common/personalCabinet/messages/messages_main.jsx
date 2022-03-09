import React from "react";
import s from "./messages.module.css"
import {Button, Tooltip} from '@mui/material'
import MessageList from './message_list'
import server from "../../../actions/server";
import { API_URL } from "../../../config";
import MessageInputForm from "./message_input_form";

class MessageMain extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = { to: [] }

		this.added_mailed = this.added_mailed.bind(this);
		this.deleted_mailed = this.deleted_mailed.bind(this);
		this.submit = this.submit.bind(this);
	}

	submit(e)
	{
		const field = document.getElementById("message_user_input");

		server.send_post_request(`${API_URL}api/messages/newMessage`,
			{
				message: field.value,
				to: this.state.to
			})

		field.value = '';
		this.setState({to: []});

		return false;
	}

	added_mailed(e)
	{
		let to = this.state.to;
		const user = this.props.messages[e].from;
		if(to.includes(user)) return;

		to.push(user);
		this.setState({to: to});
	}

	deleted_mailed(e)
	{
		const id = e.target.id;
		let to = this.state.to;
		const index = to.findIndex((e) => e == id);
		delete to[index];
		this.setState({to: to});
	}

	render()
	{
		return (
				<div className={s.messagesContainer}>
					<MessageList messages = {this.props.messages}
									users = {this.props.users}
									onMessageClick = {this.added_mailed}
					/>
					<div style={{overflowY: "scroll", height: "40px"}}>
						{this.state.to?.map((val, id) => (
							<Tooltip title = "Убрать пользователя из рассылки">
								<Button key = {id} id = {val}
									onClick = {this.deleted_mailed}
									variant = "outlined"
									color = "primary"
								>
									{this.props.users[val].sendler}
								</Button>
							</Tooltip>
						))}
					</div>
					<div>
						<MessageInputForm onSubmit = {this.submit}/>
					</div>
				</div>
		)
	}
}

export default MessageMain;
