const Router = require("express");
const config = require("../config/default.json");
const mysql = require("mysql2/promise");
const router = new Router();
const fs = require('fs');
const fileUpload = require('express-fileupload');
router.use(fileUpload({}));

const urlencodedParser = Router.urlencoded({ extended: false });

router.use((req, res, next) => {

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
})

const mysqlConfig = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
}


router.post("/usersRegistration", urlencodedParser,
    async function (request, response) {
        const arrMonth = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        const pool = mysql.createPool(mysqlConfig);
        let sqlRegiterUser = await pool.query('SELECT date FROM `offersworker` WHERE date  >= MAKEDATE(year(now()),1)')
        let sqlOffers = await pool.query('SELECT date FROM `offers` WHERE date  >= MAKEDATE(year(now()),1)')

        let arrMonthSql = []
        let arrMonthRepeat = []
        let arrMonthOffers = []
        let arrMonthOffersRepeat = []
        for (let i = 0; i < sqlRegiterUser[0].length; i++) {

            arrMonthSql.push(sqlRegiterUser[0][i].date.getMonth() + 1)
        }

        for (let i = 0; i < sqlOffers[0].length; i++) {

            arrMonthOffers.push(sqlOffers[0][i].date.getMonth() + 1)
        }

        for (let i = 0; i < arrMonth.length; i++) {
            let repeat = 0
            for (let j = 0; j < arrMonthSql.length; j++) {
                if (arrMonth[i] === arrMonthSql[j]) {
                    repeat++
                }
            }
            arrMonthRepeat.push(repeat)
        }

        for (let i = 0; i < arrMonth.length; i++) {
            let repeat = 0
            for (let j = 0; j < arrMonthOffers.length; j++) {
                if (arrMonth[i] === arrMonthOffers[j]) {
                    repeat++
                }
            }
            arrMonthOffersRepeat.push(repeat)
        }

        let date = new Date()
        let data_1 = {                                               //количество зарегистрированных пользователей
            value_x: arrMonth.slice(0, date.getMonth() + 2),
            value_y: arrMonthRepeat.slice(0, date.getMonth() + 2),
            color: "#37d853",
            dataName: "Пользователей зарегестрировано"
        }
        let data_2 = {                                               //количество gjlfyys[ ghtlkj;rybq]
            value_x: arrMonth.slice(0, date.getMonth() + 2),
            value_y: arrMonthOffersRepeat.slice(0, date.getMonth() + 2),
            color: "#524dd9",
            dataName: "Подано предложений"
        }
        let responseData = { data_1, data_2 };
        response.send(responseData)
        pool.end();

    })


router.post("/personnelStream", urlencodedParser,
    async function (request, response) {
        const pool = mysql.createPool(mysqlConfig);
        let date = new Date()
        let month = date.getMonth()
        let arrMonth = [0]
        let dataPersonal = {};
        let sqlDissmis = await pool.query('SELECT datedisc FROM `kadryuk` WHERE datedisc  >= MAKEDATE(year(now()),1)')
        let sqlGotJob = await pool.query('SELECT ADMITD FROM `kadryok` WHERE ADMITD  >= MAKEDATE(year(now()),1)')
        //  let sqlDecReg = await pool.query(`SELECT ADMITD FROM kadry_ok WHERE ADMITD >= '${date.getFullYear()-1}-12-01'  AND ADMITD  <= '${date.getFullYear()}-01-01'`)
        //  let sqlDissmisDec = await pool.query(`SELECT datedisc FROM kadryuk WHERE datedisc  >= '${date.getFullYear()-1}-12-01'  AND datedisc  <= '${date.getFullYear()}-01-01'`)
        let sqlAllJob = await pool.query('SELECT COUNT(*) FROM `kadryok`')
        pool.end()
      
        let arrDiss = [0]
        let arrGotJob = [0]

        pool.end()

        for (let i = 0; i <= date.getMonth(); i++) {
            arrMonth.push(i + 1)
            let countMonthDiss = 0;

            for (let j = 0; j < sqlDissmis[0].length; j++) {

                let monthElem = sqlDissmis[0][j].datedisc.getMonth()

                if (monthElem == i) {
                    countMonthDiss++
                }
            }
            arrDiss.push(countMonthDiss)
        }

        for (let i = 0; i <= date.getMonth(); i++) {
            // arrMonth.push(i + 1)
            let countMonthGot = 0;

            for (let j = 0; j < sqlGotJob[0].length; j++) {

                let monthElem = sqlGotJob[0][j].ADMITD.getMonth()

                if (monthElem == i) {
                    countMonthGot++
                }
            }
            arrGotJob.push(countMonthGot)
        }
      
        dataPersonal['data1'] = {
            dataName: "Уволено:",
            value_x: arrMonth,
            value_y: arrDiss,
            color: "green"
        }

        dataPersonal['data2'] = {
            dataName: "Трудоустроено:",
            value_x: arrMonth,
            value_y: arrGotJob,
            color: "green"
        }
      let objResp = {all: String(sqlAllJob[0][0]["COUNT(*)"]), dataPersonal }
        response.send(dataPersonal)
    })

    router.post("/personnelAll", urlencodedParser,
    async function (request, response) {
        const pool = mysql.createPool(mysqlConfig);
        let sqlAllJob = await pool.query('SELECT COUNT(*) FROM `kadryok`')
        pool.end()
        let resp = String(sqlAllJob[0][0]["COUNT(*)"])
     
        response.send(resp)

    })
