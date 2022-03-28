import React from "react";
import server from "../../../actions/server";
import { API_URL } from "../../../config";

class MessageStatus extends React.Component
{

	static timer = null;
	static defaultTimer = {
							ref_count: 0,
							refs: {},
							state: {},
							is_run: false}

	constructor(props)
	{
		super(props);
		this.state = {unreads: MessageStatus.defaultTimer.state,
						id: null}

		this.componentDidUpdate = this.componentDidUpdate.bind(this);
	}

	componentDidMount()
	{
		if(MessageStatus.defaultTimer.ref_count === 0)
		{
			if(!MessageStatus.timer)
			{
				MessageStatus.defaultTimer.is_run = true;
				MessageStatus.get_unread_messages_count();
				MessageStatus.resetTimer();
			}
		}
		MessageStatus.defaultTimer.ref_count ++;

		const value = Math.floor(Math.random() * 1000);
		MessageStatus.defaultTimer.refs[value] = this;
		this.setState({id: value})
	}

	componentWillUnmount()
	{
		MessageStatus.defaultTimer.ref_count --;
		delete MessageStatus.defaultTimer.refs[this.state.id];
		if(MessageStatus.defaultTimer.ref_count === 0)
		{
			MessageStatus.defaultTimer.is_run = false;
			clearInterval(MessageStatus.timer);

			MessageStatus.timer = null;
		}
	}

	componentDidUpdate(props, state)
	{
		if(this.state.unreads !== MessageStatus.defaultTimer.state
			|| (this.state.unreads.length !== MessageStatus.defaultTimer.state.length))
		{
			this.setState({unreads: MessageStatus.defaultTimer.state})
		}
	}

	static resetTimer()
	{
		if(MessageStatus.timer)
		{
			clearInterval(MessageStatus.timer)
		}

		MessageStatus.timer = setInterval(MessageStatus.get_unread_messages_count, 10000)
	}

	static get_unread_messages_count()
	{
		if(MessageStatus.defaultTimer.is_run)
		{
			server.send_post_request(`${API_URL}api/messages/get_unread_messages_count`).then((res) => {
				if(res.status === 200)
				{
					MessageStatus.defaultTimer.state = res.data;
					for(let a in MessageStatus.defaultTimer.refs)
					{
						MessageStatus.defaultTimer.refs[a].forceUpdate();
					}
				}
				else
				{
					MessageStatus.defaultTimer.is_run = false;
				}
			});
		}
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
