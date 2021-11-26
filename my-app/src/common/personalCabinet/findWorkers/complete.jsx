import React, {useState} from "react";
import {AutoComplete, Input} from "antd";
const axios = require("axios");

function category_server()
{
    return new Map([
        ["1", "Табельный номер"],
        ["2", "ФИО"],
        ["3", "Код цеха"]
    ]);
}

function category_server_converter(category)
{
    return category_server().get(category);
}

function Header(search, item_category, item_count)
{
    const category = ` в ${category_server_converter(item_category)}`;

    return {
        value: category, label: (<div
            style={{
                display: 'flex', justifyContent: 'space-between',
            }}
        >
			<span>
			  Found `{search}` on {' '}
                <a
                    href={`http://localhost:3000/personalCabinet/findWorkers=${item_category}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
				{category}
			  </a>
			</span>
            <span>{item_count} результатов </span>
        </div>),
    };
}

function Item(value, division, department)
{
    return {
        label:(<div style={{
            display: 'flex',
            justifyContent: 'space-between',
        }}
        >
			<span>
				{value}
				Отдел {department}
                Цех {division}
            </span>
        </div>),
    }
}

function Items(values)
{
    let items = [];
    for(const value of values)
    {
        items.push(Item(value.name, value.department, value.division))
    }
    return items;
}

function CreateOptions(search, response)
{
    let result = [];
    for(const item of response.data)
    {
        result.push(Header(search, item.category, item.count));
        result = result.concat(Items(item.users));
    }
    return result;
}

const Complete = () => {
    const [ options, set_options ] = useState([]);
    const [ search, set_search ] = useState([]);

    React.useEffect(() => {
        axios.post("http://localhost:5000/api/user/search", {value: search}).then((res) => {
            set_options(CreateOptions(search, res));
        })
    }, [search]);

    const select = (value) => {
        console.log('onSelect', value);
    };

    return (<AutoComplete
        dropdownMatchSelectWidth={500}
        style={{
            width: '100%',
        }}
        options={options}
        onSelect={select}
        onSearch={set_search}
    >
        <Input.Search size="large" style={{
            fontSize: '14px',
            textAlign: 'center'
        }
        } enterButton/>
    </AutoComplete>);
};

export default Complete