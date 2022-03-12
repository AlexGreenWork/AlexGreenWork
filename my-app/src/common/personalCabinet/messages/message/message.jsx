import { Avatar } from "@mui/material";
import React from "react";
import s from "../style/message.module.css"
import {connect} from 'react-redux'
import { API_URL } from "../../../../config";
import moment from "moment";

class Message extends React.Component
{
	/**
     * @param {{ users: { [x: string]: { sendler: string; avatarFolder: string; src: string }; };
	 * from: string;
	 * time: moment.MomentInput;
	 * message: string;
	 * to: string[];
	 * onClick: (ev: MouseEvent | number) => void;
	 * id: number; 
	 * user: { tabelNum: string; }; }} props
     */
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const message_sendler = this.props.users[this.props.from].sendler;
		const from = this.props.from;
		const time = moment(this.props.time).format("DD-MM-YYYY HH:mm");
		const avatar = `${API_URL}files/${this.props.users[from].avatarFolder}/${this.props.users[from].src}`
		const message = this.props.message;

		return (
			<div className={s.header}>
					<Avatar className = {s.ava} alt="" src = {avatar} />
				<div className = {s.messagePreview}>
					<div className = {s.user}>
						<h3>
							<span className = {s.from}>
								{message_sendler}
							</span>
						</h3>
						<span className = {s.time}>
							{time}
						</span>
					</div>
					<div className = {s.message}>
						{message}
					</div>
				</div>
			</div>
		)
	}
}

/**
 * @param {{ user: { currentUser: any; }; }} state
 */
function mapStateToProps(state)
{
  return { user: state.user?.currentUser }
}

export default connect(mapStateToProps)(Message);
