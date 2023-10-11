const teachers = require("../data/teachers.json");
const { generateToken, verify } = require('../utils/jwt');
const { addUser, findUser, checkPassword } = require('../utils/user');

// 1. Login => login dengan username dan password sesuai data/users.json
exports.login = (req, res) => {
  const { username, password } = req.body

  //validasi username
  var user = findUser(username);
  if (!user){
    return res.status(404).json({ message: "User Not Found!" });
  }
  
  //validasi password
  var isPasswordValid = checkPassword(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Incorrect Password!" });
  }
  
  //generate token
  const token = generateToken({
    id: user.id,
    username: user.username,
  })
  res.status(200).json(token);
}

// 2. Get All Data => mengembalikan data teachers.json jika terdapat token autentikasi pada request
exports.getAllData = (req, res) => {
  if (!req.headers.authorization){
    return res.status(401).json({message: 'Unauthorized'});
  }

  try{
    verify(req.headers.authorization);
    res.json(teachers);
  } catch (err) {
    return res.status(401).json({message: err});
  }
}

// fitur tambahan Register
// akun yang di-register akan hilang saat aplikasi di-restart karena tidak disimpan ke database
exports.register = (req, res) => {
  const { username, password } = req.body

  if(!password){
    return res.status(400).json({
      message: "No Password Provided"
    });
  }
  const user = addUser(username, password);
  if (user){
    res.status(201).json(user);
  }
  else  {
    res.status(400).json({
      message: `Username (${username}) Has Been Registered`
    })
  }
}