// router.post("/personnelStream", urlencodedParser,
//     async function (request, response) {
//         const pool = mysql.createPool(mysqlConfig);
//         let dataPersonalAll = {}
//         readGotJob()

//         function readGotJob() {
//             let gotJobMonth = [0];
//             let desmissedMonth = [0]
//             let date = new Date();
//             let month = [0];
//             let dataPersonal = {}

//             if ( Object.keys(dataPersonalAll).length == 0) {
//                 fs.readFile('../server/files/stat/gotJob.txt', 'utf8', (err, content) => {
//                     if (content.length == 0) {
//                         gotJobPrsonal()

//                         return readGotJob()

//                     } else {
//                         gotJobMonth = JSON.parse(content).gotJobMonth
//                         gotJobMonth.unshift(0)
//                         for(let i = 0; i < date.getMonth()+1; i++){
//                             month.push(i+1)
//                         }
//                         dataPersonal['data1'] =  {
//                             dataName: "Трудоустроено",
//                             value_x: month,
//                             value_y: gotJobMonth,
//                             color: "green"
//                         }

//                     }

//                     fs.readFile('../server/files/stat/dismiss.txt', 'utf8', (err, content) => {
//                         if (content.length == 0) {
//                             personnelStreamDismissed()

//                             return readGotJob()

//                         } else {
//                             desmissedMonth = JSON.parse(content).desmissedMonth
//                             desmissedMonth.unshift(0)

//                             console.log( month)

//                             dataPersonal['data2'] =  {
//                                 dataName: "Уволено:",
//                                 value_x: month,
//                                 value_y: desmissedMonth,
//                                 color: "green"
//                             }
//                             // response.send(data)
//                             dataPersonalAll = dataPersonal
//                         }

//                         return readGotJob()
//                     })

//                 })

//             }
//             console.log("2", dataPersonalAll)
//                 if ( Object.keys(dataPersonalAll).length != 0) {
//                     response.send(dataPersonalAll);

//                 }
//         }



//         //  response.send('ok');
//         pool.end();
//     })


//     async function actualPersonal() {
//         const pool = mysql.createPool(mysqlConfig);
//         let sqlRegiterUser = await pool.query('SELECT count(*) FROM kadryok ');

//         pool.end();
//         return sqlRegiterUser[0][0]['count(*)']
//     }

//     async function gotJobPrsonal() {

//         let sqlaActualPersonal = await actualPersonal()
//         let date = new Date()
//         let month = date.getMonth()
//         let contentGotJob = { gotJobMonth: [], gotJobAll: [] };

//         fs.readdir(`../server/files/stat/`, (err, folder) => {
//             if (err) console.log(err);

//             fs.readFile('../server/files/stat/' + folder[1], 'utf8', async (err, content) => {
//                 if (err) console.log(err);

//                 try {
//                     content.length != 0 ? contentGotJob = JSON.parse(content) : contentGotJob = contentGotJob
//                 } catch (e) {

