var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/mail', function(req, res, next) {
  const company = req.body.company;
  const email = req.body.email;
  const text = req.body.text;
  const phone = req.body.phone;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'elmario@nightsong.digital',
      pass: 'Husha6129!'
    }
  });
  
  const mailOptions = {
    from: 'elmario@nightsong.digital',
    to: 'elmario@nightsong.digital',
    subject: 'New Website Message - ' + company,
    html: '<b>Name/Company:</b> ' + company + ' <br /><b>Email: </b> ' + email + ' <br /> <b>Phone: </b>' + phone + '<br /> <b>Text:</b> ' + text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send(500);
    } else {
      console.log('Email sent: ' + info.response);
      res.send(200);
    }
  });
  
});

module.exports = router;
