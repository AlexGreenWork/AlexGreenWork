const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const fileController = require('../controllers/fileController')

router.use((req, res, next)=>{

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS ');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
})

router.post('', authMiddleware, fileController.createDir)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.post('/avatar', authMiddleware, fileController.uploadAvatar)
router.get('', authMiddleware, fileController.getFiles)
router.get('/download', authMiddleware, fileController.downloadFile)
router.get('/search', authMiddleware, fileController.searchFile)
router.delete('/', authMiddleware, fileController.deleteFile)
router.delete('/avatar', authMiddleware, fileController.deleteAvatar)



module.exports = router