//                     fs.readFile('../server/files/stat/gotJob.txt', 'utf8', async (err, content) => {

//                     })
//                 }

//                 if (month == 0) {

//                     contentGotJob.gotJobAll.length == 0 ? contentGotJob.gotJobAll.push([sqlaActualPersonal, sqlaActualPersonal]) : contentGotJob.gotJobAll[month] = [contentGotJob.gotJobAll[month][0], sqlaActualPersonal]
//                     contentGotJob.gotJobMonth.length == 0 ? contentGotJob.gotJobMonth.push(contentGotJob.gotJobAll[month][1] - contentGotJob.gotJobAll[month][0]) : contentGotJob.gotJobMonth[month] = contentGotJob.gotJobAll[month][1] - contentGotJob.gotJobAll[month][0]
//                     fs.writeFile('../server/files/stat/' + folder[1], JSON.stringify(contentGotJob), function (error) { })

//                 }

//                 if (contentGotJob.gotJobAll.length < month || content.length == 0) {
//                     for (let i = 0; i < month - contentGotJob.gotJobAll.length; i++) {
//                         content.length == 0 ? contentGotJob.gotJobAll.push([sqlaActualPersonal, sqlaActualPersonal]) : contentGotJob.gotJobAll.push([contentGotJob.gotJobAll[contentGotJob.gotJobAll.length - 1][1], sqlaActualPersonal])
//                         let arrMonthDes = contentGotJob.gotJobAll[contentGotJob.gotJobAll.length - 1]
//                         contentGotJob.gotJobMonth.push(arrMonthDes[1] - arrMonthDes[0])
//                     }

//                     fs.writeFile('../server/files/stat/' + folder[1], JSON.stringify(contentGotJob), function (error) { })
//                     return gotJobPrsonal();
//                 }


//                 let gotJobAll = contentGotJob.gotJobAll;

//                 if (gotJobAll.length == month + 1) 
//                 {
//                     month == -1 ? gotJobAll[month] = [gotJobAll[month][1], sqlaActualPersonal] : gotJobAll[month] = [gotJobAll[month - 1][1], sqlaActualPersonal]
//                     contentGotJob.gotJobAll = gotJobAll
//                     let arrMonthGot = contentGotJob.gotJobAll[contentGotJob.gotJobAll.length - 1]
//                     contentGotJob.gotJobMonth[month] = arrMonthGot[1] - arrMonthGot[0]
//                     fs.writeFile('../server/files/stat/' + folder[1], JSON.stringify(contentGotJob), function (error) { })
//                 } else if (gotJobAll.length < month + 1) 
//                 {
//                     gotJobAll.push([gotJobAll[month - 1][1], sqlaActualPersonal])
//                     contentGotJob.gotJobAll = gotJobAll
//                     fs.writeFile('../server/files/stat/' + folder[1], JSON.stringify(contentGotJob), function (error) { })
//                     return gotJobPrsonal();
//                 }

//             })
//         })

//     }


//     async function dismissedPersonal() {
//         const pool = mysql.createPool(mysqlConfig);
//         let sqlRegiterUser = await pool.query('SELECT count(*) FROM kadry_all WHERE deleted = 1');
//         pool.end();
//         return sqlRegiterUser[0][0]['count(*)']
//     }

//     async function personnelStreamDismissed() {
//         let sqlDismissedPersonal = await dismissedPersonal()
//         let date = new Date()
//         let month = date.getMonth()
//         let contentDesmisssed = { desmissedMonth: [], desmissedAll: [] };
//         fs.readdir(`../server/files/stat/`, (err, folder) => {
//             if (err) console.log(err);
//             fs.readFile('../server/files/stat/' + folder[0], 'utf8', async (err, content) => {

//                 if (err) console.log(err);

