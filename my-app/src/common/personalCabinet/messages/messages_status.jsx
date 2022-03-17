import React from "react";
import server from "../../../actions/server";
import { API_URL } from "../../../config";

class MessageStatus extends React.Component
{
	static timer = setInterval(this.get_unread_messages_count, 10000)
	static defaultTimer = {
							ref_count: 0,
							refs: {},
							state: [],
							is_run: false}

	constructor(props)
	{
		super(props);
		this.state = {unreads: []};
	}

	componentDidMount()
	{
		if(MessageStatus.defaultTimer.ref_count === 0)
		{
			MessageStatus.defaultTimer.is_run = true;
		}
		MessageStatus.defaultTimer.ref_count ++;
		MessageStatus.defaultTimer.refs[MessageStatus.defaultTimer.ref_count] = this;
	}

	componentWillUnmount()
	{
		MessageStatus.defaultTimer.ref_count --;
		delete MessageStatus.defaultTimer.refs[MessageStatus.defaultTimer.ref_count];
		if(MessageStatus.defaultTimer.ref_count === 0)
		{
			MessageStatus.defaultTimer.is_run = false;
			clearInterval(MessageStatus.defaultTimer.timer);
		}
	}

	static get_unread_messages_count()
	{
		server.send_post_request(`${API_URL}api/messages/get_unread_messages_count`).then((res) => {
			if(MessageStatus.defaultTimer.is_run)
			{
				MessageStatus.defaultTimer.state = res.data;
				for(let a in MessageStatus.defaultTimer.refs)
				{
					MessageStatus.defaultTimer.refs[a].setState({unreads: res.data});
				}
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
