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

		this.update = this.update.bind(this);
		this.load = this.load.bind(this);
	}

	componentWillMount()
	{
		this.load();
		this.setState({timer: setInterval(this.update, 10000)});
	}

	componentWillUnmount()
	{
		if(this.state.timer)
		{
			clearInterval(this.state.timer);
		}
	}

	load()
	{
		server.send_post_request(`${API_URL}api/messages/allMessages`).then((res) => {
			this.setState({messages: res.data.messages,
							users: res.data.users});
		});
	}

	update()
	{
		if(this.state.messages?.length <= 0)
		{
			this.load();

			return;
		}

		server.send_post_request(`${API_URL}api/messages/lastMessages`,
			{
				lastId: this.state.messages[this.state.messages.length - 1].messageId
			}).then((res) =>
			{
				if(res.data.messages.length > 0)
				{
					this.setState({messages: this.state.messages.concat(res.data.messages),
									users: res.data.users});
				}
			});
	}

	render()
	{
		return (
			<MessagesMain messages = {this.state.messages}
						users = {this.state.users}/>
		)
	}
}

export default Messages;
