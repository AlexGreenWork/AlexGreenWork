import React from "react"
import Card from "./card"

import style from "./row.module.css"

class Row extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = {tabnum: [], show: false}
	}

	render()
	{
		return (<>
					<tr	className = {style.searchRow}
							onClick={
										(value) => this.setState(
											{
												tabnum: this.props.tabnum,
												show: !this.state.show
											}
										)
									}>
						<td>
							{this.props.tabnum}
						</td>
						<td>
							{this.props.name}
						</td>
						<td>
							{this.props.department}
						</td>
						<td>
							{this.props.division}
						</td>
					</tr>
			{this.state.show ?
					<tr>
						<td colSpan = "4">
							<Card info = {this.state.tabnum}/>
						</td>
					</tr>
				: null}
				</>
		);
	}
}

export default Row
