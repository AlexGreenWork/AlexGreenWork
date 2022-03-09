const express = require('express')
const config = require('config')
const mysql = require("mysql2")
const path = require('path')
const corsMiddleware = require('./middleware/cors.middleware')

const app = express()

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
})

app.use(express.json())
app.use(express.static(__dirname));
app.use(corsMiddleware)
app.use(express.json({ extended: true }))
app.use(express.static(__dirname + '/files/avatar'))
app.use('/t', require('./routes/redirect.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use("/api/user", require('./routes/worker_finder.routes'))
app.use("/api/messages", require('./routes/messages.routes'))
app.use("/api/task", require('./routes/task.routes'))
app.use("/api/files", require('./routes/file.routes'))
app.use("/api/offers", require('./routes/offers.routes'))
app.use(express.static('static'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'my-app', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'my-app', 'build', 'index.html'))
    })
}

const PORT = config.get('serverPort') || 5000

const mysqlConfig = {
    host:config.database.host,
    port:config.database.port,
    user:config.database.user,
    password:config.database.password,
    database:config.database.database
}

async function start() {
    try {

        const connectToDB = function (){
            const connection = mysql.createConnection(mysqlConfig);
            connection.connect((err)=>{
                if(err){
                    console.log(err.message)
                }else {

                    console.log('база данных подключена')
                }
            })
        }
        connectToDB();


        app.listen(PORT, () => console.log(`Сервер стартовал на  ${PORT}..порту.`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
