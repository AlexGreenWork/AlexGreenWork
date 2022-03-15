import React from "react";
import s from "../style/messages.module.css"
import {Button, Tooltip} from '@mui/material'
import MessageList from './message_list'
import MessageInputForm from "./message_input_form";

class MessagesPage extends React.Component
{
	constructor(props)
	{
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onScrollToTop = this.onScrollToTop.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind('qwe');
	}

	componentWillUnmount()
	{
		if(this.props?.onClosePage
			&& typeof this.props.onClosePage === 'function')
		{
			this.props.onClosePage();
		}
	}

	onSubmit(e)
	{
		const field = document.getElementById("message_user_input");

		if(this.props?.onSubmitMessages
			&& typeof this.props.onSubmitMessages === 'function')
		{
			this.props.onSubmitMessages({
				message: field.value,
			});
		}

		field.value = '';

		return false;
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
				<>
					<MessageList messages = {this.props.messages}
									users = {this.props.users}
									onScrollToTop = {this.onScrollToTop}
									onMessageRead = {this.props.onMessageRead}
					/>
					<div>
						<MessageInputForm onSubmit = {this.onSubmit}/>
					</div>
				</>
		)
	}
}

export default MessagesPage;
