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
        let countResponse = 0;
        let idOffers = req.body.idOffers;
       // let membCommision = req.body.tabREsponsoble;
        try{
            
            fs.readdir(`${__dirname}/../files/offers/idOffers/id${idOffers}/`, function(err, dirRoot){
                let countResponsible = 0;
                
                for(let i = 0; i <dirRoot.length; i++){
                    if(dirRoot[i].slice(0, 11) == "responsible" || dirRoot[i] == "SendlerFiles" || dirRoot[i] == "ResponsibleRg"){
                       
                        countResponsible++

                    }
                }
                
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
                           // countResponsible++
                            arrAllFiles[dirRoot[i]]= {files}
                           
                        } else  if(dirRoot[i] == "ResponsibleRg"){
                            
                         
                            fs.readdir(`${__dirname}/../files/offers/idOffers/id${idOffers}/${dirRoot[i]}`, async function(err, dirRg){
                             
                                if(dirRg.length != 0){
                                  //  countResponsible++;
                                   
                                    fs.readdir(`${__dirname}/../files/offers/idOffers/id${idOffers}/${dirRoot[i]}/${dirRg[0]}`, async function(err, dirRgTab){
                                        //       console.log('dirRgTab', dirRgTab);
                                               let docFiles = dirRg[0]
                                       
                                               let sqlMembCommision = await pool.query(`SELECT * FROM kadry_all WHERE tabnum=${docFiles} `);
                                               let fioResp = sqlMembCommision[0][0].fiofull;
                                               let sqlDepartment = await pool.query(`SELECT * FROM department WHERE id=${sqlMembCommision[0][0].department} `);
                                             
                                               let department = sqlDepartment[0][0].fullname
                                             
                                               let sqlDivision = await pool.query(`SELECT * FROM division WHERE department=${sqlMembCommision[0][0].department} AND id=${sqlMembCommision[0][0].division}`);
                                               let files = dirRgTab;
                                            
                                               let division = null/* sqlDivision[0][0].name */;
                                               
                                               arrAllFiles[docFiles+"R"]= {files, fioResp, department, division }
           
                                               if(countResponsible == Object.keys(arrAllFiles).length){
                                               
                                                   res.send(arrAllFiles)
                                               }
                                           })
                                } else{
                                    countResponsible--
                                  
                                    if(countResponsible  == Object.keys(arrAllFiles).length){
                                       
                                        res.send(arrAllFiles)
                                    }
                                }
                               
                                
                            })
                        }
                      //  console.log('dirRoot[i]', dirRoot[i])
                       
                        
                     //  console.log(arrAllFiles)
                        
                       /*  console.log(i)
                        console.log(dirRoot) */
                     /*    if(dirRoot.length == 1 && dirRoot[i] == "SendlerFiles"){ //если есть только SendlerFiles
                            res.send(arrAllFiles)
                        }

                        if(dirRoot.length == 2  && dirRoot[i] == "SendlerFiles"){ // если есть  SendlerFiles и ResponsibleRG
                           
                            res.send(arrAllFiles)
                        } else{
                            console.log(Object.keys(arrAllFiles).length)
                            console.log("Object.keys(arrAllFiles).length")
                            console.log(dirRoot.length, "dirRoot.length" )
                            console.log(Object.keys(arrAllFiles).length == dirRoot.length-2, "Object.keys(arrAllFiles).length == dirRoot.length-2" )
                            if( Object.keys(arrAllFiles).length == dirRoot.length-1 && Object.keys(arrAllFiles).length > 0 || Object.keys(arrAllFiles).length == dirRoot.length-2 && Object.keys(arrAllFiles).length > 0){ // -1 для и -2 для игнорирования conclusionCommission и responsible12345
                               
                                console.log("Ответ" , arrAllFiles)
                                console.log(Object.keys(arrAllFiles).length)
                               console.log(dirRoot.length-1)
                              //  setTimeout(()=>{res.send(arrAllFiles);} , 200)
                              res.send(arrAllFiles)
                            } else {
                                
                            }
                        } */
                      
                        if(countResponsible == Object.keys(arrAllFiles).length && Object.keys(arrAllFiles).length != 0 && countResponse == 0){
                            countResponse++
                           return res.send(arrAllFiles)
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
          
          fs.stat(`../server/files/offers/idOffers/id${idOffers}/responsible${tabResp}` , async (err, folder)=>{
         
            if(err != undefined){
                console.log("Нет папки responsible"+tabResp+" в предложении "+idOffers)
            } else {
                
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
       
    
        }
    
    })


    router.post("/FilesRespRg", urlencodedParser,
    async function (request, response) {
       
        let idOffers = request.body.idOffers;
        let tabelNum = request.body.tabelNum;
      
      fs.readdir(`../server/files/offers/idOffers/id${idOffers}`, (err, folder) => {
          
            if(folder.includes("ResponsibleRg") == false){
                
                fs.mkdir(`../server/files/offers/idOffers/id${idOffers}/ResponsibleRg/`, { recursive: true }, err => {
                    if(err) throw err; // не удалось создать папки
                  
                    fs.readdir(`../server/files/offers/idOffers/id${idOffers}/ResponsibleRg/`, (err, folderResp) => {
                        
                        if(folderResp.includes(`${tabelNum}`) == false){
                           
                            fs.mkdir(`../server/files/offers/idOffers/id${idOffers}/ResponsibleRg/${tabelNum}`, { recursive: true }, err => {
                                if(err) throw err; // не удалось создать папки
                                if(request.files != null){
                                    request.files.myFileCard.mv(`../server/files/offers/idOffers/id${idOffers}/ResponsibleRg/${tabelNum}/` + request.files.myFileCard.name);
                                }
                               

                                fs.readdir(`../server/files/offers/idOffers/id${idOffers}/ResponsibleRg/${tabelNum}`, (err, folderRespTab) => {
                                    console.log(folderRespTab)
                                    response.send(folderRespTab)
                                })
                            })
                        }

                        
                    })

                })

            } else {

                fs.readdir(`../server/files/offers/idOffers/id${idOffers}/ResponsibleRg/`, (err, folder) => {
                    
                    if(folder.includes(`${tabelNum}`) == false){

                        fs.mkdir(`../server/files/offers/idOffers/id${idOffers}/ResponsibleRg/${tabelNum}`, { recursive: true }, err => {

                            if(request.files != null){
                                request.files.myFileCard.mv(`../server/files/offers/idOffers/id${idOffers}/ResponsibleRg/${tabelNum}/` + request.files.myFileCard.name);
                            }
                           
                            fs.readdir(`../server/files/offers/idOffers/id${idOffers}/ResponsibleRg/${tabelNum}`, (err, folderRespTab) => {
                                
                                response.send(folderRespTab)
                            })
                        })
                    } else {

                        if(request.files != null){
                            request.files.myFileCard.mv(`../server/files/offers/idOffers/id${idOffers}/ResponsibleRg/${tabelNum}/` + request.files.myFileCard.name);
                        }
                       
                       
                        fs.readdir(`../server/files/offers/idOffers/id${idOffers}/ResponsibleRg/${tabelNum}`, (err, folderRespTab) => {
                          
                            response.send(folderRespTab)
                        })
                    }
                })
       
            }
        })
    })

    router.post("/FilesListRespRg", urlencodedParser,
    async function (req, res) {

        let idOffers = req.body.idOffers;
        let tabelNum = req.body.tabelNum;

        fs.readdir(`../server/files/offers/idOffers/id${idOffers}/ResponsibleRg/${tabelNum}`, (err, folder) => {
           
            res.send(folder)
        })
    })


    router.post("/FilesResponsible", urlencodedParser,
    async function (request, response) {
       
        let idOffers = request.body.idOffers;
        let tabelNum = request.body.tabelNum;
      
      fs.readdir(`../server/files/offers/idOffers/id${idOffers}`, (err, folder) => {
          
            if(folder.includes(`responsible${tabelNum}`) == false){
                
                fs.mkdir(`../server/files/offers/idOffers/id${idOffers}/responsible${tabelNum}`, { recursive: true }, err => {
                    if(err) throw err; // не удалось создать папки
                    
                    if(request.files != null){
                        request.files.myFileResp.mv(`../server/files/offers/idOffers/id${idOffers}/responsible${tabelNum}/` + request.files.myFileResp.name);
                        response.send("upload File")
                    }
                   
                    
                })

            } else {

                if(request.files != null){
                    request.files.myFileResp.mv(`../server/files/offers/idOffers/id${idOffers}/responsible${tabelNum}/` + request.files.myFileResp.name);
                    response.send("upload File")
                }
       
            }
        })
    })

    router.post("/FilesListResponsible", urlencodedParser,
    async function (req, res) {

        let idOffers = req.body.idOffers;
        let tabelNum = req.body.tabelNum;

        fs.readdir(`../server/files/offers/idOffers/id${idOffers}/responsible${tabelNum}/`, (err, folder) => {
           
            res.send(folder)
        })
    })


    router.post("/StatementFileUpload", urlencodedParser,
    async function (req, res) {

        let idOffers = req.body.idOffers;
      

        fs.readdir(`../server/files/offers/idOffers/id${idOffers}`, (err, folder) => {
            if(folder.includes(`StatementFile`) == false){
              

                fs.mkdir(`../server/files/offers/idOffers/id${idOffers}/StatementFile`, { recursive: true }, err => {
                   

                    if(req.files != null){
                        req.files.StatementFile.mv(`../server/files/offers/idOffers/id${idOffers}/StatementFile/` + req.files.StatementFile.name);
                        res.send("upload File")
                    }
                })
            } else {
                if(req.files != null){
                    req.files.StatementFile.mv(`../server/files/offers/idOffers/id${idOffers}/StatementFile/` + req.files.StatementFile.name);
                    res.send("upload File")
                }
            }
          
        })
    })

    router.post("/StatementFileList", urlencodedParser,
    async function (req, res) {
        let idOffers = req.body.idOffers;

        fs.readdir(`../server/files/offers/idOffers/id${idOffers}`, (err, folder) => {
            if(folder.includes(`StatementFile`) == false){
                res.send("null files")
            } else{
                fs.readdir(`../server/files/offers/idOffers/id${idOffers}/StatementFile/`, (err, folder) => {
                        res.send(folder) 
                }
                )
            }

    })
})

router.post("/publicServices", urlencodedParser,
async function (req, res) {
  
    const pool = mysql.createPool({
    host: dataBaseConfig.database.host,
    user: dataBaseConfig.database.user,
    database: dataBaseConfig.database.database,
    password: dataBaseConfig.database.password,
});
   let matobozk = await pool.query("SELECT * FROM matobozk ")
   // let shifrzat = await pool.query("SELECT zatrname FROM shifrzat ")
    let matoboz = await pool.query("SELECT * FROM matoboz ")
   res.send(matobozk[0].concat(matoboz[0]))
   pool.end()
})

    
module.exports = router
