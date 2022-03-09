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

router.post("/allMessages", authMiddleware, message_controller.all_messages)
router.post("/newMessage", authMiddleware, userMiddleware, message_controller.new_message)
router.post("/lastMessages", authMiddleware, message_controller.last_message)

module.exports = router;
