import React from "react";
import server from "../../../actions/server";
import { API_URL } from "../../../config";
import MessagesPage from './message/messages_page.jsx'
import MessagesAddresseeList from "./addressee/message_addressee_list";
import s from "./style/messages.module.css"
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft"
import MessageStatus from "./messages_status";

class Messages extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = { messages: [],
						timer: null,
						readTimer: null,
						addressee: [],
						isMessage: false,
						messageUser: null,
						users: {}}

		this.pull_new_messages			= this.pull_new_messages.bind(this);
		this.pull_all_messages			= this.pull_all_messages.bind(this);
		this.pull_last_messages			= this.pull_last_messages.bind(this);
		this.submit_message				= this.submit_message.bind(this);

		this.show_user_messages			= this.show_user_messages.bind(this);
		this.hide_user_messages			= this.hide_user_messages.bind(this);

		this.initUpdateInterval			= this.initUpdateInterval.bind(this);
		this.resetUpdateInterval		= this.resetUpdateInterval.bind(this);
		this.clearUpdateInterval		= this.clearUpdateInterval.bind(this);

		this.initReadInterval			= this.initReadInterval.bind(this);
		this.resetReadInterval			= this.resetReadInterval.bind(this);
		this.clearReadInterval			= this.clearReadInterval.bind(this);
		this.messageReadyTimerHandler	= this.messageReadyTimerHandler.bind(this);

		this.closeAllMessageDescriptors = this.closeAllMessageDescriptors.bind(this);
	}

	componentDidMount()
	{
		if(this.props?.location?.aboutProps?.addressee)
		{
			const addressee = this.props?.location?.aboutProps?.addressee;
			this.setState({messageUser: addressee, isMessage: true})
			this.show_user_messages(addressee);
		}
		else
		{
			this.pull_all_message_addressee();
		}
	}

	componentWillUnmount()
	{
		this.closeAllMessageDescriptors();
	}

	closeAllMessageDescriptors()
	{
		this.setState({messageUser: null, isMessage: false});
		this.clearUpdateInterval();
		this.clearReadInterval();
	}

	clearUpdateInterval()
	{
		if(this.state.timer)
		{
			clearInterval(this.state.timer);
		}
	}

	clearReadInterval()
	{
		if(this.state.readTimer)
		{
			clearInterval(this.state.readTimer);
		}
	}

	initUpdateInterval()
	{
		this.setState({timer: setInterval(() => this.pull_new_messages(this.state.messageUser), 10000)});
	}

	initReadInterval()
	{
		this.setState({readTimer: setInterval(this.messageReadyTimerHandler, 10000)});
	}

	resetUpdateInterval()
	{
		this.clearUpdateInterval();
		this.initUpdateInterval();
	}

	resetReadInterval()
	{
		this.clearReadInterval();
		this.initReadInterval();
	}

	messageReadyTimerHandler()
	{
		let unreadMessages = [];

		for(let message of this.state.messages)
		{
			if(message.from === this.state.messageUser)
			{
				if(!message.is_read)
				{
					message.is_read = !message.is_read;
					unreadMessages.push(message.messageId);
				}
			}
		}

		if(unreadMessages.length > 0)
		{
			this.set_message_status_read(unreadMessages);
		}
	}

	set_message_status_read(messageId)
	{
		server.send_post_request(`${API_URL}api/messages/set_message_status_read`, {messageId: messageId})
	}

	pull_all_messages(user)
	{
		server.send_post_request(`${API_URL}api/messages/pull_all_messages`,
		{
			addressee: user,
		}).then((res) => {
			this.setState({messages: res.data.messages,
							users: res.data.users});
		});
	}

	pull_new_messages(user)
	{
		if(this.state.messages?.length <= 0)
		{
			this.pull_all_messages(user);

			return;
		}

		server.send_post_request(`${API_URL}api/messages/pull_new_messages`,
			{
				addressee: user,
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

	pull_last_messages(user)
	{
		if(this.state.messages?.length <= 0)
		{
			this.pull_all_messages(user);

			return;
		}

		server.send_post_request(`${API_URL}api/messages/pull_old_messages`,
			{
				addressee: user,
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
		server.send_post_request(`${API_URL}api/messages/send_message`, {...message, addressee: this.state.messageUser});
	}

	pull_all_message_addressee()
	{
		server.send_post_request(`${API_URL}api/messages/pull_all_message_addressee`).then((res) =>
			{
				this.setState({addressee: res.data})
			});
	}

	show_user_messages(user)
	{
		this.setState({messageUser: user, isMessage: true});
		this.pull_all_messages(user);
		this.resetReadInterval();
		this.resetUpdateInterval();
	}

	hide_user_messages()
	{
		if(this.state.addressee.length === 0)
		{
			this.pull_all_message_addressee();
		}
		this.closeAllMessageDescriptors();
	}

	render()
	{
		const addressee = this.state.addressee.find((e) => {return e.user === this.state.messageUser});

		return (
				<div className={s.messagesContainer}>
					{this.state.isMessage?
						(
							<>
								<h3 className = {s.userMessageHeader}>
									<ArrowCircleLeftIcon className = {s.userMessageHeaderBack}
										onClick = {this.hide_user_messages}
									/>
									<span style = {{color: "#c67c00"}}>
										{addressee.addressee}
									</span>
								</h3>
								<MessagesPage messages = {this.state.messages}
											users = {this.state.users}
											onSubmitMessages = {this.submit_message}
											onPullLastMessages = {this.pull_last_messages}
											onClosePage = {this.hide_user_messages}
								/>
							</>
						)
					: (
						<MessageStatus>
							<MessagesAddresseeList addressee = {this.state.addressee}
													onClick={this.show_user_messages}/>
						</MessageStatus>
					)}
			</div>
		)
	}
}

export default Messages;
