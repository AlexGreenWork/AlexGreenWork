import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto/300.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import VideoLayer from "./common/videoLayer/videoLayer";
import {Provider} from "react-redux";
import {store} from "./reducers/index";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
        {<VideoLayer/>},
    </React.StrictMode>,
    document.getElementById('root')
);


reportWebVitals();
