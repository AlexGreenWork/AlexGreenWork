import React, { useEffect, useState } from "react";
import s from "./tasks.module.css"
import 'antd/dist/antd.css';
import { Calendar, Badge } from 'antd';
import {post} from "axios"
import { connect } from "react-redux";
import {API_URL} from "../../../config.js"

const moment = require('moment')

class Tasks extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			tasks: [],
			year_task_count: [],
			moment: moment()
		}

		const ANTD_CALENDAR_CELLS = 42;
		this.shift = ANTD_CALENDAR_CELLS;

		this.dateCellRender = this.dateCellRender.bind(this);
		this.monthCellRender = this.monthCellRender.bind(this);
		this.month = this.month.bind(this);
		this.year = this.year.bind(this);
		this.on_change = this.on_change.bind(this);

		this.month(this.state.moment)
		this.year(this.state.moment)
	}

	componentDidUpdate(props)
	{
		if(this.props != props)
		{
			this.month(this.state.moment)
		}
	}

	year(moment)
	{
		if(this.props?.tabnum)
		{
			post(`${API_URL}api/task/year`,
				{
					year: moment.year(),
					respTabnum: this.props.tabnum
				}).
				then((res) => {
					this.setState({year_task_count: res.data})
				})
		}
	}

	month(moment)
	{
		if(this.props?.tabnum)
		{
			const range = this.range_from_moment(moment);
			post(`${API_URL}api/task/range`,
				{
					beginMark: range.begin,
					endMark: range.end,
					respTabnum: this.props.tabnum
				}).
				then((res) => {
						this.setState({tasks: res.data, moment: moment})
				})
		}
	}

	get_calendar_moment(current_moment)
	{
		const begin = new Date(current_moment.year(), current_moment.month(), 1);
		begin.setDate(begin.getDate() - begin.getDay())

		return moment(begin);
	}

	shift_moment(current_moment, item)
	{
		const shift_day = current_moment.date() + item;

		return moment(new Date(current_moment.year(), current_moment.month(), shift_day));
	}

	range_from_moment(moment)
	{
		const begin = this.get_calendar_moment(moment);
		const end = this.shift_moment(begin, this.shift);

		return {begin: begin.format("YYYY-MM-DD"),
				end: end.format("YYYY-MM-DD")}
	}

	get_task_type(category)
	{
		switch(category)
		{
			case '1':
				return 'success'
			case '2':
				return 'warning'
			case '3':
				return 'error'
		}
	}

	get_tasks_list(time)
	{
        let task_ = [];
		for(let task of this.state.tasks)
		{
			const taskMoment = moment(task.time);
			if(time.format("YYYY-MM-DD") === taskMoment.format("YYYY-MM-DD"))
			{
                task_.push(
                    { type: `${this.get_task_type(task.category)}`, content: `В ${taskMoment.format("HH:mm")} ${task.header}` },
				)
			}
		}

        return task_ || [];
    }

	on_change(newMoment)
	{
		if(this.state.moment.month() !== newMoment.month())
		{
			this.month(newMoment);
		}
	}

    dateCellRender(value)
	{
        const listData = this.get_tasks_list(value);
        return (
            <ul className={s.events}>
                {listData.map(item => (
					<li key={item.content}>
						<Badge status={item.type} text={item.content} />
					</li>
                ))}
            </ul>
        );
    }

    getMonthData(value)
	{
		for(let tasks of this.state.year_task_count)
		{
			if (value.month() + 1 === tasks.month)
			{
				return tasks.count;
			}
		}
    }

    monthCellRender(value)
	{
        const num = this.getMonthData(value);
        return num ? (
            <div className={s.notes_month}>
                <section><p style = {{color: "Green"}}>Запланированных задач: {num}</p></section>
            </div>
        ) : null;
    }

	render()
	{
		return (
			<div className={s.sendOfferContainer}>
				<Calendar onChange = {this.on_change}
							dateCellRender = {this.dateCellRender}
							monthCellRender = {this.monthCellRender}/>
			</div>
		)
	}
}

const redux_state_to_task_props = (state) => ({
	tabnum: state.user.currentUser.tabelNum
})

export default connect(redux_state_to_task_props)(Tasks);
