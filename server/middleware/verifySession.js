const mongoose = require("mongoose");
module.exports = (req, res, next) => {
    const sessionID = req.sessionID;
    if(!sessionID){
        return res.redirect('/api/auth/login');
    }
    find('sessions', { _id: sessionID }, function (err, docs) {
        if (err) {
            console.log(err);
            return res.redirect('/api/auth/login');
        }
        if(docs.length > 0){
            next();
        }else{
            return res.redirect('/api/auth/login');
        }
    });

}
async function find (name, query, cb) {
   const collection = await mongoose.connection.db.collection(name);
   const res = await collection.find(query).toArray();
   cb(null, res);
}