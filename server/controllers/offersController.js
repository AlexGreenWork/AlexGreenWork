const mysql = require("mysql2/promise");
const config = require("./../config/default.json");

class Offers
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

	static async offer_info_by_id(connection, offer_id)
	{
        const query = `SELECT 
							o.*,
							ow.name AS nameSendler,
							ow.surname AS surnameSendler,
							ow.middlename AS middlenameSendler,
							ow.email AS email,
							ow.phoneNumber As phone
						FROM offers AS o
						INNER JOIN offersworker AS ow
							ON ow.tabelNum = o.tabelNum
						WHERE o.Id = ?`;

		const result = await connection.query(query, [offer_id]);
console.log(result[0])
		return result[0][0];
	}
	
	async offer_info(req, res)
	{
        if (!('selectOffers' in req.body)
            || !req.body.selectOffers)
		{
			Offers.error(res, '');
			return;
        }

		let connection = null;

		try
		{
			connection = await Offers.connection_to_database();

			const idOffers = req.body.selectOffers

			const query = `SELECT
							osr.offer_id,
							ka.fiofull,
							dep.fullname,
							osr.responsible_tabnum,
							osr.mark,
							osr.open,
							osr.close,
							osr.actual,
							osr.innov,
							osr.cost,
							osr.extent,
							osr.position
						FROM
							?? AS osr
						INNER JOIN kadry_all AS ka 
							ON ka.tabnum = osr.responsible_tabnum
								AND ka.factory = 1 
						INNER JOIN department AS dep
							ON dep.id = ka.department
								AND dep.factory = ka.factory
						WHERE
							osr.offer_id = ?
						AND osr.deleted <> 1
						ORDER BY osr.position ASC`

			const sqlOfferResponsible = await connection.query(query, ["offersresponsible", idOffers])
			const sqlOfferResponsible_Rg = await connection.query(query, ["offersresponsible_rg", idOffers])

			res.send({
					... await Offers.offer_info_by_id(connection, idOffers),
				responsibles: [
					...sqlOfferResponsible[0]
				],
				responsibles_rg:
					sqlOfferResponsible_Rg[0][0]

			});
		}
		catch(e)
		{
			console.log(e)
		}
		finally
		{
			if(connection) connection.end();
		}
	}

	static request_user_is_admin(user)
	{
		const current_user_group = user.adminOptions;
		return (current_user_group === 'admin' || current_user_group === 'wg')
	}

	async offers_state(req, res)
	{
		if(!Offers.request_user_is_admin(req.current_user_info))
		{
			Offers.error(res, 'Нет прав на данную операцию');
			return;
		}

        if (!('begin' in req.body)
            || !req.body.begin)
		{
			Offers.error(res, 'Неверно указаны параметры');
			return;
        }

		const begin = new Date(req.body.begin);

		const result = {state: {},
					info: [],
					last_offers: []};

		let connection = null;

		try
		{
			connection = await Offers.connection_to_database();

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

			const last_offers = await connection.query(`SELECT
															o.id,
															o.date,
															s.info,
															ka.fiofull
														FROM
															offers AS o
														INNER JOIN kadry_all AS ka ON ka.tabnum = o.tabelNum
														INNER JOIN state AS s ON s.status = o.status
														WHERE
															YEAR(o.date) = ? AND MONTH(o.date) >= ?`,
											[begin.getFullYear(), begin.getMonth() + 1]);

			if(last_offers[0].length)
			{
				for(const lf of last_offers[0])
				{
					result.last_offers.push(
						{
							offer_id: lf.id,
							offer_date: lf.date,
							offer_status: lf.info,
							offer_sendler: lf.fiofull
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
}

module.exports = new Offers();
