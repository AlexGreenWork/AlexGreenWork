const mysql = require("mysql2/promise");
const config = require("./../config/default.json");
const search_model = require("../models/search.js")
const search_model_full = require("../models/search_full.js")
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
					{db: "ka", field: "tabnum"},
					{db: "ka", field: "department"}
				]
			],
			["string",
				[
					{db: "ka", field: "fiofull"},
					{db: "d", field: "name"}
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
			["department", "3"],
			["name", "4"]
		]);
	}

	static category_name_by_db_alias(alias)
	{
		 return Search.category_name_by_alias().get(alias);
	}

	static category_alias_by_name()
	{
		return new Map([
			["1", {db: "ka", field: "tabnum"}],
			["2", {db: "ka", field: "fiofull"}],
			["3", {db: "ka", field: "department"}],
			["4", {db: "d", field: "name"}]
		]);
	}

	static category_db_alias_by_name(name)
	{
		 return Search.category_alias_by_name().get(name);
	}

	static query_users_info_by_alias(alias)
	{
		const query = ` SELECT
					ka.fiofull AS fio,
					d.name AS department,
					d2.name AS division,
					ka.tabnum AS tabnum
				FROM kadry_all AS ka
				LEFT JOIN department AS d ON
					d.id = ka.department
				LEFT JOIN division AS d2 ON
					d2.department = ka.department
					AND d2.id = ka.division
				 WHERE ${alias.db}.${alias.field} LIKE ?
					AND ka.factory = 1
					AND d.factory = 1
					AND d2.factory = 1
				 	AND ka.deleted <> 1`;

		return query;
	}

	static query_full_user_info_by_tabnum()
	{
		const query = ` SELECT
					ka.fiofull AS fio,
					d.name AS department,
					d2.name AS division,
					ka.tabnum AS tabnum,
					fp.profname AS prof,
					ue.email AS email
				FROM kadry_all AS ka
				LEFT JOIN department AS d ON
					d.id = ka.department
				LEFT JOIN division AS d2 ON
					d2.department = ka.department
					AND d2.id = ka.division
				LEFT JOIN users_emails AS ue ON
					ue.tabnum = ka.tabnum
				LEFT JOIN clpost AS fp ON SUBSTR(fp.PROFCODE, 1, LENGTH(ka.profcode)) = ka.profcode
				WHERE ka.tabnum LIKE ?
					AND ka.factory = 1
					AND d.factory = 1
					AND d2.factory = 1
				 	AND ka.deleted <> 1`;

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
				result.set(field.field, db_result[0]);
			}
		}
		return result;
	}

	static async find_all_category_by_alias(connection, value, alias)
	{
	    let result = new Map();
		const key = Search.category_db_alias_by_name(alias);
		let db_result = await Search.find_value_by_alias(connection, value, key);
		result.set(alias.field, db_result[0]);
		return result;
	}

	async get_full_info(req, res)
	{
	    let result = [];
		
		if(req['body'])
		{
			if (req.body['search'] && req.body.search)
			{
				const request = req.body.search;
				let connection = await Search.connection_to_database();
				let db_results = await Search.query(connection, Search.query_full_user_info_by_tabnum(), [request]);
				await connection.end();
				const db_result = db_results[0][0];

				if (!db_result) return res.json([]);

				result = new search_model_full({
					name: db_result.fio,
					tabnum: db_result.tabnum,
					prof: db_result.prof,
					department: db_result.department,
					division: db_result.division,
					email: db_result.email
				})

			}
		}

		res.json(result);
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
							name: info.fio,
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
							name: info.fio,
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
