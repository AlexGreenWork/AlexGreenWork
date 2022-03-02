const Router = require("express");
const config = require("../config/default.json");
const mysql = require("mysql2/promise");
const router = new Router();
const fs = require('fs');
const fileUpload = require("express-fileupload");
const authMiddleware = require('../middleware/auth.middleware')
const userMiddleware = require('../middleware/user.middleware')
const { isDate } = require("moment");
const moment = require("moment");
const { on } = require("events");
const { DATETIME } = require("mysql/lib/protocol/constants/types");
const offers_controller = require("../controllers/offersController")
const admin_controller = require("../controllers/adminController")

router.use(fileUpload({}));

const urlencodedParser = Router.urlencoded({ extended: false });

// const mysqlConfig = {
//     host: config.database.host,
//     user: config.database.user,
//     password: config.database.password,
//     database: config.database.database,
// }

// const pool = mysql.createPool(mysqlConfig);

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
      
       
        
        // if(sqlHistBrows[0].length != 0){
        //     res.send(sqlHistBrows[0]);
        // } else {
        //     res.send("null");
        // }

        async function sqlSelectOffers() {

            let selectOffers = await pool.execute(`SELECT
														o.nameOffer,
														o.Id,
														o.date,
														o.status,
														o.tabelNum,
                                                        o.dateComission,
														ow.name AS nameSendler,
														ow.surname AS surnameSendler,
														ow.middlename AS middlenameSendler
													FROM offers AS o
													INNER JOIN offersworker AS ow
														ON ow.tabelNum = o.tabelNum`);

            response.setHeader('Content-Type', 'application/json');

            response.send(JSON.stringify(selectOffers[0], null, 3));
            if (selectOffers[0].length !== null) {
                pool.end();
            }

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

    const mysqlConfig = {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
    }

    const pool = mysql.createPool(mysqlConfig);

    if (idOffers != undefined) {  //условие для корректной работы Предложений для обработки
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
        pool.end()
        return [sqlMyOff]

    }

    let sqlParty = await pool.execute(`SELECT IdOffers FROM senleradditional WHERE co_author_tabNum = ${tabelNumber}`) // получаем номера предложений где участвует пользователь
   
    let sqlMyOff = await pool.execute(`SELECT
											o.nameOffer,
											o.Id,
											o.date,
											o.status,
											o.tabelNum,
											o.dateComission,
											ow.name AS nameSendler,
											ow.surname AS surnameSendler,
											ow.middlename AS middlenameSendler
										FROM offers AS o
										INNER JOIN offersworker AS ow
											ON ow.tabelNum = o.tabelNum
										WHERE (ow.tabelNum = ${tabelNumber}
											AND ow.email = "${email}")`)


    let myAllOfffers = sqlMyOff[0];	// переменная в которой мы будем хранить масиив обьекстов предложений
    for (let i = 0; i < sqlParty[0].length; i++) {
        let infoOffersCoAuthor; //переменная в которой храним информацию об авторе предложения в котором мы являемся соавтором

        let sqlOffersqwe = await pool.execute(`SELECT tabelNum FROM offers WHERE Id=${sqlParty[0][i].IdOffers}`);	// нашли табельный автора подавшего предложения
        
        if(sqlOffersqwe[0].length != 0){
            let sqlinfoOffersCoAuthor = await pool.execute(`SELECT name, surname, middlename   FROM offersworker WHERE tabelNum=${sqlOffersqwe[0][0].tabelNum}`);	// нашли фио автора подавшего предложения
        
            let newObject = {}; //обьект в котором мы храним фио, нужен из за того что названия столбцов в offersworker и в старой offers отличались
            newObject["nameSendler"] = sqlinfoOffersCoAuthor[0][0].name;
            newObject['surnameSendler'] = sqlinfoOffersCoAuthor[0][0].surname;
            newObject['middlenameSendler'] = sqlinfoOffersCoAuthor[0][0].middlename;
            newObject['coAuthor'] = "Соавтор"; //опметка соавтор
            let sqlOffers = await pool.execute(`SELECT nameOffer, Id, date, status, tabelNum FROM offers WHERE Id=${sqlParty[0][i].IdOffers}`);  //получаем информацию о предложении в котором текущий пользователь являеться соавтором

            infoOffersCoAuthor = Object.assign(sqlOffers[0][0], newObject)
    
            myAllOfffers = myAllOfffers.concat(infoOffersCoAuthor);
        }
    }

       

    

    return [myAllOfffers]
}


