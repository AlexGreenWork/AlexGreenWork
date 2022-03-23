import React from "react";
import s from "./messages.module.css"
import moment from "moment";
import {Button, FormControl, styled, Tooltip} from '@mui/material'
import Message from "./message";
import { connect } from "react-redux";
import server from "../../../actions/server";
import { API_URL } from "../../../config";
import TextField from '@mui/material/TextField';

const Field = styled(TextField)
({
	'& .MuiInputBase-input':
	{
		color: "White",
	},
});

class Messages extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = { to: [],
						messages: [],
						timer: null,
						users: {}}

		this.added = this.added.bind(this);
		this.deleted = this.deleted.bind(this);
		this.submit = this.submit.bind(this);
		this.update = this.update.bind(this);
		this.load = this.load.bind(this);
	}

	componentDidMount()
	{
		this.load();
		this.setState({timer: setInterval(this.update, 10000)});
	}

	componentWillUnmount()
	{
		if(this.state.timer)
		{
			clearInterval(this.state.timer);
		}
	}

	scroll_message_to_bottom()
	{
		const messageContainer = document.getElementById('messages_user_container');
		messageContainer.scrollTo(0, messageContainer.scrollHeight);
	}

	load()
	{
		server.send_post_request(`${API_URL}api/messages/allMessages`).then((res) => {
			this.setState({messages: res.data.messages,
							users: res.data.users});
			this.scroll_message_to_bottom();
		});
	}

	update()
	{
		if(this.state.messages?.length <= 0)
		{
			this.load();

			return;
		}

		server.send_post_request(`${API_URL}api/messages/lastMessages`,
			{
				lastId: this.state.messages[this.state.messages.length - 1].messageId
			}).then((res) =>
			{
				if(res.data.messages.length > 0)
				{
					this.setState({messages: this.state.messages.concat(res.data.messages),
									users: res.data.users});
					this.scroll_message_to_bottom();
				}
			});
	}

	submit(e)
	{
		const field = document.getElementById("message_user_input");

		server.send_post_request(`${API_URL}api/messages/newMessage`,
			{
				message: field.value,
				to: this.state.to
			})

		field.value = "";
		this.setState({to: []});

		return false;
	}

	added(e)
	{
		let to = this.state.to;
		const user = this.state.messages[e].from;
		if(to.includes(user)) return;

		to.push(user);
		this.setState({to: to});
	}

	deleted(e)
	{
		const id = e.target.id;
		let to = this.state.to;
		const index = to.findIndex((e) => e == id);
		delete to[index];
		this.setState({to: to});
	}

	render()
	{
		return (
				<div className={s.messagesContainer}>
					<div id = "messages_user_container" className={s.messages}>
						{this.state.messages.map((message, id) => (
							<Message key = {id}
									from = {this.state.users[message.from].sendler}
									id = {id}
									to = {this.state.users[message.to]}
									message = {message.message}
									time = {moment(message.time).format("DD-MM-YYYY HH:mm")}
									src = {`${API_URL}files/${this.state.users[message.from].avatarFolder}/${this.state.users[message.from].src}`}
									onClick = {this.added}/>
						))}
					</div>
					<div style={{overflowY: "scroll", height: "40px"}}>
						{this.state.to?.map((val, id) => (
							<Tooltip title = "Убрать пользователя из рассылки">
								<Button key = {id} id = {val}
									onClick = {this.deleted}
									variant = "outlined"
									color = "primary"
								>
									{this.state.users[val].sendler}
								</Button>
							</Tooltip>
						))}
					</div>
					<div>
						<FormControl variant="standard"
										style = {{width:"100%"}}>
							<div>
								<div style = {{display: "grid", gridTemplateColumns: "auto 15%"}}>
									<Field
										id = "message_user_input"
										label="Сообщение"
										color="success"
										focused 
										autoFocus
										multiline
										maxRows={2}	
									/>
									<Button style = {{height: "55px", marginLeft: "5px"}}
											variant = "contained"
											color = "success"
											onClick = {this.submit}
									>
										Отправить
									</Button>
								</div>
							</div>
						</FormControl>
					</div>
				</div>
		)
	}
}

function mapStateToProps(state)
{
  return { user: state.user?.currentUser }
}

export default connect(mapStateToProps)(Messages);
