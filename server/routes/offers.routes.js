﻿const Router = require("express");
const config = require("../config/default.json");
const mysql = require("mysql2/promise");
const router = new Router();
const fs = require('fs');
const fileUpload = require("express-fileupload");
const {isDate} = require("moment");
const moment = require("moment");
const { on } = require("events");

router.use(fileUpload({}));

const urlencodedParser = Router.urlencoded({extended: false});

const mysqlConfig = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
}

const pool = mysql.createPool(mysqlConfig);

router.use((req, res, next) => {

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
})


router.get("/allOffers",
    function (request, response) {
        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);


        async function sqlSelectOffers() {
           
			let selectOffers = await pool.execute(`SELECT
														o.nameOffer,
														o.Id,
														o.date,
														o.status,
														o.tabelNum,
														ow.name AS nameSendler,
														ow.surname AS surnameSendler,
														ow.middlename AS middlenameSendler
													FROM offers AS o
													INNER JOIN offersworker AS ow
														ON ow.tabelNum = o.tabelNum`);

            response.setHeader('Content-Type', 'application/json');
		
            response.send(JSON.stringify(selectOffers[0], null, 3));

            // response.send(selectOffers[0]);
            // return selectOffers;
        }

        sqlSelectOffers();
    });


router.post("/myOffers", urlencodedParser,
    async function (request, response) {

		
		let tabelNumber = request.body.tabelNumber;
        let email = request.body.email;
        let idOffers = request.body.idOffers;
        let sqlResult = await sqlMyOffers(tabelNumber, email, idOffers)
	
        response.send(sqlResult[0])

    })

async function sqlMyOffers(tabelNumber, email, idOffers, place) {

	if(idOffers != undefined){  //условие для корректной работы Предложений для обработки
		let sqlOffersTabel = await pool.execute(`SELECT tabelNum FROM offers WHERE Id=${idOffers}`);
		//console.log(sqlOffersTabel, sqlOffersTabel[0])
		let sqlemailOffers = await pool.execute(`SELECT email FROM offersworker WHERE tabelNum=${sqlOffersTabel[0][0].tabelNum}`)
		
		let sqlMyOff = await pool.execute(`SELECT
											o.nameOffer,
											o.Id,
											o.date,
											o.status,
											o.tabelNum,
											ow.name AS nameSendler,
											ow.surname AS surnameSendler,
											ow.middlename AS middlenameSendler,
											ow.email AS email
										FROM offers AS o
										INNER JOIN offersworker AS ow
											ON ow.tabelNum = o.tabelNum
										WHERE (ow.tabelNum = ${sqlOffersTabel[0][0].tabelNum}
											AND ow.email = "${sqlemailOffers[0][0].email}")`);
										
			//console.log(sqlMyOff[0])
		return [sqlMyOff]

	}				
	
	let sqlParty = await pool.execute(`SELECT IdOffers FROM senleradditional WHERE co_author_tabNum = ${tabelNumber}`) // получаем номера предложений где участвует пользователь
	
	let sqlMyOff = await pool.execute(`SELECT
											o.nameOffer,
											o.Id,
											o.date,
											o.status,
											o.tabelNum,
											ow.name AS nameSendler,
											ow.surname AS surnameSendler,
											ow.middlename AS middlenameSendler
										FROM offers AS o
										INNER JOIN offersworker AS ow
											ON ow.tabelNum = o.tabelNum
										WHERE (ow.tabelNum = ${tabelNumber}
											AND ow.email = "${email}")`)
					
			
		let myAllOfffers = sqlMyOff[0];	// переменная в которой мы будем хранить масиив обьекстов предложений		
	for(let i=0; i<sqlParty[0].length; i++ ){
		let infoOffersCoAuthor; //переменная в которой храним информацию об авторе предложения в котором мы являемся соавтором
		
		let sqlOffersqwe = await pool.execute(`SELECT tabelNum FROM offers WHERE Id=${sqlParty[0][i].IdOffers}`);	// нашли табельный автора подавшего предложения
		
		 
		let sqlinfoOffersCoAuthor = await pool.execute(`SELECT name, surname, middlename   FROM offersworker WHERE tabelNum=${sqlOffersqwe[0][0].tabelNum}`);	// нашли фио автора подавшего предложения
	
		let newObject = {}; //обьект в котором мы храним фио, нужен из за того что названия столбцов в offersworker и в старой offers отличались
		newObject["nameSendler"] = sqlinfoOffersCoAuthor[0][0].name;
		newObject['surnameSendler'] = sqlinfoOffersCoAuthor[0][0].surname;
		newObject['middlenameSendler'] =sqlinfoOffersCoAuthor[0][0].middlename;
		newObject['coAuthor'] ="Соавтор"; //опметка соавтор
		
		let sqlOffers = await pool.execute(`SELECT nameOffer, Id, date, status, tabelNum FROM offers WHERE Id=${sqlParty[0][i].IdOffers}`);  //получаем информацию о предложении в котором текущий пользователь являеться соавтором
				
		infoOffersCoAuthor = Object.assign(sqlOffers[0][0], newObject)
		
		myAllOfffers = myAllOfffers.concat(infoOffersCoAuthor);
		
	}
/* >>>>>>> trus */

return [myAllOfffers]
}

