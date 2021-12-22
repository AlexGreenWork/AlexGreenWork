const mysql = require("mysql2/promise");
const config = require("./../config/default.json");
const search_model = require("../models/search.js")
const search_user_model = require("../models/search_user_list")

class Search
{
	static async connection_to_database()
	{
		const connection_property = {
			host: config.database.host,
			user: config.database.user,
			password: config.database.password,
			database: config.database.database
		}

		return mysql.createPool(connection_property);
	}

	static db_alias()
	{
		return new Map([
			["number",
				[
					"tabnum",
					"department_code"
				]
			],
			["string",
				[
					"fiofull",
					"department"
				]
			]
		]);
	}

	static db_alias_by_type(type)
	{
		return new Array(Search.db_alias().get(type));
	}

	static category_name_by_alias()
	{
		return new Map([
			["tabnum", "1"],
			["fiofull", "2"],
			["department_code", "3"],
			["department", "4"]
		]);
	}

	static category_name_by_db_alias(alias)
	{
		 return Search.category_name_by_alias().get(alias);
	}

	static category_alias_by_name()
	{
		return new Map([
			["1", "tabnum"],
			["2", "fiofull"],
			["3", "department_code"],
			["4", "department"]
		]);
	}

	static category_db_alias_by_name(name)
	{
		 return Search.category_alias_by_name().get(name);
	}

	static query_users_info_by_alias(alias)
	{
		const query = `SELECT outer_tbl.tabnum,
								outer_tbl.fiofull,
								outer_tbl.department,
								outer_tbl.division,
								outer_tbl.department_code
						FROM (
							SELECT
								ka.TABNUM AS tabnum,
								CONCAT(
									CONCAT(
										SUBSTR(ka.NAME1, 1, 1),
										LCASE(SUBSTR(ka.NAME1, 2)),
										" "
									),
									CONCAT(
										SUBSTR(ka.NAME2, 1, 1),
										LCASE(SUBSTR(ka.NAME2, 2)),
										" "
									),
									CONCAT(
										SUBSTR(ka.NAME3, 1, 1),
										LCASE(SUBSTR(ka.NAME3, 2))
									)
								) AS fiofull,
								ka.CEHNAME AS department,
								ka.CEHCODE AS department_code,
								ka.DISTRFULLN AS division
							FROM
								offersendler.kadry_ok AS ka
						) AS outer_tbl
						WHERE outer_tbl.${alias} LIKE ?`

		return query;
	}


	static get_value_type(value)
	{
		if(isNaN(value)) return Search.db_alias_by_type("string");
		return Search.db_alias_by_type("number");
	}

	static async query(connection, query, bind_params)
	{
		try
		{
			return await connection.query(query, bind_params);
		}catch(e)
		{
			console.log(e);
		}
		return [];
	}

	static async find_value_by_alias(connection, value, alias, like = true)
	{
		let query_param = value;
		if(like) query_param = `%${value}%`;

		return await Search.query(connection, Search.query_users_info_by_alias(alias), [query_param]);
	}

	static async find_all(connection, value)
	{
	    const alias = Search.get_value_type(value);
	    let result = new Map();
	    for (const obj of alias)
	    {
			for (const field of obj)
			{
			    let db_result = await Search.find_value_by_alias(connection, value, field);
				result.set(field, db_result[0]);
			}
		}
		return result;
	}

	static async find_all_category_by_alias(connection, value, alias)
	{
	    let result = new Map();
		const key = Search.category_db_alias_by_name(alias);
		let db_result = await Search.find_value_by_alias(connection, value, key);
		result.set(alias, db_result[0]);
		return result;
	}

	async search(req, res)
	{
		let results = [];

		if(req['body'])
		{
			if (req.body['search'] && req.body.search)
			{
				const request = req.body.search;

				let connection = await Search.connection_to_database();
				const db_results = await Search.find_all(connection, request);
				await connection.end();

				for (const [key, value] of db_results)
				{
					let search_object = {
						value: request,
						category: Search.category_name_by_db_alias(key),
						count: value.length,
						users: []
					};

					const sliced = value.slice(0, 10);
					for (const info of sliced)
					{
						search_object.users.push(new search_user_model({
							name: info.fiofull,
							tabnum: info.tabnum,
							department: info.department,
							division: info.division
						}));
					}

					results.push(new search_model(search_object));
				}
			}
		}

		res.json(results);
	}

	async get_all_by_category(req, res)
	{
		let results = [];

		if(req['body'])
		{
			if (req.body['search']
				&& req.body['category']
				&& req.body.search
				&& req.body.category)
			{
				const request = req.body.search;
				const category = req.body.category;

				let connection = await Search.connection_to_database();
				const db_results = await Search.find_all_category_by_alias(connection, request, category);
				await connection.end();

				for (const [key, value] of db_results)
				{
					let search_object = {value: request, category: category, count: value.length, users: []};

					for (const info of value) {
						search_object.users.push(new search_user_model({
							name: info.fiofull,
							tabnum: info.tabnum,
							department: info.department,
							division: info.division
						}));
					}

					results.push(new search_model(search_object));
				}
			}
		}
		res.json(results);

	}
}
module.exports = new Search();
