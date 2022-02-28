
const mysql = require("mysql2/promise");
const config = require("./../config/default.json");
const offer_controller = require("./offersController");

class User
{
	async connection_to_database()
	{
		const connection_property = {
			host: config.database.host,
			user: config.database.user,
			password: config.database.password,
			database: config.database.database
		}

		return mysql.createPool(connection_property);
	}

	async get_info_by_id(id, connection = null)
	{
		if(!id) return null;

		try
		{
			if(!connection)
			{
				connection = await this.connection_to_database();
			}
			
			const result = await connection.query("SELECT * FROM offersworker WHERE Id = ?", id);
			return result[0][0];
		}
		catch(e)
		{
			console.log(e);
		}
		finally
		{
			if(connection) connection.end();
		}

	}

	async get_info_by_tabnum(tabnum, connection)
	{
		if(!tabnum) return null;

		try
		{
			if(!connection)
			{
				connection = await this.connection_to_database();
			}
			
			const result = await connection.query("SELECT * FROM offersworker WHERE tabelNum = ?", tabnum);
			return result[0][0];
		}
		catch(e)
		{
			console.log(e);
		}
		finally
		{
			if(connection) connection.end();
		}
	}
}

module.exports = new User();
