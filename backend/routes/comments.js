var express = require('express');
var router = express.Router();
const db = require('./db')

router.get('/show/:show_id', async (req, res) => {
    try {
        let commentsByShow = await db.any(`SELECT comments.comment_body, comments.show_id, users.username, users.avatar_url FROM comments LEFT JOIN users ON comments.user_id = users.id WHERE show_id = $1`, [req.params.show_id])
        res.json({
        status: "Success",
        body: {
            shows: commentsByShow
        }
        })
    } catch (error) {
        res.json({
        message: "There was a problem getting comments with that Show ID.",
        err: error
        })
    }
  });

router.post('/', async (req, res) => {
    try {
        let insertQuery =`INSERT INTO comments(comment_body, user_id, show_id) 
        VALUES($1, $2, $3)`
  
        if(!req.body.comment_body || !req.body.user_id || !req.body.show_id){
            res.json({
                "message": "Information Missing"
            })
        }else {
            await db.none(insertQuery, [req.body.comment_body, req.body.user_id, req.body.show_id]);
  
            res.json({
                comment: req.body.comment_body,
                user_id: req.body.user_id,
                show_id: req.body.show_id,
                message: `Posted comment successfully.`
            })
        }
    } catch(error) {
        res.json({
            message: error
        })
    }
  });

  module.exports = router;