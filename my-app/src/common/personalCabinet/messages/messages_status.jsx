import React from "react";
import server from "../../../actions/server";
import { API_URL } from "../../../config";

class MessageStatus extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = { unreads: [], is_run: true,
						readTimer: null};

		this.componentDidMount			= this.componentDidMount.bind(this);
		this.componentWillUnmount		= this.componentWillUnmount.bind(this);
		this.get_unread_messages_count	= this.get_unread_messages_count.bind(this);

		this.initReadInterval			= this.initReadInterval.bind(this);
		this.resetReadInterval			= this.resetReadInterval.bind(this);
		this.clearReadInterval			= this.clearReadInterval.bind(this);
	}

	componentDidMount()
	{
		this.get_unread_messages_count();
		this.initReadInterval();
	}

	componentWillUnmount()
	{
		this.setState({is_run: false});
		this.clearReadInterval();
	}

	clearReadInterval()
	{
		if(this.state.readTimer)
		{
			clearInterval(this.state.readTimer);
		}
	}

	initReadInterval()
	{
		this.setState({readTimer: setInterval(this.get_unread_messages_count, 20000)});
	}

	resetReadInterval()
	{
		this.clearReadInterval();
		this.initReadInterval();
	}

	get_unread_messages_count()
	{
		server.send_post_request(`${API_URL}api/messages/get_unread_messages_count`).then((res) => {
			if(this.state.is_run)
			{
				this.setState({unreads: res.data});
			}
		});
	}

	render()
	{
		return (
			<>
				{React.cloneElement(this.props.children, {...this.props, unread_message_count: this.state.unreads})}
			</>
		)
	}
}

export default MessageStatus;
