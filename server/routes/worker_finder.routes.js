const Router = require("express");
const search_controller = require("../controllers/searchController")
const router = new Router();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS ');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
})

router.post('/search', search_controller.search);
router.post('/info', search_controller.get_full_info);
router.post('/show_category', search_controller.get_all_by_category);

module.exports = router;
