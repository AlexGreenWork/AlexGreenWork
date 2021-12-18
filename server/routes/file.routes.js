const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const fileController = require('../controllers/fileController')
const mysql = require("mysql2/promise");
const fileUpload = require('express-fileupload');
const fs = require('fs'); 
const dataBaseConfig = require("../config/default.json")

router.use(fileUpload({}));
router.use(Router.static('public'));

const pool = mysql.createPool({
    host: dataBaseConfig.database.host,
    user: dataBaseConfig.database.user,
    database: dataBaseConfig.database.database,
    password: dataBaseConfig.database.password,
});

router.use((req, res, next)=>{
    res.header('Access-Control-Allow-Methods', 'GET, POST ');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
});

const urlencodedParser = Router.urlencoded({extended: false});

router.post('', authMiddleware, fileController.createDir)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.post('/avatar', authMiddleware, fileController.uploadAvatar)
router.get('', authMiddleware, fileController.getFiles)
router.get('/download', authMiddleware, fileController.downloadFile)
router.get('/search', authMiddleware, fileController.searchFile)
router.delete('/', authMiddleware, fileController.deleteFile)
router.delete('/avatar', authMiddleware, fileController.deleteAvatar)


router.post("/allFiles", urlencodedParser, async function(req, res){
    
        let arrAllFiles= {};  
       
        let idOffers = req.body.idOffers;
       // let membCommision = req.body.tabREsponsoble;
        try{
            fs.readdir(`${__dirname}/../files/offers/idOffers/id${idOffers}/`, function(err, dirRoot){
                
                 if(err){
                 res.send( "no such file or directory");
               } else {
                for(let i = 0; i <dirRoot.length; i++){
                                      
                    fs.readdir(`${__dirname}/../files/offers/idOffers/id${idOffers}/${dirRoot[i]}`, async function(err, files){
                      
                        if(dirRoot[i].slice(0, 11) == "responsible"){
                           
                            let docFiles = dirRoot[i].slice(11)
                            
                            let sqlMembCommision = await pool.query(`SELECT * FROM kadry_all WHERE tabnum=${docFiles} `);
                            let fioResp = sqlMembCommision[0][0].fiofull;
                            let sqlDepartment = await pool.query(`SELECT * FROM department WHERE id=${sqlMembCommision[0][0].department} `);
                          
                            let department = sqlDepartment[0][0].fullname
                            let sqlDivision = await pool.query(`SELECT * FROM division WHERE department=${sqlMembCommision[0][0].department} AND id=${sqlMembCommision[0][0].division}`);
                            
                            let division = sqlDivision[0][0].name;
                            
                            arrAllFiles[docFiles]= {files, fioResp, department, division }
                            
                        }else{
                            arrAllFiles[dirRoot[i]]= {files}
                        }
                     
                        if(i  == dirRoot.length-1){
                            
                            setTimeout(()=>{res.send(arrAllFiles); /* console.log("ответ сервера по поводу файлов ");  console.log(arrAllFiles) */ ; } , 200)
                            
                        } else {
                            
                        }
                      
                    })
                   }
               }             
        } )
      } catch (e){
        console.log(e)
     }

})

/* router.post("/responsible", urlencodedParser, async function(req, res){

    let membCommision = req.body.tabREsponsoble;
    console.log(req.body)
    let sqlMembCommision = await pool.query(`SELECT * FROM kadry_all WHERE tabnum=${membCommision} `);
    console.log(sqlMembCommision[0][0].fiofull);
    let sqlDepartment = await pool.query(`SELECT * FROM department WHERE id=${sqlMembCommision[0][0].department} `);
    console.log(sqlDepartment[0][0].fullname);
    let sqlDivision = await pool.query(`SELECT * FROM division WHERE department=${sqlMembCommision[0][0].department} AND id=${sqlMembCommision[0][0].division}`);
    console.log(sqlDivision[0][0]);
    console.log("ответ сервера по поводу членов ")
    res.send([sqlMembCommision[0][0].fiofull, sqlDepartment[0][0].fullname, sqlDivision[0][0].name])
}) */

module.exports = router
