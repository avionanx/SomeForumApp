module.exports = (req,res,next) => {
    if(req.session.is_logged_in){
        next();
    }else{
        res.status(401).json({success:false ,message: 'Unauthorized'});
    }
}