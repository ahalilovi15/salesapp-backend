const db = require('../models');
const Shoes = db.shoes;
const Users = db.users;
const Op = db.Sequelize.Op;

//Kreira i spasava nove patike u bazu
exports.create = (req, res) => {
    if(!req.body.title || req.body.title == '') {
        res.status(404).send({
            message: "Title can't be empty!"
        });
        return;
    }

    const shoes = {
        title: req.body.title,
        description: req.body.title,
        image: req.body.image,
        price: req.body.price,
        rating: req.body.rating
    };
    Shoes.create(shoes).then(data => res.send(data)).catch(err => {
        res.status(500).send({
            message: "Error"
        });
    });
};

//Vraca sve instance patika u bazi
exports.findAll = (req, res) => {
    const title = req.query.title;
  //  var condition = title ? { title: { [Op.iLike]:`%${title}%` } } : null;
  var condition = true ? { title: { [Op.iLike]:`%${title}%` } } : null;
    Shoes.findAll({ where: condition }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: "Error"
        });
    });
};


exports.findOne = (req, res) => {
    const id = req.params.id;
    Shoes.findByPk(id).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: "Error"
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Shoes.update(req.body, {where: {id:id}}).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: "Error"
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Shoes.destroy({where: {id:id}}).then(data => {
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

exports.addUsersShoes = (req, res) => {
    Users.findByPk(req.body.user.id).then(user => {
        Shoes.findByPk(req.body.shoes.id).then(async(shoes) => {
            
            await user.addShoes(shoes);
            res.status(200);
            res.send({
                message: "Ok"
            });
        }).catch(err => {
            res.status(500).send({
                message: "Error"
            });
        });
        
    }).catch(err => {
        res.status(500).send({
            message: "Error"
        });
    });
   
};

exports.getUsersShoes = (req, res) => {
    console.log("hey", req.body)
    Users.findByPk(req.params.id).then(async(user) => {
        console.log("hello",user)
       let shoes =  await user.getShoes();
       res.status(200);
       res.send(JSON.stringify(shoes));
    }).catch(err => {
        res.status(500).send({
            message: "Error"
        });
    });
};