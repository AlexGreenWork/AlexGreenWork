import React from "react";
import {Button, FormControl} from '@mui/material'
import Field from "./text_field";

class MessageInputForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {input: ""}

		this.onInput = this.onInput.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onInput(e)
	{
		this.setState({input: e.target.value});
	}

	onSubmit()
	{
		if(this.props?.onSubmit && typeof this.props.onSubmit === 'function')
		{
			this.props.onSubmit(this.state.input);
			this.setState({input: ""});
		}
	}

	render()
	{
		return (
				<FormControl variant="standard"
								style = {{width:"100%"}}>
					<div>
						<div style = {{display: "grid", gridTemplateColumns: "auto 15%"}}>
							<Field
								id = "message_user_input"
								label="Сообщение"
								color="success"
								onChange={this.onInput}
								value = {this.state.input}
								focused 
								autoFocus
								multiline
								maxRows={2}	
							/>
							<Button style = {{height: "55px", marginLeft: "5px"}}
									variant = "contained"
									color = "success"
									onClick = {this.onSubmit}
							>
								Отправить
							</Button>
						</div>
					</div>
				</FormControl>
		)
	}
}

export default MessageInputForm;
