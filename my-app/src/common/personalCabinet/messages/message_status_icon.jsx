import React from "react";
import server from "../../../actions/server";
import { API_URL } from "../../../config";
import s from "../personalCabinet.module.css"
import h from "./style/address.module.css"

class MessageStatusIcon extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return (
				  <div className={h.countNoBrowser}>
					{this.props.count}
				  </div>
		)
	}
}

export default MessageStatusIcon;
