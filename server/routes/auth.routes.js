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
        try {
            const mysqlConfig = {
                host: config.database.host,
                user: config.database.user,
                password: config.database.password,
                database: config.database.database,

            }

            const connection = mysql.createPool(mysqlConfig);

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Не корректный запрос", errors})
            }

            const {name, surname, middlename, tabelNum, email, phoneNumber, password, fired, adminOptions} = req.body


            const candidate = await connection.query(`SELECT * FROM offersworker WHERE email = '${email}' OR tabelNum = '${tabelNum}' AND ${tabelNum}<>0`);


            console.log('Есть в базе? - ' + candidate[0][0])
            if (candidate[0][0]) {
                return res.status(400).json({message: `Пользователь с таким email: ${email} или табельным номером: ${tabelNum} уже существует`})
            }

            const hashPassword = await bcrypt.hash(password, 8)
            const user = ({
                name,
                surname,
                middlename,
                tabelNum,
                email,
                phoneNumber,
                password: hashPassword,
                fired,
                adminOptions
            })
            console.log(user)

            await connection.query('INSERT INTO offersworker SET ?', user, function (error, results, fields) {
                if (error) throw error;
                res.end(JSON.stringify(results));
            });

            return res.json({message: "Пользователь создан"})

        } catch (e) {
            console.log(e)
            res.send({message: "Ошибка сервера"})
        }
    })

router.post('/login',


    async (req, res) => {
        try {
            const mysqlConfig = {
                host: config.database.host,
                user: config.database.user,
                password: config.database.password,
                database: config.database.database,
            }

            const connection = mysql.createPool(mysqlConfig);

            const {email, tabelNum, password} = req.body
            const user = await connection.query(`SELECT * FROM offersworker WHERE email = '${email}' OR tabelNum = '${tabelNum}'`);


            if (!user[0][0]) {
                return res.status(404).json({message: "Пользователь не найден"})
            }

            const isPassValid = bcrypt.compareSync(password, user[0][0].password)

            if (!isPassValid) {
                return res.status(400).json({message: "Пароль не корректен"})
            }

            const token = jwt.sign({id: user[0][0].id}, conf.get("secretKey"), {expiresIn: "1h"})
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
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })
router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            //     const mysqlConfig = {
            //     host: config.database.host,
            //     user: config.database.user,
            //     password: config.database.password,
            //     database: config.database.database,
            // }
            //
            //     const connection = mysql.createPool(mysqlConfig);
            const user = await User.findOne({_id: req.user[0][0].id})
            // await connection.query(`SELECT * FROM offers WHERE id = req.user.id`);


            console.log('секция AUTH')
            console.log(user);
            const token = jwt.sign({id: user[0][0].id}, conf.get("secretKey"), {expiresIn: "10h"})
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
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })


