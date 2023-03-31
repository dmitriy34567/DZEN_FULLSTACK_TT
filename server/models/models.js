const sequelize = require('../db')
const {DataTypes} = require('sequelize')

// model for test project

const Comments  = sequelize.define('comments', {
    id :{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    parantId :{type:DataTypes.INTEGER, allowNull:false}, // id сообщения на которое отвечают если просто то 0
    username:{type:DataTypes.STRING, allowNull:false},
    email:{type:DataTypes.STRING, allowNull:false},
    homePage:{type:DataTypes.STRING}, //какой то юрл из тз, не обязательное поле
    text:{type:DataTypes.STRING, allowNull:false},
    userImg :{type:DataTypes.STRING}, //аватарка
    userFile :{type:DataTypes.STRING} //файл или картинка
} )



module.exports = {
    Comments
}