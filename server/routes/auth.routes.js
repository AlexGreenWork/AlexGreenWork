const Router = require("express");
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const config = require("../config/default.json")
const conf = require("config")
const moment = require('moment');
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const mysql = require("mysql2/promise");
const urlencodedParser = Router.urlencoded({extended: false});

const fs = require('fs');
const uploadFile = require('../filesUpload/filesUpload')
const fileUpload = require("express-fileupload");
const { KeyObject } = require("crypto");

router.use(fileUpload({}));
router.use((req, res, next) => {

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS ');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
})


router.post('/registration',
    [
        check('email', "не корректный email").isEmail(),
        check('password', "пароль должен быть длиннее 3 и короче 12 символов").isLength({min: 3, max: 12}),
        check('tabelNum', "не корректный табельный").isNumeric(),
    ],

    async (req, res) => {
        try
		{
            const mysqlConfig = {
                host: config.database.host,
                user: config.database.user,
                password: config.database.password,
                database: config.database.database,

            }

            const connection = mysql.createPool(mysqlConfig);
           
            const errors = validationResult(req)
            
            if (!errors.isEmpty())
			{
                return res.status(400).json({message: "Не корректный запрос", errors})
            }

            const {surname, name,  middlename, tabelNum, email, phoneNumber, password, fired, adminOptions,date} = req.body

            const candidate = await connection.query(`SELECT * FROM offersworker WHERE email = '${email}' OR tabelNum = '${tabelNum}' AND ${tabelNum}<>0`);

            if (candidate[0][0])
			{
                return res.status(400).json({message: `Пользователь с таким email: ${email} или табельным номером: ${tabelNum} уже существует`})
            }

            const hashPassword = await bcrypt.hash(password, 8)
            const user = ({
                date,
                surname,
                name,
                middlename,
                tabelNum,
                email,
                phoneNumber,
                password: hashPassword,
                fired,
                adminOptions

            })

            await connection.query('INSERT INTO offersworker SET ?', user,
										function (error, results, fields)
										{
											if (error) throw error;
											res.end(JSON.stringify(results));
										});

            return res.json({message: "Пользователь создан"})

        }
		catch (e)
		{
            res.send({message: "Ошибка сервера"})
        }
    })

router.post('/login',
    async (req, res) => {
        try
		{
            const mysqlConfig = {
                host: config.database.host,
                user: config.database.user,
                password: config.database.password,
                database: config.database.database,
            }

            const connection = mysql.createPool(mysqlConfig);

            const {email, tabelNum, password} = req.body
            const user = await connection.query(`SELECT * FROM offersworker WHERE email = '${email}' OR tabelNum = '${email}'`);


            if (!user[0][0])
			{
                return res.status(404).json({message: "Пользователь не найден"})
            }

            const isPassValid = bcrypt.compareSync(password, user[0][0].password)

            if (!isPassValid)
			{
                return res.status(400).json({message: "Пароль не корректен"})
            }

            const token = jwt.sign({id: user[0][0].id}, conf.get("secretKey"), {expiresIn: "8h"})
            return res.json({
                token,
                user: {
                    id: user[0][0].id,
                    name: user[0][0].name,
                    surname: user[0][0].surname,
                    middlename: user[0][0].middlename,
                    tabelNum: user[0][0].tabelNum,
                    email: user[0][0].email,
                    phoneNumber: user[0][0].phoneNumber,
                    fired: user[0][0].fired,
                    avatar: user[0][0].avatar,
                    adminOptions: user[0][0].adminOptions
                }
            })
        }
		catch (e)
		{
            console.log(e)
            res.send({message: "Server error"})
        }
})

router.get('/auth', authMiddleware,
    async (req, res) => {
        try
		{
            const mysqlConfig = {
                host: config.database.host,
                user: config.database.user,
                password: config.database.password,
                database: config.database.database,
            }

            const connection = mysql.createPool(mysqlConfig);
            const user = await connection.query(`SELECT * FROM offersworker WHERE Id = ${req.user.id}`);

            const token = jwt.sign({id: user[0][0].Id}, conf.get("secretKey"), {expiresIn: "8h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    middlename: user.middlename,
                    tabelNum: user.tabelNum,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    fired: user.fired,
                    avatar: user.avatar,
                    adminOptions: user.adminOptions
                }
            })
        }
		catch (e)
		{
            console.log(e)
            res.send({message: "Server error"})
        }
    })


  

