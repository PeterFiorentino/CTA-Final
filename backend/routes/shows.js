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


module.exports = router;