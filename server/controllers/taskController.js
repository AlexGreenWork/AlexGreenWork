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
		if(Tasks.check('beginMark', req)
			&& Tasks.check('endMark', req)
				&& ('user' in req)
					&& ('id' in req.user)
			)
		{
			return true;
		}

		return false;
	}

	static async get_current_user_tabnum(connection, user_id)
	{
		connection = await Tasks.connection_to_database();

		const user_tabnum_db_result = await connection.query(`SELECT
														tabelNum AS tabnum
													FROM
														offersworker
													WHERE id = ?`, [user_id] )

		return await user_tabnum_db_result[0][0].tabnum;
	}

	async range(req, res)
	{
		if(!Tasks.check_all(req))
		{
			res.status(400);
			res.send('Error');
		}

		const beginMark = req.body.beginMark;
		const endMark = req.body.endMark;

		const beginTimespan = new Date(beginMark);
		const endTimespan = new Date(endMark);

		const results = [];
		let connection = null;

		try
		{
			connection = await Tasks.connection_to_database();

			const tabnum = await Tasks.get_current_user_tabnum(connection, req.user.id);
			if(!tabnum)
			{
				res.status(400);
				res.send('Error');
			}

			const db_result = await connection.query(`SELECT
															DISTINCT outer_tbl.offer_id,
															offers.dateComission AS commission,
															offers.category AS category,
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
			for(let result of db_result[0])
			{
				results.push({offer: result['offer_id'],
								header: result['nameOffer'],
								category: result['category'],
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

	async year(req, res)
	{
		if(!Tasks.check('year', req) 
				&& !('user' in req)
					&& !('id' in req.user)
			)
		{
			res.status(400);
			res.send();
		}

		const year = req.body.year;

		const results = [];
		let connection = null;

		try
		{
			connection = await Tasks.connection_to_database();

			const tabnum = await Tasks.get_current_user_tabnum(connection, req.user.id);
			if(!tabnum)
			{
				res.status(400);
				res.send('Error');
			}

			const db_result = await connection.query(`SELECT
															COUNT(offers.dateComission) AS count,
															MONTH(offers.dateComission) AS month
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
															AND YEAR(offers.dateComission) = ?
															AND outer_tbl.deleted <> 1
														GROUP BY MONTH(offers.dateComission)`, [tabnum,
																								year]);
			for(let result of db_result[0])
			{
				results.push({month: result['month'], 
								count: result['count']});
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
