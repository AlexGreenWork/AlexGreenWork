import React from "react";
import s from "./messages.module.css"
import {Button, Tooltip} from '@mui/material'
import MessageList from './message_list'
import MessageInputForm from "./message_input_form";

class MessageMain extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = { to: [] }

		this.onAddedMailed = this.onAddedMailed.bind(this);
		this.onDeletedMailed = this.onDeletedMailed.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onScrollToTop = this.onScrollToTop.bind(this);
	}

	onSubmit(e)
	{
		const field = document.getElementById("message_user_input");

		if(this.props?.onSubmitMessages
			&& typeof this.props.onSubmitMessages === 'function')
		{
			this.props.onSubmitMessages({
				message: field.value,
				to: this.state.to
			});
		}

		field.value = '';
		this.setState({to: []});

		return false;
	}

	onAddedMailed(e)
	{
		let to = this.state.to;
		const user = this.props.messages[e].from;
		if(to.includes(user)) return;

		to.push(user);
		this.setState({to: to});
	}

	onDeletedMailed(e)
	{
		const id = e.target.id;
		let to = this.state.to;
		const index = to.findIndex((e) => e == id);
		delete to[index];
		this.setState({to: to});
	}

	onScrollToTop()
	{
		if(this.props?.onPullLastMessages
			&& typeof this.props.onPullLastMessages === 'function')
		{
			this.props.onPullLastMessages();
		}
	}

	render()
	{
		return (
				<div className={s.messagesContainer}>
					<MessageList messages = {this.props.messages}
									users = {this.props.users}
									onMessageClick = {this.onAddedMailed}
									onScrollToTop = {this.onScrollToTop}
					/>
					<div style={{overflowY: "scroll", height: "40px"}}>
						{this.state.to?.map((val, id) => (
							<Tooltip key = {id} title = "Убрать пользователя из рассылки">
								<Button key = {id} id = {val}
									onClick = {this.onDeletedMailed}
									variant = "contained"
									color = "primary"
								>
									{this.props.users[val].sendler}
								</Button>
							</Tooltip>
						))}
					</div>
					<div>
						<MessageInputForm onSubmit = {this.onSubmit}/>
					</div>
				</div>
		)
	}
}

export default MessageMain;
