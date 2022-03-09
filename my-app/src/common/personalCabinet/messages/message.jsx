import { Avatar } from "@mui/material";
import React from "react";
import s from "./message.module.css"
import {connect} from 'react-redux'

/** 
 * @param {{ src: string; from: string; time: string; to: string; message: string; onClick: React.MouseEventHandler<HTMLDivElement>}}  props
**/
class Message extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	message_style()
	{
		if(this.props.from == this.props.user.tabelNum)
			return s.youMessage;
		else if(this.props.to.includes(this.props.user.tabelNum))
			return s.toMessage;
		else
			return s.message;
	}

	render()
	{
		let to = [];
		for(const user of this.props.to)
		{
			to.push(this.props.users[user].sendler)
		}

		const users = to.join(', ');

		return (
			<div className={s.header} onClick = {() => {this.props.onClick(this.props.id)}}>
					<Avatar className = {s.ava} alt="" src = {this.props.src} />
				<div className = {s.messagePreview}>
					<div className = {s.user}>
						<h3>
							<span className = {s.from}>
								{this.props.sendler}
							</span>
						</h3>
						<span className = {s.time}>
							{this.props.time}
						</span>
					</div>
					{users.length > 0? 
						(<p className = {s.to}>Пользователю: {users}</p>)
					: null}
					<div className = {this.message_style()}>
						{this.props.message}
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state)
{
  return { user: state.user?.currentUser }
}

export default connect(mapStateToProps)(Message);
