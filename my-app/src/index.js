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

        <Provider store={store}>
            <App/>
            {<VideoLayer/>},
        </Provider>,


    document.getElementById('root')
);


reportWebVitals();
