const mysql = require("mysql2/promise");
const config = require("./../config/default.json");
const moment = require("moment");
const user_controller = require("./userController");

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
				result.users[lf.tabelNum] = {
					sendler: lf.sendler,
					src: lf.avatar? lf.avatar : lf.tabelNum + ".jpg",
					avatarFolder: lf.avatar? "avatar" : "photos"
				}

				let to = [];

				let connection = null;

				try
				{
					const query = `SELECT
										CONCAT(
												o.surname, " ",
												SUBSTR(o.name ,1,1), ". ",
												SUBSTR(o.middlename, 1, 1), "."
											) AS sendler,
										o.avatar,
										o.tabelNum
									FROM
										messages_addressee AS m
									INNER JOIN offersworker AS o ON o.tabelNum = m.addressee
									WHERE m.message_id = ?`;


					connection = await Message.connection_to_database();

					const addressees = await connection.query(query, [lf.messageId]);
					for(const addressee of addressees[0])
					{
						result.users[addressee.tabelNum] = {
										sendler: addressee.sendler,
										src: addressee.avatar? addressee.avatar : addressee.tabelNum + ".jpg",
										avatarFolder: addressee.avatar? "avatar" : "photos"
									}

						to.push(addressee.tabelNum);
					}
				}
				catch(e)
				{
					console.log(e);
				}
				finally
				{
					if(connection) connection.end();
				}

				result.messages.push(
					{
						messageId: lf.messageId,
						from: lf.tabelNum,
						to: to,
						message: lf.message,
						time: lf.time
					});
			}
		}

		return result;
	}

	async last_message(req, res)
	{
		let result = [];

        if (!('lastId' in req.body)
            || !req.body.lastId)
		{
			Message.error(res, 'Неверно указаны параметры');
			return;
        }

		let connection = null;

		try
		{
			let message_query = `SELECT
									o.id,
									CONCAT(
											o.surname, " ",
											SUBSTR(o.name ,1,1), ". ",
											SUBSTR(o.middlename, 1, 1), "."
										) AS sendler,
									o.avatar,
									o.tabelNum,
									m.message,
									m.time,
									m.id AS messageId
								FROM
									messages AS m
								INNER JOIN offersworker AS o ON o.tabelNum = m.sendler
								WHERE m.id > ?`;

			connection = await Message.connection_to_database();

			const messages = await connection.query(message_query, [req.body.lastId]);

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

	async new_message(req, res)
	{
		let message = null;
		let to = null;

        if (('message' in req.body)
            && req.body.message)
		{
			message = req.body.message;
        }

        if (('to' in req.body)
            && req.body.to)
		{
			to = req.body.to;
        }

		let connection = null;

		try
		{
			const current_user_info = req.current_user_info.tabelNum;
			const query = `INSERT INTO messages VALUES(null, ?, ?, NOW())`;

			connection = await Message.connection_to_database();
			const last_insert_message = await connection.query(query, [current_user_info, message]);
			if(to)
			{
				const to_query = `INSERT INTO messages_addressee VALUES(?, ?)`;
				const message_id = last_insert_message[0].insertId;
				
				for(const user of to)
				{
					await connection.query(to_query, [message_id, user]);
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

		res.status(200).send();

	}

	async all_messages(req, res)
	{
		let result = [];

		let connection = null;

		try
		{
			const message_query = `SELECT
									o.id,
									CONCAT(
											o.surname, " ",
											SUBSTR(o.name ,1,1), ". ",
											SUBSTR(o.middlename, 1, 1), "."
										) AS sendler,
									o.avatar,
									o.tabelNum,
									m.message,
									m.time,
									m.id AS messageId
								FROM
									messages AS m
								INNER JOIN offersworker AS o ON o.tabelNum = m.sendler`;

			connection = await Message.connection_to_database();

			const messages = await connection.query(message_query);

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

}

module.exports = new Message();
