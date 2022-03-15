import React, { useEffect, useRef, useState } from "react";
import s from "../style/messages.module.css"
import Message from "./message";
import moment from "moment";

const Observer = (ref) =>
{
	const [visible, set_visible] = useState(false);

	const observer = new IntersectionObserver(([entry]) => set_visible(entry.isIntersecting));
		
	useEffect(() => {
		observer.observe(ref.current);
		return () => {observer.disconnect()}
	}, [])

	return visible;
}

const ObserverDispatcher = (props) =>
{
	const ref = useRef();
	const isVisible = Observer(ref);
	useEffect(() => {
		if(isVisible)
		{
			if(props?.onView && typeof props.onView === 'function')
			{
				props.onView(props.id);
			}
		}
	})

	return	<div ref={ref}>{props.children}</div>
}

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
						<div style = {{color: "white",
										width: "100%",
										textAlign: "center"}}
						>
							Сообщения от: {moment(this.props.messages[0]?.time).format("DD-MM-YYYY")}
						</div>
						{this.props.messages.map((message, id) => (
							<ObserverDispatcher key={id} id = {message.messageId} onView = {this.messageViewPortIntersection}>
								<Message key = {id} id = {id} {...message} users = {this.props.users}/>
							</ObserverDispatcher>
						))}
					</div>
		)
	}
}

export default MessageList;
