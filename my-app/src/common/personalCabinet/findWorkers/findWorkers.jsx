import style from "./findWorkers.module.css"
import Complete from "./complete"
import List from "./list"
import {searchtabnum} from "../../../actions/search";
import {React, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const FindWorkers = (props) => {
	const [category, set_category] = useState('');
	const [search, set_search] = useState('');
	const [open, set_open] = useState(false);

	const value = useSelector(state => state.searchUserTabnum);
	const dispatcher = useDispatch();

	return (
				<div className={style.sendOfferContainer}>
					<div className={style.sendOfferInnerContainer}>
						<div className={style.sendOfferSearchBar}>
							<Complete
									onSelectItem = {(value) => {
										set_open(false);
										dispatcher(searchtabnum(`${value}`));
									}}
									onSelectHeader = {(category) => {
										set_category(category);
										set_open(true);
									}}
									onSearchHeader = {(value) => {
										set_search(value);
										set_open(true);
									}}
							/>

						</div>
						{open ?
							<div className={style.sendOfferList}>
								<List category = {category} search = {search}/>
							</div>
							: null
						}
					</div>
				</div>

	)
};
export default FindWorkers;