//                 content.length != 0 ? contentDesmisssed = JSON.parse(content) : contentDesmisssed = contentDesmisssed
//                 if (month == 0) {
//                     contentDesmisssed.desmissedAll.length == 0 ? contentDesmisssed.desmissedAll.push([sqlDismissedPersonal, sqlDismissedPersonal]) : contentDesmisssed.desmissedAll[month] = [contentDesmisssed.desmissedAll[month][0], sqlDismissedPersonal]
//                     contentDesmisssed.desmissedMonth.length == 0 ? contentDesmisssed.desmissedMonth.push(contentDesmisssed.desmissedAll[month][1] - contentDesmisssed.desmissedAll[month][0]) : contentDesmisssed.desmissedMonth[month] = contentDesmisssed.desmissedAll[month][1] - contentDesmisssed.desmissedAll[month][0]
//                     fs.writeFile('../server/files/stat/' + folder[0], JSON.stringify(contentDesmisssed), function (error) { })
//                     //  return personnelStream();
//                 }
//                 // console.log(contentDesmisssed.desmissedAll.length)
//                 if (contentDesmisssed.desmissedAll.length < month || content.length == 0) {
//                     for (let i = 0; i < month - contentDesmisssed.desmissedAll.length; i++) {
//                         content.length == 0 ? contentDesmisssed.desmissedAll.push([sqlDismissedPersonal, sqlDismissedPersonal]) : contentDesmisssed.desmissedAll.push([contentDesmisssed.desmissedAll[contentDesmisssed.desmissedAll.length - 1][1], sqlDismissedPersonal])
//                         let arrMonthDes = contentDesmisssed.desmissedAll[contentDesmisssed.desmissedAll.length - 1]
//                         contentDesmisssed.desmissedMonth.push(arrMonthDes[1] - arrMonthDes[0])
//                     }
//                     fs.writeFile('../server/files/stat/' + folder[0], JSON.stringify(contentDesmisssed), function (error) { })

//                     return personnelStreamDismissed();
//                 }

//                 let desmissedMonth = contentDesmisssed.desmissedMonth;
//                 let desmissedAll = contentDesmisssed.desmissedAll;


//                 if (desmissedAll.length == month + 1) {  //первое значение это значение обновление в году

//                     month == 0 ? desmissedAll[month] = [desmissedAll[month][1], sqlDismissedPersonal] : desmissedAll[month] = [desmissedAll[month - 1][1], sqlDismissedPersonal]

//                     contentDesmisssed.desmissedAll = desmissedAll
//                     let arrMonthDes = contentDesmisssed.desmissedAll[contentDesmisssed.desmissedAll.length - 1]
//                     contentDesmisssed.desmissedMonth[month] = arrMonthDes[1] - arrMonthDes[0]
//                     fs.writeFile('../server/files/stat/' + folder[0], JSON.stringify(contentDesmisssed), function (error) {
//                     })
//                 } else if (desmissedAll.length < month + 1) {

//                     desmissedAll.push([desmissedAll[month - 1][1], sqlDismissedPersonal])
//                     contentDesmisssed.desmissedAll = desmissedAll
//                     fs.writeFile('../server/files/stat/' + folder[0], JSON.stringify(contentDesmisssed), function (error) {
//                     })
//                     return personnelStreamDismissed();
//                 }
//             })
//         })

//     }
// function CheckFilesStat(){

//     fs.readdir(`../server/files/`, (err, folder) => {
//         if(err) console.log(err);
//       if( folder.includes("stat") == false){
//         fs.mkdir('../server/files/stat', err => {
//             if(err) throw err; // не удалось создать папку
//             console.log('Папка успешно создана');
//             fs.writeFile("../server/files/stat/dismiss.txt", '',function(err){
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log("Файл создан");
//                 }
//             });
//             fs.writeFile("../server/files/stat/gotJob.txt", '', function(err){
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log("Файл создан");
//                 }
//             });

//          });
//       }  else {
//         fs.readdir(`../server/files/stat`, (err, folderStat) => {

//             if( folderStat.includes("dismiss.txt") == false){
//                 fs.writeFile("../server/files/stat/dismiss.txt", '',function(err){
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log("Файл создан");
//                     }
//                 });
//             }

//             if( folderStat.includes("gotJob.txt") == false){
//                 fs.writeFile("../server/files/stat/gotJob.txt", '',function(err){
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log("Файл создан");
//                     }
//                 });
//             }
//         } )

//       }
//     })

// }
//     setInterval(()=>{CheckFilesStat(); personnelStreamDismissed(); gotJobPrsonal();}, 10000)
module.exports = router