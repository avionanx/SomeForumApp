const mongoose = require('mongoose');

module.exports.connectToDB = async () => {
    try{
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        return true;
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}