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
			moment: moment()
		}

		this.dateCellRender = this.dateCellRender.bind(this);
		this.load = this.load.bind(this);
		this.on_change = this.on_change.bind(this);

		this.load(this.state.moment)
	}

	componentDidUpdate(props)
	{
		if(this.props != props)
		{
			this.load(this.state.moment)
		}
	}

	load(moment)
	{
		if(this.props?.tabnum)
		{
			const range = this.range_from_moment(moment);
			post(`${API_URL}api/task/search`,
				{
					beginMark: range.begin,
					endMark: range.end,
					respTabnum: this.props.tabnum
				}).
				then((res) => this.setState({tasks: res.data, moment: moment}))
		}
	}

	range_from_moment(moment)
	{
		const ANTD_CALENDAR_CELLS = 42;
		const currentYear = moment.format("YYYY");
		const currentMonth = moment.format("MM");
		const begin = new Date(currentYear, currentMonth - 1, 0);
		begin.setDate(begin.getDate() - begin.getDay())
		const end = new Date(begin.getFullYear(),
								begin.getMonth(),
								begin.getDate() + ANTD_CALENDAR_CELLS)

		const beginMark = begin.toDateString();
		const endMark = end.toDateString();

		return {begin: beginMark,
				end: endMark}
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
                    { type: 'warning', content: `В ${taskMoment.format("HH:mm")} ${task.header}` },
				)
			}
		}

        return task_ || [];
    }

	on_change(newMoment)
	{
		if(this.state.moment.month() !== newMoment.month())
		{
			this.load(newMoment);
		}
	}

    dateCellRender(value)
	{
        const listData = this.get_tasks_list(value);
        return (
            <ul className="events">
                {listData.map(item => (
					<Badge status={item.type} text={item.content} />
                ))}
            </ul>
        );
    }

    getMonthData(value)
	{
        if (value.month() === 8)
		{
            return 1394;
        }
    }

    monthCellRender(value)
	{
        const num = this.getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }

	render()
	{
		return (
			<div className={s.sendOfferContainer}>
				<Calendar onChange = {this.on_change} dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
			</div>
		)
	}
}

const redux_state_to_task_props = (state) => ({
	tabnum: state.user.currentUser.tabelNum
})

export default connect(redux_state_to_task_props)(Tasks);
