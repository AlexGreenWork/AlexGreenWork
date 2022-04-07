import React from "react";
import MessageList from './message_list'
import MessageInputForm from "./message_input_form";

class MessagesPage extends React.Component
{
	constructor(props)
	{
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onPullOldMessages = this.onPullOldMessages.bind(this);
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

	onSubmit(message)
	{
		if(this.props?.onSubmitMessages
			&& typeof this.props.onSubmitMessages === 'function')
		{
			this.props.onSubmitMessages({
				message: message,
			});
		}

		return false;
	}

	onPullOldMessages()
	{
		if(this.props?.onPullOldMessages
			&& typeof this.props.onPullOldMessages === 'function')
		{
			this.props.onPullOldMessages();
		}
	}

	render()
	{
		return (
				<>
					<MessageList messages = {this.props.messages}
									users = {this.props.users}
									onPullOldMessages = {this.onPullOldMessages}
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
