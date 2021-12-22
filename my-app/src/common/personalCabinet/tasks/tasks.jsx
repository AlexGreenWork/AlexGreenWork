import React from "react";
import s from "./tasks.module.css"
import 'antd/dist/antd.css';
import { Calendar, Badge } from 'antd';
import { connect } from "react-redux";
import {API_URL} from "../../../config.js"
import server from "../../../actions/server"

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

	/**
		* @param {moment.Moment} moment
		* @returns {void}
	**/
	year(moment)
	{
		server.send_post_request(`${API_URL}api/task/year`,
			{
				year: moment.year(),
			}).
			then((res) => {
				this.setState({year_task_count: res.data})
			})
	}

	/**
		* @param {moment.Moment} moment
		* @returns {void}
	**/
	month(moment)
	{
		const range = this.range_from_moment(moment);
		server.send_post_request(`${API_URL}api/task/range`,
			{
				beginMark: range.begin,
				endMark: range.end,
			}).
			then((res) => {
					this.setState({tasks: res.data, moment: moment})
			})
	}

	/**
		* @param {moment.Moment} current_moment
		* @returns {moment.Moment}
	**/
	get_calendar_moment(current_moment)
	{
		const begin = current_moment.clone().startOf('month');
		return begin.subtract(begin.day(), 'days');
	}

	/**
		* @param {moment.Moment} current_moment
		* @param {Number} item
		* @returns {moment.Moment}
	**/
	shift_moment(current_moment, item)
	{
		return current_moment.clone().add(item, 'days');
	}

	/**
		* @typedef {Object} DateRange
		* @property {String} begin
		* @property {String} end
		*
		* @param {moment.Moment} moment
		* @returns {DateRange}
	**/
	range_from_moment(moment)
	{
		const begin = this.get_calendar_moment(moment);
		const end = this.shift_moment(begin, this.shift);

		return {begin: begin.format("YYYY-MM-DD"),
				end: end.format("YYYY-MM-DD")}
	}

	/**
		* @param {String} category
		* @returns {import("antd/lib/_util/colors").PresetStatusColorType}
	**/
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

	/**
		* @typedef {Object} Content
		* @property {String} type
		* @property {String} content
		*
		* @param {moment.Moment} time
		* @returns {Array.<Content>}
	**/
	get_tasks_list(time)
	{
        let task_ = [];
		for(let task of this.state.tasks)
		{
			const taskMoment = moment(task.time);
			if(time.format("YYYY-MM-DD") === taskMoment.format("YYYY-MM-DD"))
			{
                task_.push(
                    { type: `${this.get_task_type(task.category)}`,
						content: `В ${taskMoment.format("HH:mm")} ${task.header}` },
				)
			}
		}

        return task_ || [];
    }

	/**
		* @param {moment.Moment} newMoment
		* @returns {void}
	**/
	on_change(newMoment)
	{
		if(this.state.moment.month() !== newMoment.month())
		{
			this.month(newMoment);
		}
	}

	/**
		* @param {moment.Moment} value
		* @returns {React.ReactFragment}
	**/
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

	/**
		* @param {moment.Moment} value
		* @returns {Number}
	**/
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

	/**
		* @param {moment.Moment} value
		* @returns {React.ReactFragment}
	**/
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

export default connect()(Tasks);
