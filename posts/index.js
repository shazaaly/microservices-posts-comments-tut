const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors())
//Using body-parser allows you to access req.body from within routes and use that data.
const bodyParser = require('body-parser')

//generate random id : package crypto
const { randomBytes } = require('crypto')
app.use(bodyParser.json())
/* ========= */

const posts = {}
app.get('/posts', (req, res) => {
    res.send(posts)

   
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body
    posts[id] = {
        id, title
    }
    res.status(201).send(posts[id])

})

app.listen(3000, () => {
    console.log(`app is running at port 3000`);
})