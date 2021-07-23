const db = require('../models');
const Users = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.email || req.body.email == '') {
        res.status(404).send({
            message: "Email can't be empty!"
        });
        return;
    }
    if(!req.body.password || req.body.password == '') {
        res.status(404).send({
            message: "Password can't be empty!"
        });
        return;
    }
    Users.findAll({ where: { email: req.body.email } }).then(data => {
        if(data != []){
            console.log("hey",data)
            res.status(400).send({
                message: "Email address is already being used"
            });
        }
        else{
            const user = {
                name: req.body.name,
                lname: req.body.lname,
                email: req.body.email,
                password: req.body.password
            };
            Users.create(user).then(data => res.send(data)).catch(err => {
                console.log("hello")
                res.status(500).send({
                    message: "HeyError"
                });
            });
        }
    }).catch(err => {
        console.log("this")
        res.status(500).send({
            message: "ThisError"
        });
    });
    
};

//Vraca sve instance patika u bazi
exports.findAll = (req, res) => {
   // const title = req.query.title;
  //  var condition = title ? { title: { [Op.iLike]:`%${title}%` } } : null;
  //var condition = true ? { title: { [Op.iLike]:`%${title}%` } } : null;
    Users.findAll().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: "Error"
        });
    });
};


exports.findOne = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Users.findOne({ where: { email: email, password: password } }).then(data => {
        console.log(data)
        if(data){
        res.status(200);
        res.send(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error"
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Users.update(req.body, {where: {id:id}}).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: "Error"
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Users.destroy({where: {id:id}}).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: "Error"
        });
    });
};

exports.deleteAll = (req, res) => {
    Shoes.destroy({ where: {}, truncate: false}).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: "Error"
        });
    });
};