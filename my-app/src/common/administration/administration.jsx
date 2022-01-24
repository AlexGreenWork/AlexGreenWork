import React from 'react';
import { API_URL } from '../../config';
import s from './administration.module.css'

class Administration extends React.Component
{
	constructor(props)
	{
		super(props);
	}

	render()
	{
        return <div className={s.container} >
			<table>
				<tr>
					<td>
						<img className={s.img} src = {`${API_URL}files/presentation/1.jpg`}/>
					</td>
					<td>
						<img className={s.img} src = {`${API_URL}files/presentation/2.jpg`}/>
					</td>
					<td>
						<img className={s.img} src = {`${API_URL}files/presentation/3.jpg`}/>
					</td>
				</tr>
			</table>
			</div>
	}
};

export default Administration;