router.post("/selectMyOffers", urlencodedParser,
    async function (request, response)
    {
        if(!('selectOffers' in request.body)
            || !request.body.selectOffers)
        {
            response.status(400);
            response.send();
        }

        let idOffers = request.body.selectOffers

        let sqlMyOffers = await pool.query(`SELECT 
												o.*,
												ow.name AS nameSendler,
												ow.surname AS surnameSendler,
												ow.middlename AS middlenameSendler,
												ow.email AS email
											FROM offers AS o
											INNER JOIN offersworker AS ow
												ON ow.tabelNum = o.tabelNum
											WHERE o.Id = ?`, [idOffers])

        const query = `SELECT
						osr.offer_id,
						ka.fiofull,
						dep.fullname,
						osr.responsible_tabnum,
						osr.mark,
						osr.open,
						osr.close,
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

        const sqlOfferResponsible = await pool.query(query, ["offersresponsible", idOffers])
        const sqlOfferResponsible_Rg = await pool.query(query, ["offersresponsible_rg", idOffers])

        response.send({
            ...sqlMyOffers[0][0],
            responsibles: [
                ...sqlOfferResponsible[0]
            ],
            responsibles_rg:
                sqlOfferResponsible_Rg[0][0]

        });

    })

router.post("/userInfo", urlencodedParser,
    async function (request, response) {

        let userTab = request.body.userTab;

        try{
            const sqlUserInfo = `SELECT
							ka.profname,
							d.fullname,
							d2.name,
							ue.email,
							o.email
						FROM kadry_all AS ka
						LEFT JOIN department AS d
							ON d.id = ka.department
						LEFT JOIN division AS d2
							ON d2.department = ka.department
								AND d2.id = ka.division
						LEFT JOIN users_emails AS ue
							ON ue.tabnum = ka.tabnum
						LEFT JOIN offersworker AS o
							ON o.tabelNum = ka.tabnum
						WHERE ka.tabnum = ${userTab}`

            const stmt = await pool.execute(sqlUserInfo);

            let reqJson = {
                department: null,
                division: null,
                position: null,
                email: null,
            }

            if(stmt[0][0])
            {
                reqJson.department = stmt[0][0].fullname;
                reqJson.division = stmt[0][0].name;
                reqJson.position = stmt[0][0].profname,
                    reqJson.email = stmt[0][0].email
            }

            response.send(reqJson);
        }
        catch(e)
        {
            console.log(e)
        }
    })


router.post("/FilesMyOffers", urlencodedParser,
    async function (request, response) {

        fs.readdir(`../server/files/offers/idOffers/`, (err, folder) => {

            if(folder.length == 0){

                fs.mkdir(`../server/files/offers/idOffers/id${request.body.idOffers}/SendlerFiles/`, { recursive: true }, err => {
                    if(err) throw err; // не удалось создать папки
                    // console.log(`Папка SendlerFiles внутри id${request.body.idOffers} создана `);

                    fs.readdir(`../server/files/offers/idOffers/id${request.body.idOffers}/SendlerFiles/`, (err, files) => {

                        response.send(files)
                    })

                })

            } else {
                let a = 0;
                for(let i = 0; i< folder.length; i++){

                    if(folder[i] == `id${request.body.idOffers}`){


                        fs.readdir(`../server/files/offers/idOffers/id${request.body.idOffers}/`, (err, folder) => {

                            if(folder[0] == "SendlerFiles"){

                                fs.readdir(`../server/files/offers/idOffers/id${request.body.idOffers}/SendlerFiles/`, (err, files) => {

                                    response.send(files)
                                })

                                i = folder.length

                            } else {

                                fs.mkdir(`../server/files/offers/idOffers/id${request.body.idOffers}/SendlerFiles/`, { recursive: true }, err => {
                                    if(err) throw err; // не удалось создать папки
                                    //console.log(`Папка SendlerFiles внутри id${request.body.idOffers} создана `);

                                    fs.readdir(`../server/files/offers/idOffers/id${request.body.idOffers}/SendlerFiles/`, (err, files) => {

                                        response.send(files)
                                    })

                                })
                                i = folder.length
                            }
                        })


                    } else {
                        a++;
                        if( a == folder.length){

                            fs.mkdir(`../server/files/offers/idOffers/id${request.body.idOffers}/SendlerFiles/`, { recursive: true }, err => {
                                if(err) throw err;
                                fs.readdir(`../server/files/offers/idOffers/id${request.body.idOffers}/SendlerFiles/`, (err, files) => {
                                    response.send(files)
                                })

                            });
                        } else {

                        }
                    }
                }
            }
        })
    })


router.post("/toStatus", urlencodedParser,
    async function (request, response) {
        let id = request.body.offerId
        let view = request.body.view
        let category = request.body.category
        let status = request.body.status
        try{
            await pool.query(`UPDATE offers SET view = ${view}, category = ${category}, status = ${status} WHERE  Id = (${id}) `);
        }catch(e){console.log(e)}
    })

router.post("/toDbDateComission", urlencodedParser,
    async function (request, response) {
        let id = request.body.offerId
        let dateComission = JSON.stringify(request.body.dateComission)
        await pool.query(`UPDATE offers SET dateComission = ${dateComission} WHERE  Id = (${id}) `);
    })
// router.post("/saveToDb", urlencodedParser,
//     async function (request, response) {
//         let id = request.body.offerId
//         let dateComission = JSON.stringify(request.body.dateComission)
//       await pool.query(`UPDATE offers SET dateComission = ${dateComission} WHERE  Id = (${id}) `);
//     })

router.get("/downloadMyFile", urlencodedParser, async function(request, response){
	console.log(request.query)
    let idOffers = request.query.idOffers;
    let fileName = request.query.fileName;
    let folderName = request.query.folder;

    fs.readdir(`../server/files/offers/idOffers/id${idOffers}/${folderName}/`, async (err, filesName) => {
       
        filesName.push('exit');

        for(let i = 0 ; i < filesName.length; i++ )
        {
            if(filesName[i] == fileName )
            {
                let file = `${__dirname}/../files/offers/idOffers/id${idOffers}/${folderName}/${fileName}`;
                response.download(file);
                break;
            }
            else
            {
                if(filesName[i] == 'exit')
                {
                    response.send("Нет файла")
                }
            }
        }
    })
})

/* router.post("/sendAdd", urlencodedParser,
    async function (request, response){

        let idOffers = request.body.selectOffers;

        let sqlSendAdd = await pool.query(`SELECT * FROM senleradditional WHERE IdOffers=${idOffers} `);

        if(sqlSendAdd[0][0] != undefined){

            let SendAddValid = sqlSendAdd[0][0].Sendlers.slice(1, sqlSendAdd[0][0].Sendlers.length-1)

            response.send(SendAddValid)
        } else{

            response.send('null')
        }
<<<<<<< HEAD
    } )

router.post("/sendAddInfo", urlencodedParser,
    async function (request, response){

        let idOffers = request.body.selectOffers;

        let sqlSendAdd = await pool.query(`SELECT * FROM senleradditional WHERE IdOffers=${idOffers} `);
//=======
} ) */

router.post("/sendAddInfo", urlencodedParser,
    async function (request, response){
        let arr =[];
        let idOffers = request.body.selectOffers;

        let sqlSendAdd = await pool.query(`SELECT * FROM senleradditional WHERE IdOffers=${idOffers} `);
		for(let i = 0; i < sqlSendAdd[0].length; i++){
			
		/* 	let coAuthorTab = sqlSendAdd[0][i].co_author_tabNum;
			let sqlCoAuthorData = await pool.query(`SELECT * FROM offersworker WHERE tabelNum=${coAuthorTab} `);
			arr[i] = sqlCoAuthorData[0][0];
 */
            let coAuthorTab = sqlSendAdd[0][i].co_author_tabNum;
			let sqlCoAuthorData = await pool.query(`SELECT * FROM offersworker WHERE tabelNum=${coAuthorTab} `);
			let newObject = {}; //обьект в котором мы храним фио, нужен из за того что названия столбцов в offersworker и в старой offers отличались
			newObject["nameSendler"] = sqlCoAuthorData[0][0].name;
			newObject['surnameSendler'] = sqlCoAuthorData[0][0].surname;
			newObject['middlenameSendler'] =sqlCoAuthorData[0][0].middlename; 
			newObject['tabelNum'] =sqlCoAuthorData[0][0].tabelNum;
			newObject['email'] =sqlCoAuthorData[0][0].email;
			newObject['phoneNumber'] =sqlCoAuthorData[0][0].phoneNumber;
			arr[i] =newObject;
		//	arr.push(sqlCoAuthorData[0][0])
		}
      
       if(sqlSendAdd[0] != undefined){
       // let SendAddValid = sqlSendAdd[0][0].Sendlers.slice(1, sqlSendAdd[0][0].Sendlers.length-1)

        response.send(arr)
    } else{
        response.send('null')
    }

    })

router.post("/toDbSaveResposibleRG", urlencodedParser,
    async function (request, response)
    {
        if((!('idOffer' in request.body)
                || !request.body.idOffer)
            || (!('respTabnum' in request.body)
                || !request.body.respTabnum))
        {
            response.status(400);
            response.send();
        }

        let idOffers = request.body.idOffer;
        let respTabnum = request.body.respTabnum;

        const sqlResponsible = `UPDATE offersresponsible_rg
								SET deleted = 1
								WHERE offer_id = ?
									AND deleted <> 1`
        await pool.query(sqlResponsible, [idOffers]);

        const sqlNewResponsible = `INSERT INTO offersresponsible_rg
										(offer_id, responsible_tabnum, open)
									VALUES (?, ?, ?)`

        pool.query(sqlNewResponsible, [idOffers, respTabnum, moment().format('YYYY-MM-DD')]);

        response.status(200);
        response.send();
    })


router.post("/toDbDeleteResponsible", urlencodedParser,
	async function (request, response)
	{
        let idOffers = request.body.idOffer;
        let respTabnum = request.body.respTabnum;

		if(!idOffers
			&& !respTabnum)
		{
			response.status(400)
			response.send();
		}

		let placeholders = [idOffers, respTabnum];

		query = `UPDATE
					offersendler.offersresponsible
				SET deleted = 1
				WHERE offer_id = ?
				AND responsible_tabnum = ?`

		pool.query(query, placeholders);

		response.status(200);

		response.send();
    })

router.post("/toDbSaveResponsible", urlencodedParser,
    async function (request, response)
	{

        let idOffers = request.body.idOffer;
        let respTabnum = request.body.respTabnum;
        let position = request.body.position;
        console.log(position)
		if(!idOffers
			|| !respTabnum
				|| !position)
		{
			response.status(400)
			response.send();
		}

		async function restore(connection, idOffer, tabnum, position)
		{
            try{
                const query = `UPDATE
								offersresponsible
							SET
								deleted = 0,
								position = ?
							WHERE
								offer_id = ?
								AND responsible_tabnum = ?
								AND deleted <> 0
							ORDER BY id DESC
							LIMIT 1`

                let placeholders = [position, idOffer, tabnum];

                return await connection.query(query, placeholders);

            }catch(e) {
                console.log(e)
            }

		}

		async function insert(connection, idOffer, tabnum, position)
		{
			const query = `INSERT INTO offersendler.offersresponsible
								(offer_id, responsible_tabnum, open, position)
							VALUES (?, ?, ?, ?)`
            console.log(position)
			let placeholders = [idOffer, tabnum, moment().format('YYYY-MM-DD'), position];

			return await connection.query(query, placeholders);
		}

		async function check(connection, idOffer, tabnum)
		{
			const query = `SELECT
								COUNT(id) AS count
							FROM
								offersendler.offersresponsible
							WHERE
								offer_id = ?
							AND 
								responsible_tabnum = ?`

			let placeholders = [idOffer, tabnum];

			const db_result = await connection.query(query, placeholders);

			return (db_result[0][0]) && (db_result[0][0].count > 0)
		}


		if(await check(pool, idOffers, respTabnum))
		{
			await restore(pool, idOffers, respTabnum, position)
		}
		else
		{
			await insert(pool, idOffers, respTabnum, position)
		}

		response.status(200);
		response.send();
    })

router.post("/saveRespRGAnnotationToDb", urlencodedParser,
    async function (request, response){

        let annotationRg = request.body.w
        let offerId = request.body.id
        let offerRespId = request.body.respID
        await pool.query(`UPDATE offersresponsible_rg SET mark = '${annotationRg}' WHERE offer_id = ${offerId} AND responsible_tabnum = ${offerRespId}`);
    })


module.exports = router
