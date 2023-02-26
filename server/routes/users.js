const router = require('express').Router();

router.get('/me', (req, res) => {
    if(req.session.user) {
        res.json({success: true, user: req.session.user});
    } else {
        res.status(401).json({message: 'Not authenticated'});
    }
});

module.exports = router;