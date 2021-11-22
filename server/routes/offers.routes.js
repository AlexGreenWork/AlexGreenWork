const Router = require("express");
const config = require("../config/default.json");
const mysql = require("mysql2/promise");
const router = new Router();

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

router.post("/myOffers", function(request, response) {
    const mysqlConfig = {
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
    }

    const pool = mysql.createPool(mysqlConfig);


    async function sqlSelectOffers() {
        let selectOffers = await pool.execute(`SELECT * FROM offers WHERE tabelNum = ${tabelNum}`);
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify(selectOffers[0], null, 3));


    }

    sqlSelectOffers();

});

module.exports = router
