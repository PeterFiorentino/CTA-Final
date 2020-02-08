var express = require('express');
var router = express.Router();
const db = require('./db')


router.get('/', async (req, res) => {
    try {
      let allGenres = await db.any(`SELECT * FROM genres`)
      res.json({
        status: "Success",
        body: {
          users: allGenres
        }
      })
    } catch (error) {
      res.json({
        message: "There was a problem getting the genres.",
        err: error
      })
    }
  });

  module.exports = router;