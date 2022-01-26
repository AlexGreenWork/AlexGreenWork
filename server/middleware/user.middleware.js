const mysql = require("mysql2/promise");
const config = require("./../config/default.json");

module.exports = async (req, res, next) => {
	if (req.method === 'OPTIONS')
	{
		return next()
	}

	const connection_property = {
		host: config.database.host,
		user: config.database.user,
		password: config.database.password,
		database: config.database.database
	}

	const connection = mysql.createPool(connection_property);

	const result = await connection.query("SELECT * FROM offersworker WHERE Id = ?", req.user.id);

	req.current_user_info = result[0][0];

	next();
}
