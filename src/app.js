const express = require('express');
const mysql = require('mysql');
//llena engine con la variable engine dentro de handle-bars
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyparser = require('body-parser')

const app = express()
app.set('port',3000)
app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'tasks'
}))
app.listen(app.get('port'),() => {
    console.log('andando en el puerto 3000')
})

app.get('/', (req,res) => {
    res.render('home')
})