router.post("/forms", urlencodedParser, async (request, response) => {


    let firstName = request.body.firstName; // имя
    let middleName = request.body.middleName; // отчество
    let lastName = request.body.lastName; // фамилия
    let tabelNumber = request.body.tabelNumber;
    let phoneNumber = request.body.phoneNumber;
    let nameOffer = request.body.nameOffer;
    let emailInput = request.body.emailInput;
    let offer = request.body.offer;
    let problem = request.body.problem;
    let senleradditional = request.body.yetSendler;
    const password1 = Math.random().toString(36).slice(-8);
    const hashPassword = await bcrypt.hash(password1, 8);
    const password = hashPassword;
   // console.log(hashPassword)

    const mysqlConfig = {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,

    }
    const pool = mysql.createPool(mysqlConfig);


    async function Messages() {
        let message = await CheckUniqueTabAndEmail(tabelNumber, emailInput, phoneNumber);

      //  console.log("message = " + message)
        response.send(message);

    }

    Messages();

    async function CheckTabAndEmail(tabelNumber, emailInput) {

        const checkTab = await pool.execute(`SELECT * FROM offersworker WHERE tabelNum IN (${tabelNumber})`);
        const checkEmail = await pool.execute(`SELECT * FROM offersworker WHERE email IN ("${emailInput}")`);
        const updSendData = await pool.query(`UPDATE offersworker SET phoneNumber = ("${phoneNumber}") WHERE tabelNum = ("${tabelNumber}") AND email = ("${emailInput}")`);

        return [checkTab, checkEmail, updSendData];

    }

    async function CheckUniqueTabAndEmail(tabelNumber, emailInput, phoneNumber) {
        var codes = await CheckTabAndEmail(tabelNumber, emailInput, phoneNumber);
        var tb = codes[0][0]; // первый елемент данные, второй это метаданные
        var eml = codes[1][0]; //второй sql запрос
        let upd = codes[2][0] // запрос обновления строки
        let messageSend = "";
        if (tb[0] != undefined || eml[0] != undefined) {
          //  console.log("Такой табельный или емейл уже зарегистрирован в системе");

            if (upd.changedRows != 0) { // запрос.количество затронутых строк
                messageSend = messageSend + "" + `${await InsertTabOffers(nameOffer, offer)}`;
            } else {

              //  console.log("данные пользователя не записаны");
                if (upd.affectedRows != 0) {

                    messageSend = messageSend + "" + `${await InsertTabOffers(nameOffer, offer)}`

                } else {

                    if (tabelNumber == 0) {

                        messageSend = messageSend + "Ваше предложение опубликовано";
                        
                        await pool.query(`INSERT INTO offersworker (name, middlename, surname, tabelNum, email, phoneNumber, password, adminOptions, date)` +
                            `VALUES("${firstName}", "${middleName}", "${lastName}", "${tabelNumber}", "${emailInput}", "${phoneNumber}", "${password}", "user", "${moment().format('YYYY-MM-DD')}")`);
                     //   console.log("Пользователь зарегистрирован");
                        await InsertTabOffers(nameOffer, offer)

                    } else {
                      //  console.log("email или табельный уже зарегистрирован");
                        messageSend = messageSend + "Не совпадение данных Email и табельного уже зарегистрированого пользователя";
                    }

                }

            }

            return messageSend;

        } else {

          //  console.log("Табельный и емейл отсуствует");

            await pool.query(`INSERT INTO offersworker (name, middlename, surname, tabelNum, email, phoneNumber, password, adminOptions, date)` +
                `VALUES("${firstName}", "${middleName}", "${lastName}", "${tabelNumber}", "${emailInput}", "${phoneNumber}", "${password}", "user", "${moment().format('YYYY-MM-DD')}" )`);
           /// console.log("Пользователь зарегистрирован");

            messageSend = messageSend + "Пользователь зарегистрирован " + `${await InsertTabOffers(nameOffer, offer)}`;

            return messageSend;

        }
    }

    async function checkInsertTabOffers(nameOffer, textOffer) {

        const sqlOffers = await pool.execute(`SELECT * FROM offers WHERE nameOffer IN("${nameOffer}") AND  textOffer IN("${textOffer}")`);

        return sqlOffers;
    }

    async function InsertTabOffers(nameOffer, offer) {

        var inTbOf = await checkInsertTabOffers(nameOffer, offer);

        var tb = inTbOf[0]; // первый елемент данные, второй это метаданные

        if (tb[0] != undefined) { // запрос выполнен, запись найдена


            return "Такое предложение уже есть";

        } else {
try{
            await pool.query(`INSERT INTO offers
									(tabelNum,
									nameOffer,
									textOffer,
									descriptionProblem,
									date)
								VALUES ("${tabelNumber}",
										"${nameOffer}",
										"${offer}",
										"${problem}",
										"${moment().format('YYYY-MM-DD')}"
										)`);
		}
		catch (e)
		{
			console.log(e);
		}
          //  console.log("Предложение добавлено")
            await uploadFile.CheckLastEntry();
            
          let sqlLstEntry= await pool.query("SELECT Id FROM offers WHERE id=(SELECT max(id) FROM offers);")
         // console.log(sqlLstEntry[0][0].Id) 
          coAuthorRegistration(senleradditional)
       
            return "Предложение зарегистрировано";
            
        }

    }

   

});
async function coAuthorRegistration(coAuthor){

    const mysqlConfig = {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,

    }
    const pool = mysql.createPool(mysqlConfig);

    const password1 = Math.random().toString(36).slice(-8);
    const hashPassword = await bcrypt.hash(password1, 8);
    const password = hashPassword;

    let sqlLstEntry= await pool.query("SELECT Id FROM offers WHERE id=(SELECT max(id) FROM offers);");
   
    // первый ключ объекта всегда 0 !!!!!!!!
    
    let parseSenlerAdd = JSON.parse(coAuthor);
    
    let keyParseSenlerAdd = Object.keys(parseSenlerAdd)
    for(let i = 1; i<keyParseSenlerAdd.length; i++){
      
        let key = keyParseSenlerAdd[i];
      
         if(Object.keys(parseSenlerAdd[key]).length != 0){
            
        
            const checkTab = await pool.execute(`SELECT * FROM offersworker WHERE tabelNum IN (${parseSenlerAdd[key].tabelNumber})`);
            const checkEmail = await pool.execute(`SELECT * FROM offersworker WHERE email IN ("${parseSenlerAdd[key].email}")`);
            const checkFired = await pool.execute(`SELECT deleted FROM kadry_all WHERE tabnum IN ("${parseSenlerAdd[key].tabelNumber}")`);
          //  console.log("tab in kadryall", checkFired[0][0].deleted);
         
           if(checkTab[0].length != 0 || checkEmail[0].length != 0 ){
              //   console.log("Табельный или емейл есть");
              await pool.query(`INSERT INTO senleradditional (IdOffers, co_author_tabNum) VALUES("${sqlLstEntry[0][0].Id}", '${parseSenlerAdd[key].tabelNumber}')`);
           } else{
    
           // console.log("Табельный или емейл отсуствует");
        
            await pool.query(`INSERT INTO offersworker (name, middlename, surname,
                                     tabelNum, email, phoneNumber,
                                     password, adminOptions, date, fired)` +
                                `VALUES("${parseSenlerAdd[key].name}", "${parseSenlerAdd[key].middlename}", "${parseSenlerAdd[key].surname}", 
                                     "${parseSenlerAdd[key].tabelNumber}","${parseSenlerAdd[key].email}", "${parseSenlerAdd[key].phoneNumber}", 
                                     "${password}", "user", "${moment().format('YYYY-MM-DD')}", "${checkFired[0][0].deleted}" ) `);
    
             await pool.query(`INSERT INTO senleradditional (IdOffers, co_author_tabNum) VALUES("${sqlLstEntry[0][0].Id}", '${parseSenlerAdd[key].tabelNumber}')`);
            // await pool.query(`INSERT INTO senleradditional (IdOffers, co_author_tabNum) VALUES("${sqlLstEntry[0][0].Id}", '${parseSenlerAdd[key].tabelNumber}')`);
            }
         }
       
    }
}


