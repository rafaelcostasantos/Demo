const express = require('express');
const router = express.Router();

//@route GET api/users/test
//@desc tests users route
//@access public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));		//Don't need the /api/users because it's defined in server.js

module.exports = router;