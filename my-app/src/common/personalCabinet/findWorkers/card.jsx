import React, {useEffect, useState} from "react"
import style from "./card.module.css"
import {useDispatch} from "react-redux";
import {selectcard} from "../../../actions/search";

import {API_URL} from "../../../config.js"
const {post} = require("axios");

const Cart = (props) =>
{
	const [info, set_info] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
	    if(props?.info
			&& (
					info === null
					|| info.tabnum !== props.info
				) 
			)
	    {
			post(`${API_URL}api/user/info`, {search: props.info}).then((res) => {
				set_info(res.data);
			})
		}
	});

	if(info === null) return (<></>);

	return (
				<div className = {style.card} onClick = {() => dispatch(selectcard(`${info?.tabnum}`))}>
					<table>
						<tbody>
							<tr>
								<td rowSpan = "7">
									<img width = "150" height = "200" alt = "Нет фото" src={`${API_URL}files/photos/${info?.tabnum}.jpg`}/>
								</td>
							</tr>
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
							{info?.email ?
								<tr>
									<td>
										Электронная Почта
									</td>
									<td colSpan = "2">
										<a href = {`mailto:${info?.email}`}>{info?.email}</a>
									</td>
								</tr>
								: null
							}
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
