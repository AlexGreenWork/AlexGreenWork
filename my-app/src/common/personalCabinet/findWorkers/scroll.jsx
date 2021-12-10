import React, { useEffect, useState } from 'react';
import style from "./scroll.module.css"
import arrow from "../../../Pics/icon/up-arrow.png"

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
			top: 0,
			behavior: 'smooth'
		});
	};

	render()
	{
		return (
					<div style = {{ backgroundImage: `url(${arrow})`,
									display: this.state.visible ? "block" : "none"
								}}
							className = {style.scroll}
							onClick={this.scrollToTop}>
					</div>
		);
	};
}

export default ScrollButton;
