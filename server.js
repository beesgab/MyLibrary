if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}


const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')


app.set('view engine', 'ejs') //view engine to use <%= variable > in the .ejs view
app.set('views', __dirname + '/views') //add views link
app.set('layout', 'layouts/layout') //add this for the views an ejs file which contain the header and footer, by then we can add <%- body %>
app.use(expressLayouts)
app.use(express.static('public')) //folder public for css, js and html

//connect to our mongodb database
const mongoose = require('mongoose')//process.env is from .dotenv --> npm i --save-dev dotenv
mongoose.connect(process.env.DATABASE_URL,{ 
useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))



app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)