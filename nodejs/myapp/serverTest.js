const request = require('request');

const url = 'http://localhost:1234';

for(let i =0; i < 10000; i++){
    request(url,(err, res, body) => {});
}
