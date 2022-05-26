import React from "react";
import s from "../style/messages.module.css"
import Message from "./message";

class MessageList extends React.Component
{
	constructor(props)
	{
		super(props);
		this.messageListRef = React.createRef();
		this.onScroll = this.onScroll.bind(this);
		this.messageViewPortIntersection = this.messageViewPortIntersection.bind(this);

	}

	componentDidUpdate(props)
	{
		if(this.props !== props)
		{
			const element = this.messageListRef?.current;
			if(element?.children)
			{
				this.messageViewCheck(element.children, element);
				this.messageListRef.current.scrollTo(0, 99999999999999999999999);
			}
		}
	}

	onScroll(e)
	{
		if(e.target.scrollTop <= 0)
		{
			if(this.props?.onPullOldMessages 
				&& typeof this.props.onPullOldMessages  === 'function')
			{
				this.props.onPullOldMessages();
			}
		}
		
		this.messageViewHandle(e);
	}

	isVisible(ele, container)
	{
		const eleTop = ele.offsetTop;
		const eleBottom = eleTop + ele.clientHeight;

		const containerTop = container.scrollTop + container.offsetTop;
		const containerBottom = containerTop + container.clientHeight;

		return (
			(eleTop >= containerTop && eleBottom <= containerBottom) ||
			(eleTop < containerTop && containerTop < eleBottom) ||
			(eleTop < containerBottom && containerBottom < eleBottom)
		);
	};

	messageViewHandle(e)
	{
		const children = e.target.children;
		this.messageViewCheck(children, e.target)
	}

	messageViewCheck(elements, container)
	{
		for(const element of elements)
		{
			if(this.isVisible(element, container))
			{
				this.messageViewPortIntersection(element.id);
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
					<div id='list'  ref = {this.messageListRef}
							className={s.messages}
							onScroll = {this.onScroll}

					>
						{this.props.messages.map((message, id) => (
							<div key = {id} id = {id}>
								<Message key = {id} id = {id} {...message} users = {this.props.users}/>
							</div>
						))}
					</div>
		)
	}
}


export default MessageList;
