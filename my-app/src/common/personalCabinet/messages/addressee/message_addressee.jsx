import { Avatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import {Button} from '@mui/material'
import React from "react";
import h from "../style/address.module.css"
import { API_URL } from "../../../../config";
import MessageStatusIcon from "../message_status_icon";

class MessagesAddressee extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {openConfirm: false}

		this.onConfirm = this.onConfirm.bind(this);
		this.onConfirmOpen = this.onConfirmOpen.bind(this);
		this.onConfirmClose = this.onConfirmClose.bind(this);
	}

	onConfirm()
	{
		if(this.props?.onDeleteAddressee
			&& typeof this.props?.onDeleteAddressee === 'function')
		{
			this.props.onDeleteAddressee(this.props.id);
		}

		this.onConfirmClose();
	}

	onConfirmOpen()
	{
		this.setState({openConfirm: true});
	}

	onConfirmClose()
	{
		this.setState({openConfirm: false});
	}

	render()
	{
		const message_sendler = this.props.addressee;
		const avatar = `${API_URL}files/${this.props.avatarFolder}/${this.props.src}`

		return (
			<div className = {h.header}>
				<div className = {h.name} onClick = {() => {this.props.onClick(this.props.id)}} >
					{this.props?.unreads?
						(
							<MessageStatusIcon count = {this.props.unreads}/>
						)
					: null}
					<Avatar className = {h.ava} alt={this.props.id} src = {avatar} />
					<div className = {h.messagePreview}>
						<div className = {h.user}>
							<h3>
								<span className = {h.from}>
									{message_sendler}
								</span>
							</h3>
						</div>
					</div>
				</div>
				<Button
						color="error"
						variant="contained"
						onClick = {this.onConfirmOpen}
				>
					Удалить
				</Button>
				<Dialog
						open={this.state.openConfirm}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
				  >
						<DialogTitle id="alert-dialog-title">
							Подтвердите действие
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Удалить пользователя <span style = {{ color: "red", fontWeight: "bold"}}>{message_sendler}</span> из списка? Все сообщения будут сохранены
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button color = "success" variant = "contained" onClick={this.onConfirmClose}>
								Отмена
							</Button>
							<Button color="error" variant="contained" onClick={this.onConfirm} autoFocus>
								Удалить
							</Button>
						</DialogActions>
					</Dialog>
			</div>
		)
	}
}

export default MessagesAddressee;
