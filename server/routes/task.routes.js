const Router = require("express");
const task_controller = require("../controllers/taskController")
const authMiddleware = require('../middleware/auth.middleware')
const router = new Router();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS ');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
})

router.post('/range', authMiddleware, task_controller.range);
router.post('/year', authMiddleware, task_controller.year);

module.exports = router;
