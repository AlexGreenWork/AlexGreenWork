import React from "react";
import server from "../../../actions/server";
import { API_URL } from "../../../config";
import MessagesPage from './message/messages_page.jsx'
import MessagesAddresseeList from "./addressee/message_addressee_list";
import s from "./style/messages.module.css"
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft"
import MessageStatus from "./messages_status";
import Window from "./message_error_window";

const MESSAGE_WINDOW = '1';
const ADDRESS_BOOK_WINDOW = '2';
const ERROR_WINDOW_USER_NOT_FOUND = '3';

class Messages extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = { messages: [],
						timer: null,
						readTimer: null,
						addressee: [],
						window: ADDRESS_BOOK_WINDOW,
						messageUser: null,
						users: {}}

		this.open_message_page			= this.open_message_page.bind(this);
		this.pull_new_messages			= this.pull_new_messages.bind(this);
		this.pull_all_messages			= this.pull_all_messages.bind(this);
		this.pull_last_messages			= this.pull_last_messages.bind(this);
		this.submit_message				= this.submit_message.bind(this);

		this.show_user_messages			= this.show_user_messages.bind(this);
		this.show_address_book			= this.show_address_book.bind(this);

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
			this.open_message_page(addressee);
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
		this.setState({messageUser: null, window: ADDRESS_BOOK_WINDOW});
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
			this.setState({messages: res.data.messages})});
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
					this.setState({messages: this.state.messages.concat(res.data.messages)});
				}
			});
	}

	pull_last_messages()
	{
		const user = this.state.messageUser;

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
					this.setState({messages: res.data.messages.concat(this.state.messages)});
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

	open_message_page(user)
	{
		server.send_post_request(`${API_URL}api/messages/get_addressee_info`,
		{
			addressee: user,
		}).then((res) => {
			if(res.data?.users && (user in res.data.users))
			{
				this.setState({messageUser: user,
								window: MESSAGE_WINDOW,
								messages: [],
								users: res.data.users});
				this.show_user_messages(user);
			}
			else
			{
				this.setState({window: ERROR_WINDOW_USER_NOT_FOUND});
			}
		});
	}

	show_user_messages(user)
	{
		this.pull_all_messages(user);
		this.resetReadInterval();
		this.resetUpdateInterval();
	}

	show_address_book()
	{
		if(this.state.addressee.length === 0)
		{
			this.pull_all_message_addressee();
		}
		this.closeAllMessageDescriptors();
	}

	render()
	{

		if(this.state.window === MESSAGE_WINDOW)
		{
			return (
					<div className={s.messagesContainer}>
						<h3 className = {s.userMessageHeader}>
							<ArrowCircleLeftIcon className = {s.userMessageHeaderBack}
								onClick = {this.show_address_book}
							/>
							<span className = {s.userMessageHeaderUser}>
								{this.state.users[this.state.messageUser]?.sendlerFullName}
							</span>
						</h3>
						<MessagesPage messages = {this.state.messages}
									users = {this.state.users}
									onSubmitMessages = {this.submit_message}
									onPullLastMessages = {this.pull_last_messages}
									onClosePage = {this.show_address_book}
						/>
					</div>
					)
		}
		else if (this.state.window === ADDRESS_BOOK_WINDOW)
		{
			return (
					<div className={s.messagesContainer}>
						<MessageStatus>
							<MessagesAddresseeList addressee = {this.state.addressee}
													onClick={this.open_message_page}/>
						</MessageStatus>
					</div>
					)
		}

		else if(this.state.window === ERROR_WINDOW_USER_NOT_FOUND)
		{
			return <Window title = {"Ошибка"} message = {"Пользователь не найден"} onClose = {this.show_address_book}/>
		}
	}
}

export default Messages;
