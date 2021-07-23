const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Shoes = sequelize.define("shoes", {
        title: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.STRING
        }
    });
    return Shoes;
}