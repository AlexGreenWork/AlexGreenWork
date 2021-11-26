const Router = require("express");
const auth = require('../middleware/auth.middleware')
const search_controller = require("../controllers/searchController")
const router = new Router();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS ');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
})

router.post('/search', search_controller.search);

module.exports = router;
