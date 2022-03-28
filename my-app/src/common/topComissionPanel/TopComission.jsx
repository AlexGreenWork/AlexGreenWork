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
					position:"absolute",
				width:"90%",
				top:"100px",
				right:0,
				height:"calc(100% - 170px)",
					overflowY: "scroll",
				backgroundColor:"white"
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
