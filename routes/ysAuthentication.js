var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    let userGot = req.body['user']
    let passGot = req.body['pass'];
    console.log(userGot, passGot);
    if (userGot == 'ys_admin' && passGot == 'ys_passkey_1234') {
        return res.json({status: 200})
    }
    return res.json({status: 401})
})

module.exports = router;