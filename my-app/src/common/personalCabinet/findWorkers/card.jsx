import React, {useEffect, useState} from "react"
import style from "./card.module.css"
import {useDispatch} from "react-redux";
import {selectcard} from "../../../actions/search";
const {post} = require("axios");

const Cart = (props) =>
{
	const [info, set_info] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
	    if(info === null && props?.info)
	    {
			post("http://localhost:5000/api/user/info", {search: props.info}).then((res) => {
				set_info(res.data);
			})
		}
	});

	return (
				<div className = {style.card} onClick = {() => dispatch(selectcard(`${info?.tabnum}`))}>
					<table>
						<tbody>
							<tr>
								<td>
									Табельный номер
								</td>
								<td>
									{info?.tabnum}
								</td>

							</tr>
							<tr>
								<td>
									ФИО
								</td>
								<td colSpan = "2">
									{info?.name}
								</td>
							</tr>
							<tr>
								<td>
									Должность
								</td>
								<td colSpan = "2">
									{info?.prof}
								</td>
							</tr>
							<tr>
								<td>
									Цех
								</td>
								<td colSpan = "2">
									{info?.department}
								</td>
							</tr>
							<tr>
								<td>
									Отдел
								</td>
								<td colSpan = "2">
									{info?.division}
								</td>
							</tr>
							{/*<tr>*/}
							{/*	<td>*/}
							{/*		<button onClick={() => {dispatch(searchtabnum(`${info.tabnum}` ))}}*/}
							{/*				className = {style.card_button}>Добавить в задачу</button>*/}
							{/*	</td>*/}
							{/*</tr>*/}
						</tbody>
					</table>
				</div>
		);
}

export default Cart
