import style from "./findWorkers.module.css"
import Complete from "./complete"
import List from "./list"
import Card from "./card";
import {searchuser} from "../../../actions/search";
import {React, useState} from "react";
import {useDispatch} from "react-redux";

const FindWorkers = () => {
	const [searchCategory, set_search_category] = useState('');
	const [searchCategoryValue, set_search_category_value] = useState('');
	const [searchItemValue, set_search_item_value] = useState('');
	const [isList, show_list] = useState(false);
	
	const dispatcher = useDispatch();

	return (
				<div className={style.sendOfferContainer}>
					<div className={style.sendOfferInnerContainer}>
						<div className={style.sendOfferSearchBar}>
							<Complete
									onSelectItem = {(value) => {
										set_search_item_value(value.tabnum);
										show_list(false);
										dispatcher(searchuser(value.tabnum, value.name, value.department, value.division));
									}}
									onSelectHeader = {(category, value) => {
										set_search_category(category);
										set_search_category_value(value);
										show_list(true);
									}}
							/>
							{!isList ? 
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
