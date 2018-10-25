const express = require('express');
const router = express.Router();

//@route GET api/posts/test
//@desc tests posts route
//@access public
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));		//Don't need the /api/users because it's defined in server.js

module.exports = router;