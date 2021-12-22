const auth = require('../middleware/auth.middleware')
const Router = require("express");
const search_controller = require("../controllers/searchController")
const info_controller = require("../controllers/infoController")
const router = new Router();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS ');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
})

router.post('/search', search_controller.search);
router.post('/info', auth, info_controller.get_full_info);
router.post('/show_category', auth, search_controller.get_all_by_category);

module.exports = router;
