const mysql = require("mysql2/promise");
const config = require("./../config/default.json");
const crypto = require("crypto")

class Message
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

	static async create_response(messages)
	{
		let result = {messages: [],
						users: {}};

		if(messages[0].length)
		{
			for(const lf of messages[0])
			{
				result.messages.push(
					{
						messageId: lf.messageId,
						from: lf.sendler_tabnum,
						message: lf.message,
						time: lf.time,
						is_read: lf.is_read
					});
			}
		}

		return result;
	}

	static async pull_messages(req, res, message_query)
	{
        if (!('lastId' in req.body)
            || !req.body.lastId
        ||!('addressee' in req.body)
            || !req.body.addressee)
		{
			Message.error(res, 'Неверно указаны параметры');
			return;
        }

		let result = [];

		let connection = null;

		try
		{
			const current_user_info = req.current_user_info.tabelNum;

			connection = await Message.connection_to_database();

			const messages = await connection.query(message_query, [current_user_info, req.body.addressee,
																	req.body.lastId]);

			result = await Message.create_response(messages);

		}
		catch(e)
		{
			console.log(e)
		}
		finally
		{
			if(connection) connection.end();
		}

		res.status(200).send(result);
	}

	async pull_new_messages(req, res)
	{
		let message_query = `SELECT
									m.message,
									m.time,
									m.id AS messageId,
									m.addressee,
									m.is_read,
									m.sendler AS sendler_tabnum
								FROM
									messages AS m
								INNER JOIN offersworker AS sendler ON sendler.tabelNum = ?
								INNER JOIN offersworker AS addressee ON addressee.tabelNum = ?
								WHERE
									(
											(m.sendler = sendler.tabelNum AND m.addressee = addressee.tabelNum)
										OR
											(m.sendler = addressee.tabelNum AND m.addressee = sendler.tabelNum)
									)
								AND m.deleted <> 1
								AND m.id > ?
								ORDER BY m.time
								LIMIT 50`;

		Message.pull_messages(req, res, message_query);
	}

	async pull_old_messages(req, res)
	{
		let message_query = `SELECT
									m.message,
									m.time,
									m.id AS messageId,
									m.addressee,
									m.is_read,
									m.sendler AS sendler_tabnum
								FROM
									messages AS m
								INNER JOIN offersworker AS sendler ON sendler.tabelNum = ?
								INNER JOIN offersworker AS addressee ON addressee.tabelNum = ?
								WHERE
									(
											(m.sendler = sendler.tabelNum AND m.addressee = addressee.tabelNum)
										OR
											(m.sendler = addressee.tabelNum AND m.addressee = sendler.tabelNum)
									)
								AND m.deleted <> 1
								AND m.id < ?
								ORDER BY m.time
								LIMIT 50`;

		Message.pull_messages(req, res, message_query);
	}

	
	async send_message(req, res)
	{
        if (!('addressee' in req.body)
            || !req.body.addressee)
		{
			Message.error(res, 'Неверно указаны параметры');
			return;
        }

		let message = null;

        if (('message' in req.body)
            && req.body.message)
		{
			message = req.body.message;
        }

		let connection = null;

		try
		{
			const current_user_info = req.current_user_info.tabelNum;

			const query = `INSERT INTO messages VALUES(null, ?, ?, ?, 0, 0, NOW())`;

			connection = await Message.connection_to_database();
			await connection.query(query, [current_user_info, req.body.addressee, message]);
		}
		catch(e)
		{
			console.log(e)
		}
		finally
		{
			if(connection) connection.end();
		}

		res.status(200).send();

	}

	async delete_addressee(req, res)
	{
        if (!('addressee' in req.body)
            || !req.body.addressee)
		{
			Message.error(res, 'Неверно указаны параметры');
			return;
        }

		let connection = null;

		try
		{
			const current_user_info = req.current_user_info.tabelNum;

			const query = `UPDATE
								messages AS m
							INNER JOIN offersworker AS sender ON sender.tabelNum = ?
							INNER JOIN offersworker AS addressee ON addressee.tabelNum = ?
							SET
								deleted = 1
							WHERE
								(
									(
										m.sendler = sender.tabelNum 
											AND m.addressee = addressee.tabelNum
									)
									OR (
										m.sendler = addressee.tabelNum 
											AND m.addressee = sender.tabelNum
									)
								)`;

			connection = await Message.connection_to_database();
			await connection.query(query, [current_user_info, req.body.addressee]);
		}
		catch(e)
		{
			console.log(e)
		}
		finally
		{
			if(connection) connection.end();
		}

		res.status(200).send();
	}

	async get_addressee_info(req, res)
	{
        if (!('addressee' in req.body)
            || !req.body.addressee)
		{
			Message.error(res, 'Неверно указаны параметры');
			return;
        }

		let result = {users: {}};

		let connection = null;

		try
		{
			const current_user_info = req.current_user_info.tabelNum;
			const user_query = `SELECT
										CONCAT(
												sendler.surname, " ",
												SUBSTR(sendler.name ,1,1), ". ",
												SUBSTR(sendler.middlename, 1, 1), "."
											) AS sendler_name,
										CONCAT(
													sendler.surname, " ",
													sendler.name, " ",
													sendler.middlename
												) AS fullName,
										sendler.avatar AS sendler_avatar,
										sendler.tabelNum AS sendler_tabnum
									FROM
										 offersworker AS sendler
									WHERE
										sendler.tabelNum = ? OR sendler.tabelNum = ?`;

			connection = await Message.connection_to_database();

			const user = await connection.query(user_query, [current_user_info, req.body.addressee]);

			if(user[0].length)
			{
				for(const lf of user[0])
				{
					result.users[lf.sendler_tabnum] = {
						sendler: lf.sendler_name,
						sendlerFullName: lf.fullName,
						src: lf.sendler_avatar? lf.sendler_avatar : lf.sendler_tabnum + ".jpg",
						avatarFolder: lf.sendler_avatar? "avatar" : "photos"
					}
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

	async pull_all_messages(req, res)
	{
        if (!('addressee' in req.body)
            || !req.body.addressee)
		{
			Message.error(res, 'Неверно указаны параметры');
			return;
        }

		let result = [];

		let connection = null;

		try
		{
			const current_user_info = req.current_user_info.tabelNum;

			const message_query = `SELECT
											m.message,
											m.time,
											m.id AS messageId,
											m.addressee,
											m.is_read,
											m.sendler AS sendler_tabnum
										FROM
											messages AS m
										INNER JOIN offersworker AS sendler ON sendler.tabelNum = ?
										INNER JOIN offersworker AS addressee ON addressee.tabelNum = ?
										WHERE
											(
													(m.sendler = sendler.tabelNum AND m.addressee = addressee.tabelNum)
												OR
													(m.sendler = addressee.tabelNum AND m.addressee = sendler.tabelNum)
											)
										AND m.deleted <> 1
										ORDER BY m.time
										LIMIT 50`;

			connection = await Message.connection_to_database();

			const messages = await connection.query(message_query, [req.body.addressee, current_user_info]);

			result = await Message.create_response(messages);

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

	async set_message_status_read(req, res)
	{
        if (!('messageId' in req.body)
            || !req.body.messageId)
		{
			Message.error(res, 'Неверно указаны параметры');
			return;
        }

        if (typeof req.body.messageId != 'object')
		{
			Message.error(res, 'Неверно указаны параметры должен быть массив');
			return;
        }

		let connection = null;

		try
		{
			connection = await Message.connection_to_database();

			const current_user_info = req.current_user_info.tabelNum;

			const update_query = `UPDATE messages
									SET is_read = 1
									WHERE messages.addressee = ?
									AND messages.id IN (?)
									AND messages.is_read <> 1`;

			await connection.query(update_query, [current_user_info, req.body.messageId]);
		}
		catch(e)
		{
			console.log(e)
		}
		finally
		{
			if(connection) connection.end();
		}

		res.status(200).send();
	}

	async get_unread_messages_count(req, res)
	{
		let result = {};

		let connection = null;

		try
		{
			connection = await Message.connection_to_database();

			const current_user_info = req.current_user_info.tabelNum;

			const update_query = `SELECT
									 COUNT(m.id) AS c,
									 m.sendler AS s
									FROM messages AS m
									WHERE m.addressee = ?
									AND m.is_read <> 1
									AND m.deleted <> 1
									GROUP BY m.sendler
									ORDER BY m.sendler`;


			const dbresult = await connection.query(update_query, [current_user_info]);
			if(dbresult[0].length)
			{
				for(const val of dbresult[0])
				{
					result[val.s] = val.c
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

		res.status(200).send(result);
	}

	async pull_all_message_addresse(req, res)
	{
		let result = [];

		let connection = null;

		try
		{
			const current_user_info = req.current_user_info.tabelNum;

			const addressee_query = `SELECT
											o.tabelNum,
											CONCAT(
													o.surname, " ",
													o.name, " ",
													o.middlename
												) AS addressee,
											o.avatar
										FROM
											offersworker AS o
										INNER JOIN (
											(
												SELECT
													m.addressee AS sendler,
													m.time
												FROM
													messages AS m
												WHERE m.sendler = ?
												AND m.deleted <> 1
											)
											UNION
											(
												SELECT
													m.sendler AS sendler,
													m.time
												FROM messages AS m
												WHERE m.addressee = ?
												AND m.deleted <> 1
											)
										) AS m
										WHERE o.tabelNum = m.sendler
										GROUP BY m.sendler
										ORDER BY m.time`;

			connection = await Message.connection_to_database();

			const addressee = await connection.query(addressee_query, [current_user_info, current_user_info]);

			if(addressee[0].length)
			{
				for(const lf of addressee[0])
				{
					result.push({
						user: lf.tabelNum,
						addressee: lf.addressee,
						src: lf.avatar? lf.avatar : lf.tabelNum + ".jpg",
						avatarFolder: lf.avatar? "avatar" : "photos"
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

module.exports = new Message();
