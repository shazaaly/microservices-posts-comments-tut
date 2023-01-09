const express = require('express');
const app = express();
const cors = require('cors')
const axios = require('axios')
app.use(cors())
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

app.use(bodyParser.json())

const commentByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    let commentId = randomBytes(4).toString('hex')
    const { content } = req.body
    // create empty array for comments or get comments by id
    const comments = commentByPostId[req.params.id] || []
    comments.push({
        id: commentId,
        content
    })
    commentByPostId[req.params.id] = comments
    await axios.post(`http://localhost:4005`, {
        type : 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id

        }


    })

    res.status(201).send(comments)

})

app.listen(3001, () => {
    console.log(`app is running at 3001`);
})