import React from "react"
import { Modal, Typography, Button } from 'antd';
import Cart from "../../personalCabinet/card"
import State from "./user_stats"
import style from "./user_card.module.css"
const { Text } = Typography;

class UserCard extends React.Component
{
	/**
     * @param {any} props
     */
	constructor(props)
	{
		super(props);
		this.state = {show: false}
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	showModal()
	{
		this.setState({show: true})
	}

	closeModal()
	{
		this.setState({show: false});
	}

	render()
	{
		const title = this.props.title;
		const info = this.props.info;

		return (
					<>
						<Text className={style.link}
								onMouseEnter={(e) => {e.target.innerText = "Открыть карточку пользователя"}}
								onMouseOut={(e) => {e.target.innerText = title}} 
								onClick={this.showModal}
						>
							{title}
						</Text>
						<Modal title={<Text style={{fontSize: "17px", fontWeight: "bold"}}>Карточка пользователя</Text>}
								visible={this.state.show}
								onOk={this.closeModal}
								onCancel={this.closeModal}
								width="800px"
								footer = {[
								   <Button type="primary" key="back" danger onClick={this.closeModal}>
										Закрыть карточку
									</Button>
								]}
						>
							<Cart info = {info}/>
							<State last_offer_date = {this.props.last_offer_date} info = {info}/>
						</Modal>
					</>
		)
	}
};

export default UserCard;
