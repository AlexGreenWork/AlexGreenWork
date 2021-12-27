const config = require("../config/default.json");
const mysql = require("mysql2/promise");
const moment = require("moment");

class Responsible
{
	constructor()
	{
		const mysqlConfig = {
			host: config.database.host,
			user: config.database.user,
			password: config.database.password,
			database: config.database.database,
		}

		this.pool = mysql.createPool(mysqlConfig);
	}

	async register_responsible_for_offer(tb, offerId, responsible_tabnum, date_open)
	{
		const sqlRegisterResponsible = `INSERT INTO ${tb}
											(offer_id, responsible_tabnum, open)
										VALUES ('${offerId}', '${responsible_tabnum}', '${date_open}')`;
		await this.pool.query(sqlRegisterResponsible);
	}

	async delete_responsible_for_offer(tb, offerId, responsible_tabnum)
	{
		const sqlResponsible = `UPDATE ${tb}
								SET deleted = 1
								WHERE offer_id = ${offerId}
									AND responsible_tabnum = ${responsible_tabnum}
									AND deleted <> 1`

		await this.pool.query(sqlResponsible);
	}

	async update_responsible(tb, idOffers, respTabnum)
	{
		if(!respTabnum)
		{
			const sqlOffer = `SELECT ${tbl_alias}, Id FROM offers WHERE Id = '${idOffers}'`;
			const changedOffers = await this.pool.query(sqlOffer);
			const changedResponsibleTabnum = changedOffers[0][0][tbl_alias];
			const changedOffesId = changedOffers[0][0].Id;
			
			if(changedOffesId && changedResponsibleTabnum)
			{
				this.delete_responsible_for_offer(tb, changedOffesId, changedResponsibleTabnum);
			}
		}
		else
		{
			const sqlAvalibleResponsibles = `SELECT COUNT(*) AS available
											FROM ${tb}
											WHERE offer_id = ${idOffers}
												AND responsible_tabnum = '${respTabnum}'
												AND deleted <> 1`

			const avaliableResponsibles = await this.pool.query(sqlAvalibleResponsibles);
			if(!avaliableResponsibles[0][0].available)
			{
				this.register_responsible_for_offer(tb, idOffers, respTabnum, moment().format('YYYY-MM-DD'));
			}
		}

		await this.pool.query(`UPDATE offers
							SET ${tbl_alias} = '${respTabnum}'
						WHERE Id = '${idOffers}'`)
	}
}

module.exports = new Responsible();
