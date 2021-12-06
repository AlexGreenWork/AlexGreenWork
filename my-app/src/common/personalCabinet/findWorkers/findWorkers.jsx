import style from "./findWorkers.module.css"
import Complete from "./complete"
import List from "./list"
import Card from "./card";
import {searchtabnum} from "../../../actions/search";
import {React, useEffect, useState} from "react";
import {useDispatch, useSelector, shallowEqual} from "react-redux";

const FindWorkers = () => {
	const [searchCategory, set_search_category] = useState('');
	const [searchCategoryValue, set_search_category_value] = useState('');
	const [searchItemValue, set_search_item_value] = useState('');
	const [isList, show_list] = useState(false);
	const [isCard, show_card] = useState(false);
	
	const dispatcher = useDispatch();

	return (
				<div className={style.sendOfferContainer}>
					<div className={style.sendOfferInnerContainer}>
						<div className={style.sendOfferSearchBar}>
							<Complete
									onSelectItem = {(value) => {
										set_search_item_value(value);
										show_list(false);
										show_card(true);
										dispatcher(searchtabnum(`${value}`));
									}}
									onSelectHeader = {(category, value) => {
										set_search_category(category);
										set_search_category_value(value);
										show_list(true);
										show_card(false);
									}}
							/>
							{isCard ?
								<div>
									<Card info = {searchItemValue} />
								</div>
								: null
							}
						</div>
						{isList ?
							<div className={style.sendOfferList}>
								<List category = {searchCategory} search = {searchCategoryValue}/>
							</div>
							: null
						}
					</div>
				</div>

	)
};
export default FindWorkers;
