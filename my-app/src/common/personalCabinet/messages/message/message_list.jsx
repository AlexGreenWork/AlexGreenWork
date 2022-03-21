import React from "react";
import s from "../style/messages.module.css"
import Message from "./message";

class MessageList extends React.Component
{
	constructor(props)
	{
		super(props);
		this.onScrollTop = this.onScrollTop.bind(this);
		this.messageViewPortIntersection = this.messageViewPortIntersection.bind(this);
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

		const children = e.target.children;

		for(const child of children)
		{
			let rectangle = child.getBoundingClientRect();
			if(
				rectangle.top >= 0 &&
				rectangle.left >= 0 &&
				rectangle.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rectangle.right <= (window.innerWidth || document.documentElement.clientWidth)
			)
			{
				this.messageViewPortIntersection(child.id);
			}
		}
	}

	messageViewPortIntersection(messageId)
	{
		if(this.props?.onMessageRead
			&& typeof this.props.onMessageRead === 'function')
		{
			this.props.onMessageRead(messageId);
		}
	}

	render()
	{
		return (
					<div id = "messages_user_container" className={s.messages}
							onScroll = {this.onScrollTop}
					>
						{this.props.messages.map((message, id) => (
							<div key = {id} id = {message.messageId}>
								<Message key = {id} id = {id} {...message} users = {this.props.users}/>
							</div>
						))}
					</div>
		)
	}
}

export default MessageList;
