const Router = require("express");
const config = require("../config/default.json");
const mysql = require("mysql2/promise");
const router = new Router();
const fs = require('fs');
const fileUpload = require("express-fileupload");

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
            let selectOffers = await pool.execute(`SELECT * FROM offers`);
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
   
    let sqlMyOff = await pool.execute(`SELECT * FROM offers WHERE (tabelNum = ${tabelNumber} AND email = "${email}")`)
       
        
    return [sqlMyOff]

}

router.post("/selectMyOffers", urlencodedParser,
    async function (request, response) {

    let idOffers = request.body.selectOffers
    let sqlMyOff = await pool.execute(`SELECT * FROM offers WHERE Id = ${idOffers}`)
   // console.log(sqlMyOff[0])
    response.send(sqlMyOff[0][0])

})

router.post("/userInfo", urlencodedParser, async function (request, response) {

    let userTab = request.body.userTab;
    //console.log(request.body)

    let sqlKadry = await pool.execute(`SELECT * FROM kadry_all WHERE tabnum = ${userTab}`);
    let sqlDivision = await pool.execute(`SELECT * FROM division WHERE department = ${sqlKadry[0][0].department} AND id = ${sqlKadry[0][0].division}`);
    let sqlDepartament = await pool.execute(`SELECT * FROM department WHERE id = ${sqlKadry[0][0].department}`);
   // console.log(request.body);

    let reqJson = {

        department: sqlDepartament[0][0].fullname,
        division: sqlDivision[0][0].name,
        position: sqlKadry[0][0].profname

    }

    response.send(reqJson);


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
         await pool.query(`UPDATE offers SET view = ${view}, category = ${category}, status = ${status} WHERE  Id = (${id}) `);
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
       
       for(let i = 0 ; i < filesName.length; i++ ){
           
            if(filesName[i] == fileName ){

                let file = `${__dirname}/../files/offers/idOffers/id${idOffers}/SendlerFiles/${fileName}`;
            

                response.download(file); 
                
                
                break;
                
            } else{
                  if(filesName[i] == 'exit'){
                    response.send("Нет файла")
                  
                }
            }
    } 
} )
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

    } )


module.exports = router
