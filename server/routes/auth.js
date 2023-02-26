const router = require('express').Router();
const { signUp,signIn,signOut,getSession} = require('../controller/auth');

router.post('/register', signUp);
router.post('/login', signIn);
router.post('/logout', signOut)
router.get('/session',getSession)
module.exports = router;