var express = require('express');
var router = express.Router();
const db = require('./db')


router.get('/', async (req, res) => {
    try {
      let allGenres = await db.any(`SELECT * FROM genres`)
      res.json({
        status: "Success",
        body: {
          genres: allGenres
        }
      })
    } catch (error) {
      res.json({
        message: "There was a problem getting the genres.",
        err: error
      })
    }
  });

router.post('/', async (req, res) => {

    try {
        let insertQuery =`INSERT INTO genres(genre_name) 
        VALUES($1)`
        await db.none(insertQuery, [req.body.genre_name])
        res.json({
            genre: req.body.genre_name,
            message: `Posted ${req.body.genre_name} successfully.`
        })
    } catch (error) {
        res.json({
            message: error
        })
    }
})

  module.exports = router;