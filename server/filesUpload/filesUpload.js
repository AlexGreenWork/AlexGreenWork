const mysql = require("mysql2/promise");
const express = require("express");
const fileUpload = require('express-fileupload');
const fs = require('fs'); 
const dataBaseConfig = require("../config/default.json")

const app = express();

app.use(fileUpload({}));
app.use(express.static('public'));

const pool = mysql.createPool({
    host: dataBaseConfig.database.host,
    user: dataBaseConfig.database.user,
    database: dataBaseConfig.database.database,
    password: dataBaseConfig.database.password,
});

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Methods', 'GET, POST ');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
});


async function sqlCheckLastEntry(){

    const sqlLstEntry = await pool.query("SELECT Id FROM offers WHERE id=(SELECT max(id) FROM offers);");

    return sqlLstEntry;

}
/*async function CheckLastEntry()*/
module.exports.CheckLastEntry = async function(){


    let lstEntry = await sqlCheckLastEntry();
   
    fs.stat(`../server/files/offers/idOffers/id${lstEntry[0][0].Id}`, function(err) {
        if (!err) {
           // console.log(`Директория id${lstEntry[0][0].Id} есть`);
        }
        else if (err.code === 'ENOENT') {
           // console.log('директории нет');
            fs.mkdir(`../server/files/offers/idOffers/id${lstEntry[0][0].Id}/SendlerFiles`, { recursive: true }, err => {
                if(err) throw err; // не удалось создать папку
               // console.log('Папка успешно создана');
                fs.readdir('../server/files/upload/', (err, files) => {
                    if(files){
                        let tempVar = files[0];
                        if(tempVar){
                            fs.rename(`../server/files/upload/${tempVar}`, `../server/files/offers/idOffers/id${lstEntry[0][0].Id}/SendlerFiles/${tempVar}`, err => {
    
                                console.log('Файл успешно записан');
                             });
                        }
                    } else{
                        console.log("folder not found")
                    }
                  
                  });
             });
                
        }
    });
     
}



// app.post('/upload', function(req, res) {
//
//     console.log(req.files);
//     req.files.myFile.mv('../server/files/upload/'+req.files.myFile.name);
//     res.end(req.files.myFile.name);
//     CheckLastEntry();
//
//
//
//   });
//

