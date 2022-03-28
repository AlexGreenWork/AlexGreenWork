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

router.post("/pull_all_messages", authMiddleware, userMiddleware, message_controller.pull_all_messages)
router.post("/send_message", authMiddleware, userMiddleware, message_controller.send_message)
router.post("/pull_new_messages", authMiddleware, userMiddleware, message_controller.pull_new_messages)
router.post("/pull_old_messages", authMiddleware, userMiddleware, message_controller.pull_old_messages)
router.post("/pull_all_message_addressee", authMiddleware, userMiddleware, message_controller.pull_all_message_addresse)
router.post("/set_message_status_read", authMiddleware, userMiddleware, message_controller.set_message_status_read)
router.post("/get_message_status_read", authMiddleware, userMiddleware, message_controller.get_message_status_read)
router.post("/get_unread_messages_count", authMiddleware, userMiddleware, message_controller.get_unread_messages_count)
router.post("/get_addressee_info", authMiddleware, userMiddleware, message_controller.get_addressee_info)
router.post("/delete_addressee", authMiddleware, userMiddleware, message_controller.delete_addressee)

module.exports = router;
