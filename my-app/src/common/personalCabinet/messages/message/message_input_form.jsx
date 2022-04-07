import React from "react";
import {Button, FormControl} from '@mui/material'
import Field from "./text_field";

class MessageInputForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.inputRef = React.createRef();

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit()
	{
		if(this.props?.onSubmit && typeof this.props.onSubmit === 'function')
		{
			const element = this.inputRef?.current;
			if(element?.value)
			{
				this.props.onSubmit(element.value);
				element.value = "";
			}
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
								label="Сообщение"
								color="success"
								inputRef = {this.inputRef}
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
