import style from "./findWorkers.module.css"
import Complete from "./complete"
import List from "./list"
import React from "react";

const FindWorkers = (props) => {
	return (
				<div className={style.sendOfferContainer}>
					<div className={style.sendOfferInnerContainer}>
						<div className={style.sendOfferSearchBar}>
							<Complete/>
						</div>
						<div className={style.sendOfferList}>
							<List/>
						</div>
					</div>
				</div>

	)
};
export default FindWorkers;
