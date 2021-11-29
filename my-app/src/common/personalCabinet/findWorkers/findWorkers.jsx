import style from "./findWorkers.module.css"
import Complete from "./complete"
import List from "./list"
import {React, useState} from "react";

const FindWorkers = (props) => {
	const [category, set_category] = useState('');
	const [search, set_search] = useState('');
	
	return (
				<div className={style.sendOfferContainer}>
					<div className={style.sendOfferInnerContainer}>
						<div className={style.sendOfferSearchBar}>
							<Complete
									onSelectHeader = {(category) => {
										set_category(category);
									}}
									onSearchHeader = {(value) => {
										set_search(value);
									}}
							/>

						</div>
						<div className={style.sendOfferList}>
							<List category = {category} search = {search}/>
						</div>
					</div>
				</div>

	)
};
export default FindWorkers;
