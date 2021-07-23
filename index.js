const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const db = require('./models');
const ShoesController =  require("./controllers/shoes.controller");
const UsersController =  require("./controllers/users.controller")
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

db.sequelize.sync();
obj = {
    name: "Adna",
    lname: "Halilović",
    email: "ahalilovi15@etf.unsa.ba",
    password: "hello"
};
const users = [obj];

router.post("/shoes", ShoesController.create);
router.get("/shoes", ShoesController.findAll);
router.post("/usersshoes", ShoesController.addUsersShoes);
router.get("/usersshoes/:id", ShoesController.getUsersShoes);
router.post("/signup", UsersController.create);
router.post("/login", UsersController.findOne);
router.post("/login2", (req, res) => {
   console.log(req.body);
    if(users.some(item => 
        item.email === req.body.email &&
        item.password === req.body.password)) {
            res.status(200);
            let user = users.find(user => user.email === req.body.email &&
                user.password === req.body.password)
            res.send(JSON.stringify(user));
        }
    else {
    res.status(400);
    res.send("Login failed");
    }
});
router.post("/signup2", (req, res) => {
    let user = {
        name: req.body.name,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
    };
    users.push(user);
    console.log(users);
    res.status(200);
    res.send("User added");
});
router.get("/", (req, res) => {
    res.send("Hello world");
});
router.get("/now", (req, res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    res.send(today);
});
app.use('/', router);
app.listen(3001);
console.log(`Server running on ${3001}`);