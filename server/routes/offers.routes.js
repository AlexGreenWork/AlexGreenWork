const Router = require("express");
const config = require("../config/default.json");
const mysql = require("mysql2/promise");
const router = new Router();
const fs = require('fs');
const fileUpload = require("express-fileupload");
const {isDate} = require("moment");
const moment = require("moment");
const { on } = require("events");
const responsible = require("../controllers/responsibleController.js");

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

    res.header('Access-Control-Allow-Methods', 'GET, POST ');
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
        
        let firstName = request.body.firstName; // имя
        let middleName = request.body.middleName; // отчество
        let surname = request.body.userSurName; // фамилия
        let tabelNumber = request.body.tabelNumber;
        let phoneNumber = request.body.phoneNumber;
        let email = request.body.email;
        
        let sqlResult = await sqlMyOffers(tabelNumber, email, firstName, middleName, surname, phoneNumber)
       
        response.send(sqlResult[0][0])
    })

async function sqlMyOffers(tabelNumber, email, firstName, middleName, surname, phoneNumber) {
   
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
       
    return [sqlMyOff]

}

router.post("/selectMyOffers", urlencodedParser,
    async function (request, response) {

    let idOffers = request.body.selectOffers
    let sqlMyOff = await pool.execute(`SELECT 
											o.*,
											ow.name AS nameSendler,
											ow.surname AS surnameSendler,
											ow.middlename AS middlenameSendler,
											ow.email AS email
										FROM offers AS o
										INNER JOIN offersworker AS ow
											ON ow.tabelNum = o.tabelNum
										WHERE o.Id = ${idOffers}`)
   // console.log(sqlMyOff[0])
    response.send(sqlMyOff[0][0])

})

router.post("/userInfo", urlencodedParser,
    async function (request, response) {

    let userTab = request.body.userTab;

	try{
			const sqlUserInfo = `SELECT
							ka.profname,
							d.fullname,
							d2.name,
							ue.email
						FROM kadry_all AS ka
						LEFT JOIN department AS d
							ON d.id = ka.department
						LEFT JOIN division AS d2
							ON d2.department = ka.department
								AND d2.id = ka.division
						LEFT JOIN users_emails AS ue
							ON ue.tabnum = ka.tabnum
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
    let idOffers = request.query.idOffers;
    let fileName = request.query.fileName;
    
    fs.readdir(`../server/files/offers/idOffers/id${idOffers}/SendlerFiles/`, async (err, filesName) => {
        
		filesName.push('exit');
		   
		for(let i = 0 ; i < filesName.length; i++ )
		{
			if(filesName[i] == fileName )
			{
				let file = `${__dirname}/../files/offers/idOffers/id${idOffers}/SendlerFiles/${fileName}`;
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

router.post("/sendAdd", urlencodedParser,
    async function (request, response){
        
        let idOffers = request.body.selectOffers;

        let sqlSendAdd = await pool.query(`SELECT * FROM senleradditional WHERE IdOffers=${idOffers} `);
       
        if(sqlSendAdd[0][0] != undefined){
            
            let SendAddValid = sqlSendAdd[0][0].Sendlers.slice(1, sqlSendAdd[0][0].Sendlers.length-1)
            
            response.send(SendAddValid)
        } else{
           
            response.send('null')
        }
} )

router.post("/sendAddInfo", urlencodedParser,
    async function (request, response){
        
        let idOffers = request.body.selectOffers;

        let sqlSendAdd = await pool.query(`SELECT * FROM senleradditional WHERE IdOffers=${idOffers} `);
       
       if(sqlSendAdd[0][0] != undefined){
        let SendAddValid = sqlSendAdd[0][0].Sendlers.slice(1, sqlSendAdd[0][0].Sendlers.length-1)
       
        response.send(SendAddValid)
    } else{
        response.send('null')
    }

})

router.post("/toDbSaveResposibleRG", urlencodedParser,
        async function (request, response){

            let idOffers = request.body.idOffer;
            let respTabnum = request.body.respTabnum;

			responsible.update_responsible('offersresponsible_rg', 'responsibleRG', idOffers, respTabnum);
})


router.post("/toDbSaveResposible1", urlencodedParser,
        async function (request, response){

			let idOffers = request.body.idOffer;
			let respTabnum = request.body.respTabnum;

			responsible.update_responsible('offersresponsible', 'responsible1', idOffers, respTabnum);
})

router.post("/toDbSaveResposible2", urlencodedParser,
        async function (request, response){

			let idOffers = request.body.idOffer;
			let respTabnum = request.body.respTabnum;

			responsible.update_responsible('offersresponsible', 'responsible2', idOffers, respTabnum);
})

router.post("/toDbSaveResposible3", urlencodedParser,
        async function (request, response){

			let idOffers = request.body.idOffer;
			let respTabnum = request.body.respTabnum;

			responsible.update_responsible('offersresponsible', 'responsible3', idOffers, respTabnum);
})


module.exports = router