router.post("/forms", urlencodedParser, async (request, response)=> {

    let firstName = request.body.firstName; // имя
    let middleName = request.body.middleName; // отчество
    let lastName = request.body.lastName; // фамилия
    let tabelNumber = request.body.tabelNumber;
    let phoneNumber = request.body.phoneNumber;
    let nameOffer = request.body.nameOffer;
    let emailInput = request.body.emailInput;
    let offer = request.body.offer;
    let problem = request.body.problem;
    const password1 = Math.random().toString(36).slice(-8);
    const hashPassword = await bcrypt.hash(password1, 8);
    const password = hashPassword;
    console.log(hashPassword)

    const mysqlConfig = {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,

    }
    const pool = mysql.createPool(mysqlConfig);


    async function Messages() {
        let message = await CheckUniqueTabAndEmail(tabelNumber, emailInput, phoneNumber);

        console.log("message = " + message)
        response.send(message);

    }

    Messages();

    async function CheckTabAndEmail(tabelNumber, emailInput) {

        const checkTab = await pool.execute(`SELECT * FROM offersworker WHERE tabelNum IN (${tabelNumber})`);
        const checkEmail = await pool.execute(`SELECT * FROM offersworker WHERE email IN ("${emailInput}")`);
        const updSendData = await pool.query(`UPDATE offersworker SET phoneNumber = ("${phoneNumber}") WHERE tabelNum = (${tabelNumber}) AND email = ("${emailInput}")`);

        return [checkTab, checkEmail, updSendData];

    }

    async function CheckUniqueTabAndEmail(tabelNumber, emailInput, phoneNumber) {
        var codes = await CheckTabAndEmail(tabelNumber, emailInput, phoneNumber);
        var tb = codes[0][0]; // первый елемент данные, второй это метаданные
        var eml = codes[1][0]; //второй sql запрос
        let upd = codes[2][0] // запрос обновления строки
        let messageSend = "";
        if (tb[0] != undefined || eml[0] != undefined) {
            console.log("Такой табельный или емейл уже зарегистрирован в системе");

            if (upd.changedRows != 0) { // запрос.количество затронутых строк
                messageSend = messageSend + "Такой пользователь уже зарегистрирован " + `${await InsertTabOffers(nameOffer, offer)}`;
            } else {

                console.log("данные пользователя не записаны");
                if (upd.affectedRows != 0) {

                    messageSend = messageSend + "Такой пользователь уже зарегистрирован " + `${await InsertTabOffers(nameOffer, offer)}`

                } else {

                    if (tabelNumber == 0) {

                        messageSend = messageSend + "Ваше предложение опубликовано";
                        
                        await pool.query(`INSERT INTO offersworker (name, middlename, surname, tabelNum, email, phoneNumber, password, adminOptions, date)` +
                            `VALUES("${firstName}", "${middleName}", "${lastName}", "${tabelNumber}", "${emailInput}", "${phoneNumber}", "${password}", "user", "${moment().format('YYYY-MM-DD')}")`);
                        console.log("Пользователь зарегистрирован");
                        await InsertTabOffers(nameOffer, offer)

                    } else {
                        console.log("email или табельный уже зарегистрирован");
                        messageSend = messageSend + "Не совпадение данных Email и табельного уже зарегистрированого пользователя";
                    }

                }

            }

            return messageSend;

        } else {

            console.log("Табельный и емейл отсуствует");

            await pool.query(`INSERT INTO offersworker (name, middlename, surname, tabelNum, email, phoneNumber, password, adminOptions, date)` +
                `VALUES("${firstName}", "${middleName}", "${lastName}", "${tabelNumber}", "${emailInput}", "${phoneNumber}", "${password}", "user", "${moment().format('YYYY-MM-DD')}" )`);
            console.log("Пользователь зарегистрирован");

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


            await pool.query(`INSERT INTO offers (nameSendler, surnameSendler, middlenameSendler, tabelNum, email, phoneNumber,` +
                `nameOffer, textOffer, descriptionProblem, date) VALUES ("${firstName}",  "${lastName}", "${middleName}", "${tabelNumber}",` +
                `"${emailInput}", "${phoneNumber}","${nameOffer}", "${offer}", "${problem}", "${moment().format('YYYY-MM-DD')}")`);
            console.log("Предложение добавлено")
            await uploadFile.CheckLastEntry();
            return "Предложение зарегистрировано";
        }

    }

   

});

router.post('/upload', function (req, res) {

    console.log("начало auth-rou upload")
    console.log(req.body)


    if (!req.files) {
        console.log("not file")
    } else {
        fs.readdir('../server/files/upload/', (err, files) => {     //очищаем папку загрузки перед загрузкой файла

            console.log('auth-rou : ' + files);
            console.log( files);
            if(files == null){
                console.log("file null")
            }

            for (let i = 0; i < files.length; i++) {


                fs.unlink(`../server/files/upload/${files[i]}`, err => {
                    if (err) throw err; // не удалось удалить файл
                    console.log('Файл успешно удалён');
                });

            }

        });
        console.log("перед записью")
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


module.exports = router
