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
							ow.email AS email
						FROM offers AS o
						INNER JOIN offersworker AS ow
							ON ow.tabelNum = o.tabelNum
						WHERE o.Id = ?`;

		const result = await connection.query(query, [offer_id]);

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

		const connection = await Offers.connection_to_database();

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

	async last_offers(req, res)
	{
		const current_user_group = req.current_user_info.adminOptions;
		if(current_user_group !== 'admin'
			&& current_user_group !== 'wg')
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

		const connection = await Offers.connection_to_database();

		const db_result = await connection.query(`SELECT
													o.id,
													o.date,
													o.status,
													ka.fiofull
												FROM
													offers AS o
												INNER JOIN kadry_all AS ka ON ka.tabnum = o.tabelNum
												WHERE
													YEAR(o.date) = ? AND MONTH(o.date) >= ?`,
										[begin.getFullYear(), begin.getMonth() + 1]);

		const result = [];

		if(db_result[0].length)
		{
			for(const v of db_result[0])
			{
				result.push(
					{
						offer_id: v.id,
						offer_date: v.date,
						offer_status: v.status,
						offer_sendler: v.fiofull
					});
			}
		}
		res.send(result);
	}
}

module.exports = new Offers();
