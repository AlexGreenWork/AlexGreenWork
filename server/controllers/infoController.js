const mysql = require("mysql2/promise");
const config = require("./../config/default.json");
const search_model_full = require("../models/search_full.js")

class Info
{
	static query_full_user_info_by_tabnum()
	{
		const query = `SELECT ka.TABNUM AS tabnum,
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
									d2.name AS division,
									CONCAT(d.fullname," (", d.name,")") AS department,
									cl.PROFNAME AS prof,
									ka.BRIGFULLN AS brig,
									ue.email AS email
						FROM offersendler.kadry_ok AS ka
						LEFT JOIN offersendler.clpost AS cl ON cl.PROFCODE = ka.PROFCODE
						LEFT JOIN offersendler.department AS d ON d.id = ka.CEHCODE
						LEFT JOIN offersendler.division AS d2 ON d2.department = d.id AND d2.id = ka.DISTRCODE
						LEFT JOIN offersendler.users_emails AS ue ON ue.tabnum = ka.TABNUM
						WHERE ka.TABNUM = ?`;

		return query;
	}

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

	static async search_by_tabnum(tabnum)
	{
		let connection = await Info.connection_to_database();
		let db_results = await Info.query(connection, Info.query_full_user_info_by_tabnum(), [tabnum]);
		await connection.end();
		return db_results[0][0];
	}

	async get_full_info(req, res)
	{
	    let result = [];
		
		if(req['body'])
		{
			if (req.body['search'] && req.body.search)
			{
				const request = req.body.search;
				const db_result = await Info.search_by_tabnum(request);

				if (!db_result) return res.json([]);

				result = new search_model_full({
					name: db_result.fiofull,
					tabnum: db_result.tabnum,
					prof: db_result.prof,
					department: db_result.department,
					division: db_result.division,
					brigada: db_result.brig,
					email: db_result.email
				})

			}
		}

		res.json(result);
	}
}

module.exports = new Info();
