const menus = require('./../inc/menus');
const reservations = require('./../inc/reservations');
const contact = require('./../inc/contact');
const emails = require('./../inc/emails');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  menus.getMenus().then(result =>{
    res.render('index', { title: 'Restaurante', menus: result, isHome: true});
  });
});

router.get('/contacts', function(req,res,next){
  contact.render(req,res);
});

router.post('/contacts', function(req,res,next){
  if(!req.body.name){
    contact.render(req,res,'How to name');
  }else if(!req.body.email){
    contact.render(req,res,'How to email');
  }else if(!req.body.message){
    contact.render(req,res,'How to message');
  }else{
    contact.save(req.body).then(results =>{
      req.body = {}
      contact.render(req,res,null, 'Contato enviado!');
    }).catch(error =>{
      contact.render(req.res, error.message);
    });
  }
});

router.get('/menus', function(req,res,next){
  menus.getMenus().then(result =>{
    res.render('menus',{ title: 'Menu - Restaurante',background: 'images/img_bg_1.jpg', h1: 'Saboreie nosso menu!', menus: result});
  });
});

router.get('/reservations', function(req,res,next){
  reservations.render(req,res);
});

router.post('/reservations', function(req,res,next){
  if(!req.body.name){
    reservations.render(req,res,'How to name');
  }else if(!req.body.email){
    reservations.render(req,res,'How to email');
  }else if(!req.body.people){
    reservations.render(req,res,'How to peaople');
  }else if(!req.body.date){
    reservations.render(req,res,'How to date');
  }else if(!req.body.time){
    reservations.render(req,res,'How to time');
  }else{
    reservations.save(req.body).then(results =>{
      req.body = {};
      reservations.render(req,res, null, 'Reservado!');
    }).catch(error =>{
      reservations.render(req,res,error.message);
    });
  }
  
});

router.get('/services', function(req,res,next){
  res.render('services', { title: 'Servicos - Restaurante',background: 'images/img_bg_1.jpg', h1: 'É um prazer poder servir!'});
});

router.post('/subscribe', function(req,res,next){
  emails.save(req).then(results =>{
    res.send(results);
  }).catch(error =>{
    res.send(error);
  });
});

module.exports = router;
