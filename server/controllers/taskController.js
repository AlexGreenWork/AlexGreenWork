const mysql = require("mysql2/promise");
const config = require("./../config/default.json");

class Tasks
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

	static check(field, req)
	{
		if(field in req.body && req.body[field])
			return true;

		return false;
	}

	static check_all(req)
	{
		if(Tasks.check('beginMark', req) && Tasks.check('endMark', req) && Tasks.check('respTabnum', req))
			return true;

		return false;
	}

	async search(req, res)
	{
		if(!Tasks.check_all(req))
		{
			res.status(400);
			res.send();
		}

		const beginMark = req.body.beginMark;
		const endMark = req.body.endMark;
		const tabnum = req.body.respTabnum;

		const beginTimespan = new Date(beginMark);
		const endTimespan = new Date(endMark);

		const results = [];
		let connection = null;

		try
		{
			connection = await Tasks.connection_to_database();

			const db_result = await connection.query(`SELECT
															DISTINCT outer_tbl.offer_id,
															offers.dateComission AS commission,
															offers.nameOffer
														FROM
														(
															(
																SELECT
																	*
																FROM
																	offersresponsible
															)
															UNION 
															(
																SELECT
																	*
																FROM offersresponsible_rg
															)
														) outer_tbl,offers
														WHERE 
															offers.Id = outer_tbl.offer_id
															AND outer_tbl.responsible_tabnum = ?
															AND offers.dateComission BETWEEN ? AND ?
															AND outer_tbl.deleted <> 1`, [tabnum,
																							beginTimespan.toISOString(),
																							endTimespan.toISOString()]);
			console.log(db_result[0]);
			for(let result of db_result[0])
			{
				results.push({offer: result['offer_id'],
								header: result['nameOffer'],
								time: new Date(result['commission'])
				});
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

		res.json(results);
	}
}

module.exports = new Tasks();
