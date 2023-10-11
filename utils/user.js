const users = require('../data/users.json');

//mencari user dengan username = username
exports.findUser = (username) => {
  var userData;
  for (const user of users) {
    if (user['username'] == username){
      userData = user;
      break;
    }
  }
  return userData; //mengembalikan info user yang sesuai dengan username
}

//menambah user
exports.addUser = (username, password) => {
  if (!this.findUser(username)){
    users.push({
      "id": users.length + 1,
      "username": username,
      "password": password,
    });
    return users[users.length - 1]; //mengembalikan data yang baru saja dipush
  }
  return;
}

//mengecek password berupa raw data
exports.checkPassword = (inputPassword, expectedPassword) => {
  return inputPassword == expectedPassword;
}