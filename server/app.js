const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const {connectToDB} = require('./utils/database');
require('dotenv').config();

const app = express();
// Session store
const store = new MongoStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});

// JSON and URL encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: process.env.CLIENT_URL,methods: ['GET', 'POST', 'PUT', 'DELETE'],credentials: true,}));
//Session middleware
app.set('trust proxy', 1)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    //THIS BREAKS THE CODE IN PROD FOR WHATEVER REASON
    /*
    cookie:{
        maxAge: 1000 * 10, // 10 seconds
        sameSite: 'none',
        secure: false, // false if dev, true if prod
        httpOnly: true 
    }
    */
    
}));
// Connect to MongoDB
connectToDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
});
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/forums', require('./routes/forums'));
app.use('/api/users', require('./routes/users'));

module.exports = app;

