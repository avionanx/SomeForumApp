const User = require('../model/user');


module.exports.signUp = async(req, res) => {
    // skip if user is already logged in
    if(req.session.is_logged_in){
        return res.status(400).json({success:false ,message: 'User is already logged in'});
    }
    
    const { username, password } = req.body;
    // check if username and password are provided
    if(!username || !password){
        return res.status(400).json({success:false ,message: 'Please provide username and password'});
    }
    // check if username already exists in db
    const userAlreadyExists = await User.findOne({username:username});
    if(userAlreadyExists){
        return res.status(406).json({success:false ,message: 'This username already exists'});
    }
    // create user
    const user = await User.create({username:username,password:password});
    if(user){
        return res.status(200).json({success:true ,message: 'User created successfully'});
    }else{
        return res.status(500).json({success:false ,message: 'Server error'});
    }
}

module.exports.signIn = async(req, res) => {
    // skip if user is already logged in
    if(req.session.is_logged_in){
        return res.status(400).json({success:false ,message: 'User is already logged in'});
    }
    // check if username and password are provided
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({success:false ,message: 'Please provide username and password'});
    }
    // get user
    const user = await User.findOne({username:username});
    if(user){
        if(user.password === password){
            req.session.user = username;
            req.session.is_logged_in = true;
            req.session.save((err)=>{
                if(err){
                    return res.status(500).json({success:false ,message: 'Server error'});
                }else{
                    return res.status(200).json({success:true ,message: 'User logged in successfully'});
                }
            })
        }else{
            return res.status(400).json({success:false ,message: 'Incorrect password'});
        }
    }else{
        return res.status(400).json({success:false ,message: 'User not found'});
    }
}

module.exports.signOut = async(req, res) => {
    // check if user is logged in and session exists
    if(req.session.is_logged_in){
        req.session.destroy();
        return res.status(200).json({success:true ,message: 'User logged out successfully'});
    }else{
        return res.status(400).json({success:false ,message: 'User is not logged in'});
    }
}
module.exports.getSession = async(req, res) => {
    // check if user is logged in and session exists
    if(req.session.is_logged_in){
        return res.status(200).json({success:true ,message: 'User is logged in'});
    }else{
        return res.status(401).json({success:false ,message: 'User is not logged in'});
    }
}