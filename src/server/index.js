require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const {getMarsRoverPhotos} = require('./nasa-client')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

app.get('/rover/:id/photos', async (req, res) => {
    getMarsRoverPhotos({rover: req.params.id}, data => res.send(data?.latest_photos))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))