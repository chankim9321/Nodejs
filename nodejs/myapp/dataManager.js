
const fs = require('fs');

function loadUsers(path) {  // 프로미스 객체 반환
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, file) => {
            if(err){
                reject(err);
            } else{
                resolve(file);
            }
        });
    });
};

function saveUsers(path, data) {
    data = JSON.stringify(data,null,4);
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if(err){
                console.log('Data 저장에 실패했습니다.');
            }
            else{
                resolve();
            }
        })
    })
};

module.exports = {loadUsers, saveUsers};