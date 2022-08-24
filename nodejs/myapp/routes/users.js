var express = require('express');
var router = express.Router();
var app = require('../app');
var dm = require('../dataManager');

var DBpath = 'C:\\Users\\asas9\\OneDrive\\바탕 화면\\HTML\\nodejs\\myapp\\DB.json';

let users = app.getUsers();
/* GET users listing. */
router.get('/', (req, res) => {
  res.sendFile('C:\\Users\\asas9\\OneDrive\\바탕 화면\\HTML\\nodejs\\myapp\\views\\login.html');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  // data searching
  const filtered = app.getUsers().filter((user) => user.id == id);
  if(filtered.length > 0){ 
      res.send(filtered[0]);
  }
  else{
      res.status(404).send('DATA NOT FOUND');
  }
});

router.post('/', (req, res) => {
  const body = req.body;

  if(!body.userName){
    return res.status(400).send('pls send a name.');
  }
  else if(!body.userId){
    return res.status(400).send('pls send a ID');
  }
  else if(!body.userPassword){
    return res.status(400).send('pls send a password')
  }
  
  const name = body.userName;
  const ID = body.userId;
  const PW = body.userPassword;

  const data = {
    name: name,
    id: ID,
    password: PW
  }
  console.log(data);
  app.pushUser(data);
  res.send(app.getUsers());
});

router.put('/:id', (req, res) => {
  // searching arr idx
  const id = req.params.id;

  const user = users.find((user) => user.id == id);
  if(user){
      if(req.body.name){
          users[id].name = req.body.name; 
      }
      if(req.body.region){
          users[id].region = req.body.region;
      }
      res.send(user);
  }
  else{
      res.status(404).send('DATA NOT FOUND');
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const rmIndex = users.findIndex((user) => user.id == id);

  if(rmIndex != -1){
      users.splice(rmIndex,1);
      res.send('SUCCESSFULLY REMOVED!');
  } else{
      res.status(404).send('DATA NOT FOUND!');
  }
});
module.exports = router;
