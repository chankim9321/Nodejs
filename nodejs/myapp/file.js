const fs = require('fs');

function loadUsers() {
    fs.readFile(__dirname + '/DB.txt', (err, data) => {
        if(err) throw err;
        console.log("Users를 성공적으로 로드했습니다.");
        return data;
    });
};

function saveUsers(users) {
    let jsonData = JSON.stringify(users);
    fs.writeFile(__dirname + '/DB.txt', jsonData, (err) => {
        if(err) throw err;
        console.log("Users가 성공적으로 저장되었습니다.")
    });
};

module.exports = {loadUsers, saveUsers};