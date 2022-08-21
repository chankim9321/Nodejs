
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
    let file = JSON.stringify(data,null,4);
    try{
        fs.writeFileSync(path, file);
    } catch(e){
        console.log(e.message);
        console.log('saving Failed!');
    }
};

module.exports = {loadUsers, saveUsers};