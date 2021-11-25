const Router = require("express");
const config = require("../config/default.json");
const mysql = require("mysql2/promise");
const router = new Router();

const urlencodedParser = Router.urlencoded({ extended: false });

const mysqlConfig = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
}

const pool = mysql.createPool(mysqlConfig);

router.use((req, res, next)=>{

    res.header('Access-Control-Allow-Methods', 'GET, POST ');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
})
router.get("/allOffers", function(request, response) {
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



router.post("/myOffers", urlencodedParser, async function(request, response){

    let firstName = request.body.firstName; // имя
    let middleName = request.body.middleName; // отчество
    let surname = request.body.userSurName; // фамилия
    let tabelNumber = request.body.tabelNumber;;
    let phoneNumber = request.body.phoneNumber;
    let email = request.body.email;
    let sqlResult =  await sqlMyOffers(tabelNumber, email, firstName, middleName, surname, phoneNumber)
  
    response.send(sqlResult[0][0])


})
async function sqlMyOffers(tabelNumber, email, firstName, middleName, surname, phoneNumber){
    
   // checkTab = await pool.execute(`SELECT * FROM offersworker WHERE tabelNum IN (${tabelNumber})`);

    let sqlMyOff = await pool.execute(`SELECT * FROM offers WHERE (tabelNum = ${tabelNumber} AND email = "${email}")`+
    `OR (nameSendler = "${firstName}" AND surnameSendler = "${surname}" AND middlenameSendler ="${middleName}" AND tabelNum = ${tabelNumber} `+
     `AND phoneNumber =  ${phoneNumber}  )`)

     return [sqlMyOff]

}

router.post("/selectMyOffers", urlencodedParser, async function(request, response){

 let idOffers = request.body.selectOffers
 let sqlMyOff = await pool.execute(`SELECT * FROM offers WHERE Id = ${idOffers}`)
    console.log(request.body)
 response.send(sqlMyOff[0][0])
 
})

router.post("/userInfo", urlencodedParser, async function(request, response){

    let userTab = request.body.userTab;
    console.log(request.body)
   
        let sqlKadry = await pool.execute(`SELECT * FROM kadry_all WHERE tabnum = ${userTab}`);
        let sqlDivision = await pool.execute(`SELECT * FROM division WHERE department = ${sqlKadry[0][0].department} AND id = ${sqlKadry[0][0].division}`);
        let sqlDepartament = await pool.execute(`SELECT * FROM department WHERE id = ${sqlKadry[0][0].department}`);
           console.log(request.body);
    
      let reqJson = {
        
        department: sqlDepartament[0][0].fullname,
        division: sqlDivision[0][0].name,
        position: sqlKadry[0][0].profname
    
      }
     
      response.send(reqJson);
    
    
   })





module.exports = router
