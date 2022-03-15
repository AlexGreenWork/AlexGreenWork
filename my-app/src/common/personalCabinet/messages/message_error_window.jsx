import React from "react"
import { Modal, Typography, Button } from 'antd';
const { Text } = Typography;

class Window extends React.Component
{
	/**
     * @param {any} props
     */
	constructor(props)
	{
		super(props);
		this.state = {show: true}
		this.closeModal = this.closeModal.bind(this);
	}

	closeModal()
	{
		if(this.props?.onClose && typeof this.props.onClose === 'function')
		{
			this.props.onClose();
		}

		this.setState({show: false});
	}

	render()
	{
		return (
					<>
						<Modal title={<Text style={{fontSize: "17px", fontWeight: "bold"}}>{this.props.title}</Text>}
								visible={this.state.show}
								onOk={this.closeModal}
								width="800px"
								footer = {[
								   <Button type="primary" key="back" danger onClick={this.closeModal}>
										Закрыть окно
									</Button>
								]}
						>
							<div>{this.props.message}</div>
						</Modal>
					</>
		)
	}
};

export default Window;
