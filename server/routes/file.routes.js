const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const fileController = require('../controllers/fileController')
const mysql = require("mysql2/promise");
const dataBaseConfig = require("../config/default.json")
const urlencodedParser = Router.urlencoded({extended: false});

const fs = require('fs'); 
const fileUpload = require('express-fileupload');

router.use(fileUpload({}));
router.use(Router.static('public'));

const pool = mysql.createPool({
    host: dataBaseConfig.database.host,
    user: dataBaseConfig.database.user,
    database: dataBaseConfig.database.database,
    password: dataBaseConfig.database.password,
});

router.use((req, res, next)=>{
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
});

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
                             
                        }else if(dirRoot[i] == "SendlerFiles" ) {
                            arrAllFiles[dirRoot[i]]= {files}
                           
                        }
                     
                        if(dirRoot.length == 1){
                            res.send(arrAllFiles)
                        } else{
                            if(Object.keys(arrAllFiles).length  == dirRoot.length-1){
                              
                              //  setTimeout(()=>{res.send(arrAllFiles);} , 200)
                              res.send(arrAllFiles)
                            } else {
                                
                            }
                        }
                        
                      
                    })
                   }
               }             
        } )
      } catch (e){
        console.log(e)
     }

})

router.post("/FilesConclusionCommission", urlencodedParser,
    async function (request, response) {
        
        let idOffers = request.body.idOffers
       
      fs.readdir(`../server/files/offers/idOffers/id${idOffers}`, (err, folder) => {
     
            if(folder.includes("conclusionCommission") == false){
                
                fs.mkdir(`../server/files/offers/idOffers/id${idOffers}/conclusionCommission/`, { recursive: true }, err => {
                    if(err) throw err; // не удалось создать папки
                   // console.log(`Папка SendlerFiles внутри id${request.body.idOffers} создана `);

                    fs.readdir(`../server/files/offers/idOffers/id${idOffers}/conclusionCommission/`, (err, files) => {
                    
                        response.send(files)
                    })

                })

            } else {
                    let a = 0;
                for(let i = 0; i< folder.length; i++){
                              
                    if(folder[i] == `id${idOffers}`){
                    
                        
                        fs.readdir(`../server/files/offers/idOffers/id${idOffers}/`, (err, folder) => {
                        
                            if(folder[0] == "SendlerFiles"){
                             
                             fs.readdir(`../server/files/offers/idOffers/id${idOffers}/conclusionCommission/`, (err, files) => {
                                 
                                 response.send(files)
                             })
                               
                             i = folder.length
                               
                            } else {
                                   
                             fs.mkdir(`../server/files/offers/idOffers/id${idOffers}/conclusionCommission/`, { recursive: true }, err => {
                                 if(err) throw err; // не удалось создать папки
                                 //console.log(`Папка SendlerFiles внутри id${idOffers} создана `);
     
                                 fs.readdir(`../server/files/offers/idOffers/id${idOffers}/conclusionCommission/`, (err, files) => {
                                 
                                     response.send(files)
                                 })
     
                             })
                             i = folder.length
                            }
                        })
                       
        
                    } else {
                         a++;
                        if( a == folder.length){
                           
                            fs.mkdir(`../server/files/offers/idOffers/id${idOffers}/conclusionCommission/`, { recursive: true }, err => {
                                if(err) throw err; 
                                fs.readdir(`../server/files/offers/idOffers/id${idOffers}/conclusionCommission/`, (err, files) => {
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
router.post("/workData",  urlencodedParser, async function(req, res){

    let membCommision = req.body.tabNum;


    let sqlMembCommision = await pool.query(`SELECT * FROM kadry_all WHERE tabnum=${membCommision} `);

    let sqlDepartment = await pool.query(`SELECT * FROM department WHERE id=${sqlMembCommision[0][0].department} `);

    let sqlDivision = await pool.query(`SELECT * FROM division WHERE department=${sqlMembCommision[0][0].department} AND id=${sqlMembCommision[0][0].division}`);




    res.send([sqlMembCommision[0][0].fiofull, sqlDepartment[0][0].fullname, sqlDivision[0][0].name])
})


router.post("/myFilesWG", urlencodedParser,
    async function (req, res) {
       
        let tabResp = req.body.userTabelNum;

        let sqlOffResp = await pool.query(`SELECT offer_id  FROM offersresponsible WHERE responsible_tabnum=${tabResp} `);
    
        let files=[];
        let a =0
        for(let i = 0; i<sqlOffResp[0].length ; i++ ){
          
           
            let idOffers = sqlOffResp[0][i].offer_id;
           let dir = fs.readdirSync(`../server/files/offers/idOffers/id${idOffers}/responsible${tabResp}`);
           let sqlOffers = await pool.query(`SELECT Id , nameOffer  FROM offers WHERE Id=${idOffers} `);
           dir.push(sqlOffers[0][0].Id)
           dir.push(sqlOffers[0][0].nameOffer) //добавляем в конец списка название предложения и его id
           files[i] = dir;
         
      
                if(i == sqlOffResp[0].length-1){
                    a=1
                    res.send(files);
                }
    
        }
    
    })


module.exports = router
