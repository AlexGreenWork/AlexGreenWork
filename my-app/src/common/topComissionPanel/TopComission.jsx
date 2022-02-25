import React from "react";
import States from "./adminStates"
import LastOffers from "./adminLastOffers"

class TopComission extends React.Component
{
	constructor(props)
	{
		super(props)
	}

	render()
	{

		return(<div style={{
					gridColumn: "2/6",
					gridRow: "2/6",
					overflowY: "scroll"
				}}> 
					<div style={{
								display: "flex",
								flexDirection:"column",
								height: "fit-content",
				}}>
						<States/>
						<LastOffers/>
					</div>
				</div>
		);
	}
}

export default TopComission