router.post('/upload', function (req, res) {

  //  console.log("начало auth-rou upload")
  //  console.log(req.body)


    if (!req.files) {
      //  console.log("not file")
    } else {
        fs.readdir('../server/files/upload/', (err, files) => {     //очищаем папку загрузки перед загрузкой файла

          //  console.log('auth-rou : ' + files);
          //  console.log( files);
            if(files == null){
                console.log("file null")
            }

            for (let i = 0; i < files.length; i++) {


                fs.unlink(`../server/files/upload/${files[i]}`, err => {
                    if (err) throw err; // не удалось удалить файл
                  //  console.log('Файл успешно удалён');
                });

            }

        });
       // console.log("перед записью")
        req.files.myFile.mv('../server/files/upload/' + req.files.myFile.name);
       
        res.end(req.files.myFile.name);

    }
});



router.post('/uploadMyCard',  async function (req, res) {
    
    try{
     
        req.files.myFileCard.mv(`../server/files/offers/idOffers/id${req.body.idOffers}/SendlerFiles/` + req.files.myFileCard.name);

        res.send(req.files.myFileCard.name); 
    }
   catch (e){
       console.log(e)
   }

});


router.post("/conclusComissionUpload", urlencodedParser, async function(req, res){
    let idOffers = req.body.idOffers;
   
try{

   fs.readdir(`${__dirname}/../files/offers/idOffers/id${idOffers}/`, function(err, dirRoot){  
           
       if(dirRoot.includes("conclusionCommission") == true){        //проверка на наличие папки conclusionCommission

           fs.readdir(`${__dirname}/../files/offers/idOffers/id${idOffers}/conclusionCommission`, function(err, dirCommission){ //!!!
              
              if(req.files != null){
                  
                req.files.fileConcCommission.mv(`${__dirname}/../files/offers/idOffers/id${idOffers}/conclusionCommission/`+req.files.fileConcCommission.name);
                res.send("Файл загружен")

              } else{
                res.send("Файл не выбран");   
              }
           })

       } else{
              res.send("Нет папки conclusionCommission")
       }
   })


} catch (e){
   console.log(e)
}
})

