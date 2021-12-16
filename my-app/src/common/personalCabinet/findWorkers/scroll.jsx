import React from 'react';
import { UpCircleOutlined } from "@ant-design/icons"
import style from "./scroll.module.css"

class ScrollButton extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
						visible: false,
						parent: null
		}

		document.addEventListener("scroll", (e) => {
			if (e.target.scrollTop > 300)
			{
				this.setState(
								{
									visible: true,
									parent: e.target
								});
			}
			else
			{
				this.setState(
								{
									visible: false,
									parent: null
								});
			}
		}, true);

		this.scrollToTop = this.scrollToTop.bind(this);
	}

	scrollToTop()
	{
		this.state.parent.scrollTo({
			top: this.state.parent.offsetTop,
			behavior: 'smooth'
		});
	};

	render()
	{
		return (
					<div style = {{ display: this.state.visible ? "flex" : "none" }}
							className = {style.scroll}
							onClick={this.scrollToTop}>
						<UpCircleOutlined className = {style.scrollButton}
						/>
					</div>
		);
	};
}

export default ScrollButton;
