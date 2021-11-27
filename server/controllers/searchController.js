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
					"department"
				]
			],
			["string",
				[
					"fiofull"
				]
			]
		]);
	}
	static db_alias_by_type(type)
	{
		return new Array(Search.db_alias().get(type));
	}
	static category_name()
	{
		return new Map([
			["tabnum", "1"],
			["fiofull", "2"],
			["department", "3"]
		]);
	}
	static category_name_by_db_alias(alias)
	{
		 return Search.category_name().get(alias);
	}

	static query_users_by_alias(alias)
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
				 WHERE ka.${alias} LIKE ?
				 	AND deleted <> 1`;
		console.log(query);
		return query;
	}

	static async find_value_by_alias(connection, value, alias)
	{
		return await connection.query( Search.query_users_by_alias(alias), ['%' + value + '%']);
	}

	static get_value_type(value)
	{
		if(isNaN(value)) return Search.db_alias_by_type("string");
		return Search.db_alias_by_type("number");
	}

	static async find(connection, value)
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

	async search(req, res)
	{
		let results = [];

		const request = req.body.search;

	    let connection = await Search.connection_to_database();
		const db_results = await Search.find(connection, request);

		for(const [key, value] of db_results)
		{
			let search_object = {value: request, category: Search.category_name_by_db_alias(key), count: value.length, users: []};

			const sliced = value.slice(0, 10);
			for(const info of sliced)
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

		await connection.end();

		res.json(results);
	}
}
module.exports = new Search();
