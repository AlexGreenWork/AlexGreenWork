import React, {useState} from "react";
import s from "./findWorkers.module.css"
import 'antd/dist/antd.css';
import {Input, AutoComplete} from 'antd';

const Complete = () => {
    const [options, setOptions] = useState([]);

    const handleSearch = (value) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (value) => {
        console.log('onSelect', value);
    };

    return (<AutoComplete
            dropdownMatchSelectWidth={400}
            style={{
                width: 300,
            }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
        >
            <Input.Search size="large" placeholder="Введите фамилию" enterButton/>
        </AutoComplete>);
};

function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

const searchResult = (query) => new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
        const category = `${query}${idx}`;
        return {
            value: category, label: (<div
                    style={{
                        display: 'flex', justifyContent: 'space-between',
                    }}
                >
            <span>
              Found {query} on{' '}
                <a
                    href={`http://localhost:3000/personalCabinet/findWorkers=${query}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                {category}
              </a>
            </span>
                    <span>{getRandomInt(200, 100)} результатов </span>
                </div>),
        };
    });


const FindWorkers = () => {


    return (<div className={s.sendOfferContainer}>
            <Complete/>

        </div>)
};
export default FindWorkers;