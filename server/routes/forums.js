const router = require('express').Router();
const routeProtect = require('../middleware/routeProtect');
const {postThread,getThreads,getThread,postReply} = require('../controller/forums');
const verifySession = require('../middleware/verifySession');
router.get('/',getThreads);
router.post('/',routeProtect,postThread);
router.get('/thread/:id',getThread);
router.post('/thread/:id',verifySession,postReply);
module.exports = router;