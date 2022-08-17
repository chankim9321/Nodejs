
const fs = require('fs');

function loadUsers(path) {  // 프로미스 객체 반환
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, file) => {
            if(err){
                reject(err);
            } else{
                resolve(JSON.parse(file));
            }
        });
    });
};

function saveUsers(users) {
    let jsonData = JSON.stringify(users,null,4);
    fs.writeFile(__dirname + '/DB.json', jsonData, (err) => {
        if(err) throw err;
        console.log("Users가 성공적으로 저장되었습니다.")
    });
};

module.exports = {loadUsers, saveUsers};