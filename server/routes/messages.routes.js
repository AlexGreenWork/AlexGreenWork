const Router = require("express");
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware')
const message_controller = require("../controllers/messageController");
const userMiddleware = require("../middleware/user.middleware");

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
})

router.post("/pull_all_messages", authMiddleware, message_controller.pull_all_messages)
router.post("/send_message", authMiddleware, userMiddleware, message_controller.send_message)
router.post("/pull_new_messages", authMiddleware, message_controller.pull_new_messages)
router.post("/pull_old_messages", authMiddleware, message_controller.pull_old_messages)

module.exports = router;
