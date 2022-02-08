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
        return <div className={s.container} style={{gridRow: "1 / 6", gridColumn: "1/6", display: "flex"}}>
			<iframe className={s.framePortal} src="http://integrity.belaz.minsk.by"></iframe>
			</div>
	}
};

export default Administration;