router.post("/fioSendler", urlencodedParser, async (req, res) => {
 
    const mysqlConfig = {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,

    }
   
    const pool = mysql.createPool(mysqlConfig);
     
        let tabNum = req.body.tabNum; 
        let sqlFioSend = await pool.execute(`SELECT fiofull FROM kadry_all WHERE tabnum="${tabNum}"`);
        let sqlEmailSend = await pool.execute(`SELECT email FROM users_emails WHERE tabnum="${tabNum}"`);
        let sqlFioSendIsi = await pool.execute(`SELECT surname, name, middlename, email, tabelNum, phoneNumber FROM offersworker WHERE tabelNum="${tabNum}"`);
       
        if(sqlFioSendIsi[0][0] != undefined){
            let arrayToStrings =[];
            arrayToStrings[1] = sqlFioSendIsi[0][0].name;
            arrayToStrings[0] = sqlFioSendIsi[0][0].surname;
            arrayToStrings[2] = sqlFioSendIsi[0][0].middlename;
            arrayToStrings[3] = sqlFioSendIsi[0][0].email;
            arrayToStrings[4] = sqlFioSendIsi[0][0].tabelNum;
            arrayToStrings[5] = sqlFioSendIsi[0][0].phoneNumber;
           
            res.send(arrayToStrings)
        } else{
            if(sqlFioSend[0][0] != undefined){
               
                if(sqlEmailSend[0][0] != undefined){
                    let arrayToStrings = sqlFioSend[0][0].fiofull.split(' ')
                    arrayToStrings.push(sqlEmailSend[0][0].email)
                    res.send(arrayToStrings)
                } else {
                    let arrayToStrings = sqlFioSend[0][0].fiofull.split(' ')
                   
                    res.send(arrayToStrings)
                }
               
            } else{
                res.send(["Имя", "Фамилия", "Отчество"])
            }
        }
        
       
      
  
})

