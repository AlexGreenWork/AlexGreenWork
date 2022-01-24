import React from "react";
import {Budget} from "./budget";
import LatestOrders from "./latest-orders";

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
								overflowY:"scroll"
				}}>
						<div style={{display:"flex"}}> 
							 <Budget style={{width:"33.3%"}} name="Всего предложений" amount="65"/>
							 <Budget style={{width:"33.3%"}} name="За год" amount="65" />
							 <Budget style={{width:"33.3%"}} name="Предложений за месяц" amount="7"/>
						</div>
						 <div style={{display:"flex"}}> 
							 <Budget style={{width:"33.3%", backgroundColor:"#ffffab"}} name="В обработке" amount="64"/>
							 <Budget style={{width:"33.3%", backgroundColor:"#b0ffb0"}} name="Обработано" amount="1" />
							 <Budget style={{width:"33.3%", backgroundColor:"#ffbaba"}} name="Отклонено" amount="0"/>
						</div>
						<LatestOrders style={{marginTop:"3px"}}/>
					</div>
				</div>

		);
	}
}

export default TopComission
