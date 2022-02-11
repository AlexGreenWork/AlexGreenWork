import React from 'react';
import s from './news.module.css'

class News extends React.Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
        return <div className={s.container} style={{gridRow: "1 / 6", gridColumn: "1/6", display: "flex"}}>
				<iframe className={s.framePortal} src="http://integrity.belaz.minsk.by/portal/ideology/board/news.php"></iframe>
			</div>
	}
};

export default News;
