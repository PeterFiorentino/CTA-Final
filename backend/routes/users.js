var express = require('express');
var router = express.Router();
const db = require('./db')

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    let allUsers = await db.any(`SELECT * FROM users`)
    res.json({
      status: "Success",
      body: {
        users: allUsers
      }
    })
  } catch (error) {
    res.json({
      message: "There was a problem getting the users.",
      err: error
    })
  }
});

router.get('/:id', async (req, res) => {
  try {
    let singleUser = await db.one(`SELECT * FROM users WHERE id = $1`, [req.params.id])
    res.json({
      status: "Success",
      body: {
        users: singleUser
      }
    })
  } catch (error) {
    res.json({
      message: "There was a problem getting a user with that ID.",
      err: error
    })
  }
});

router.post('/', async (req, res) => {
  try {
      let insertQuery =`INSERT INTO users(username, avatar_url) 
      VALUES($1, $2)`

      if(!req.body.username && !req.body.avatar_url){
          res.json({
              "message": "Information Missing"
          })
      }else {
          await db.none(insertQuery, [req.body.username, req.body.avatar_url]);

          res.json({
              user: req.body.username,
              avatar_url: req.body.avatar_url,
              message: `Posted ${req.body.username} successfully.`
          })
      }
  } catch(error) {
      res.json({
          message: error
      })
  }
})

module.exports = router;
