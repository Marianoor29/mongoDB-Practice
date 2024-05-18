const express = require('express')
require('./db')
require('./models/User')
const port = 3000

const app = express()
const bodyParser = require('body-parser')
const authRoutes = require('./routes/AuthRoute')

app.use(bodyParser.json())
app.use(authRoutes)

app.get('/',(req, res) => {
res.send('hellow artistic')
})

app.listen(port, () =>{
    console.log(`server is running on port ${port}`)
})