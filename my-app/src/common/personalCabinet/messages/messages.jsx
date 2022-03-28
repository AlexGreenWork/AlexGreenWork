import React from "react";
import server from "../../../actions/server";
import { API_URL } from "../../../config";
import MessagesPage from './message/messages_page.jsx'
import MessagesAddresseeList from "./addressee/message_addressee_list";
import s from "./style/messages.module.css"
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft"
import MessageStatus from "./messages_status";
import Window from "./message_error_window";
import {connect} from "react-redux"

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
						addresseeTimer: null,
						readTimer: null,
						addressee: [],
						readedMessages: [],
						window: ADDRESS_BOOK_WINDOW,
						messageUser: null,
						users: {}}

		this.open_message_page			= this.open_message_page.bind(this);
		this.pull_new_messages			= this.pull_new_messages.bind(this);
		this.pull_all_messages			= this.pull_all_messages.bind(this);
		this.pull_old_messages			= this.pull_old_messages.bind(this);
		this.pull_all_message_addressee	= this.pull_all_message_addressee.bind(this);
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
		this.onMessageRead				= this.onMessageRead.bind(this);

		this.initAddresseeInterval		= this.initAddresseeInterval.bind(this);
		this.resetAddresseeInterval		= this.resetAddresseeInterval.bind(this);
		this.clearAddresseeInterval		= this.clearAddresseeInterval.bind(this);

		this.closeAllMessageDescriptors = this.closeAllMessageDescriptors.bind(this);

		this.componentDidMount			= this.componentDidMount.bind(this);
		this.componentWillUnmount		= this.componentWillUnmount.bind(this);

		this.onDeleteAddressee			= this.onDeleteAddressee.bind(this);
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
			this.show_address_book();
		}
	}

	componentWillUnmount()
	{
		this.closeAllMessageDescriptors();
		this.clearAddresseeInterval();
	}

	set_message_status_read(messageId)
	{
		server.send_post_request(`${API_URL}api/messages/set_message_status_read`, {messageId: messageId})
	}

	get_message_status_read(messageId, user)
	{
		server.send_post_request(`${API_URL}api/messages/get_message_status_read`, {messageId: messageId, addressee: user}).then((res) => {
			
			if(res.data.length > 0)
			{
				let messages = this.state.messages;
				const response = res.data;

				let is_update = false;

				for(let state of response)
				{
					if(state.is_read != 0)
					{
						let message = messages.find((e) => {return e.messageId == state.id});
						if(message)
						{
							is_update = true;
							message.is_read = state.is_read;
						}
					}
				}

				if(is_update)
				{
					this.setState({messages: messages});
				}
			}
		})
	}

	pull_all_messages(user)
	{
		server.send_post_request(`${API_URL}api/messages/pull_all_messages`,
		{
			addressee: user,
		}).then((res) => {
			this.setState({messages: res.data.messages});
		})
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

			const watched_messages = this.pull_unreads_messages_status();
			if(watched_messages.length > 0)
			{
				this.get_message_status_read(watched_messages, user);
			}
		}

	pull_old_messages()
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
		server.send_post_request(`${API_URL}api/messages/send_message`, {...message, addressee: this.state.messageUser}).then(res => {
			if(res.status === 200)
			{
				this.resetUpdateInterval();
				this.pull_new_messages(this.state.messageUser);
			}
		});
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

	pull_unreads_messages_status()
	{
		let unreadMessages = [];
		for(const message of this.state.messages)
		{
			if(message.is_read == 0 &&
				message.from == this.props?.currentUser)
			{
				unreadMessages.push(message.messageId);
			}
		}
		return unreadMessages;
	}

	closeAllMessageDescriptors()
	{
		this.state.messageUser = null;
		this.state.window = ADDRESS_BOOK_WINDOW;
		this.clearUpdateInterval();
		this.clearReadInterval();
	}

	clearAddresseeInterval()
	{
		if(this.state.addresseeTimer)
		{
			clearInterval(this.state.addresseeTimer);
		}
	}

	initAddresseeInterval()
	{
		this.state.addresseeTimer = setInterval(this.pull_all_message_addressee, 10000);
	}

	resetAddresseeInterval()
	{
		this.clearAddresseeInterval();
		this.initAddresseeInterval();
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
		this.state.timer = setInterval(() => this.pull_new_messages(this.state.messageUser), 10000);
	}

	initReadInterval()
	{
		this.state.readTimer = setInterval(this.messageReadyTimerHandler, 5000);
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
		if(this.state.readedMessages.length > 0)
		{
			this.set_message_status_read(this.state.readedMessages);
			this.setState({readedMessages: []});
		}
	}

	onMessageRead(messageId)
	{
		const messages = this.state.messages;
		const message = messages[messageId];

		if(message && !message.is_read && message.from == this.state.messageUser)
		{
			let readedMessages = this.state.readedMessages;
			readedMessages.push(message.messageId);
			message.is_read = !message.is_read;
			this.setState({readedMessages: readedMessages, messages: messages})
		}
	}

	onDeleteAddressee(userId)
	{
		server.send_post_request(`${API_URL}api/messages/delete_addressee`,
		{
			addressee: userId
		})

		const index = this.state.addressee.findIndex((v) => {return v.user == userId});

		if(index >= 0)
		{
			this.state.addressee.splice(index, 1);
			this.setState({addressee: this.state.addressee});
		}
	}

	show_user_messages(user)
	{
		this.pull_all_messages(user);
		this.resetReadInterval();
		this.resetUpdateInterval();
		this.clearAddresseeInterval();
	}

	show_address_book()
	{
		this.pull_all_message_addressee();
		this.resetAddresseeInterval();
		this.closeAllMessageDescriptors();
		this.messageReadyTimerHandler();
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
									onPullOldMessages = {this.pull_old_messages}
									onClosePage = {this.show_address_book}
									onMessageRead = {this.onMessageRead}
						/>
					</div>
					)
		}
		else if (this.state.window === ADDRESS_BOOK_WINDOW)
		{
			return (
					<div className={s.messagesContainer}>
						{this.state.addressee.length > 0?
							(
								<MessageStatus>
									<MessagesAddresseeList addressee = {this.state.addressee}
															onClick={this.open_message_page}
															onDeleteAddressee = {this.onDeleteAddressee}
								/>
								</MessageStatus>
							)
							 :
							(
								<h1 style={{width: "100%",
											textAlign: "center",
											color: "white",
											fontWeight: "bold",
											}}>
									Нет сообщений
								</h1>
							)
						}
					</div>
					)
		}

		else if(this.state.window === ERROR_WINDOW_USER_NOT_FOUND)
		{
			return <Window title = {"Ошибка"} message = {"Пользователь не найден"} onClose = {this.show_address_book}/>
		}
	}
}

function mapStateToProps(state)
{
	return { currentUser: state.user.currentUser.tabelNum }
}

export default connect(mapStateToProps)(Messages)
