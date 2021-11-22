import React from 'react';
import { withRouter } from 'react-router-dom'

export default withRouter(({ history }) => {
    return (
        <div>
            <button onClick={() => history.goBack()}>BACK</button>
        </div>
    )
});