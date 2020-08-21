'use strict';

const express = require('express');
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');

var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

let pool;
const createPool = async () => {
  pool = await mysql.createPool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,
    
    // If connecting via unix domain socket, specify the path
    //socketPath: process.env.DB_CONNECTION,

    
    // If connecting via TCP, enter the IP and port instead
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,

    connectionLimit: 5,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
  });

};
createPool();

const getAllUsers = 'SELECT '+
                      'user_id, '+
                      'fname, '+
                      'lname, '+
                      'clearance, '+
                      'profile, '+
                      'email, '+
                      'password, '+
                      'created_at, '+
                      'updated_at '+
                    'FROM picd.user '+
                    'JOIN clearance '+
                    'ON user.clearance_id = clearance.clearance_id';

router.post('/login', async (req, res) => {

  try {
    console.log(process.env.DB_HOST);
    
    //Create new deposit record
    const getUserDetails = getAllUsers + ' WHERE email="' + req.body.uname + '";';

    console.log(getUserDetails)

    //Run query - fetch response
    var userDetails = await pool.query(getUserDetails);

    if (userDetails.length < 1) {
      res.status(403).send({message: 'Unkown E-Mail'});
    }
    else if (userDetails[0].password === req.body.pword) {
      res.status(200).send({
        user: {
          id: userDetails[0].user_id,
          fname: userDetails[0].fname,
          lname: userDetails[0].lname,
          email: userDetails[0].email,
          clearance: userDetails[0].clearance,
        }
      });
    }
    else {
      res.status(403).send({message: 'Incorrect Password'});
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Connection error!');
  }
});

module.exports = router;