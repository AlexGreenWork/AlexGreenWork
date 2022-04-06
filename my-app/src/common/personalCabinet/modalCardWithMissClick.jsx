import React, { useEffect, useState, useRef} from "react";
import Cart from "./card.jsx"
import { Modal, Typography} from 'antd';
const { Text } = Typography;

function useOutsideClick(ref, callback, attached = true)
{
	useEffect(() => {
		if(!attached) return;

		const worker = (e) => {
			if(!ref.current) return;
			if(!ref.current.contains(e.target))
			{
				if(callback && typeof callback === 'function')
				{
					callback();
				}
			}
		}

		document.addEventListener('click', worker);

		return () => {
			document.removeEventListener('click', worker);
		}
	}, [ref, callback, attached]);
}

const ModalCardWithMissClick = (props) => {

	const [open, set_open] = useState(false);
	const modalRef = useRef(null);

	const {Button} = props;

	function change()
	{
		set_open(!open);
	}

	useOutsideClick(modalRef, change, open);

	return (
			<div>
				<div ref = {modalRef}>
					{React.cloneElement(Button, {onClick: change})}
					<Modal title={<Text style={{fontSize: "17px", fontWeight: "bold"}}>Карточка пользователя</Text>}
							visible={open}
							closable = {false}
							width="800px"
							footer = {[]}
					>
						{props.children}
					</Modal>
				</div>
			</div>
	);
}

export default ModalCardWithMissClick;
