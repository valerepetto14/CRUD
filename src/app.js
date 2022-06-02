const express = require('express');
const mysql = require('mysql');
//llena engine con la variable engine dentro de handle-bars
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyparser = require('body-parser')
const taskRoutes = require('./routes/tasks')

const app = express()


app.set('port',3000)
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
//motor de vistas
app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');

//conexion a mysql
app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'tasks'
}, 'single'));

//rutas
app.listen(app.get('port'),() => {
    console.log('andando en el puerto 3000')
});

app.use('/',taskRoutes);

app.get('/', (req,res) => {
    res.render("home")
});