router.post("/allAuthors", urlencodedParser, async (req, res) => {

    const mysqlConfig = {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,

    }
   
    const pool = mysql.createPool(mysqlConfig);

    console.log(req.body)

    let arrFio = []
    let idOffers = req.body.idOffers
    if (idOffers != undefined) {
        let sqlSendler = await pool.execute(`SELECT ow.name, ow.surname, ow.middlename, ow.tabelNum FROM offersworker as ow inner join offers as o on o.Id = '${idOffers}' where ow.tabelnum = o.tabelNum; `);

        let sqlCoAuthorTab = await pool.execute(`SELECT co_author_tabNum FROM senleradditional WHERE IdOffers=${idOffers}`)

        if (sqlSendler[0].length != 0) {
            let profit = await pool.query(`SELECT costOffers FROM cost_offers WHERE id_offers='${idOffers}' AND tabNum = '${sqlSendler[0][0].tabelNum}' AND actual = 0`)
            // console.log(profit[0])
            if (profit[0].length != 0) {
                sqlSendler[0][0].profit = profit[0][0].costOffers
            } else {
                sqlSendler[0][0].profit = "0"
            }
            console.log('sqlSendler[0][0]', sqlSendler[0][0])
            arrFio.push(sqlSendler[0][0])
        }

        for (let i = 0; i < sqlCoAuthorTab[0].length; i++) {

            if (sqlCoAuthorTab[0].length != 0) {
               

                let sqlCoAuthor = await pool.execute(`SELECT name, surname, middlename, tabelNum  FROM offersworker WHERE tabelnum=${sqlCoAuthorTab[0][i].co_author_tabNum}`)
                sqlCoAuthor[0][0].coAuthor = "Соавтор"
                let profit = await pool.query(`SELECT costOffers FROM cost_offers WHERE id_offers='${idOffers}' AND tabNum = '${sqlCoAuthorTab[0][i].co_author_tabNum}' AND actual = 0 `)

                if (profit[0].length != 0) {
                    sqlCoAuthor[0][0].profit = profit[0][0].costOffers
                } else {
                    sqlCoAuthor[0][0].profit = "0"
                }
                arrFio.push(sqlCoAuthor[0][0])

            }
            
        }
        res.send(arrFio)
        console.log(arrFio)
    } else {
        res.send("noData")
    }
pool.end()
})

router.post("/CostOffersSave", urlencodedParser, async (req, res) => {

    const mysqlConfig = {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,

    }
    const pool = mysql.createPool(mysqlConfig);

    let idOffers = req.body.idOffers;
    let tabNum = req.body.tabNum;
    let cost = req.body.cost;
    let date = moment().format('YYYY-DD-MM h:mm:ss')
    console.log(req.body)
    let checkProfit = await pool.query(`SELECT id, actual FROM cost_offers WHERE id_offers='${idOffers}' AND tabNum = '${tabNum}' `)

    if (checkProfit[0].length != 0) {

        try {

            for (let i = 0; i < Object.keys(checkProfit[0]).length; i++) {
                await pool.query(`UPDATE cost_offers SET actual = 1 WHERE  id = ("${checkProfit[0][i].id}") AND actual = 0`)
            }

        } catch (e) {
            console.log(e)
        }
        try {
            await pool.query(`INSERT INTO cost_offers (id_offers, tabNum, costOffers, dateProfit, actual) VALUES ('${idOffers}', '${tabNum}', '${cost}', '${date}', 0)`)
        } catch (e) {
            console.log(e)
        }

    } else {
        try {
            await pool.query(`INSERT INTO cost_offers (id_offers, tabNum, costOffers, dateProfit, actual) VALUES ('${idOffers}', '${tabNum}', '${cost}', '${date}', 0)`)
        } catch (e) {
            console.log(e)
        }
    }

pool.end()
    res.send("Суммы записаны")
})


module.exports = router
