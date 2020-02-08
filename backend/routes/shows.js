var express = require('express');
var router = express.Router();
const db = require('./db')

router.get('/', async (req, res) => {
    try {
      let allShows = await db.any(`SELECT * FROM shows`)
      res.json({
        status: "Success",
        body: {
          shows: allShows
        }
      })
    } catch (error) {
      res.json({
        message: "There was a problem getting the shows.",
        err: error
      })
    }
  });

router.get('/:id', async (req, res) => {
    try {
        let singleShow = await db.one(`SELECT * FROM shows WHERE id = $1`, [req.params.id])
        res.json({
        status: "Success",
        body: {
            shows: singleShow
        }
        })
    } catch (error) {
        res.json({
        message: "There was a problem getting a show with that ID.",
        err: error
        })
    }
  });

router.post('/', async (req, res) => {
    try {
        let insertQuery =`INSERT INTO shows(title, img_url, user_id, genre_id) 
        VALUES($1, $2, $3, $4)`
  
        if(!req.body.title || !req.body.img_url || !req.body.user_id || !req.body.genre_id){
            res.json({
                "message": "Information Missing"
            })
        }else {
            await db.none(insertQuery, [req.body.title, req.body.img_url, req.body.user_id, req.body.genre_id]);
  
            res.json({
                title: req.body.title,
                img_url: req.body.img_url,
                user_id: req.body.user_id,
                genre_id: req.body.genre_id,
                message: `Posted ${req.body.title} successfully.`
            })
        }
    } catch(error) {
        res.json({
            message: error
        })
    }
  });
  

module.exports = router;