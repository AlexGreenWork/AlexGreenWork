import React from "react";
import s from "./tasks.module.css"
import 'antd/dist/antd.css';
import { Calendar, Badge } from 'antd';
import {API_URL} from "../../../config.js"
import server from "../../../actions/server"

const moment = require('moment')

class Details extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return <div className = {s.taskList}>
					<div className = {s.innerTaskList} >
						{this.props.task}
					</div>
				</div>;
	}
}

class Tasks extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			tasks: [],
			year_task_count: [],
			moment: null,
			mode: "month",
			details: null
		}

		const ANTD_CALENDAR_CELLS = 42;
		this.shift = ANTD_CALENDAR_CELLS;

		this.dateCellRender = this.dateCellRender.bind(this);
		this.monthCellRender = this.monthCellRender.bind(this);
		this.month = this.month.bind(this);
		this.year = this.year.bind(this);
		this.on_change = this.on_change.bind(this);
		this.on_select = this.on_select.bind(this);
		this.mode_change = this.mode_change.bind(this);

		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
	}

	componentDidMount()
	{
		this.setState({moment: moment()})
	}

	componentDidUpdate(last_props, last_state)
	{
		if(this.state.moment && last_state.moment != this.state.moment)
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
					this.setState({tasks: res.data})
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
	 * @param {string} header
	**/
	get_header_name(header)
	{
		const trim_header = header.trim();
		const head = trim_header[0].toUpperCase();
		const tail = trim_header.substring(1);
		return head + tail;
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
						content: `Предложение № ${task.offer}: В ${taskMoment.format("HH:mm")} "${this.get_header_name(task.header)}"` },
				)
			}
		}

        return task_ || [];
    }

	/**
		* @param {moment.Moment} moment
		* @returns {void}
	**/
	on_change(moment)
	{
		if(this.state.mode === "year")
		{
			this.setState({mode: "month"})
		}
	}

	mode_change(newMoment, mode)
	{
		if(mode === "year") this.year(newMoment)
		this.setState({mode: mode})
	}

	on_select(moment)
	{
		if(this.state.moment.month() !== moment.month())
		{
			this.setState({moment: moment});
		}

		const tasks = this.dateCellRender(moment);
		this.setState({details: tasks});
	}

	/**
		* @param {moment.Moment} value
		* @returns {React.ReactFragment}
	**/
    dateCellRender(value)
	{
        const listData = this.get_tasks_list(value);
		if(listData.length > 0)
		{
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
		else
		{
			return null;
		}
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
				{this.state.details ? <Details task = {this.state.details}/> : null}
				<Calendar mode = {this.state.mode}
						onChange = {this.on_change}
						onSelect = {this.on_select}
						onPanelChange = {this.mode_change}
						dateCellRender = {this.dateCellRender}
						monthCellRender = {this.monthCellRender}/>
			</div>
		)
	}
}

export default Tasks;
