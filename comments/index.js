const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

app.use(bodyParser.json())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    let commentId = randomBytes(4).toString('hex')
    const { content } = req.body
    // create empty array for comments or get comments by id
    const comments = commentsByPostId[req.params.id] || []
    comments.push({
        id: commentId,
        content
    })
    commentsByPostId[req.params.id] = comments

    res.status(201).send(comments)

})

app.listen(3001, () => {
    console.log(`app is running at 3001`);
})