import React from "react";
import server from "../../../actions/server";
import { API_URL } from "../../../config";
import MessagesMain from './messages_main.jsx'

class Messages extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = { messages: [],
						timer: null,
						users: {}}

		this.pull_new_messages = this.pull_new_messages.bind(this);
		this.pull_all_messages = this.pull_all_messages.bind(this);
		this.pull_last_messages = this.pull_last_messages.bind(this);
	}

	componentWillMount()
	{
		this.pull_all_messages();
		this.setState({timer: setInterval(this.pull_new_messages, 10000)});
	}

	componentWillUnmount()
	{
		if(this.state.timer)
		{
			clearInterval(this.state.timer);
		}
	}

	pull_all_messages()
	{
		server.send_post_request(`${API_URL}api/messages/pull_all_messages`).then((res) => {
			this.setState({messages: res.data.messages,
							users: res.data.users});
		});
	}

	pull_new_messages()
	{
		if(this.state.messages?.length <= 0)
		{
			this.pull_all_messages();

			return;
		}

		server.send_post_request(`${API_URL}api/messages/pull_new_messages`,
			{
				lastId: this.state.messages[this.state.messages.length - 1].messageId
			}).then((res) =>
			{
				if(res.data.messages.length > 0)
				{
					this.setState({messages: this.state.messages.concat(res.data.messages),
									users: {...res.data.users, ...this.state.users}});
				}
			});
	}

	pull_last_messages()
	{
		if(this.state.messages?.length <= 0)
		{
			this.pull_all_messages();

			return;
		}

		server.send_post_request(`${API_URL}api/messages/pull_old_messages`,
			{
				lastId: this.state.messages[0].messageId
			}).then((res) =>
			{
				if(res.data.messages.length > 0)
				{
					this.setState({messages: res.data.messages.concat(this.state.messages),
									users: {...res.data.users, ...this.state.users}});
				}
			});
	}

	submit_message(message)
	{
		server.send_post_request(`${API_URL}api/messages/send_message`, message);
	}

	render()
	{
		return (
			<MessagesMain messages = {this.state.messages}
						users = {this.state.users}
						onSubmitMessages = {this.submit_message}
						onPullLastMessages = {this.pull_last_messages}
			/>
		)
	}
}

export default Messages;
