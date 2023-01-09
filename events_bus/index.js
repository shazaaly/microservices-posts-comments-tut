const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express()
// parse the request body of every incoming HTTP request and make it available as a JavaScript object 
app.use(bodyParser.json())

app.post('/events', (req, res) => {
    const event = req.body
    axios.post('http://localhost:3000/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://localhost:3001/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://localhost:3002/events', event).catch((err) => {
        console.log(err.message);
    });
    res.send({ status: 'OK' });

})

app.listen(4005, () => {
    console.log('listen at 4005');
})
