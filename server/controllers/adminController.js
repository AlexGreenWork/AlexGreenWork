const mysql = require("mysql2/promise");
const config = require("./../config/default.json");
const offer_controller = require("./offersController");

class Admin
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

	static async error(res, msg)
	{
		res.status(400);
		res.send(msg);
	}

	static request_user_is_admin(user)
	{
		const current_user_group = user.adminOptions;
		return (current_user_group === 'admin' || current_user_group === 'wg')
	}

	async offers_last_offers(req, res)
	{
		if(!Admin.request_user_is_admin(req.current_user_info))
		{
			Admin.error(res, 'Нет прав на данную операцию');
			return;
		}

        if (!('begin' in req.body)
            || !req.body.begin)
		{
			Admin.error(res, 'Неверно указаны параметры');
			return;
        }

		const begin = new Date(req.body.begin);

		const result = { last_offers: []};

		let connection = null;

		try
		{
			connection = await Admin.connection_to_database();

			let last_offers_query = `SELECT
											o.id,
											s.info
										FROM
											offers AS o
										INNER JOIN state AS s ON s.status = o.status
										WHERE
											YEAR(o.date) = ? AND MONTH(o.date) >= ?`;

			let last_offers_plasholders = [begin.getFullYear(), begin.getMonth() + 1];

			const last_offers = await connection.query(last_offers_query,
											last_offers_plasholders);

			if(last_offers[0].length)
			{
				for(const lf of last_offers[0])
				{
					result.last_offers.push(
						{
							offer_status: lf.info,
							... await offer_controller.offer_info_by_offer_id(lf.id, connection),
						});
				}
			}

		}
		catch(e)
		{
			console.log(e)
		}
		finally
		{
			if(connection) connection.end();
		}
		res.send(result);
	}

	async offers_state(req, res)
	{
		if(!Admin.request_user_is_admin(req.current_user_info))
		{
			Admin.error(res, 'Нет прав на данную операцию');
			return;
		}

		const result = {state: {},
					info: [],
					last_offers: []};

		let connection = null;

		try
		{
			connection = await Admin.connection_to_database();
			const val = await offer_controller.offer_info_by_offer_id(281, connection);

			const states = await connection.query(`SELECT
														count(id) AS c,
														s.info
													FROM
														offers AS o
													INNER JOIN state AS s ON s.status = o.status
													GROUP BY s.info`);

			if(states[0].length)
			{
				for(const s of states[0])
				{
					result.state[s.info] = s.c;
				}
			}

			const info = await connection.query(`SELECT
													count(*) AS c,
													YEAR(o.date) AS y,
													MONTH(o.date) AS m
												FROM
													offers AS o
												GROUP BY YEAR(o.date), MONTH(o.date)`);

			if(info[0].length)
			{
				for(const i of info[0])
				{
					result.info.push(i);
				}
			}

		}
		catch(e)
		{
			console.log(e)
		}
		finally
		{
			if(connection) connection.end();
		}
		res.send(result);
	}
}

module.exports = new Admin();
