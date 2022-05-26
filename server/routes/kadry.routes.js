const Router = require("express");
const config = require("../config/default.json");
const mysql = require("mysql2/promise");
const fs = require("fs");
const fileUpload = require('express-fileupload');

const router = new Router();


const urlencodedParser = Router.urlencoded({extended: false});
router.use(fileUpload({}));
router.use((req, res, next) => {

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,SET,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
})

router.post("/applicantsToDb", urlencodedParser,
    async function (request, response) {
        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);

        try {
            let surName = request.body.surName
            let name = request.body.name
            let middleName = request.body.middleName
            let speciality = request.body.spec
            let bDay = request.body.bDay
            let telNumber = request.body.telNumber
            let education = request.body.education
            let heldPosition1 = request.body.heldPosition1
            let heldPosition2 = request.body.heldPosition2
            let heldPosition3 = request.body.heldPosition3
            let email = request.body.email
            let worked = request.body.worked
            let currUser = request.body.currUser
            let questionnaire = request.body.fileFlag


            let sqlProv = await pool.query(`SELECT * FROM applicants WHERE telNumber='${telNumber}' OR email = '${email}' `)
console.log("результат запроса", sqlProv[0])
            if (sqlProv[0].length === 0) {
                console.log(Date(), `{пользователь ${currUser}}. Действие:`, "Запись соискателя: ", surName, name, middleName, speciality,questionnaire, bDay, telNumber, education, heldPosition1, heldPosition2, heldPosition3)
                await pool.query(`INSERT INTO applicants (surname, name, middleName, speciality,questionnaire, bday, telNumber , education, heldPosition1, heldPosition2, heldPosition3, email, workInBelaz ) VALUES 
                            ('${surName}','${name}' ,'${middleName}', '${speciality}', '${questionnaire}','${bDay}', '${telNumber}', '${education}','${heldPosition1}','${heldPosition2}','${heldPosition3}', '${email}', '${worked}')`);
                response.status(200).json({message: `Соискатель с фамилией ${surName} email: ${email} или телефонным номером: ${telNumber} добавлен`}).send()
            } else {
                console.log('\x1b[33m', Date(), '\x1b[1m', '\x1b[35m', `{пользователь ${currUser}}.`, '\x1b[22m', '\x1b[33m', `Действие: Запись Соискателя.`, '\x1b[31m', `ОШИБКА:`, '\x1b[33m', `Соискатель с фамилией ${surName} email: ${email} или телефонным номером: ${telNumber} уже существует`, '\x1b[0m')
                return response.status(400).json({message: `ОШИБКА: Соискатель с   email: ${email} или телефонным номером: ${telNumber} уже существует, проверьте вводимые данные`})
            }

        } catch (e) {
            console.log(e)
        }
        pool.end()

    })

router.post("/applicantsFromBd", urlencodedParser,
    async function (request, response) {

        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);


        let sqlReadApplicants = await pool.query(`SELECT * FROM applicants`)
        console.log(sqlReadApplicants[0])
        response.send(sqlReadApplicants[0]);
        pool.end()

    })

router.post("/UploadQuestionnaire", urlencodedParser,
    async function (req, res) {

        const mysqlConfig = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
        }

        const pool = mysql.createPool(mysqlConfig);
        let telNumber = req.body.telNumber;
        let email = req.body.email;
        console.log(req.body);
        // console.log(req.files.formData);
        try {
            let sqlProv = await pool.query(`SELECT * FROM applicants WHERE telNumber='${telNumber}' OR email = '${email}' `)

            // console.log(req.files)
            if (sqlProv[0].length === 0) {

                if (!req.files) {
                    return res.status(400).json({message: `файла анкеты нет`})
                }
                let file = req.files.formData
                let currUs = req.body.currUser
                console.log(telNumber)
                if (telNumber === '') {
                    return res.status(400).json({message: `Заполните телефон`})
                } else {
                    try {
                        await fs.promises.access(`../server/files/kadry/QuestionnaireApplicants/pdf/`);

                        console.log("папка существует")
                        fs.mkdir(`../server/files/kadry/QuestionnaireApplicants/pdf`, {recursive: true}, err => {
                            if (req.files != null) {
                                file.mv(`../server/files/kadry/QuestionnaireApplicants/pdf/` + telNumber + `.` + file.name.split(".").slice(-1));
                            }
                            console.log(Date(), `{пользователь ${currUs}}. Действие:`, `Добавление анкеты соискателя:${telNumber}`)
                        })
                        return res.status(200).json({message: `Файл анкеты загружен`})

                    } catch (error) {
                        console.log("папка не существует")
                        fs.mkdir(`../server/files/kadry/QuestionnaireApplicants/pdf`, {recursive: true}, err => {
                            if (req.files != null) {
                                file.mv(`../server/files/kadry/QuestionnaireApplicants/pdf/` + telNumber + `.` + file.name.split(".").slice(-1));
                                console.log(Date(), `{пользователь ${currUs}}. Действие:`, "Добавление файла анкеты соискателя:${telNumber} ")
                            }
                            return res.status(200).json({message: `Файл анкеты загружен 1`})
                        })
                    }
                }

            }else{
                return res.status(400).json({message: `ОШИБКА: Соискатель с   email: ${email} или телефонным номером: ${telNumber} уже существует`})
            }


        } catch (e) {
            console.log(e)
        }
    })


module.exports = router
