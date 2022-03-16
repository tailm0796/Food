const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session')
const cookieParser = require('cookie-parser'); // phan tich cu phap cookies
const MongoStore = require('connect-mongo');
const gobalHandlingError = require('./controllers/errorHandling');
const app = express()
const port = 3000
dotenv.config({ path: './.env' });
const DB = process.env.DB_CONNECTION.replace(
  '<password>',
  process.env.DB_PASSWORD
);
mongoose 
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successfully');
  });
const store = MongoStore.create({
  //luu session vao database
  mongoUrl: DB,
  secret: 'foo',
  touchAfter: 24*60*60,
});
const sessionConfig = {
  store,
  name: 'session',
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 *7
  }
}
//MIDDELWARE
app.use(morgan('dev'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',ejsMate);
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(session(sessionConfig));
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.cart = req.session.cart || null;
  res.locals.user = null;
  next();
})
//ROUTE
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');
const viewRoute = require('./routes/viewRoute');
const adminRoute = require('./routes/adminRoute');

app.use('/', viewRoute);
app.use('/admin',adminRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/category', categoryRoute);

// ERROR HANDLING MIDDELWARE
app.use(gobalHandlingError);
app.listen(port, () => console.log(`Example app listening on 3000 port!`))
