import React from "react";
import {Button, FormControl, styled} from '@mui/material'
import TextField from '@mui/material/TextField';

const Field = styled(TextField)
({
	'& .MuiInputBase-input':
	{
		color: "White",
	},
});

class MessageInputForm extends React.Component
{
	constructor(props)
	{
		super(props);
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
								focused 
								autoFocus
								multiline
								maxRows={2}	
							/>
							<Button style = {{height: "55px", marginLeft: "5px"}}
									variant = "contained"
									color = "success"
									onClick = {this.props.onSubmit}
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
