import React from "react";
import s from "../style/messages.module.css"
import Message from "./message";
import moment from "moment";

class MessageList extends React.Component
{
	constructor(props)
	{
		super(props);
		this.onScrollTop = this.onScrollTop.bind(this);
	}

	scrollMessageToBottom()
	{
		const messageContainer = document.getElementById('messages_user_container');
		messageContainer.scrollTo(0, messageContainer.scrollHeight);
	}

	componentDidUpdate(props)
	{
		if(this.props !== props)
		{
			this.scrollMessageToBottom();
		}
	}

	onScrollTop(e)
	{
		if(e.target.scrollTop <= 0)
		{
			if(this.props?.onScrollToTop
				&& typeof this.props.onScrollToTop === 'function')
			{
				this.props.onScrollToTop();
			}
		}
	}

	render()
	{
		return (
					<div id = "messages_user_container" className={s.messages}
							onScroll = {this.onScrollTop}
					>
						<div style = {{color: "white",
										width: "100%",
										textAlign: "center"}}
						>
							Сообщения от: {moment(this.props.messages[0]?.time).format("DD-MM-YYYY")}
						</div>
						{this.props.messages.map((message, id) => (
							<Message key = {id} id = {id} {...message} users = {this.props.users}/>))}
					</div>
		)
	}
}

export default MessageList;
