var express = require('express');
var router = express.Router();
var app = require('../app');
var DB = require('../DB.json');

let users = app.getUsers();
/* GET users listing. */
router.get('/', (req, res) => {
  console.log(app.getUserCounter());
  res.send(app.getUsers());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  // data searching
  const filtered = users.filter((user) => user.id == id);
  if(filtered.length > 0){ 
      res.send(filtered[0]);
  }
  else{
      res.status(404).send('DATA NOT FOUND');
  }
});

router.post('/', (req, res) => {
  const body = req.body;

  if(!body.name){
      return res.status(400).send('pls send a name.');
  }
  else if(!body.region){
      return res.status(400).send('pls send a region.');
  }
  
  const name = body.name;
  const region = body.region;

  const data = {
      id: app.getUserCounter(1),
      name: name,
      region: region
  }
  console.log(data);
  app.pushUser(data);
  res.send(data);
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