router.post("/selectMyOffers", urlencodedParser, offers_controller.offer_info);
router.post("/userOfferStates", urlencodedParser, authMiddleware, userMiddleware, admin_controller.offers_user_states);
router.post("/userLastOffer", urlencodedParser, authMiddleware, userMiddleware, admin_controller.last_user_offer);
router.post("/offersState", urlencodedParser, authMiddleware, userMiddleware, admin_controller.offers_state);
router.post("/lastOffersByDate", urlencodedParser, authMiddleware, userMiddleware, admin_controller.offers_last_offers);
router.post("/avaliableOffersDate", urlencodedParser, authMiddleware, userMiddleware, admin_controller.offers_avaliable_offers);


router.post("/userInfo", urlencodedParser,
    async function (request, response) {

        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        const userTab = request.body.userTab;

        try {
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

            if (stmt[0][0]) {
                reqJson.department = stmt[0][0].fullname;
                reqJson.division = stmt[0][0].name;
                reqJson.position = stmt[0][0].profname,
                    reqJson.email = stmt[0][0].email
            }

            response.send(reqJson);
        }
        catch (e) {
            console.log(e)
        }
        pool.end()
    })


router.post("/FilesMyOffers", urlencodedParser,
    async function (request, response) {

        fs.readdir(`../server/files/offers/idOffers/`, (err, folder) => {

            if (folder.length == 0) {

                fs.mkdir(`../server/files/offers/idOffers/id${request.body.idOffers}/SendlerFiles/`, { recursive: true }, err => {
                    if (err) throw err; // не удалось создать папки
                    // console.log(`Папка SendlerFiles внутри id${request.body.idOffers} создана `);

                    fs.readdir(`../server/files/offers/idOffers/id${request.body.idOffers}/SendlerFiles/`, (err, files) => {

                        response.send(files)
                    })

                })

            } else {
                let a = 0;
                for (let i = 0; i < folder.length; i++) {

                    if (folder[i] == `id${request.body.idOffers}`) {


                        fs.readdir(`../server/files/offers/idOffers/id${request.body.idOffers}/`, (err, folder) => {

                            if (folder[0] == "SendlerFiles") {

                                fs.readdir(`../server/files/offers/idOffers/id${request.body.idOffers}/SendlerFiles/`, (err, files) => {

                                    response.send(files)
                                })

                                i = folder.length

                            } else {

                                fs.mkdir(`../server/files/offers/idOffers/id${request.body.idOffers}/SendlerFiles/`, { recursive: true }, err => {
                                    if (err) throw err; // не удалось создать папки
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
                        if (a == folder.length) {

                            fs.mkdir(`../server/files/offers/idOffers/id${request.body.idOffers}/SendlerFiles/`, { recursive: true }, err => {
                                if (err) throw err;
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

        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        let id = request.body.offerId
        let view = request.body.view
        let category = request.body.category
        let status = request.body.status
        try {
            await pool.query(`UPDATE offers SET view = '${view}', category = '${category}', status = '${status}' WHERE  Id = '${id}' `);
            response.status(200).send()
        } catch (e) { console.log(e) }
        pool.end()
    })

router.post("/toDbDateComission", urlencodedParser,
    async function (request, response) {

        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        let id = request.body.offerId
        let dateComission = JSON.stringify(request.body.dateComission)

        try {
            await pool.query(`UPDATE offers SET dateComission = ${dateComission} WHERE  Id = (${id}) `);
            console.log("Запись даты комисии в предложение", id)
            response.status(200).send()
        } catch (e) {
            console.log(e)
        }

        pool.end()
    })
// router.post("/saveToDb", urlencodedParser,
//     async function (request, response) {
//         let id = request.body.offerId
//         let dateComission = JSON.stringify(request.body.dateComission)
//       await pool.query(`UPDATE offers SET dateComission = ${dateComission} WHERE  Id = (${id}) `);
//     })

router.get("/downloadMyFile", urlencodedParser, async function (request, response) {
    console.log(request.query)
    let idOffers = request.query.idOffers;
    let fileName = request.query.fileName;
    let folderName = request.query.folder;

    fs.readdir(`../server/files/offers/idOffers/id${idOffers}/${folderName}/`, async (err, filesName) => {

        filesName.push('exit');

        for (let i = 0; i < filesName.length; i++) {
            if (filesName[i] == fileName) {
                let file = `${__dirname}/../files/offers/idOffers/id${idOffers}/${folderName}/${fileName}`;
                response.download(file);
                break;
            }
            else {
                if (filesName[i] == 'exit') {
                    response.send("Нет файла")
                }
            }
        }
    })
})



router.post("/sendAddInfo", urlencodedParser,
    async function (request, response) {

        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        let arr = [];
        let idOffers = request.body.selectOffers;

        let sqlSendAdd = await pool.query(`SELECT * FROM senleradditional WHERE IdOffers=${idOffers} `);
        for (let i = 0; i < sqlSendAdd[0].length; i++) {


            let coAuthorTab = sqlSendAdd[0][i].co_author_tabNum;
            let sqlCoAuthorData = await pool.query(`SELECT * FROM offersworker WHERE tabelNum=${coAuthorTab} `);
            console.log(sqlCoAuthorData[0][0])
            let newObject = {}; //обьект в котором мы храним фио, нужен из за того что названия столбцов в offersworker и в старой offers отличались
            newObject["nameSendler"] = sqlCoAuthorData[0][0].name;
            newObject['surnameSendler'] = sqlCoAuthorData[0][0].surname;
            newObject['middlenameSendler'] = sqlCoAuthorData[0][0].middlename;
            newObject['tabelNum'] = sqlCoAuthorData[0][0].tabelNum;
            newObject['email'] = sqlCoAuthorData[0][0].email;
            newObject['phoneNumber'] = sqlCoAuthorData[0][0].phoneNumber;
            arr[i] = newObject;

        }
        console.log(sqlSendAdd[0])
        if (sqlSendAdd[0] !== undefined/*  && sqlSendAdd[0].length !== 0 */) { //добавил условие после &&

            response.send(arr)
        } else {
            response.send('null')
        }
        pool.end()
    })

router.post("/toDbSaveResposibleRG", urlencodedParser, authMiddleware,
    async function (request, response) {
        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        const idOffers = request.body.idOffer;
        const respTabnum = request.body.respTabnum;
        const userId = request.user.id;

        if (!idOffers
            && !respTabnum) {
            response.status(400)
            response.send();
        }

        // const sqlCheck = `SELECT
        // 					COUNT(o.Id) AS isset
        // 				FROM
        // 					offers AS o
        // 				INNER JOIN offersworker AS o2 ON o2.id = ?
        // 				WHERE o.tabelNum = o2.tabelNum 
        // 					AND o.Id = ?`;

        // const check = await pool.query(sqlCheck, [userId, idOffers]);
        // 
        // if(check[0].length)
        // {
        // 	if(check[0][0].isset === 0)
        // 	{
        //         console.log("qwe",check[0][0])
        // 		response.status(400);
        // 		response.send();
        // 	}
        // }

        const sqlResponsible = `UPDATE offersresponsible_rg
								SET deleted = 1
								WHERE offer_id = ?
									AND deleted <> 1`
        await pool.query(sqlResponsible, [idOffers]);

        const sqlNewResponsible = `INSERT INTO offersresponsible_rg
										(offer_id, responsible_tabnum, open, position)
									VALUES (?, ?, ?, 0)`

        await pool.query(sqlNewResponsible, [idOffers, respTabnum, moment().format('YYYY-MM-DD')]);
        console.log(moment().format('YYYY-MM-DD'), "добавление RG к предложению", idOffers)
        response.status(200);
        response.send();
        pool.end()
    })


router.post("/toDbDeleteResponsible", urlencodedParser, authMiddleware,
    async function (request, response) {

        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        const idOffers = request.body.idOffer;
        const respTabnum = request.body.respTabnum;
        const userId = request.user.id;

        if (!idOffers
            && !respTabnum) {
            response.status(400)
            response.send();
        }

        const sqlCheck = `SELECT
							COUNT(o.Id) AS isset
						FROM
							offers AS o
						INNER JOIN offersworker AS o2 ON o2.id = ?
						WHERE o.tabelNum = o2.tabelNum 
							AND o.Id = ?`;

        const check = await pool.query(sqlCheck, [userId, idOffers]);

        if (check[0].length) {
            if (check[0][0].isset === 0) {
                response.status(400);
                response.send();
            }
        }

        let placeholders = [idOffers, respTabnum];

        query = `UPDATE
					offersendler.offersresponsible
				SET deleted = 1
				WHERE offer_id = ?
				AND responsible_tabnum = ?`

        pool.query(query, placeholders);

        response.status(200);
        pool.end()
        response.send();
    })

router.post("/toDbSaveResponsible", urlencodedParser, authMiddleware,
    async function (request, response) {
        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        const idOffers = request.body.idOffer;
        const respTabnum = request.body.respTabnum;
        const position = request.body.position;
        const userId = request.user.id;

        if (!idOffers
            || !respTabnum
            || !position) {
            response.status(400)
            response.send();
        }

        async function restore(connection, idOffer, tabnum, position) {
            try {
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

            } catch (e) {
                console.log(e)
            }

        }

        async function insert(connection, idOffer, tabnum, position) {
            const query = `INSERT INTO offersendler.offersresponsible
								(offer_id, responsible_tabnum, open, position)
							VALUES (?, ?, ?, ?)`
            console.log(position)
            let placeholders = [idOffer, tabnum, moment().format('YYYY-MM-DD'), position];

            return await connection.query(query, placeholders);
        }

        async function isset(connection, idOffer, tabnum) {
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

        const sqlCheck = `SELECT
							COUNT(o.Id) AS isset
						FROM
							offers AS o
						INNER JOIN offersworker AS o2 ON o2.id = ?
						WHERE o.tabelNum = o2.tabelNum 
							AND o.Id = ?`;

        const check = await pool.query(sqlCheck, [userId, idOffers]);

        if (check[0].length) {
            if (check[0][0].isset === 0) {
                response.status(400);
                response.send();
            }
        }

        if (await isset(pool, idOffers, respTabnum)) {
            await restore(pool, idOffers, respTabnum, position)
        }
        else {
            await insert(pool, idOffers, respTabnum, position)
        }

        response.status(200);
        response.send();
    })

router.post("/saveRespRGAnnotationToDb", urlencodedParser, authMiddleware,
    async function (request, response) {

        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        let annotationRg = request.body.w
        let offerId = request.body.id
        let offerRespId = request.body.respID
        await pool.query(`UPDATE offersresponsible_rg SET mark = '${annotationRg}' WHERE offer_id = ${offerId} AND responsible_tabnum = ${offerRespId}`);
        response.status(200).send()
    })


router.post("/offerStates", urlencodedParser, authMiddleware,
    async function (request, response) {

        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        const idOffers = request.body.idOffer;

        if (!idOffers) {
            response.status(400)
            response.send();

            return;
        }

        const query = `SELECT
							o.open,
							o.close,
							dep.name
						FROM
							?? AS o
						INNER JOIN offers AS o3
							ON o3.Id = ?
						INNER JOIN kadry_all AS ka 
							ON ka.tabnum = o.responsible_tabnum
								AND ka.factory = 1 
						INNER JOIN department AS dep
							ON dep.id = ka.department
								AND dep.factory = ka.factory
						WHERE 
							o.deleted <> 1
							AND o.offer_id = o3.Id`;

        const sqlOfferResponsible = await pool.query(query, ["offersresponsible", idOffers]);
        const sqlOfferResponsible_rg = await pool.query(query, ["offersresponsible_rg", idOffers]);

        let result = {
            responsibles: [],
            responsibles_rg: []
        };

        if (sqlOfferResponsible[0].length) {
            result.responsibles = sqlOfferResponsible[0]
        }

        if (sqlOfferResponsible_rg[0].length) {
            result.responsibles_rg = sqlOfferResponsible_rg[0]
        }

        response.send(result);
    })


router.post("/respResults", urlencodedParser, authMiddleware,
    async function (request, response) {
        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);


        const idOffers = request.body.idOffer;

        if (!idOffers) {
            response.status(400)
            response.send();

            return;
        }

        const query = `SELECT
							o.open,
							ka.fiofull,
							o.close,
							dep.name,
							o.responsible_tabnum,
							o.open,
							o.close,
							o.actual,
							o.innov,
							o.cost,
							o.extent
						FROM
							?? AS o
						INNER JOIN offers AS o3 ON
							o3.Id = ?
						INNER JOIN kadry_all AS ka 
								ON ka.tabnum = o.responsible_tabnum
									AND ka.factory = 1 
						INNER JOIN department AS dep
							ON dep.id = ka.department
								AND dep.factory = ka.factory
						WHERE 
							o.deleted <> 1
						AND
							o.offer_id = o3.Id`

        let placeholders = ['offersendler.offersresponsible', idOffers];
        let placeholders_rg = ['offersendler.offersresponsible_rg', idOffers];

        const responsibles = await pool.query(query, placeholders)
        const responsibles_rg = await pool.query(query, placeholders_rg)

        let result = {
            responsibles: {},
            responsibles_rg: {}
        };

        function init(data) {
            const pointer = new Map();

            for (value of data) {
                if (!pointer.hasOwnProperty(value.name)) {
                    pointer[value.name] = {
                        data: [],
                        actual: 0,
                        innovation: 0,
                        cost: 0,
                        extent: 0
                    };
                }

                const _pointer = pointer[value.name];

                _pointer.data.push(
                    {
                        department: value.name,
                        fio: value.fiofull,
                        open: value.open,
                        close: value.close,
                        actuality: value.actual,
                        innovation: value.innov,
                        cost: value.cost,
                        duration: value.extent,
                        middle: (Math.round(value.actual + value.innov + value.cost + value.extent) / 4)
                    }
                )
                _pointer.actual += value.actual;
                _pointer.innovation += value.innov;
                _pointer.cost += value.cost;
                _pointer.extent += value.extent
            }

            for (const value in pointer) {
                pointer[value].actual /= pointer[value].data.length;
                pointer[value].innovation /= pointer[value].data.length;
                pointer[value].cost /= pointer[value].data.length;
                pointer[value].extent /= pointer[value].data.length;
            }

            return pointer;
        }

        result.responsibles = (responsibles[0].length) ? init(responsibles[0]) : {};
        result.responsibles_rg = (responsibles_rg[0].length) ? init(responsibles_rg[0]) : {};

        response.send(result)
    })
    router.post("/responsibleToOffers", urlencodedParser,
    async function (request, response) {
        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        let arrOffer = [];
        let tabNum = request.body.tabNum
     
        let sqlResponsible = await pool.query(`SELECT offer_id  FROM offersresponsible WHERE responsible_tabnum=${tabNum} `);
        
        if(sqlResponsible[0].length != 0){
            for (let i = 0; i < sqlResponsible[0].length; i++) {

                let sqlOffers = await pool.query(`SELECT nameOffer,
                                                         Id,
                                                         date,
                                                         status,
                                                         tabelNum 
                                                   FROM offers WHERE Id=${sqlResponsible[0][i].offer_id} `);

                                                   
                if(sqlOffers[0].length != 0){
                    let sqlOffersAuthor = await pool.query(`SELECT * FROM offersworker WHERE tabelNum=${sqlOffers[0][0].tabelNum} `);
                    let offersObj = sqlOffers[0][0]

                    offersObj['nameSendler'] = sqlOffersAuthor[0][0].name
                    offersObj['surnameSendler'] = sqlOffersAuthor[0][0].surname
                    offersObj['middlenameSendler'] = sqlOffersAuthor[0][0].middlename
    
                    arrOffer[i] = offersObj;
    
                    if(i == sqlResponsible[0].length-1 ){
                        response.send(arrOffer)
                    }
                    } else {
                        response.send("noResponsible")
                    }
              


               
            }
        } else{
            response.send("noResponsible")
        }
        pool.end()
    })
    /////////////////////////////////////////////////////////////
    router.post("/toDbSaveNotesResponsible", urlencodedParser,
    async function (request, response) {
    let actual = request.body.actual
    let innovate = request.body.innovate
    let cost = request.body.cost
    let duration = request.body.duration
    let offerId = request.body.idOffer
    let respTabnum = request.body.tabNum
    let position = request.body.position
    const mysqlConfig = {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
    }

    const pool = mysql.createPool(mysqlConfig);

        console.log(moment().format('YYYY-MM-DD'),"Запись оценок responsible"," ","'","в предложение",offerId, "с табельного ", respTabnum, )
        await pool.query(`UPDATE offersresponsible SET actual = '${actual}', innov = '${innovate}',cost = '${cost}', extent = '${duration}', position = '${position}' WHERE offer_id = ${offerId} AND responsible_tabnum = ${respTabnum}`);
        response.status(200).send() 
    })

    router.post("/closeConclusionRG", urlencodedParser,
    async function (request, response) {
    let offerId = request.body.idOffer
    let respTabnum = request.body.tabNum

        console.log(moment().format('YYYY-MM-DD'),"Заключение RG закрыто"," ","'","в предложение",offerId, "с табельного ", respTabnum, )
        await pool.query(`UPDATE offersresponsible_rg SET close = '${moment().format('YYYY-MM-DD')}' WHERE offer_id = ${offerId} AND responsible_tabnum = ${respTabnum}`);
        response.status(200).send() 
    })

    router.post("/closeConclusionResponsible", urlencodedParser,
    async function (request, response) {
        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

    let offerId = request.body.idOffer
    let respTabnum = request.body.tabNum
        try{
        console.log(moment().format('YYYY-MM-DD'),"Заключение Responsible закрыто"," ","'","в предложение",offerId, "с табельного ", respTabnum, )
        await pool.query(`UPDATE offersresponsible SET close = '${moment().format('YYYY-MM-DD')}' WHERE offer_id = ${offerId} AND responsible_tabnum = ${respTabnum}`);
        response.status(200).send()
        }catch(e){
            console.log(e)
        } 
        pool.end()
    })

router.post("/toDbSaveNotesResponsible", urlencodedParser,
    async function (request, response) {

        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        let actual = request.body.actual
        let innovate = request.body.innovate
        let cost = request.body.cost
        let duration = request.body.duration
        let offerId = request.body.idOffer
        let respTabnum = request.body.tabNum
        let position = request.body.position

        console.log(Date(), "Запись оценок responsible", " ", "'", "в предложение", offerId, "с табельного ", respTabnum,)
        await pool.query(`UPDATE offersresponsible SET actual = '${actual}', innov = '${innovate}',cost = '${cost}', extent = '${duration}', position = '${position}' WHERE offer_id = ${offerId} AND responsible_tabnum = ${respTabnum}`);
        response.status(200).send()
        pool.end();
    })

router.post("/closeConclusionRG", urlencodedParser,
    async function (request, response) {

        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        let offerId = request.body.idOffer
        let respTabnum = request.body.tabNum

        console.log(Date(), "Заключение RG закрыто", " ", "'", "в предложение", offerId, "с табельного ", respTabnum,)
        await pool.query(`UPDATE offersresponsible_rg SET close = '${moment().format('YYYY-MM-DD')}' WHERE offer_id = ${offerId} AND responsible_tabnum = ${respTabnum}`);
        response.status(200).send()
        pool.end()
    })

router.post("/closeConclusionResponsible", urlencodedParser,
    async function (request, response) {
        let offerId = request.body.idOffer
        let respTabnum = request.body.tabNum
        try {
            console.log(Date(), "Заключение Responsible закрыто", " ", "'", "в предложение", offerId, "с табельного ", respTabnum,)
            await pool.query(`UPDATE offersresponsible SET close = '${moment().format('YYYY-MM-DD')}' WHERE offer_id = ${offerId} AND responsible_tabnum = ${respTabnum}`);
            response.status(200).send()
        } catch (e) {
            console.log(e)
        }
    })


router.post("/saveComissionAnnotationToDb", urlencodedParser,
    async function (request, response) {
     console.log(" функция")
    let textComission = request.body.w
    let offerId = request.body.id
    let comissionTabnum = request.body.comissionTabNum
    const mysqlConfig = {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
    }

    const pool = mysql.createPool(mysqlConfig);
    
    const sqlR = await pool.query(`SELECT * FROM comission WHERE offerID = '${offerId}' AND tabelNum = ${comissionTabnum}`)
     console.log(textComission)
     console.log(sqlR[0])
    if(sqlR[0][0] == null){
        console.log(moment().format('YYYY-MM-DD'),"Запись Аннотации Комиссии", "в предложение",offerId, "с табельного ", comissionTabnum)
        await pool.query(`INSERT INTO comission (offerID, annotation, tabelNum) VALUES ('${offerId}', '${textComission}', '${comissionTabnum}')`)
          response.status(200).send()
     }else{
        await pool.query(`UPDATE comission SET annotation = '${textComission}' WHERE offerID = ${offerId} AND tabelNum = ${comissionTabnum}`);
        response.status(200).send() 
     }
      pool.end()
     
    })
//////////////////////////////////////////////////////////////
router.post("/toDbSaveAnnot", urlencodedParser,
    async function (request, response) {
     console.log(" toDbSaveAnnot - отработало")
    let textAnnotation = request.body.ann
    let offerId = request.body.idOffer
    let tabnum = request.body.tabNum
    let position = request.body.position
    console.log(textAnnotation, offerId,tabnum )
    const mysqlConfig = {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
    }

    const pool = mysql.createPool(mysqlConfig);
    try{
    const sqlR = await pool.query(`SELECT * FROM offersresponsible WHERE offer_id = '${offerId}' AND responsible_tabnum = '${tabnum}'`)
     
    if(sqlR == undefined){
        pool.end()
        return console.log("Сработал андефайнд")
        
     }
      
    console.log(moment().format('YYYY-MM-DD'),"Запись Аннотации Ответственного", "в предложение",offerId, "с табельного ", tabnum)
      await pool.query(`UPDATE offersresponsible SET mark = '${textAnnotation}', position = '${position}' WHERE offer_id = ${offerId} AND responsible_tabnum = ${tabnum}`)
        response.status(200).send() 
        pool.end()
    }catch(e){console.log(e)}
    
    })



router.post("/comission", urlencodedParser,
    async function (request, response) {
        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);
        console.log("comission - отработало")
        let offerId = request.body.idOffer
        try {
            const sqlR = await pool.query(`SELECT annotation FROM comission WHERE offerID = '${offerId}'`)
       
            if (sqlR[0][0] == undefined) {
                response.send("")
                pool.end()
                return console.log("нет такой записи в таблице комиссия")

            } else {
                let resp = sqlR[0][0].annotation

                console.log(resp)
                response.json(resp)
            }
        } catch (e) { console.log(e) }

        pool.end()

    })

    router.post("/getHistoryBrowsing", urlencodedParser,
    async function (req, res) {
        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);
        let tabNum = req.body.tabNum;
        let sqlHistBrows = await pool.query(`SELECT id_offers FROM browsing_history WHERE tabNum = '${tabNum}'`)
        
        if(sqlHistBrows[0].length != 0){
            res.send(sqlHistBrows[0]);
        } else {
            res.send("null");
        }
       
        pool.end()
    })

    router.post("/setHistoryBrowsing", urlencodedParser,
    async function (req, res) {
        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);
        let tabNum = req.body.tabNum;
        let offerId = req.body.offerId;
        let sqlHist = await pool.query(`SELECT id_offers FROM browsing_history WHERE tabNum = '${tabNum}' AND id_offers = '${offerId}'`)
        // console.log('sqlHist[0]', sqlHist[0])
        //  pool.query(`INSERT INTO comission (offerID, annotation, tabelNum) VALUES ('${offerId}', '${textComission}', '${comissionTabnum}')`)
        if(sqlHist[0].length === 0){
            let sqlHistBrows = await pool.query(`INSERT INTO  browsing_history (id_offers, tabNum) VALUES ('${offerId}', '${tabNum}')`)
     
            if(sqlHistBrows[0].length != 0){
                res.send(sqlHistBrows[0]);
            } else {
                res.send("null");
            }
        }
       
       
        pool.end()
    })
    
    router.post("/readAdministration", urlencodedParser,
    async function (req, res) {
        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);
        let sqlReadAdmin = await pool.query(`SELECT * FROM kadryok WHERE CEHCODE = '400'`)
        console.log(sqlReadAdmin[0])
        //  pool.query(`INSERT INTO comission (offerID, annotation, tabelNum) VALUES ('${offerId}', '${textComission}', '${comissionTabnum}')`)
       
                res.send(sqlReadAdmin[0]);
                pool.end()
            
        }
       
            
    )

    router.post("/readContacts", urlencodedParser,
    async function (req, res) {
        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);
        let sqlReadAdmin = await pool.query(`SELECT * FROM telephone`)
        console.log(sqlReadAdmin[0])
        //  pool.query(`INSERT INTO comission (offerID, annotation, tabelNum) VALUES ('${offerId}', '${textComission}', '${comissionTabnum}')`)
       
                res.send(sqlReadAdmin[0]);
                pool.end()
            
        }
       
            
    )

    router.post("/writeContacts", urlencodedParser,
    async function (req, res) {
        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        console.log(req.body)
        // let sqlReadAdmin = await pool.query(`SELECT * FROM telephone`)
        // console.log(sqlReadAdmin[0])
        // //  pool.query(`INSERT INTO comission (offerID, annotation, tabelNum) VALUES ('${offerId}', '${textComission}', '${comissionTabnum}')`)
       
        //         res.send(sqlReadAdmin[0]);
                pool.end()
            
        }
       
            
    )

module.exports = router
